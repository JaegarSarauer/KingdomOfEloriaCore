const ActionFlags = require('./Step').ActionFlags;
const ParameterMappingKeys = require('./Step').ParameterMappingKeys;
const StepList = require('./Step').StepList;
const StepResult = require('./Step').StepResult;
const StepType = require('./Step').StepType;
const StepTypeClassDictionary = require('./Step').StepTypeClassDictionary;
const buildStep = require('./Step').buildStep;
const buildStepList = require('./Step').buildStepList;
const CombatStyle = require('../internal/Combat').CombatStyle;
const Get = require('./Getter').Get;
const ItemStates = require('../def/interface/ItemStateDef').ItemStates;
const ItemDetail = require("./ItemDetail").ItemDetail;
const Entity = require('../typedef/Entity');
const Combat = require('../internal/Combat');
const SpriteColor = require("./Model").SpriteColor;
const HairStyle = require("./Model").HairStyle;
const GroundItemDef = require('../def/GroundItemDef').GroundItemDef;
var KingdomOfEloria = null;
try {	
    KingdomOfEloria = require('../KingdomOfEloria');	
} catch (e) {	
    if (e.code !== 'MODULE_NOT_FOUND') {	
        throw e;	
    }	
}

module.exports.Character = Character = [{
    id: 0,
    name: 'Chicken',
    modelName: 'CHICKEN',
    stats: [[11, 3], [0, 0], [1, 0.5], [2, 2]], //3hp, 0atk, .5pow, 2def
    drops: [[[1, 1], [738, 1, 1, 1]], [[1, 100], [73, 5, 15, 100]], [[100, 100], [78, 1, 2, 100]]], //5-15 feathers, and 1 in 10 chance for 1-2 air essence //[ [[chance to roll table, table roll size (min to max chance to roll)], [id, min, max, weight], ...] [table2...] ]
    spriteIndex: 5,
    animations: [[0, 6], [1, 7], [2, 7], [3, 6], [4, 6]],
    characterModel: [1, 1, 1], //head, body, legs
    actions: [{
        interfaceID: 0,
        id: 6,
        name: 'Attack'
    }],
    behaviorLoop: (entity) => {
        entity.timers.setTimer(17, 30, () => {
            let chance = Math.random() * 10;
            if (chance <= 1) {
                let eggGroundItem = new GroundItemDef(732, entity.x, entity.y, 1, null);
                KingdomOfEloria.i.getMap(entity.mapID).spawnEntity(eggGroundItem);
            }
            return 30;
        })
    }
}, 
Get.Character.Human(1, 'Banker', 4, [null, null, null, 100, 104], HairStyle.LeftSideSwipe, SpriteColor.Black, [{
    interfaceID: 0,
    id: 7,
    name: 'Bank',
}]),
Get.Character.HumanShopOwner(2, 'General Store Owner', 1, [21, null, null, 42, 29], HairStyle.Bald, SpriteColor.Black, 0),
Get.Character.HumanShopOwner(3, 'Woodcutting Store Owner', 1, [null, 4, null, 97, 101], HairStyle.RightSideSwipe, SpriteColor.Green, 1),
Get.Character.HumanShopOwner(4, 'Fishing Store Owner', 3, [null, null, null, 97, 101], HairStyle.RightSideSwipe, SpriteColor.Blue, 2),
Get.Character.HumanShopOwner(5, 'Metalsmith Store Owner', 3, [22, 12, null, 43, 30], HairStyle.Bald, SpriteColor.Orange, 3),
Get.Character.HumanShopOwner(6, 'Mining Store Owner', 1, [null, 12, null, 42, 29], HairStyle.RightSideSwipe, SpriteColor.Red, 4),
Get.Character.HumanShopOwner(7, 'Crafting Store Owner', 1, [null, null, null, 113, 109], HairStyle.Scruffy, SpriteColor.DarkGray, 5),
Get.Character.HumanShopOwner(8, 'Alchemy Store Owner', 4, [95, 86, null, 99, 103], HairStyle.Bald, SpriteColor.Black, 6),
Get.Character.HumanShopOwner(9, 'Melee Store Owner', 1, [null, 20, null, 44, 31], HairStyle.RightSideSwipe, SpriteColor.DarkGray, 7),
Get.Character.HumanShopOwner(10, 'Archery Store Owner', 1, [106, 38, null, 114, 110], HairStyle.RightSideSwipe, SpriteColor.LightGray, 8),
Get.Character.HumanShopOwner(11, 'Magic Store Owner', 4, [96, 84, null, 100, 104], HairStyle.Bald, SpriteColor.Purple, 9),
Get.Character.Goblin(12, 'Goblin', 1,  
    [[11, 5], [0, 5], [1, 5], [2, 3]], ////5hp, 5atk, 5pow, 3def
    [[[1, 100], [0, 3, 10, 76], [13, 1, 1, 20], [127, 1, 1, 4],], [[10, 100], [79, 1, 3, 30], [87, 1, 1, 50], [126, 1, 1, 20],]], //80% chance for coins, 20% chance for copper dagger, and 1 in 10 chance for water essence or blue cloth //[ [[chance to roll table, table roll size (min to max chance to roll)], [id, min, max, weight], ...] [table2...] ]
    null),
{
    id: 13,
    name: 'Wizard',
    modelName: 'HUMANOID',
    stats: [[11, 8], [2, 8], [5, 5], [6, 10], [7, 10], [8, 10]], //8hp, 8 atk def, 5 range def, 10 magic attack focus, 10 magic strength, 10 magic defense
    drops: [[[1, 100], [0, 10, 10, 10], [0, 20, 50, 20], [87, 2, 3, 50], [88, 1, 1, 10], [126, 1, 2, 10]], [[1, 100], [78, 2, 6, 60], [126, 1, 2, 20], [79, 1, 3, 20]], [[2, 100], [80, 2, 3, 75], [81, 1, 2, 25]], [[100, 100], [80, 1, 2, 70], [81, 1, 1, 30]], Get.DropTables.ItemPickupPages(150), Get.DropTables.EssenceShards(4, 50, 120, [100, 100, 100, 100, 40, 60, 60, 60, 5, 0, 0, 0]), Get.DropTables.LesserWoundSpellPages(1024)], //[ [[chance to roll table, table roll size (min to max chance to roll)], [id, min, max, weight], ...] [table2...] ]
    spriteIndex: 3,
    animations: [[0, 0], [1, 1], [2, 2], [3, 3], [4, 4]],
    characterModel: [0, 0, 0, 0, 0, 0], //head, torso, left leg, right leg, left arm, right arm
    equipmentModel: [93, 83, null, 97, 101], //head, right, left, chest, legs
    modelParams: {
        CHEST: { spriteID: 2},
        HEAD: { spriteID: 2},
        RIGHT_SHOULDER: { spriteID: 2},
        LEFT_SHOULDER: { spriteID: 2},
        RIGHT_FOREARM: { spriteID: 2},
        LEFT_FOREARM: { spriteID: 2},
        RIGHT_THIGH: { spriteID: 2},
        LEFT_THIGH: { spriteID: 2},
        RIGHT_SHIN: { spriteID: 2},
        LEFT_SHIN: { spriteID: 2},
    },
    combatStyle: CombatStyle.MAGIC,
    attackRange: 8,
    actions: [{
        interfaceID: 0,
        id: 6,
        name: 'Attack'
    }],
}, {
    id: 14,
    name: 'Chick',
    modelName: 'CHICK',
    spriteIndex: 6,
    animations: [[0, 8], [1, 8], [2, 8], [3, 8], [4, 8]],
    characterModel: [3],
    actions: [],
},
{
    id: 15,
    name: 'Emperor',
    modelName: 'HUMANOID',
    spriteIndex: 7,
    stats: [[0, 100], [1, 100], [2, 100], [3, 100], [4, 100], [5, 100], [6, 100], [7, 100], [8, 100], [11, 300],],
    animations: [[0, 0], [1, 1], [2, 2], [3, 3], [4, 4]],
    characterModel: [0, 0, 0, 0, 0, 0], //head, torso, left leg, right leg, left arm, right arm
    equipmentModel: [null, 301, null, 291, 295], //head, right, left, chest, legs
    modelParams: {
        CHEST: { spriteID: 1},
        HEAD: { spriteID: 1},
        HEAD_WORN: {
            id: 'HEAD_WORN',
            asset: 'headParts',
            sprite: 'fullHelm',
            parent: 'HEAD',
            spriteID: 'Emperor',
            anchor: {x: 0.40, y: 0.925},
            position: {x: 0, y: 0.0},
            rotation: 0,
            UIModel: null,
        },
        RIGHT_SHOULDER: { spriteID: 1},
        LEFT_SHOULDER: { spriteID: 1},
        RIGHT_FOREARM: { spriteID: 1},
        LEFT_FOREARM: { spriteID: 1},
        RIGHT_THIGH: { spriteID: 1},
        LEFT_THIGH: { spriteID: 1},
        RIGHT_SHIN: { spriteID: 1},
        LEFT_SHIN: { spriteID: 1},
    },
    entityGuildType: 'EMPEROR',
    actions: [{
        interfaceID: 0,
        id: 4,
        name: 'Talk To',
        steps: [
            buildStepList(StepList.WALK_ADJACENT),
            [buildStep(StepType.PLAY_ANIMATION, {params: ['TALK_TO']}),
            buildStep(StepType.OPEN_ACTION_MENU_INTERFACE, {params: [[83, 84, 85, 86, 90]]})]
        ],
    }]
},
Get.Character.GoblinOrcRanged(16, 'Goblin', 1,  
    [[11, 22], [0, 15], [1, 15], [2, 12], [5, 8], [8, 8]], //22hp, 15atk, 15pow, 12meleedef, 8rangedef, 8magicdefence
    [[[1, 100], [0, 5, 15, 75], [37, 1, 1, 15], [127, 1, 1, 5], [168, 1, 1, 5]], [[1, 100], [68, 1, 5, 90], [69, 1, 2, 10]], Get.DropTables.ItemPickupPages(128)], //80% chance for coins, 20% chance for copper dagger, and 1 in 10 chance for water essence or blue cloth //[ [[chance to roll table, table roll size (min to max chance to roll)], [id, min, max, weight], ...] [table2...] ]
    37, 8, 2), // attack range
Get.Character.GoblinOrOrc(17, 'Orc', 1,  
    [[11, 4], [2, 2], [3, 6], [4, 6]], //4hp, 2 melee def, 6 range focus, 6 range power
    [[[1, 100], [0, 20, 50, 70], [14, 1, 1, 20], [17, 1, 1, 10]], [[10, 100], [79, 3, 8, 90], [30, 1, 1, 2], [127, 1, 1, 8]], [[512, 1], [327, 1, 1, 1]], Get.DropTables.ItemPickupPages(128)], //80% chance for coins, 20% chance for copper dagger, and 1 in 10 chance for water essence or blue cloth //[ [[chance to roll table, table roll size (min to max chance to roll)], [id, min, max, weight], ...] [table2...] ]
    18, 2), //head, right, left, chest, legs
Get.Character.GoblinOrcRanged(18, 'Orc', 1,  
    [[11, 18], [2, 8], [3, 16], [4, 16], [5, 10], [8, 12]], //18hp, 8 melee def, 16 range focus, 16 range power, 10rangedef, 12magicdefence
    [[[1, 100], [0, 20, 45, 70], [38, 1, 1, 19], [39, 1, 1, 1], [127, 1, 1, 5], [168, 1, 1, 5]], [[1, 100], [68, 3, 12, 50], [69, 2, 7, 40], [70, 1, 4, 10]], [[512, 1], [327, 1, 1, 1]], Get.DropTables.ItemPickupPages(128)], //80% chance for coins, 20% chance for copper dagger, and 1 in 10 chance for water essence or blue cloth //[ [[chance to roll table, table roll size (min to max chance to roll)], [id, min, max, weight], ...] [table2...] ]
    39, 8, 2), // Attack range
Get.Character.GoblinOrOrc(19, 'King Orc', 3,  
    [[11, 100], [0, 100], [1, 60], [2, 50], [5, 60], [8, 40]], //99hp, 45atk, 45pow, 35meleedef, 45rangedef, 30magicdefence
    [[[1, 100], [0, 50, 150, 100]], [[1, 100], [89, 1, 2, 50], [90, 1, 2, 50]], [[10, 100], [79, 5, 20, 50], [30, 1, 1, 5], [127, 1, 1, 15], [26, 1, 1, 15], [19, 1, 1, 15]], [[128, 1], [327, 1, 1, 1]], Get.DropTables.TeleportScrolls(256), Get.DropTables.ItemPickupPages(80)], //80% chance for coins, 20% chance for copper dagger, and 1 in 10 chance for water essence or blue cloth //[ [[chance to roll table, table roll size (min to max chance to roll)], [id, min, max, weight], ...] [table2...] ]
    19, 4), // head sprite ID
Get.Character.GoblinOrcMage(20, 'Elder Goblin', 1,  
    [[11, 30], [2, 15], [5, 10], [6, 30], [7, 40], [8, 25]], //30hp, 15 atk def, 10 range def, 30 magic attack focus, 40 magic strength, 25 magic defense
    [[[1, 100], [0, 10, 30, 100]], [[8, 100], [89, 1, 1, 55], [90, 1, 1, 45]], [[10, 100], [127, 1, 1, 25], [126, 1, 1, 35], [79, 5, 10, 10], [78, 5, 10, 10], [80, 5, 10, 10], [81, 5, 10, 10]], [[256, 1], [327, 1, 1, 1]], Get.DropTables.TeleportScrolls(400), Get.DropTables.ItemPickupPages(100)], //80% chance for coins, 20% chance for copper dagger, and 1 in 10 chance for water essence or blue cloth //[ [[chance to roll table, table roll size (min to max chance to roll)], [id, min, max, weight], ...] [table2...] ]
    85, 8 /* Attack range */ , 3 /* head sprite ID */),
Get.Character.GoblinOrcMage(21, 'Elder Goblin', 1,  
    [[11, 26], [2, 15], [5, 10], [6, 45], [7, 35], [8, 25]], //30hp, 15 atk def, 10 range def, 30 magic attack focus, 40 magic strength, 25 magic defense
    [[[1, 100], [0, 15, 35, 100]], [[8, 100], [89, 1, 1, 45], [90, 1, 1, 55]], [[10, 100], [127, 1, 1, 35], [126, 1, 1, 25], [79, 5, 10, 10], [78, 5, 10, 10], [80, 5, 10, 10], [81, 5, 10, 10]], [[256, 1], [327, 1, 1, 1]], Get.DropTables.TeleportScrolls(400), Get.DropTables.ItemPickupPages(100)], //80% chance for coins, 20% chance for copper dagger, and 1 in 10 chance for water essence or blue cloth //[ [[chance to roll table, table roll size (min to max chance to roll)], [id, min, max, weight], ...] [table2...] ]
    86, 8 /* Attack range */ , 3 /* head sprite ID */),
Get.Character.SmallRat(22, 'Small Rat', 1),
Get.Character.MediumRat(23, 'Rat', 1, [[11, 3], [0, 5], [1, 2], [2, 2]], [[[1, 100], [0, 5, 15, 100]]]), ////3hp, 5atk, 2pow, 2def),
Get.Character.Rat(24, 'Large Rat', 1, [[11, 12], [0, 12], [1, 4], [2, 3]], ////3hp, 5atk, 2pow, 2def),
    [[[1, 100], [0, 45, 80, 100]]]),
{
    id: 25,
    name: 'Guard',
    requirements: ItemDetail.build([
        ItemDetail.levelSkillDetail(1, 1, 'BOUNTY'),
        ItemDetail.levelSkillDetail(30, 20, 'STEAL'),
    ]),
    modelName: 'HUMANOID',
    spriteIndex: 7,
    stats: [[0, 30], [1, 70], [2, 50], [3, 10], [4, 10], [5, 45], [6, 1], [7, 1], [8, 20], [11, 60]],
    drops: [[[1, 200], [0, 20, 50, 80], [15, 1, 1, 20]], [[10, 100], [53, 1, 2, 90], [54, 1, 2, 10]], [[64, 1], [327, 1, 1, 1]], Get.DropTables.ItemPickupPages(128), Get.DropTables.TeleportScrolls(350)], //[ [[chance to roll table, table roll size (min to max chance to roll)], [id, min, max, weight], ...] [table2...] ]
    characterModel: [0, 0, 0, 0, 0, 0], //head, torso, left leg, right leg, left arm, right arm
    equipmentModel: [23, 19, null, 44, 31], //head, right, left, chest, legs
    isGuard: true,
    entityGuildType: 'GUARD',
    actions: [{
        interfaceID: 0,
        id: 6,
        name: 'Attack',
        steps: [
            [buildStep(StepType.SET_BOUNTY, {
                params: [false, 120],
            })]
        ],
    }, {
        interfaceID: 0,
        id: 30,
        name: 'Steal',
        steps: [
            [buildStep(StepType.HAS_SKILL_LEVEL, { params: [20, 30] }),
            buildStep(StepType.SEND_CLIENT_MESSAGE, { params: ['You attempt to steal from the guard.'] }),
            buildStep(StepType.SET_ACTION_INTERVAL, { params: [6] })],
            [buildStep(StepType.HAS_SKILL_LEVEL, { params: [20, 30] }),
            buildStep(StepList.WALK_ADJACENT),
            buildStep(StepType.PLAY_ANIMATION, { params: ['ACTION_RIGHTHAND', {repeat: 6}] }),
            buildStep(StepType.ROLL_SKILL_SUCCESS, {
                params: [20, 35, 3, false, 0.5, 0.5],
                stepResultFail: StepResult.END_AND_REPEAT_STEP_LIST
            })],
            [buildStep(StepType.ROLL_SKILL_SUCCESS, {
                params: [20, 10, 1000, false, -4, -4],
                stepResultPass: StepResult.NEXT_STEP,
                stepResultFail: StepResult.NEXT_STEP_LIST,
            }),
            buildStep(StepType.SET_BOUNTY, {
                params: [false, 300],
            }),
            buildStep(StepType.DAMAGE, {params: [2]}),
            buildStep(StepType.SEND_CLIENT_MESSAGE, {
                params: ['You were caught stealing from the guard!'],
                stepResultPass: StepResult.END_AND_REPEAT_ACTION,
                stepResultFail: StepResult.END_AND_REPEAT_ACTION,
            })],
            [buildStep(StepType.ROLL_DROP_TABLE, { 
                params: [1, [[0, 4, 16, 50], [0, 15, 28, 25], [0, 25, 48, 20], [0, 60, 80, 5]]],
                stepResultFail: StepResult.NEXT_STEP
            }),
            buildStep(StepType.ROLL_DROP_TABLE, { 
                params: [1, [[13, 1, 1, 25], [14, 1, 1, 20], [15, 1, 1, 15], [73, 2, 4, 10], [22, 1, 1, 5]]],
                stepResultFail: StepResult.NEXT_STEP
            }),
            buildStep(StepType.GIVE_XP, { params: [20, 50] }),
            buildStep(StepType.SEND_CLIENT_MESSAGE, { 
                params: ['You find some items in the guard\'s pocket.'],
                stepResultPass: StepResult.END_AND_GOTO_LIST_1,
            }),
        ],
    ],
    }],
},
{
    id: 26,
    name: 'Emperor Guard',
    modelName: 'HUMANOID',
    spriteIndex: 7,
    stats: [[0, 70], [1, 90], [2, 70], [3, 70], [4, 90], [5, 70], [6, 70], [7, 90], [8, 70], [11, 140]],
    drops: [[[1, 200], [0, 20, 50, 80], [15, 1, 1, 20]], [[10, 100], [53, 1, 2, 90], [54, 1, 2, 10]]], //[ [[chance to roll table, table roll size (min to max chance to roll)], [id, min, max, weight], ...] [table2...] ]
    characterModel: [0, 0, 0, 0, 0, 0], //head, torso, left leg, right leg, left arm, right arm
    equipmentModel: [23, 19, null, 44, 31], //head, right, left, chest, legs
    entityGuildType: 'EMPEROR_GUARD',
    actions: [{
        interfaceID: 0,
        id: 6,
        name: 'Attack',
    }],
},
{
    id: 27,
    name: 'Mayor',
    modelName: 'HUMANOID',
    spriteIndex: 7,
    stats: [[0, 70], [1, 90], [2, 70], [3, 70], [4, 90], [5, 70], [6, 70], [7, 90], [8, 70], [11, 140]],
    drops: [[[1, 200], [0, 20, 50, 80], [15, 1, 1, 20]], [[10, 100], [53, 1, 2, 90], [54, 1, 2, 10]]], //[ [[chance to roll table, table roll size (min to max chance to roll)], [id, min, max, weight], ...] [table2...] ]
    characterModel: [0, 0, 0, 0, 0, 0], //head, torso, left leg, right leg, left arm, right arm
    equipmentModel: [23, 19, null, 44, 31], //head, right, left, chest, legs
    isGuard: true,
    entityGuildType: 'MAYOR',
    actions: [{
        interfaceID: 0,
        id: 6,
        name: 'Attack'
    }],
},
{
    id: 28,
    name: 'Player Guard',
    modelName: 'HUMANOID',
    spriteIndex: 7,
    stats: [[0, 30], [1, 70], [2, 50], [3, 10], [4, 10], [5, 45], [6, 1], [7, 1], [8, 20], [11, 60]],
    drops: [[[1, 200], [0, 20, 50, 80], [15, 1, 1, 20]], [[10, 100], [53, 1, 2, 90], [54, 1, 2, 10]]], //[ [[chance to roll table, table roll size (min to max chance to roll)], [id, min, max, weight], ...] [table2...] ]
    characterModel: [0, 0, 0, 0, 0, 0], //head, torso, left leg, right leg, left arm, right arm
    equipmentModel: [23, 19, null, 44, 31], //head, right, left, chest, legs
    isGuard: true,
    entityGuildType: 'PLAYER_GUARD',
    actions: [{
        interfaceID: 0,
        id: 6,
        name: 'Attack'
    }],
},
Get.Character.Ghost(29, 'Ghost', 0, [[11, 10], [6, 5], [7, 5], [2, 10], [8, 1], [5, 10]], 78, 1, 5),// Air - [10hp, 5mfocus, 5mpower, 10def, 1 mdef, 10 range defence]
Get.Character.Ghost(30, 'Ghost ', 1, [[11, 18], [6, 10], [7, 15], [2, 25], [8, 1], [5, 25]], 79, 1, 20),// Water - [18hp, 10mfocus, 15mpower, 25def, 1 mdef, 25 range defence]
Get.Character.Ghost(31, 'Ghost ', 2, [[11, 40], [6, 18], [7, 28], [2, 50], [8, 1], [5, 50]], 80, 1, 80),// Earth - [40hp, 18mfocus, 28mpower, 50def, 1 mdef, 50 range defence]
Get.Character.Ghost(32, 'Ghost ', 3, [[11, 70], [6, 28], [7, 50], [2, 75], [8, 1], [5, 75]], 81, 1, 240),// Fire - [70hp, 28mfocus, 50mpower, 75def, 1 mdef, 75 range defence]
Get.Character.ElementalGhost(33, 'Elemental Ghost ', 4, [[11, 150], [6, 40], [7, 99], [2, 99], [8, 1], [5, 99]], [78, 79, 80, 81], 1, 960),// Elemental - [150hp, 40mfocus, 99mpower, 99def, 1 mdef, 99 range defence]
Get.Character.Crab(34, 'Cave Crawler', 1, [[11, 150], [6, 40], [7, 99], [2, 99], [8, 1], [5, 99]], [78, 79, 80, 81] ),
Get.Character.HumanShopOwner(35, 'Clothing Store Owner', 6, [null, null, null, 395, 491], HairStyle.Scruffy, SpriteColor.Black, 10),
Get.Character.Osaik(36), 
{
    id: 37,
    name: 'Mysterious Man',
    modelName: 'HUMANOID',
    stats: [[0, 30], [1, 40], [2, 40], [3, 30], [4, 40], [5, 40], [6, 30], [7, 40], [8, 40], [11, 40],],
    characterModel: [0, 0, 0, 0, 0, 0], //head, torso, left leg, right leg, left arm, right arm
    equipmentModel: [null, null, null, 100, 104], //head, right, left, chest, legs
    modelParams: {
        HAIR: {
            id: 'HAIR',
            asset: 'headParts',
            sprite: 'hairStyle' + HairStyle.MidlifeCrisis + '_',
            parent: 'HEAD',
            spriteID: SpriteColor.LightGray,
            anchor: {x: 0.5, y: 0.95},
            position: {x: 0, y: 0.1},
            rotation: 0,
            UIModel: null,
        },
        CHEST: { spriteID: 1},
        HEAD: { spriteID: 1},
        RIGHT_SHOULDER: { spriteID: 1},
        LEFT_SHOULDER: { spriteID: 1},
        RIGHT_FOREARM: { spriteID: 1},
        LEFT_FOREARM: { spriteID: 1},
        RIGHT_THIGH: { spriteID: 1},
        LEFT_THIGH: { spriteID: 1},
        RIGHT_SHIN: { spriteID: 1},
        LEFT_SHIN: { spriteID: 1},
    },
    actions: [{
        interfaceID: 0,
        id: 4,
        name: 'Talk To',
        steps: [
            [buildStep(StepType.PLAY_ANIMATION, {params: ['TALK_TO']}),
            buildStep(StepType.SHOW_DIALOG, {params: [3]})],
        ],
    },{
        interfaceID: 0,
        id: 12,
        name: 'Buy Standard',
        actionInterval: 0,
        steps: [
            [buildStep(StepType.SHOW_DIALOG, {params: [7]})],
        ],
    }],
    useActions: [{
        interfaceID: 0,
        id: 11,
        name: '',
        entityType: Entity.EntityType.INVENTORY_ITEM,
        entityID: 327,
        actionInterval: -1,
        steps: [
            buildStepList(StepList.WALK_ADJACENT),
            [buildStep(StepType.HAS_INVENTORY_ITEM, {params: [0, 1000]}),
            buildStep(StepType.RANDOMIZE_ITEM_STATE_ITEMID, {params: ['SLOT_ID_OTHER', 327]}),
            buildStep(StepType.REMOVE_INVENTORY_ITEM, {
                params: [0, 1000],
                stepResultPass: 'END_ACTION',
                stepResultFail: 'END_ACTION',
            })],
        ],
    }],
},
Get.Character.Wolf(38, 'Wolf', [[0, 60], [1, 40], [2, 40], [3, 1], [4, 1], [5, 30], [6, 1], [7, 1], [8, 50], [11, 60],], 
[[[1, 100], [515, 1, 1, 100]], [[1, 100], [0, 10, 50, 20], [551, 2, 5, 60], [551, 5, 10, 20]]], 1),
(() => {//[[0, 20], [1, 12], [2, 14], [3, 10], [4, 10], [5, 8], [6, 1], [7, 1], [8, 11], [11, 25],], 
    let aWolf = Get.Character.Wolf(39, 'Alpha Wolf', [[0, 200], [1, 120], [2, 140], [3, 100], [4, 100], [5, 80], [6, 1], [7, 1], [8, 110], [11, 250],], 
        [[[1, 100], [552, 1, 1, 100]], [[1, 140], [551, 10, 20, 55], [551, 20, 50, 55], [537, 1, 1, 5], [0, 100, 500, 5], [90, 1, 3, 10], [89, 2, 5, 10]], 
        [[128, 100], [537, 2, 4, 30], [551, 50, 250, 10], [559, 1, 1, 50]], Get.DropTables.LesserWoundSpellPages(512), Get.DropTables.WoundSpellPages(750)
        , Get.DropTables.ItemPickupPages(128)], 2);

    aWolf.isMultiTarget = true;

    aWolf.attackCooldown = 4;
    aWolf.combatStyle = Combat.CombatStyle.MELEE;
    aWolf.attackRange = 1;

    aWolf.secondaryAttackCooldown = 4;
    aWolf.secondaryCombatStyle = Combat.CombatStyle.RANGE;
    aWolf.secondaryAttackRange = 20;

    return aWolf;
})(), 
Get.Character.Crab(40, 'Crab', 1,  [[11, 30], [0, 30], [1, 30], [2, 30], [5, 30]],[[[1, 100], [0, 5, 10, 10], [0, 8, 20, 10], [55, 1, 2, 10], [13, 1, 1, 10], [87, 1, 1, 20], [88, 1, 1, 5], [47, 1, 2, 20], [48, 1, 1, 15]], [[512, 10], [536, 1, 1, 10]]] ),
Get.Character.Crab(41, 'Rockshell Crab', 2,  [[11, 60], [0, 25], [1, 35], [2, 55], [5, 60]],[[[1, 1], [549, 1, 3, 1]], [[1, 100], [0, 5, 15, 10], [0, 10, 25, 10], [55, 1, 1, 10], [56, 1, 1, 15], [87, 1, 2, 20], [88, 1, 1, 10], [47, 1, 2, 15], [48, 1, 1, 10]], [[364, 10], [536, 1, 1, 10]]] ),
Get.Character.Crab(42, 'Spiky Crab', 3,  [[11, 55], [0, 35], [1, 55], [2, 40], [5, 45]],[[[1, 1], [549, 3, 9, 1]], [[1, 100], [0, 5, 20, 10], [0, 20, 30, 10], [56, 1, 1, 10], [57, 1, 1, 10], [87, 1, 2, 20], [88, 1, 1, 15], [47, 1, 2, 10], [48, 1, 1, 10], [49, 1, 1, 5]], [[256, 10], [536, 1, 1, 10]]] ),
Get.Character.Crab(43, 'Box Turtle', 4,  [[11, 80], [0, 50], [1, 50], [2, 50], [5, 20], [8, 20]], [[[1, 100], [0, 10, 20, 10], [0, 20, 50, 10], [501, 10, 20, 20], [502, 5, 10, 10], [89, 1, 1, 5], [53, 1, 1, 5], [68, 1, 7, 15], [69, 1, 3, 15], [59, 1, 1, 10]], [[196, 10], [536, 1, 1, 10]]] ),
{
    id: 44,
    name: 'Cavern Supervisor',
    modelName: 'HUMANOID',
    stats: [[0, 20], [1, 20], [2, 20], [3, 10], [4, 10], [5, 10], [6, 1], [7, 1], [8, 1], [11, 20],],
    characterModel: [1, 1, 1, 1, 1, 1], //head, torso, left leg, right leg, left arm, right arm
    equipmentModel: [null, 10, 530, 347, 475], //head, right, left, chest, legs
    modelParams: {
        HAIR: {
            id: 'HAIR',
            asset: 'headParts',
            sprite: 'hairStyle' + HairStyle.Buzzed + '_',
            parent: 'HEAD',
            spriteID: SpriteColor.Black,
            anchor: {x: 0.5, y: 0.95},
            position: {x: 0, y: 0.1},
            rotation: 0,
            UIModel: null,
        },
        CHEST: { spriteID: 2},
        HEAD: { spriteID: 2},
        RIGHT_SHOULDER: { spriteID: 2},
        LEFT_SHOULDER: { spriteID: 2},
        RIGHT_FOREARM: { spriteID: 2},
        LEFT_FOREARM: { spriteID: 2},
        RIGHT_THIGH: { spriteID: 2},
        LEFT_THIGH: { spriteID: 2},
        RIGHT_SHIN: { spriteID: 2},
        LEFT_SHIN: { spriteID: 2},
    },
    actions: [{
        interfaceID: 0,
        id: 4,
        name: 'Talk To',
        steps: [
            buildStepList(StepList.WALK_ADJACENT),
            [buildStep(StepType.PLAY_ANIMATION, {params: ['TALK_TO']}),
            buildStep(StepType.SHOW_DIALOG, {params: [4]})],
        ],
    }]
},
Get.Character.Skeleton(45, 'Skeleton', 1,
    [[11, 40], [0, 40], [1, 60], [2, 50], [5, 50], [8, 15], ],
    [[[1, 100], [0, 8, 30, 20], [18, 1, 1, 20], [2, 1, 1, 10], [39, 1, 1, 1], [78, 1, 1, 9], [76, 5, 12, 17], [88, 1, 1, 10], [87, 1, 2, 8]], Get.DropTables.LesserWoundSpellPages(512), Get.DropTables.ItemPickupPages(128)],
    [22, 15, null, null, null]), //head, right, left, chest, legs
Get.Character.SkeletonRanged(46, 'Skeleton', 1,  
    [[11, 75], [2, 65], [3, 75], [4, 85], [5, 75], [8, 25]],
    [[[1, 100], [0, 8, 30, 20], [37, 1, 1, 20], [38, 1, 1, 10], [39, 1, 1, 1], [69, 3, 8, 9], [68, 2, 5, 17], [68, 4, 10, 10], [87, 1, 1, 8]], Get.DropTables.LesserWoundSpellPages(512), Get.DropTables.ItemPickupPages(128)],
    [106, 39, null, null, null], //head, right, left, chest, legs
    12),
    Get.Character.GoblinOrOrc(47, 'Orc', 1,  
    [[11, 156], [0, 140], [1, 80], [2, 80], [5, 50], [8, 40], ],
    [[[1, 100], [0, 3, 10, 100]]],
    4, 2),
Get.Character.GoblinOrcRanged(48, 'Orc', 2,  
    [[11, 136], [2, 100], [3, 120], [4, 100], [5, 120], [8, 80]],
    [[[1, 100], [0, 5, 15, 100]]],
    321, 12, 3),
Get.Character.Wizard(49, 'Dark Wizard', 3,  
    [[11, 125], [2, 65], [5, 60], [6, 140], [7, 145], [8, 90]],
    [[[1, 1], [76, 1, 1, 1]],[[1, 100], [0, 30, 100, 20], [90, 1, 3, 20], [537, 1, 1, 10], [16, 1, 1, 10], [78, 8, 16, 10], [79, 5, 10, 10], [81, 6, 15, 10], [126, 1, 2, 10]], Get.DropTables.EssenceShards(32, 100, 1000, [100, 100, 100, 100, 60, 60, 60, 60, 40, 40, 40, 40]), Get.DropTables.LesserWoundSpellPages(250), Get.DropTables.WoundSpellPages(500), Get.DropTables.GreaterWoundSpellPages(1000)],
    [null, 86, null, 100, 104],
    16), //head, right, left, chest, legs
Get.Character.GoblinOrcMage(50, 'Elder Goblin', 1,  
    [[11, 180], [2, 80], [5, 90], [6, 140], [7, 160], [8, 125]],
    [[[1, 100], [0, 10, 30, 100]]],
    85, 12 /* Attack range */ , 3 /* head sprite ID */),
Get.Character.GoblinOrcRangeMelee(51, 'King Orc', 3,  
    [[11, 216], [0, 160], [1, 140], [2, 140], [3, 120], [4, 100], [5, 160], [8, 125]],
    [[[1, 100], [0, 10, 30, 100]]],
    273, 9 /* Attack range */, 4),
Get.Character.ClayGolem(52, 'Clay Golem', 1, 1.15, 193, 9, 565, 568),
Get.Character.Golem(53, 'Copper Golem', 1, 1.25, 184, 9, 571, 574), // Fragment, Chunk
Get.Character.Golem(54, 'Iron Golem', 2, 1.5, 185, 10, 577, 580), // Fragment, Chunk
Get.Character.CoalGolem(55, 'Coal Golem', 1, 1.75, 186, 11, 583, 586), // Fragment, Chunk
Get.Character.Golem(56, 'Nelenite Golem', 3, 2.15, 187, 12, 589, 592), // Fragment, Chunk
Get.Character.Golem(57, 'Gothite Golem', 4, 2.5, 254, 279, 595, 598), // Fragment, Chunk
Get.Character.Golem(58, 'Osmium Golem', 5, 3.0, 282, 307, 601, 604), // Fragment, Chunk
Get.Character.Death(59, "Death", 666, [null, 610, null, 347, 491]),
Get.Character.PickPocketableHuman(60, 'Man', 2, [null, null, null, 455, 487], HairStyle.RightSideSwipe, SpriteColor.Black, 1),
Get.Character.PickPocketableHuman(61, 'Man', 2, [null, null, null, 449, 487], HairStyle.Scruffy, SpriteColor.DarkGray, 2),
Get.Character.PickPocketableHuman(62, 'Man', 2, [null, null, null, 451, 491], HairStyle.Mohawk, SpriteColor.Red, 5),
Get.Character.Human(63, "Indie Dev", 2, [null, null, null, 437, 483], HairStyle.Messy, SpriteColor.Purple, [
    {
        interfaceID: 0,
        id: 45,
        name: 'Take Brochure From',
    }
]),
Get.Character.Pinata(64, 1, 'Pinata'),
Get.Character.Patreoner(65, 'Sandwich', 2, [108, null, 630, 116, 112], HairStyle.Bald, SpriteColor.Black, 200 + 182, 8),
Get.Character.Patreoner(66, 'Redd', 2, [313, 299, 632, null, null], HairStyle.Messy, SpriteColor.Brown, 105 + 70, 9),
Get.Character.Patreoner(67, 'Aiden', 2, [null, 4, null, 385, 483], HairStyle.LeftSideSwipe, SpriteColor.Black, 220 + 0, 10),
Get.Character.Patreoner(68, 'WeSkillNow', 2, [null, null, null, 429, 487], HairStyle.Messy, SpriteColor.Red, 45 + 8, 11),
Get.Character.Patreoner(69, 'Thomas', 2, [93, 3, null, 393, 481], HairStyle.RightSideSwipe, SpriteColor.Brown, 50 + 18, 12),
Get.Character.Rat(70, 'Mouserat', 1, [[11, 3], [0, 0], [1, 0.25], [2, 1]], //3hp, 0atk, .5pow, 2def
    [[[1, 100], [730, 1, 1, 100]]]),
Get.Character.Kiaso(71),
Get.Character.Duck(72, 'Male Duck', 1),
Get.Character.Duck(73, 'Female Duck', 2),
Get.Character.Cow(74, 1),
Get.Character.HumanShopOwner(75, 'Farming Store Owner', 3, [null, 610, null, 331, 483], HairStyle.MidlifeCrisis, SpriteColor.Yellow, 11),
Get.Character.QuestChildGoblin(76, 'Child Goblin'),
Get.Character.Bull(77),
Get.Character.Sheep(78, 1),
Get.Character.PatreonQuestCat(79, true, 224),
Get.Character.PatreonQuestCat(80, false, 224),
];


