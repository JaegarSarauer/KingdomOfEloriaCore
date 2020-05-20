const ActionFlags = require('./Step').ActionFlags;
const ParameterMappingKeys = require('./Step').ParameterMappingKeys;
const StepList = require('./Step').StepList;
const StepResult = require('./Step').StepResult;
const StepType = require('./Step').StepType;
const StepTypeClassDictionary = require('./Step').StepTypeClassDictionary;
const buildStep = require('./Step').buildStep;
const buildStepList = require('./Step').buildStepList;
const Entity = require('./Entity');
const Combat = require('../internal/Combat');
const Spells = require('../typedef/Spells');
const ItemDetail = require("./ItemDetail").ItemDetail;
const EssenceValue = require("./Essence").EssenceValue;
const ShardCatalog = require("./Essence").ShardCatalog;
const EssenceCatalog = require("./Essence").EssenceCatalog;
const HairColors = require("./Model").HairColors;
const HairStyle = require("./Model").HairStyle;
const FacialStyles = require("./Model").FacialStyles;
const EyeColors = require("./Model").EyeColors;
const ShardIDs = require("./Essence").ShardIDs;
const EssenceIDs = require("./Essence").EssenceIDs;

const LEVEL_INDEX = {
    COOKING: 13
}

const CalculateGemCapacity = (tier, grade) => {
    let base = Item[659 + tier].baseEnchantCharge;
    let multiplier = 1 + (grade * 0.5);
    return base * multiplier;
}


let faceIDsToTint = {};
let faceEnumKeys = Object.keys(FacialStyles);
for(let i = 0; i < faceEnumKeys.length; ++i) {
    if (FacialStyles[faceEnumKeys[i]].hairTint) {
        faceIDsToTint[FacialStyles[faceEnumKeys[i]].id] = true;
    }
}

module.exports.CalculateGemCapacity = CalculateGemCapacity;

const coloredShirtIdsByStyleAndColor = {};
const coloredShirtStyleAndColorById = {};
const coloredPantsIdsByColor = {};

const DropTables = {
    // Table rarity refers to denominator of the roll. (Math.random() < 1 / tableRarity)
    // Drop array: [[id, min, max, amount], [...]]
    Table: (tableRarity, dropArray) => {
        let totalRoll = 0;
        for (let i = 0; i < dropArray.length; ++i) {
            totalRoll += dropArray[i][3];
        }
        return [[tableRarity, totalRoll]].concat(dropArray);
    },
    LesserWoundSpellPages: (tableRarity) => {
        return DropTables.Table(tableRarity, [[687, 1, 1, 20], [688, 1, 1, 18], [689, 1, 1, 16], [690, 1, 1, 14], [691, 1, 1, 10]]);
    },
    WoundSpellPages: (tableRarity) => {
        return DropTables.Table(tableRarity, [[692, 1, 1, 20], [693, 1, 1, 18], [694, 1, 1, 16], [695, 1, 1, 14], [696, 1, 1, 10]]);
    },
    GreaterWoundSpellPages: (tableRarity) => {
        return DropTables.Table(tableRarity, [[697, 1, 1, 20], [698, 1, 1, 18], [699, 1, 1, 16], [700, 1, 1, 14], [701, 1, 1, 10]]);
    },
    ItemPickupPages: (tableRarity) => {
        return DropTables.Table(tableRarity, [[727, 1, 1, 90], [728, 1, 1, 10]]);
    },
    TeleportScrolls: (tableRarity, IDs = [722, 721, 720, 719, 718, 717, 716, 715]) => {
        let dropArray = [];
        for (let i = 0; i <IDs.length; ++i) {
            dropArray.push([IDs[i], 1, 1, 10 + (i * 2)]);
        }
        return DropTables.Table(tableRarity, dropArray);
    },
    EssenceShards: (tableRarity, essenceMin, essenceMax, rarityArray) => {
        let dropArray = [];
        for (let i = 0; i < ShardIDs.length; ++i) {
            dropArray.push([ShardIDs[i], essenceMin, essenceMax, rarityArray[i]]);
        }
        return DropTables.Table(tableRarity, dropArray);
    },
}

const UncutGemIDs = {
    UNCUT_OPAL: 636,
    UNCUT_TOPAZ: 638,
    UNCUT_QUARTZ: 640,
    UNCUT_JADE: 642,
    UNCUT_AMBER: 644,
    UNCUT_SAPPHIRE: 646,
    UNCUT_AMETHYST: 648,
    UNCUT_EMERALD: 650,
    UNCUT_RUBY: 652,
    UNCUT_ONYX: 654,
    UNCUT_DIAMOND: 656,
};

const CutGemIDs = {
    OPAL: 659,
    TOPAZ: 660,
    QUARTZ: 661,
    JADE: 662,
    AMBER: 663,
    SAPPHIRE: 664,
    AMETHYST: 665,
    EMERALD: 666,
    RUBY: 667,
    ONYX: 668,
    DIAMOND: 669,
};

module.exports.UncutGemIDs = UncutGemIDs;
module.exports.CutGemIDs = CutGemIDs;

const Recipes = {
    Dough : () => {
        return  {
            name: 'Mix Dough',
            itemIdsRequired : [746, 750, 732],
            newItemIds:  [744, 744, 760], 
            xp : 10,
            levelRequirement : 4,
        }
    },
    UncookedChickenPotPie : () => {
        return  {
            name: 'Prepare Chicken Pot Pie',
            itemIdsRequired : [761, 760, 740],
            newItemIds:  [769], 
            xp : 15,
            levelRequirement : 8,
        }
    },
    UncookedMeatPie : () => {
        return  {
            name: 'Prepare Meat Pie',
            itemIdsRequired : [761, 760, 754],
            newItemIds:  [763], 
            xp : 20,
            levelRequirement : 10,
        }
    },
    UncookedCake : () => {
        return  {
            name: 'Prepare Cake',
            itemIdsRequired : [761, 760, 732, 748],
            newItemIds:  [775, 744], 
            xp : 25,
            levelRequirement : 14,
        }
    },
    ChickenSupreme: () => {
        return {
            name: 'Prepare Chicken Supreme',
            itemIdsRequired : [740, 793],
            newItemIds:  [795, 744], 
            xp : 50,
            levelRequirement : 5,
        };
    },
    GourmetTuna: () => {
        return {
            name: 'Gourmet Tuna',
            itemIdsRequired : [787, 793],
            newItemIds:  [797, 744], 
            xp : 50,
            levelRequirement : 5,
        };
    },
};

const CreateStepListFromRecipe = function(recipe) {
    let stepList = [];
    stepList.push(buildStep(StepType.HAS_SKILL_LEVEL, {params: [13, recipe.levelRequirement]}));

    for(let i = 0; i < recipe.itemIdsRequired.length; i++) {
        if (Number.isInteger( recipe.itemIdsRequired[i] )) {
            stepList.push(buildStep(StepType.HAS_INVENTORY_ITEM, {params: [ recipe.itemIdsRequired[i], 1 ]}))
        }
    }

    for(let i = 0; i < recipe.itemIdsRequired.length; i++) {
        if (Number.isInteger( recipe.itemIdsRequired[i] )) {
            stepList.push(buildStep(StepType.REMOVE_INVENTORY_ITEM, {params: [ recipe.itemIdsRequired[i], 1 ]}))
        }
    }

    if (stepList.length > 0 && recipe.newItemIds.length > 0) {
        for(let i = 0; i < recipe.newItemIds.length; ++i) {
            if (Number.isInteger(recipe.newItemIds[i])) {
                stepList.push(buildStep(StepType.GIVE_INVENTORY_ITEM, {params: [ recipe.newItemIds[i], 1 ]}))
            }
        }

        stepList.push(buildStep(StepType.GIVE_XP, { params: [13, recipe.xp] }));
    }
    return stepList;
}

const ItemGetter = {
    SpellPot: (id, name, spellID, value, magicFocusLevel, craftLevel, incinerateLevel, essenceCatalog, spriteIndex, spriteModelID) => {
        let spellDef = Spells.Spells[spellID];
        return {
            id,
            name,
            noted: false,
            value,
            stackable: true,
            description: 'A pot mixed with essence to cast ' + spellDef.name,
            requirements: ItemDetail.build([
                ItemDetail.levelSkillDetail(craftLevel, 19, 'CRAFT'),
                ItemDetail.levelSkillDetail(magicFocusLevel, 6, 'EQUIP'),
                ItemDetail.levelSkillDetail(incinerateLevel, 17, 'INCINERATE'),
            ]),
            projectileID: spellDef.projectileID,
            spriteIndex,
            combatStyle: Combat.CombatStyle.MAGIC,
            attackRange: spellDef.attackRange,
            attackCooldown: 5,
            equipmentStats: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            spellID,
            essenceValue: EssenceValue(incinerateLevel, 5, essenceCatalog),
            model: {
                RIGHT_TOOL: {
                    id: 'RIGHT_TOOL',
                    asset: 'heldParts',
                    sprite: 'strike',
                    parent: 'RIGHT_FOREARM',
                    spriteID: spriteModelID,
                    anchor: { x: 0.95, y: 0.5 },
                    position: { x: 0, y: 0.75 },
                    rotation: 0,
                    UIModel: null,
                },
            },
            actions: [{
                interfaceID: 5,
                id: 4,
                name: 'Equip',
                steps: [
                    [
                        buildStep(StepType.PLAY_ANIMATION, { params: ['EQUIP_RINGS'] }),
                        buildStep(StepType.HAS_SKILL_LEVEL, { params: [6, magicFocusLevel] }),
                        buildStep(StepType.GIVE_EQUIPMENT_ITEM, { params: [1, 'ITEM_ID', 'ITEM_STATE'] })
                    ]
                ]
            }],
        };
    },
    SpellUnlockScroll: (id, name, spellID, value, spriteIndex, incinerateLevel, essenceValue) => {
        let result = {
            id,
            name: name + ' Scroll',
            noted: false,
            value,
            stackable: true,
            description: 'A spell scroll that contains the knowledge of ' + name.toLowerCase() + '.',
            requirements: ItemDetail.build([
                ItemDetail.levelSkillDetail(incinerateLevel, 17, 'INCINERATE'),
            ]),
            spriteIndex,
            essenceValue: EssenceValue(incinerateLevel, 140, essenceValue),
            actions: [{
                id: 33,
                interfaceID: 5,
                name: 'Read',
                actionInterval: 0,
                steps: [
                    [buildStep(StepType.HAS_INVENTORY_ITEM, {params: [id, 1]}),
                    buildStep(StepType.IS_SPELL_UNLOCKED, {
                        params: [spellID],
                        stepResultPass: StepResult.END_ACTION,
                        stepResultFail: StepResult.NEXT_STEP_LIST,
                    }),],
                    [buildStep(StepType.UNLOCK_SPELL, {params: [spellID]}),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, {params: [id, 1]}),
                    buildStep(StepType.SEND_CLIENT_MESSAGE, {params: ['As you read the scroll it crumbles to dust.']})]
                ],
            }],
        }
        return result;
    },
    UncutGem: (id, notedID, name, gemcuttingLevel, incinerateLevel, value, tier, cutGemID, xpEarned, spriteIndex) => {
        return {
            id,
            name,
            noted: false,
            notedID,
            value,
            cannotRedirectTome: true,
            stackable: false,
            description: 'A rough gemstone.',
            requirements: ItemDetail.build([
                ItemDetail.levelSkillDetail(gemcuttingLevel, 21, 'CRAFT'),
                ItemDetail.levelSkillDetail(incinerateLevel, 17, 'INCINERATE'),
            ]),
            essenceValue: EssenceValue(incinerateLevel, 4 * tier, [ShardCatalog.VOID(tier), ShardCatalog.EARTH(4 * tier), ShardCatalog.AIR(6 + (tier * 3))]),
            spriteIndex,
            useActions: [{
                interfaceID: 5,
                id: 9,
                name: 'Cut',
                entityType: Entity.EntityType.INVENTORY_ITEM,
                entityID: 524,
                actionInterval: 4,
                flags: ['REPEAT_ACTION'],
                steps: [
                    [buildStep(StepType.HAS_INVENTORY_ITEM, {params: [id, 1]}),
                    buildStep(StepType.HAS_SKILL_LEVEL, {params: [21, gemcuttingLevel]}),],
                    [buildStep(StepType.REMOVE_INVENTORY_ITEM, {params: [id, 1]}),
                    buildStep(StepType.ROLL_MIN_MAX_SKILL_SUCCESS, {
                        params: [100 + gemcuttingLevel, 150 - gemcuttingLevel, 21, 1, false, 0],
                        stepResultPass: StepResult.NEXT_STEP_LIST,
                        stepResultFail: StepResult.NEXT_STEP,
                    }),
                    buildStep(StepType.GIVE_XP, {params: [21, Math.floor(xpEarned * 4)]}),
                    buildStep(StepType.SEND_CLIENT_MESSAGE, {params: ['You crush the gem into shards.']}),
                    buildStep(StepType.GIVE_INVENTORY_ITEM, {
                        params: [658, tier * 4],
                        stepResultPass: StepResult.END_AND_REPEAT_ACTION,
                        stepResultFail: StepResult.END_AND_REPEAT_ACTION,
                    })],
                    [buildStep(StepType.GIVE_XP, {params: [21, xpEarned]}),
                    buildStep(StepType.GIVE_CUT_GEM, {params: [cutGemID, 1]}),]
                ],
            }],
        };
    },  
    CutGem: (id, name, gemcuttingBaseLevel, incinerateLevel, value, tier, state, baseEnchantCharge, spriteIndex, cutGemID) => {        
        const necklaceBaseLevel = 20;
        const ringBaseLevel = 2;
        return {
            id,
            name,
            noted: false,
            tier,
            value,
            cannotRedirectTome: true,
            stackable: false,
            description: 'A cut gemstone.',
            state,
            baseEnchantCharge,
            requirements: ItemDetail.build([
                ItemDetail.levelSkillDetail(gemcuttingBaseLevel, 21, 'CRAFT'),
                ItemDetail.levelSkillDetail(incinerateLevel, 17, 'INCINERATE'),
            ]),
            essenceValue: EssenceValue(incinerateLevel, 4 * tier, [ShardCatalog.VOID(tier), ShardCatalog.EARTH(3 * tier), ShardCatalog.AIR(8 + (tier * 4))]),
            spriteIndex: (item) => {
                return Math.min(item.getStateValue('quality'), 2) + spriteIndex;
            },
            // useActions: [{
            //     interfaceID: 5,
            //     id: 9,
            //     name: 'Craft',
            //     entityType: Entity.EntityType.INVENTORY_ITEM,
            //     entityID: 524,
            //     actionInterval: -1,
            //     flags: ['REPEAT_ACTION'],
            //     steps: [
            //         [buildStep(StepType.OPEN_ENCHANTMENT_INTERFACE)]
            //         // [buildStep(StepType.HAS_INVENTORY_ITEM, { params: [id, 1, 'ITEM_STATE'] })],
            //         // [buildStep(StepType.HAS_INVENTORY_ITEM, { 
            //         //     params: [674, 1], // Gold Amulet
            //         //     stepResultFail: StepResult.NEXT_STEP_LIST
            //         // }),
            //         // buildStep(StepType.HAS_INVENTORY_ITEM, { params: [524, 1] }),
            //         // buildStep(StepType.HAS_SKILL_LEVEL, { params: [21, gemcuttingBaseLevel + necklaceBaseLevel] }),
            //         // buildStep(StepType.REMOVE_INVENTORY_ITEM, { params: [id, 1, 'ITEM_STATE'] }),
            //         // buildStep(StepType.REMOVE_INVENTORY_ITEM, { params: [674, 1] }),
            //         // buildStep(StepType.GIVE_XP, { params: [21, 50 + (25 * tier)] }),
            //         // //buildStep(StepType.GIVE_XP, { params: [15, 25 + (12 * tier)] }),
            //         // buildStep(StepType.GIVE_INVENTORY_ITEM, { params: [cutGemID, 1, 'ITEM_STATE'] })]
            //         // [buildStep(StepType.HAS_INVENTORY_ITEM, { 
            //         //     params: [799, 1], // Gold ring
            //         // }),
            //         // buildStep(StepType.HAS_INVENTORY_ITEM, { params: [524, 1] }),
            //         // buildStep(StepType.HAS_SKILL_LEVEL, { params: [21, gemcuttingBaseLevel + ringBaseLevel] }),
            //         // buildStep(StepType.REMOVE_INVENTORY_ITEM, { params: [id, 1, 'ITEM_STATE'] }),
            //         // buildStep(StepType.REMOVE_INVENTORY_ITEM, { params: [799, 1] }),
            //         // buildStep(StepType.GIVE_XP, { params: [21, 5 + (25 * tier)] }),
            //         // //buildStep(StepType.GIVE_XP, { params: [15, 2 + (12 * tier)] }),
            //         // buildStep(StepType.GIVE_INVENTORY_ITEM, { params: [cutGemID, 1, 'ITEM_STATE'] })]
            //     ] 
            // }]
        };
    },
    BaseRing: function(id, notedID, name, value, spriteIndex) {
        let ring = {
            id,
            name,
            noted: false,
            value,
            stackable: false,
            description: 'A ring',
            spriteIndex,
            equipmentStats: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            actions: [{
                interfaceID: 5,
                id: 4,
                name: 'Equip Right',
                steps: [
                    [
                        buildStep(StepType.PLAY_ANIMATION, { params: ['EQUIP_RINGS'] }),
                        buildStep(StepType.GIVE_EQUIPMENT_ITEM, { params: [7, 'ITEM_ID', 'ITEM_STATE'] })
                    ]
                ]
            }, {
                interfaceID: 5,
                id: 5,
                name: 'Equip Left',
                steps: [
                    [
                        buildStep(StepType.PLAY_ANIMATION, { params: ['EQUIP_RINGS'] }),
                        buildStep(StepType.GIVE_EQUIPMENT_ITEM, { params: [8, 'ITEM_ID', 'ITEM_STATE'] })
                    ]
                ]
            }],
        };
        if (notedID) {
            ring.notedID = notedID;
        }
        return ring;
    },
    GoldRing: function(id, notedID, name, craftingLevel, incinerateLevel, value, spriteIndex) {
        let ring = this.BaseRing(id, notedID, name, value, spriteIndex);
        ring.requirements = ItemDetail.build([
            ItemDetail.levelSkillDetail(craftingLevel, 14, 'CRAFT'),
            ItemDetail.levelSkillDetail(incinerateLevel, 17, 'INCINERATE'),
        ]);
        let jewelryCraftLevels = [8, 65];
        ring.jewelryCraftLevels = jewelryCraftLevels;
        ring.useActions = [{
            interfaceID: 5,
            id: 9,
            name: 'Craft',
            entityType: Entity.EntityType.INVENTORY_ITEM,
            entityID: 524,
            actionInterval: -1,
            steps: [
                [buildStep(StepType.OPEN_JEWELRY_CRAFT_INTERFACE, {params: []}),
                buildStep(StepType.ADD_JEWELRY_CRAFT_ITEM, {params: [id, 1, null],})],
            ],
        }];
        ring.essenceValue = EssenceValue(incinerateLevel, 4, [ShardCatalog.METAL(20), ShardCatalog.EARTH(3)]);
        ring.description = 'A simple gold ring';
        ring.baseSpriteIndex = spriteIndex;
        ring.spriteIndex = (item) => {
            if (item.getStateValue('id') == 'MULTI_ENCHANTMENT') {
                return item.getStateValue('spriteIndex') || spriteIndex;
            } else {
                return spriteIndex;
            }
        };
        return ring;
    },
    GemRing: function(id, name, gemcuttingLevel, incinerateLevel, value, tier, state, spriteIndex) {
        let ring = this.BaseRing(id, null, name, value, spriteIndex);
        ring.requirements = ItemDetail.build([
            ItemDetail.levelSkillDetail(gemcuttingLevel, 21, 'CRAFT'),
            ItemDetail.levelSkillDetail(incinerateLevel, 17, 'INCINERATE'),
        ]);
        delete ring.notedID;
        ring.essenceValue = EssenceValue(incinerateLevel, 4 * tier, [ShardCatalog.VOID(tier), ShardCatalog.EARTH(3 * tier), ShardCatalog.AIR(8 + (tier * 4))]); // TODO: Jaegar picks
        ring.description = 'A gold ring powered by an enchanted gem';
        ring.tier = tier;
        ring.state = state;
        return ring;
    },
    BaseNecklace: function(id, notedID, name, value, spriteIndex, sprite, spriteID = 0) {
        let necklace = {
            id,
            name,
            noted: false,
            value,
            stackable: false,
            description: 'A necklace',
            spriteIndex,
            equipmentStats: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            model: {
                NECK_WORN: {
                    id: 'NECK_WORN',
                    asset: 'neckParts',
                    sprite,
                    parent: 'HEAD',
                    spriteID,
                    anchor: { x: 0.5, y: 0.2 },
                    position: { x: 0, y: 0.2 },
                    rotation: 0,
                    UIModel: null,
                    z: -1,
                },
            },
            actions: [{
                interfaceID: 5,
                id: 3,
                name: 'Equip',
                steps: [
                    [buildStep(StepType.PLAY_ANIMATION, { params: ['EQUIP_NECKLACE'] }),
                    buildStep(StepType.GIVE_EQUIPMENT_ITEM, { params: [6, 'ITEM_ID', 'ITEM_STATE'] })]
                ]
            }],
        };
        if (notedID) {
            necklace.notedID = notedID;
        }
        return necklace;
    },
    GoldAmulet: function(id, notedID, name, craftingLevel, incinerateLevel, value, spriteIndex) {
        let necklace = this.BaseNecklace(id, notedID, name, value, spriteIndex, 'amulet', 0);
        necklace.requirements = ItemDetail.build([
            ItemDetail.levelSkillDetail(craftingLevel, 14, 'CRAFT'),
            ItemDetail.levelSkillDetail(incinerateLevel, 17, 'INCINERATE'),
        ]);
        necklace.essenceValue = EssenceValue(incinerateLevel, 4, [ShardCatalog.METAL(20), ShardCatalog.EARTH(3)]);
        necklace.description = 'A simple gold amulet';
        necklace.baseSpriteIndex = spriteIndex;
        necklace.spriteIndex = (item) => {
            if (item.getStateValue('id') == 'MULTI_ENCHANTMENT') {
                return item.getStateValue('spriteIndex') || spriteIndex;
            } else {
                return spriteIndex;
            }
        };
        let jewelryCraftLevels = [22, 62, 94];
        necklace.jewelryCraftLevels = jewelryCraftLevels;
        necklace.useActions = [{
            interfaceID: 5,
            id: 9,
            name: 'Craft',
            entityType: Entity.EntityType.INVENTORY_ITEM,
            entityID: 524,
            actionInterval: -1,
            steps: [
                [buildStep(StepType.OPEN_JEWELRY_CRAFT_INTERFACE, {params: [jewelryCraftLevels],}),
                buildStep(StepType.ADD_JEWELRY_CRAFT_ITEM, {params: [id, 1, null],})],
            ],
        }];
        return necklace;
    },
    Amulet: function(id, name, gemcuttingLevel, incinerateLevel, value, tier, state, spriteIndex) {
        let necklace = this.BaseNecklace(id, null, name, value, spriteIndex, 'amulet', tier);
        necklace.requirements = ItemDetail.build([
            ItemDetail.levelSkillDetail(gemcuttingLevel, 21, 'CRAFT'),
            ItemDetail.levelSkillDetail(incinerateLevel, 17, 'INCINERATE'),
        ]);
        delete necklace.notedID;
        necklace.essenceValue = EssenceValue(incinerateLevel, 4 * tier, [ShardCatalog.VOID(tier), ShardCatalog.EARTH(3 * tier), ShardCatalog.AIR(8 + (tier * 4))]); // TODO: Jaegar picks
        necklace.description = 'A gold amulet powered by an enchanted gem';
        necklace.tier = tier;
        necklace.state = state;
        return necklace;
    },
    Item: function(id, notedId, fullName, value, spriteIndex, description, essenceValue, stackable = false) {
        requirements = null;
        if (!essenceValue || Number.isInteger(essenceValue)) {
            essenceValue = null;
        }
        else {
            requirements = ItemDetail.build([
                ItemDetail.levelSkillDetail(essenceValue.burnLevel, 17, 'INCINERATE'),
            ]);
        }


        let result = {
            id: id,
            name: fullName,
            noted: false,
            value: value,
            stackable,
            description: description,
            requirements: requirements,
            spriteIndex: spriteIndex,
            essenceValue: essenceValue,
            actions: [],
        }
        if (!result.noted && notedId) {
            result.notedID = notedId;
        }
        return result;
    },
    Mold: function(id, notedId, fullName, value, spriteIndex, description, essenceValue) {
        let item = this.Item(id, notedId, fullName, value, spriteIndex, description, essenceValue, false);
        return item;
    },
    NullItem: (id) => {
        return {
            id,
            name: 'null item',
            cannotRedirectTome: true,
        }
    },
    MixableCookingItem: function(id, notedId, fullName, value, spriteIndex, description, essenceValue, stackable, recipe) {
        let item = this.Item(id, notedId, fullName, value, spriteIndex, description, essenceValue, stackable);

        item.requirements = ItemDetail.build([
            ItemDetail.levelSkillDetail(('' + recipe.levelRequirement + '+'), 13, 'USE'),
            ItemDetail.levelSkillDetail(essenceValue.burnLevel, 17, 'INCINERATE'),
        ]);

        let stepList = CreateStepListFromRecipe(recipe);

        let useActions = [];
        for(let i = 0; i < recipe.itemIdsRequired.length; i++) {
            if (Number.isInteger( recipe.itemIdsRequired[i] ) && recipe.itemIdsRequired[i] != id) {
                useActions.push({
                    interfaceID: 5,
                    id: 9,
                    name: '',
                    entityType: Entity.EntityType.INVENTORY_ITEM,
                    entityID:  recipe.itemIdsRequired[i],
                    actionInterval: 0,
                    flags: ['REPEAT_ACTION'],
                    steps: [
                        stepList
                    ],
                });
            }
        }
        item.useActions = useActions;

        return item;
    },
    MixableFood: function(id, notedId, fullName, amountHealed, value, spriteIndex, description, incinerateLevel, essenceValue, recipes, stackable = false) {
        let mixable = this.MixableCookingItem(id, notedId, fullName, value, spriteIndex, description, incinerateLevel, essenceValue, stackable, recipes);
        let food = this.Food(id, notedId, fullName, amountHealed, value, spriteIndex, description, incinerateLevel, essenceValue, stackable);
        mixable.actions = food.actions;
        return mixable;
    },
    FullBucket: function(id, notedId, fullName, value, spriteIndex, description, essenceValue, stackable = false) {
        let item = this.Item(id, notedId, fullName, value, spriteIndex, description, essenceValue, stackable);
        item.actions = [ {
            interfaceID: 5,
            id: 35,
            name: 'Empty',
            steps: [
                [
                buildStep(StepType.SEND_CLIENT_MESSAGE, {params: ['Emptying bucket']}),
                buildStep(StepType.HAS_INVENTORY_ITEM, {params: [ id, 1 ] }),
                buildStep(StepType.REMOVE_INVENTORY_ITEM, {params: [ id, 1 ]}),
                buildStep(StepType.GIVE_INVENTORY_ITEM, {params: [ 744, 1 ]})],
            ],
        }];
        return item;
    },
    BucketOfHerbs: function(id, notedId, fullName, value, spriteIndex, description, essenceValue) {
        let bucket = this.FullBucket(id, notedId, fullName, value, spriteIndex, description, essenceValue, false);
        
        bucket.actions.push({
            interfaceID: 5,
            id: 36,
            name: 'Spice Food With',
            steps: [
                [
                    buildStep(StepType.OPEN_ACTION_MENU_INTERFACE, {params: [[269, 270]]})
                ]
            ]
        });

        return bucket;
    },
    BucketOfWater: function(id, notedId, fullName, value, spriteIndex, description, incinerateLevel, essenceValue, stackable, recipe) {
        let bucketOfWater = this.MixableCookingItem(id, notedId, fullName, value, spriteIndex, description, incinerateLevel, essenceValue, stackable, recipe);
        let bucket = this.FullBucket(id, notedId, fullName, value, spriteIndex, description, incinerateLevel, essenceValue, stackable, recipe);
        bucketOfWater.actions = bucket.actions;
        return bucketOfWater;
    },
    Food: function(id, notedId, fullName, amountHealed, value, spriteIndex, description, essenceValue, stackable = false) {
        let result = this.Item(id, notedId, fullName, value, spriteIndex, description, essenceValue, stackable);
        result.actions = [{
            actionInterval: 0,
            interfaceID: 5,
            id: 18,
            name: 'Eat',
            steps: [
                [buildStep(StepType.HAS_INVENTORY_ITEM, { params: [id, 1] }),
                buildStep(StepType.IS_TIMER_EXPIRED, { params: [8] }),
                buildStep(StepType.REMOVE_INVENTORY_ITEM, { params: [id, 1] }),
                buildStep(StepType.EAT_FOOD, { params: [amountHealed] })]
            ],
        }]
        return result;
    },
    Ore: function (id, notedId, fullName, value, spriteIndex, tier) {
        let level = Math.max(1, (tier - 1) * 10);
        let incinerateLevel = 12 + (tier * 6);
        return {
            id: id,
            name: fullName,
            noted: false,
            notedID: notedId,
            value: value,
            stackable: false,
            description: 'I can smelt this into a bar.',
            requirements: ItemDetail.build([
                ItemDetail.levelSkillDetail(level, 10, 'GATHER'),
                ItemDetail.levelSkillDetail(level, 14, 'CRAFT'),
                ItemDetail.levelSkillDetail(incinerateLevel, 17, 'INCINERATE'),
            ]),
            essenceValue: EssenceValue(incinerateLevel, 4 * tier, [ShardCatalog.EARTH(10 * tier), ShardCatalog.METAL(2 + (tier * 3))]),
            spriteIndex: spriteIndex,
        };
    },
    Bar: function (id, notedId, fullName, value, spriteIndex, tier) {
        let level = Math.max(1, (tier - 1) * 10);
        let incinerateLevel = 15 + (tier * 5);
        return {
            id: id,
            name: fullName,
            noted: false,
            notedID: notedId,
            value: value,
            stackable: false,
            description: 'I can use this on an anvil to create metal items.',
            requirements: ItemDetail.build([
                ItemDetail.levelSkillDetail(level, 14, 'GATHER'),
                ItemDetail.levelSkillDetail(tier * 10, 14, 'CRAFT'),
                ItemDetail.levelSkillDetail(incinerateLevel, 17, 'INCINERATE'),
            ]),
            essenceValue: EssenceValue(20, 10, [ShardCatalog.EARTH(15 * tier), ShardCatalog.METAL(10 * tier), ShardCatalog.FIRE(40 + (20 * tier)), ShardCatalog.FORCE(20 * tier)]),
            spriteIndex: spriteIndex,
        };
    },
    GoldBar: function (id, notedId, fullName, value, spriteIndex, tier) {
        let bar = this.Bar(id, notedId, fullName, value, spriteIndex, tier);
        return bar;
    },
    Helmet: function (id, notedId, fullName, tier, value, spriteIndex, cmlSpriteSheetRow, equipLevel, stats) {
        let incinerateLevel = 16 + (tier * 6);
        return {
            id: id,
            name: fullName,
            noted: false,
            notedID: notedId,
            value: value,
            stackable: false,
            description: 'Worn for some defence against melee.',
            requirements: ItemDetail.build([
                ItemDetail.levelSkillDetail(equipLevel, 2, 'EQUIP'),
                ItemDetail.levelSkillDetail(incinerateLevel, 17, 'INCINERATE'),
            ]),
            essenceValue: EssenceValue(incinerateLevel, 20 * tier, [ShardCatalog.EARTH(30 * tier), ShardCatalog.METAL(18 * tier), ShardCatalog.FIRE(30 * tier), ShardCatalog.FORCE(44 * tier)]),
            spriteIndex: spriteIndex,
            equipmentStats: stats,
            model: {
                HEAD_WORN: {
                    id: 'HEAD_WORN',
                    asset: 'headParts',
                    sprite: 'medHelm',
                    parent: 'HEAD',
                    spriteID: tier,
                    anchor: { x: 0.5, y: 0.8 },
                    position: {x: 0, y: -0.15},
                    rotation: 0,
                    UIModel: null,
                    hideParts : ['HAIR'],
                },
            },
            actions: [{
                interfaceID: 5,
                id: 3,
                name: 'Equip',
                steps: [
                    [buildStep(StepType.HAS_SKILL_LEVEL, { params: [2, equipLevel] }),
                    buildStep(StepType.PLAY_ANIMATION, { params: ['EQUIP_HEAD'] }),
                    buildStep(StepType.GIVE_EQUIPMENT_ITEM, { params: [0, 'ITEM_ID', 'ITEM_STATE'] })]
                ]
            }],
        };
    },
    FullHelm: function (id, notedId, fullName, tier, value, spriteIndex, cmlSpriteSheetRow, equipLevel, stats) {
        let incinerateLevel = 26 + (tier * 6);
        return {
            id: id,
            name: fullName,
            noted: false,
            notedID: notedId,
            value: value,
            stackable: false,
            description: 'Worn for extra defense against melee.',
            requirements: ItemDetail.build([
                ItemDetail.levelSkillDetail(equipLevel, 2, 'EQUIP'),
                ItemDetail.levelSkillDetail(incinerateLevel, 17, 'INCINERATE'),
            ]),
            essenceValue: EssenceValue(incinerateLevel, 32 * tier, [ShardCatalog.AIR(20 * tier), ShardCatalog.EARTH(40 * tier), ShardCatalog.METAL(24 * tier), ShardCatalog.FIRE(40 * tier), ShardCatalog.FORCE(66 * tier)]),
            spriteIndex: spriteIndex,
            equipmentStats: stats,
            model: {
                HEAD_WORN: {
                    id: 'HEAD_WORN',
                    asset: 'headParts',
                    sprite: 'fullHelm',
                    parent: 'HEAD',
                    spriteID: tier,
                    anchor: { x: 9/24, y: 0.8 },
                    position: {x: -0.01, y: -0.11},
                    rotation: 0,
                    UIModel: null,
                    hideParts : ['HAIR'],
                },
            },
            actions: [{
                interfaceID: 5,
                id: 3,
                name: 'Equip',
                steps: [
                    [buildStep(StepType.HAS_SKILL_LEVEL, { params: [2, equipLevel] }),
                    buildStep(StepType.PLAY_ANIMATION, { params: ['EQUIP_HEAD'] }),
                    buildStep(StepType.GIVE_EQUIPMENT_ITEM, { params: [0, 'ITEM_ID', 'ITEM_STATE'] })]
                ]
            }],
        };
    },
    Platelegs: function (id, notedId, fullName, tier, value, spriteIndex, cmlSpriteSheetRow, equipLevel, stats) {
        let incinerateLevel = 26 + (tier * 4);
        return {
            id: id,
            name: fullName,
            noted: false,
            notedID: notedId,
            value: value,
            stackable: false,
            description: 'Metal pants! Good for melee defense.',
            requirements: ItemDetail.build([
                ItemDetail.levelSkillDetail(equipLevel, 2, 'EQUIP'),
                ItemDetail.levelSkillDetail(incinerateLevel, 17, 'INCINERATE'),
            ]),
            essenceValue: EssenceValue(incinerateLevel, 45 * tier, [ShardCatalog.AIR(25 * tier), ShardCatalog.EARTH(50 * tier), ShardCatalog.METAL(40 * tier), ShardCatalog.FIRE(60 * tier), ShardCatalog.FORCE(88 * tier)]),
            spriteIndex: spriteIndex,
            equipmentStats: stats,
            model: {
                LEFT_THIGH_WORN: {
                    id: 'LEFT_THIGH_WORN',
                    asset: 'legParts',
                    sprite: 'platelegLeftThigh',
                    parent: 'LEFT_THIGH',
                    spriteID: tier,
                    anchor: { x: (6/9), y: 0.2 },
                    position: {x: 0, y: 0},
                    rotation: 0,
                    hideParts: ['LEFT_THIGH_WORN_PANTS'],
                    UIModel: null,
                },
                RIGHT_THIGH_WORN: {
                    id: 'RIGHT_THIGH_WORN',
                    asset: 'legParts',
                    sprite: 'platelegRightThigh',
                    parent: 'RIGHT_THIGH',
                    spriteID: tier,
                    anchor: { x: 1-(6/9), y: 0.2 },
                    position: {x: 0, y: 0},
                    rotation: 0,
                    hideParts: ['RIGHT_THIGH_WORN_PANTS'],
                    UIModel: null,
                },
                LEFT_SHIN_WORN: {
                    id: 'LEFT_SHIN_WORN',
                    asset: 'legParts',
                    sprite: 'platelegLeftShin',
                    parent: 'LEFT_SHIN',
                    spriteID: tier,
                    anchor: { x: 0.5, y: 0.1 },
                    position: {x: 0, y: 0.09},
                    rotation: 0,
                    hideParts: ['LEFT_SHIN_WORN_PANTS'],
                    UIModel: null,
                    z: 5,
                },
                RIGHT_SHIN_WORN: {
                    id: 'RIGHT_SHIN_WORN',
                    asset: 'legParts',
                    sprite: 'platelegRightShin',
                    parent: 'RIGHT_SHIN',
                    spriteID: tier,
                    anchor: { x: 0.5, y: 0.1 },
                    position: {x: 0, y: 0.09},
                    rotation: 0,
                    hideParts: ['RIGHT_SHIN_WORN_PANTS'],
                    UIModel: null,
                    z: 5,
                },
            },
            actions: [{
                interfaceID: 5,
                id: 7,
                name: 'Equip',
                steps: [
                    [buildStep(StepType.HAS_SKILL_LEVEL, { params: [2, equipLevel] }),
                    buildStep(StepType.PLAY_ANIMATION, { params: ['EQUIP_LEGS'] }),
                    buildStep(StepType.GIVE_EQUIPMENT_ITEM, { params: [4, 'ITEM_ID', 'ITEM_STATE'] })]
                ]
            }],
        };
    },
    Platebody: function (id, notedId, fullName, tier, value, spriteIndex, cmlSpriteSheetRow, equipLevel, stats) {
        let incinerateLevel = 36 + (tier * 4);
        return {
            id: id,
            name: fullName,
            noted: false,
            notedID: notedId,
            value: value,
            stackable: false,
            description: 'A metal chestplate. Offers great protection against melee attacks.',
            requirements: ItemDetail.build([
                ItemDetail.levelSkillDetail(equipLevel, 2, 'EQUIP'),
                ItemDetail.levelSkillDetail(incinerateLevel, 17, 'INCINERATE'),
            ]),
            essenceValue: EssenceValue(incinerateLevel, 55 * tier, [ShardCatalog.AIR(25 * tier), ShardCatalog.EARTH(85 * tier), ShardCatalog.METAL(52 * tier), ShardCatalog.FIRE(60 * tier), ShardCatalog.FORCE(110 * tier)]),
            spriteIndex: spriteIndex,
            equipmentStats: stats,
            model: {
                CHEST_WORN: {
                    id: 'CHEST_WORN',
                    asset: 'chestParts',
                    sprite: 'platebodyChest',
                    parent: 'CHEST',
                    spriteID: tier,
                    anchor: { x: 0.5, y: 0.65 },
                    position: { x: 0, y: 0.15 },
                    rotation: 0,
                    UIModel: null,
                    hideParts: ['CHEST_WORN_SHIRT'],
                    z: -1,
                },
                RIGHT_SHOULDER_WORN: {
                    id: 'RIGHT_SHOULDER_WORN',
                    asset: 'armParts',
                    sprite: 'platebodyRightShoulder',
                    parent: 'RIGHT_SHOULDER',
                    spriteID: tier,
                    anchor: { x: 9/11, y: 0.18 },
                    position: {x: 0.38, y: -0.05},
                    rotation: 0,
                    hideParts: ['RIGHT_SHOULDER_WORN_SHIRT'],
                    UIModel: null,
                },
                LEFT_SHOULDER_WORN: {
                    id: 'LEFT_SHOULDER_WORN',
                    asset: 'armParts',
                    sprite: 'platebodyLeftShoulder',
                    parent: 'LEFT_SHOULDER',
                    spriteID: tier,
                    anchor: { x: 1-9/11, y: 0.18 },
                    position: {x: -0.38, y: -0.05},
                    rotation: 0,
                    hideParts: ['LEFT_SHOULDER_WORN_SHIRT'],
                    UIModel: null,
                },
                RIGHT_FOREARM_WORN: {
                    id: 'RIGHT_FOREARM_WORN',
                    asset: 'armParts',
                    sprite: 'platebodyRightForearm',
                    parent: 'RIGHT_FOREARM',
                    spriteID: tier,
                    anchor: {x: 1-4/7, y: 0.05},
                    position: {x: 0.06, y: 0},
                    rotation: 0,
                    hideParts: ['RIGHT_FOREARM_WORN_SHIRT'],
                    UIModel: null,
                },
                LEFT_FOREARM_WORN: {
                    id: 'LEFT_FOREARM_WORN',
                    asset: 'armParts',
                    sprite: 'platebodyLeftForearm',
                    parent: 'LEFT_FOREARM',
                    spriteID: tier,
                    anchor: {x: 4/7, y: 0.05},
                    position: {x: -0.06, y: 0},
                    rotation: 0,
                    hideParts: ['LEFT_FOREARM_WORN_SHIRT'],
                    UIModel: null,
                },
            },
            actions: [{
                interfaceID: 5,
                id: 6,
                name: 'Equip',
                steps: [
                    [buildStep(StepType.HAS_SKILL_LEVEL, { params: [2, equipLevel] }),
                    buildStep(StepType.PLAY_ANIMATION, { params: ['EQUIP_CHEST'] }),
                    buildStep(StepType.GIVE_EQUIPMENT_ITEM, { params: [3, 'ITEM_ID', 'ITEM_STATE'] })]
                ]
            }],
        };
    },
    ChainHelm: function (id, notedId, fullName, tier, value, spriteIndex, cmlSpriteSheetRow, equipLevel, stats) {
        let incinerateLevel = 14 + (tier * 4);
        return {
            id: id,
            name: fullName,
            noted: false,
            notedID: notedId,
            value: value,
            stackable: false,
            description: 'A helmet with good protection against arrows.',
            requirements: ItemDetail.build([
                ItemDetail.levelSkillDetail(equipLevel, 5, 'EQUIP'),
                ItemDetail.levelSkillDetail(incinerateLevel, 17, 'INCINERATE')
            ]),
            essenceValue: EssenceValue(incinerateLevel, 12 * tier, [ShardCatalog.EARTH(15 * tier), ShardCatalog.METAL(10 * tier), ShardCatalog.FIRE(4 * tier), ShardCatalog.BIND(10 * tier)]),
            spriteIndex: spriteIndex,
            equipmentStats: stats,
            model: {
                HEAD_WORN: {
                    id: 'HEAD_WORN',
                    asset: 'headParts',
                    sprite: 'chainHelm',
                    parent: 'HEAD',
                    spriteID: tier,
                    anchor: { x: 0.5, y: 0.9 },
                    position: {x: 0, y: 0.1},
                    rotation: 0,
                    UIModel: null,
                    hideParts : ['HAIR'],
                },
            },
            actions: [{
                interfaceID: 5,
                id: 3,
                name: 'Equip',
                steps: [
                    [buildStep(StepType.HAS_SKILL_LEVEL, { params: [5, equipLevel] }),
                    buildStep(StepType.PLAY_ANIMATION, { params: ['EQUIP_HEAD'] }),
                    buildStep(StepType.GIVE_EQUIPMENT_ITEM, { params: [0, 'ITEM_ID', 'ITEM_STATE'] })]
                ]
            }],
        };
    },
    Chainlegs: function (id, notedId, fullName, tier, value, spriteIndex, cmlSpriteSheetRow, equipLevel, stats) {
        let incinerateLevel = 15 + (tier * 5);
        return {
            id: id,
            name: fullName,
            noted: false,
            notedID: notedId,
            value: value,
            stackable: false,
            description: 'Chain pants which block against arrows.',
            requirements: ItemDetail.build([
                ItemDetail.levelSkillDetail(equipLevel, 5, 'EQUIP'),
                ItemDetail.levelSkillDetail(incinerateLevel, 17, 'INCINERATE')
            ]),
            essenceValue: EssenceValue(incinerateLevel, 20 * tier, [ShardCatalog.EARTH(24 * tier), ShardCatalog.METAL(15 * tier), ShardCatalog.FIRE(6 * tier), ShardCatalog.BIND(20 * tier)]),
            spriteIndex: spriteIndex,
            equipmentStats: stats,
            model: {
                LEFT_THIGH_WORN: {
                    id: 'LEFT_THIGH_WORN',
                    asset: 'legParts',
                    sprite: 'chainLeftThigh',
                    parent: 'LEFT_THIGH',
                    spriteID: tier,
                    anchor: { x: (4/7), y: 0.185 },
                    position: {x: -0.1, y: 0.15},
                    rotation: 0,
                    hideParts: ['LEFT_THIGH_WORN_PANTS'],
                    UIModel: null,
                },
                RIGHT_THIGH_WORN: {
                    id: 'RIGHT_THIGH_WORN',
                    asset: 'legParts',
                    sprite: 'chainRightThigh',
                    parent: 'RIGHT_THIGH',
                    spriteID: tier,
                    anchor: { x: 1-(4/7), y: 0.185 },
                    position: {x: 0.1, y: 0.15},
                    rotation: 0,
                    hideParts: ['RIGHT_THIGH_WORN_PANTS'],
                    UIModel: null,
                },
                LEFT_SHIN_WORN: {
                    id: 'LEFT_SHIN_WORN',
                    asset: 'legParts',
                    sprite: 'chainLeftShin',
                    parent: 'LEFT_SHIN',
                    spriteID: tier,
                    anchor: { x: 0.5, y: 0 },
                    position: {x: 0.025, y: -0.11},
                    rotation: 0,
                    hideParts: ['LEFT_SHIN_WORN_PANTS'],
                    UIModel: null,
                },
                RIGHT_SHIN_WORN: {
                    id: 'RIGHT_SHIN_WORN',
                    asset: 'legParts',
                    sprite: 'chainRightShin',
                    parent: 'RIGHT_SHIN',
                    spriteID: tier,
                    anchor: { x: 0.5, y: 0 },
                    position: {x: -0.025, y: -0.11},
                    rotation: 0,
                    hideParts: ['RIGHT_SHIN_WORN_PANTS'],
                    UIModel: null,
                },
            },
            actions: [{
                interfaceID: 5,
                id: 7,
                name: 'Equip',
                steps: [
                    [buildStep(StepType.HAS_SKILL_LEVEL, { params: [5, equipLevel] }),
                    buildStep(StepType.PLAY_ANIMATION, { params: ['EQUIP_LEGS'] }),
                    buildStep(StepType.GIVE_EQUIPMENT_ITEM, { params: [4, 'ITEM_ID', 'ITEM_STATE'] })]
                ]
            }],
        };
    },
    Chainbody: function (id, notedId, fullName, tier, value, spriteIndex, cmlSpriteSheetRow, equipLevel, stats) {
        let incinerateLevel = 18 + (tier * 6);
        return {
            id: id,
            name: fullName,
            noted: false,
            notedID: notedId,
            value: value,
            stackable: false,
            description: 'A set of chainmail which offers protection against arrows.',
            requirements: ItemDetail.build([
                ItemDetail.levelSkillDetail(equipLevel, 5, 'EQUIP'),
                ItemDetail.levelSkillDetail(incinerateLevel, 17, 'INCINERATE')
            ]),
            essenceValue: EssenceValue(incinerateLevel, 28 * tier, [ShardCatalog.EARTH(44 * tier), ShardCatalog.METAL(22 * tier), ShardCatalog.FIRE(9 * tier), ShardCatalog.BIND(30 * tier)]),
            spriteIndex: spriteIndex,
            equipmentStats: stats,
            model: {
                CHEST_WORN: {
                    id: 'CHEST_WORN',
                    asset: 'chestParts',
                    sprite: 'chainbodyChest',
                    parent: 'CHEST',
                    spriteID: tier,
                    anchor: { x: 0.5, y: 0.65 },
                    position: { x: 0, y: -0.05 },
                    rotation: 0,
                    UIModel: null,
                    hideParts: ['CHEST_WORN_SHIRT'],
                    z: -1,
                },
                RIGHT_SHOULDER_WORN: {
                    id: 'RIGHT_SHOULDER_WORN',
                    asset: 'armParts',
                    sprite: 'chainbodyRightShoulder',
                    parent: 'RIGHT_SHOULDER',
                    spriteID: tier,
                    anchor: { x: 0.75, y: 0.18 },
                    position: {x: 0.06, y: 0},
                    rotation: -1 / 180 * Math.PI,
                    hideParts: ['RIGHT_SHOULDER_WORN_SHIRT'],
                    UIModel: null,
                },
                LEFT_SHOULDER_WORN: {
                    id: 'LEFT_SHOULDER_WORN',
                    asset: 'armParts',
                    sprite: 'chainbodyLeftShoulder',
                    parent: 'LEFT_SHOULDER',
                    spriteID: tier,
                    anchor: {x: 0.25, y: 0.18},
                    position: {x: -0.06, y: 0},
                    rotation: 1 / 180 * Math.PI,
                    hideParts: ['LEFT_SHOULDER_WORN_SHIRT'],
                    UIModel: null,
                },
                RIGHT_FOREARM_WORN: {
                    id: 'RIGHT_FOREARM_WORN',
                    asset: 'armParts',
                    sprite: 'chainbodyRightForearm',
                    parent: 'RIGHT_FOREARM',
                    spriteID: tier,
                    anchor: {x: (3/8), y: 0.05},
                    position: {x: 0, y: 0},
                    rotation: 0,
                    hideParts: ['RIGHT_FOREARM_WORN_SHIRT'],
                    UIModel: null,
                },
                LEFT_FOREARM_WORN: {
                    id: 'LEFT_FOREARM_WORN',
                    asset: 'armParts',
                    sprite: 'chainbodyLeftForearm',
                    parent: 'LEFT_FOREARM',
                    spriteID: tier,
                    anchor: {x: 1-(3/8), y: 0.05},
                    position: {x: 0, y: 0},
                    rotation: 0,
                    hideParts: ['LEFT_FOREARM_WORN_SHIRT'],
                    UIModel: null,
                },
            },
            actions: [{
                interfaceID: 5,
                id: 6,
                name: 'Equip',
                steps: [
                    [buildStep(StepType.HAS_SKILL_LEVEL, { params: [5, equipLevel] }),
                    buildStep(StepType.PLAY_ANIMATION, { params: ['EQUIP_CHEST'] }),
                    buildStep(StepType.GIVE_EQUIPMENT_ITEM, { params: [3, 'ITEM_ID', 'ITEM_STATE'] })]
                ]
            }],
        };
    },
    Dagger: function (id, notedId, fullName, tier, value, spriteIndex, cmlSpriteSheetRow, equipLevel, stats) {
        let incinerateLevel = Math.ceil(21 + (tier * 4));
        return {
            id: id,
            name: fullName,
            noted: false,
            notedID: notedId,
            value: value,
            stackable: false,
            description: 'A fast and accurate weapon.',
            requirements: ItemDetail.build([
                ItemDetail.levelSkillDetail(equipLevel, 0, 'EQUIP'),
                ItemDetail.levelSkillDetail(incinerateLevel, 17, 'INCINERATE'),
            ]),
            essenceValue: EssenceValue(incinerateLevel, 12 * tier, [ShardCatalog.EARTH(15 * tier), ShardCatalog.METAL(12 * tier), ShardCatalog.FIRE(40 * tier), ShardCatalog.FORCE(22 * tier), ShardCatalog.SHARP(10 * tier)]),
            spriteIndex: spriteIndex,
            combatStyle: Combat.CombatStyle.MELEE,
            attackRange: 1,
            attackCooldown: 4,
            equipmentStats: stats,
            model: {
                RIGHT_TOOL: {
                    id: 'RIGHT_TOOL',
                    asset: 'heldParts',
                    sprite: 'dagger',
                    parent: 'RIGHT_FOREARM',
                    spriteID: tier,
                    anchor: { x: 0.95, y: 0.5 },
                    position: { x: 0, y: 0.75 },
                    rotation: 0,
                    UIModel: null,
                },
            },
            actions: [{
                interfaceID: 5,
                id: 4,
                name: 'Equip',
                steps: [
                    [buildStep(StepType.HAS_SKILL_LEVEL, { params: [0, equipLevel] }),
                    buildStep(StepType.PLAY_ANIMATION, { params: ['EQUIP_RIGHT_SHOULDER_SHEATH'] }),
                    buildStep(StepType.GIVE_EQUIPMENT_ITEM, { params: [1, 'ITEM_ID', 'ITEM_STATE'] })]
                ]
            }],
        };
    },
    DeathScythe: function(id) {
        return {
            id: id,
            name: 'Death Scythe',
            noted: false,
            notedID: 0,
            value: 0,
            stackable: false,
            description: 'Death\'s Scythe.',
            spriteIndex: 359,
            combatStyle: Combat.CombatStyle.MELEE,
            equipmentStats: [0,0,0,0,0,0,0,0,0],
            model: {
                RIGHT_TOOL: {
                    id: 'RIGHT_TOOL',
                    asset: 'heldParts',
                    sprite: 'scythe',
                    parent: 'RIGHT_FOREARM',
                    spriteID: 666,
                    anchor: {x: 0.95, y: 0.5},
                    position: { x: 0, y: 0.95 },
                    rotation: (30 * Math.PI / 180),
                    UIModel: null,
                },
            },
            actions: [{
                interfaceID: 5,
                id: 4,
                name: 'Equip',
                steps: [
                    [buildStep(StepType.HAS_SKILL_LEVEL, { params: [0, 0] }),
                    buildStep(StepType.PLAY_ANIMATION, { params: ['EQUIP_RIGHT_SHOULDER_SHEATH'] }),
                    buildStep(StepType.GIVE_EQUIPMENT_ITEM, { params: [1, 'ITEM_ID', 'ITEM_STATE'] })]
                ]
            }],
        };
    }, // 612, name, spriteIndex, 
    MaxLevelStandard: (id, name, spriteIndex, skillID, description) => {
        return {
            id,
            name,
            noted: false,
            value: 100000,
            cannotRedirectTome: true,
            stackable: false,
            spriteIndex,
            description,
            skillID,
            untradeable: true,
            equipmentStats: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            model: {
                LEFT_TOOL: {
                    id: 'LEFT_TOOL',
                    asset: 'heldParts',
                    sprite: 'maxLevelStandard',
                    parent: 'LEFT_FOREARM',
                    spriteID: skillID,
                    anchor: { x: 0.5, y: 0.75 },
                    position: { x: 0, y: 0.75 },
                    rotation: 5 * (Math.PI / 180),
                    UIModel: null,
                },
            },
            actions: [{
                interfaceID: 5,
                id: 4,
                name: 'Equip',
                steps: [
                    [buildStep(StepType.HAS_SKILL_LEVEL, { params: [skillID, 100] }),
                    buildStep(StepType.PLAY_ANIMATION, { params: ['EQUIP_LEFT_SHOULDER_SHEATH'] }),
                    buildStep(StepType.GIVE_EQUIPMENT_ITEM, { params: [2, 'ITEM_ID', 'ITEM_STATE'] })]
                ]
            }],
        };
    },
    Sword: function (id, notedId, fullName, tier, value, spriteIndex, cmlSpriteSheetRow, equipLevel, stats) {
        let incinerateLevel = Math.floor(22 + (tier * 5));
        return {
            id: id,
            name: fullName,
            noted: false,
            notedID: notedId,
            value: value,
            stackable: false,
            description: 'A slower, stronger weapon.',
            requirements: ItemDetail.build([
                ItemDetail.levelSkillDetail(equipLevel, 0, 'EQUIP'),
                ItemDetail.levelSkillDetail(incinerateLevel, 17, 'INCINERATE'),
            ]),
            essenceValue: EssenceValue(incinerateLevel, 20 * tier, [ShardCatalog.EARTH(45 * tier), ShardCatalog.METAL(30 * tier), ShardCatalog.FIRE(120 * tier), ShardCatalog.FORCE(66 * tier), ShardCatalog.SHARP(20 * tier)]),
            spriteIndex: spriteIndex,
            combatStyle: Combat.CombatStyle.MELEE,
            attackRange: 1,
            attackCooldown: 6,
            equipmentStats: stats,
            model: {
                RIGHT_TOOL: {
                    id: 'RIGHT_TOOL',
                    asset: 'heldParts',
                    sprite: 'sword',
                    parent: 'RIGHT_FOREARM',
                    spriteID: tier,
                    anchor: { x: 0.95, y: 0.5 },
                    position: { x: 0, y: 0.75 },
                    rotation: 5 * Math.PI / 180,
                    UIModel: null,
                },
            },
            actions: [{
                interfaceID: 5,
                id: 4,
                name: 'Equip',
                steps: [
                    [buildStep(StepType.HAS_SKILL_LEVEL, { params: [0, equipLevel] }),
                    buildStep(StepType.PLAY_ANIMATION, { params: ['EQUIP_RIGHT_SHOULDER_SHEATH'] }),
                    buildStep(StepType.GIVE_EQUIPMENT_ITEM, { params: [1, 'ITEM_ID', 'ITEM_STATE'] })]
                ]
            }],
        };
    },
    Arrowheads: function (id, arrowsId, fullName, value, spriteIndex, xpReward, fletchingLevel, tier) {
        let incinerateLevel = 8 + (tier * 4);
        return {
            id: id,
            name: fullName,
            noted: false,
            value: value,
            stackable: true,
            description: 'Used for tipping headless arrows.',
            requirements: ItemDetail.build([
                ItemDetail.levelSkillDetail(fletchingLevel, 16, 'CRAFT'),
                ItemDetail.levelSkillDetail(incinerateLevel, 17, 'INCINERATE')
            ]),
            essenceValue: EssenceValue(incinerateLevel, 1 * tier, [ShardCatalog.EARTH(5 * tier), ShardCatalog.METAL(5 * tier), ShardCatalog.FIRE(5 * tier), ShardCatalog.SHARP(4 * tier)]),
            spriteIndex: spriteIndex,
            useActions: [{
                interfaceID: 5,
                id: 9,
                name: 'Use',
                entityType: Entity.EntityType.INVENTORY_ITEM,
                entityID: 72,
                actionInterval: 0,
                flags: ['REPEAT_ACTION'],
                steps: [
                    [buildStep(StepType.COMBINE_ITEMS, { params: [72, id, arrowsId, 5, 16, xpReward] })]
                ],
            }, {
                interfaceID: 5,
                id: 10,
                name: '',
                entityType: Entity.EntityType.INVENTORY_ITEM,
                entityID: 74,
                actionInterval: 0,
                steps: [
                    [buildStep(StepType.SEND_CLIENT_MESSAGE, { params: ['You should add feathers to this first.'] })]
                ],
            }],
        };
    },
    Arrows: function (id, fullName, value, spriteIndex, equipLevel, stats, projectileID) {
        let tier = 1 + Math.floor(equipLevel / 10);
        let incinerateLevel = 5 + (tier * 4);
        return {
            id: id,
            name: fullName,
            noted: false,
            value: value,
            stackable: true,
            projectileID,
            description: 'Fired with a bow.',
            requirements: ItemDetail.build([
                ItemDetail.levelSkillDetail(equipLevel, 3, 'EQUIP'),
                ItemDetail.levelSkillDetail(equipLevel, 16, 'CRAFT'),
            ]),
            essenceValue: EssenceValue(incinerateLevel, 2 * tier, [ShardCatalog.AIR(10 * tier), ShardCatalog.EARTH(10 * tier), ShardCatalog.NATURE(3 * tier), ShardCatalog.METAL(5 * tier), ShardCatalog.FIRE(5 * tier), ShardCatalog.SHARP(5 * tier)]),
            spriteIndex: spriteIndex,
            equipmentStats: stats,
            actions: [{
                interfaceID: 5,
                id: 8,
                name: 'Equip',
                steps: [
                    [buildStep(StepType.HAS_SKILL_LEVEL, { params: [3, equipLevel] }),
                    buildStep(StepType.PLAY_ANIMATION, { params: ['EQUIP_ARROW'] }),
                    buildStep(StepType.GIVE_EQUIPMENT_ITEM, { params: [5, 'ITEM_ID', 'ITEM_STATE'] })]
                ]
            }],
        };
    },
    Axe: function (id, notedId, fullName, value, spriteIndex, toolPower, toolLevel, cmSpriteSheetRow, equipLevel, stats, tier) {
        let incinerateLevel = 20 + (tier * 4);
        return {
            id: id,
            name: fullName,
            noted: false,
            notedID: notedId,
            value: value,
            stackable: false,
            description: 'An axe for woodcutting.',
            requirements: ItemDetail.build([
                ItemDetail.levelSkillDetail(toolLevel, 0, 'EQUIP'),
                ItemDetail.levelSkillDetail(toolLevel, 9, 'USE'),
                ItemDetail.levelSkillDetail(incinerateLevel, 17, 'INCINERATE')
            ]),
            essenceValue: EssenceValue(incinerateLevel, 12 * tier, [ShardCatalog.EARTH(15 * tier), ShardCatalog.METAL(12 * tier), ShardCatalog.FIRE(40 * tier), ShardCatalog.FORCE(22 * tier), ShardCatalog.SHARP(5 * tier)]),
            spriteIndex: spriteIndex,
            toolPower: toolPower,
            toolLevel: toolLevel,
            itemGroup: 1,
            combatStyle: Combat.CombatStyle.MELEE,
            attackRange: 1,
            attackCooldown: 8,
            equipmentStats: stats, //melee focus, power, defense, range .. .. .., magic .. .. ..
            model: {
                RIGHT_TOOL: {
                    id: 'RIGHT_TOOL',
                    asset: 'heldParts',
                    sprite: 'axe',
                    parent: 'RIGHT_FOREARM',
                    spriteID: tier,
                    anchor: { x: 0.95, y: 0.5 },
                    position: { x: 0.5, y: 0.9 },
                    rotation: 8 * Math.PI / 180,
                    UIModel: null,
                },
            },
            actions: [{
                interfaceID: 5,
                id: 4,
                name: 'Equip',
                steps: [
                    [buildStep(StepType.HAS_SKILL_LEVEL, { params: [0, equipLevel] }),
                    buildStep(StepType.PLAY_ANIMATION, { params: ['EQUIP_RIGHT_SHOULDER_SHEATH'] }),
                    buildStep(StepType.GIVE_EQUIPMENT_ITEM, { params: [1, 'ITEM_ID', 'ITEM_STATE'] })]
                ]
            }
            ],
        };
    },
    Pickaxe: function (id, notedId, fullName, value, spriteIndex, toolPower, toolLevel, cmSpriteSheetRow, equipLevel, stats, tier) {
        let incinerateLevel = 22 + (tier * 4);
        return {
            id: id,
            name: fullName,
            noted: false,
            notedID: notedId,
            value: value,
            stackable: false,
            description: 'A basic pickaxe.',
            requirements: ItemDetail.build([
                ItemDetail.levelSkillDetail(toolLevel, 0, 'EQUIP'),
                ItemDetail.levelSkillDetail(toolLevel, 10, 'USE'),
                ItemDetail.levelSkillDetail(incinerateLevel, 17, 'INCINERATE')
            ]),
            essenceValue: EssenceValue(incinerateLevel, 24 * tier, [ShardCatalog.EARTH(32 * tier), ShardCatalog.METAL(20 * tier), ShardCatalog.FIRE(80 * tier), ShardCatalog.FORCE(44 * tier), ShardCatalog.SHARP(12 * tier)]),
            spriteIndex: spriteIndex,
            toolPower: toolPower,
            toolLevel: toolLevel,
            itemGroup: 2,
            combatStyle: Combat.CombatStyle.MELEE,
            attackRange: 1,
            attackCooldown: 9,
            equipmentStats: stats,
            model: {
                RIGHT_TOOL: {
                    id: 'RIGHT_TOOL',
                    asset: 'heldParts',
                    sprite: 'pickaxe',
                    parent: 'RIGHT_FOREARM',
                    spriteID: tier,
                    anchor: { x: 0.95, y: 0.5 },
                    position: { x: 0.5, y: 0.75 },
                    rotation: 3 * Math.PI / 180,
                    UIModel: null,
                },
            },
            actions: [{
                interfaceID: 5,
                id: 4,
                name: 'Equip',
                steps: [
                    [buildStep(StepType.HAS_SKILL_LEVEL, { params: [0, equipLevel] }),
                    buildStep(StepType.PLAY_ANIMATION, { params: ['EQUIP_RIGHT_SHOULDER_SHEATH'] }),
                    buildStep(StepType.GIVE_EQUIPMENT_ITEM, { params: [1, 'ITEM_ID', 'ITEM_STATE'] })]
                ]
            }],
        };
    },
    Note: function (id, unnotedItemId, fullName, value, spriteIndex) {
        return {
            id: id,
            name: fullName,
            noted: true,
            unnotedID: unnotedItemId,
            value: value,
            stackable: true,
            description: 'Convert this note to a ' + fullName.toLowerCase() + ' at any storage or shop.',
            spriteIndex: spriteIndex,
        };
    },
    BigHat: function (id, notedId, fullName, spriteIndex, modelSprite) {
        return {
            id: id,
            name: fullName,
            noted: false,
            notedID: notedId,
            value: 0,
            stackable: false,
            description: '',
            spriteIndex: spriteIndex,
            equipmentStats: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            model: {
                HEAD_WORN: {
                    id: 'HEAD_WORN',
                    asset: 'headParts',
                    sprite: modelSprite,
                    parent: 'HEAD',
                    spriteID: 0,
                    anchor: { x: 0.5, y: 0.9 },
                    position: { x: 0, y: 0.05 },
                    rotation: 0,
                    UIModel: null,
                },
            },
            actions: [{
                interfaceID: 5,
                id: 3,
                name: 'Equip',
                steps: [
                    [buildStep(StepType.HAS_SKILL_LEVEL, { params: [2, 1] }),
                    buildStep(StepType.PLAY_ANIMATION, { params: ['EQUIP_HEAD'] }),
                    buildStep(StepType.GIVE_EQUIPMENT_ITEM, { params: [0, 'ITEM_ID', 'ITEM_STATE'] })]
                ]
            }],
        };
    },
    Logs: function (id, notedId, woodName, value, spriteIndex, levelTier) {
        let tier = 1 + Math.floor(levelTier / 10);
        let incinerateLevel = levelTier;
        let name = woodName != null ? woodName + " Logs" : "Logs";
        let descriptionName = name.toLowerCase();
        return {
            id: id,
            name: name,
            noted: false,
            notedID: notedId,
            value: value,
            stackable: false,
            description: 'Some ' + descriptionName + '.',
            requirements: ItemDetail.build([
                ItemDetail.levelSkillDetail(levelTier, 9, 'GATHER'),
                ItemDetail.levelSkillDetail(levelTier, 16, 'CRAFT'),
                ItemDetail.levelSkillDetail(levelTier, 18, 'USE'),
                ItemDetail.levelSkillDetail(incinerateLevel, 17, 'INCINERATE'),
            ]),
            essenceValue: EssenceValue(incinerateLevel, 5 * tier, [ShardCatalog.EARTH(20 * tier), ShardCatalog.NATURE(4 * tier)]),
            spriteIndex: spriteIndex,
        };
    },
    UnstrungBow: function (id, notedId, woodName, value, spriteIndex, levelRequired, strungBowId, xp, tier) {
        let incinerateLevel = 7 + Math.floor(levelRequired / 2);
        let name = woodName == null ? 'Unstrung Bow' : 'Unstrung ' + woodName + ' Bow';
        let descriptionName = (woodName == null ? 'bow' : woodName + ' bow').toLowerCase();
        return {
            id: id,
            name: name,
            noted: false,
            notedID: notedId,
            value: value,
            stackable: false,
            description: 'An ' + name.toLowerCase() + ', missing a bow string.',
            requirements: ItemDetail.build([
                ItemDetail.levelSkillDetail(levelRequired, 16, 'CRAFT'),
                ItemDetail.levelSkillDetail(incinerateLevel, 17, 'INCINERATE'),
            ]),
            essenceValue: EssenceValue(incinerateLevel, 3 * tier, [ShardCatalog.AIR(22 * tier), ShardCatalog.EARTH(22 * tier), ShardCatalog.NATURE(5 * tier), ShardCatalog.SHARP(1 * tier)]),
            spriteIndex: spriteIndex,
            useActions: [{
                interfaceID: 5,
                id: 9,
                name: '',
                entityType: Entity.EntityType.INVENTORY_ITEM,
                entityID: 41,
                actionInterval: 2,
                flags: ['REPEAT_ACTION'],
                steps: [
                    [buildStep(StepType.HAS_INVENTORY_ITEM, { params: [id, 1] }),
                    buildStep(StepType.HAS_INVENTORY_ITEM, { params: [41, 1] }),
                    buildStep(StepType.HAS_SKILL_LEVEL, { params: [16, levelRequired] }),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, { params: [id, 1] }),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, { params: [41, 1] }),
                    buildStep(StepType.GIVE_INVENTORY_ITEM, { params: [strungBowId, 1] }),
                    buildStep(StepType.GIVE_XP, { params: [16, xp] }),
                    buildStep(StepType.SEND_CLIENT_MESSAGE, { params: ['You string an ' + descriptionName + '.'] })],
                ],
            }],
        };
    },
    Bow: function (id, notedId, name, value, spriteIndex, equipmentStats, tier, levelRequirement, ammoIDs = null) {
        let incinerateLevel = Math.ceil(8 + (tier * 5));
        return {
            id: id,
            name: name,
            noted: false,
            notedID: notedId,
            value: value,
            stackable: false,
            description: 'A ranged weapon used for launching arrows at enemies.',
            requirements: ItemDetail.build([
                ItemDetail.levelSkillDetail(levelRequirement, 3, 'EQUIP'),
                ItemDetail.levelSkillDetail(incinerateLevel, 17, 'INCINERATE'),
            ]),
            ammoIDs: ammoIDs,
            essenceValue: EssenceValue(incinerateLevel, 3 * tier, [ShardCatalog.AIR(10 * tier), ShardCatalog.EARTH(40 * tier), ShardCatalog.NATURE(18 * tier), ShardCatalog.FORCE(60 * tier), ShardCatalog.BIND(40 + (tier * 1))]),
            spriteIndex: spriteIndex,
            combatStyle: Combat.CombatStyle.RANGE,
            attackRange: 7,
            attackCooldown: 6,
            equipmentStats: equipmentStats,
            model: {
                RIGHT_TOOL: {
                    id: 'RIGHT_TOOL',
                    asset: 'heldParts',
                    sprite: 'bow',
                    parent: 'RIGHT_FOREARM',
                    spriteID: tier,
                    anchor: { x: 0.5, y: 0.5 },
                    position: { x: 0.35, y: 0.5 },
                    rotation:  -60 * Math.PI / 180,
                    UIModel: null,
                },
            },
            actions: [{
                interfaceID: 5,
                id: 4,
                name: 'Equip',
                steps: [
                    [buildStep(StepType.HAS_SKILL_LEVEL, { params: [3, levelRequirement] }),
                    buildStep(StepType.PLAY_ANIMATION, { params: ['EQUIP_RIGHT_SHOULDER_BACK'] }),
                    buildStep(StepType.GIVE_EQUIPMENT_ITEM, { params: [1, 'ITEM_ID', 'ITEM_STATE'] })]
                    //has enough space to unequip 2 left and right
                ]
            }],
        };
    },
    Shirt: function (id, notedId, name, itemSpriteIndex, sprite, spriteId, value, description, armSpriteNameOverride = null, isArmour = false, itemDetail = null) {
        let armSpriteName = armSpriteNameOverride == null ? sprite : armSpriteNameOverride;
        let shirt = {
            id: id,
            name: name,
            noted: false,
            notedID: notedId,
            value: value,
            cannotRedirectTome: true,
            stackable: false,
            description: description,
            requirements: itemDetail || ItemDetail.build([
                ItemDetail.levelSkillDetail(4, 17, 'INCINERATE'),
            ]),
            essenceValue: EssenceValue(4, 8, [ShardCatalog.AIR(5), ShardCatalog.WATER(5), ShardCatalog.EARTH(5), ShardCatalog.NATURE(2), ShardCatalog.BIND(10)]),
            spriteIndex: itemSpriteIndex,
            equipmentStats: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            actions: [{
                interfaceID: 5,
                id: 6,
                name: 'Equip',
                steps: [
                    [
                        buildStep(StepType.PLAY_ANIMATION, { params: ['EQUIP_CHEST'] }),
                        buildStep(StepType.GIVE_EQUIPMENT_ITEM, { params: [isArmour ? 3 : 9, 'ITEM_ID'] })]
                    ]
            }],
        };

        if (isArmour) {
            shirt.model = {
                RIGHT_SHOULDER_WORN: {
                    id: 'RIGHT_SHOULDER_WORN',
                    asset: 'armParts',
                    sprite: armSpriteName + 'RightShoulder',
                    parent: 'RIGHT_SHOULDER',
                    spriteID: spriteId,
                    anchor: { x: 0.75, y: 0.18 },
                    position: {x: 0.05, y: 0},
                    rotation: 0,
                    hideParts: ['RIGHT_SHOULDER_WORN_SHIRT'],
                    UIModel: null,
                },
                LEFT_SHOULDER_WORN: {
                    id: 'LEFT_SHOULDER_WORN',
                    asset: 'armParts',
                    sprite: armSpriteName + 'LeftShoulder',
                    parent: 'LEFT_SHOULDER',
                    spriteID: spriteId,
                    anchor: { x: 0.25, y: 0.18 },
                    position: {x: -0.05, y: 0},
                    rotation: 0,
                    hideParts: ['LEFT_SHOULDER_WORN_SHIRT'],
                    UIModel: null,
                },
                CHEST_WORN: {
                    id: 'CHEST_WORN',
                    asset: 'chestParts',
                    sprite: sprite + 'Chest',
                    parent: 'CHEST',
                    spriteID: spriteId,
                    anchor: { x: 0.5, y: 0.65 },
                    position: { x: 0, y: 0.0 },
                    rotation: 0,
                    UIModel: null,
                    hideParts: ['CHEST_WORN_SHIRT'],
                    z: -1,
                },
                RIGHT_FOREARM_WORN: {
                    id: 'RIGHT_FOREARM_WORN',
                    asset: 'armParts',
                    sprite:  armSpriteName + 'RightForearm',
                    parent: 'RIGHT_FOREARM',
                    spriteID: spriteId,
                    anchor: {x: (3/8), y: 0.05},
                    position: {x: 0.05, y: -0.2},
                    rotation: 0,
                    hideParts: ['RIGHT_FOREARM_WORN_SHIRT'],
                    UIModel: null,
                },
                LEFT_FOREARM_WORN: {
                    id: 'LEFT_FOREARM_WORN',
                    asset: 'armParts',
                    sprite: armSpriteName + 'LeftForearm',
                    parent: 'LEFT_FOREARM',
                    spriteID: spriteId,
                    anchor: {x: 1-(3/8), y: 0.05},
                    position: {x: -0.05, y: -0.2},
                    rotation: 0,
                    hideParts: ['LEFT_FOREARM_WORN_SHIRT'],
                    UIModel: null,
                },
            };
        }
        else {
            shirt.model = {
                RIGHT_SHOULDER_WORN_SHIRT: {
                    id: 'RIGHT_SHOULDER_WORN_SHIRT',
                    asset: 'armParts',
                    sprite: armSpriteName + 'RightShoulder',
                    parent: 'RIGHT_SHOULDER',
                    spriteID: spriteId,
                    anchor: { x: 0.75, y: 0.18 },
                    position: {x: 0.05, y: 0},
                    rotation: 0,
                    UIModel: null,
                },
                LEFT_SHOULDER_WORN_SHIRT: {
                    id: 'LEFT_SHOULDER_WORN_SHIRT',
                    asset: 'armParts',
                    sprite: armSpriteName + 'LeftShoulder',
                    parent: 'LEFT_SHOULDER',
                    spriteID: spriteId,
                    anchor: { x: 0.25, y: 0.18 },
                    position: {x: -0.05, y: 0},
                    rotation: 0,
                    UIModel: null,
                },
                CHEST_WORN_SHIRT: {
                    id: 'CHEST_WORN_SHIRT',
                    asset: 'chestParts',
                    sprite: sprite + 'Chest',
                    parent: 'CHEST',
                    spriteID: spriteId,
                    anchor: { x: 0.5, y: 0.65 },
                    position: { x: 0, y: -0.05 },
                    rotation: 0,
                    UIModel: null,
                    z: -1,
                },
                RIGHT_FOREARM_WORN_SHIRT: {
                    id: 'RIGHT_FOREARM_WORN_SHIRT',
                    asset: 'armParts',
                    sprite:  armSpriteName + 'RightForearm',
                    parent: 'RIGHT_FOREARM',
                    spriteID: spriteId,
                    anchor: {x: (3/8), y: 0.05},
                    position: {x: 0.10, y: -0.15},
                    rotation: -2.5 / 180 * Math.PI,
                    UIModel: null,
                },
                LEFT_FOREARM_WORN_SHIRT: {
                    id: 'LEFT_FOREARM_WORN_SHIRT',
                    asset: 'armParts',
                    sprite: armSpriteName + 'LeftForearm',
                    parent: 'LEFT_FOREARM',
                    spriteID: spriteId,
                    anchor: {x: 1-(3/8), y: 0.05},
                    position: {x: -0.1, y: -0.15},
                    rotation: 2.5 / 180 * Math.PI,
                    UIModel: null,
                },
            };
        }
        return shirt;
    },
    ColoredShirt: function (id, notedId, name, itemSpriteIndex, shirtStyleNumber, colorSpriteId, value) {
        coloredShirtStyleAndColorById[id] = shirtStyleNumber * 1000 + colorSpriteId;
        coloredShirtIdsByStyleAndColor[shirtStyleNumber * 1000 + colorSpriteId] = id;
        return this.Shirt(id, notedId, name, itemSpriteIndex, 'shirt' + shirtStyleNumber, colorSpriteId, value, 'Everyday clothing', 'shirt' );
    },
    RobeChest: function (id, notedId, name, itemspriteIndex, spriteId, value, equipmentStats, minEquipLevelId) {
        let tier = 1 + Math.floor(minEquipLevelId / 10);
        let incinerateLevel = 12 + Math.floor(minEquipLevelId / 2);
        let robe = this.Shirt(id, notedId, name, itemspriteIndex, 'robe', spriteId, value, 'A wizard robe.', null, true);
        robe.essenceValue = EssenceValue(incinerateLevel, 20 + (10 * tier), [ShardCatalog.AIR(20 + tier * 40), ShardCatalog.EARTH(60 + tier * 30), ShardCatalog.NATURE(tier * 50), ShardCatalog.BIND(tier * 150)]);
        robe.equipmentStats = equipmentStats;
        robe.model.RIGHT_SHOULDER_WORN.sprite = 'robeRightShoulder';
        robe.model.RIGHT_FOREARM_WORN.sprite = 'robeRightForearm';
        robe.model.LEFT_SHOULDER_WORN.sprite = 'robeLeftShoulder';
        robe.model.LEFT_FOREARM_WORN.sprite = 'robeLeftForearm';
        robe.actions = [{
            interfaceID: 5,
            id: 6,
            name: 'Equip',
            steps: [
                [buildStep(StepType.HAS_SKILL_LEVEL, { params: [8, minEquipLevelId] }),
                buildStep(StepType.PLAY_ANIMATION, { params: ['EQUIP_CHEST'] }),
                buildStep(StepType.GIVE_EQUIPMENT_ITEM, { params: [3, 'ITEM_ID'] })]
            ]
        }];
        return robe;
    },
    Pants: function (id, notedId, fullName, spriteName, colorSpriteId, spriteIndex, value, isArmour = false) {
        let pants = {
            id: id,
            name: fullName,
            noted: false,
            notedID: notedId,
            value: value,
            cannotRedirectTome: true,
            stackable: false,
            description: 'A pair of pants. Some general protection.',
            spriteIndex: spriteIndex,
            requirements: ItemDetail.build([
                ItemDetail.levelSkillDetail(4, 17, 'INCINERATE'),
            ]),
            essenceValue: EssenceValue(4, 8, [ShardCatalog.AIR(5), ShardCatalog.WATER(5), ShardCatalog.EARTH(5), ShardCatalog.NATURE(2), ShardCatalog.BIND(10)]),
            equipmentStats: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            actions: [{
                interfaceID: 5,
                id: 6,
                name: 'Equip',
                steps: [
                    [
                        buildStep(StepType.PLAY_ANIMATION, { params: ['EQUIP_LEGS'] }),
                        buildStep(StepType.GIVE_EQUIPMENT_ITEM, { params: [isArmour ? 4 : 10, 'ITEM_ID'] })
                    ]
                ]
            }],
        };

        if (isArmour) {
            pants.model = {
                LEFT_THIGH_WORN: {
                    id: 'LEFT_THIGH_WORN',
                    asset: 'legParts',
                    sprite: spriteName + 'LeftThigh',
                    parent: 'LEFT_THIGH',
                    spriteID: colorSpriteId,
                    anchor: { x: (6/9), y: 0.15 },
                    position: {x: 0, y: 0},
                    rotation: 0,
                    hideParts: ['LEFT_THIGH_WORN_PANTS'],
                    UIModel: null,
                },
                RIGHT_THIGH_WORN: {
                    id: 'RIGHT_THIGH_WORN',
                    asset: 'legParts',
                    sprite: spriteName + 'RightThigh',
                    parent: 'RIGHT_THIGH',
                    spriteID: colorSpriteId,
                    anchor: { x: 1-(6/9), y: 0.15 },
                    position: {x: 0, y: 0},
                    rotation: 0,
                    hideParts: ['RIGHT_THIGH_WORN_PANTS'],
                    UIModel: null,
                },
                LEFT_SHIN_WORN: {
                    id: 'LEFT_SHIN_WORN',
                    asset: 'legParts',
                    sprite: spriteName + 'LeftShin',
                    parent: 'LEFT_SHIN',
                    spriteID: colorSpriteId,
                    anchor: { x: 0.52, y: 0.1 },
                    position: {x: 0, y: -0.05},
                    rotation: 0,
                    hideParts: ['LEFT_SHIN_WORN_PANTS'],
                    UIModel: null,
                },
                RIGHT_SHIN_WORN: {
                    id: 'RIGHT_SHIN_WORN',
                    asset: 'legParts',
                    sprite: spriteName + 'RightShin',
                    parent: 'RIGHT_SHIN',
                    spriteID: colorSpriteId,
                    anchor: { x: 0.48, y: 0.1 },
                    position: {x: 0, y: -0.05},
                    rotation: 0,
                    hideParts: ['RIGHT_SHIN_WORN_PANTS'],
                    UIModel: null,
                },
            };
        }
        else {
            pants.model = {
                LEFT_THIGH_WORN_PANTS: {
                    id: 'LEFT_THIGH_WORN_PANTS',
                    asset: 'legParts',
                    sprite: spriteName + 'LeftThigh',
                    parent: 'LEFT_THIGH',
                    spriteID: colorSpriteId,
                    anchor: { x: (6/9), y: 0.2 },
                    position: {x: 0.025, y: 0},
                    rotation: 0,
                    UIModel: null,
                },
                RIGHT_THIGH_WORN_PANTS: {
                    id: 'RIGHT_THIGH_WORN_PANTS',
                    asset: 'legParts',
                    sprite: spriteName + 'RightThigh',
                    parent: 'RIGHT_THIGH',
                    spriteID: colorSpriteId,
                    anchor: { x: 1-(6/9), y: 0.2 },
                    position: {x: -0.025, y: 0},
                    rotation: 0,
                    UIModel: null,
                },
                LEFT_SHIN_WORN_PANTS: {
                    id: 'LEFT_SHIN_WORN_PANTS',
                    asset: 'legParts',
                    sprite: spriteName + 'LeftShin',
                    parent: 'LEFT_SHIN',
                    spriteID: colorSpriteId,
                    anchor: { x: 0.5, y: 0.1 },
                    position: {x: 0, y: 0},
                    rotation: 0,
                    UIModel: null,
                },
                RIGHT_SHIN_WORN_PANTS: {
                    id: 'RIGHT_SHIN_WORN_PANTS',
                    asset: 'legParts',
                    sprite: spriteName + 'RightShin',
                    parent: 'RIGHT_SHIN',
                    spriteID: colorSpriteId,
                    anchor: { x: 0.5, y: 0.1 },
                    position: {x: 0, y: 0},
                    rotation: 0,
                    UIModel: null,
                },
            };
        }
        return pants;
    },
    ColoredPants: function(id, notedId, fullName, spriteName, colorSpriteId, spriteIndex, value) {
        let pants = this.Pants(id, notedId, fullName, spriteName, colorSpriteId, spriteIndex, value);
        coloredPantsIdsByColor[colorSpriteId] = id;
        return pants;
    },
    RobeLegs: function (id, notedId, name, itemspriteIndex, spriteId, value, equipmentStats, minEquipLevelId) {
        let tier = 1 + Math.floor(minEquipLevelId / 10);
        let incinerateLevel = 12 + Math.floor(minEquipLevelId / 2);
        let robe = this.Pants(id, notedId, name, "robe", spriteId, itemspriteIndex, value, true);
        robe.essenceValue = EssenceValue(incinerateLevel, 20 + (10 * tier), [ShardCatalog.AIR(100 + tier * 30), ShardCatalog.WATER(20 + tier * 20), ShardCatalog.EARTH(60 + tier * 20), ShardCatalog.NATURE(tier * 40), ShardCatalog.BIND(tier * 100)]);
        robe.equipmentStats = equipmentStats;
        robe.model.LEFT_SHIN_WORN.position.y += 0.1;
        robe.model.LEFT_SHIN_WORN.position.x += -0.05;
        robe.model.RIGHT_SHIN_WORN.position.x += 0.05;
        robe.model.RIGHT_SHIN_WORN.position.y += 0.1;

        robe.model.TOP_UNDER =  {
            id: 'TOP_UNDER',
            asset: 'legParts',
            sprite: 'robeTopUnder',
            parent: 'CHEST',
            spriteID: spriteId,
            anchor: { x: 0.5, y: 0 },
            position: { x: 0, y: 0.4 },
            z : -10,
        };

        robe.model.BOTTOM_UNDER =  {
            id: 'BOTTOM_UNDER',
            asset: 'legParts',
            sprite: 'robeBottomUnder',
            parent: 'CHEST',
            spriteID: spriteId,
            anchor: { x: 0.5, y: 0 },
            position: { x: 0, y: 0.75 },
            z : -10,
        };

        robe.actions = [{
            interfaceID: 5,
            id: 7,
            name: 'Equip',
            steps: [
                [buildStep(StepType.HAS_SKILL_LEVEL, { params: [8, minEquipLevelId] }),
                buildStep(StepType.PLAY_ANIMATION, { params: ['EQUIP_LEGS'] }),
                buildStep(StepType.GIVE_EQUIPMENT_ITEM, { params: [4, 'ITEM_ID', 'ITEM_STATE'] })]
            ]
        }];
        return robe;
    },
    Shield: function (id, notedId, name, value, spriteIndex, equipmentStats, tier, levelRequirement, levelReqID) {
        let incinerateLevel = Math.floor(19 + (tier * 5));
        return {
            id: id,
            name: name,
            noted: false,
            notedID: notedId,
            value: value,
            stackable: false,
            description: 'A shield.',
            requirements: ItemDetail.build([
                ItemDetail.levelSkillDetail(levelRequirement, levelReqID, 'EQUIP'),
                ItemDetail.levelSkillDetail(incinerateLevel, 17, 'INCINERATE'),
            ]),
            essenceValue: EssenceValue(incinerateLevel, 3 * tier, [ShardCatalog.AIR(28 * tier), ShardCatalog.EARTH(30 * tier), ShardCatalog.NATURE(8 * tier), ShardCatalog.FORCE(44 * tier)]),
            spriteIndex: spriteIndex,
            combatStyle: Combat.CombatStyle.RANGE,
            attackRange: 7,
            attackCooldown: 6,
            equipmentStats: equipmentStats,
            model: {
                LEFT_TOOL: {
                    id: 'LEFT_TOOL',
                    asset: 'heldParts',
                    sprite: 'shield',
                    parent: 'LEFT_SHOULDER',
                    spriteID: tier,
                    anchor: { x: 0.5, y: 0.5 },
                    position: { x: 0, y: 1.0 },
                    rotation: -90 / 180 * Math.PI,
                    UIModel: null,
                    z: 20,
                },
            },
            actions: [{
                interfaceID: 5,
                id: 5,
                name: 'Equip',
                steps: [
                    [buildStep(StepType.HAS_SKILL_LEVEL, { params: [levelReqID, levelRequirement] }),
                    buildStep(StepType.PLAY_ANIMATION, { params: ['EQUIP_LEFT_SHOULDER_BACK'] }),
                    buildStep(StepType.GIVE_EQUIPMENT_ITEM, { params: [2, 'ITEM_ID', 'ITEM_STATE'] })]
                ]
            }],
        };
    },
    GolemFragment: (id, name, value, description, craftSkillLevel, craftXP, necklaceCraftID, incinerateLevel, shardCatalogArray, spriteIndex) => {
        let carbon = Math.floor(value * 0.85);
        let obj = {
            id,
            name,
            noted: false,
            value,
            stackable: true,
            description,
            requirements: ItemDetail.build([
                ItemDetail.levelSkillDetail(incinerateLevel, 17, 'INCINERATE'),
                ItemDetail.levelSkillDetail(craftSkillLevel, 15, 'CRAFT'),
            ]),
            useActions: [{
                interfaceID: 5,
                id: 9,
                name: '',
                entityType: Entity.EntityType.INVENTORY_ITEM,
                entityID: 92,
                actionInterval: 0,
                steps: [
                    [buildStep(StepType.HAS_SKILL_LEVEL, { params: [15, craftSkillLevel] }),
                    buildStep(StepType.HAS_INVENTORY_ITEM, { params: [id, 1] }),
                    buildStep(StepType.HAS_INVENTORY_ITEM, { params: [92, 1] }),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, { params: [92, 1] }),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, { params: [id, 1] }),
                    buildStep(StepType.GIVE_XP, { params: [15, craftXP] }),
                    buildStep(StepType.GIVE_INVENTORY_ITEM, { params: [necklaceCraftID, 1] })]
                ],
            }],
            spriteIndex,
            essenceValue: EssenceValue(incinerateLevel, carbon, shardCatalogArray),
        }
        return obj;
    },
    GolemFragmentNecklace: (id, name, notedID, value, description, incinerateLevel, shardCatalogArray, spriteIndex, modelSpriteID) => {
        let carbon = Math.floor(0.85 * value);
        let obj = {
            id,
            name,
            noted: false,
            notedID,
            value,
            stackable: false,
            rollDropRateMultiplier: () => {
                return Math.random() * 1 <= 1;
            },
            equipmentStats: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            description: description,
            requirements: ItemDetail.build([
                ItemDetail.levelSkillDetail(incinerateLevel, 17, 'INCINERATE'),
            ]),
            spriteIndex,
            essenceValue: EssenceValue(incinerateLevel, carbon, shardCatalogArray),
            model: {
                NECK_WORN: {
                    id: 'NECK_WORN',
                    asset: 'neckParts',
                    sprite: 'necklaceMineFragment',
                    parent: 'HEAD',
                    spriteID: modelSpriteID,
                    anchor: { x: 0.525, y: 0.2 },
                    position: { x: 0, y: 0.3 },
                    rotation: 0,
                    UIModel: null,
                    z: -1,
                },
            },
            actions: [{
                interfaceID: 5,
                id: 3,
                name: 'Equip',
                steps: [
                    [
                        buildStep(StepType.PLAY_ANIMATION, { params: ['EQUIP_NECKLACE'] }),
                        buildStep(StepType.GIVE_EQUIPMENT_ITEM, { params: [6, 'ITEM_ID', 'ITEM_STATE'] })
                    ]
                ]
            }],
        };
        return obj;
    },
    GolemChunk: (id, name, value, description, craftSkillLevel, craftXP, necklaceCraftID, incinerateLevel, shardCatalogArray, spriteIndex) => {
        let carbon = Math.floor(value * 0.85);
        let obj = {
            id,
            name,
            noted: false,
            value,
            stackable: true,
            description,
            requirements: ItemDetail.build([
                ItemDetail.levelSkillDetail(incinerateLevel, 17, 'INCINERATE'),
                ItemDetail.levelSkillDetail(craftSkillLevel, 15, 'CRAFT'),
            ]),
            useActions: [{
                interfaceID: 5,
                id: 9,
                name: '',
                entityType: Entity.EntityType.INVENTORY_ITEM,
                entityID: 92,
                actionInterval: 0,
                steps: [
                    [buildStep(StepType.HAS_SKILL_LEVEL, { params: [15, craftSkillLevel] }),
                    buildStep(StepType.HAS_INVENTORY_ITEM, { params: [id, 1] }),
                    buildStep(StepType.HAS_INVENTORY_ITEM, { params: [92, 1] }),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, { params: [92, 1] }),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, { params: [id, 1] }),
                    buildStep(StepType.GIVE_XP, { params: [15, craftXP] }),
                    buildStep(StepType.GIVE_INVENTORY_ITEM, { params: [necklaceCraftID, 1] })]
                ],
            }],
            spriteIndex,
            essenceValue: EssenceValue(incinerateLevel, carbon, shardCatalogArray),
        };
        return obj;
    },
    GolemChunkNecklace: (id, name, notedID, value, description, incinerateLevel, shardCatalogArray, spriteIndex, modelSpriteID) => {
        let carbon = Math.floor(value * 0.85);
        let obj = {
            id,
            name,
            noted: false,
            notedID,
            value,
            stackable: false,
            rollResourceDepletionSkipChance: () => {
                return Math.random() * 10 <= 1; //10%
            },
            equipmentStats: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            description,
            requirements: ItemDetail.build([
                ItemDetail.levelSkillDetail(incinerateLevel, 17, 'INCINERATE'),
            ]),
            spriteIndex,
            essenceValue: EssenceValue(incinerateLevel, carbon, shardCatalogArray),
            model: {
                NECK_WORN: {
                    id: 'NECK_WORN',
                    asset: 'neckParts',
                    sprite: 'necklaceMineChunk',
                    parent: 'HEAD',
                    spriteID: modelSpriteID,
                    anchor: { x: 0.525, y: 0.2 },
                    position: { x: 0, y: 0.3 },
                    rotation: 0,
                    UIModel: null,
                    z: -1,
                },
            },
            actions: [{
                interfaceID: 5,
                id: 3,
                name: 'Equip',
                steps: [
                    [
                        buildStep(StepType.PLAY_ANIMATION, { params: ['EQUIP_NECKLACE'] }),
                        buildStep(StepType.GIVE_EQUIPMENT_ITEM, { params: [6, 'ITEM_ID', 'ITEM_STATE'] })]
                ]
            }],
        };
        return obj;
    },
    TeleportPot: (id, name, value, description, envMagicLevel, incinerateLevel, carbon, xp, spellID, spriteIndex) => {
        let spellDef = Spells.Spells[spellID];
        let obj = {
            id,
            name,
            noted: false,
            value,
            stackable: true,
            description,
            requirements: ItemDetail.build([
                ItemDetail.levelSkillDetail(envMagicLevel, 22, 'USE'),
                ItemDetail.levelSkillDetail(incinerateLevel, 17, 'INCINERATE'),
            ]),
            essenceValue: EssenceValue(incinerateLevel, carbon, [ShardCatalog.VOID(80), ShardCatalog.AIR(270),]),
            spriteIndex,
            actions: [{
                interfaceID: 5,
                id: 17,
                steps: [
                    [buildStep(StepType.SEND_CLIENT_MESSAGE, { params: ['You break the teleport spell around you...'] }),
                    buildStep(StepType.HAS_INVENTORY_ITEM, { params: [id, 1] }),
                    buildStep(StepType.HAS_SKILL_LEVEL, { params: [22, envMagicLevel] }),
                    buildStep(StepType.IS_TIMER_EXPIRED, { params: [11] }),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, { params: [id, 1] }),
                    buildStep(StepType.GIVE_XP, { params: [22, xp] }),
                    buildStep(StepType.TELEPORT, { params: spellDef.teleportParams })]
                ],
            }],
        };
        return obj;
    },
    Dye : function(id, notedId, name, value, spriteIndex, dyeNo){
        return {
            id: id,
            name: name,
            noted: false,
            notedID: notedId,
            value: value,
            cannotRedirectTome: true,
            stackable: false,
            description: 'Appears to dye things.',
            requirements: ItemDetail.build([
                ItemDetail.levelSkillDetail(4, 17, 'INCINERATE'),
            ]),
            essenceValue: EssenceValue(4, 8, [ShardCatalog.AIR(5), ShardCatalog.WATER(5), ShardCatalog.EARTH(5), ShardCatalog.NATURE(2), ShardCatalog.BIND(5)]),
            spriteIndex: spriteIndex,
            actions: [{
                interfaceID: 5,
                id: 26,
                name: 'Dye Hair',
                flags: [],
                actionInterval: 1,
                steps: [
                    [buildStep(StepType.CHANGE_APPEARANCE, {params: [-1, -1, dyeNo]})]
                ],
            }],
        };
    },
    Scissors : function(id, notedId, fullName, value, spriteIndex) {
        return {
            id: id,
            name: fullName,
            noted: false,
            notedID: notedId,
            value: value,
            stackable: false,
            description: 'These appear to cut things.',
            requirements: ItemDetail.build([
                ItemDetail.levelSkillDetail(7, 17, 'INCINERATE'),
            ]),
            essenceValue: EssenceValue(4, 8, [ShardCatalog.AIR(5), ShardCatalog.WATER(5), ShardCatalog.EARTH(5), ShardCatalog.NATURE(2), ShardCatalog.SHARP(1)]),
            spriteIndex: spriteIndex,
            actions: [{
                interfaceID: 5,
                id: 25,
                name: 'Style Hair',
                flags: [],
                actionInterval: 1,
                steps: [
                    [buildStep(StepType.OPEN_ACTION_MENU_INTERFACE, { params: [[196, 197, 198, 199]] })]
                ],
            }],
        };
    },
    TutorialTeleport : function(id) {
        return {
            id: id,
            name: 'Fiewon Teleport',
            noted: false,
            value: 45,
            stackable: true,
            cannotRedirectTome: true,
            description: 'A teleport spell to the starter town, Fiewon.',
            requirements: ItemDetail.build([
                ItemDetail.levelSkillDetail('1', 22, 'USE'), //level 10, not 1
                ItemDetail.levelSkillDetail(56, 17, 'INCINERATE'),
            ]),
            essenceValue: EssenceValue(56, 18, [ShardCatalog.VOID(80), ShardCatalog.AIR(270),]),
            spriteIndex: 128,
            actions: [{
                interfaceID: 5,
                id: 17,
                steps: [
                    [buildStep(StepType.SEND_CLIENT_MESSAGE, { params: ['You break the teleport spell around you...'] }),
                    buildStep(StepType.HAS_INVENTORY_ITEM, { params: [id, 1] }),
                    buildStep(StepType.HAS_SKILL_LEVEL, { params: [22, 1] }), //level 10, not 1
                    buildStep(StepType.IS_TIMER_EXPIRED, { params: [11] }),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, { params: [id, 1] }),
                    buildStep(StepType.GIVE_XP, { params: [22, 25] }),
                    buildStep(StepType.TELEPORT, { params: [0, 31, 22, 32, 23, 3, 
                        [[buildStep(StepType.SET_CHARACTER_STATE, {params: [4, 7]} ),
                        buildStep(StepType.SHOW_DIALOG, {
                            params: [21],
                            stepResultPass: 'END_ACTION',
                            stepResultFail: 'END_ACTION',
                        })]]
                    ]}),
                    ],
                ],
            }],
        };
    },
    RawCoockableFood: function(id, notedId, fullName, value, spriteIndex, description, cookingLevel, essenceValue, stackable = false) {
        let item = this.Item(id, notedId, fullName, value, spriteIndex, description, essenceValue, stackable);
        item.requirements = ItemDetail.build([
            ItemDetail.levelSkillDetail(cookingLevel, 13, 'CRAFT'),
            ItemDetail.levelSkillDetail(essenceValue.burnLevel, 17, 'INCINERATE'),
        ]);
        return item;
    },
    Pan: function(id) {
        let pan = Get.Item.Item(id, null, 'Pan', 2, 501, 'Put dough inside and bake some goods.', EssenceValue(5, 2, [ShardCatalog.EARTH(10)]), true );

        pan.actions = [{
            interfaceID: 5,
            id: 34,
            name: 'Prepare Dish With',
            steps : [
                [buildStep(StepType.OPEN_ACTION_MENU_INTERFACE, { params: [[264, 263, 265]] })]
            ]
        }];

        return pan;
    },
    RawFish: function(id, notedID, fishName, value, fishingLevelEstimate, cookingLevel, incinerationLevel, spriteIndex, essenceValue) {
        let nameLowerCase = fishName.toLowerCase();
        return {
            id,
            name: 'Raw ' + fishName,
            noted: false,
            notedID,
            value: value,
            stackable: false,
            description: 'A raw ' + nameLowerCase + '.',
            requirements: ItemDetail.build([
                ItemDetail.levelSkillDetail(fishingLevelEstimate, 12, 'GATHER'),
                ItemDetail.levelSkillDetail(cookingLevel, 13, 'CRAFT'),
                ItemDetail.levelSkillDetail(essenceValue.burnLevel, 17, 'INCINERATE'),
            ]),
            spriteIndex,
            essenceValue
        };
    },
    Fish: function(id, notedID, name, value, spriteIndex, amountHealed, cookingLevel, incinerationLevel, essenceValue) {
        return  {
            id,
            name,
            noted: false,
            notedID,
            value,
            stackable: false,
            description: 'A cooked ' + name.toLowerCase() + '. Heals ' + amountHealed + ' hitpoints.',
            requirements: ItemDetail.build([
                ItemDetail.levelSkillDetail(cookingLevel, 13, 'CRAFT'),
                ItemDetail.levelSkillDetail(essenceValue.burnLevel, 17, 'INCINERATE'),
            ]),
            spriteIndex,
            essenceValue,
            actions: [{
                actionInterval: 0,
                interfaceID: 5,
                id: 18,
                name: 'Eat',
                steps: [
                    [buildStep(StepType.HAS_INVENTORY_ITEM, { params: [id, 1] }),
                    buildStep(StepType.IS_TIMER_EXPIRED, { params: [8] }),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, { params: [id, 1] }),
                    buildStep(StepType.EAT_FOOD, { params: [amountHealed] })]
                ],
            }],
        };
    }
};

const Interface = {
    Recipe: (id, recipe, extraSteplist = null) => {
        let steps = [
            CreateStepListFromRecipe(recipe)
        ];
        if (extraSteplist) {
            steps.push(extraSteplist);
        }
        return {
            id,
            name: recipe.name,
            flags: ['REPEAT_ACTION'],
            actionInterval: 1,
            steps: steps,
        };
    },
    MixSpellPot: (id, name, nameDetail, skillID, skillLevel, xp, spellID, mixPotID) => {
        let spellDef = Spells.Spells[spellID];
        let steps = [[], []];
        steps[0].push(buildStep(StepType.IS_SPELL_UNLOCKED, {
            params: [spellID],
            stepResultPass: StepResult.NEXT_STEP_LIST,
            stepResultFail: StepResult.NEXT_STEP,
        }));
        steps[0].push(buildStep(StepType.SEND_CLIENT_MESSAGE, {
            params: ['You must have the ' + name + ' spell unlocked to mix this.'],
            stepResultPass: StepResult.END_ACTION,
            stepResultFail: StepResult.END_ACTION,
        }));
        for (let i = 0; i < spellDef.essenceRequirement.length; ++i) {
            let ess = spellDef.essenceRequirement[i];
            steps[1].push(buildStep(StepType.HAS_INVENTORY_ITEM, {params: [ess[0], ess[1]]}));
        }
        steps[1].push(buildStep(StepType.HAS_INVENTORY_ITEM, {params: [82, 1]}));
        steps[1].push(buildStep(StepType.HAS_SKILL_LEVEL, {params: [skillID, skillLevel]}));
        steps[1].push(buildStep(StepType.HAS_INVENTORY_SPACE, {params: [mixPotID, 1]}));
        for (let i = 0; i < spellDef.essenceRequirement.length; ++i) {
            let ess = spellDef.essenceRequirement[i];
            steps[1].push(buildStep(StepType.REMOVE_INVENTORY_ITEM, {params: [ess[0], ess[1]]}));
        }
        steps[1].push(buildStep(StepType.REMOVE_INVENTORY_ITEM, {params: [82, 1]}));
        steps[1].push(buildStep(StepType.GIVE_INVENTORY_ITEM, {params: [mixPotID, 1]}));
        steps[1].push(buildStep(StepType.GIVE_XP, {params: [skillID, xp]}));
        steps[1].push(buildStep(StepType.SEND_CLIENT_MESSAGE, {params: ['You make a ' + name + ' spell pot.']}));
        steps[1].push(buildStep(StepType.PLAY_SOUND, {params: [33]}));
        return {
            id,
            name: 'Mix ' + name + nameDetail,
            flags: ['REPEAT_ACTION'],
            actionInterval: 1,
            steps: steps,
        };
    },
        BuildFishingPool: function (id, name, logsId, fishingLevel, constructionLevel, constructionObject, xp, campName) {
            return {
                id: id,
                name: name,
                actionInterval: 0,
                steps: [
                    [buildStep(StepType.HAS_INVENTORY_ITEM, { params: [logsId, 5] }),
                    buildStep(StepType.HAS_INVENTORY_ITEM, { params: [117, 1] }),
                    buildStep(StepType.HAS_INVENTORY_ITEM, { params: [118, 1] }),
                    buildStep(StepType.HAS_SKILL_LEVEL, { params: [18, constructionLevel] }),
                    buildStep(StepType.HAS_SKILL_LEVEL, { params: [12, fishingLevel] }),
                    buildStep(StepType.CREATE_CONSTRUCTION_OBJECT, {
                        params: [constructionObject],
                        stepResultFail: StepResult.END_ACTION,
                        stepResultPass: 'NEXT_STEP_LIST'
                    })],
                    [buildStep(StepType.REMOVE_INVENTORY_ITEM, { params: [logsId, 5] }),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, { params: [117, 1] }),
                    buildStep(StepType.GIVE_XP, { params: [18, xp] }),
                    buildStep(StepType.SEND_CLIENT_MESSAGE, { params: ['You build a ' + campName + '.'] })]
                ],
            };
        },
        Fletch: function (id, name, itemId, itemAmount, levelRequired, itemIdRewarded, amountRewarded, xp, endText) {
            return {
                id: id,
                name: name,
                flags: ['REPEAT_ACTION'],
                actionInterval: 2,
                steps: [
                    [buildStep(StepType.HAS_INVENTORY_ITEM, { params: [itemId, itemAmount] }),
                    buildStep(StepType.HAS_SKILL_LEVEL, { params: [16, levelRequired] }),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, { params: [itemId, itemAmount] }),
                    buildStep(StepType.PLAY_ANIMATION, { params: ['FLETCH'] }),
                    buildStep(StepType.GIVE_INVENTORY_ITEM, { params: [itemIdRewarded, amountRewarded] }),
                    buildStep(StepType.GIVE_XP, { params: [16, xp] }),
                    buildStep(StepType.SEND_CLIENT_MESSAGE, { params: [endText] }),
                    buildStep(StepType.PLAY_SOUND, { params: [32] })]
                ],
            }
        },
        BuyMaxLevelStandard: (id, name, standardItemID, skillID) => {
            let cost = 100000; //coins
            return {
                id,
                name,
                actionInterval: -1,
                steps: [
                    [buildStep(StepType.HAS_INVENTORY_ITEM, { params: [0, cost] }),
                    buildStep(StepType.HAS_SKILL_LEVEL, { params: [skillID, 100] }),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, { params: [0, cost] }),
                    buildStep(StepType.GIVE_INVENTORY_ITEM, { params: [standardItemID, 1] }),
                    buildStep(StepType.SEND_CLIENT_MESSAGE, { params: ['You pay the high price for the fancy standard.'] })],
                ],
            };
        },
        FletchIncinerate: function (id, name, itemId, itemAmount, levelRequired, itemIdRewarded, amountRewarded, xp, endText) {
            let fl = this.Fletch(id, name, itemId, itemAmount, levelRequired, itemIdRewarded, amountRewarded, xp, endText);
            fl.steps[0].push(buildStep(StepType.INCINERATE_ITEM, { params: [itemIdRewarded] }));
            return fl;
        },
        SmeltBar: function (id, fullName, barName, requiredLevel, requiredOreId, barId, xp, optionalCoalAmount, oreAmount = 2) {
            if (optionalCoalAmount == null || optionalCoalAmount == 0) {
                return {
                    id: id,
                    name: fullName,
                    flags: ['REPEAT_ACTION'],
                    actionInterval: 3,
                    steps: [
                        [buildStep(StepType.UPGRADE_ACTION_INTERVAL),
                        buildStep(StepType.HAS_INVENTORY_ITEM, { params: [requiredOreId, oreAmount] }),
                        buildStep(StepType.HAS_SKILL_LEVEL, { params: [14, requiredLevel] }),
                        buildStep(StepType.REMOVE_INVENTORY_ITEM, { params: [requiredOreId, oreAmount] }),
                        buildStep(StepType.GIVE_INVENTORY_ITEM, { params: [barId, 1] }),
                        buildStep(StepType.GIVE_XP, { params: [14, xp] }),
                        buildStep(StepType.PLAY_ANIMATION, { params: ['SMELT'] }),
                        buildStep(StepType.MAP_ACTION_PARAMETER, { params: ['XP_MULTIPLIER', 0] }),
                        buildStep(StepType.DEPLETE_WORLD_OBJECT_USES, {
                            params: [1],
                            stepResultPass: StepResult.NEXT_STEP,
                            stepResultFail: StepResult.NEXT_STEP,
                        }),
                        buildStep(StepType.SEND_CLIENT_MESSAGE, { params: ['You smelt a ' + barName + '.'] }),
                        buildStep(StepType.PLAY_SOUND, { params: [42] })]
                    ],
                };
            } else {
                return {
                    id: id,
                    name: fullName,
                    flags: ['REPEAT_ACTION'],
                    actionInterval: 3,
                    steps: [
                        [buildStep(StepType.UPGRADE_ACTION_INTERVAL),
                        buildStep(StepType.HAS_INVENTORY_ITEM, { params: [requiredOreId, oreAmount] }),
                        buildStep(StepType.HAS_INVENTORY_ITEM, { params: [57, optionalCoalAmount] }),
                        buildStep(StepType.HAS_SKILL_LEVEL, { params: [14, requiredLevel] }),
                        buildStep(StepType.REMOVE_INVENTORY_ITEM, { params: [requiredOreId, oreAmount] }),
                        buildStep(StepType.REMOVE_INVENTORY_ITEM, { params: [57, optionalCoalAmount] }),
                        buildStep(StepType.GIVE_INVENTORY_ITEM, { params: [barId, 1] }),
                        buildStep(StepType.GIVE_XP, { params: [14, xp] }),
                        buildStep(StepType.SEND_CLIENT_MESSAGE, { params: ['You smelt a ' + barName + '.'] }),
                        buildStep(StepType.PLAY_SOUND, { params: [42] })]
                    ],
                };
            }
        },
        Smith: function (id, fullName, toolName, barId, barAmount, xpAwarded, smithedItemId, minSmithingLevel, actionInterval, amountOfSmithedItem) {
            if (!amountOfSmithedItem) {
                amountOfSmithedItem = 1;
            }
            return {
                id: id,
                name: fullName,
                flags: ['REPEAT_ACTION'],
                actionInterval: actionInterval,
                steps: [
                    [buildStep(StepType.HAS_INVENTORY_ITEM, { params: [63, 1] }),
                    buildStep(StepType.HAS_INVENTORY_ITEM, { params: [barId, barAmount] }),
                    buildStep(StepType.HAS_SKILL_LEVEL, { params: [14, minSmithingLevel] }),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, { params: [barId, barAmount] }),
                    buildStep(StepType.PLAY_ANIMATION, { params: ['STRIKE_ANVIL'] }),
                    buildStep(StepType.GIVE_INVENTORY_ITEM, { params: [smithedItemId, amountOfSmithedItem] }),
                    buildStep(StepType.GIVE_XP, { params: [14, xpAwarded] }),
                    buildStep(StepType.SEND_CLIENT_MESSAGE, { params: ['You smith ' + (amountOfSmithedItem == 1 ? 'a' : amountOfSmithedItem) + ' ' + toolName + '.'] }),
                    buildStep(StepType.PLAY_SOUND, { params: [28] })]
                ],
            };
        },
        BuildLumberCamp: function (id, name, reqLogId, reqAxeId, reqWcLevel, reqConstructionLevel, constructionObjectId, xp, campName) {
            return {
                id: id,
                name: name,
                flags: [],
                actionInterval: 0,
                steps: [
                    [buildStep(StepType.HAS_INVENTORY_ITEM, { params: [reqLogId, 5] }), // logs
                    buildStep(StepType.HAS_INVENTORY_ITEM, { params: [reqAxeId, 1] }), // axe
                    buildStep(StepType.HAS_INVENTORY_ITEM, { params: [118, 1] }), //saw
                    buildStep(StepType.HAS_SKILL_LEVEL, { params: [18, reqConstructionLevel] }),
                    buildStep(StepType.HAS_SKILL_LEVEL, { params: [9, reqWcLevel] }),
                    buildStep(StepType.CREATE_CONSTRUCTION_OBJECT, {
                        params: [constructionObjectId],
                        stepResultFail: StepResult.END_ACTION,
                        stepResultPass: 'NEXT_STEP_LIST'
                    })],
                    [buildStep(StepType.REMOVE_INVENTORY_ITEM, { params: [reqLogId, 5] }),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, { params: [reqAxeId, 1] }),
                    buildStep(StepType.GIVE_XP, { params: [18, xp] }),
                    buildStep(StepType.SEND_CLIENT_MESSAGE, { params: ['You build a ' + campName + '.'] })]
                ],
            };
        },
        BuildMarketStall: function (id, name, reqLogId, reqBarID, reqConstructionLevel, constructionObjectId, xp) {
            return {
                id,
                name,
                flags: [],
                actionInterval: 0,
                steps: [
                    [buildStep(StepType.HAS_INVENTORY_ITEM, { params: [reqLogId, 5] }), // logs
                    buildStep(StepType.HAS_INVENTORY_ITEM, { params: [reqBarID, 2] }), // bars
                    buildStep(StepType.HAS_INVENTORY_ITEM, { params: [118, 1] }), //saw
                    buildStep(StepType.HAS_SKILL_LEVEL, { params: [18, reqConstructionLevel] }),
                    buildStep(StepType.CREATE_CONSTRUCTION_OBJECT, {
                        params: [constructionObjectId],
                        stepResultFail: StepResult.END_ACTION,
                        stepResultPass: 'NEXT_STEP_LIST'
                    })],
                    [buildStep(StepType.REMOVE_INVENTORY_ITEM, { params: [reqLogId, 5] }),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, { params: [reqBarID, 2] }),
                    buildStep(StepType.GIVE_XP, { params: [18, xp] }),
                    buildStep(StepType.SEND_CLIENT_MESSAGE, { params: ['You build a market stall.'] })]
                ],
            };
        },
        BuildMiningCamp: function (id, name, reqLogId, reqPickaxeId, reqMiningLevel, reqConstructionLevel, constructionObjectId, xp, campName) {
            return {
                id: id,
                name: name,
                flags: [],
                actionInterval: 0,
                steps: [
                    [buildStep(StepType.HAS_INVENTORY_ITEM, { params: [reqLogId, 5] }),
                    buildStep(StepType.HAS_INVENTORY_ITEM, { params: [reqPickaxeId, 1] }),
                    buildStep(StepType.HAS_INVENTORY_ITEM, { params: [118, 1] }),
                    buildStep(StepType.HAS_SKILL_LEVEL, { params: [18, reqConstructionLevel] }),
                    buildStep(StepType.HAS_SKILL_LEVEL, { params: [10, reqMiningLevel] }),
                    buildStep(StepType.CREATE_CONSTRUCTION_OBJECT, {
                        params: [constructionObjectId],
                        stepResultFail: StepResult.END_ACTION,
                        stepResultPass: 'NEXT_STEP_LIST'
                    })],
                    [buildStep(StepType.REMOVE_INVENTORY_ITEM, { params: [reqLogId, 5] }),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, { params: [reqPickaxeId, 1] }),
                    buildStep(StepType.GIVE_XP, { params: [18, xp] }),
                    buildStep(StepType.SEND_CLIENT_MESSAGE, { params: ['You build a ' + campName + '.'] })]
                ],
            };
        },
        BuildTrainingDummy(id, name, reqLogId, reqPlatebodyId, reqCombatLvl, reqConstructionLevel, constructionObjectId, xp, campName) {
            return {
                id: id,
                name: name,
                flags: [],
                actionInterval: 0,
                steps: [
                    [buildStep(StepType.HAS_INVENTORY_ITEM, { params: [reqLogId, 5] }),
                    buildStep(StepType.HAS_INVENTORY_ITEM, { params: [reqPlatebodyId, 1] }),
                    buildStep(StepType.HAS_INVENTORY_ITEM, { params: [118, 1] }),
                    buildStep(StepType.HAS_SKILL_LEVEL, { params: [18, reqConstructionLevel] }),
                    buildStep(StepType.HAS_COMBAT_LEVEL, { params: [reqCombatLvl] }),
                    buildStep(StepType.CREATE_CONSTRUCTION_OBJECT, {
                        params: [constructionObjectId],
                        stepResultFail: StepResult.END_ACTION,
                        stepResultPass: 'NEXT_STEP_LIST'
                    })],
                    [buildStep(StepType.REMOVE_INVENTORY_ITEM, { params: [reqLogId, 5] }),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, { params: [reqPlatebodyId, 1] }),
                    buildStep(StepType.GIVE_XP, { params: [18, xp] }),
                    buildStep(StepType.SEND_CLIENT_MESSAGE, { params: ['You build a ' + campName + '.'] })]
                ],
            };
        },
        RepairBag(id, name, clothID, skillLevel, tier) {
            return {
                id,
                name,
                flags: ['REPEAT_ACTION'],
                actionInterval: 2,
                steps: [
                    [buildStep(StepType.HAS_INVENTORY_ITEM, { params: [clothID, 1] }),
                    buildStep(StepType.HAS_INVENTORY_ITEM, { params: [92, 1] }),
                    buildStep(StepType.HAS_INVENTORY_ITEM, { params: [91, 1] }),
                    buildStep(StepType.HAS_SKILL_LEVEL, { params: [15, skillLevel] }),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, { params: [clothID, 1] }),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, { params: [92, 1] }),
                    buildStep(StepType.GIVE_XP, { params: [15, 20 * tier] }),
                    buildStep(StepType.REPAIR_BAG, { params: [clothID] })]
                ],
            };
        },
        UpgradeBag(id, name, clothID, skillLevel, tier) {
            return {
                id,
                name,
                flags: ['REPEAT_ACTION'],
                actionInterval: 3,
                steps: [
                    [buildStep(StepType.HAS_INVENTORY_ITEM, { params: [clothID, 1] }),
                    buildStep(StepType.HAS_INVENTORY_ITEM, { params: [92, 1] }),
                    buildStep(StepType.HAS_INVENTORY_ITEM, { params: [91, 1] }),
                    buildStep(StepType.HAS_SKILL_LEVEL, { params: [15, skillLevel] }),
                    buildStep(StepType.INCREASE_BAG_SIZE, { params: [clothID] }),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, { params: [clothID, 1] }),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, { params: [92, 1] }),
                    buildStep(StepType.GIVE_XP, { params: [15, 20 * tier] })]
                ],
            };
        },
        ShowDialog(id, dialogID) {
            return {
                id,
                name: 'Show Dialog',
                actionInterval: -1,
                steps: [
                    [buildStep(StepType.OPEN_DIALOG_INTERFACE),
                    buildStep(StepType.SHOW_DIALOG, { params: [dialogID] })]
                ],
            };
        },
        TalkTo(id, dialogID) {
            return {
                id,
                name: 'Talk To',
                actionInterval: -1,
                steps: [
                    [buildStepList(StepList.WALK_ADJACENT)],
                    [buildStep(StepType.PLAY_ANIMATION, {params: ['TALK_TO']}),
                    buildStep(StepType.OPEN_DIALOG_INTERFACE),
                    buildStep(StepType.SHOW_DIALOG, { params: [dialogID] })]
                ],
            };
        },
        StyleHair(id, name, hairSpriteIndex, hairColorIndex, cost = 0) {
            return {
                id,
                name,
                flags: [],
                actionInterval: 1,
                steps: [
                    [
                        buildStep(StepType.CHANGE_APPEARANCE, {params: [-1, hairSpriteIndex, hairColorIndex]})
                    ]
                ],
            };
        },
        DyeHair(id, name, hairDyeIndex) {
            return {
                id,
                name,
                flags: [],
                actionInterval: 1,
                steps: [
                    [
                        buildStep(StepType.CHANGE_APPEARANCE, {params: [-1, -1, hairDyeIndex]})
                    ]
                ],
            };
        },
        AskNPCQuestion(id, question, answerDialogID) {
            return {
                id,
                name: question,
                actionInterval: -1,
                steps: [
                    [buildStep(StepType.SHOW_DEFAULT_INTERFACES),
                    buildStep(StepType.OPEN_DIALOG_INTERFACE),
                    buildStep(StepType.SHOW_DIALOG, { params: [answerDialogID] })]
                ],
            };
        },
        PurchaseBankSlots(id, amountToPurchase) {
            return {
                id: id,
                name: 'Buy another storage space: ',
                actionInterval: -1,
                steps: [
                    [buildStep(StepType.BUY_STORAGE_SPACE, {params : [amountToPurchase]})],
                ],
            };
        },
        MillXIntoY: function(id, xItemId, amountOfX, bucketOfYId, xp, title, clientMessage) { // 744
            let emptyBucketId = 744;
            return {
                id,
                name: title,
                flags: ['REPEAT_ACTION'],
                actionInterval: 4,
                steps: [
                    [buildStep(StepType.HAS_INVENTORY_ITEM, {params: [xItemId, amountOfX]}),
                    buildStep(StepType.HAS_INVENTORY_ITEM, {params: [emptyBucketId, 1]}),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, {params: [xItemId, amountOfX]}),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, {params: [emptyBucketId, 1]}),
                    buildStep(StepType.GIVE_INVENTORY_ITEM, {params: [bucketOfYId, 1]}),
                    buildStep(StepType.GIVE_XP, {params: [13, xp]}),
                    buildStep(StepType.PLAY_ANIMATION, { params: ['ACTION_BOTHHANDS'] }),
                    buildStep(StepType.SEND_CLIENT_MESSAGE, {params: [clientMessage]}),
                    buildStep(StepType.PLAY_SOUND, {params: [29]})]
                ],
            };
        },
        SpinXIntoY : function(id, xItemId, xItemAmount, yItemId, yItemAmount, skillID, skillLevelRequired, xp, xName, yName, actionInterval = 4) {
            return {
                id: id,
                name: 'Spin ' + xItemAmount + ' ' + xName + ' into ' + yName,
                flags: ['REPEAT_ACTION'],
                actionInterval,
                steps: [
                    [buildStep(StepType.HAS_INVENTORY_ITEM, {params: [xItemId, xItemAmount]}),
                    buildStep(StepType.HAS_SKILL_LEVEL, {params: [skillID, skillLevelRequired]}),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, {params: [xItemId, xItemAmount]}),
                    buildStep(StepType.GIVE_INVENTORY_ITEM, {params: [yItemId, yItemAmount]}),
                    buildStep(StepType.GIVE_XP, {params: [skillID, xp]}),
                    buildStep(StepType.PLAY_ANIMATION, { params: ['ACTION_BOTHHANDS'] }),
                    buildStep(StepType.SEND_CLIENT_MESSAGE, {params: ['You turned ' + xName + ' into ' + yName + '.']}),
                    buildStep(StepType.PLAY_SOUND, {params: [29]})]
                ],
            };
        }
    }

const Action = {
        BuildWithSaw: function (id, entityId, openActionMenuInterfaceParams) {
            return {
                interfaceID: 5,
                id: id,
                name: 'Build',
                entityType: Entity.EntityType.INVENTORY_ITEM,
                entityID: entityId,
                actionInterval: 0,
                steps: [
                    [buildStep(StepType.OPEN_ACTION_MENU_INTERFACE, { params: [openActionMenuInterfaceParams] })]
                ],
            };
        },
        LightFire: function (id, logId, requiredLevel, baseRollSuccessChancehance, minAshes, maxAshes, xp) {
            return {
                interfaceID: 5,
                id: id,
                name: '',
                entityType: Entity.EntityType.INVENTORY_ITEM,
                entityID: logId,
                actionInterval: 2,
                steps: [
                    [buildStep(StepType.SEND_CLIENT_MESSAGE, { params: ['You attempt to light a fire...'] })],
                    [buildStep(StepType.HAS_INVENTORY_ITEM, { params: [46, 1] }),
                    buildStep(StepType.HAS_INVENTORY_ITEM, { params: [logId, 1] }),
                    buildStep(StepType.HAS_SKILL_LEVEL, { params: [17, requiredLevel] }),
                    buildStep(StepType.PLAY_ANIMATION, { params: ['LIGHT_FIRE'] }),
                    buildStep(StepType.ROLL_SKILL_SUCCESS, {
                        params: [17, baseRollSuccessChancehance, 1, false, 0.5, 0.5],
                        stepResultFail: 'NEXT_STEP',
                        stepResultPass: 'NEXT_STEP_LIST',
                    }),
                    buildStep(StepType.PLAY_SOUND, {
                        params: [25],
                        stepResultPass: StepResult.END_AND_REPEAT_STEP_LIST
                    })],
                    [buildStep(StepType.REMOVE_INVENTORY_ITEM, { params: [46, 1] }),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, { params: [logId, 1] }),
                    buildStep(StepType.CREATE_CAMP_FIRE, { params: [minAshes, maxAshes] }),
                    buildStep(StepType.GIVE_XP, { params: [17, xp] }),
                    buildStep(StepType.PLAY_SOUND, { params: [24] }),
                    buildStep(StepType.SEND_CLIENT_MESSAGE, {
                        params: ['You light a fire.'],
                        stepResultPass: StepResult.END_AND_GOTO_LIST_2
                    })],
                ],
            };
        },
        Cook: function (id, rawItemId, cookedItemId, burntItemId, cookingLevelRequired, itemName, minSuccessRate, maxSuccessRate, xp, cookTickRate = 4, returnedCookingDishID = -1) {
            let steps = [
                buildStepList(StepList.WALK_ADJACENT),
                [buildStep(StepType.SET_ACTION_INTERVAL, { 
                    params: [cookTickRate],
                    stepResultPass: StepResult.END_AND_GOTO_LIST_3,
                })],
                [buildStep(StepType.HAS_INVENTORY_ITEM, { params: [rawItemId, 1] }),
                buildStep(StepType.HAS_SKILL_LEVEL, { params: [LEVEL_INDEX.COOKING, cookingLevelRequired] }),
                buildStep(StepType.SEND_CLIENT_MESSAGE, { params: ['You begin to cook the ' + itemName + '.'] })],
            ];

            let stepFailList = [buildStep(StepType.REMOVE_INVENTORY_ITEM, { params: [rawItemId, 1] }),
            buildStep(StepType.ROLL_MIN_MAX_SKILL_SUCCESS, { params: [minSuccessRate, maxSuccessRate, LEVEL_INDEX.COOKING, 1, false, 1] }),
            buildStep(StepType.GIVE_INVENTORY_ITEM, { params: [burntItemId, 1] })];

            if (returnedCookingDishID >= 0) {
                stepFailList.push(buildStep(StepType.GIVE_INVENTORY_ITEM, { params: [returnedCookingDishID, 1] }));
            }

            stepFailList.push(buildStep(StepType.SEND_CLIENT_MESSAGE, {
                params: ['You burn the ' + itemName + '.'],
                stepResultPass: 'END_AND_REPEAT_ACTION',
                stepResultFail: 'END_AND_REPEAT_ACTION',
            }));

            steps.push(stepFailList);

            if (returnedCookingDishID >= 0) {
                steps.push([buildStep(StepType.GIVE_INVENTORY_ITEM, { params: [returnedCookingDishID, 1] })]);
            }

            steps.push(
                [buildStep(StepType.GIVE_INVENTORY_ITEM, { params: [cookedItemId, 1] }),
                buildStep(StepType.GIVE_XP, { params: [LEVEL_INDEX.COOKING, xp] }),
                buildStep(StepType.MAP_ACTION_PARAMETER, { params: ['XP_MULTIPLIER', 0] }),
                buildStep(StepType.DEPLETE_WORLD_OBJECT_USES, {
                    params: [1],
                    stepResultPass: StepResult.NEXT_STEP,
                    stepResultFail: StepResult.NEXT_STEP,
                }),
                buildStep(StepType.SEND_CLIENT_MESSAGE, { 
                    params: ['You cook the ' + itemName + '.'] 
                })]
            );

            return {
                interfaceID: 0,
                id: id,
                name: '',
                entityType: Entity.EntityType.INVENTORY_ITEM,
                entityID: rawItemId,
                actionInterval: 0,
                flags: ['REPEAT_ACTION'],
                steps,
            }
        },
        CannotCookFish: function (id, rawItemId, itemName, cannotCookThisOnName) {
            return {
                interfaceID: 0,
                id: id,
                name: '',
                entityType: Entity.EntityType.INVENTORY_ITEM,
                entityID: rawItemId,
                actionInterval: 0,
                steps: [
                    buildStepList(StepList.WALK_ADJACENT),
                    [buildStep(StepType.HAS_INVENTORY_ITEM, { params: [rawItemId, 1] }),
                    buildStep(StepType.SEND_CLIENT_MESSAGE, { params: ['You cannot cook ' + itemName + ' on ' + cannotCookThisOnName + '.'] })],
                ],
            }
        },
        MixEssenceShards: function (id, alchemyLevel, shardID, essenceID, xp) {
            return {
                interfaceID: 5,
                id: id,
                name: '',
                entityType: Entity.EntityType.INVENTORY_ITEM,
                entityID: shardID,
                actionInterval: 0,
                flags: ['REPEAT_ACTION'],
                steps: [
                    buildStepList(StepList.WALK_ADJACENT),
                    [buildStep(StepType.HAS_INVENTORY_ITEM, { params: [shardID, 100] }),
                    buildStep(StepType.HAS_SKILL_LEVEL, { params: [19, alchemyLevel] }),
                    buildStep(StepType.SET_ACTION_INTERVAL, { params: [1] })],
                    [buildStep(StepType.REMOVE_INVENTORY_ITEM, { params: [shardID, 100] }),
                    buildStep(StepType.GIVE_INVENTORY_ITEM, { params: [essenceID, 1] }),
                    buildStep(StepType.GIVE_XP, { params: [19, xp] })],
                ],
            }
        },
        AnvilSmithList: function (id, entityId, menuParamArray) {
            return {
                interfaceID: 0,
                id: id,
                entityType: Entity.EntityType.INVENTORY_ITEM,
                actionInterval: 0,
                entityID: entityId,
                steps: [
                    buildStepList(StepList.WALK_ADJACENT),
                    [buildStep(StepType.PLAY_ANIMATION, { params: ['SWAY'] }),
                    buildStep(StepType.OPEN_ACTION_MENU_INTERFACE, { params: [menuParamArray] })]
                ],
            };
        },
        BagUseActionItemBind: (entityID) => {
            return {
                interfaceID: 5,
                id: 9,
                name: '',
                entityType: Entity.EntityType.INVENTORY_ITEM,
                entityID,
                actionInterval: 0,
                steps: [
                    [buildStep(StepType.BIND_BAG_ITEM, { params: [entityID] }),
                    buildStep(StepType.DEPOSIT_BAG_ITEM, { params: [entityID] })]
                ],
            };
        },
        FillBucketsWithWater: function(interfaceID, id) {
            return {
                interfaceID,
                id,
                name: 'Fill Bucket',
                entityType: Entity.EntityType.INVENTORY_ITEM,
                entityID: 744,
                actionInterval: 0,
                flags: ['REPEAT_ACTION'],
                steps: [
                    buildStepList(StepList.WALK_ADJACENT),
                    [
                        buildStep(StepType.SET_ACTION_INTERVAL, { params: [1] }),
                        buildStep(StepType.HAS_INVENTORY_ITEM, { 
                            params: [744, 1],
                            stepResultFail: StepResult.END_ACTION,
                        }),
                        buildStep(StepType.HAS_INVENTORY_SPACE, { 
                            params: [746, 1],
                            stepResultFail: StepResult.END_ACTION,
                        }),
                        buildStep(StepType.REMOVE_INVENTORY_ITEM, {params: [744, 1] }),
                        buildStep(StepType.GIVE_INVENTORY_ITEM, { 
                            params: [746, 1],
                            stepResultPass: StepResult.END_AND_REPEAT_STEP_LIST 
                        }),
                    ],
                ],
            };
        }
    }

const WorldObject = {
    Well: function(id, name, spriteIndex) {
        return {
            id,
            name,
            description: 'A water well. You can get water from here.',
            requirements: ItemDetail.build([
                ItemDetail.itemNameDetail('Empty Bucket', 'TOOL_NAME'),
            ]),
            modelName: 'ROCK',
            modelParams: {
                BASE: {
                    asset: 'worldObjects_Wells',
                    sprite: 'well',
                    spriteID: spriteIndex,
                }
            },
            // actions: [
            //     {
            //         interfaceID: 0,
            //         id: 24,
            //         name: 'Operate',
            //         steps: [
            //             [buildStep(StepType.OPERATE_CONSTRUCTION_OBJECT, { params: [[[1, fishingPoolId]], 9] }),
            //             buildStep(StepType.SEND_CLIENT_MESSAGE, {
            //                 params: ['Looking for ' + fishingPoolName + 's...'],
            //                 stepResultPass: 'END_AND_REPEAT_ACTION',
            //             })],
            //         ],
            //     },],
            actions: [],
            useActions: [Action.FillBucketsWithWater(0, 53)],
            spriteIndex: spriteIndex,
        };
    },
    Mill: function(id, name, spriteIndex) {
        return {
            id,
            name,
            description: 'A mill for grinding grains and wheat.',
            requirements: ItemDetail.build([
                ItemDetail.levelSkillDetail('1+', 13, 'USE'),
            ]),
            modelName: 'ROCK',
            modelParams: {
                BASE: {
                    asset: 'worldObjects_Mills',
                    sprite: 'mill',
                    spriteID: spriteIndex,
                }
            },
            actions: [{
                interfaceID: 0,
                id: 59,
                name: 'Grind',
                steps: [
                    buildStepList(StepList.WALK_ADJACENT),
                    [buildStep(StepType.PLAY_ANIMATION, { params: ['ACTION_BOTHHANDS'] }),
                    buildStep(StepType.OPEN_ACTION_MENU_INTERFACE, { params: [[262, 268]] })]
                ],
            }],
            useActions: [],
            spriteIndex: spriteIndex,
        };
    },
        FisheryCamp: function (id, name, fishingPoolId, spriteIndex, fishingPoolName, campLevel, skillLevel) {
            return {
                id: id,
                name: name,
                description: 'A camp for automatically fishing and processing ' + fishingPoolName + 's.',
                requirements: ItemDetail.build([
                    ItemDetail.levelSkillDetail(skillLevel, 12, 'CRAFT'),
                    ItemDetail.levelSkillDetail(campLevel, 18, 'CRAFT'),
                    ItemDetail.levelSkillDetail(campLevel, 12, 'USE'),
                    ItemDetail.itemNameDetail('Saw', 'TOOL_NAME'),
                ]),
                modelName: 'CAMP',
                modelParams: {
                    BASE: {
                        sprite: 'fishCamp',
                        spriteID: spriteIndex,
                    }
                },
                actions: [
                    {
                        interfaceID: 0,
                        id: 24,
                        name: 'Operate',
                        steps: [
                            [buildStep(StepType.OPERATE_CONSTRUCTION_OBJECT, { params: [[[1, fishingPoolId]], 9] }),
                            buildStep(StepType.SEND_CLIENT_MESSAGE, {
                                params: ['Looking for ' + fishingPoolName + 's...'],
                                stepResultPass: 'END_AND_REPEAT_ACTION',
                            })],
                        ],
                    },
                    {
                        interfaceID: 0,
                        id: 25,
                        name: 'Check',
                    },
                    {
                        interfaceID: 0,
                        id: 26,
                        name: 'Process',
                        steps: [
                            [buildStep(StepType.SET_PARAMETER_MAX_NOTE_AMOUNT),
                            buildStep(StepType.CONVERT_TO_NOTE, {
                                params: [[47, 48, 49, 50, 232, 241, 247], 'MAX_AMOUNT'],
                            }),
                            buildStep(StepType.MAP_ACTION_PARAMETER, { params: ['XP_MULTIPLIER', 10] }),
                            buildStep(StepType.DEPLETE_WORLD_OBJECT_USES, {
                                params: ['ITEM_AMOUNT'],
                                stepResultPass: 'END_ACTION',
                            }),
                            buildStep(StepType.DISASSEMBLE_CONSTRUCTION_OBJECT)],
                        ],
                    },
                    {
                        interfaceID: 0,
                        id: 27,
                        name: 'Disassemble',
                        steps: [
                            [buildStep(StepType.OPEN_ACTION_MENU_INTERFACE, { params: [[87, 88]] })]
                        ],
                    }],
                useActions: [{
                    interfaceID: 0,
                    id: 26,
                    name: 'Process',
                    entityType: Entity.EntityType.INVENTORY_ITEM,
                    entityID: 47,
                    actionInterval: 0,
                    steps: [
                        [buildStep(StepType.SET_PARAMETER_MAX_NOTE_AMOUNT),
                        buildStep(StepType.CONVERT_TO_NOTE, {
                            params: [[47, 48, 49, 50, 232, 241, 247], 'MAX_AMOUNT'],
                        }),
                        buildStep(StepType.MAP_ACTION_PARAMETER, { params: ['XP_MULTIPLIER', 5] }),
                        buildStep(StepType.DEPLETE_WORLD_OBJECT_USES, {
                            params: ['ITEM_AMOUNT'],
                            stepResultPass: 'END_ACTION',
                        }),
                        buildStep(StepType.DISASSEMBLE_CONSTRUCTION_OBJECT)],
                    ],
                }, {
                    interfaceID: 0,
                    id: 26,
                    name: 'Process',
                    entityType: Entity.EntityType.INVENTORY_ITEM,
                    entityID: 48,
                    actionInterval: 0,
                    steps: [
                        [buildStep(StepType.SET_PARAMETER_MAX_NOTE_AMOUNT),
                        buildStep(StepType.CONVERT_TO_NOTE, {
                            params: [[47, 48, 49, 50, 232, 241, 247], 'MAX_AMOUNT'],
                        }),
                        buildStep(StepType.MAP_ACTION_PARAMETER, { params: ['XP_MULTIPLIER', 10] }),
                        buildStep(StepType.DEPLETE_WORLD_OBJECT_USES, {
                            params: ['ITEM_AMOUNT'],
                            stepResultPass: 'END_ACTION',
                        }),
                        buildStep(StepType.DISASSEMBLE_CONSTRUCTION_OBJECT)],
                    ],
                }, {
                    interfaceID: 0,
                    id: 26,
                    name: 'Process',
                    entityType: Entity.EntityType.INVENTORY_ITEM,
                    entityID: 49,
                    actionInterval: 0,
                    steps: [
                        [buildStep(StepType.SET_PARAMETER_MAX_NOTE_AMOUNT),
                        buildStep(StepType.CONVERT_TO_NOTE, {
                            params: [[47, 48, 49, 50, 232, 241, 247], 'MAX_AMOUNT'],
                        }),
                        buildStep(StepType.MAP_ACTION_PARAMETER, { params: ['XP_MULTIPLIER', 15] }),
                        buildStep(StepType.DEPLETE_WORLD_OBJECT_USES, {
                            params: ['ITEM_AMOUNT'],
                            stepResultPass: 'END_ACTION',
                        }),
                        buildStep(StepType.DISASSEMBLE_CONSTRUCTION_OBJECT)],
                    ],
                }, {
                    interfaceID: 0,
                    id: 26,
                    name: 'Process',
                    entityType: Entity.EntityType.INVENTORY_ITEM,
                    entityID: 50,
                    actionInterval: 0,
                    steps: [
                        [buildStep(StepType.SET_PARAMETER_MAX_NOTE_AMOUNT),
                        buildStep(StepType.CONVERT_TO_NOTE, {
                            params: [[47, 48, 49, 50, 232, 241, 247], 'MAX_AMOUNT'],
                        }),
                        buildStep(StepType.MAP_ACTION_PARAMETER, { params: ['XP_MULTIPLIER', 20] }),
                        buildStep(StepType.DEPLETE_WORLD_OBJECT_USES, {
                            params: ['ITEM_AMOUNT'],
                            stepResultPass: 'END_ACTION',
                        }),
                        buildStep(StepType.DISASSEMBLE_CONSTRUCTION_OBJECT)],
                    ],
                }, {
                    interfaceID: 0,
                    id: 26,
                    name: 'Process',
                    entityType: Entity.EntityType.INVENTORY_ITEM,
                    entityID: 232,
                    actionInterval: 0,
                    steps: [
                        [buildStep(StepType.SET_PARAMETER_MAX_NOTE_AMOUNT),
                        buildStep(StepType.CONVERT_TO_NOTE, {
                            params: [[47, 48, 49, 50, 232, 241, 247], 'MAX_AMOUNT'],
                        }),
                        buildStep(StepType.MAP_ACTION_PARAMETER, { params: ['XP_MULTIPLIER', 25] }),
                        buildStep(StepType.DEPLETE_WORLD_OBJECT_USES, {
                            params: ['ITEM_AMOUNT'],
                            stepResultPass: 'END_ACTION',
                        }),
                        buildStep(StepType.DISASSEMBLE_CONSTRUCTION_OBJECT)],
                    ],
                }, {
                    interfaceID: 0,
                    id: 26,
                    name: 'Process',
                    entityType: Entity.EntityType.INVENTORY_ITEM,
                    entityID: 241,
                    actionInterval: 0,
                    steps: [
                        [buildStep(StepType.SET_PARAMETER_MAX_NOTE_AMOUNT),
                        buildStep(StepType.CONVERT_TO_NOTE, {
                            params: [[47, 48, 49, 50, 232, 241, 247], 'MAX_AMOUNT'],
                        }),
                        buildStep(StepType.MAP_ACTION_PARAMETER, { params: ['XP_MULTIPLIER', 30] }),
                        buildStep(StepType.DEPLETE_WORLD_OBJECT_USES, {
                            params: ['ITEM_AMOUNT'],
                            stepResultPass: 'END_ACTION',
                        }),
                        buildStep(StepType.DISASSEMBLE_CONSTRUCTION_OBJECT)],
                    ],
                }, {
                    interfaceID: 0,
                    id: 26,
                    name: 'Process',
                    entityType: Entity.EntityType.INVENTORY_ITEM,
                    entityID: 247,
                    actionInterval: 0,
                    steps: [
                        [buildStep(StepType.SET_PARAMETER_MAX_NOTE_AMOUNT),
                        buildStep(StepType.CONVERT_TO_NOTE, {
                            params: [[47, 48, 49, 50, 232, 241, 247], 'MAX_AMOUNT'],
                        }),
                        buildStep(StepType.MAP_ACTION_PARAMETER, { params: ['XP_MULTIPLIER', 35] }),
                        buildStep(StepType.DEPLETE_WORLD_OBJECT_USES, {
                            params: ['ITEM_AMOUNT'],
                            stepResultPass: 'END_ACTION',
                        }),
                        buildStep(StepType.DISASSEMBLE_CONSTRUCTION_OBJECT)],
                    ],
                },],
                spriteIndex: spriteIndex,
            };
        },
        ShallowFishingPool: function (id) {
            return {
                id: id,
                name: 'Shallow Fishing Pool',
                description: 'A swirling pool of fish are just under the surface.',
                requirements: ItemDetail.build([
                    ItemDetail.levelSkillDetail('1-30', 12, 'FISH'),
                    ItemDetail.itemNameDetail('Fishing Net', 'TOOL_NAME'),
                ]),
                modelName: 'FISHING_POOL',
                modelParams: {
                    BASE: {
                        spriteID: 1,
                    }
                },
                actions: [{
                    interfaceID: 0,
                    id: 9,
                    name: 'Cast Net',
                    steps: [
                        buildStepList(StepList.WALK_ADJACENT),
                        [buildStep(StepType.SEND_CLIENT_MESSAGE, { params: ['You cast your fishing net.'] }),
                        buildStep(StepType.SET_ACTION_INTERVAL, { params: [2] })],
                        [buildStep(StepType.IS_ADJACENT),
                        buildStep(StepType.HAS_SKILL_LEVEL, { params: [12, 1] }),
                        buildStep(StepType.HAS_INVENTORY_ITEM_GROUP, { params: [3] }),
                        buildStep(StepType.INVENTORY_HAS_ROOM),
                        buildStep(StepType.SET_PARAMETER_BEST_TOOL_POWER, { params: [12, 3] }),
                        buildStep(StepType.PLAY_ANIMATION, { params: ['CAST_NET'] }),
                        buildStep(StepType.PLAY_SOUND, { params: [35] }),
                        buildStep(StepType.ROLL_MIN_MAX_SKILL_SUCCESS, {
                            params: [5, 105, 12, 0.15, true, 0.1],
                            stepResultFail: 'END_AND_GOTO_LIST_3',
                        })],
                        [buildStep(StepType.ROLL_DESPAWN, {
                            params: [250],
                            stepResultFail: 'NEXT_STEP',
                        }),
                        buildStep(StepType.SET_RESPAWN_TIMER, {
                            params: [240],
                            stepResultFail: 'NEXT_STEP',
                        }),
                        buildStep(StepType.ROLL_MIN_MAX_SKILL_SUCCESS, { params: [-2.25, 5, 12, 0.25, true, 0.25], }),
                        buildStep(StepType.GIVE_INVENTORY_ITEM, { params: [47, 1] }),
                        buildStep(StepType.GIVE_XP, { params: [12, 25] }),
                        buildStep(StepType.SEND_CLIENT_MESSAGE, {
                            params: ['You fish some shrimp.'],
                            stepResultPass: 'END_AND_GOTO_LIST_3',
                        }),],
                        [buildStep(StepType.ROLL_MIN_MAX_SKILL_SUCCESS, { params: [-4.75, 10, 12, 0.25, true, 0.25], }),
                        buildStep(StepType.GIVE_INVENTORY_ITEM, { params: [48, 1] }),
                        buildStep(StepType.GIVE_XP, { params: [12, 50] }),
                        buildStep(StepType.SEND_CLIENT_MESSAGE, {
                            params: ['You fish a sardine.'],
                            stepResultPass: 'END_AND_GOTO_LIST_3',
                        }),],
                        [buildStep(StepType.ROLL_MIN_MAX_SKILL_SUCCESS, { params: [-7.25, 15, 12, 0.25, true, 0.25], }),
                        buildStep(StepType.GIVE_INVENTORY_ITEM, { params: [49, 1] }),
                        buildStep(StepType.GIVE_XP, { params: [12, 75] }),
                        buildStep(StepType.SEND_CLIENT_MESSAGE, {
                            params: ['You fish a herring.'],
                            stepResultPass: 'END_AND_GOTO_LIST_3',
                        }),],
                        [buildStep(StepType.GIVE_INVENTORY_ITEM, { params: [50, 1] }),
                        buildStep(StepType.GIVE_XP, { params: [12, 100] }),
                        buildStep(StepType.SEND_CLIENT_MESSAGE, {
                            params: ['You fish a mullet.'],
                            stepResultPass: 'END_AND_GOTO_LIST_3',
                        }),],
                    ]
                }],
                spriteIndex: 10,
            };
        },
        TutorialShallowFishingPool: function(id) {
            let pool = this.ShallowFishingPool(id);
            pool.actions = [{
                interfaceID: 0,
                id: 9,
                name: 'Cast Net',
                steps: [
                    buildStepList(StepList.WALK_ADJACENT),
                    
                    [buildStep(StepType.SEND_CLIENT_MESSAGE, { params: ['You cast your fishing net.'] }),
                    buildStep(StepType.SET_ACTION_INTERVAL, { params: [2] })],

                    [buildStep(StepType.IS_ADJACENT),
                    buildStep(StepType.HAS_SKILL_LEVEL, { params: [12, 1] }),
                    buildStep(StepType.HAS_INVENTORY_ITEM_GROUP, { params: [3] }),
                    buildStep(StepType.INVENTORY_HAS_ROOM),
                    buildStep(StepType.SET_PARAMETER_BEST_TOOL_POWER, { params: [12, 3] }),
                    buildStep(StepType.PLAY_ANIMATION, { params: ['CAST_NET'] }),
                    buildStep(StepType.PLAY_SOUND, { params: [35] }),
                    buildStep(StepType.ROLL_MIN_MAX_SKILL_SUCCESS, {
                        params: [5, 105, 12, 0.15, true, 0.1],
                        stepResultFail: 'END_AND_GOTO_LIST_3',
                    })],

                    [buildStep(StepType.GIVE_INVENTORY_ITEM, { params: [47, 1] }),
                    buildStep(StepType.GIVE_XP, { params: [12, 25] }),
                    buildStep(StepType.SEND_CLIENT_MESSAGE, {
                        params: ['You fish some shrimp.'],
                    }),
                    buildStep(StepType.CHECK_CHARACTER_STATE, {
                        params: [4, 3],
                        stepResultFail: 'END_AND_GOTO_LIST_5',
                    }),
                    buildStep(StepType.SHOW_DIRECTION_ARROW, {params: [134, 71]}), // Osaik's cabin
                    ],

                    [buildStep(StepType.ROLL_DESPAWN, {
                        params: [250],
                        stepResultFail: 'END_AND_GOTO_LIST_3',
                    }),
                    buildStep(StepType.SET_RESPAWN_TIMER, {
                        params: [240],
                        stepResultFail: 'END_AND_GOTO_LIST_3',
                        stepResultPass: 'END_AND_GOTO_LIST_3'
                    }),]
                ]
            }];
            return pool;
        },
        DeepFishingPool: function (id) {
            return {
                id: id,
                name: 'Deep Fishing Pool',
                description: 'A swirling pool of fish are under the surface. They look big.',
                requirements: ItemDetail.build([
                    ItemDetail.levelSkillDetail('30-60', 12, 'FISH'),
                    ItemDetail.itemNameDetail('Fishing Net', 'TOOL_NAME'),
                ]),
                modelName: 'FISHING_POOL',
                modelParams: {
                    BASE: {
                        spriteID: 2,
                    }
                },
                actions: [{
                    interfaceID: 0,
                    id: 9,
                    name: 'Cast Net',
                    steps: [
                        buildStepList(StepList.WALK_ADJACENT),
                        [buildStep(StepType.SEND_CLIENT_MESSAGE, { params: ['You cast your fishing net.'] }),
                        buildStep(StepType.SET_ACTION_INTERVAL, { params: [2] })],
                        [buildStep(StepType.IS_ADJACENT),
                        buildStep(StepType.HAS_SKILL_LEVEL, { params: [12, 40] }),
                        buildStep(StepType.HAS_INVENTORY_ITEM_GROUP, { params: [3] }),
                        buildStep(StepType.INVENTORY_HAS_ROOM),
                        buildStep(StepType.SET_PARAMETER_BEST_TOOL_POWER, { params: [12, 3] }),
                        buildStep(StepType.PLAY_ANIMATION, { params: ['CAST_NET'] }),
                        buildStep(StepType.PLAY_SOUND, { params: [35] }),
                        buildStep(StepType.ROLL_MIN_MAX_SKILL_SUCCESS, {
                            params: [5, 105, 12, 0.15, true, 0.1],
                            stepResultFail: 'END_AND_GOTO_LIST_3',
                        })],
                        [buildStep(StepType.ROLL_DESPAWN, {
                            params: [250],
                            stepResultFail: 'NEXT_STEP',
                        }),
                        buildStep(StepType.SET_RESPAWN_TIMER, {
                            params: [300], // Extra minute respawn timer
                            stepResultFail: 'NEXT_STEP',
                        }),
                        buildStep(StepType.ROLL_MIN_MAX_SKILL_SUCCESS, { params: [-9.75, 20, 12, 0.25, true, 0.25], }),
                        buildStep(StepType.GIVE_INVENTORY_ITEM, { params: [50, 1] }),
                        buildStep(StepType.GIVE_XP, { params: [12, 100] }),
                        buildStep(StepType.SEND_CLIENT_MESSAGE, {
                            params: ['You fish a mullet.'],
                            stepResultPass: 'END_AND_GOTO_LIST_3',
                        }),],
                        [buildStep(StepType.ROLL_MIN_MAX_SKILL_SUCCESS, { params: [-11.75, 25, 12, 0.25, true, 0.25], }),
                        buildStep(StepType.GIVE_INVENTORY_ITEM, { params: [232, 1] }),
                        buildStep(StepType.GIVE_XP, { params: [12, 125] }),
                        buildStep(StepType.SEND_CLIENT_MESSAGE, {
                            params: ['You fish a boxfish.'],
                            stepResultPass: 'END_AND_GOTO_LIST_3',
                        }),],
                        [buildStep(StepType.ROLL_MIN_MAX_SKILL_SUCCESS, { params: [-13.75, 30, 12, 0.25, true, 0.25], }),
                        buildStep(StepType.GIVE_INVENTORY_ITEM, { params: [241, 1] }),
                        buildStep(StepType.GIVE_XP, { params: [12, 150] }),
                        buildStep(StepType.SEND_CLIENT_MESSAGE, {
                            params: ['You fish a rockfish.'],
                            stepResultPass: 'END_AND_GOTO_LIST_3',
                        }),],
                        [buildStep(StepType.GIVE_INVENTORY_ITEM, { params: [247, 1] }),
                        buildStep(StepType.GIVE_XP, { params: [12, 175] }),
                        buildStep(StepType.SEND_CLIENT_MESSAGE, {
                            params: ['You fish a starslug.'],
                            stepResultPass: 'END_AND_GOTO_LIST_3',
                        }),],
                    ]
                }],
                spriteIndex: 60,
            };
        },
        Rock: function (id, name, skillLevelToMine, rollSuccessParams, dropTableParams, xp, spriteIndex, spawnTimer, despawnRoll, description, gemMineChance = 10, fragmentNeckID = null, chunkNeckID = null) {
            let oreName = name.split(' ').length > 0 ? name.split(' ')[0].toLowerCase() : '';
            let actionsSteps = [
                buildStepList(StepList.WALK_ADJACENT),

                [buildStep(StepType.HAS_SKILL_LEVEL, { params: [10, skillLevelToMine] }),
                buildStep(StepType.HAS_INVENTORY_ITEM_GROUP, { params: [2] }),
                buildStep(StepType.SEND_CLIENT_MESSAGE, { params: ['You attempt to mine some ore.'] }),
                buildStep(StepType.SET_ACTION_INTERVAL, { params: [2] })],

                [buildStep(StepType.HAS_SKILL_LEVEL, { params: [10, skillLevelToMine] }),
                buildStep(StepType.HAS_INVENTORY_ITEM_GROUP, { params: [2] }),
                buildStep(StepType.INVENTORY_HAS_ROOM),
                buildStep(StepType.SET_PARAMETER_BEST_TOOL_POWER, { params: [10, 2] }),
                buildStep(StepType.PLAY_ANIMATION, { params: ['MINE', { repeat: 2 }] }),
                buildStep(StepType.PLAY_SOUND, { params: [22] }),
                buildStep(StepType.ROLL_SKILL_SUCCESS, {
                    params: rollSuccessParams,
                    stepResultFail: 'END_AND_REPEAT_STEP_LIST'
                }),
                buildStep(StepType.ROLL_DROP_TABLE, { 
                    params: [1, dropTableParams],
                    stepResultFail: StepResult.NEXT_STEP,
                })],
                [buildStep(StepType.ROLL_SKILL_SUCCESS, {
                    params: [10, 13, 2.5, true, 0.1, 0],
                    stepResultFail: 'NEXT_STEP_LIST'
                }),
                buildStep(StepType.ROLL_SKILL_DROP_TABLE, { 
                    params: [gemMineChance, 10, [[UncutGemIDs.UNCUT_OPAL, 1, 1, 1000, 10]
                    , [UncutGemIDs.UNCUT_TOPAZ, 1, 1, 800, 10]
                    , [UncutGemIDs.UNCUT_QUARTZ, 1, 1, 600, 10]
                    , [UncutGemIDs.UNCUT_JADE, 1, 1, 400, 10]
                    , [UncutGemIDs.UNCUT_AMBER, 1, 1, 200, 10]
                    , [UncutGemIDs.UNCUT_SAPPHIRE, 1, 1, 0, 10]
                    , [UncutGemIDs.UNCUT_AMETHYST, 1, 1, -200, 10]
                    , [UncutGemIDs.UNCUT_EMERALD, 1, 1, -400, 10]
                    , [UncutGemIDs.UNCUT_RUBY, 1, 1, -600, 10]
                    , [UncutGemIDs.UNCUT_ONYX, 1, 1, -800, 10]
                    , [UncutGemIDs.UNCUT_DIAMOND, 1, 1, -950, 10]
                    ]],
                })],
            ];

            if (Number.isInteger(fragmentNeckID)) {
                actionsSteps.push([
                    buildStep(StepType.ROLL_SPECIAL_ITEM, { params: [6, fragmentNeckID, 'rollDropRateMultiplier'] }),
                    buildStep(StepType.ROLL_DROP_TABLE, { 
                        params: [1, dropTableParams],
                        stepResultFail: StepResult.NEXT_STEP
                    }),
                    buildStep(StepType.SEND_CLIENT_MESSAGE, { params: ['Your necklace grants you an additional ore.'] }),
                ]);
            }

            actionsSteps.push([
                buildStep(StepType.GIVE_XP, { params: [10, xp] }),
                buildStep(StepType.ROLL_RANDOM_EVENT, { params: [250, [spriteIndex]] }),
                buildStep(StepType.SEND_CLIENT_MESSAGE, { params: ['You mine some ' + oreName + ' ore.'] })
            ]);

            if (Number.isInteger(chunkNeckID)) {
                actionsSteps.push([
                    buildStep(StepType.ROLL_SPECIAL_ITEM, { 
                        params: [6, chunkNeckID, 'rollResourceDepletionSkipChance'],
                        stepResultPass: StepResult.NEXT_STEP,
                        stepResultFail: StepResult.NEXT_STEP_LIST,
                    }),
                    buildStep(StepType.SEND_CLIENT_MESSAGE, { 
                        params: ['Your necklace prevents the resource from depleting.'],
                        stepResultPass: StepResult.END_AND_GOTO_LIST_3,
                        stepResultFail: StepResult.END_AND_GOTO_LIST_3,
                    })
                ]);
            }

            actionsSteps.push([
                buildStep(StepType.ROLL_DESPAWN, {
                    params: [despawnRoll],
                    stepResultFail: StepResult.END_AND_GOTO_LIST_3,
                }),
                buildStep(StepType.SET_RESPAWN_TIMER, { params: [spawnTimer] }),
                buildStep(StepType.PLAY_SOUND, {
                    params: [40],
                    stepResultPass: 'END_ACTION'
                })
            ]);

            return {
                id: id,
                name: name,
                description,
                requirements: ItemDetail.build([
                    ItemDetail.levelSkillDetail(skillLevelToMine, 10, 'MINE'),
                    ItemDetail.itemNameDetail('Pickaxe', 'TOOL_NAME'),
                ]),
                modelName: 'ROCK',
                modelParams: {
                    BASE: {
                        spriteID: spriteIndex,
                    }
                },
                actions: [{
                    interfaceID: 0,
                    id: 3,
                    name: 'Mine',
                    steps: actionsSteps
                }],
                spriteIndex: spriteIndex,
            }
        },
        Tree: function (id, logId, woodName, requiredLevel, spriteIndex, successRollBase, successRoleBestChance, xp, despawnRoll, spawnTimer, description) {
            let name = woodName == null ? "Tree" : woodName + " Tree";
            let logName = (woodName == null ? "logs" : woodName + " logs").toLowerCase();
            return {
                id: id,
                name: name,
                description,
                requirements: ItemDetail.build([
                    ItemDetail.levelSkillDetail(requiredLevel, 9, 'CHOP'),
                    ItemDetail.itemNameDetail('Axe', 'TOOL_NAME'),
                ]),
                modelName: 'TREE',
                modelParams: {
                    BASE: {
                        spriteID: spriteIndex,
                    },
                    BOTTOM: {
                        spriteID: spriteIndex,
                    },
                    MIDDLE: {
                        spriteID: spriteIndex,
                    },
                    TOP: {
                        spriteID: spriteIndex,
                    },
                },
                actions: [{
                    interfaceID: 0,
                    id: 2,
                    name: 'Chop',
                    steps: [
                        buildStepList(StepList.WALK_ADJACENT),
                        [buildStep(StepType.HAS_SKILL_LEVEL, { params: [9, requiredLevel] }),
                        buildStep(StepType.HAS_INVENTORY_ITEM_GROUP, { params: [1] }),
                        buildStep(StepType.SEND_CLIENT_MESSAGE, { params: ['You begin cutting the ' + name.toLowerCase() + '.'] }),
                        buildStep(StepType.SET_ACTION_INTERVAL, { params: [2] })],
                        [buildStep(StepType.HAS_SKILL_LEVEL, { params: [9, requiredLevel] }),
                        buildStep(StepType.HAS_INVENTORY_ITEM_GROUP, { params: [1] }),
                        buildStep(StepType.INVENTORY_HAS_ROOM),
                        buildStep(StepType.SET_PARAMETER_BEST_TOOL_POWER, { params: [9, 1] }),
                        buildStep(StepType.PLAY_ANIMATION, { params: ['WOODCUT'] }),
                        buildStep(StepType.PLAY_SOUND, { params: [23] }),
                        buildStep(StepType.ROLL_SKILL_SUCCESS, {
                            params: [9, successRollBase, successRoleBestChance, true, 0.5, 0.5],
                            stepResultFail: StepResult.END_AND_REPEAT_STEP_LIST
                        }),
                        buildStep(StepType.GIVE_INVENTORY_ITEM, { params: [logId, 1] }),
                        buildStep(StepType.GIVE_XP, { params: [9, xp] }),
                        buildStep(StepType.SEND_CLIENT_MESSAGE, { params: ['You get some ' + logName + '.'] }),
                        buildStep(StepType.ROLL_DESPAWN, {
                            params: [despawnRoll],
                            stepResultFail: 'END_AND_REPEAT_STEP_LIST'
                        }),
                        buildStep(StepType.SET_RESPAWN_TIMER, { params: [spawnTimer] }),
                        buildStep(StepType.PLAY_SOUND, {
                            params: [41],
                            stepResultPass: 'END_ACTION'
                        })]
                    ],
                }],
                spriteIndex: spriteIndex,
            };
        },
        TutorialTree: function(id, logId, woodName, requiredLevel, spriteIndex, successRollBase, successRoleBestChance, xp, despawnRoll, spawnTimer, description) {
            let tree = this.Tree(id, 5, null, 1, 0, 15, 4, 25, 5, 16, 'Use your axe on the tree to get logs.');
            let name = "Tree";
            let logName = "logs";
            tree.actions = [{
                interfaceID: 0,
                id: 2,
                name: 'Chop',
                steps: [
                    buildStepList(StepList.WALK_ADJACENT),
                    [buildStep(StepType.HAS_SKILL_LEVEL, { params: [9, requiredLevel] }),
                    buildStep(StepType.HAS_INVENTORY_ITEM_GROUP, { params: [1] }),
                    buildStep(StepType.SEND_CLIENT_MESSAGE, { params: ['You begin cutting the ' + name.toLowerCase() + '.'] }),
                    buildStep(StepType.SET_ACTION_INTERVAL, { params: [2] })],
                    [buildStep(StepType.HAS_SKILL_LEVEL, { params: [9, requiredLevel] }),
                    buildStep(StepType.HAS_INVENTORY_ITEM_GROUP, { params: [1] }),
                    buildStep(StepType.INVENTORY_HAS_ROOM),
                    buildStep(StepType.SET_PARAMETER_BEST_TOOL_POWER, { params: [9, 1] }),
                    buildStep(StepType.PLAY_ANIMATION, { params: ['WOODCUT'] }),
                    buildStep(StepType.PLAY_SOUND, { params: [23] }),
                    buildStep(StepType.ROLL_SKILL_SUCCESS, {
                        params: [9, successRollBase, successRoleBestChance, true, 0.5, 0.5],
                        stepResultFail: StepResult.END_AND_REPEAT_STEP_LIST
                    }),
                    buildStep(StepType.GIVE_INVENTORY_ITEM, { params: [logId, 1] }),
                    buildStep(StepType.GIVE_XP, { params: [9, xp] }),
                    buildStep(StepType.SEND_CLIENT_MESSAGE, { params: ['You get some ' + logName + '.'] }),
                    buildStep(StepType.CHECK_CHARACTER_STATE, {
                        params: [4, 4],
                        stepResultPass: 'NEXT_STEP',
                        stepResultFail: 'NEXT_STEP_LIST',
                    }),
                    buildStep(StepType.SHOW_DIRECTION_ARROW, {params: [134, 71]}), // Tree
                    buildStep(StepType.ROLL_DESPAWN, {
                        params: [despawnRoll],
                        stepResultFail: 'END_AND_REPEAT_STEP_LIST'
                    }),
                    buildStep(StepType.SET_RESPAWN_TIMER, { params: [spawnTimer] }),
                    buildStep(StepType.PLAY_SOUND, {
                        params: [41],
                        stepResultPass: 'END_ACTION'
                    })],
                    [buildStep(StepType.ROLL_DESPAWN, {
                        params: [despawnRoll],
                        stepResultFail: 'END_AND_GOTO_LIST_3'
                    }),
                    buildStep(StepType.SET_RESPAWN_TIMER, { params: [spawnTimer] }),
                        buildStep(StepType.PLAY_SOUND, {
                        params: [41],
                        stepResultPass: 'END_ACTION'
                    })]
                ],
            }];
            return tree;
        },
        LumberCamp: function (id, woodName, woodId, woTreeId, spriteIndex, xpMultiplier, campLevel, skillLevel) {
            let name = woodName == null ? 'Lumber Camp' : woodName + ' Lumber Camp';
            let treeName = woodName == null ? 'trees' : woodName.toLowerCase() + ' trees';
            return {
                id: id,
                name: name,
                modelName: 'CAMP',
                description: 'A camp for automatically chopping and processing ' + treeName + '.',
                requirements: ItemDetail.build([
                    ItemDetail.levelSkillDetail(skillLevel, 9, 'CRAFT'),
                    ItemDetail.levelSkillDetail(campLevel, 18, 'CRAFT'),
                    ItemDetail.levelSkillDetail(campLevel, 9, 'USE'),
                    ItemDetail.itemNameDetail('Saw', 'TOOL_NAME'),
                ]),
                modelParams: {
                    BASE: {
                        spriteID: spriteIndex,
                    }
                },
                actions: [
                    {
                        interfaceID: 0,
                        id: 24,
                        name: 'Operate',
                        steps: [
                            [buildStep(StepType.OPERATE_CONSTRUCTION_OBJECT, { params: [[[1, woTreeId]], 2] }),
                            buildStep(StepType.SEND_CLIENT_MESSAGE, {
                                params: ['Looking for ' + treeName + '...'],
                                stepResultPass: 'END_AND_REPEAT_ACTION',
                            })],
                        ],
                    },
                    {
                        interfaceID: 0,
                        id: 25,
                        name: 'Check',
                    },
                    {
                        interfaceID: 0,
                        id: 26,
                        name: 'Process',
                        steps: [
                            [buildStep(StepType.SET_PARAMETER_MAX_NOTE_AMOUNT),
                            buildStep(StepType.CONVERT_TO_NOTE, {
                                params: [[woodId], 'MAX_AMOUNT'],
                            }),
                            buildStep(StepType.MAP_ACTION_PARAMETER, { params: ['XP_MULTIPLIER', xpMultiplier] }),
                            buildStep(StepType.DEPLETE_WORLD_OBJECT_USES, {
                                params: ['ITEM_AMOUNT'],
                                stepResultPass: 'END_ACTION',
                            }),
                            buildStep(StepType.DISASSEMBLE_CONSTRUCTION_OBJECT)],
                        ],
                    },
                    {
                        interfaceID: 0,
                        id: 27,
                        name: 'Disassemble',
                        steps: [
                            [buildStep(StepType.OPEN_ACTION_MENU_INTERFACE, { params: [[87, 88]] })]
                        ],
                    }],
                useActions: [{
                    interfaceID: 0,
                    id: 26,
                    name: 'Process',
                    entityType: Entity.EntityType.INVENTORY_ITEM,
                    entityID: woodId,
                    actionInterval: 0,
                    steps: [
                        [buildStep(StepType.SET_PARAMETER_MAX_NOTE_AMOUNT),
                        buildStep(StepType.CONVERT_TO_NOTE, {
                            params: [[woodId], 'MAX_AMOUNT'],
                        }),
                        buildStep(StepType.MAP_ACTION_PARAMETER, { params: ['XP_MULTIPLIER', xpMultiplier] }),
                        buildStep(StepType.DEPLETE_WORLD_OBJECT_USES, {
                            params: ['ITEM_AMOUNT'],
                            stepResultPass: 'END_ACTION',
                        }),
                        buildStep(StepType.DISASSEMBLE_CONSTRUCTION_OBJECT)],
                    ],
                }],
                spriteIndex: spriteIndex,
            };
        },
        MarketStall: function (id, maxTrades, spriteIndex, campLevel) {
            return {
                id: id,
                name: 'Market Stall',
                modelName: 'CAMP',
                maxTrades,
                description: 'A player owned stall for buying and selling items.',
                requirements: ItemDetail.build([
                    ItemDetail.levelSkillDetail(campLevel, 18, 'CRAFT'),
                    ItemDetail.itemNameDetail('Saw', 'TOOL_NAME'),
                ]),
                modelParams: {
                    BASE: {
                        asset: 'worldObjects_MarketStall',
                        sprite: 'marketStall',
                        spriteID: spriteIndex,
                    }
                },
                actions: [
                    {
                        interfaceID: 0,
                        id: 5,
                        name: 'Trade',
                        steps: [
                            [buildStep(StepType.OPEN_SHOP_INTERFACE)],
                        ],
                    },
                    {
                        interfaceID: 0,
                        id: 27,
                        name: 'Disassemble',
                        steps: [
                            [buildStep(StepType.OPEN_ACTION_MENU_INTERFACE, { params: [[87, 88]] })]
                        ],
                    }],
                spriteIndex: spriteIndex,
            };
        },
        MiningCamp: function (id, oreName, oreId, woRockIds, spriteIndex, xpMultiplier, campLevel, skillLevel) {
            return {
                id: id,
                name: oreName + ' Mining Camp',
                description: 'A camp for automatically mining and processing ' + oreName.toLowerCase() + ' ore.',
                requirements: ItemDetail.build([
                    ItemDetail.levelSkillDetail(skillLevel, 10, 'CRAFT'),
                    ItemDetail.levelSkillDetail(campLevel, 18, 'CRAFT'),
                    ItemDetail.levelSkillDetail(campLevel, 10, 'USE'),
                    ItemDetail.itemNameDetail('Saw', 'TOOL_NAME'),
                ]),
                modelName: 'CAMP',
                modelParams: {
                    BASE: {
                        sprite: 'mineCamp',
                        spriteID: spriteIndex,
                    }
                },
                actions: [
                    {
                        interfaceID: 0,
                        id: 24,
                        name: 'Operate',
                        steps: [
                            [buildStep(StepType.OPERATE_CONSTRUCTION_OBJECT, { params: [woRockIds, 3] }),
                            buildStep(StepType.SEND_CLIENT_MESSAGE, {
                                params: ['Looking for ' + oreName.toLowerCase() + ' rocks...'],
                                stepResultPass: 'END_AND_REPEAT_ACTION',
                            })],
                        ],
                    },
                    {
                        interfaceID: 0,
                        id: 25,
                        name: 'Check',
                    },
                    {
                        interfaceID: 0,
                        id: 26,
                        name: 'Process',
                        steps: [
                            [buildStep(StepType.SET_PARAMETER_MAX_NOTE_AMOUNT),
                            buildStep(StepType.CONVERT_TO_NOTE, {
                                params: [[oreId], 'MAX_AMOUNT'],
                            }),
                            buildStep(StepType.MAP_ACTION_PARAMETER, { params: ['XP_MULTIPLIER', xpMultiplier] }),
                            buildStep(StepType.DEPLETE_WORLD_OBJECT_USES, {
                                params: ['ITEM_AMOUNT'],
                                stepResultPass: 'END_ACTION',
                            }),
                            buildStep(StepType.DISASSEMBLE_CONSTRUCTION_OBJECT)],
                        ],
                    },
                    {
                        interfaceID: 0,
                        id: 27,
                        name: 'Disassemble',
                        steps: [
                            [buildStep(StepType.OPEN_ACTION_MENU_INTERFACE, { params: [[87, 88]] })]
                        ],
                    }],
                useActions: [{
                    interfaceID: 0,
                    id: 26,
                    name: 'Process',
                    entityType: Entity.EntityType.INVENTORY_ITEM,
                    entityID: oreId,
                    actionInterval: 0,
                    steps: [
                        [buildStep(StepType.SET_PARAMETER_MAX_NOTE_AMOUNT),
                        buildStep(StepType.CONVERT_TO_NOTE, {
                            params: [[oreId], 'MAX_AMOUNT'],
                        }),
                        buildStep(StepType.MAP_ACTION_PARAMETER, { params: ['XP_MULTIPLIER', xpMultiplier] }),
                        buildStep(StepType.DEPLETE_WORLD_OBJECT_USES, {
                            params: ['ITEM_AMOUNT'],
                            stepResultPass: 'END_ACTION',
                        }),
                        buildStep(StepType.DISASSEMBLE_CONSTRUCTION_OBJECT)],
                    ],
                }],
                spriteIndex: spriteIndex,
            };
        },
        TrainingDummy: function (id, name, hp, defenceLevel, spriteIndex, campLevel, cbLevel) {
            return {
                id: id,
                name: name,
                description: 'A dummy for training combat on.',
                requirements: ItemDetail.build([
                    ItemDetail.levelCombatDetail(cbLevel, 'Combat', 'CRAFT'),
                    ItemDetail.levelSkillDetail(campLevel, 18, 'CRAFT'),
                    ItemDetail.itemNameDetail('Saw', 'TOOL_NAME'),
                ]),
                stats: [[11, hp], [2, defenceLevel], [5, defenceLevel], [8, defenceLevel]], //50hp, 5 defence
                modelName: 'DUMMY',
                modelParams: {
                    BASE: {
                        spriteID: spriteIndex,
                    }
                },
                actions: [
                    {
                        interfaceID: 0,
                        id: 31,
                        name: 'Attack', //attack dummy
                    },
                    {
                        interfaceID: 0,
                        id: 27,
                        name: 'Disassemble',
                        steps: [
                            [buildStep(StepType.OPEN_ACTION_MENU_INTERFACE, { params: [[87, 88]] })]
                        ],
                    }],
                spriteIndex: spriteIndex,
            }
        },
        Door: function(id, name, skillID, skillLevelRequirement, spriteID, upDownLeftRight, mapID, entryPoint, exitPoint, description) {
            return {
                id: id,
                name: name,
                description: description,
                modelName: 'DOOR',
                modelParams: {
                    BASE: {
                        spriteID: spriteID,
                    }
                },
                actions: [{
                    interfaceID: 0,
                    id: 23,
                    name: 'Go Through Door',
                    steps: [
                        buildStepList(StepList.WALK_ADJACENT),
                        [
                            buildStep(StepType.IS_IN_AREA, {
                                stepResultFail: StepResult.NEXT_STEP_LIST,
                                params: [true, entryPoint.x, entryPoint.y, entryPoint.x, entryPoint.y]
                            }),
                            buildStep(StepType.HAS_SKILL_LEVEL, {
                                params: [skillID, skillLevelRequirement],
                                stepResultFail: StepResult.END_ACTION,
                            }),
                            buildStep(StepType.TELEPORT, {
                                params: [mapID, exitPoint.x, exitPoint.y, exitPoint.x, exitPoint.y, mapID],
                                stepResultPass: StepResult.END_ACTION,
                            })
                        ], 
                        [
                            buildStep(StepType.IS_IN_AREA, {
                                stepResultFail: StepResult.END_ACTION,
                                params: [true, exitPoint.x - 1, exitPoint.y - 1, exitPoint.x + 1, exitPoint.y]
                            }),
                            buildStep(StepType.HAS_SKILL_LEVEL, {
                                params: [skillID, skillLevelRequirement],
                                stepResultFail: StepResult.END_ACTION,
                            }),
                            buildStep(StepType.TELEPORT, {
                                params: [mapID, exitPoint.x, exitPoint.y, exitPoint.x, exitPoint.y, mapID,
                                [
                                    [buildStep(StepType.TELEPORT, {
                                        params: [mapID, entryPoint.x, entryPoint.y, entryPoint.x, entryPoint.y, mapID],
                                        stepResultPass: StepResult.END_ACTION,
                                    })]
                                ]],
                                stepResultPass: StepResult.END_ACTION,
                            })
                        ]
                    ],
                }],
            }
        },
        ForageablePlant: function(id, name, description, spriteName, spriteID, plantItemId, skillID, xp) {
            return  {
                id,
                name,
                description,
                requirements: ItemDetail.build([
                    ItemDetail.levelSkillDetail('1+', 15, 'GATHER'),
                ]),
                modelName: 'ROCK',
                modelParams: {
                    BASE: {
                        asset: 'worldObjects_Plants',
                        sprite: spriteName,
                        spriteID: spriteID,
                    }
                },
                actions: [{
                    interfaceID: 0,
                    id: 17,
                    name: 'Pick',
                    actionInterval: 0,
                    steps: [
                        buildStepList(StepList.WALK_ADJACENT),
                        [buildStep(StepType.SEND_CLIENT_MESSAGE, { params: ['You forage for some ' + name + '.'] }),
                        buildStep(StepType.SET_ACTION_INTERVAL, { params: [2] })],
                        [buildStep(StepType.INVENTORY_HAS_ROOM),
                        buildStep(StepType.PLAY_ANIMATION, { params: ['ACTION_BOTHHANDS', {repeat: 2}] }),
                        buildStep(StepType.ROLL_SKILL_SUCCESS, {
                            params: [skillID, 10, 2, false, 0.25, 0],
                            stepResultFail: StepResult.END_AND_REPEAT_STEP_LIST
                        }),
                        buildStep(StepType.GIVE_INVENTORY_ITEM, { params: [plantItemId, 1] }),
                        buildStep(StepType.GIVE_XP, { params: [skillID, xp] }),
                        buildStep(StepType.PLAY_SOUND, { params: [38] }),
                        buildStep(StepType.SEND_CLIENT_MESSAGE, { params: ['You pick some ' + name + '.'] }),
                        buildStep(StepType.ROLL_DESPAWN, {
                            params: [20],
                            stepResultFail: 'END_AND_REPEAT_STEP_LIST'
                        }),
                        buildStep(StepType.SET_RESPAWN_TIMER, { params: [16] })]
                    ],
                }],
                useActions: [],
            };
        },
        Flax: function(id) {
            return this.ForageablePlant(id, 'Flax', 'A plant with strong fibers. Good for making strings.', 'flax', 0, 124, 15, 5);
        },
        Wheat: function(id) {
            return this.ForageablePlant(id, 'Wheat', 'A plant used for making flour.', 'wheat', 0, 758, 13, 3);
        },
        CatQuestFishingPool: function(id) {
            let pool = this.ShallowFishingPool(id);
            let fishName = 'freshwater tuna';
            let rawFishId = 785;
            let xp = 40;
            pool.actions = [{
                interfaceID: 0,
                id: 9,
                name: 'Cast Net',
                steps: [
                    buildStepList(StepList.WALK_ADJACENT),

                    [buildStep(StepType.SEND_CLIENT_MESSAGE, { params: ['You cast your fishing net.'] }),
                    buildStep(StepType.SET_ACTION_INTERVAL, { params: [2] })],

                    [buildStep(StepType.IS_ADJACENT),
                    buildStep(StepType.HAS_SKILL_LEVEL, { params: [12, 5] }),
                    buildStep(StepType.HAS_INVENTORY_ITEM_GROUP, { params: [3] }),
                    buildStep(StepType.INVENTORY_HAS_ROOM),
                    buildStep(StepType.SET_PARAMETER_BEST_TOOL_POWER, { params: [12, 3] }),
                    buildStep(StepType.PLAY_ANIMATION, { params: ['CAST_NET'] }),
                    buildStep(StepType.PLAY_SOUND, { params: [35] }),
                    buildStep(StepType.ROLL_MIN_MAX_SKILL_SUCCESS, {
                        params: [5, 105, 12, 0.15, true, 0.1],
                        stepResultFail: 'END_AND_GOTO_LIST_3',
                    })],

                    [buildStep(StepType.GIVE_INVENTORY_ITEM, { params: [rawFishId, 1] }),
                    buildStep(StepType.GIVE_XP, { params: [12, xp] }),
                    // Set state to have acquired fish
                    buildStep(StepType.SEND_CLIENT_MESSAGE, {
                        params: ['You fish some ' + fishName + '.']
                    }),
                    buildStep(StepType.ROLL_DESPAWN, {
                        params: [250],
                        stepResultFail: 'END_AND_GOTO_LIST_3',
                    }),
                    buildStep(StepType.SET_RESPAWN_TIMER, {
                        params: [240],
                        stepResultFail: 'END_AND_GOTO_LIST_3',
                    }),]
                ]
            }];
            return pool;
        },
        ReadableObject: function(id, name, description, asset, sprite, spriteID, dialogID) {
            return {
                id,
                name,
                description,
                modelName: 'ROCK',
                modelParams: {
                    BASE: {
                        asset: asset,
                        sprite: sprite,
                        spriteID: spriteID,
                    }
                },
                actions: [
                    {
                        interfaceID: 0,
                        id: 61,
                        name: 'Read',
                        steps: [
                            buildStepList(StepList.WALK_ADJACENT),
                            [buildStep(StepType.SHOW_DIALOG, { params: [dialogID] })],
                        ],
                    },],
                spriteIndex: spriteID,
            };
        },
        CatQuestReadObject: function(id, name, description, asset, sprite, spriteID, dialogID, catIdInQuestStorage) {
            let queststateId = 1;
            let readable = this.ReadableObject(id, name, description, asset, sprite, spriteID, dialogID);
            if (readable && readable.actions.length == 1 && readable.actions[0].name == 'Read' && readable.actions[0].steps.length == 2) {
                let assertCheck = catIdInQuestStorage == 0 ? ['EQUALS', 'N/A']  : ['N/A', 'EQUALS'] 
                let setValues = catIdInQuestStorage == 0 ? [1, null] : [null, 1];


                let showDialogStepList = readable.actions[0].steps[1]; 
                showDialogStepList.push(buildStep(StepType.ASSERT_GOAL_STATES, {
                    params: [queststateId, [0, 0], assertCheck],
                    stepResultPass: 'NEXT_STEP',
                    stepResultFail: 'END_ACTION',
                }));
                showDialogStepList.push(buildStep(StepType.SET_USER_GOAL_STATE, {params: [queststateId, setValues]}));
            }
            return readable;
        },
        CatQuestBillyRecipe: function(id) {
            return this.CatQuestReadObject(id, 'Supreme Chicken Recipe', 'A special recipe for chicken', 'worldObjects_QuestMisc', 'recipe', 1, 50, 0)
        },
        CatQuestVixenRecipe: function(id) {
            return this.CatQuestReadObject(id, 'Gourmet Tuna Recipe', 'A special recipe for freshwater tuna', 'worldObjects_QuestMisc', 'recipe', 2, 51, 1)
        },
        CatQuestViosSign: function(id) {
            return this.CatQuestReadObject(id, 'Vio\'s Sign', 'A sign placed here by the home owner', 'worldObjects_QuestMisc', 'plaque', 1, 52)
        },
        CatQuestHerbs: function(id) {
            let herbId = 791;
            return this.ForageablePlant(id, 'Herbs', 'A plant used for seasoning dishes.', 'herbs', 0, herbId, 13, 5);
        },
    }

const Model = {
        Hat: function (id, name, startSpriteIndex) {
            return {
                id: id,
                name: name,
                frames: [{
                    id: 0,
                    name: 'Normal',
                    offsetX: 0,
                    offsetY: 4,
                    sprites: [[startSpriteIndex, startSpriteIndex + 1]],
                }],
            };
        },
        Hat_Lower: function (id, name, startSpriteIndex) {
            return {
                id: id,
                name: name,
                frames: [{
                    id: 0,
                    name: 'Normal',
                    offsetX: 0,
                    offsetY: 12,
                    sprites: [[startSpriteIndex, startSpriteIndex + 1]],
                }],
            };
        },
    }

const Character = {
    Rat : function(id, name, spriteIndex, stats = null, drops = null ) {
        if (stats == null) {
            stats = [[11, 2], [0, 3]]; ////2hp, 3atk
        }
        if (drops == null) {
            drops = [[[1, 100], [0, 1, 5, 100]]]; //5-15 gold //[ [[chance to roll table, table roll size (min to max chance to roll)], [id, min, max, weight], ...] [table2...] ]
        }
        return {
            id: id,
            name: name,
            modelName: 'FOUR_LEGGED_MAMMAL',
            spriteIndex: spriteIndex,
            stats: stats,
            drops: drops,
            modelParams: {
                HEAD: {
                    sprite: 'largeRatHead',
                    position: {x: -0.4, y: 0.15},
                },
                CHEST: {
                    sprite: 'largeRatBody',
                },
                HIDDEN_CHEST: {
                    sprite: 'largeRatBody',
                },
                TAIL: {
                    sprite: 'largeRatTail',
                    position: {x: 0.7, y: -0.25},
                },
                THIGH_HIDDEN_FRONT: { 
                    sprite: 'largeRatThigh', 
                    position: {x: -0.15, y: 0.3},
                },
                THIGH_VISIBLE_FRONT: { 
                    sprite: 'largeRatThigh', 
                    position: {x: -0.3, y: 0.4},
                },
                THIGH_HIDDEN_BACK: { 
                    sprite: 'largeRatThigh', 
                    position: {x: 0.35, y: 0.25},
                },      
                THIGH_VISIBLE_BACK: { 
                    sprite: 'largeRatThigh', 
                    position: {x: 0.2, y: 0.35},
                },
                SHIN_HIDDEN_FRONT: { 
                    sprite: 'largeRatShin', 
                    anchor: {x: 5/8, y: 0.1},
                },
                SHIN_VISIBLE_FRONT: { 
                    sprite: 'largeRatShin', 
                    anchor: {x: 5/8, y: 0.1},
                },
                SHIN_HIDDEN_BACK: { 
                    sprite: 'largeRatShin', 
                    anchor: {x: 05/8, y: 0.1},
                },
                SHIN_VISIBLE_BACK: { 
                    sprite: 'largeRatShin', 
                    anchor: {x: 5/8, y: 0.1},
                },
            },
            actions: [{
                interfaceID: 0,
                id: 6,
                name: 'Attack'
            }],
        };
    },
    SmallRat : function(id, name, spriteIndex ) {
        let rat = this.Rat(id, name, spriteIndex);
        rat.modelName = 'RAT_SMALL'
        rat.modelParams = null;
        return rat;
    },
    MediumRat : function(id, name, spriteIndex, stats, drops ) {
        let rat = this.Rat(id, name, spriteIndex, null, stats, drops);
        rat.modelName = 'RAT_SMALL'
        rat.modelParams = {
            LEGS : {
                sprite : 'mediumRatLegs'
            },
            CHEST : {
                sprite : 'mediumRatBody'
            },
            TAIL : {
                sprite : 'mediumRatTail'
            },
        };
        return rat;
    },
    Crab : function(id, name, spriteID, stats, drops) {
        return  {
            id,
            name,
            modelName: 'CRAB',
            stats, 
            drops,
            combatStyle: Combat.CombatStyle.MELEE,
            attackRange: 1,
            actions: [{
                interfaceID: 0,
                id: 6,
                name: 'Attack'
            }],
            modelParams: {
                CHEST: { spriteID} ,
                CLAW_RIGHT: { spriteID },
                CLAW_LEFT: { spriteID },
                LEG_RIGHT_INNER: { spriteID },
                LEG_LEFT_OUTER: { spriteID },
                LEG_RIGHT_OUTER: { spriteID },
                LEG_LEFT_INNER: { spriteID },
            },
        };
    },
    Duck : function(id, name, spriteIndex ) {
        return {
            id: id,
            name: name,
            modelName: 'CHICKEN',
            spriteIndex: spriteIndex,
            stats: [[11, 2], [0, 3]], ////2hp, 3atk,
            drops: [],
            modelParams: {
                CHEST: { sprite: 'duckBody', spriteID: spriteIndex},
                HEAD: { sprite: 'duckHead', spriteID: spriteIndex},
                LEGS: {sprite: 'duckLegs', spriteID: spriteIndex }
            },
            actions: [{
                interfaceID: 0,
                id: 6,
                name: 'Attack'
            }]
        };
    },
    Humanoid: function(id, name, spriteID, speciesSpriteName, faceId = null, eyeTint = 0x4f3822) {
        let eyesId = 0;
        if (faceId == null) {
            faceId = 0;
        }
        let limbsSpriteID = spriteID;
        let genderType = '';


        if (speciesSpriteName == 'human') {
            if (eyesId == 0) {
                eyesID = 1;
            }
            limbsSpriteID = spriteID % 10;
            
            genderType = 'Male';
            if (Math.floor( spriteID / 10 ) == 3 ) {
                genderType = 'Female';
            }
        }

        if (spriteID == 666) {
            eyesID = 0;
            limbsSpriteID = faceId = spriteID;
        }


        let result = {
            id: id,
            name: name,
            modelName: 'HUMANOID',
            spriteIndex: 1,
            animations: [[0, 0], [1, 1], [2, 2], [3, 3], [4, 4]],
            modelParams: {
                CHEST: {
                     spriteID: spriteID,
                     sprite: speciesSpriteName + 'Chest'
                },
                FACE: {
                     spriteID: faceId,
                     sprite: speciesSpriteName + 'Face'
                },
                EYES: {
                     spriteID: eyesID,
                     sprite: speciesSpriteName + 'Eyes',
                     tint: eyeTint,
                },
                HEAD: { 
                    spriteID: limbsSpriteID,
                    sprite: speciesSpriteName + 'Head' + genderType
                },
                RIGHT_SHOULDER: { 
                    spriteID: limbsSpriteID,
                    sprite: speciesSpriteName + 'RightShoulder'
                },
                RIGHT_FOREARM: { 
                    spriteID: limbsSpriteID,
                    sprite: speciesSpriteName + 'RightForearm'
                },
                LEFT_SHOULDER: { 
                    spriteID: limbsSpriteID,
                    sprite: speciesSpriteName + 'LeftShoulder'
                },
                LEFT_FOREARM: { 
                    spriteID: limbsSpriteID,
                    sprite: speciesSpriteName + 'LeftForearm'
                },
                RIGHT_THIGH: { 
                    spriteID: limbsSpriteID,
                    sprite: speciesSpriteName + genderType + 'RightThigh'
                },
                RIGHT_SHIN: { 
                    spriteID: limbsSpriteID,
                    sprite: speciesSpriteName + 'RightShin'
                },
                LEFT_THIGH: { 
                    spriteID: limbsSpriteID,
                    sprite: speciesSpriteName + genderType + 'LeftThigh'
                },
                LEFT_SHIN: { 
                    spriteID: limbsSpriteID,
                    sprite: speciesSpriteName + 'LeftShin'
                },
            },
        };
        return result;
    },
    Human : function(id, name, spriteID, equipmentModel = [0, 0, 0, 0, 0], hairStyleId = 0, hairColor = 0xff0000, actions = [], faceId = null, eyeColor = 0x4f3822) {
        let human = this.Humanoid(id, name, spriteID, 'human', faceId, eyeColor);
        human.actions = actions;
        human.equipmentModel = equipmentModel;
        if (hairStyleId != 0) {
            human.modelParams.HAIR = {
                id: 'HAIR',
                asset: 'headParts',
                sprite: 'hairStyle' + hairStyleId + '_',
                parent: 'HEAD',
                spriteID : 0,
                tint:  hairColor,
                anchor: {x: 0.5, y: 25/38},
                position: {x: 0, y: 0},
                rotation: 0,
                UIModel: null,
            };
        }
        if (faceIDsToTint[faceId]) {
            human.modelParams.FACE.tint = hairColor;
        }
        let genderID = Math.floor(spriteID / 10);

        // If male or female, add overlay
        if (genderID == 1 || genderID == 3) {
            human.modelParams.CHEST_OVERLAY = {
                id: 'CHEST_OVERLAY',
                asset: 'chestParts',
                sprite: 'humanChestOverlay',
                parent: 'CHEST',
                spriteID: genderID,
                anchor: {x: 0.5, y: 0.65 },
                position: {x: 0, y: 0},
                rotation: 0,
                UIModel: null,
                z: 5
            };
        };
        return human;
    },
    PickPocketableHuman : function(id, name, spriteID, equipmentModel, hairStyleId, hairColor, tier, talkToDialog = 6, faceId = null, eyeColor = 0x4f3822) {
        let skillLevel = 5 + tier * 5;
        let actions = [{
            interfaceID: 0,
            id: 6,
            name: 'Attack',
        }, {
            interfaceID: 0,
            id: 4,
            name: 'Talk To',
            steps: [
                buildStepList(StepList.WALK_ADJACENT),
                [buildStep(StepType.PLAY_ANIMATION, {params: ['TALK_TO']}),
                buildStep(StepType.SHOW_DIALOG, {params: [talkToDialog]})],
            ],
        }, {
            interfaceID: 0,
            id: 30,
            name: 'Steal',
            steps: [
                [buildStep(StepType.HAS_SKILL_LEVEL, { params: [20, skillLevel] }),
                buildStep(StepType.SEND_CLIENT_MESSAGE, { params: ['You attempt to steal from the citizen.'] }),
                buildStep(StepType.SET_ACTION_INTERVAL, { params: [6] })],
                [buildStep(StepType.HAS_SKILL_LEVEL, { params: [20, skillLevel] }),
                buildStep(StepList.WALK_ADJACENT),
                buildStep(StepType.PLAY_ANIMATION, { params: ['ACTION_RIGHTHAND', {repeat: 6}] }),
                buildStep(StepType.ROLL_SKILL_SUCCESS, {
                    params: [20, 20, 2, false, 0.5, 0.5],
                    stepResultFail: StepResult.END_AND_REPEAT_STEP_LIST
                })],
                [buildStep(StepType.ROLL_SKILL_SUCCESS, {
                    params: [20, 10, 1000, false, -5, -5],
                    stepResultPass: StepResult.NEXT_STEP,
                    stepResultFail: StepResult.NEXT_STEP_LIST,
                }),
                buildStep(StepType.SET_BOUNTY, {
                    params: [false, 120],
                }),
                buildStep(StepType.DAMAGE, {params: [1]}),
                buildStep(StepType.SEND_CLIENT_MESSAGE, { 
                    params: ['You were caught stealing from the citizen!'],
                    stepResultPass: StepResult.END_AND_REPEAT_ACTION,
                    stepResultFail: StepResult.END_AND_REPEAT_ACTION,
                })],
                [buildStep(StepType.ROLL_DROP_TABLE, { 
                    params: [1, [[0, 1, 2 + tier, 50], [0, 2, 2 + tier * 2, 25], [0, 2 + tier, 5 + tier * 2, 20], [0, 5 + tier, 8 + tier * 2, 5]]],
                    stepResultFail: StepResult.NEXT_STEP 
                }),
                buildStep(StepType.ROLL_DROP_TABLE, { 
                    params: [1, [[74, 1, tier, 20], [74, 1, 1 + tier, 10], [59, 1, 1, 8], [77, 1, 1, 6], [78, 1, 1, 8], [83, 1, 1, 3], [87, 1, 1, 5], [91, 1, 1, 8], [93, 1, 1, 2], [117, 1, 1, 5],[123, 1, 1, 3], [124, 1, 1, 5], [13, 1, 1, 7], [5, 1, 1, 5], [75, 1, 1, 2], [391, 1, 1, 1], [344, 1, 1, 1], [395, 1, 1, 1]]],
                    stepResultFail: StepResult.NEXT_STEP
                }),
                buildStep(StepType.GIVE_XP, { params: [20, 10 + tier * 5] }),
                buildStep(StepType.SEND_CLIENT_MESSAGE, { 
                    params: ['You find some items in the man\'s pocket.'],
                    stepResultPass: StepResult.END_AND_GOTO_LIST_1,
                }),
            ],
        ],
        }];
        let human = this.Human(id, name, spriteID, equipmentModel, hairStyleId, hairColor, actions, faceId, eyeColor);
        human.requirements = ItemDetail.build([
            ItemDetail.levelSkillDetail(skillLevel, 20, 'STEAL'),
        ]);
        human.drops = [[[1, 100], [0, 2, 5, 10], [0, 5, 9, 40], [13, 1, 1, 20], [14, 1, 1, 10], [21, 1, 1, 10], [29, 1, 1, 10]], [[64, 100], [727, 1, 1, 5], [728, 1, 1, 1], [0, 10, 20, 14], [78, 1, 2, 80]], DropTables.EssenceShards(20, 15, 80, [100, 100, 100, 100, 40, 50, 10, 10, 10, 10, 0, 0])];
        human.stats = [[0, 6 + tier * 2], [1, tier * 2], [2, 6 + tier * 2], [3, 4 + tier * 2], [4, 4 + tier * 2], [5, 4 + tier * 2], [6, 2 + tier * 2], [7, 1 + tier * 2], [8, 1 + tier * 2], [11, 6 + tier * 2],];
        return human;
    },
    Patreoner : function(id, name, spriteID, equipmentModel, hairStyleId, hairColor, eyeColor, facial, amountDonated, talkToDialog) {
        let tier = Math.min(10, Math.max(1, Math.round( amountDonated / 75)));
        if (!Number.isInteger(tier) || tier <= 0) {
            tier = 1;
        }
        let patreoner = this.PickPocketableHuman(id, name, spriteID, equipmentModel, hairStyleId, hairColor, tier, talkToDialog);
        patreoner.modelParams.EYES.tint = eyeColor;
        if (facial != null ) {
            patreoner.modelParams.FACE.spriteID = facial.id;
            if (facial.hairTint != null) {
                patreoner.modelParams.FACE.tint = hairColor;
            }
        }
        tier = Math.round( amountDonated / 50);
        if (!Number.isInteger(tier) || tier <= 0) {
            tier = 1;
        }
        patreoner.stats = [[0, 6 + tier * 2], [1, tier * 2], [2, 6 + tier * 2], [3, 4 + tier * 2], [4, 4 + tier * 2], [5, 4 + tier * 2], [6, 2 + tier * 2], [7, 1 + tier * 2], [8, 1 + tier * 2], [11, 6 + tier * 2],];
        return patreoner;
    },
    KaityPatreon: function(id, amountDonated, talkToDialog) {
        let result = this.Patreoner(id, 'Babyshark', 33, [null, null, null, 379, 483], 5, 0x4f3822, amountDonated, talkToDialog);
        result.modelParams.FACE.spriteID = 'Kaity';
        result.modelParams.EYES.tint = 0x523000;
        result.modelParams.HEAD.spriteID = 'Kaity';
        result.modelParams.HAIR.sprite = 'hairStyle';
        result.modelParams.HAIR.spriteID = 'Kaity';
        result.modelParams.HAIR.tint = 0x523000;
        return result;
    },
    PatreonPim : function(id) {
        let result = this.Human(id, 'Patreon Pim', 13, [null, null, null, 377, 489], 4, HairColors.CherryRed );
        result.actions = [
            {
                interfaceID: 0,
                id: 4,
                name: 'Talk To',
                steps: [
                    buildStepList(StepList.WALK_ADJACENT),
                    [
                        buildStep(StepType.PLAY_ANIMATION, {params: ['TALK_TO']}),
                        buildStep(StepType.IS_PATREON_SUPPORTER, {
                            stepResultPass: StepResult.NEXT_STEP,
                            stepResultFail: StepResult.NEXT_STEP_LIST,
                        }),
                        buildStep(StepType.SHOW_DIALOG, {
                            params: [62],
                            stepResultPass: StepResult.END_ACTION,
                        }) // You are a Patreon supporter, offer a teleport
                    ],
                    [
                        
                        buildStep(StepType.SHOW_DIALOG, {params: [61]}), // Heres what Patreon is about
                    ]
                ],
            }
        ];
        return result;
    },
    PatreonTat : function(id) {
        let result = this.Human(id, 'Patreon Tat', 13, [null, null, null, 375, 487], 3, HairColors.CherryRed );
        result.actions = [
            {
                interfaceID: 0,
                id: 4,
                name: 'Talk To',
                steps: [
                    buildStepList(StepList.WALK_ADJACENT),
                    [
                        buildStep(StepType.PLAY_ANIMATION, {params: ['TALK_TO']}),
                        buildStep(StepType.SHOW_DIALOG, { params: [67], })
                    ]
                ],
            }
        ];
        return result;
    },
    Death : function(id, name, spriteID, equipmentModel = [0, 0, 0, 0, 0]) {
        let death = this.Human(id, name, spriteID, equipmentModel, 0, 0, [
            {
                interfaceID: 0,
                id: 4,
                name: 'Talk To',
                steps: [
                    buildStepList(StepList.WALK_ADJACENT),
                    [buildStep(StepType.PLAY_ANIMATION, {params: ['TALK_TO']}),
                    buildStep(StepType.SHOW_DIALOG, {params: [5]})]
                ],
            }
        ]);
        
        return death;
    },
    Golem : function(id, name, spriteID, levelMultiplier, ore, pickaxe, fragment, chunk) {
        return {
            id,
            name,
            modelName: 'HUMANOID',
            modelOverrideName: 'GOLEM',
            spriteIndex: 1,
            levelMultiplier,
            doNotRespawn: true,
            drops: [[[1, 100], [fragment, 1, 1, 2], [chunk, 1, 1, 2], [ore, 10, 25, 25], [ore, 20, 35, 25], [ore, 25, 50, 25], [pickaxe, 1, 3, 21]]],
            animations: [[0, 0], [1, 1], [2, 2], [3, 3], [4, 4]],
            equipmentModel: [0, 0, 0, 0, 0], //head, right, left, chest, legs,
            modelParams: {
                HEAD: { sprite: "golemHead", spriteID: spriteID, anchor : {x : 0.5, y : 0.975}, position : { x : 0.025, y : -0.5}},
                RIGHT_SHOULDER: { sprite: "golemArmRight", spriteID: spriteID, anchor : {x : 0.5, y : 0.025}, position : { x : -0.3, y : -0.55}},
                LEFT_SHOULDER: { sprite: "golemArmLeft", spriteID: spriteID, anchor : {x : 0.5, y : 0.025}, position : { x : 0.35, y : -0.58}},
                RIGHT_THIGH: {sprite: "golemThighRight",  spriteID: spriteID, anchor : {x : 0.5, y : 0}, position : { x : -0.1, y : 0.2}},
                LEFT_THIGH: { sprite: "golemThighLeft", spriteID: spriteID, anchor : {x : 0.5}, position : { x : 0.15, y :0.45}},
                RIGHT_SHIN: {sprite: "golemShinRight",  spriteID: spriteID, anchor : {x : 0.5, y : 0}, position : { x : -0.2, y : 0.6}},
                LEFT_SHIN: { sprite: "golemShinLeft", spriteID: spriteID, anchor : {x : 0.5, y : 0}, position : { x : 0.1, y : 0.2}},
                CHEST: { sprite : "golemBody", spriteID: spriteID},
                RIGHT_FOREARM: { sprite: "", spriteID: spriteID},
                LEFT_FOREARM: { sprite: "", spriteID: spriteID},
                FACE: { sprite: "", spriteID: spriteID},
            },
            actions: [{
                interfaceID: 0,
                id: 6,
                name: 'Attack'
            }],
        };
    },
    ClayGolem : function(id, name, spriteID, levelMultiplier, ore, pickaxe, fragment, chunk) {
        let golem = this.Golem(id, name, spriteID, levelMultiplier, ore, pickaxe, fragment, chunk);
        golem.modelParams.CHEST.sprite += "Clay";
        golem.modelParams.HEAD.sprite += "Clay";
        golem.modelParams.RIGHT_SHOULDER.sprite += "Clay";
        golem.modelParams.LEFT_SHOULDER.sprite += "Clay";
        golem.modelParams.RIGHT_SHIN.sprite += "Clay";
        golem.modelParams.LEFT_SHIN.sprite += "Clay";
        golem.modelParams.RIGHT_THIGH.sprite += "Clay";
        golem.modelParams.LEFT_THIGH.sprite += "Clay";
        return golem;
    },
    CoalGolem : function(id, name, spriteID, levelMultiplier, ore, pickaxe, fragment, chunk) {
        let golem = this.Golem(id, name, spriteID, levelMultiplier, ore, pickaxe, fragment, chunk);
        golem.modelParams.CHEST.sprite += "Coal";
        golem.modelParams.HEAD.sprite += "Coal";
        golem.modelParams.RIGHT_SHOULDER.sprite += "Coal";
        golem.modelParams.LEFT_SHOULDER.sprite += "Coal";
        golem.modelParams.RIGHT_SHIN.sprite += "Coal";
        golem.modelParams.LEFT_SHIN.sprite += "Coal";
        golem.modelParams.RIGHT_THIGH.sprite += "Coal";
        golem.modelParams.LEFT_THIGH.sprite += "Coal";
        return golem;
    },
    HumanShopOwner : function(id, name, spriteID, equipmentModel = [0, 0, 0, 0, 0], hairStyleId = 0, hairColor = 0, faceId = null, eyeColor = 0x4f3822, shopsMenuInterfaceID) {
        return this.Human(id, name, spriteID, equipmentModel, hairStyleId, hairColor, [{
                interfaceID: 0,
                id: 5,
                name: 'Trade',
                steps: [
                    [buildStep(StepType.PLAY_ANIMATION, { params: ['TALk_TO'] }),
                    buildStep(StepType.OPEN_SHOP_INTERFACE, { params: [shopsMenuInterfaceID] })]
                ],
            }], faceId, eyeColor);
        },
    HumanAppearanceShopOwner : function(id, name, spriteID, equipmentModel = [0, 0, 0, 0, 0], hairStyleId = 0, hairColor = 0, faceId = null, eyeColor = 0x4f3822, appearanceShopMenuID) {
        return this.Human(id, name, spriteID, equipmentModel, hairStyleId, hairColor, [{
                interfaceID: 0,
                id: 5,
                name: 'Trade',
                steps: [
                    [buildStep(StepType.PLAY_ANIMATION, { params: ['TALk_TO'] }),
                    buildStep(StepType.OPEN_CHANGE_APPEARANCE, { params: [appearanceShopMenuID] })]
                ],
            }], faceId, eyeColor);
        },
        Skeleton: function (id, name, spriteID, stats, drops, equipmentModel, headSpriteID = null) {
            return {
                id: id,
                name: name,
                modelName: 'HUMANOID',
                modelOverrideName : 'SKELETON',
                modelParams: {
                    CHEST: {
                        sprite: 'skeletonChest',
                        spriteID: spriteID
                    },
                    HEAD: {
                        sprite: 'skeletonHead',
                        spriteID: headSpriteID == null ? spriteID : headSpriteID
                    },
                    RIGHT_SHOULDER: {
                        sprite: 'skeletonRightShoulder',
                        spriteID: spriteID,
                        anchor: {x: 0.85, y: 0.1},
                        position: {x: -0.4, y: -0.4},
                    },
                    LEFT_SHOULDER: {
                        sprite: 'skeletonLeftShoulder',
                        spriteID: spriteID,
                        anchor: {x: 0.15, y: 0.1},
                        position: {x: 0.4, y: -0.4},
                    },
                    RIGHT_FOREARM: {
                        sprite: 'skeletonRightForearm',
                        spriteID: spriteID,
                        anchor: {x: 0.5, y: 0.15},
                        position: {x: -0.7, y: 0.85},
                    },
                    LEFT_FOREARM: {
                        sprite: 'skeletonLeftForearm',
                        spriteID: spriteID,
                        anchor: {x: 0.5, y: 0.15},
                        position: {x: 0.7, y: 0.85},
                    },
                    RIGHT_THIGH: {
                        sprite: 'skeletonRightThigh',
                        spriteID: spriteID,
                        anchor: {x: 0.85, y: 0.15},
                    },
                    LEFT_THIGH: {
                        sprite: 'skeletonLeftThigh',
                        spriteID: spriteID,
                        anchor: {x: 0.15, y: 0.15},
                    },
                    RIGHT_SHIN: {
                        sprite: 'skeletonRightShin',
                        spriteID: spriteID,
                        anchor: {x: 0.85, y: 0.2},
                    },
                    LEFT_SHIN: {
                        sprite: 'skeletonLeftShin',
                        spriteID: spriteID,
                        anchor: {x: 0.5, y: 0.2},
                    },
                },
                stats: stats,
                drops: drops,
                spriteIndex: 4,
                equipmentModel: equipmentModel,
                actions: [{
                    interfaceID: 0,
                    id: 6,
                    name: 'Attack'
                }],
            };
        },
        SkeletonRanged: function (id, name, spriteID, stats, drops, equipmentModel, attackRange, headSpriteID = null) {
            let def = this.Skeleton(id, name, spriteID, stats, drops, equipmentModel, headSpriteID);
            def.combatStyle = Combat.CombatStyle.RANGE;
            def.attackRange = attackRange;
            return def;
        },
        Wizard: function (id, name, spriteID, stats, drops, equipmentModel, attackRange, headSpriteID = null) {
            let limbsSpriteID = spriteID % 10;
            return {
                id: id,
                name: name,
                modelName: 'HUMANOID',
                modelParams: {
                    CHEST: { spriteID },
                    HEAD: {
                        spriteID: headSpriteID == null ? limbsSpriteID : headSpriteID
                    },
                    RIGHT_SHOULDER: { limbsSpriteID },
                    LEFT_SHOULDER: { limbsSpriteID },
                    RIGHT_FOREARM: { limbsSpriteID },
                    LEFT_FOREARM: { limbsSpriteID },
                    RIGHT_THIGH: { limbsSpriteID },
                    LEFT_THIGH: { limbsSpriteID },
                    RIGHT_SHIN: { limbsSpriteID },
                    LEFT_SHIN: { limbsSpriteID },
                    EYES: { tint : EyeColors.Blue }
                },
                stats: stats,
                drops: drops,
                spriteIndex: id + 1,
                combatStyle: Combat.CombatStyle.MAGIC,
                attackRange,
                animations: [[0, 0], [1, 1], [2, 2], [3, 3], [4, 4]],
                equipmentModel: equipmentModel, //head, right, left, chest, legs
                actions: [{
                    interfaceID: 0,
                    id: 6,
                    name: 'Attack'
                }],
            };
        },
        Goblin: function (id, name, spriteID, stats, drops, weaponId, headSpriteID = null) {
            let goblin = this.Humanoid(id, name, spriteID, 'goblin');
            goblin.modelParams.FACE = { spriteID: 9001 };
            goblin.stats = stats;
            goblin.drops = drops;
            goblin.equipmentModel = [null, weaponId, null, null, null];
            if (headSpriteID != null) {
                goblin.modelParams.HEAD.spriteID = headSpriteID;
            }

            goblin.modelParams.CORE = { spriteID : 1 }
            goblin.modelParams.HEAD.position = {x: 0.05, y: -0.55};
            goblin.modelParams.CHEST.position =  {x: 0, y: -0.2},

            goblin.modelParams.RIGHT_SHOULDER.position = {x: -0.42, y: -0.5};
            goblin.modelParams.LEFT_SHOULDER.position = {x: 0.44, y: -0.5};

            goblin.modelParams.RIGHT_FOREARM.position =  {x: -0.5, y: 0.5},
            goblin.modelParams.LEFT_FOREARM.position =  {x: 0.5, y: 0.5},

            goblin.modelParams.RIGHT_THIGH.position = {x: -0.22, y: 0.30},
            goblin.modelParams.LEFT_THIGH.position = {x: 0.22, y: 0.30},

            goblin.modelParams.RIGHT_SHIN.position = {x: -0.2, y: 0.6};
            goblin.modelParams.LEFT_SHIN.position = {x: 0.2, y: 0.6};
            goblin.actions = [{
                interfaceID: 0,
                id: 6,
                name: 'Attack'
            }];
            return goblin;
        },
        Orc: function (id, name, spriteID, stats, drops, weaponId, headSpriteID = null) {
            let goblin = this.Humanoid(id, name, spriteID, 'orc');
            goblin.modelParams.FACE = { spriteID: 9001 };
            goblin.stats = stats;
            goblin.drops = drops;
            goblin.modelOverrideName = 'ORC';
            goblin.equipmentModel = [null, weaponId, null, null, null];
            if (headSpriteID != null) {
                goblin.modelParams.HEAD.spriteID = headSpriteID;
            }

            goblin.modelParams.CHEST.position =  {x: 0, y: -0.4},
            goblin.modelParams.HEAD.anchor = {x : 0.5, y : 0.8};
            goblin.modelParams.HEAD.position = {x: 0, y: -0.5};
            if (name.includes('King')) {
                goblin.modelParams.HEAD.position.y -= 0.1;
            }

            goblin.modelParams.RIGHT_SHOULDER.position = {x: -0.5, y: -0.32};
            goblin.modelParams.RIGHT_SHOULDER.anchor = { x : 0.8, y : 0.7 };
            goblin.modelParams.RIGHT_FOREARM.position =  {x: -0.2, y: 0.20},

            goblin.modelParams.LEFT_SHOULDER.position = {x: 0.5, y: -0.32};
            goblin.modelParams.LEFT_SHOULDER.anchor = { x : 0.2, y : 0.7 };
            goblin.modelParams.LEFT_FOREARM.position =  {x: 0.2, y: 0.22},

            goblin.modelParams.RIGHT_THIGH.anchor = {x : 0.65, y : 0.2};
            goblin.modelParams.RIGHT_THIGH.position = {x: -0.18, y: 0.3},
            goblin.modelParams.RIGHT_SHIN.anchor = {x : 0.65, y : 0.15};
            goblin.modelParams.RIGHT_SHIN.position = {x: -0.15, y: 0.7};

            goblin.modelParams.LEFT_THIGH.anchor = {x : 0.35, y : 0.2};
            goblin.modelParams.LEFT_THIGH.position = {x: 0.18, y: 0.3},
            goblin.modelParams.LEFT_SHIN.anchor = {x : 0.35, y : 0.15};
            goblin.modelParams.LEFT_SHIN.position = {x: 0.15, y: 0.7};


            goblin.actions = [{
                interfaceID: 0,
                id: 6,
                name: 'Attack'
            }];
            return goblin;
        },
        GoblinOrOrc: function (id, name, spriteID, stats, drops, equipmentModel, headSpriteID = null) {
            if (name.includes('oblin')) {
                return this.Goblin(id, name, spriteID, stats, drops, equipmentModel, headSpriteID);
            }
            else {
                return this.Orc(id, name, spriteID, stats, drops, equipmentModel, headSpriteID);
            }
        },
        GoblinOrcRanged: function (id, name, spriteID, stats, drops, equipmentModel, attackRange, headSpriteID = null) {
            let goblin = this.GoblinOrOrc(id, name, spriteID, stats, drops, equipmentModel, headSpriteID);
            goblin.combatStyle = Combat.CombatStyle.RANGE;
            goblin.attackRange = attackRange;
            return goblin;
        },
        GoblinOrcMage: function (id, name, spriteID, stats, drops, equipmentModel, attackRange, headSpriteID = null) {
            let goblin = this.GoblinOrOrc(id, name, spriteID, stats, drops, equipmentModel, headSpriteID);
            goblin.combatStyle = Combat.CombatStyle.MAGIC;
            goblin.attackRange = attackRange;
            return goblin;
        },
        GoblinOrcRangeMelee: function (id, name, spriteID, stats, drops, equipmentModel, attackRange, headSpriteID = null) {
            let goblin = this.GoblinOrOrc(id, name, spriteID, stats, drops, equipmentModel, headSpriteID);
            goblin.combatStyle = Combat.CombatStyle.MELEE;
            goblin.attackRange = 1;
            goblin.secondaryCombatStyle = Combat.CombatStyle.RANGE;
            goblin.secondaryAttackRange = attackRange;
            return goblin;
        },
        Ghost: function (id, name, spriteId, stats, essenceIdToDrop, minAmountToDrop, maxAmountToDrop) {
            let attackByEssenceId = {
                78: 83, // Air essence -> air attack
                79: 84, // Water essence -> water attack
                80: 85, // Earth essence -> earth attack
                81: 86, // Fire essence -> fire attack
            }
            if (!attackByEssenceId[essenceIdToDrop]) {
                attackByEssenceId[essenceIdToDrop] = attackByEssenceId[81];
            }
            return {
                id: id,
                name: name,
                modelName: 'HUMANOID',
                stats: stats,
                spriteIndex: spriteId,
                drops: [[[1, 100], [essenceIdToDrop, minAmountToDrop, maxAmountToDrop, 100]]],
                /*equipmentModel: [0, attackByEssenceId[essenceIdToDrop], 0, 0, 0], //head, right, left, chest, legs
                combatStyle : CombatStyle.MAGIC,
                attackRange : 12,*/
                modelParams: {
                    CHEST: {
                        spriteID: spriteId,
                        sprite: 'ghostChest'
                    },
                    RIGHT_SHOULDER: {
                        spriteID: spriteId,
                        sprite: 'ghostRightArm'
                    },
                    LEFT_SHOULDER: {
                        spriteID: spriteId,
                        sprite: 'ghostLeftArm'
                    },
                    HEAD: { spriteID: 0, },
                    FACE: {sprite: 9000,},
                    EYES: {spriteID: 0},
                    LEFT_FOREARM: { spriteID: 0, },
                    RIGHT_FOREARM: { spriteID: 0, },
                    RIGHT_THIGH: { spriteID: 0, },
                    LEFT_THIGH: { spriteID: 0, },
                    RIGHT_SHIN: { spriteID: 0, },
                    LEFT_SHIN: { spriteID: 0, },
                },
                actions: [{
                    interfaceID: 0,
                    id: 6,
                    name: 'Attack'
                }],
            };
        },
        ElementalGhost: function (id, name, spriteId, stats, essenceIdsToDrop, minAmountToDropEach, maxAmountToDropEach) {
            let ghost = this.Ghost(id, name, spriteId, stats, null, null, null);
            ghost.drops = [];
            for (let i = 0; i < essenceIdsToDrop.length; i++) {
                ghost.drops.push([[1, 100], [essenceIdsToDrop[i], minAmountToDropEach, maxAmountToDropEach, 100]]);
            }
            return ghost;
        },
    QuestChildGoblin : function(id, name) {
        let questStateId = 0;
        let states = {
            NOT_STARTED : 0,
            GET_COPPER_EQUIPMENT : 1,
            FIGHT_THE_BULL : 2,
            COMPLETE : 3
        }
        let childGoblin = this.Goblin(id, name, 1,  [[0, 10], [1, 10], [2, 50], [3, 10]], [[]], null, 4);
        childGoblin.cannotDie = true;
        childGoblin.actions = [{
            interfaceID: 0,
            id: 4,
            name: 'Talk To',
            steps: [
                buildStepList(StepList.WALK_ADJACENT),

                // If we have previously completed the tutorial, go straight to post-tutorial dialog
                [buildStep(StepType.ASSERT_GOAL_STATES, {
                    params: [questStateId, [states.COMPLETE], ['EQUALS'] ],
                    stepResultPass: 'NEXT_STEP',
                    stepResultFail: 'NEXT_STEP_LIST',
                }),
                buildStep(StepType.PLAY_ANIMATION, {params: ['TALK_TO']}),
                buildStep(StepType.SHOW_DIALOG, {
                    params: [44],
                    stepResultPass: 'END_ACTION',
                    stepResultFail: 'END_ACTION',
                })],

                // Waiting for tools + you have tools, he goes and fights the bull
                [buildStep(StepType.ASSERT_GOAL_STATES, {
                    params: [questStateId, [states.GET_COPPER_EQUIPMENT], ['EQUALS']],
                    stepResultPass: 'NEXT_STEP',
                    stepResultFail: 'NEXT_STEP_LIST',
                }),
                buildStep(StepType.HAS_INVENTORY_ITEM, { 
                    params: [13, 1], 
                    stepResultPass: 'NEXT_STEP',
                    stepResultFail: 'NEXT_STEP_LIST',
                }),
                buildStep(StepType.HAS_INVENTORY_ITEM, { 
                    params: [21, 1], 
                    stepResultPass: 'NEXT_STEP',
                    stepResultFail: 'NEXT_STEP_LIST',
                }),
                buildStep(StepType.GIVE_OWNER_EQUIPMENT_ITEM, {params: [1, 13, null]}),
                buildStep(StepType.GIVE_OWNER_EQUIPMENT_ITEM, {params: [0, 21, null]}),
                buildStep(StepType.PLAY_ANIMATION, {params: ['TALK_TO']}),
                buildStep(StepType.SHOW_DIALOG, {
                    params: [42],
                    stepResultPass: 'END_ACTION',
                    stepResultFail: 'END_ACTION',
                })],

                // He fought the bull and won, you have finished the quest
                [buildStep(StepType.ASSERT_GOAL_STATES, {
                    params: [questStateId, [states.FIGHT_THE_BULL], ['EQUALS']],
                    stepResultPass: 'NEXT_STEP',
                    stepResultFail: 'NEXT_STEP_LIST',
                }),
                buildStep(StepType.REMOVE_OWNER_EQUIPMENT_ITEM, {params: [1]}),
                buildStep(StepType.REMOVE_OWNER_EQUIPMENT_ITEM, {params: [0]}),
                buildStep(StepType.PLAY_ANIMATION, {params: ['TALK_TO']}),
                buildStep(StepType.SHOW_DIALOG, {
                    params: [43],
                    stepResultPass: 'END_ACTION',
                    stepResultFail: 'END_ACTION',
                })],
                
                // Waiting for tools + you dont have tools, nags about wanting tools
                [buildStep(StepType.ASSERT_GOAL_STATES, {
                    params: [questStateId, [states.GET_COPPER_EQUIPMENT], ['EQUALS']],
                    stepResultPass: 'NEXT_STEP',
                    stepResultFail: 'NEXT_STEP_LIST',
                }),
                buildStep(StepType.PLAY_ANIMATION, {params: ['TALK_TO']}),
                buildStep(StepType.SHOW_DIALOG, {
                    params: [45],
                    stepResultPass: 'END_ACTION',
                    stepResultFail: 'END_ACTION',
                })],

                // We have not started the quest, go to start quest dialog
                [buildStep(StepType.SET_USER_GOAL_STATE, {
                    params: [questStateId, [states.NOT_STARTED]],
                    stepResultPass: 'NEXT_STEP',
                    stepResultFail: 'NEXT_STEP_LIST',
                }),
                buildStep(StepType.PLAY_ANIMATION, {params: ['TALK_TO']}),
                buildStep(StepType.SHOW_DIALOG, {
                    params: [41],
                    stepResultPass: 'END_ACTION',
                    stepResultFail: 'END_ACTION',
                })],
            ]
        }];

        return childGoblin
    },
    Osaik : function(id) {
        let actions = [{
            interfaceID: 0,
            id: 4,
            name: 'Talk To',
            steps: [
                buildStepList(StepList.WALK_ADJACENT),

                // If we have previously completed the tutorial, go straight to questions dialog
                [buildStep(StepType.CHECK_CHARACTER_STATE, {
                    params: [4, 0],
                    stepResultPass: 'NEXT_STEP',
                    stepResultFail: 'NEXT_STEP_LIST',
                }),
                buildStep(StepType.PLAY_ANIMATION, {params: ['TALK_TO']}),
                buildStep(StepType.SHOW_DIALOG, {
                    params: [2],
                    stepResultPass: 'END_ACTION',
                    stepResultFail: 'END_ACTION',
                })],

                // if we are at step 1 => Give you the fishing net => step 2
                [buildStep(StepType.CHECK_CHARACTER_STATE, {
                    params: [4, 2],
                    stepResultPass: 'NEXT_STEP',
                    stepResultFail: 'NEXT_STEP_LIST',
                }),
                buildStep(StepType.PLAY_ANIMATION, {params: ['TALK_TO']}),
                buildStep(StepType.SHOW_DIALOG, {
                    params: [13],
                    stepResultPass: 'END_ACTION',
                    stepResultFail: 'END_ACTION',
                })],
    
                // If we are at step 2 AND have a raw shrimp => step 3
                [buildStep(StepType.CHECK_CHARACTER_STATE, {
                    params: [4, 3],
                    stepResultPass: 'NEXT_STEP',
                    stepResultFail: 'NEXT_STEP_LIST',
                }),
                buildStep(StepType.HAS_INVENTORY_ITEM, { 
                    params: [47, 1], 
                    stepResultPass: 'NEXT_STEP',
                    stepResultFail: 'NEXT_STEP_LIST',
                }),
                buildStep(StepType.PLAY_ANIMATION, {params: ['TALK_TO']}),
                buildStep(StepType.SHOW_DIALOG, {
                    params: [14],
                    stepResultPass: 'END_ACTION',
                    stepResultFail: 'END_ACTION',
                })],
    
                // If we are at step 3 AND have a cooked shrimp => step 4
                [buildStep(StepType.CHECK_CHARACTER_STATE, {
                    params: [4, 4],
                    stepResultPass: 'NEXT_STEP',
                    stepResultFail: 'NEXT_STEP_LIST',
                }),
                buildStep(StepType.HAS_INVENTORY_ITEM, { 
                    params: [51, 1], 
                    stepResultPass: 'NEXT_STEP',
                    stepResultFail: 'NEXT_STEP_LIST',
                }),
                buildStep(StepType.REMOVE_INVENTORY_ITEM, { params: [51, 1] }),
                buildStep(StepType.PLAY_ANIMATION, {params: ['TALK_TO']}),
                buildStep(StepType.SHOW_DIALOG, {
                    params: [15],
                    stepResultPass: 'END_ACTION',
                    stepResultFail: 'END_ACTION',
                })],

                
                // If we are at step 3 still AND have a burnt shrimp => step 4
                [buildStep(StepType.CHECK_CHARACTER_STATE, {
                    params: [4, 4],
                    stepResultPass: 'NEXT_STEP',
                    stepResultFail: 'NEXT_STEP_LIST',
                }),
                buildStep(StepType.HAS_INVENTORY_ITEM, { 
                    params: [119, 1], 
                    stepResultPass: 'NEXT_STEP',
                    stepResultFail: 'NEXT_STEP_LIST',
                }),
                buildStep(StepType.PLAY_ANIMATION, {params: ['TALK_TO']}),
                buildStep(StepType.SHOW_DIALOG, {
                    params: [39],
                    stepResultPass: 'END_ACTION',
                    stepResultFail: 'END_ACTION',
                })],
    
                // If we are at step 4 AND have Osaiks key => step 5
                [buildStep(StepType.CHECK_CHARACTER_STATE, {
                    params: [4, 5],
                    stepResultPass: 'NEXT_STEP',
                    stepResultFail: 'NEXT_STEP_LIST',
                }),
                buildStep(StepType.HAS_INVENTORY_ITEM, { 
                    params: [730, 1], 
                    stepResultPass: 'NEXT_STEP',
                    stepResultFail: 'NEXT_STEP_LIST',
                }),
                buildStep(StepType.REMOVE_INVENTORY_ITEM, { params: [730, 1] }),
                buildStep(StepType.PLAY_ANIMATION, {params: ['TALK_TO']}),
                buildStep(StepType.SHOW_DIALOG, {
                    params: [16],
                    stepResultPass: 'END_ACTION',
                    stepResultFail: 'END_ACTION',
                })],
    
                // If we are at step 2 still, we need a raw shrimp => ask for shrimp
                [buildStep(StepType.CHECK_CHARACTER_STATE, {
                    params: [4, 3],
                    stepResultPass: 'NEXT_STEP',
                    stepResultFail: 'NEXT_STEP_LIST',
                }),
                buildStep(StepType.PLAY_ANIMATION, {params: ['TALK_TO']}),
                buildStep(StepType.SHOW_DIALOG, {
                    params: [17],
                    stepResultPass: 'END_ACTION',
                    stepResultFail: 'END_ACTION',
                })],
                
                // If we are at step 3 still, we need a cooked shrimp => ask for shrimp
                [buildStep(StepType.CHECK_CHARACTER_STATE, {
                    params: [4, 4],
                    stepResultPass: 'NEXT_STEP',
                    stepResultFail: 'NEXT_STEP_LIST',
                }),
                buildStep(StepType.PLAY_ANIMATION, {params: ['TALK_TO']}),
                buildStep(StepType.SHOW_DIALOG, {
                    params: [18],
                    stepResultPass: 'END_ACTION',
                    stepResultFail: 'END_ACTION',
                })],
    
                // If we are at step 4 still, we need a key => ask for shrimp
                [buildStep(StepType.CHECK_CHARACTER_STATE, {
                    params: [4, 5],
                    stepResultPass: 'NEXT_STEP',
                    stepResultFail: 'NEXT_STEP_LIST',
                }),
                buildStep(StepType.PLAY_ANIMATION, {params: ['TALK_TO']}),
                buildStep(StepType.SHOW_DIALOG, {
                    params: [19],
                    stepResultPass: 'END_ACTION',
                    stepResultFail: 'END_ACTION',
                })],
    
                // If we are at step 5, we havent teleported, 
                [buildStep(StepType.CHECK_CHARACTER_STATE, {
                    params: [4, 6],
                    stepResultPass: 'NEXT_STEP',
                    stepResultFail: 'NEXT_STEP_LIST',
                }),
                buildStep(StepType.PLAY_ANIMATION, {params: ['TALK_TO']}),
                buildStep(StepType.SHOW_DIALOG, {
                    params: [20],
                    stepResultPass: 'END_ACTION',
                    stepResultFail: 'END_ACTION',
                })],

                
                // If we are at step 6, we have teleported but not yet spoke to Osaik by Fiewon, 
                [buildStep(StepType.CHECK_CHARACTER_STATE, {
                    params: [4, 7],
                    stepResultPass: 'NEXT_STEP',
                    stepResultFail: 'NEXT_STEP_LIST',
                }),
                buildStep(StepType.PLAY_ANIMATION, {params: ['TALK_TO']}),
                buildStep(StepType.SHOW_DIALOG, {
                    params: [22],
                    stepResultPass: 'END_ACTION',
                    stepResultFail: 'END_ACTION',
                })],
    
                [buildStep(StepType.SHOW_DIALOG, {params: [2]})],
            ],
        }];
        let osaik = this.Human(id, 'Osaik', 11, [null, 16, null, 413, 477], HairStyle.Scruffy, HairColors.Blond, actions, 6, EyeColors.Blue );
        osaik.stats = [[0, 30], [1, 30], [2, 30], [3, 30], [4, 30], [5, 30], [6, 30], [7, 30], [8, 30], [11, 30],];
        return osaik;
    },
    Kiaso : function(id) {
        let kiaso = this.Human(id, 'Kiaso', 12, [null, 301, null, 405, 485], HairStyle.Scruffy, HairColors.CherryRed, [{
            interfaceID: 0,
            id: 4,
            name: 'Talk To',
            steps: [
                [buildStep(StepType.PLAY_ANIMATION, {params: ['TALK_TO']}),
                buildStep(StepType.SHOW_DIALOG, {params: [33]})],
            ],
        }], 7, EyeColors.Purple);
        kiaso.stats = [[0, 40], [1, 40], [2, 40], [3, 40], [4, 40], [5, 40], [6, 40], [7, 40], [8, 40], [11, 40],];
        return kiaso;
    },
    FourLeggedMammalWithTail: function(id, name, spriteNamePrefix, spriteIndex, stats) {
        return {
            id: id,
            name: name,
            modelName: 'FOUR_LEGGED_MAMMAL',
            stats,
            spriteIndex: spriteIndex,
            // animations: [[0, 6], [1, 7], [2, 7], [3, 6], [4, 6]], //animations needed
            modelParams: {
                CORE: { sprite: 'blankChest', spriteID: 1},
                CHEST: { sprite: spriteNamePrefix + 'Body', spriteID: spriteIndex},
                HIDDEN_CHEST: { sprite: spriteNamePrefix + 'Body', spriteID: spriteIndex},
                HEAD: { sprite: spriteNamePrefix + 'Head', spriteID: spriteIndex},
                THIGH_VISIBLE_BACK: { sprite: spriteNamePrefix + 'ThighBack', spriteID: spriteIndex},
                THIGH_HIDDEN_BACK: { sprite: spriteNamePrefix + 'ThighBack', spriteID: spriteIndex},
                SHIN_VISIBLE_BACK: { sprite: spriteNamePrefix + 'ShinBack', spriteID: spriteIndex},
                SHIN_HIDDEN_BACK: { sprite: spriteNamePrefix + 'ShinBack', spriteID: spriteIndex},
                THIGH_VISIBLE_FRONT: { sprite: spriteNamePrefix + 'ThighFront', spriteID: spriteIndex},
                THIGH_HIDDEN_FRONT: { sprite: spriteNamePrefix + 'ThighFront', spriteID: spriteIndex},
                SHIN_VISIBLE_FRONT: { sprite: spriteNamePrefix + 'ShinFront', spriteID: spriteIndex},
                SHIN_HIDDEN_FRONT: { sprite: spriteNamePrefix + 'ShinFront', spriteID: spriteIndex},
                TAIL: { sprite: spriteNamePrefix + 'Tail', spriteID: spriteIndex},
            },
            actions: [{
                interfaceID: 0,
                id: 6,
                name: 'Attack'
            }]
        };
    },
    Wolf: function(id, name, stats, drops, spriteIndex) {
        let wolf = this.FourLeggedMammalWithTail(id, name, 'wolf', spriteIndex, stats);
        wolf.drops = drops;
        wolf.modelParams.HEAD.position = {x: -0.35, y: -0.15};
        wolf.modelParams.SHIN_VISIBLE_BACK.anchor = {x: 0.75, y: 0.2};
        wolf.modelParams.SHIN_HIDDEN_BACK.anchor = {x: 0.75, y: 0.2};
        wolf.modelParams.SHIN_HIDDEN_FRONT.anchor = {x: 0.75, y: 0.2};
        wolf.modelParams.SHIN_VISIBLE_FRONT.anchor = {x: 0.75, y: 0.2};
        if (spriteIndex == 2) {
            wolf.modelParams['BOW'] = {
                id: 'BOW',
                asset: 'heldParts',
                sprite: 'anchorCrossbow',
                parent: 'TAIL',
                spriteID: 0,
                anchor: {x: 0.3, y: 0.5},
                position: {x: -0.1, y: -0.1},
                rotation: 0,
                UIModel: null,
            };
        }
        return wolf;
    },
    Cow: function(id, spriteIndex, name = 'Cow') {
        let cow = this.FourLeggedMammalWithTail(id, name, 'Cow', spriteIndex,  [[0, 5], [1, 5], [2, 5], [3, 5]]);
        let emptyBucketId = 744;
        let milkBucketId = 748;
        let cookingSkillId = 13;
        let cookingSkillLevel = 1;
        let rawSteakId = 752;
        cow.modelOverrideName = 'COW';
       
        cow.actions = [{
                interfaceID: 0,
                id: 6,
                name: 'Attack'
            },{
                interfaceID: 0,
                id: 47,
                name: 'Milk',
                steps: [
                    buildStepList(StepList.WALK_ADJACENT),
                    [
                        buildStep(StepType.HAS_SKILL_LEVEL, { 
                            params: [cookingSkillId, cookingSkillLevel],
                            stepResultFail: StepResult.END_ACTION
                        }),
                        buildStep(StepType.SET_ACTION_INTERVAL, {params: [3]}),
                    ],
                    [
                        buildStep(StepType.HAS_INVENTORY_ITEM, {  params: [emptyBucketId, 1] }),
                        buildStep(StepType.HAS_INVENTORY_SPACE, {  params: [milkBucketId, 1] }),
                        buildStep(StepType.REMOVE_INVENTORY_ITEM, { params: [emptyBucketId, 1] }),
                        buildStep(StepType.GIVE_INVENTORY_ITEM, {  params: [milkBucketId, 1] }),
                        buildStep(StepType.PLAY_ANIMATION, { params: ['CAST_NET'] }),
                        buildStep(StepType.SEND_CLIENT_MESSAGE, {
                            params: ['You milked a Cow'],
                            stepResultPass: StepResult.END_AND_REPEAT_STEP_LIST
                        })
                    ]
                ]
            }
        ];
        cow.drops = [[[1, 100], [rawSteakId, 1, 1, 100]]];

        return cow;
    },
    Pinata: function(id, spriteIndex, name = 'Pinata') {
        let pinata = this.FourLeggedMammalWithTail(id, name, 'pinata', spriteIndex,  [[0, 5], [1, 5], [2, 5], [3, 5]]);
        pinata.modelOverrideName = 'PINATA',
        pinata.stats = [[11, 20], [2, 0], [5, 0], [8, 0]], //20hp

        pinata.modelParams.THIGH_VISIBLE_BACK.sprite = 'pinataUpperLeg';
        pinata.modelParams.THIGH_HIDDEN_BACK.sprite='pinataUpperLeg';
        pinata.modelParams.SHIN_VISIBLE_BACK.sprite= 'pinataBottomLeg';
        pinata.modelParams.SHIN_HIDDEN_BACK.sprite= 'pinataBottomLeg';
        pinata.modelParams.THIGH_VISIBLE_FRONT.sprite= 'pinataUpperLeg';
        pinata.modelParams.THIGH_HIDDEN_FRONT.sprite= 'pinataUpperLeg';
        pinata.modelParams.SHIN_VISIBLE_FRONT.sprite= 'pinataBottomLeg';
        pinata.modelParams.SHIN_HIDDEN_FRONT.sprite= 'pinataBottomLeg';
        pinata.modelParams.TAIL.position = {x: 0.5, y: 0}
        
        pinata.actions = [{
            interfaceID: 0,
            id: 11,
            name: 'Whack',
            flags: ['REPEAT_ACTION'],
            actionInterval: 0,
            steps: [
                buildStepList(StepList.WALK_IN_ATTACK_LINE_OF_SIGHT),
                buildStepList(StepList.WALK_IN_ATTACK_RANGE),
                [buildStep(StepType.CAN_ATTACK_OWNER)],
                [buildStep(StepType.ATTACK_OWNER, {params: [100000, 100000, false]})],
            ],
        }];

        return pinata;
    },
    Bull: function(id) {
        let cow = this.Cow(id, 2, 'Bull');
       
        cow.actions = [{
                interfaceID: 0,
                id: 6,
                name: 'Attack'
        }];
        cow.stats = [[0, 7], [1, 7], [2, 7], [3, 7]];

        return cow;
    },
    Sheep: function(id, spriteIndex, name = 'Sheep') {
        let sheep = this.FourLeggedMammalWithTail(id, name, 'Sheep', spriteIndex,  [[0, 4], [1, 4], [2, 4], [3, 4]]);
        let sheerId = 123; // Knife
        let woolId = 781;
        let rawSteakId = 752;

        sheep.modelParams.HEAD.position = {x: -0.325, y: -0.125};

        sheep.modelParams.SHIN_VISIBLE_BACK.position = {x: -0.025, y: 0.9};
        sheep.modelParams.SHIN_HIDDEN_BACK.position = {x: -0.025, y: 0.9};
       
        sheep.actions = [{
                interfaceID: 0,
                id: 6,
                name: 'Attack'
            },{
                interfaceID: 0,
                id: 58,
                name: 'Sheer',
                steps: [
                    buildStepList(StepList.WALK_ADJACENT),
                    [
                        buildStep(StepType.HAS_INVENTORY_ITEM, {  params: [sheerId, 1] }),
                        buildStep(StepType.INVENTORY_HAS_ROOM),
                        buildStep(StepType.GIVE_INVENTORY_ITEM, {  params: [woolId, 1] }),
                        buildStep(StepType.PLAY_ANIMATION, { params: ['ACTION_RIGHTHAND'] }),
                        buildStep(StepType.SEND_CLIENT_MESSAGE, {
                            params: ['You sheered a sheep'],
                            stepResultPass: StepResult.END_AND_GOTO_LIST_1
                        })
                    ]
                ]
            }
        ];
        sheep.drops = [[[1, 100], [rawSteakId, 1, 1, 100]]];

        return sheep;
    },
    Cat: function(id, spriteIndex, name = 'Cat', stats = [], meowDialog = 47) {
        let cat = this.FourLeggedMammalWithTail(id, name, 'Cat', spriteIndex,  stats);
        cat.modelParams.HEAD.position = {x: -0.35, y: -0.1};
        cat.modelParams.THIGH_HIDDEN_BACK.anchor = {x: 0.8, y: 0.15};
        cat.modelParams.THIGH_VISIBLE_BACK.anchor = {x: 0.8, y: 0.15};
        cat.modelParams.SHIN_HIDDEN_BACK.anchor = {x: 0.75, y: 0.15};
        cat.modelParams.SHIN_VISIBLE_BACK.anchor = {x: 0.75, y: 0.15};
        cat.modelParams.THIGH_HIDDEN_FRONT.anchor = {x: 0.5, y: 0.15};
        cat.modelParams.THIGH_VISIBLE_FRONT.anchor = {x: 0.5, y: 0.15};
        cat.modelParams.SHIN_HIDDEN_FRONT.anchor = {x: 0.75, y: 0.15};
        cat.modelParams.SHIN_VISIBLE_FRONT.anchor = {x: 0.75, y: 0.15};

        cat.modelParams.THIGH_HIDDEN_BACK.position = {x: 0.6, y: 0.15};
        cat.modelParams.THIGH_VISIBLE_BACK.position = {x: 0.5, y: 0.3};
        cat.modelParams.SHIN_HIDDEN_BACK.position = {x:  0.0, y: 0.7};
        cat.modelParams.SHIN_VISIBLE_BACK.position = {x: 0.0, y: 0.7};
        cat.modelParams.THIGH_HIDDEN_FRONT.position = {x: -0.05, y: 0.2};
        cat.modelParams.THIGH_VISIBLE_FRONT.position = {x: -0.2, y: 0.3};
        cat.modelParams.SHIN_HIDDEN_FRONT.position = {x: -0.2, y: 0.6};
        cat.modelParams.SHIN_VISIBLE_FRONT.position = {x: -0.2, y: 0.6};

        cat.modelParams.TAIL.anchor = {x: 0.1, y: 0.5};
        cat.modelParams.TAIL.position = {x: 0.5, y: 0.1};

        cat.actions = [{
            interfaceID: 0,
            id: 62,
            name: 'Pet',
            steps: [
                buildStepList(StepList.WALK_ADJACENT),
                [
                    buildStep(StepType.PLAY_ANIMATION, {params: ['PET']}),
                    buildStep(StepType.SAY_MESSAGE, { params: ['♥'],})
                ],
            ]
        }
        ];

        return cat;
    },
    PatreonQuestCat: function(id, isBilly, donatedAmount) {
        let tier = Math.round( donatedAmount / 50 / 2); // Half a Patreon users normal amount
        let stats = [[0, 6 + tier * 2], [1, tier * 2], [2, 6 + tier * 2], [3, 4 + tier * 2], [4, 4 + tier * 2], [5, 4 + tier * 2], [6, 2 + tier * 2], [7, 1 + tier * 2], [8, 1 + tier * 2], [11, 6 + tier * 2],];
        let name = isBilly ? 'Billy' : 'Vixen';
        let spriteIndex = isBilly ? 1 : 2;
        let questItemId = isBilly ? 795 : 797;
        
        let dialogs = {
            PURR : isBilly ? 48 : 49,
            HAVENT_READ_RECIPE : isBilly ? 53 : 57,
            PREPARING_FOOD : isBilly ? 54 : 58,
            FEED_CAT : isBilly ? 55 : 59
        };
        
        let cat = this.Cat(id, spriteIndex, name, stats, dialogs.PURR);
        let questStateId = 1;

        let states = {
            HAVENT_READ_RECIPE : 0,
            PREPARING_FOOD : 1,
            HAVE_FOOD_MUST_FEED_CAT : 2,
            FED : 3,
        };
        
        cat.cannotDie = true;

        let buildStepAssertGoal = function(state) {
            if (isBilly) {
                return buildStep(StepType.ASSERT_GOAL_STATES, {
                    params: [questStateId, [state, null], ['EQUALS', 'N/A'] ],
                    stepResultPass: 'NEXT_STEP',
                    stepResultFail: 'NEXT_STEP_LIST',
                });
            }
            else {
                return buildStep(StepType.ASSERT_GOAL_STATES, {
                    params: [questStateId, [null, state], ['N/A', 'EQUALS'] ],
                    stepResultPass: 'NEXT_STEP',
                    stepResultFail: 'NEXT_STEP_LIST',
                });
            }
        }
        let setFeedCatGoal = (isBilly) ? ([3, null]) : ([null, 3]);

        cat.actions.unshift({
            interfaceID: 0,
            id: 63,
            name: 'Approach',
            steps: [
                buildStepList(StepList.WALK_ADJACENT),
                
                // if you are at step 0 => wonder if he's hungry dialog
                [buildStepAssertGoal(states.HAVENT_READ_RECIPE),
                buildStep(StepType.SHOW_DIALOG, {
                    params: [dialogs.HAVENT_READ_RECIPE], // wonder if hes hungry dialog
                    stepResultPass: 'END_ACTION',
                    stepResultFail: 'END_ACTION',
                })],

                // if you are step 1 => I should finish preparing his dish
                [buildStepAssertGoal(states.PREPARING_FOOD),
                buildStep(StepType.SHOW_DIALOG, {
                    params: [dialogs.PREPARING_FOOD], // I should finish preparing the dish in the recipe
                    stepResultPass: 'END_ACTION',
                    stepResultFail: 'END_ACTION',
                })],


                // if you are at step 2 AND have the dish => Feed blly, goto step 3
                [buildStepAssertGoal(states.HAVE_FOOD_MUST_FEED_CAT),
                buildStep(StepType.HAS_INVENTORY_ITEM, {
                    params: [questItemId, 1]
                }),
                buildStep(StepType.REMOVE_INVENTORY_ITEM, {
                    params: [questItemId, 1]
                }),
                buildStep(StepType.SET_USER_GOAL_STATE, {
                    params: [questStateId, setFeedCatGoal]
                }),
                buildStep(StepType.SHOW_DIALOG, {
                    params: [dialogs.FEED_CAT], // Fed the cat
                    stepResultFail: 'END_ACTION',
                    stepResultPass: 'END_ACTION'
                })],

                // if you are at step 2 => I should bring him the Chicken Supreme
                [buildStepAssertGoal(states.HAVE_FOOD_MUST_FEED_CAT),
                buildStep(StepType.SHOW_DIALOG, {
                    params: [dialogs.PREPARING_FOOD], // I should finish preparing the dish in the recipe
                    stepResultPass: 'END_ACTION',
                    stepResultFail: 'END_ACTION',
                })],

                // if you are step 3 default => default post-quest dialog
                [buildStep(StepType.SHOW_DIALOG, {
                    params: [dialogs.PURR], // Purr the dialog
                    stepResultPass: 'END_ACTION',
                    stepResultFail: 'END_ACTION',
                })],
            ]
        });

        return cat;
    },
};


const Get = {
    Action,
    Item: ItemGetter,
    WorldObject,
    Model,
    Interface,
    Character,
    DropTables,
    Recipes
}

module.exports.Get = Get;
module.exports.ColoredClothes = {
    GetShirtStyleAndColorFromId : (id) => {
        let styleAndColor = coloredShirtStyleAndColorById[id];
        return {
            shirtStyleID : Math.floor( styleAndColor / 1000 ),
            shirtColorID : styleAndColor % 1000
        };
    },
    GetShirtIdFromStyleAndColor : (shirtStyleId, shirtColorId) => {
        let result = coloredShirtIdsByStyleAndColor[shirtStyleId * 1000 + shirtColorId];
        if (result == null) {
            console.info(shirtStyleId, shirtColorId, coloredShirtIdsByStyleAndColor);
        }
        return result;
    },
    GetPantsIdFromColor : (pantColorId) => coloredPantsIdsByColor[pantColorId],
    GetPantsColorFromId : (id) => {
        let colors = Object.keys(coloredPantsIdsByColor);
        for(let i = 0; i < colors.length; ++i) {
            if (coloredPantsIdsByColor[colors[i]] == id) {
                return Number( colors[i] );
            }
        }
    },
};

