const EssenceCatalog = require('./Essence').EssenceCatalog;
const ShardCatalog = require('./Essence').ShardCatalog;
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
                interfaceID: 21,
                id: 0,
                actionInterval: 1,
                steps: [steps],
            }],
        };
    },
    ENCHANT: (id, xpEarned, name, magicLevelReq, essenceRequirement, enchantmentID, spellIconIndex) => {
        let enchantSteps = [];
        enchantSteps.push(buildStep(StepType.SELECT_ENCHANTMENT, { params: [id] }));

        return {
            id,
            name,
            xpEarned,
            type: SpellType.ENCHANT,
            magicLevelReq,
            essenceRequirement,
            spellIconIndex,
            enchantmentID,
            actions: [{
                name: 'Select',
                interfaceID: 25,
                id: 2,
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
                interfaceID: 21,
                actionInterval: -1,
                id: 0,
                steps: [teleportSteps],
            }],
        };
    },
    SHOW_ENCHANTMENT_INTERFACE: (id, name, spellIconIndex) => {
        return {
            id,
            name,
            type: SpellType.OTHER,
            spellIconIndex,
            actions: [{
                name: 'Cast',
                interfaceID: 21,
                id: 0,
                actionInterval: -1,
                steps: [
                    [buildStep(StepType.OPEN_ENCHANTMENT_INTERFACE)]
                ],
            }],
        };
    },
    SYPHON_ESSENCE: (id, name, xpGain, carbonAmountReq, magicLevelReq, essenceShardID, spellIconIndex) => {
        return {
            id,
            name,
            type: SpellType.OTHER,
            spellIconIndex,
            magicLevelReq: [[22, magicLevelReq]],
            carbonRequirement: carbonAmountReq,
            actions: [{
                name: 'Cast',
                interfaceID: 21,
                id: 0,
                flags: ['REPEAT_ACTION'],
                actionInterval: 3,
                steps: [
                    [buildStep(StepType.HAS_INVENTORY_ITEM, { params: [512, carbonAmountReq] }),
                    buildStep(StepType.HAS_SKILL_LEVEL, { params: [22, magicLevelReq] }),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, { params: [512, carbonAmountReq] }),
                    buildStep(StepType.SET_SYPHON_SHARD_ITEM_AMOUNT, { params: [essenceShardID] }),
                    buildStep(StepType.GIVE_INVENTORY_ITEM, { params: [essenceShardID, 'ITEM_AMOUNT'] }),
                    buildStep(StepType.GIVE_XP, { params: [22, xpGain] }),]
                ],
            }],
        };
    },
};

const SpellType = {
    COMBAT: 0,     
    ENCHANT: 1,        
    TELEPORT: 2,        
    OTHER: 3,   
    PICKUP_AREA: 4,
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
    SpellBuilder.TELEPORT(16, 35, 'Salmo Teleport', [[22, 14]], [EssenceCatalog.AIR(2), EssenceCatalog.WATER(1), EssenceCatalog.VOID(1)], [0, 154, 3, 159, 5, 3], 16),
    SpellBuilder.TELEPORT(17, 45, 'Volcano Teleport', [[22, 18]], [EssenceCatalog.AIR(2), EssenceCatalog.EARTH(1), EssenceCatalog.VOID(1)], [0, 166, 71, 170, 74, 3], 17),
    SpellBuilder.TELEPORT(18, 55, 'Island Teleport', [[22, 22]], [EssenceCatalog.AIR(2), EssenceCatalog.FIRE(1), EssenceCatalog.VOID(1)], [0, 11, 92, 13, 94, 3], 18),
    SpellBuilder.TELEPORT(19, 65, 'Hyrill Teleport', [[22, 26]], [EssenceCatalog.AIR(2), EssenceCatalog.FIRE(1), EssenceCatalog.EARTH(1), EssenceCatalog.VOID(1)], [0, 28, 167, 35, 174, 3], 19),
    SpellBuilder.TELEPORT(20, 75, 'Bodiam Teleport', [[22, 30]], [EssenceCatalog.AIR(2), EssenceCatalog.METAL(1), EssenceCatalog.VOID(1)], [0, 176, 177, 182, 183, 3], 20),
    SpellBuilder.TELEPORT(21, 85, 'Woodcutting Guild Teleport', [[22, 34]], [EssenceCatalog.AIR(3), EssenceCatalog.WATER(1), EssenceCatalog.EARTH(1), EssenceCatalog.VOID(1)], [0, 337, 68, 345, 72, 3], 21),
    SpellBuilder.TELEPORT(22, 95, 'Mining Guild Teleport', [[22, 38]], [EssenceCatalog.AIR(3), EssenceCatalog.METAL(1), EssenceCatalog.EARTH(1), EssenceCatalog.VOID(1)], [0, 72, 350, 79, 357, 3], 22),
    
    SpellBuilder.ITEM_PICKUP_AREA(23, 10, 'Pickup 3x3', [[22, 1]], [EssenceCatalog.AIR(3), EssenceCatalog.EARTH(3)], 3, 23),
    SpellBuilder.ITEM_PICKUP_AREA(24, 30, 'Pickup 5x5', [[22, 30]], [EssenceCatalog.AIR(5), EssenceCatalog.EARTH(5)], 5, 24),

    SpellBuilder.SHOW_ENCHANTMENT_INTERFACE(25, 'Enchant...', 25),

    SpellBuilder.ENCHANT(26, 55, 'Enchant Fortify Ranged Defense', [[22, 22]], [EssenceCatalog.NATURE(2), EssenceCatalog.AIR(7), EssenceCatalog.SOUL(2)], 5, 34),
    SpellBuilder.ENCHANT(27, 65, 'Enchant Fortify Magic Defense', [[22, 26]], [EssenceCatalog.NATURE(2), EssenceCatalog.WATER(7), EssenceCatalog.SOUL(2)], 8, 37),
    SpellBuilder.ENCHANT(28, 75, 'Enchant Fortify Melee Defense', [[22, 30]], [EssenceCatalog.NATURE(2), EssenceCatalog.FIRE(7), EssenceCatalog.SOUL(2)], 2, 31),

    SpellBuilder.ENCHANT(29, 70, 'Enchant Fortify Ranged Focus', [[22, 28]], [EssenceCatalog.NATURE(2), EssenceCatalog.AIR(7), EssenceCatalog.SOUL(3)], 3, 32),
    SpellBuilder.ENCHANT(30, 80, 'Enchant Fortify Magic Focus', [[22, 32]], [EssenceCatalog.NATURE(2), EssenceCatalog.WATER(7), EssenceCatalog.SOUL(3)], 6, 35),
    SpellBuilder.ENCHANT(31, 90, 'Enchant Fortify Melee Focus', [[22, 36]], [EssenceCatalog.NATURE(2), EssenceCatalog.FIRE(7), EssenceCatalog.SOUL(3)], 0, 29),

    SpellBuilder.ENCHANT(32, 85, 'Enchant Fortify Ranged Power', [[22, 34]], [EssenceCatalog.NATURE(2), EssenceCatalog.AIR(7), EssenceCatalog.SOUL(4)], 4, 33),
    SpellBuilder.ENCHANT(33, 90, 'Enchant Fortify Magic Power', [[22, 38]], [EssenceCatalog.NATURE(2), EssenceCatalog.WATER(7), EssenceCatalog.SOUL(4)], 7, 36),
    SpellBuilder.ENCHANT(34, 105, 'Enchant Fortify Melee Power', [[22, 42]], [EssenceCatalog.NATURE(2), EssenceCatalog.FIRE(7), EssenceCatalog.SOUL(4)], 1, 30),

    SpellBuilder.ENCHANT(35, 30, 'Enchant Goblin Outpost Teleport', [[22, 12]], [EssenceCatalog.NATURE(2), EssenceCatalog.WATER(7), EssenceCatalog.VOID(3)], 9, 26),
    SpellBuilder.ENCHANT(36, 80, 'Enchant Volcano Teleport', [[22, 32]], [EssenceCatalog.NATURE(2), EssenceCatalog.EARTH(7), EssenceCatalog.VOID(3)], 10, 17),
    SpellBuilder.ENCHANT(37, 110, 'Enchant Wizard Tower Teleport', [[22, 44]], [EssenceCatalog.NATURE(2), EssenceCatalog.FIRE(7), EssenceCatalog.VOID(3)], 11, 21),
    SpellBuilder.ENCHANT(38, 40, 'Enchant Drop Party Teleport', [[22, 16]], [EssenceCatalog.NATURE(2), EssenceCatalog.AIR(7), EssenceCatalog.VOID(3)], 13, 27),
    SpellBuilder.ENCHANT(39, 50, 'Enchant Patreon Palace Teleport', [[22, 20]], [EssenceCatalog.NATURE(3), EssenceCatalog.WATER(4), EssenceCatalog.VOID(3)], 14, 28),
    SpellBuilder.SYPHON_ESSENCE(40, "Syphon Air Essence", 5, 100, 1, ShardCatalog.AIR(1)[0], 40),
    SpellBuilder.SYPHON_ESSENCE(41, "Syphon Water Essence", 6, 100, 3, ShardCatalog.WATER(1)[0], 41),
    SpellBuilder.SYPHON_ESSENCE(42, "Syphon Earth Essence", 7, 100, 6, ShardCatalog.EARTH(1)[0], 42),
    SpellBuilder.SYPHON_ESSENCE(43, "Syphon Fire Essence", 8, 100, 10, ShardCatalog.FIRE(1)[0], 43),
    SpellBuilder.SYPHON_ESSENCE(44, "Syphon Void Essence", 16, 200, 50, ShardCatalog.VOID(1)[0], 44),
    SpellBuilder.SYPHON_ESSENCE(45, "Syphon Metal Essence", 9, 100, 16, ShardCatalog.METAL(1)[0], 45),
    SpellBuilder.SYPHON_ESSENCE(46, "Syphon Force Essence", 13, 150, 28, ShardCatalog.FORCE(1)[0], 46),
    SpellBuilder.SYPHON_ESSENCE(47, "Syphon Sharp Essence", 6, 100, 20, ShardCatalog.SHARP(1)[0], 47),
    SpellBuilder.SYPHON_ESSENCE(48, "Syphon Poison Essence", 6, 150, 34, ShardCatalog.POISON(1)[0], 48),
    SpellBuilder.SYPHON_ESSENCE(49, "Syphon Bind Essence", 6, 200, 70, ShardCatalog.BIND(1)[0], 49),
    SpellBuilder.SYPHON_ESSENCE(50, "Syphon Soul Essence", 6, 200, 80, ShardCatalog.SOUL(1)[0], 50),
    SpellBuilder.SYPHON_ESSENCE(51, "Syphon Nature Essence", 6, 200, 50, ShardCatalog.NATURE(1)[0], 51),
    SpellBuilder.ENCHANT(52, 170, 'Enchant Item Collection', [[22, 65]], [EssenceCatalog.NATURE(5), EssenceCatalog.EARTH(16), EssenceCatalog.SOUL(6)], 12, 38),
    SpellBuilder.ENCHANT(53, 200, 'Enchant Auto Consume', [[22, 80]], [EssenceCatalog.NATURE(5), EssenceCatalog.WATER(20), EssenceCatalog.VOID(9)], 15, 39),
];

module.exports.SpellType = SpellType;