const ActionFlags = require('./Step').ActionFlags;
const ParameterMappingKeys = require('./Step').ParameterMappingKeys;
const StepList = require('./Step').StepList;
const StepResult = require('./Step').StepResult;
const StepType = require('./Step').StepType;
const buildStep = require('./Step').buildStep;
const buildStepList = require('./Step').buildStepList;
const CombatStyle = require('../internal/Combat').CombatStyle;
const Get = require('./Getter').Get;
const ItemStates = require('../def/interface/ItemStateDef').ItemStates;
const ItemDetail = require("./ItemDetail").ItemDetail;
const Entity = require('../typedef/Entity');
const Combat = require('../internal/Combat');
const SpriteColor = require("./Model").SpriteColor;
const HairColors = require("./Model").HairColors;
const EyeColors = require("./Model").EyeColors;
const HairStyle = require("./Model").HairStyle;
const FacialStyles = require("./Model").FacialStyles;
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
                // Mobile release fix (.default.)
                KingdomOfEloria.i.getMap(entity.mapID).spawnEntity(eggGroundItem);
                // Mobile release fix
            }
            return 30;
        })
    }
}, 
Get.Character.Human(1, 'Banker', 24, [null, null, null, 100, 104], HairStyle.LeftSideSwipe, HairColors.Black, [{
    interfaceID: 0,
    id: 7,
    name: 'Bank',
}, {
    interfaceID: 0,
    id: 11,
    name: 'Lost Items',
    actionInterval: 0,
    steps: [
        buildStepList(StepList.WALK_ADJACENT),
        [buildStep(StepType.PLAY_ANIMATION, {params: ['TALK_TO']}),
        buildStep(StepType.OPEN_LOST_ITEMS_INTERFACE)]
    ],
}]),
Get.Character.HumanShopOwner(2, 'General Store Owner', 11, [21, null, null, 42, 29], HairStyle.Bald, HairColors.Black, null, EyeColors.DarkBrown, 0),
Get.Character.HumanShopOwner(3, 'Woodcutting Store Owner', 11, [null, 4, null, 417, 477], HairStyle.RightSideSwipe, HairColors.DarkBrown, 6, EyeColors.DarkBrown, 1),
Get.Character.HumanShopOwner(4, 'Fishing Store Owner', 13, [null, null, null, 353, 477], 1, HairColors.Ginger, null, EyeColors.Blue, 2),
Get.Character.HumanShopOwner(5, 'Metalsmith Store Owner', 13, [22, 12, null, 43, 30], HairStyle.Bald,HairColors.Ginger, null, EyeColors.DarkBrown, 3),
Get.Character.HumanShopOwner(6, 'Mining Store Owner', 11, [null, 12, null, 42, 29], HairStyle.RightSideSwipe, HairColors.CherryRed, 7, EyeColors.Ginger, 4),
Get.Character.HumanShopOwner(7, 'Crafting Store Owner', 23, [null, null, null, 389, 487], HairStyle.Bald, HairColors.Gray, 7, EyeColors.Green, 5),
Get.Character.HumanShopOwner(8, 'Alchemy Store Owner', 14, [95, 86, null, 99, 103], HairStyle.Bald, HairColors.Black, null, EyeColors.DarkBrown, 6),
Get.Character.HumanShopOwner(9, 'Melee Store Owner', 11, [null, 20, null, 44, 31], HairStyle.RightSideSwipe, HairColors.Gray, 9, EyeColors.Blue, 7),
Get.Character.HumanShopOwner(10, 'Archery Store Owner', 11, [106, 38, null, 114, 110], HairStyle.RightSideSwipe, HairColors.White, 10, EyeColors.Green, 8),
Get.Character.HumanShopOwner(11, 'Magic Store Owner', 14, [96, 84, null, 100, 104], 3, HairColors.CherryRed, 8, EyeColors.Purple, 9),
Get.Character.Goblin(12, 'Goblin', 1,  
    [[11, 5], [0, 5], [1, 5], [2, 3]], ////5hp, 5atk, 5pow, 3def
    [[[1, 100], [0, 3, 10, 76], [13, 1, 1, 20], [127, 1, 1, 4],], [[10, 100], [79, 1, 3, 30], [87, 1, 1, 50], [126, 1, 1, 20],]], //80% chance for coins, 20% chance for copper dagger, and 1 in 10 chance for water essence or blue cloth //[ [[chance to roll table, table roll size (min to max chance to roll)], [id, min, max, weight], ...] [table2...] ]
    null),
Get.Character.Wizard(13, 'Wizard', 13,  
    [[11, 8], [2, 8], [5, 5], [6, 10], [7, 10], [8, 10]], //8hp, 8 atk def, 5 range def, 10 magic attack focus, 10 magic strength, 10 magic defense
    [[[1, 100], [0, 10, 10, 10], [0, 20, 50, 20], [87, 2, 3, 50], [88, 1, 1, 10], [126, 1, 2, 10]], [[1, 100], [78, 2, 6, 60], [126, 1, 2, 20], [79, 1, 3, 20]], [[2, 100], [80, 2, 3, 75], [81, 1, 2, 25]], [[100, 100], [80, 1, 2, 70], [81, 1, 1, 30]], Get.DropTables.ItemPickupPages(150), Get.DropTables.EssenceShards(4, 50, 120, [100, 100, 100, 100, 40, 60, 60, 60, 5, 0, 0, 0]), Get.DropTables.LesserWoundSpellPages(1024)], //[ [[chance to roll table, table roll size (min to max chance to roll)], [id, min, max, weight], ...] [table2...] ]
    [93, 83, null, 97, 101], //head, right, left, chest, legs
    8), //head, right, left, chest, legs
{
    id: 14,
    name: 'Chick',
    modelName: 'CHICK',
    spriteIndex: 6,
    animations: [[0, 8], [1, 8], [2, 8], [3, 8], [4, 8]],
    actions: [],
},
Get.Character.Human(15, 'Baroness', 32, [null, 299, 612, 44, 31, null, 674], 5, HairColors.Gray, [{
    interfaceID: 0,
    id: 4,
    name: 'Talk To',
    steps: [
        buildStepList(StepList.WALK_ADJACENT),
        [buildStep(StepType.PLAY_ANIMATION, {params: ['TALK_TO']}),
        buildStep(StepType.OPEN_ACTION_MENU_INTERFACE, {params: [[83, 84, 85, 86]]})]
    ],
}], 11, EyeColors.Purple ),
Get.Character.GoblinOrcRanged(16, 'Goblin', 1,  
    [[11, 22], [0, 15], [1, 15], [2, 12], [5, 8], [8, 8]], //22hp, 15atk, 15pow, 12meleedef, 8rangedef, 8magicdefence
    [[[1, 100], [0, 5, 15, 75], [37, 1, 1, 15], [127, 1, 1, 5], [38, 1, 1, 5]], [[1, 100], [68, 1, 5, 90], [69, 1, 2, 10]], Get.DropTables.ItemPickupPages(128)], //80% chance for coins, 20% chance for copper dagger, and 1 in 10 chance for water essence or blue cloth //[ [[chance to roll table, table roll size (min to max chance to roll)], [id, min, max, weight], ...] [table2...] ]
    37, 8, 2), // attack range
Get.Character.GoblinOrOrc(17, 'Orc', 1,  
    [[11, 4], [2, 2], [3, 6], [4, 6]], //4hp, 2 melee def, 6 range focus, 6 range power
    [[[1, 100], [0, 20, 50, 70], [14, 1, 1, 20], [17, 1, 1, 10]], [[10, 100], [79, 3, 8, 90], [30, 1, 1, 2], [127, 1, 1, 8]], [[512, 1], [636, 1, 1, 1]], Get.DropTables.ItemPickupPages(128)], //80% chance for coins, 20% chance for copper dagger, and 1 in 10 chance for water essence or blue cloth //[ [[chance to roll table, table roll size (min to max chance to roll)], [id, min, max, weight], ...] [table2...] ]
    18, 2), //head, right, left, chest, legs
Get.Character.GoblinOrcRanged(18, 'Orc', 1,  
    [[11, 18], [2, 8], [3, 16], [4, 16], [5, 10], [8, 12]], //18hp, 8 melee def, 16 range focus, 16 range power, 10rangedef, 12magicdefence
    [[[1, 100], [0, 20, 45, 70], [38, 1, 1, 19], [39, 1, 1, 1], [127, 1, 1, 5], [38, 1, 1, 5]], [[1, 100], [68, 3, 12, 50], [69, 2, 7, 40], [70, 1, 4, 10]], [[512, 10], [636, 1, 1, 6], [638, 1, 1, 3], [640, 1, 1, 1]], Get.DropTables.ItemPickupPages(128)], //80% chance for coins, 20% chance for copper dagger, and 1 in 10 chance for water essence or blue cloth //[ [[chance to roll table, table roll size (min to max chance to roll)], [id, min, max, weight], ...] [table2...] ]
    39, 8, 2), // Attack range
Get.Character.GoblinOrOrc(19, 'King Orc', 3,  
    [[11, 100], [0, 100], [1, 60], [2, 50], [5, 60], [8, 40]], //99hp, 45atk, 45pow, 35meleedef, 45rangedef, 30magicdefence
    [[[1, 100], [0, 50, 150, 100]], [[1, 100], [89, 1, 2, 50], [90, 1, 2, 50]], [[10, 100], [79, 5, 20, 50], [30, 1, 1, 5], [127, 1, 1, 15], [26, 1, 1, 15], [19, 1, 1, 15]], [[128, 10], [636, 1, 1, 6], [638, 1, 1, 3], [640, 1, 1, 1]], Get.DropTables.TeleportScrolls(256), Get.DropTables.ItemPickupPages(80)], //80% chance for coins, 20% chance for copper dagger, and 1 in 10 chance for water essence or blue cloth //[ [[chance to roll table, table roll size (min to max chance to roll)], [id, min, max, weight], ...] [table2...] ]
    19, 4), // head sprite ID
Get.Character.GoblinOrcMage(20, 'Elder Goblin', 1,  
    [[11, 30], [2, 15], [5, 10], [6, 30], [7, 40], [8, 25]], //30hp, 15 atk def, 10 range def, 30 magic attack focus, 40 magic strength, 25 magic defense
    [[[1, 100], [0, 10, 30, 100]], [[8, 100], [89, 1, 1, 55], [90, 1, 1, 45]], [[10, 100], [127, 1, 1, 25], [126, 1, 1, 35], [79, 5, 10, 10], [78, 5, 10, 10], [80, 5, 10, 10], [81, 5, 10, 10]], [[256, 10], [636, 1, 1, 6], [638, 1, 1, 3], [640, 1, 1, 1]], Get.DropTables.TeleportScrolls(400), Get.DropTables.ItemPickupPages(100)], //80% chance for coins, 20% chance for copper dagger, and 1 in 10 chance for water essence or blue cloth //[ [[chance to roll table, table roll size (min to max chance to roll)], [id, min, max, weight], ...] [table2...] ]
    85, 8 /* Attack range */ , 3 /* head sprite ID */),
Get.Character.GoblinOrcMage(21, 'Elder Goblin', 1,  
    [[11, 26], [2, 15], [5, 10], [6, 45], [7, 35], [8, 25]], //30hp, 15 atk def, 10 range def, 30 magic attack focus, 40 magic strength, 25 magic defense
    [[[1, 100], [0, 15, 35, 100]], [[8, 100], [89, 1, 1, 45], [90, 1, 1, 55]], [[10, 100], [127, 1, 1, 35], [126, 1, 1, 25], [79, 5, 10, 10], [78, 5, 10, 10], [80, 5, 10, 10], [81, 5, 10, 10]], [[256, 10], [636, 1, 1, 6], [638, 1, 1, 3], [640, 1, 1, 1]], Get.DropTables.TeleportScrolls(400), Get.DropTables.ItemPickupPages(100)], //80% chance for coins, 20% chance for copper dagger, and 1 in 10 chance for water essence or blue cloth //[ [[chance to roll table, table roll size (min to max chance to roll)], [id, min, max, weight], ...] [table2...] ]
    86, 8 /* Attack range */ , 3 /* head sprite ID */),
Get.Character.SmallRat(22, 'Small Rat', 1),
Get.Character.MediumRat(23, 'Rat', 1, [[11, 3], [0, 5], [1, 2], [2, 2]], [[[1, 100], [0, 5, 15, 100]]]), ////3hp, 5atk, 2pow, 2def),
Get.Character.Rat(24, 'Large Rat', 1, [[11, 12], [0, 12], [1, 4], [2, 3]], ////3hp, 5atk, 2pow, 2def),
    [[[1, 100], [0, 45, 80, 100]]]),
Get.Character.MeleeGuard(25, 'Guard', 3),
Get.Character.EmperorMeleeGuard(26, 'Emperor\'s Guard', 3),
Get.Character.GuildMaster(27, 'King', 0),
{
    id: 28,
    name: 'Player Guard',
    modelName: 'HUMANOID',
    spriteIndex: 7,
    stats: [[0, 30], [1, 70], [2, 50], [3, 10], [4, 10], [5, 45], [6, 1], [7, 1], [8, 20], [11, 60]],
    drops: [[[1, 200], [0, 20, 50, 80], [15, 1, 1, 20]], [[10, 100], [53, 1, 2, 90], [54, 1, 2, 10]]], //[ [[chance to roll table, table roll size (min to max chance to roll)], [id, min, max, weight], ...] [table2...] ]
    equipmentModel: [23, 19, null, 44, 31], //head, right, left, chest, legs
    isGuard: true,
    entityGuildType: 'PLAYER_GUARD',
    modelParams : {
        EYES : { tint : EyeColors.Green }
    },
    actions: [{
        interfaceID: 0,
        id: 6,
        name: 'Attack'
    }],
},
Get.Character.Ghost(29, 'Ghost', 0, [[11, 10], [6, 5], [7, 5], [2, 10], [8, 1], [5, 10]], 78, 1, 5),// Air - [10hp, 5mfocus, 5mpower, 10def, 1 mdef, 10 range defence]
Get.Character.Ghost(30, 'Ghost', 1, [[11, 18], [6, 10], [7, 15], [2, 25], [8, 1], [5, 25]], 79, 1, 20),// Water - [18hp, 10mfocus, 15mpower, 25def, 1 mdef, 25 range defence]
Get.Character.Ghost(31, 'Ghost', 2, [[11, 40], [6, 18], [7, 28], [2, 50], [8, 1], [5, 50]], 80, 1, 80),// Earth - [40hp, 18mfocus, 28mpower, 50def, 1 mdef, 50 range defence]
Get.Character.Ghost(32, 'Ghost', 3, [[11, 70], [6, 28], [7, 50], [2, 75], [8, 1], [5, 75]], 81, 1, 240),// Fire - [70hp, 28mfocus, 50mpower, 75def, 1 mdef, 75 range defence]
Get.Character.ElementalGhost(33, 'Elemental Ghost ', 4, [[11, 150], [6, 40], [7, 99], [2, 99], [8, 1], [5, 99]], [78, 79, 80, 81], 1, 960),// Elemental - [150hp, 40mfocus, 99mpower, 99def, 1 mdef, 99 range defence]
Get.Character.Crab(34, 'Cave Crawler', 1, [[11, 150], [6, 40], [7, 99], [2, 99], [8, 1], [5, 99]], null),
Get.Character.HumanAppearanceShopOwner(35, 'Clothing Store Owner', 36, [null, null, null, 395, 491], HairStyle.Scruffy, HairColors.Black, 1, EyeColors.Purple, 2),
Get.Character.Osaik(36), 
{
    id: 37,
    name: 'Mysterious Man',
    modelName: 'HUMANOID',
    stats: [[0, 30], [1, 40], [2, 40], [3, 30], [4, 40], [5, 40], [6, 30], [7, 40], [8, 40], [11, 40],],
    equipmentModel: [null, null, null, 100, 104], //head, right, left, chest, legs
    modelParams: {
        HAIR: {
            id: 'HAIR',
            asset: 'headParts',
            sprite: 'hairStyle' + HairStyle.MidlifeCrisis + '_',
            parent: 'HEAD',
            spriteID : 4,
            tint:  HairColors.DarkBrown,
            anchor: {x: 0.5, y: 25/38},
            position: {x: 0, y: 0},
            rotation: 0,
            UIModel: null,
        },
        FACE: {
            spriteID : 8
        },
        CHEST: { spriteID: 21},
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
    equipmentModel: [null, 10, 530, 347, 475], //head, right, left, chest, legs
    modelParams: {
        HAIR: {
            id: 'HAIR',
            asset: 'headParts',
            sprite: 'hairStyle' + HairStyle.Buzzed + '_',
            parent: 'HEAD',
            spriteID : 0,
            tint:  0x333333,
            anchor: {x: 0.5, y: 25/38},
            position: {x: 0, y: 0},
            rotation: 0,
            UIModel: null,
        },
        CHEST: { spriteID: 12},
        HEAD: { spriteID: 2},
        RIGHT_SHOULDER: { spriteID: 2},
        LEFT_SHOULDER: { spriteID: 2},
        RIGHT_FOREARM: { spriteID: 2},
        LEFT_FOREARM: { spriteID: 2},
        RIGHT_THIGH: { spriteID: 2},
        LEFT_THIGH: { spriteID: 2},
        RIGHT_SHIN: { spriteID: 2},
        LEFT_SHIN: { spriteID: 2},
        EYES: { tint : SpriteColor.Brown }
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
Get.Character.Wizard(49, 'Dark Wizard', 13,  
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
Get.Character.PickPocketableHuman(60, 'Man', 22, [null, null, null, 455, 487], HairStyle.RightSideSwipe, HairColors.Black, 1),
Get.Character.PickPocketableHuman(61, 'Woman', 32, [null, null, null, 345, 491], 7, HairColors.Brown, 2),
Get.Character.PickPocketableHuman(62, 'Man', 12, [null, null, null, 429, 477], HairStyle.Mohawk, HairColors.CherryRed, 5),
Get.Character.Human(63, "Indie Dev", 22, [null, null, null, 437, 483], HairStyle.Messy,  HairColors.Purple, [
    {
        interfaceID: 0,
        id: 45,
        name: 'Take Brochure From',
    }
]),
Get.Character.Pinata(64, 1, 'Pinata'),
Get.Character.Patreoner(65, 'Sandwich', 22, [null, null, 630, 357, 489], 4, HairColors.White, EyeColors.Brown, FacialStyles.Beard_Elder, 220 + 182, 8),
Get.Character.Patreoner(66, 'Redd', 22, [313, 299, 632, null, null], 8, HairColors.Blue, EyeColors.Brown, FacialStyles.Beard_Medium, 125 + 70, 9),
Get.Character.Patreoner(67, 'Aiden', 22, [null, 4, null, 385, 483], 1, HairColors.Black, EyeColors.Brown, FacialStyles.Freckles, 280 + 0, 10),
Get.Character.Patreoner(68, 'WeSkillNow', 22, [null, null, null, 429, 477], 1, HairColors.CherryRed, EyeColors.Green, null, 55 + 8, 11),
Get.Character.Patreoner(69, 'Thomas', 22, [93, 3, null, 393, 481], 1, HairColors.Brown, EyeColors.Brown, FacialStyles.Freckles, 65 + 18, 12),
Get.Character.Rat(70, 'Mouserat', 1, [[11, 3], [0, 0], [1, 0.25], [2, -1]], //3hp, 0atk, .5pow, 2def
    [[[1, 100], [730, 1, 1, 100]]]),
Get.Character.Kiaso(71),
Get.Character.Duck(72, 'Male Duck', 1),
Get.Character.Duck(73, 'Female Duck', 2),
Get.Character.Cow(74, 1),
Get.Character.HumanShopOwner(75, 'Farming Store Owner', 13, [null, 610, null, 331, 483], HairStyle.MidlifeCrisis, HairColors.Blond, null, EyeColors.DarkBrown, 11),
Get.Character.QuestChildGoblin(76, 'Child Goblin'),
Get.Character.Bull(77),
Get.Character.Sheep(78, 1),
Get.Character.PatreonQuestCat(79, true, 224),
Get.Character.PatreonQuestCat(80, false, 224),
Get.Character.HumanAppearanceShopOwner(81, 'Barber', 13, [null, null, null, 393, 489], HairStyle.MidlifeCrisis, HairColors.Brown, null, EyeColors.Blue, 0),
Get.Character.KaityPatreon(82, 50, 60),
Get.Character.HumanAppearanceShopOwner(83, 'Wizard Surgeon', 13, [539, null, null, 541, 543], 4, HairColors.Blue, null, EyeColors.DarkBrown, 3),
Get.Character.PatreonPim(84),
Get.Character.PatreonTat(85),
Get.Character.Patreoner(86, 'Aeronic', 22, [null, null, null, 407, 479], 8, HairColors.Brown, EyeColors.Brown, FacialStyles.Beard_Short, 40 + 6, 70),
Get.Character.TeragonMeleeGuard(87, 'Guard', 3), // Mining Steel Guard
Get.Character.TeragonMeleeGuard(88, 'Guard', 4), // Mining Nelenite Guard
Get.Character.TeragonMeleeGuard(89, 'Elite Guard', 5),  // Mining Gothite Guard
Get.Character.TeragonMeleeGuard(90, 'Elite Guard', 6), // Mining Osmium Guard
Get.Character.EmperorMeleeGuard(91, 'Emperor\'s Guard', 3), // Emperor Steel Guards
Get.Character.EmperorMeleeGuard(92, 'Emperor\'s Guard', 4), // Emperor Nelenite Guard
Get.Character.EmperorMeleeGuard(93, 'Emperor\'s Elite Guard', 5), // Emperor Gothite Guard
Get.Character.EmperorMeleeGuard(94, 'Emperor\'s Elite Guard', 6), // Emperor Osmium Guard
Get.Character.GuildMaster(95, 'Tergaron Guild Master', 0), // Mining
Get.Character.GuildMaster(96, 'Salmo Guild Master', 1), // Fishing
Get.Character.GuildMaster(97, 'Acernis Guild Master', 2), // Woodcutting
Get.Character.Emperor(98, 'Emperor of Eloria'), // Dark Magic 
Get.Character.EmperorGeneral(99, 'Emperor\'s General'),
Get.Character.EmperorMagicGuard(100, 'Grand Sorcerer', 3),
Get.Character.EmperorMagicGuard(101, 'Elite Sorcerer', 2),
Get.Character.EmperorMagicGuard(102, 'Sorcerer\'s Apprentice', 2),
Get.Character.TeragonThakod(103), // Mining Dwaft Thakod, #2 rank
Get.Character.TeragonSwordsman(104, 'Swordsman\'s Apprentice', 2), // Mining Swordsman's apprentice
Get.Character.TeragonSwordsman(105, 'Swordsman', 5), // Mining swordsman
Get.Character.SalmoTune(106), // Fishing Tune, #2 rank
Get.Character.SalmoMeleeGuard(107, 'Guard', 3),  // Fishing Steel Guard
Get.Character.SalmoMeleeGuard(108, 'Guard', 4), // Fishing Nelenite Guard
Get.Character.SalmoMeleeGuard(109, 'Elite Guard', 5),  // Fishing Gothite Guard
Get.Character.SalmoMeleeGuard(110, 'Elite Guard', 6), // Fishing Osmium Guard
Get.Character.SalmoRangeGuard(111, 'Archer', 2), // Fishing Archer
Get.Character.AcernisTisha(112), // Woodcutting Elf Tisha, rank #2
Get.Character.AcernisMeleeGuard(113, 'Guard', 3),  // Woodcutting Steel Guard
Get.Character.AcernisMeleeGuard(114, 'Guard', 4), // Woodcutting Nelenite Guard
Get.Character.AcernisMeleeGuard(115, 'Elite Guard', 5), // Woodcutting Gothite Guard
Get.Character.AcernisMeleeGuard(116, 'Elite Guard', 6), // Woodcutting Osmium Guard
Get.Character.AcernisRangeGuard(117, 'Archer', 2), // Woodcutting Archer
Get.Character.AcernisRangeGuard(118, 'Elite Archer', 6), // Woodcutting Elite Archer
Get.Character.TrainingGuide(119, 0), // Training Mining Guild Guide
Get.Character.TrainingGuide(120, 1), // Training Fishing Guilde Guide
Get.Character.TrainingGuide(121, 2), // Training Woodcutting Guilde Guide
Get.Character.TourGuide(122, 0), // Upstairs Mining Guild Guide
Get.Character.TourGuide(123, 1), // Upstairs Fishing Guilde Guide
Get.Character.TourGuide(124, 2), // Upstairs Woodcutting Guilde Guide
Get.Character.Human(125, 'Doctor', 23, [null, null, null, 363, 489], 4, HairColors.Gray, [{
    interfaceID: 0,
    id: 4,
    name: 'Talk To',
    steps: [
        buildStepList(StepList.WALK_ADJACENT),
        [
            buildStep(StepType.PLAY_ANIMATION, {params: ['TALK_TO']}),
            buildStep(StepType.SHOW_DIALOG, { params: [20] } )
        ]
    ],
}], 7, EyeColors.Blue ),
Get.Character.BabyDragon(126, 'Baby Blue Dragon', 1, [[11, 3], [0, 0], [1, 0.5], [2, 2]]),	Get.Character.BabyDragon(87, 'Baby Blue Dragon', 1, [[11, 3], [0, 0], [1, 0.5], [2, 2]]),
Get.Character.AdolescentDragon(127, 'Baby Green Dragon', 2, [[11, 3], [0, 0], [1, 0.5], [2, 2]]),	Get.Character.AdolescentDragon(88, 'Adolescent Blue Dragon', 2, [[11, 3], [0, 0], [1, 0.5], [2, 2]]),
Get.Character.BabyDragon(128, 'Baby Red Dragon', 3, [[11, 3], [0, 0], [1, 0.5], [2, 2]]),	Get.Character.BabyDragon(89, 'Baby Red Dragon', 3, [[11, 3], [0, 0], [1, 0.5], [2, 2]]),
Get.Character.Wasp(130),
];
