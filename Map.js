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
const Bounds = require('../def/Bounds').Bounds;
const GuildState = require('../internal/GuildState');
const Guilds = require('../typedef/Guild').Guilds;
const Item = require('../typedef/Item');

const MapCompressor = require('./MapCompressor');

const MAP_WIDTH = 400;
const SOLID_SQUARE_ID = 60;

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

function entityDataToMapEntities(worldObjectData, charData, mapID) {
    let entities = [];
    let customEntityData = {};
    let overrideDef = null;

    for(let i = 0; i < worldObjectData.length; ++i) {
        let defData = worldObjectData[i];
        let x = defData[0];
        let y = defData[1];
        let id = defData[2];
        entities.push(new WorldObjectDef(id, x, y));
    }

    for(let i = 0; i < charData.length; ++i) {
        let defData = charData[i];

        let x = defData.x;
        let y = defData.y;
        let id = defData.id;
        let bounds = null;
        if (defData.b != null) {
            bounds = new Bounds().copyFrom(defData.b);
        } 
        let isAggressive = defData.aggro;
        let tiledID = defData.tID;
        let properties = defData.properties;
        let propertiesFound = false;

        let ignoreKeys = ['boundsX1', 'boundsX2', 'boundsY1', 'boundsY2', 'isAggressive'];

        let npcDef = new NPCDef(id, x, y, bounds, isAggressive, tiledID);
        if (properties && npcDef.def) {
            let defCopy = JSON.parse(JSON.stringify(npcDef.def));
            let keys = Object.keys(properties);
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
                            propertiesFound = true;
                        }
                    }
                }
            }
            
            if (propertiesFound) {
                customEntityData[tiledID] = defCopy;
            }
        }

        if (defData.atkNPC != null) {
            npcDef.isAggressiveTo = [defData.atkNPC];
        }

        if (propertiesFound) {
            let baseDefCopy = JSON.parse(JSON.stringify(npcDef.def));
            npcDef.def = Object.assign({}, baseDefCopy, customEntityData[tiledID]);
        }

        entities.push(npcDef);
    }

    return {entities, customEntityData};
}

function guildDataToGuilds(guildData) {
    let result = {
        guildsArray : [],
        cityArray : [],
    };
    let keys = Object.keys(guildData);
    for (let i = 0; i < keys.length; i++) {
        let obj = guildData[keys[i]];
        if (obj != null ) {
            // If it has a guild ID, it's a guild
            if (obj.id != null && Guilds[obj.id]) {
                result.guildsArray[obj.id] = GuildState.createGuildState(obj.id, obj.cityArea, obj.mayorArea);
            }
            else if (obj.cityArea) {
                result.cityArray.push(GuildState.createCityDef(obj.cityArea));  
            }
        }
    }
    return result;
}

function shopDataToShops(shopStorageData) {
    let shopDatas = [];
    for(let i = 0; i < shopStorageData.length; ++i) {
        let data = shopStorageData[i];
        let shopDefaultStockArray = data.shopDefaultStockArray;

        if (data.guildID != null && data.guildID >= 0) {
            for (let i = 0; i < Guilds[data.guildID].guildShops.length; ++i) {
                if (Guilds[data.guildID].guildShops[i].shopRefID == data.shopRefID) {
                    shopDefaultStockArray = Guilds[data.guildID].guildShops[i].getStock(0);
                }
            }
        }
        shopDatas.push(new ShopStorage(data.shopRefID, data.shopName, shopDefaultStockArray, data.restockTicks));
    }
    return shopDatas;
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
    let mapEntityData = entityDataToMapEntities(mapData.worldObjectData, mapData.npcData, mapData.id);
    return {
        id: mapData.id,
        name : mapData.name,
        width : mapData.width,
        height : mapData.height,
        spawnPoint: new Point(mapData.spawnPoint[0], mapData.spawnPoint[1]),
        mapBaseTiles: tileDataToMapBaseTiles(mapData.tileData),
        mapWalls: wallDataToMapWalls(mapData.wallData),
        mapEntities: mapEntityData.entities,
        mapGuilds: guildDataToGuilds(mapData.guildsData),
        musicAreas: mapData.musicData,
        shops: shopDataToShops(mapData.shopsData),
        safeAreas: copyBoundsArray(mapData.SafeAreas),
        bountyAreas: copyBoundsArray(mapData.bountyAreaData ),
        multicombatAreas: copyBoundsArray(mapData.multicombatAreas),
        itemSpawns: mapData.worldItemData,
        customEntityData: mapEntityData.customEntityData,
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
