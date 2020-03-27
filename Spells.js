const EssenceCatalog = require('./Essence').EssenceCatalog;
const StepResult = require('./Step').StepResult;
const StepType = require('./Step').StepType;

const SpellBuilder = {
    COMBAT: (id, name, magicLevelReq, essenceRequirement, projectileID, equipmentStats, attackRange, spellIconIndex) => {
        return {
            id,
            name,
            type: SpellType.COMBAT,
            magicLevelReq,
            essenceRequirement,
            projectileID,
            attackRange,
            equipmentStats,
            spellIconIndex,
            actions: [{
                interfaceID: 21,
                id: 1,
                name: 'Set Autocast',
                
            }],
        };
    },
    ITEM_PICKUP_AREA: (id, xpGain, name, magicLevelReq, essenceRequirement, pickupSize, spellIconIndex) => {
        let steps = [];
        
        steps.push(buildStep(StepType.IS_TIMER_EXPIRED, { params: [8] })); //consumable cooldown
        for (let i = 0; i < essenceRequirement.length; i++) {
            steps.push(buildStep(StepType.HAS_INVENTORY_ITEM, { params: [essenceRequirement[i][0], essenceRequirement[i][1]] }));
        }
        for (let i = 0; i < magicLevelReq.length; i++) {
            steps.push(buildStep(StepType.HAS_SKILL_LEVEL, { params: [magicLevelReq[i][0], magicLevelReq[i][1]] }));
        }
        for (let i = 0; i < essenceRequirement.length; i++) {
            steps.push(buildStep(StepType.REMOVE_INVENTORY_ITEM, { params: [essenceRequirement[i][0], essenceRequirement[i][1]] }));
        }
        steps.push(buildStep(StepType.UPDATE_TIMER, { params: [8, 4] })); //consumable cooldown
        steps.push(buildStep(StepType.GIVE_XP, { params: [22, xpGain] })); //hardcoded env. magic xp
        steps.push(buildStep(StepType.PICKUP_ITEM_AREA, { params: [pickupSize] }));
        steps.push(buildStep(StepType.PLAY_SOUND, {params: [18]}));
        return {
            id,
            xpGain,
            name,
            type: SpellType.PICKUP_AREA,
            magicLevelReq,
            essenceRequirement,
            spellIconIndex,
            actions: [{
                name: 'Cast',
                interfaceID: 19,
                id: 0,
                actionInterval: 1,
                steps: [steps],
            }],
        };
    },
    ENCHANT: (id, name, magicLevelReq, essenceRequirement, enchantmentID, spellIconIndex) => {
        let enchantSteps = [];
        for (let i = 0; i < essenceRequirement.length; i++) {
            enchantSteps.push(buildStep(StepType.HAS_INVENTORY_ITEM, { params: [essenceRequirement[i][0], essenceRequirement[i][1]] }));
        }
        for (let i = 0; i < magicLevelReq.length; i++) {
            enchantSteps.push(buildStep(StepType.HAS_SKILL_LEVEL, { params: [magicLevelReq[i][0], magicLevelReq[i][1]] }));
        }
        for (let i = 0; i < essenceRequirement.length; i++) {
            enchantSteps.push(buildStep(StepType.REMOVE_INVENTORY_ITEM, { params: [essenceRequirement[i][0], essenceRequirement[i][1]] }));
        }
        enchantSteps.push(buildStep(StepType.SEND_CLIENT_MESSAGE, { params: ['You cast the teleport spell...'] }));
        
        enchantSteps.push(buildStep(StepType.IS_TIMER_EXPIRED, { params: [11] }));
        enchantSteps.push(buildStep(StepType.GIVE_XP, { params: [22, xpGain] })); //hardcoded env. magic xp
        enchantSteps.push(buildStep(StepType.TELEPORT, { params: teleportParams }));

        return {
            id,
            name,
            type: SpellType.ENCHANT,
            magicLevelReq,
            essenceRequirement,
            spellIconIndex,
            enchantmentID,
            actions: [{
                name: 'Cast',
                interfaceID: 19,
                id: 0,
                steps: [enchantSteps],
            }],
        };
    },
    TELEPORT: (id, xpGain, name, magicLevelReq, essenceRequirement, teleportParams, spellIconIndex) => {
        let teleportSteps = [];
        for (let i = 0; i < essenceRequirement.length; i++) {
            teleportSteps.push(buildStep(StepType.HAS_INVENTORY_ITEM, { params: [essenceRequirement[i][0], essenceRequirement[i][1]] }));
        }
        for (let i = 0; i < magicLevelReq.length; i++) {
            teleportSteps.push(buildStep(StepType.HAS_SKILL_LEVEL, { params: [magicLevelReq[i][0], magicLevelReq[i][1]] }));
        }
        for (let i = 0; i < essenceRequirement.length; i++) {
            teleportSteps.push(buildStep(StepType.REMOVE_INVENTORY_ITEM, { params: [essenceRequirement[i][0], essenceRequirement[i][1]] }));
        }
        teleportSteps.push(buildStep(StepType.SEND_CLIENT_MESSAGE, { params: ['You cast the teleport spell...'] }));
        
        teleportSteps.push(buildStep(StepType.IS_TIMER_EXPIRED, { params: [11] }));
        teleportSteps.push(buildStep(StepType.GIVE_XP, { params: [22, xpGain] })); //hardcoded env. magic xp
        teleportSteps.push(buildStep(StepType.TELEPORT, { params: teleportParams }));
        return {
            id,
            xpGain,
            name,
            teleportParams,
            type: SpellType.TELEPORT,
            magicLevelReq,
            essenceRequirement,
            spellIconIndex,
            actions: [{
                name: 'Cast',
                interfaceID: 19,
                id: 0,
                steps: [teleportSteps],
            }],
        };
    }
};

const SpellType = {
    COMBAT: {
        id: 0,
        spellbookActionIDs: [2, 1],
        buildActions: () => {

        }
        // Requires: equipmentStats, 
    },      
    ENCHANT: {
        id: 1,
        spellbookActionIDs: [3],
    },        
    TELEPORT: {
        id: 2,
        spellbookActionIDs: [3],
    },        
    OTHER: {
        id: 3,
        spellbookActionIDs: null, // Requires custom steps array.
    },   
    PICKUP_AREA: {
        id: 4,
        spellbookActionIDs: [3],
    }
};

module.exports.Spells = [
    SpellBuilder.COMBAT(0, 'Lesser Air Wound', [[6, 1]], [EssenceCatalog.AIR(3), EssenceCatalog.FORCE(1)], 6, [0,0,0,0,0,0,3,2,0], 7, 0),
    SpellBuilder.COMBAT(1, 'Lesser Water Wound', [[6, 2]], [EssenceCatalog.AIR(3), EssenceCatalog.WATER(1), EssenceCatalog.FORCE(1)], 7, [0,0,0,0,0,0,4,4,0], 7, 1),
    SpellBuilder.COMBAT(2, 'Lesser Earth Wound', [[6, 4]], [EssenceCatalog.AIR(3), EssenceCatalog.EARTH(1), EssenceCatalog.FORCE(1)], 8, [0,0,0,0,0,0,5,6,0], 7, 2),
    SpellBuilder.COMBAT(3, 'Lesser Fire Wound', [[6, 6]], [EssenceCatalog.AIR(3), EssenceCatalog.FIRE(1), EssenceCatalog.FORCE(1)], 9, [0,0,0,0,0,0,6,8,0], 7, 3),
    SpellBuilder.COMBAT(4, 'Lesser Metal Wound', [[6, 8]], [EssenceCatalog.AIR(3), EssenceCatalog.METAL(1), EssenceCatalog.FORCE(1)], 10, [0,0,0,0,0,0,7,10,0], 7, 4),
    SpellBuilder.COMBAT(5, 'Air Wound', [[6, 10]], [EssenceCatalog.AIR(3), EssenceCatalog.FORCE(2)], 6, [0,0,0,0,0,0,8,12,0], 7, 5),
    SpellBuilder.COMBAT(6, 'Water Wound', [[6, 12]], [EssenceCatalog.AIR(3), EssenceCatalog.WATER(2), EssenceCatalog.FORCE(2)], 7, [0,0,0,0,0,0,9,14,0], 7, 6),
    SpellBuilder.COMBAT(7, 'Earth Wound', [[6, 14]], [EssenceCatalog.AIR(3), EssenceCatalog.EARTH(2), EssenceCatalog.FORCE(2)], 8, [0,0,0,0,0,0,10,16,0], 7, 7),
    SpellBuilder.COMBAT(8, 'Fire Wound', [[6, 16]], [EssenceCatalog.AIR(3), EssenceCatalog.FIRE(2), EssenceCatalog.FORCE(2)], 9, [0,0,0,0,0,0,11,18,0], 7, 8),
    SpellBuilder.COMBAT(9, 'Metal Wound', [[6, 18]], [EssenceCatalog.AIR(3), EssenceCatalog.METAL(2), EssenceCatalog.FORCE(2)], 10, [0,0,0,0,0,0,12,20,0], 7, 9),
    SpellBuilder.COMBAT(10, 'Greater Air Wound', [[6, 20]], [EssenceCatalog.AIR(4), EssenceCatalog.FORCE(3)], 6, [0,0,0,0,0,0,13,22,0], 8, 10),
    SpellBuilder.COMBAT(11, 'Greater Water Wound', [[6, 22]], [EssenceCatalog.AIR(4), EssenceCatalog.WATER(4), EssenceCatalog.FORCE(3)], 7, [0,0,0,0,0,0,14,24,0], 8, 11),
    SpellBuilder.COMBAT(12, 'Greater Earth Wound', [[6, 24]], [EssenceCatalog.AIR(4), EssenceCatalog.EARTH(4), EssenceCatalog.FORCE(3)], 8, [0,0,0,0,0,0,15,26,0], 8, 12),
    SpellBuilder.COMBAT(13, 'Greater Fire Wound', [[6, 26]], [EssenceCatalog.AIR(4), EssenceCatalog.FIRE(4), EssenceCatalog.FORCE(3)], 9, [0,0,0,0,0,0,16,28,0], 8, 13),
    SpellBuilder.COMBAT(14, 'Greater Metal Wound', [[6, 28]], [EssenceCatalog.AIR(4), EssenceCatalog.METAL(4), EssenceCatalog.FORCE(3)], 10, [0,0,0,0,0,0,17,30,0], 8, 14),

    SpellBuilder.TELEPORT(15, 25, 'Fiewon Teleport', [[22, 10]], [EssenceCatalog.AIR(3), EssenceCatalog.VOID(1)], [0, 30, 34, 33, 37, 3], 15),
    SpellBuilder.TELEPORT(16, 35, 'Cadgwith Teleport', [[22, 14]], [EssenceCatalog.AIR(2), EssenceCatalog.WATER(1), EssenceCatalog.VOID(1)], [0, 154, 3, 159, 5, 3], 16),
    SpellBuilder.TELEPORT(17, 45, 'Volcano Teleport', [[22, 18]], [EssenceCatalog.AIR(2), EssenceCatalog.EARTH(1), EssenceCatalog.VOID(1)], [0, 166, 71, 170, 74, 3], 17),
    SpellBuilder.TELEPORT(18, 55, 'Island Teleport', [[22, 22]], [EssenceCatalog.AIR(2), EssenceCatalog.FIRE(1), EssenceCatalog.VOID(1)], [0, 11, 92, 13, 94, 3], 18),
    SpellBuilder.TELEPORT(19, 65, 'Hyrill Teleport', [[22, 26]], [EssenceCatalog.AIR(2), EssenceCatalog.FIRE(1), EssenceCatalog.EARTH(1), EssenceCatalog.VOID(1)], [0, 28, 167, 35, 174, 3], 19),
    SpellBuilder.TELEPORT(20, 75, 'Bodiam Teleport', [[22, 30]], [EssenceCatalog.AIR(2), EssenceCatalog.METAL(1), EssenceCatalog.VOID(1)], [0, 176, 177, 182, 183, 3], 20),
    SpellBuilder.TELEPORT(21, 85, 'Woodcutting Guild Teleport', [[22, 34]], [EssenceCatalog.AIR(3), EssenceCatalog.WATER(1), EssenceCatalog.EARTH(1), EssenceCatalog.VOID(1)], [0, 337, 68, 345, 72, 3], 21),
    SpellBuilder.TELEPORT(22, 95, 'Mining Guild Teleport', [[22, 38]], [EssenceCatalog.AIR(3), EssenceCatalog.METAL(1), EssenceCatalog.EARTH(1), EssenceCatalog.VOID(1)], [0, 72, 350, 79, 357, 3], 22),
    
    SpellBuilder.ITEM_PICKUP_AREA(23, 10, 'Pickup 3x3', [[22, 1]], [EssenceCatalog.AIR(3), EssenceCatalog.EARTH(3)], 3, 23),
    SpellBuilder.ITEM_PICKUP_AREA(24, 30, 'Pickup 5x5', [[22, 30]], [EssenceCatalog.AIR(5), EssenceCatalog.EARTH(5)], 5, 24),

    //SpellBuilder.ENCHANT(5, 'Enchant Fortify Ranged Defense', [[22, 22]], [EssenceCatalog.NATURE(2), EssenceCatalog.AIR(7), EssenceCatalog.SOUL(2)], 5, 5),
    //SpellBuilder.ENCHANT(6, 'Enchant Fortify Magic Defense', [[22, 26]], [EssenceCatalog.NATURE(2), EssenceCatalog.WATER(7), EssenceCatalog.SOUL(2)], 8, 6),
    //SpellBuilder.ENCHANT(7, 'Enchant Fortify Melee Defense', [[22, 30]], [EssenceCatalog.NATURE(2), EssenceCatalog.FIRE(7), EssenceCatalog.SOUL(2)], 2, 7),

    //SpellBuilder.ENCHANT(8, 'Enchant Fortify Ranged Focus', [[22, 28]], [EssenceCatalog.NATURE(2), EssenceCatalog.AIR(7), EssenceCatalog.SOUL(3)], 3, 8),
    //SpellBuilder.ENCHANT(9, 'Enchant Fortify Magic Focus', [[22, 32]], [EssenceCatalog.NATURE(2), EssenceCatalog.WATER(7), EssenceCatalog.SOUL(3)], 6, 9),
    //SpellBuilder.ENCHANT(10, 'Enchant Fortify Melee Focus', [[22, 36]], [EssenceCatalog.NATURE(2), EssenceCatalog.FIRE(7), EssenceCatalog.SOUL(3)], 0, 10),

    //SpellBuilder.ENCHANT(11, 'Enchant Fortify Ranged Power', [[22, 34]], [EssenceCatalog.NATURE(2), EssenceCatalog.AIR(7), EssenceCatalog.SOUL(4)], 4, 11),
    //SpellBuilder.ENCHANT(12, 'Enchant Fortify Magic Power', [[22, 38]], [EssenceCatalog.NATURE(2), EssenceCatalog.WATER(7), EssenceCatalog.SOUL(4)], 7, 12),
    //SpellBuilder.ENCHANT(13, 'Enchant Fortify Melee Power', [[22, 42]], [EssenceCatalog.NATURE(2), EssenceCatalog.FIRE(7), EssenceCatalog.SOUL(4)], 1, 13),

    //SpellBuilder.ENCHANT(14, 'Enchant Goblin Camp Teleport', [[22, 12]], [EssenceCatalog.NATURE(2), EssenceCatalog.WATER(7), EssenceCatalog.VOID(3)], 9, 14),
    //SpellBuilder.ENCHANT(15, 'Enchant Volcano Teleport', [[22, 32]], [EssenceCatalog.NATURE(2), EssenceCatalog.EARTH(7), EssenceCatalog.VOID(3)], 10, 15),
    //SpellBuilder.ENCHANT(16, 'Enchant Wizard Tower Teleport', [[22, 44]], [EssenceCatalog.NATURE(2), EssenceCatalog.FIRE(7), EssenceCatalog.VOID(3)], 11, 16),

];

module.exports.SpellType = SpellType;