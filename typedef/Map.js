const Point = require('../def/Point').Point;
const WorldObjectDef = require('../def/WorldObjectDef').WorldObjectDef;
const GroundItemDef = require('../def/GroundItemDef');
const NPCDef = require('../def/NPCDef').NPCDef;
const ShopStorage = require('../internal/ShopStorage').ShopStorage;
const Bounds = require('../def/Bounds');
const TiledMap = require('../TiledMap.json');
const TiledMapUnderground = require('../TiledMapUnderground.json');
const TiledMapSpecial = require('../TiledMapSpecial.json');
const GuildState = require('../internal/GuildState').GuildState;
const Item = require('../typedef/Item');
const Action = require('../internal/Action').Action;


const MAP_WIDTH = 400;
// TODO REMOVE
const MAP_WIDTH_DUNGEON = 200;
const SOLID_SQUARE_ID = 60;

function getOverlappedData(baseDataArray, overlappingDataArray) {
    let result = [];
    for(let i = 0; i < baseDataArray.length; ++i) {
        if (overlappingDataArray[i] && overlappingDataArray[i] != 0 && overlappingDataArray[i] != 1024) {
            result[i] = overlappingDataArray[i];
        } else {
            result[i] = baseDataArray[i];
        }
    }
    return result;
}

function getWalls(wallDataArray, detailWall, worldObjectsObjectArray, worldObjectsThatBlockDataArray, mapWidth) {
    let blockingTiles = {};
    for(let i = 0; i < worldObjectsThatBlockDataArray.length; ++i) {
        if (worldObjectsThatBlockDataArray[i] && worldObjectsThatBlockDataArray[i] != 0) {
            blockingTiles[worldObjectsThatBlockDataArray[i]] = true;
        }
    }

    for(let i = 0; i < worldObjectsObjectArray.length; ++i) {
        let object = worldObjectsObjectArray[i];
        if (object && blockingTiles[object.gid]) {
            let x = Math.round(object.x / object.width);
            let y = Math.round(object.y / object.height) - 1;
            let index = (y * mapWidth) + x;
            wallDataArray[index] = SOLID_SQUARE_ID;
        }
    }

    if (detailWall) {
        let wallData = detailWall.data;
        if (wallData) {
            for(let i = 0; i < wallData.length; ++i) {
                if ( wallData[i] > 0) {
                    wallDataArray[i] = wallData[i];
                }
            }
        }
    }

    return wallDataArray;
}

function getOptimizedDataArray(layerDataArray, blockingTilesArray) {
    let result = [];

    let blockingTiles = {};
    for(let i = 0; i < blockingTilesArray.length; ++i) {
        blockingTiles[blockingTilesArray[i]] = true;
    }
    blockingTiles[0] = false;

    for(let i = 0; i < layerDataArray.length; ++i) {
        let layerData = layerDataArray[i];
        let optimizedLayerData = [];
        for(let d = 0; d < layerData.length; ++d) {
            let tileId = layerData[d];
            let blocked = false;

            for(let j = i + 1; j < layerDataArray.length; ++j) {
                let higherTileId = layerDataArray[j][d];

                if (blockingTiles[higherTileId]) {
                    blocked = true;
                    break;
                }
            }

            optimizedLayerData.push(blocked ? -1 : tileId);
        }
        result.push(optimizedLayerData);
    }

    return result;
}

function getLayer(JSONMap, layerName) {
    return JSONMap.layers.find(function(layer) {
        return layer.name == layerName;
    })
}

function getBlockingTiles(JSONMap) {
    let result = [];
    let data = getLayer(JSONMap, "BLOCK_TILES").data;
    for(let i = 0; i < data.length; ++i) {
        if(data[i] != 0) {
            result.push(data[i]);
        }
    }
    return result;
}

const loadMapEntities = (JSONMap, mapID) => {
    let entitiesArray = loadMapWorldObjects(JSONMap);
    entitiesArray = entitiesArray.concat(loadMapCharacters(JSONMap, mapID));
    return entitiesArray;
}

const loadMapWorldObjects = (JSONMap) => {
    let gidStart = JSONMap.tilesets[4].firstgid + 1;
    let entityObjects = getLayer(JSONMap, "WorldObjects").objects;
    let entitiesArray = [];
    for (let i = 0; i < entityObjects.length; i++) {
        let obj = entityObjects[i];
        let id = obj.gid - gidStart; 
        let x = Math.round(obj.x / obj.width);
        let y = Math.round(obj.y / obj.height) - 1;
        entitiesArray.push(new WorldObjectDef(id, x, y));
    }
    return entitiesArray;
}


let objectMapData = {}
const loadMapCharacters = (JSONMap, mapID) => {
    let overrideData = {};
    let gidStart = JSONMap.tilesets[3].firstgid;
    let entityObjects = getLayer(JSONMap, "Characters").objects;
    let entitiesArray = [];
    for (let i = 0; i < entityObjects.length; i++) {
        let obj = entityObjects[i];
        let id = obj.gid - gidStart; 
        let tiledID = obj.id;
        let x = Math.round(obj.x / obj.width);
        let y = Math.round(obj.y / obj.height) - 1;
        let bounds = null;
        if (obj.properties && obj.properties.boundsX1) {
            bounds = new Bounds(obj.properties.boundsX1, obj.properties.boundsY1, obj.properties.boundsX2, obj.properties.boundsY2);
        }
        let isAgressive = obj.properties && obj.properties.isAgressive || false;
        let attackNPCs = obj.properties && obj.properties.attackNPC || false;

        let ignoreKeys = ['boundsX1', 'boundsX2', 'boundsY1', 'boundsY2', 'isAggresive'];
        
        let npcDef = new NPCDef(id, x, y, bounds, isAgressive, tiledID);

        if (obj.properties && npcDef.def) {
            let defCopy = JSON.parse(JSON.stringify(npcDef.def));
            let keys = Object.keys(obj.properties);
            let hit = false;
            for(let i = 0; i < keys.length; ++i) {
                if (!ignoreKeys.includes(keys[i])) {
                    let innerKeys = keys[i].split('.');
                    let overrideValue = obj.properties[keys[i]];
    
                    if (innerKeys.length > 0) {
                        let innerObj = defCopy;
                        for(let j = 0; j < innerKeys.length - 1; ++j) {
                            innerObj = innerObj[innerKeys[j]];
                        }
    
                        if (innerObj) {
                            innerObj[innerKeys[innerKeys.length - 1]] = overrideValue;
                            hit = true;
                        }
                    }
                }
            }
            if (hit) {
                overrideData[tiledID] = defCopy;
                
                if(attackNPCs) {
                    let npcToAttack = obj.properties.attackNPC;
                    overrideData[tiledID].behaviorLoop = (entity) => {
                        entity.timers.setTimer(17, 30, () => {
                            let chance = Math.random() * 3;
                            if (chance <= 1) {
                                let action = new Action(entity, 0, 6, {
                                    id: 0,
                                    name: 'Attack',
                                    actionInterval: -1,
                                    steps: [
                                        [buildStep(StepType.MAKE_CLOSEST_NPC_ATTACK_CLOSEST_NPC, { params: [entity.id, npcToAttack] })]
                                    ],
                                });
                                action.performAction(entity);
                            }
                            return 30;
                        })
                    } 

                    delete overrideData[tiledID].attackNPCs;                    
                }
            }
        }

        entitiesArray.push(npcDef);
    }
    objectMapData[mapID] = overrideData;
    return entitiesArray;
}


module.exports.GetEntityDataFromMap = function(tiledID, mapID) {
    if (objectMapData[mapID] && objectMapData[mapID][tiledID]) {
        return objectMapData[mapID][tiledID];
    }
    return null;
}

const loadItemSpawns = (JSONMap) => {
    let gidStart = JSONMap.tilesets[5].firstgid + 1;
    let entityObjects = getLayer(JSONMap, "Items").objects;
    let entitiesArray = [];
    for (let i = 0; i < entityObjects.length; i++) {
        let obj = entityObjects[i];
        let id = obj.properties && obj.properties.id || (obj.gid - gidStart); 
        let x = Math.round(obj.x / (obj.width * 2));
        let y = Math.round(obj.y / (obj.height * 2)) - 1;
        let itemAmount = obj.properties && obj.properties.itemAmount || 1;
        let isNoted = obj.properties && obj.properties.isNoted || false;
        if (isNoted) {
            id = Item.Item[id].notedID || id;
        } else {
            id = Item.Item[id].unnotedID || id;
        }
        entitiesArray.push([id, itemAmount, x, y]);
    }
    return entitiesArray;
}

const loadMusicAreas = (JSONMap) => {
    let entityObjects = getLayer(JSONMap, "Music").objects
    let musicAreas = {};
    for (let i = 0; i < entityObjects.length; i++) {
        let obj = entityObjects[i];
        if (!obj.properties) {
            throw 'Error loading music ' + JSON.stringify(obj);
        }

        let songName = obj.properties.SoundName; 

        let x = obj.x / 64;
        let y = obj.y / 64;
        let width = obj.width / 64;
        let height = obj.height / 64;

        let area = {
            left: x,
            right: x + width,
            top: y,
            bottom: y + height
        };

        if (musicAreas[songName] == null) {
            musicAreas[songName] = []
        }
        musicAreas[songName].push(area);
    }
    return musicAreas;
}

const loadGuilds = (JSONMap) => {
    let entityObjects = getLayer(JSONMap, "GuildAreas").objects
    let guildsArray = [];
    for (let i = 0; i < entityObjects.length; i++) {
        let obj = entityObjects[i];
        if (!obj.properties) {
            throw 'Error loading guild ' + obj;
        }

        let guildID = obj.properties.guildID; 
        let guildName = obj.properties.guildName; 
        let areaType = obj.properties.areaType; 

        let area = {
            x: obj.x / 64,
            y: obj.y / 64,
            width: obj.width / 64,
            height: obj.height / 64,
        };

        let guild = guildsArray[guildID];
        if (guild == null) {
            guildsArray[guildID] = new GuildState(guildID, guildName);
            guild = guildsArray[guildID];
        }

        if (areaType == 'city') {
            guild.cityArea = area;
        } else if (areaType == 'mayor') {
            guild.mayorArea = area;
        }
    }
    return guildsArray;
}

const loadMultiAreas = (JSONMap) => {
    let entityObjects = getLayer(JSONMap, "MultiCombatZones").objects;
    let areas = [];
    for (let i = 0; i < entityObjects.length; i++) {
        let obj = entityObjects[i];

        let area = {
            x: obj.x / 64,
            y: obj.y / 64,
            width: obj.width / 64,
            height: obj.height / 64,
        };

        areas.push(new Bounds(area.x, area.y, area.x + area.width, area.y + area.height));
    }
    return areas;
}

const MAP_FLOOR_0 = {
    width: TiledMap.width,
    height: TiledMap.height,
    mapBaseTiles: {
        groundTiles : getOptimizedDataArray(
        [
            getLayer(TiledMap, 'waterOutput').data,
            getLayer(TiledMap, 'sandOutput').data,
            getLayer(TiledMap, 'detailSand').data,
            getLayer(TiledMap, 'landOutput').data,
            getLayer(TiledMap, 'deepForestOutput').data,
            getLayer(TiledMap, 'stoneOutput').data,
            getLayer(TiledMap, 'dirtOutput').data,
            getLayer(TiledMap, 'compactDirtOutput').data,
            getLayer(TiledMap, 'detailLava').data,
            getLayer(TiledMap, 'detailDirt').data,
            getLayer(TiledMap, 'dirtRisenOutput').data,
            getLayer(TiledMap, 'sandRisenOutput').data,
            getLayer(TiledMap, 'stoneRisenOutput').data,
        ], getBlockingTiles(TiledMap)),
        structureTiles : getOptimizedDataArray([
            getLayer(TiledMap, 'detail').data,
            getLayer(TiledMap, 'detailRisenBehind').data,
            getLayer(TiledMap, 'detailRisen').data,
        ], []),
        sceneryTiles : getOptimizedDataArray([
            getLayer(TiledMap, 'flowersOutput').data,
            getLayer(TiledMap, 'detailGround').data,
        ], [])
    },
    mapWalls: getWalls(
        getLayer(TiledMap, "wallOutput").data,
        getLayer(TiledMap, "detailWall"),
        getLayer(TiledMap, "WorldObjects").objects,
        getLayer(TiledMap, "WORLD_OBJECTS_THAT_BLOCK").data,
        MAP_WIDTH
    ),
    mapEntities: loadMapEntities(TiledMap, 0),
    mapGuilds: loadGuilds(TiledMap),
    musicAreas: loadMusicAreas(TiledMap),
    spawnPoint: new Point(21, 36),
    shops: [
        new ShopStorage(0, 'General Store', [[123, 5], [46, 2000], [1, 5], [9, 5], [117, 5], [63, 5], [118, 5], [51, 10], [513, 10], [524, 10], [744, 100], [761, 10]], 60),
        new ShopStorage(1, 'Woodcutting Store', [[123, 10], [1, 10], [2, 5], [3, 1], [5, 20], [6, 6]], 120),
        new ShopStorage(2, 'Fishing Store', [[117, 10], [47, 20], [48, 5], [49, 1]], 120),
        new ShopStorage(3, 'Metalsmith Store', [[63, 10], [59, 10], [60, 2]], 120),
        new ShopStorage(4, 'Mining Store', [[9, 10], [10, 5], [11, 1], [55, 10], [56, 5], [57, 1]], 120),
        new ShopStorage(5, 'Crafting Store', [[91, 100], [92, 5000], [87, 10], [88, 1], [524, 25]], 120),
        new ShopStorage(6, 'Alchemy Store', [[76, 100], [77, 100], [78, 500], [79, 350], [80, 200], [81, 100], [493, 40], [495, 50], [494, 20], [513, 10], [500, 1000], [501, 750], [502, 500], [503, 250], [505, 100], [504, 5], [507, 100], [506, 50], [508, 10]], 120),
        new ShopStorage(7, 'Melee Store', [[13, 10], [14, 5], [15, 1], [17, 5], [18, 2], [21, 10], [22, 5], [23, 1], [25, 5], [26, 2], [42, 10], [43, 5], [29, 10], [30, 5]], 120),
        new ShopStorage(8, 'Archery Store', [[37, 10], [38, 5], [39, 1], [68, 500], [69, 100], [70, 50], [71, 10], [105, 10], [106, 5], [109, 10], [110, 5], [113, 10], [114, 5]], 120),
        new ShopStorage(9, 'Magic Store', [[83, 500], [84, 100], [85, 50], [86, 10], [93, 10], [94, 5], [97, 10], [98, 5], [101, 10], [102, 5]], 120),
        new ShopStorage(10, 'Clothing Store', [[331, 5] ,[333, 5] ,[335, 5] ,[337, 5] ,[339, 5] ,[341, 5] ,[343, 5] ,[345, 5] ,[347, 5] ,[475, 5] ,[349, 5] ,[351, 5] ,[353, 5] ,[355, 5] ,[357, 5] ,[359, 5] ,[361, 5] ,[363, 5] ,[365, 5] ,[477, 5] ,[367, 5] ,[369, 5] ,[371, 5] ,[373, 5] ,[375, 5] ,[377, 5] ,[379, 5] ,[381, 5] ,[383, 5] ,[479, 5] ,[385, 5] ,[387, 5] ,[389, 5] ,[391, 5] ,[393, 5] ,[395, 5] ,[397, 5] ,[399, 5] ,[401, 5] ,[481, 5] ,[403, 5] ,[405, 5] ,[407, 5] ,[409, 5] ,[411, 5] ,[413, 5] ,[415, 5] ,[417, 5] ,[419, 5] ,[483, 5] ,[421, 5] ,[423, 5] ,[425, 5] ,[427, 5] ,[429, 5] ,[431, 5] ,[433, 5] ,[435, 5] ,[437, 5] ,[485, 5] ,[439, 5] ,[441, 5] ,[443, 5] ,[445, 5] ,[447, 5] ,[449, 5] ,[451, 5] ,[453, 5] ,[455, 5] ,[487, 5] ,[457, 5] ,[459, 5] ,[461, 5] ,[463, 5] ,[465, 5] ,[467, 5] ,[469, 5] ,[471, 5] ,[473, 5],[489, 5]], 120), 
        new ShopStorage(11, 'Farming Store', [[744, 1000]], 120),
    ],
    safeAreas: [
        // new Bounds(19, 33, 23, 38), //castle left
        // new Bounds(24, 29, 39, 42), //castle center
        // new Bounds(40, 33, 44, 38), //castle right
    ],
    bountyAreas: [
        new Bounds(3, 87, 16, 97), //island
    ],
    multicombatAreas: [
        new Bounds(71, 105, 101, 132), //island
        new Bounds(168, 0, 199, 63), //righr corner
        new Bounds(200, 200, 240, 240), //war zone
        new Bounds(222, 256, 256, 279), //goblin settlement
        new Bounds(203, 247, 301, 339), //goblin cave
    ],
    itemSpawns: loadItemSpawns(TiledMap),
};

const MAP_UNDERGROUND_1 = {
    width: TiledMapUnderground.width,
    height: TiledMapUnderground.height,
    mapBaseTiles: {
        groundTiles : getOptimizedDataArray(
        [
            getLayer(TiledMapUnderground, 'waterOutput').data,
            getLayer(TiledMapUnderground, 'sandOutput').data,
            getLayer(TiledMapUnderground, 'dirtOutput').data,
            getLayer(TiledMapUnderground, 'stoneOutput').data,
            getLayer(TiledMapUnderground, 'detailDirt').data,
        ], getBlockingTiles(TiledMap)),
        structureTiles : getOptimizedDataArray([
            getLayer(TiledMapUnderground, 'detail').data,
            getLayer(TiledMapUnderground, 'detailRisen').data,
        ], []),
        sceneryTiles : getOptimizedDataArray([
            getLayer(TiledMapUnderground, 'flowersOutput').data
        ], [])
    },
    mapWalls: getWalls(
        getLayer(TiledMapUnderground, "wallOutput").data,
        getLayer(TiledMapUnderground, "detailWall"),
        getLayer(TiledMapUnderground, "WorldObjects").objects,
        getLayer(TiledMap, "WORLD_OBJECTS_THAT_BLOCK").data,
        MAP_WIDTH_DUNGEON
    ),
    mapEntities: loadMapEntities(TiledMapUnderground, 1),
    mapGuilds: loadGuilds(TiledMapUnderground),
    musicAreas: loadMusicAreas(TiledMapUnderground),
    spawnPoint: new Point(21, 36),
    shops: [],
    safeAreas: [],
    bountyAreas: [],
    multicombatAreas: loadMultiAreas(TiledMapUnderground),
    itemSpawns: loadItemSpawns(TiledMapUnderground)
};


const MAP_SPECIAL_2 = {
    width: TiledMapSpecial.width,
    height: TiledMapSpecial.height,
    mapBaseTiles: {
        groundTiles : getOptimizedDataArray(
        [
            getLayer(TiledMapSpecial, 'waterOutput').data,
            getLayer(TiledMapSpecial, 'sandOutput').data,
            getLayer(TiledMapSpecial, 'detailSand').data,
            getLayer(TiledMapSpecial, 'landOutput').data,
            getLayer(TiledMapSpecial, 'stoneOutput').data,
            getLayer(TiledMapSpecial, 'dirtOutput').data,
            getLayer(TiledMapSpecial, 'detailDirt').data,
            getLayer(TiledMapSpecial, 'dirtRisenOutput').data,
            getLayer(TiledMapSpecial, 'sandRisenOutput').data,
            getLayer(TiledMapSpecial, 'stoneRisenOutput').data,
        ], getBlockingTiles(TiledMap)),
        structureTiles : getOptimizedDataArray([
            getLayer(TiledMapSpecial, 'detail').data,
            getLayer(TiledMapSpecial, 'detailRisenBehind').data,
            getLayer(TiledMapSpecial, 'detailRisen').data,
        ], []),
        sceneryTiles : getOptimizedDataArray([
            getLayer(TiledMapSpecial, 'flowersOutput').data
        ], [])
    },
    mapWalls: getWalls(
        getLayer(TiledMapSpecial, "wallOutput").data,
        getLayer(TiledMapSpecial, "detailWall"),
        getLayer(TiledMapSpecial, "WorldObjects").objects,
        getLayer(TiledMap, "WORLD_OBJECTS_THAT_BLOCK").data,
        MAP_WIDTH_DUNGEON
    ),
    mapEntities: loadMapEntities(TiledMapSpecial, 2),
    musicAreas: loadMusicAreas(TiledMapSpecial),
    mapGuilds: [],
    spawnPoint: new Point(16, 70),
    shops: [
        new ShopStorage(0, 'General Store', [[127, 1], [123, 5], [46, 2000], [1, 5], [9, 5], [117, 5], [63, 5], [118, 5], [51, 10], [513, 10], [524, 10]], 60),
        new ShopStorage(10, 'Clothing Store', [[331, 5] ,[333, 5] ,[335, 5] ,[337, 5] ,[339, 5] ,[341, 5] ,[343, 5] ,[345, 5] ,[347, 5] ,[475, 5] ,[349, 5] ,[351, 5] ,[353, 5] ,[355, 5] ,[357, 5] ,[359, 5] ,[361, 5] ,[363, 5] ,[365, 5] ,[477, 5] ,[367, 5] ,[369, 5] ,[371, 5] ,[373, 5] ,[375, 5] ,[377, 5] ,[379, 5] ,[381, 5] ,[383, 5] ,[479, 5] ,[385, 5] ,[387, 5] ,[389, 5] ,[391, 5] ,[393, 5] ,[395, 5] ,[397, 5] ,[399, 5] ,[401, 5] ,[481, 5] ,[403, 5] ,[405, 5] ,[407, 5] ,[409, 5] ,[411, 5] ,[413, 5] ,[415, 5] ,[417, 5] ,[419, 5] ,[483, 5] ,[421, 5] ,[423, 5] ,[425, 5] ,[427, 5] ,[429, 5] ,[431, 5] ,[433, 5] ,[435, 5] ,[437, 5] ,[485, 5] ,[439, 5] ,[441, 5] ,[443, 5] ,[445, 5] ,[447, 5] ,[449, 5] ,[451, 5] ,[453, 5] ,[455, 5] ,[487, 5] ,[457, 5] ,[459, 5] ,[461, 5] ,[463, 5] ,[465, 5] ,[467, 5] ,[469, 5] ,[471, 5] ,[473, 5],[489, 5]], 120), 
    ],
    safeAreas: [],
    bountyAreas: [],
    multicombatAreas: [],
    itemSpawns: loadItemSpawns(TiledMapSpecial),
};

delete TiledMap;
delete TiledMapUnderground;
delete TiledMapSpecial;

module.exports.MAP_FLOOR_0 = MAP_FLOOR_0;
module.exports.MAP_UNDERGROUND_1 = MAP_UNDERGROUND_1;
module.exports.MAP_SPECIAL_2 = MAP_SPECIAL_2;

module.exports.getMapTypeDef = (mapID) => {
    switch(mapID) {
        case 0: return MAP_FLOOR_0;
        case 1: return MAP_UNDERGROUND_1;
        case 2: return MAP_SPECIAL_2;
    }
}
