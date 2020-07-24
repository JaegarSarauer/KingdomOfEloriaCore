const Point = require('../def/Point').Point;
var WorldObjectDef = require('../def/WorldObjectDef').WorldObjectDef;
var NPCDef = require('../def/NPCDef').NPCDef;
var ShopStorage = require('../internal/ShopStorage').ShopStorage;
var Action = require('../internal/Action').Action;
if (WorldObjectDef == null) {
    WorldObjectDef = require('../def/WorldObjectDef').default;
    NPCDef = require('../def/NPCDef').default;
    ShopStorage = require('../internal/ShopStorage').default;
    Action = require('../internal/Action').default;
}
const GroundItemDef = require('../def/GroundItemDef');
const Bounds = require('../def/Bounds');
const GuildState = require('../internal/GuildState').GuildState;
const Item = require('./Item');

const MAP_WIDTH = 400;
const SOLID_SQUARE_ID = 60;
const EMPTY_IDS = [0, 1024];
const COMPRESS = false;

class TileData {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.ids = [];
    }

    isSet() {
        return this.ids.length > 0;
    }

    add(tileID) {
        this.ids.push(tileID);
    }
};

class EntityData {
    constructor(x, y, characterID, bounds, isAggressive, tiledID) {
        this.x = x;
        this.y = y;
        this.id = characterID;
        this.b = bounds;
        this.aggro = isAggressive;
        this.tID = tiledID;
    }
};

class WorldObjectData {
    constructor(x, y, id) {
        this.x = x;
        this.y = y;
        this.id = id;
    }
};


class WallData {
    constructor(x, y, wallType) {
        this.x = x;
        this.y = y;
        this.side = wallType;
    }
};

class MapData {
    constructor(id, name, width, height) {
        this.id = id;
        this.name = name;
        this.width = width;
        this.height = height;
    }

};

class GuildData {
    constructor(guildID, guildName) {
        this.id = guildID;
        this.name = guildName;
    }
}

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

function getLayer(JSONMap, layerName) {
    let result = JSONMap.layers.find(function(layer) {
        return layer.name == layerName;
    });
    if (result == null) {
        result = {data : null};
    }
    return result;
}

function getBlockingTiles(JSONMap) {
    let result = [];
    let data = getLayer(JSONMap, "BLOCK_TILES").data;
    if (data != null) {
        for(let i = 0; i < data.length; ++i) {
            if(data[i] != 0) {
                result.push(data[i]);
            }
        }
    }
    return result;
}

function getOptimizedDataArray(layerDataArray, blockingTilesArray ) {
    let result = [];

    let blockingTiles = {};
    for(let i = 0; i < blockingTilesArray.length; ++i) {
        blockingTiles[blockingTilesArray[i]] = true;
    }

    blockingTiles[0] = false;

    let tileDatas = {};
    let setData = (x, y, tileId) => {
        if (tileDatas[x] == null) {
            tileDatas[x] = {};
        }
        if (tileDatas[x][y] == null) {
            tileDatas[x][y] = new TileData(x, y);
        }
        tileDatas[x][y].add(tileId);
    }

    for(let layerIndex = 0; layerIndex < layerDataArray.length; ++layerIndex) {
        let layerData = layerDataArray[layerIndex];
        if (layerData != null) {
            for(let d = 0; d < layerData.length; ++d) {
                let tileId = layerData[d];
                let x = d % MAP_WIDTH;
                let y =  Math.floor(d / MAP_WIDTH)
    
                if (!EMPTY_IDS.includes(tileId)) {
                    setData(x, y, tileId);
                }
            }
        }
    }

    for(let x = 0; x < MAP_WIDTH; ++x) {
        for(let y = 0; y < MAP_WIDTH; ++y) {
            if (tileDatas[x] != null && tileDatas[x][y] != null && tileDatas[x][y].ids != null && tileDatas[x][y].ids.length > 0) {
                if (result[x] == null) {
                    result[x] = {};
                }

                if (tileDatas[x][y].ids.length == 1) {
                    result[x][y] = tileDatas[x][y].ids[0];
                }
                else {
                    let optimizedIds = [];
                    let ids = tileDatas[x][y].ids;

                    for(let i = ids.length - 1; i >= 0; --i) {
                        optimizedIds.push(ids[i]);
                        if (blockingTiles[ids[i]] != null) {
                            break;
                        }
                    }
                    result[x][y] = optimizedIds.reverse();
                }
            }
        }
    }

    return result;
}

function loadMapWorldObjects(JSONMap) {
    let gidStart = JSONMap.tilesets[4].firstgid + 1;
    let entityObjects = getLayer(JSONMap, "WorldObjects").objects;
    let entitiesArray = [];
    for (let i = 0; i < entityObjects.length; i++) {
        let obj = entityObjects[i];
        let id = obj.gid - gidStart; 
        let x = Math.floor(obj.x / obj.width);
        let y = Math.floor(obj.y / obj.height) - 1;
        entitiesArray.push([x, y, id]);
    }

    return entitiesArray;
}


function loadMapCharacters(JSONMap) {
    let gidStart = JSONMap.tilesets[3].firstgid;
    let entityObjects = getLayer(JSONMap, "Characters").objects;
    let entitiesArray = [];
    for (let i = 0; i < entityObjects.length; i++) {
        let obj = entityObjects[i];
        let id = obj.gid - gidStart; 
        let tiledID = obj.id;
        let x = Math.floor(obj.x / obj.width);
        let y = Math.floor(obj.y / obj.height) - 1;
        let bounds = null;
        if (obj.properties && obj.properties.boundsX1) {
            bounds = new Bounds(obj.properties.boundsX1, obj.properties.boundsY1, obj.properties.boundsX2, obj.properties.boundsY2);
        }
        let isAggressive = obj.properties && obj.properties.isAggressive || false;
        let attackNPCs = obj.properties && obj.properties.attackNPC || false;
        
        let npcDef = new EntityData(x, y, id, bounds, isAggressive, tiledID);
        if (attackNPCs) {
            npcDef.atkNPC = obj.properties.attackNPC;
        }
        npcDef.properties = obj.properties;
        
        entitiesArray.push(npcDef);
    }
    return entitiesArray;
}

function loadItemSpawns(JSONMap) {
    let gidStart = JSONMap.tilesets[5].firstgid + 1;
    let entityObjects = getLayer(JSONMap, "Items").objects;
    let entitiesArray = [];
    for (let i = 0; i < entityObjects.length; i++) {
        let obj = entityObjects[i];
        let id = obj.properties && obj.properties.id || (obj.gid - gidStart); 
        let x = Math.floor(obj.x / (obj.width * 2));
        let y = Math.floor(obj.y / (obj.height * 2)) - 1;
        let itemAmount = obj.properties && obj.properties.itemAmount || 1;
        let isNoted = obj.properties && obj.properties.isNoted || false;
        try {
            if (isNoted) {
                id = Item.Item[id].notedID || id;
            } else {
                id = Item.Item[id].unnotedID || id;
            } 
        } catch(e) {
            console.info( 'Failed to create World Object from Tiled at position', obj.x / 64, obj.y / 64, e);
        }
        entitiesArray.push([id, itemAmount, x, y]);
    }
    return entitiesArray;
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
            let x = Math.floor(object.x / object.width);
            let y = Math.floor(object.y / object.height) - 1;
            let index = (y * mapWidth) + x;
            wallDataArray[index] = SOLID_SQUARE_ID;
        }
    }

    if (detailWall) {
        let wallData = detailWall.data;
        if (wallData) {
            for(let i = 0; i < wallData.length; ++i) {
                if ( wallData[i] > 0 ) {
                    wallDataArray[i] = wallData[i];
                }
            }
        }
    }

    let result = [];
    for(let i = 0; i < wallDataArray.length; ++i) {
        let tileId = wallDataArray[i] % 1024;
        let x = i % mapWidth;
        let y =  Math.floor(i / mapWidth);
        // NOTE WallTiles should be 0-60
        if (tileId != null && tileId > 0 && !EMPTY_IDS.includes(tileId) && tileId <= 60) {
            result.push([x, y, tileId]);
        }
    }

    return result;
}

function loadMusicAreas(JSONMap) {
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

function loadGuilds(JSONMap) {
    let entityObjects = getLayer(JSONMap, "GuildAreas").objects
    let guildsArray = [];
    if (entityObjects != null) {
        
        entityObjects.sort(function(a,b) { return a.properties.guildID-b.properties.guildID })

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
                guildsArray[guildID] = new GuildData(guildID, guildName);
                guild = guildsArray[guildID];
            }
    
            if (areaType == 'city') {
                guild.cityArea = area;
            } else if (areaType == 'mayor') {
                guild.mayorArea = area;
            }
        }
    }
    return guildsArray;
}

class ShopStorageData {
    constructor(shopRefID, shopName, shopDefaultStockArray, restockTicks) {
        this.shopRefID = shopRefID,
        this.shopName = shopName;
        this.shopDefaultStockArray = shopDefaultStockArray;
        this.restockTicks = restockTicks;
    }
}


function loadMultiAreas(JSONMap) {
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

module.exports.compressMapData = (mapID, name) => {
    let width = MAP_WIDTH;
    let height = MAP_WIDTH;

    let mapData = new MapData(mapID, name, width, height );
    let tiledMap  = null;

    try {
        switch(mapID) {
            case 0:
                tiledMap = require('../../../GuildsOfGodsAssets/MapDesign/TiledMap.json');
                mapData.spawnPoint = [21, 36];
                mapData.shopsData = [
                    new ShopStorageData(0, 'General Store', [[123, 5], [46, 2000], [1, 5], [9, 5], [117, 5], [63, 5], [118, 5], [51, 10], [513, 10], [524, 10], [744, 100], [761, 10]], 60),
                    new ShopStorageData(1, 'Woodcutting Store', [[123, 10], [1, 10], [2, 5], [3, 1], [5, 20], [6, 6]], 120),
                    new ShopStorageData(2, 'Fishing Store', [[117, 10], [47, 20], [48, 5], [49, 1]], 120),
                    new ShopStorageData(3, 'Metalsmith Store', [[63, 10], [59, 10], [60, 2]], 120),
                    new ShopStorageData(4, 'Mining Store', [[9, 10], [10, 5], [11, 1], [55, 10], [56, 5], [57, 1]], 120),
                    new ShopStorageData(5, 'Crafting Store', [[91, 100], [92, 5000], [87, 10], [88, 1], [524, 25]], 120),
                    new ShopStorageData(6, 'Alchemy Store', [[76, 100], [77, 100], [78, 500], [79, 350], [80, 200], [81, 100], [493, 40], [495, 50], [494, 20], [513, 10], [500, 1000], [501, 750], [502, 500], [503, 250], [505, 100], [504, 5], [507, 100], [506, 50], [508, 10]], 120),
                    new ShopStorageData(7, 'Melee Store', [[13, 10], [14, 5], [15, 1], [17, 5], [18, 2], [21, 10], [22, 5], [23, 1], [25, 5], [26, 2], [42, 10], [43, 5], [29, 10], [30, 5]], 120),
                    new ShopStorageData(8, 'Archery Store', [[37, 10], [38, 5], [39, 1], [68, 500], [69, 100], [70, 50], [71, 10], [105, 10], [106, 5], [109, 10], [110, 5], [113, 10], [114, 5]], 120),
                    new ShopStorageData(9, 'Magic Store', [[83, 500], [84, 100], [85, 50], [86, 10], [93, 10], [94, 5], [97, 10], [98, 5], [101, 10], [102, 5]], 120),
                    new ShopStorageData(10, 'Clothing Store', [[331, 5] ,[333, 5] ,[335, 5] ,[337, 5] ,[339, 5] ,[341, 5] ,[343, 5] ,[345, 5] ,[347, 5] ,[475, 5] ,[349, 5] ,[351, 5] ,[353, 5] ,[355, 5] ,[357, 5] ,[359, 5] ,[361, 5] ,[363, 5] ,[365, 5] ,[477, 5] ,[367, 5] ,[369, 5] ,[371, 5] ,[373, 5] ,[375, 5] ,[377, 5] ,[379, 5] ,[381, 5] ,[383, 5] ,[479, 5] ,[385, 5] ,[387, 5] ,[389, 5] ,[391, 5] ,[393, 5] ,[395, 5] ,[397, 5] ,[399, 5] ,[401, 5] ,[481, 5] ,[403, 5] ,[405, 5] ,[407, 5] ,[409, 5] ,[411, 5] ,[413, 5] ,[415, 5] ,[417, 5] ,[419, 5] ,[483, 5] ,[421, 5] ,[423, 5] ,[425, 5] ,[427, 5] ,[429, 5] ,[431, 5] ,[433, 5] ,[435, 5] ,[437, 5] ,[485, 5] ,[439, 5] ,[441, 5] ,[443, 5] ,[445, 5] ,[447, 5] ,[449, 5] ,[451, 5] ,[453, 5] ,[455, 5] ,[487, 5] ,[457, 5] ,[459, 5] ,[461, 5] ,[463, 5] ,[465, 5] ,[467, 5] ,[469, 5] ,[471, 5] ,[473, 5],[489, 5]], 120), 
                    new ShopStorageData(11, 'Farming Store', [[744, 1000]], 120),
                    new ShopStorageData(12, 'Tergaron General Store', [], 120),
                    new ShopStorageData(13, 'Tergaron Metalsmith Store', [], 120),
                    new ShopStorageData(14, 'Tergaron Mining Store', [], 120),
                    new ShopStorageData(15, 'NULL STORE', [], 120),
                    new ShopStorageData(16, 'Salmo Fishing Store', [], 120),
                    new ShopStorageData(17, 'Salmo Archery Store', [], 120),
                    new ShopStorageData(18, 'Salmo Alchemy Store', [], 120),
                    new ShopStorageData(19, 'Salmo Magic Store', [], 120),
                    new ShopStorageData(20, 'Acernis General Store', [], 120),
                    new ShopStorageData(21, 'Acernis Woodcutting Store', [], 120),
                    new ShopStorageData(22, 'Acernis Archery Store', [], 120),
                    new ShopStorageData(23, 'Acernis Fletching Store', [], 120),
                ];
                mapData.SafeAreas = [
                    new Bounds(19, 33, 23, 38), //castle left
                    new Bounds(24, 29, 39, 42), //castle center
                    new Bounds(40, 33, 44, 38), //castle right
                ];
                mapData.bountyAreaData =  [
                    new Bounds(3, 87, 16, 97), //island
                ];
                mapData.multicombatAreas = [
                    new Bounds(71, 105, 101, 132), //island
                    new Bounds(168, 0, 199, 63), //righr corner
                    new Bounds(200, 200, 240, 240), //war zone
                    new Bounds(222, 256, 256, 279), //goblin settlement
                    new Bounds(203, 247, 301, 339), //goblin cave
                ];
                break;
            case 1:
                tiledMap = require('../../../GuildsOfGodsAssets/MapDesign/TiledMapUnderground.json');
    
                mapData.spawnPoint = new Point(21, 36);
                mapData.shopsData = [];
                mapData.SafeAreas = [];
                mapData.bountyAreaData = [];
                mapData.multicombatAreas = loadMultiAreas(tiledMap);
                break;
            case 2:
                tiledMap = require('../../../GuildsOfGodsAssets/MapDesign/TiledMapSpecial.json');
    
                mapData.spawnPoint = new Point(16, 70);
                mapData.shopsData = [
                            new ShopStorageData(0, 'General Store', [[127, 1], [123, 5], [46, 2000], [1, 5], [9, 5], [117, 5], [63, 5], [118, 5], [51, 10], [513, 10], [524, 10]], 60),
                            new ShopStorageData(10, 'Clothing Store', [[331, 5] ,[333, 5] ,[335, 5] ,[337, 5] ,[339, 5] ,[341, 5] ,[343, 5] ,[345, 5] ,[347, 5] ,[475, 5] ,[349, 5] ,[351, 5] ,[353, 5] ,[355, 5] ,[357, 5] ,[359, 5] ,[361, 5] ,[363, 5] ,[365, 5] ,[477, 5] ,[367, 5] ,[369, 5] ,[371, 5] ,[373, 5] ,[375, 5] ,[377, 5] ,[379, 5] ,[381, 5] ,[383, 5] ,[479, 5] ,[385, 5] ,[387, 5] ,[389, 5] ,[391, 5] ,[393, 5] ,[395, 5] ,[397, 5] ,[399, 5] ,[401, 5] ,[481, 5] ,[403, 5] ,[405, 5] ,[407, 5] ,[409, 5] ,[411, 5] ,[413, 5] ,[415, 5] ,[417, 5] ,[419, 5] ,[483, 5] ,[421, 5] ,[423, 5] ,[425, 5] ,[427, 5] ,[429, 5] ,[431, 5] ,[433, 5] ,[435, 5] ,[437, 5] ,[485, 5] ,[439, 5] ,[441, 5] ,[443, 5] ,[445, 5] ,[447, 5] ,[449, 5] ,[451, 5] ,[453, 5] ,[455, 5] ,[487, 5] ,[457, 5] ,[459, 5] ,[461, 5] ,[463, 5] ,[465, 5] ,[467, 5] ,[469, 5] ,[471, 5] ,[473, 5],[489, 5]], 120), 
                ];
                mapData.SafeAreas = [];
                mapData.bountyAreaData = [];
                mapData.multicombatAreas = [];
                break;
            default:
                break;
        }
    }
    catch (e) {

    }

    mapData.tileData = {
        groundTiles : getOptimizedDataArray(
        [
            getLayer(tiledMap, 'waterOutput').data,
            getLayer(tiledMap, 'sandOutput').data,
            getLayer(tiledMap, 'detailSand').data,
            getLayer(tiledMap, 'landOutput').data,
            getLayer(tiledMap, 'deepForestOutput').data,
            getLayer(tiledMap, 'stoneOutput').data,
            getLayer(tiledMap, 'dirtOutput').data,
            getLayer(tiledMap, 'compactDirtOutput').data,
            getLayer(tiledMap, 'detailLava').data,
            getLayer(tiledMap, 'detailDirt').data,
            getLayer(tiledMap, 'dirtRisenOutput').data,
            getLayer(tiledMap, 'sandRisenOutput').data,
            getLayer(tiledMap, 'stoneRisenOutput').data,
        ], getBlockingTiles(tiledMap)),
        structureTiles : getOptimizedDataArray([
            getLayer(tiledMap, 'detail').data,
            getLayer(tiledMap, 'detailRisenBehind').data,
            getLayer(tiledMap, 'detailRisen').data,
        ], []),
        sceneryTiles : getOptimizedDataArray([
            getLayer(tiledMap, 'flowersOutput').data,
            getLayer(tiledMap, 'detailGround').data,
        ], [])
    };
    mapData.worldObjectData = loadMapWorldObjects(tiledMap);
    mapData.npcData = loadMapCharacters(tiledMap);
    mapData.worldItemData = loadItemSpawns(tiledMap);
    mapData.wallData = getWalls(
        getLayer(tiledMap, "wallOutput").data,
        getLayer(tiledMap, "detailWall"),
        getLayer(tiledMap, "WorldObjects").objects,
        getLayer(tiledMap, "WORLD_OBJECTS_THAT_BLOCK").data,
        width );

    mapData.guildsData = loadGuilds( tiledMap );
    mapData.musicData = loadMusicAreas( tiledMap );

    let fileName = '../GuildsOfGodsAssets/MapDesign/' + name + '.json';
    try {
        let fs = require('fs');
        fs.writeFileSync(fileName, JSON.stringify(mapData), function (err) {
            if (err) return console.log(err);
            console.log('Failed to compress map' + fileName);
        });
    }
    catch(e) {
        // Only server has fs
    }
}


if (COMPRESS) {
    module.exports.compressMapData(0, 'Overworld');
    module.exports.compressMapData(1, 'Underworld');
    module.exports.compressMapData(2, 'SpecialWorld');
    console.info("Maps compressed");
}


let mapDataLookup = {};
module.exports.getMapData = (mapID, name) => {
    if (mapDataLookup[mapID] == null) {
        switch(mapID) {
            case 0:
            mapDataLookup[mapID] = require('../Overworld.json');
            break;
            case 1:
            mapDataLookup[mapID] = require('../Underworld.json');
            break;
            case 2:
            mapDataLookup[mapID] = require('../SpecialWorld.json');
            break;
        }
    }
    return mapDataLookup[mapID];
};