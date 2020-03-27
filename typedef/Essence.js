
/**
 * MinLevel:
 * Minimum firemaking level to incinerate this item
 * 
 * Carbon:
 * Carbon earned from 
 * 
 * EssenceValueArray:
 * [[essenceItemID, essenceFuel], [essenceItemID, essenceFuel], ...]
 */
const EssenceValue = (minLevel, carbon, essenceValueArray) => {
    return {
        burnLevel: minLevel,
        carbon,
        essenceValueArray,
    };
}

module.exports.EssenceValue = EssenceValue;

const ShardIDs = [500, 501, 502, 503, 504, 505, 506, 507, 508, 509, 510, 511];
const EssenceIDs = [78, 79, 80, 81, 126, 493, 494, 495, 496, 497, 498, 499];

module.exports.ShardIDs = ShardIDs;
module.exports.EssenceIDs = EssenceIDs;

const ShardCatalog = {
    AIR: (shards) => {
        return [500, Math.round(shards)];
    },
    WATER: (shards) => {
        return [501, Math.round(shards)];
    },
    EARTH: (shards) => {
        return [502, Math.round(shards)];
    },
    FIRE: (shards) => {
        return [503, Math.round(shards)];
    },
    VOID: (shards) => {
        return [504, Math.round(shards)];
    },
    METAL: (shards) => {
        return [505, Math.round(shards)];
    },
    FORCE: (shards) => {
        return [506, Math.round(shards)];
    },
    SHARP: (shards) => {
        return [507, Math.round(shards)];
    },
    POISON: (shards) => {
        return [508, Math.round(shards)];
    },
    BIND: (shards) => {
        return [509, Math.round(shards)];
    },
    SOUL: (shards) => {
        return [510, Math.round(shards)];
    },
    NATURE: (shards) => {
        return [511, Math.round(shards)];
    },
};

const EssenceCatalog = {
    AIR: (essence) => {
        return [78, Math.round(essence)];
    },
    WATER: (essence) => {
        return [79, Math.round(essence)];
    },
    EARTH: (essence) => {
        return [80, Math.round(essence)];
    },
    FIRE: (essence) => {
        return [81, Math.round(essence)];
    },
    VOID: (essence) => {
        return [126, Math.round(essence)];
    },
    METAL: (essence) => {
        return [493, Math.round(essence)];
    },
    FORCE: (essence) => {
        return [494, Math.round(essence)];
    },
    SHARP: (essence) => {
        return [495, Math.round(essence)];
    },
    POISON: (essence) => {
        return [496, Math.round(essence)];
    },
    BIND: (essence) => {
        return [497, Math.round(essence)];
    },
    SOUL: (essence) => {
        return [498, Math.round(essence)];
    },
    NATURE: (essence) => {
        return [499, Math.round(essence)];
    },
};

module.exports.EssenceCatalog = EssenceCatalog;
module.exports.ShardCatalog = ShardCatalog;