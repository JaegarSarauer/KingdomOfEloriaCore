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
const Item = require('../typedef/Item');

const MapCompressor = require('./MapCompressor');

const MAP_WIDTH = 400;
const SOLID_SQUARE_ID = 60;

module.exports.GetEntityDataFromMap = function(tiledID, mapID) {
    if (objectMapData[mapID] && objectMapData[mapID][tiledID]) {
        return objectMapData[mapID][tiledID];
    }
    return null;
}


let mapData = [
    MapCompressor.getMapData(0, 'Overworld'),
    MapCompressor.getMapData(1, 'Underworld'),
    MapCompressor.getMapData(2, 'SpecialWorld'),
];

function tileDataToMapBaseTiles(tileData) {
    return tileData;
}
function wallDataToMapWalls(wallData) {
    return wallData;
}

let objectMapData = {}
function entityDataToMapEntities(worldObjectData, npcData, mapID) {
    let overrideData = {};
    let entitiesArray = [];

    for(let i = 0; i < worldObjectData.length; ++i) {
        let data = worldObjectData[i];
        let x = data[0];
        let y = data[1];
        let id = data[2];
        entitiesArray.push(new WorldObjectDef(id, x, y));
    }

    let entityData = npcData;
    for(let i = 0; i < entityData.length; ++i) {
        let data = entityData[i];

        let x = data.x;
        let y = data.y;
        let id = data.id;
        let bounds = null;
        if (data.b != null) {
            bounds = new Bounds().copyFrom(data.b);
        } 
        let isAggressive = data.aggro;
        let tiledID = data.tID;
        let attackNPCs = data.atkNPC != null;
        let properties = data.data;

        let ignoreKeys = ['boundsX1', 'boundsX2', 'boundsY1', 'boundsY2', 'isAggresive'];

        let npcDef = new NPCDef(id, x, y, bounds, isAggressive, tiledID);

        if (properties && npcDef.def) {
            let defCopy = JSON.parse(JSON.stringify(npcDef.def));
            let keys = Object.keys(properties);
            let hit = false;
            for(let i = 0; i < keys.length; ++i) {
                if (!ignoreKeys.includes(keys[i])) {
                    let innerKeys = keys[i].split('.');
                    let overrideValue = properties[keys[i]];
    
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
                    let npcToAttack = data.atkNPC;
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
function guildDataToGuilds(guildData) {
    let guildsArray = [];
    for (let i = 0; i < guildData.length; i++) {
        let obj = guildData[i];

        let guild = guildsArray[obj.id] = new GuildState(obj.id, obj.name);
        guild.cityArea = obj.cityArea;
        guild.mayorArea = obj.mayorArea;
    }
    return guildsArray;
}
function shopDataToShops(shopStorageData) {
    let shopDatas = [];
    for(let i = 0; i < shopStorageData.length; ++i) {
        let data = shopStorageData[i];
        shopDatas.push(new ShopStorage(data.shopRefID, data.shopName, data.shopDefaultStockArray, data.restockTicks));
    }
    return shopDatas
}

function copyBoundsArray(boundsArray) {
    let result = [];
    for(let i = 0; i < boundsArray.length; ++i) {
        let bounds = boundsArray[i];
        result.push(new Bounds().copyFrom(bounds));
    }
    return result;
}

function mapDataToMap(mapData) {
    return {
        id: mapData.id,
        name : mapData.name,
        width : mapData.width,
        height : mapData.height,
        spawnPoint: new Point(mapData.spawnPoint[0], mapData.spawnPoint[1]),
        mapBaseTiles: tileDataToMapBaseTiles(mapData.tileData),
        mapWalls: wallDataToMapWalls(mapData.wallData),
        mapEntities: entityDataToMapEntities(mapData.worldObjectData, mapData.npcData, mapData.id),
        mapGuilds: guildDataToGuilds(mapData.guildsData),
        musicAreas: mapData.musicData,
        shops: shopDataToShops(mapData.shopsData),
        safeAreas: copyBoundsArray(mapData.SafeAreas),
        bountyAreas: copyBoundsArray(mapData.bountyAreaData ),
        multicombatAreas: copyBoundsArray(mapData.multicombatAreas),
        itemSpawns: mapData.worldItemData,
    };
}

const MAP_FLOOR_0 = mapDataToMap(mapData[0]);
const MAP_UNDERGROUND_1 = mapDataToMap(mapData[1]);
const MAP_SPECIAL_2 = mapDataToMap(mapData[2]);

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
