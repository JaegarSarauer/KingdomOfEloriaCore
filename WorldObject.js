const ActionFlags = require('./Step').ActionFlags;
const ParameterMappingKeys = require('./Step').ParameterMappingKeys;
const StepList = require('./Step').StepList;
const StepResult = require('./Step').StepResult;
const StepType = require('./Step').StepType;
const StepTypeClassDictionary = require('./Step').StepTypeClassDictionary;
const buildStep = require('./Step').buildStep;
const buildStepList = require('./Step').buildStepList;
const Entity = require('../typedef/Entity');
const Get = require('./Getter').Get;
const ItemDetail = require("./ItemDetail").ItemDetail;


module.exports.WorldObject = WorldObject = [
    Get.WorldObject.Tree(0, 5, undefined, 1, 0, 15, 4, 25, 5, 16, 'A common tree.'),
    Get.WorldObject.Tree(1, 6, 'Oak', 10, 1, 20, 5, 50, 10, 32, 'A grand oak tree.'),
    Get.WorldObject.Tree(2, 7, 'Ash', 20, 2, 25, 6, 75, 15, 48, 'A tall ash tree.'),
    Get.WorldObject.Tree(3, 8, 'Fur', 30, 3, 30, 7, 100, 20, 64, 'A mighty fur tree.'),
    Get.WorldObject.Rock(4, 'Copper Rock', 1, [10, 15, 4, true, 0.5, 0.5], [[55, 1, 1, 100]], 25, 1, 8, 4, 'There appears to be copper in this rock.', 12, 572, 575), 
    Get.WorldObject.Rock(5, 'Iron Rock', 10, [10, 20, 5, true, 0.5, 0.5], [[56, 1, 1, 100]], 50, 2, 16, 6, 'There appears to be iron in this rock.', 11, 578, 581), 
    Get.WorldObject.Rock(6, 'Coal Rock', 20, [10, 25, 6, true, 0.5, 0.5], [[57, 1, 1, 100]], 75, 3, 24, 8, 'There appears to be coal in this rock.', 10, 584, 587), 
    Get.WorldObject.Rock(7, 'Nelenite Rock', 30, [10, 30, 7, true, 0.5, 0.5], [[58, 1, 1, 100]], 100, 4, 32, 10, 'There appears to be nelenite in this rock.', 9, 590, 593),  
    {
        id: 8,
        name: 'Fire',
        description: 'Hot! Good for cooking.',
        requirements: ItemDetail.build([
            ItemDetail.levelSkillDetail('1+', 17, 'CRAFT'),
        ]),
        modelName: 'ROCK',
        modelParams: {
            BASE: {
                asset: 'worldObjects_Fire',
                sprite: 'fire',
                spriteID: 0,
            }
        },
        actions: [],
        useActions: [
            Get.Action.Cook(11, 47, 51, 119, 1, 'shrimp', 10, 10, 35), 
            Get.Action.Cook(49, 785, 787, 789, 5, 'freshwater tuna', 10, 25, 50),
            Get.Action.Cook(12, 48, 52, 120, 10, 'sardine', 10, 25, 70),
            Get.Action.Cook(13, 49, 53, 121, 20, 'herring', 10, 40, 105),
            Get.Action.Cook(14, 50, 54, 122, 30, 'mullet', 10, 55, 140), 
            Get.Action.Cook(15, 232, 234, 236, 40, 'boxfish', 10, 70, 175), 
            Get.Action.Cook(16, 241, 243, 245, 50, 'rockfish', 10, 75, 200),
            Get.Action.Cook(17, 247, 249, 251, 60, 'starslug', 10, 80, 215),
            Get.Action.Cook(18, 752, 754, 756, 1, 'steak', 1, 10, 30),
            Get.Action.CannotCookFish(47, 732, 'an egg', 'a fire'),
            Get.Action.Cook(48, 738, 740, 742, 1, 'raw chicken', 1, 8, 25),
        ],//cook
        spriteIndex: 9,
    }, 
    Get.WorldObject.ShallowFishingPool(9),
    {
        id: 10,
        name: 'Furnace',
        description: 'A hot metal oven for melting metal.',
        requirements: ItemDetail.build([
            ItemDetail.levelSkillDetail('1+', 14, 'USE'),
        ]),
        modelName: 'ROCK',
        modelParams: {
            BASE: {
                asset: 'worldObjects_Smithing',
                sprite: 'furnace',
                spriteID: 0,
            }
        },
        actions: [{
            interfaceID: 0,
            id: 10,
            name: 'Smelt',
            steps: [
                buildStepList(StepList.WALK_ADJACENT),
                [buildStep(StepType.PLAY_ANIMATION, { params: ['SWAY'] }),
                buildStep(StepType.OPEN_ACTION_MENU_INTERFACE, { params: [[8, 9, 10, 256, 11, 116, 129]] })]
            ],
        }, {
            interfaceID: 0,
            id: 20,
            name: 'Fire',
            steps: [
                buildStepList(StepList.WALK_ADJACENT),
                [buildStep(StepType.PLAY_ANIMATION, { params: ['ACTION_RIGHTHAND'] }),
                buildStep(StepType.OPEN_ACTION_MENU_INTERFACE, { params: [[74]] })]
            ],
        }, {
            interfaceID: 0,
            id: 22,
            name: 'Upgrade',
            steps: [
                buildStepList(StepList.WALK_ADJACENT),
                [buildStep(StepType.PLAY_ANIMATION, { params: ['ACTION_BOTHHANDS'] }),
                buildStep(StepType.OPEN_ACTION_MENU_INTERFACE, { params: [[102]] })]
            ],
        }],
        useActions: [{
            interfaceID: 0,
            id: 11,
            name: 'Craft',
            entityType: Entity.EntityType.INVENTORY_ITEM,
            entityID: 672,
            actionInterval: 0,
            steps: [
                buildStepList(StepList.WALK_ADJACENT),
                [buildStep(StepType.OPEN_ACTION_MENU_INTERFACE, { params: [[271, 272]] })]
            ],
        }],
        spriteIndex: 11,
    }, {
        id: 11,
        name: 'Anvil',
        description: 'Used for hammering metal into objects. Use a metal bar on it to smith.',
        requirements: ItemDetail.build([
            ItemDetail.levelSkillDetail('1+', 14, 'USE'),
            ItemDetail.itemNameDetail('Hammer', 'TOOL_NAME'),
        ]),
        modelName: 'ROCK',
        modelParams: {
            BASE: {
                asset: 'worldObjects_Smithing',
                sprite: 'anvil',
                spriteID: 0,
            }
        },
        actions: [],
        // actions: [{
        //     interfaceID: 0,
        //     id: 22,
        //     name: 'Upgrade',
        //     steps: [
        //         buildStepList(StepList.WALK_ADJACENT),
        //         [buildStep(StepType.PLAY_ANIMATION, {params: [3, false]}),
        //         buildStep(StepType.OPEN_ACTION_MENU_INTERFACE, {params: [[]]})]
        //     ],
        // }],
        useActions: [
            Get.Action.AnvilSmithList(11, 59, [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]), 
            Get.Action.AnvilSmithList(12, 60, [24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35]), 
            Get.Action.AnvilSmithList(13, 61, [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47]),
            Get.Action.AnvilSmithList(14, 62, [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59]),
            Get.Action.AnvilSmithList(15, 255, [117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128]),
            Get.Action.AnvilSmithList(16, 283, [130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141]),
        ],
        spriteIndex: 12,
    }, 
    Get.WorldObject.Flax(12),
    {
        id: 13,
        name: 'Spinning Wheel',
        description: 'A wheel for spinning fibers into threads.',
        requirements: ItemDetail.build([
            ItemDetail.levelSkillDetail('1+', 15, 'USE'),
        ]),
        modelName: 'ROCK',
        modelParams: {
            BASE: {
                asset: 'worldObjects_Crafting',
                sprite: 'wheel',
                spriteID: 0,
            }
        },
        actions: [{
            interfaceID: 0,
            id: 18,
            name: 'Spin',
            steps: [
                buildStepList(StepList.WALK_ADJACENT),
                [buildStep(StepType.PLAY_ANIMATION, { params: ['ACTION_BOTHHANDS'] }),
                buildStep(StepType.OPEN_ACTION_MENU_INTERFACE, { params: [[266, 270, 60, 154]] })]
            ],
        }],
        useActions: [],
        spriteIndex: 14,
    }, 
    {
        id: 14,
        name: 'Clay Rock',
        description: 'A rock with clay deposits.',
        requirements: ItemDetail.build([
            ItemDetail.levelSkillDetail('1', 10, 'MINE'),
            ItemDetail.itemNameDetail('Pickaxe', 'TOOL_NAME'),
        ]),
        modelName: 'ROCK',
        modelParams: {
            BASE: {
                spriteID: 0,
            }
        },
        actions: [{
            interfaceID: 0,
            id: 3,
            name: 'Mine',
            steps: [
                buildStepList(StepList.WALK_ADJACENT),
                [buildStep(StepType.HAS_SKILL_LEVEL, { params: [10, 1] }),
                buildStep(StepType.HAS_INVENTORY_ITEM_GROUP, { params: [2] }),
                buildStep(StepType.SEND_CLIENT_MESSAGE, { params: ['You attempt to mine some clay.'] }),
                buildStep(StepType.SET_ACTION_INTERVAL, { params: [2] })],
                [buildStep(StepType.HAS_SKILL_LEVEL, { params: [10, 1] }),
                buildStep(StepType.HAS_INVENTORY_ITEM_GROUP, { params: [2] }),
                buildStep(StepType.INVENTORY_HAS_ROOM),
                buildStep(StepType.SET_PARAMETER_BEST_TOOL_POWER, { params: [10, 2] }),
                buildStep(StepType.PLAY_ANIMATION, { params: ['MINE', {repeat: 2}] }),
                buildStep(StepType.PLAY_SOUND, { params: [22] }),
                buildStep(StepType.ROLL_SKILL_SUCCESS, {
                    params: [10, 15, 4, true, 0.5, 0.5],
                    stepResultFail: StepResult.END_AND_REPEAT_STEP_LIST
                }),
                buildStep(StepType.ROLL_DROP_TABLE, { 
                    params: [1, [[75, 1, 1, 100]]],
                    stepResultFail: StepResult.NEXT_STEP
                })],
                [buildStep(StepType.ROLL_SPECIAL_ITEM, { params: [6, 566, 'rollDropRateMultiplier'] }),
                buildStep(StepType.ROLL_DROP_TABLE, { 
                    params: [1, [[75, 1, 1, 100]]],
                    stepResultFail: StepResult.NEXT_STEP
                }),
                buildStep(StepType.SEND_CLIENT_MESSAGE, { params: ['Your necklace grants you an additional ore.'] }),],
                [buildStep(StepType.GIVE_XP, { params: [10, 12] }),
                buildStep(StepType.ROLL_RANDOM_EVENT, {params: [250, [0]]}),
                buildStep(StepType.SEND_CLIENT_MESSAGE, { params: ['You mine some clay.'] })],
                [buildStep(StepType.ROLL_SPECIAL_ITEM, { 
                    params: [6, 569, 'rollResourceDepletionSkipChance'],
                    stepResultPass: StepResult.NEXT_STEP,
                    stepResultFail: StepResult.NEXT_STEP_LIST,
                }),
                buildStep(StepType.SEND_CLIENT_MESSAGE, { 
                    params: ['Your necklace prevents the resource from depleting.'],
                    stepResultPass: StepResult.END_AND_GOTO_LIST_3,
                    stepResultFail: StepResult.END_AND_GOTO_LIST_3,
                })],
                [buildStep(StepType.ROLL_DESPAWN, {
                    params: [10],
                    stepResultFail: StepResult.END_AND_GOTO_LIST_3,
                }),
                buildStep(StepType.SET_RESPAWN_TIMER, { params: [6] }),
                buildStep(StepType.PLAY_SOUND, {
                    params: [40],
                    stepResultPass: 'END_ACTION'
                })]
            ],
        }],
        spriteIndex: 15,
    }, {
        id: 15,
        name: 'Pottery Wheel',
        description: 'A wheel for wetting and spinning clay into objects.',
        requirements: ItemDetail.build([
            ItemDetail.levelSkillDetail('10+', 15, 'USE'),
        ]),
        modelName: 'ROCK',
        modelParams: {
            BASE: {
                asset: 'worldObjects_Crafting',
                sprite: 'potteryWheel',
                spriteID: 0,
            }
        },
        actions: [{
            interfaceID: 0,
            id: 18,
            name: 'Craft',
            steps: [
                buildStepList(StepList.WALK_ADJACENT),
                [buildStep(StepType.PLAY_ANIMATION, { params: ['ACTION_BOTHHANDS'] }),
                buildStep(StepType.OPEN_ACTION_MENU_INTERFACE, { params: [[73]] })]
            ],
        }, {
            interfaceID: 0,
            id: 22,
            name: 'Upgrade',
            steps: [
                buildStepList(StepList.WALK_ADJACENT),
                [buildStep(StepType.PLAY_ANIMATION, { params: ['ACTION_BOTHHANDS'] }),
                buildStep(StepType.OPEN_ACTION_MENU_INTERFACE, { params: [[109]] })]
            ],
        }],
        useActions: [],
        spriteIndex: 16,
    }, 
    Get.WorldObject.LumberCamp(16, undefined, 5, 0, 1, 5, 1, 10),
    Get.WorldObject.LumberCamp(17, 'Oak', 6, 1, 2, 10, 10, 20),
    Get.WorldObject.LumberCamp(18, 'Ash', 7, 2, 3, 15, 20, 30),
    Get.WorldObject.LumberCamp(19, 'Fur', 8, 3, 4, 20, 30, 40), 
    Get.WorldObject.FisheryCamp(20, 'Shallow Pool Fishery', 9, 2, 'shallow fishing pool', 10, 20),
    Get.WorldObject.MiningCamp(21, 'Copper', 55, [[1, 4]], 1, 5, 1, 10),
    Get.WorldObject.MiningCamp(22, 'Clay', 75, [[1, 14]], 1, 5, 1, 10),
    Get.WorldObject.MiningCamp(23, 'Iron', 56, [[1, 5]], 2, 10, 10, 20),
    Get.WorldObject.MiningCamp(24, 'Coal', 57, [[1, 6], [1, 83]], 3, 15, 20, 30),
    Get.WorldObject.MiningCamp(25, 'Nelenite', 58, [[1, 7]], 4, 20, 30, 40),
    {
        id: 26,
        name: 'Steel Furnace',
        description: 'An upgraded version of the furnace for faster ore processing.',
        requirements: ItemDetail.build([
            ItemDetail.levelSkillDetail(35, 14, 'CRAFT'),
            ItemDetail.levelSkillDetail(25, 18, 'CRAFT'),
            ItemDetail.levelSkillDetail(25, 14, 'USE'),
            ItemDetail.itemNameDetail('Hammer', 'TOOL_NAME'),
        ]),
        modelName: 'ROCK',
        modelParams: {
            BASE: {
                asset: 'worldObjects_Smithing',
                sprite: 'furnace',
                spriteID: 1,
            }
        },
        upgradeActionInterval: 2,
        actions: [{
            interfaceID: 0,
            id: 10,
            name: 'Smelt',
            steps: [
                buildStepList(StepList.WALK_ADJACENT),
                [buildStep(StepType.PLAY_ANIMATION, { params: ['SWAY'] }),
                buildStep(StepType.OPEN_ACTION_MENU_INTERFACE, { params: [[8, 9, 10, 256, 11, 116, 129]] })]
            ],
        }, {
            interfaceID: 0,
            id: 20,
            name: 'Fire',
            steps: [
                buildStepList(StepList.WALK_ADJACENT),
                [buildStep(StepType.PLAY_ANIMATION, { params: ['ACTION_RIGHTHAND'] }),
                buildStep(StepType.OPEN_ACTION_MENU_INTERFACE, { params: [[74]] })]
            ],
        },
        {
            interfaceID: 0,
            id: 29,
            name: 'Check',
            actionInterval: 0,
        },
        {
            interfaceID: 0,
            id: 28,
            name: 'Disassemble',
            actionInterval: 0,
            steps: [
                [buildStep(StepType.OPEN_ACTION_MENU_INTERFACE, { params: [[89, 88]] })]
            ],
        }],
        useActions: [],
        spriteIndex: 29,
    }, {
        id: 27,
        name: 'Fur Pottery Wheel',
        description: 'An upgraded version of the pottery wheel for faster clay processing.',
        requirements: ItemDetail.build([
            ItemDetail.levelSkillDetail(40, 15, 'CRAFT'),
            ItemDetail.levelSkillDetail(30, 18, 'CRAFT'),
            ItemDetail.levelSkillDetail(30, 15, 'USE'),
            ItemDetail.itemNameDetail('Saw', 'TOOL_NAME'),
        ]),
        modelName: 'ROCK',
        modelParams: {
            BASE: {
                asset: 'worldObjects_Crafting',
                sprite: 'potteryWheel',
                spriteID: 1,
            }
        },
        upgradeActionInterval: 2,
        actions: [{
            interfaceID: 0,
            id: 18,
            name: 'Craft',
            steps: [
                buildStepList(StepList.WALK_ADJACENT),
                [buildStep(StepType.PLAY_ANIMATION, { params: ['ACTION_BOTHHANDS'] }),
                buildStep(StepType.OPEN_ACTION_MENU_INTERFACE, { params: [[73]] })]
            ],
        },
        {
            interfaceID: 0,
            id: 29,
            name: 'Check',
            actionInterval: 0,
        },
        {
            interfaceID: 0,
            id: 28,
            name: 'Disassemble',
            actionInterval: 0,
            steps: [
                [buildStep(StepType.OPEN_ACTION_MENU_INTERFACE, { params: [[89, 88]] })]
            ],
        }],
        useActions: [],
        spriteIndex: 39,
    }, {
        id: 28,
    }, {
        id: 29,
    }, {
        id: 30,
    }, {
        id: 31,
        name: 'Range',
        description: 'A cooking range for cooking food on.',
        requirements: ItemDetail.build([
            ItemDetail.levelSkillDetail('1+', 13, 'USE'),
        ]),
        actions: [{
            interfaceID: 0,
            id: 22,
            name: 'Upgrade',
            steps: [
                buildStepList(StepList.WALK_ADJACENT),
                [buildStep(StepType.PLAY_ANIMATION, { params: ['ACTION_BOTHHANDS'] }),
                buildStep(StepType.OPEN_ACTION_MENU_INTERFACE, { params: [[205]] })]
            ],
        }],
        useActions: [
            Get.Action.Cook(11, 47, 51, 119, 1, 'shrimp', 10, 10, 35), 
            Get.Action.Cook(49, 785, 787, 789, 5, 'freshwater tuna', 10, 25, 50),
            Get.Action.Cook(12, 48, 52, 120, 10, 'sardine', 10, 25, 70),
            Get.Action.Cook(13, 49, 53, 121, 20, 'herring', 10, 40, 105),
            Get.Action.Cook(14, 50, 54, 122, 30, 'mullet', 10, 55, 140), 
            Get.Action.Cook(15, 232, 234, 236, 40, 'boxfish', 10, 70, 175), 
            Get.Action.Cook(16, 241, 243, 245, 50, 'rockfish', 10, 75, 200),
            Get.Action.Cook(17, 247, 249, 251, 60, 'starslug', 10, 80, 215),
            Get.Action.Cook(18, 752, 754, 756, 1, 'steak', 1, 10, 30),
            Get.Action.Cook(47, 732, 734, 736, 1, 'egg', 1, 8, 25),
            Get.Action.Cook(48, 738, 740, 742, 1, 'raw chicken', 1, 8, 25),
            Get.Action.Cook(55, 763, 765, 767, 10, 'meat pie', 10, 25, 70, 4, 761),
            Get.Action.Cook(56, 769, 771, 773, 8, 'chicken pot pie', 10, 23, 60, 4, 761),
            Get.Action.Cook(57, 775, 777, 779, 14, 'cake', 10, 38, 90, 4, 761),
        ],//cook
        modelName: 'ROCK',	
        modelParams: {	
            BASE: {	
                asset: 'worldObjects_Range',	
                sprite: 'range',	
                spriteID: 0,	
            }	
        },
    }, {
        id: 32,
        name: 'Iron Range',
        description: 'A cooking range for cooking food on. There are two elements on this range.',
        requirements: ItemDetail.build([
            ItemDetail.levelSkillDetail('20+', 13, 'USE'),
            ItemDetail.levelSkillDetail(10, 18, 'CRAFT'),
            ItemDetail.itemNameDetail('Saw', 'TOOL_NAME'),
        ]),
        actions: [{
                interfaceID: 0,
                id: 29,
                name: 'Check',
                actionInterval: 0,
            },
            {
                interfaceID: 0,
                id: 28,
                name: 'Disassemble',
                actionInterval: 0,
                steps: [
                    [buildStep(StepType.OPEN_ACTION_MENU_INTERFACE, { params: [[89, 88]] })]
                ],
            }],
        useActions: [
            Get.Action.Cook(11, 47, 51, 119, 1, 'shrimp', 10, 10, 35, 3), 
            Get.Action.Cook(12, 48, 52, 120, 10, 'sardine', 10, 25, 70, 3),
            Get.Action.Cook(13, 49, 53, 121, 20, 'herring', 10, 40, 105, 3),
            Get.Action.Cook(14, 50, 54, 122, 30, 'mullet', 10, 55, 140, 3), 
            Get.Action.Cook(15, 232, 234, 236, 40, 'boxfish', 10, 70, 175, 3), 
            Get.Action.Cook(16, 241, 243, 245, 50, 'rockfish', 10, 75, 200, 3),
            Get.Action.Cook(17, 247, 249, 251, 60, 'starslug', 10, 80, 215, 3),
            Get.Action.Cook(18, 752, 754, 756, 1, 'steak', 1, 10, 30, 3),
            Get.Action.Cook(47, 732, 734, 736, 1, 'egg', 1, 8, 25, 3),
            Get.Action.Cook(48, 738, 740, 742, 1, 'raw chicken', 1, 8, 25, 3),
            Get.Action.Cook(55, 763, 765, 767, 1, 'meat pie', 1, 15, 35, 3),
            Get.Action.Cook(56, 769, 771, 773, 1, 'chicken pot pie', 1, 15, 35, 3),
            Get.Action.Cook(57, 775, 777, 779, 1, 'cake', 1, 15, 35, 3),
        ],//cook
        modelName: 'ROCK',	
        modelParams: {	
            BASE: {	
                asset: 'worldObjects_Range',	
                sprite: 'range',	
                spriteID: 1,	
            }	
        },
    }, {
        id: 33,
    }, {
        id: 34,
    }, {
        id: 35,
    }, {
        id: 36,
    }, {
        id: 37,
    }, {
        id: 38,
    }, {
        id: 39,
    }, {
        id: 40,
    },
    Get.WorldObject.TrainingDummy(41, 'Copper Training Dummy', 50, 5, 1, 1, 10),
    Get.WorldObject.TrainingDummy(42, 'Iron Training Dummy', 100, 10, 2, 10, 20),
    Get.WorldObject.TrainingDummy(43, 'Steel Training Dummy', 150, 15, 3, 20, 30),
    Get.WorldObject.TrainingDummy(44, 'Nelenite Training Dummy', 200, 20, 4, 30, 40),
    {
        id: 45,
        name: 'Chest',
        description: 'A chest containing someone\'s belongings.',
        requirements: ItemDetail.build([
            ItemDetail.levelSkillDetail(1, 20, 'STEAL'),
        ]),
        modelName: 'ROCK',
        modelParams: {
            BASE: {
                asset: 'worldObjects_Chests',
                sprite: 'chestClosed',
                spriteID: 1,
            }
        },
        actions: [{
            interfaceID: 0,
            id: 30,
            name: 'Steal',
            steps: [
                [buildStep(StepType.HAS_SKILL_LEVEL, { params: [20, 1] }),
                buildStep(StepType.SEND_CLIENT_MESSAGE, { params: ['You attempt to open the chest.'] }),
                buildStep(StepType.SET_ACTION_INTERVAL, { params: [2] })],
                [buildStep(StepType.HAS_SKILL_LEVEL, { params: [20, 1] }),
                buildStep(StepType.PLAY_ANIMATION, { params: ['STEAL_CHEST', {repeat: 2}] }),
                buildStep(StepType.ROLL_SKILL_SUCCESS, {
                    params: [20, 10, 1, false, 0.25, 0.25],
                    stepResultFail: StepResult.END_AND_REPEAT_STEP_LIST
                }),
                buildStep(StepType.SET_BOUNTY, {
                    params: [false, 180],
                }),
                buildStep(StepType.SEND_CLIENT_MESSAGE, { params: ['You\'re Wanted! Your bounty will wear off in 90 seconds.'] }),
                buildStep(StepType.ROLL_DROP_TABLE, { 
                    params: [1, [[0, 10, 20, 50], [0, 20, 30, 25], [0, 30, 60, 20], [0, 60, 100, 5]]],
                    stepResultFail: StepResult.NEXT_STEP
                }),
                buildStep(StepType.ROLL_DROP_TABLE, { 
                    params: [1, [[78, 6, 12, 25], [79, 4, 10, 20], [80, 3, 6, 15], [81, 2, 4, 10], [126, 1, 1, 5]]],
                    stepResultFail: StepResult.NEXT_STEP
                }),
                buildStep(StepType.GIVE_XP, { params: [20, 50] }),
                buildStep(StepType.SEND_CLIENT_MESSAGE, { params: ['You open the chest and find some loot.'] }),
                buildStep(StepType.ROLL_DESPAWN, {
                    params: [1],
                    stepResultFail: 'END_ACTION'
                }),
                buildStep(StepType.SET_RESPAWN_TIMER, { params: [60] })],
            ],
        }],
        spriteIndex: 46,
    }, {
        id: 46,
        name: 'Empty Chest',
        description: 'An empty chest.',
        modelName: 'ROCK',
        modelParams: {
            BASE: {
                asset: 'worldObjects_Chests',
                sprite: 'chestOpen',
                spriteID: 1,
            }
        },
        actions: [],
        spriteIndex: 47,
    },
    Get.WorldObject.Rock(47, 'Gothite Rock', 40, [10, 35, 8, true, 0.5, 0.5], [[253, 1, 1, 100]], 125, 5, 40, 12, 'A rock with hints of gothite ore.', 8, 596, 599), 
    Get.WorldObject.Rock(48, 'Osmium Rock', 50, [10, 40, 9, true, 0.5, 0.5], [[281, 1, 1, 100]], 150, 6, 48, 14, 'A rock with veins of osmium metal.', 7, 602, 605),
    Get.WorldObject.Tree(49, 315, 'King Maple', 40, 4, 35, 8, 125, 25, 80, 'A grand king maple tree.'),
    Get.WorldObject.Tree(50, 317, 'Magic', 50, 5, 40, 9, 150, 30, 96, 'A color-changing magical tree.'),
    Get.WorldObject.LumberCamp(51, 'King Maple', 315, 49, 5, 25, 40, 50), 
    Get.WorldObject.LumberCamp(52, 'Magic', 317, 50, 6, 30, 50, 60),
    Get.WorldObject.MiningCamp(53, 'Gothite', 253, [[1, 47]], 5, 25, 40, 50),
    Get.WorldObject.MiningCamp(54, 'Osmium', 281, [[1, 48]], 6, 30, 50, 60),
    Get.WorldObject.TrainingDummy(55, 'Gothite Training Dummy', 250, 25, 5, 40, 50),
    Get.WorldObject.TrainingDummy(56, 'Osmium Training Dummy', 300, 30, 6, 50, 60),
    Get.WorldObject.DeepFishingPool(57),
    Get.WorldObject.FisheryCamp(58, 'Deep Pool Fishery', 57, 4, 'deep fishing pool', 40, 50),
    {
        id: 59,
        name: 'Incinerator',
        description: 'A hot boiler used to extract essence from items.',
        modelName: 'ROCK',
        modelParams: {
            BASE: {
                asset: 'worldObjects_Smithing',
                sprite: 'incinerator',
                spriteID: 0,
            }
        },
        actions: [],
        useActions: [{
            interfaceID: 0,
            id: 35,
            entityType: Entity.EntityType.INVENTORY_ITEM,
            entityID: -1, //sorted on client
            name: 'Incinerate',
            steps: [buildStepList(StepList.WALK_ADJACENT),
                [buildStep(StepType.SET_ACTION_INTERVAL, { params: [3] })],
                [buildStep(StepType.INCINERATE_ITEM, {params: ['ITEM_ID_OTHER', 'ITEM_STATE_OTHER']}),
                buildStep(StepType.PLAY_ANIMATION, {params: ['FLETCH']})]
            ],
        }],
    },
    {
        id: 60,
        name: 'Lava',
        description: 'Hot! Good for extracting essence from items.',
        modelName: 'ROCK',
        modelParams: {
            BASE: {
                asset: 'worldObjects_Smithing',
                sprite: 'incinerator',
                spriteID: 1,
            }
        },
        actions: [],
        useActions: [{
            interfaceID: 0,
            id: 35,
            entityType: Entity.EntityType.INVENTORY_ITEM,
            entityID: -1, //sorted on client
            name: 'Incinerate',
            steps: [buildStepList(StepList.WALK_ADJACENT),
                [buildStep(StepType.SET_ACTION_INTERVAL, { params: [2] })],
                [buildStep(StepType.INCINERATE_ITEM, {params: ['ITEM_ID_OTHER', 'ITEM_STATE_OTHER']}),
                buildStep(StepType.PLAY_ANIMATION, {params: ['FLETCH']})]
            ],
        }],
    },
    {
        id: 61,
        name: 'Chest',
        description: 'A chest containing someone\'s belongings.',
        requirements: ItemDetail.build([
            ItemDetail.levelSkillDetail(20, 20, 'STEAL'),
        ]),
        modelName: 'ROCK',
        modelParams: {
            BASE: {
                asset: 'worldObjects_Chests',
                sprite: 'chestClosed',
                spriteID: 1,
            }
        },
        actions: [{
            interfaceID: 0,
            id: 30,
            name: 'Steal',
            steps: [
                [buildStep(StepType.HAS_SKILL_LEVEL, { params: [20, 20] }),
                buildStep(StepType.SEND_CLIENT_MESSAGE, { params: ['You attempt to open the chest.'] }),
                buildStep(StepType.SET_ACTION_INTERVAL, { params: [2] })],
                [buildStep(StepType.HAS_SKILL_LEVEL, { params: [20, 20] }),
                buildStep(StepType.PLAY_ANIMATION, { params: ['STEAL_CHEST', {repeat: 2}] }),
                buildStep(StepType.ROLL_SKILL_SUCCESS, {
                    params: [20, 15, 2, false, 0.25, 0.25],
                    stepResultFail: StepResult.END_AND_REPEAT_STEP_LIST
                }),
                buildStep(StepType.SET_BOUNTY, {
                    params: [false, 240],
                }),
                buildStep(StepType.SEND_CLIENT_MESSAGE, { params: ['You\'re Wanted! Your bounty will wear off in 2 minutes.'] }),
                buildStep(StepType.ROLL_DROP_TABLE, { 
                    params: [1, [[0, 25, 50, 50], [0, 50, 100, 25], [0, 100, 150, 20], [0, 150, 250, 5]]],
                    stepResultFail: StepResult.NEXT_STEP,
                }),
                buildStep(StepType.ROLL_DROP_TABLE, { 
                    params: [1, [[87, 1, 2, 20], [87, 2, 3, 5], [88, 1, 2, 25], [89, 1, 1, 20], [90, 1, 1, 5]]],
                    stepResultFail: StepResult.NEXT_STEP,
                }),
                buildStep(StepType.ROLL_DROP_TABLE, {
                    params: [1024, [[687, 1, 1, 60], [688, 1, 1, 40]]],
                    stepResultFail: StepResult.NEXT_STEP,
                }),
                buildStep(StepType.GIVE_XP, { params: [20, 100] }),
                buildStep(StepType.SEND_CLIENT_MESSAGE, { params: ['You open the chest and find some loot.'] }),
                buildStep(StepType.ROLL_DESPAWN, {
                    params: [1],
                    stepResultFail: 'END_ACTION'
                }),
                buildStep(StepType.SET_RESPAWN_TIMER, { params: [90] })],
            ],
        }],
        spriteIndex: 46,
    }, {
        id: 62,
        name: 'Ladder',
        description: 'I can climb down this.',
        modelName: 'ROCK',
        modelParams: {
            BASE: {
                asset: 'worldObjects_Ladders',
                sprite: 'ladder',
                spriteID: 0,
            }
        },
        actions: [{
            interfaceID: 0,
            id: 37,
            name: 'Climb Down',
        }],
    }, {
        id: 63,
        name: 'Ladder',
        description: 'I can climb up this.',
        modelName: 'ROCK',
        modelParams: {
            BASE: {
                asset: 'worldObjects_Ladders',
                sprite: 'ladder',
                spriteID: 0,
            }
        },
        actions: [{
            interfaceID: 0,
            id: 38,
            name: 'Climb Up',
        }],
    }, {
        id: 64,
        name: 'Rocks',
        description: 'These look tough to get past. Passing these will let me join Obelisk Defense.',
        modelName: 'ROCK',
        modelParams: {
            BASE: {
                spriteID: 7,
            }
        },
        actions: [{
            interfaceID: 0,
            id: 39,
            name: 'Join/Leave',
            steps: [
                buildStepList(StepList.WALK_ADJACENT),
                [
                    buildStep(StepType.IS_IN_AREA, {
                        stepResultFail: StepResult.NEXT_STEP_LIST,
                        params: [true, 141, 151, 141, 151]
                    }),
                    buildStep(StepType.JOIN_MINIGAME, {
                        stepResultFail: StepResult.END_ACTION,
                        params: [0]
                    }),
                    buildStep(StepType.TELEPORT, {params: [1, 139, 151, 139, 151, 1]})
                ], [
                    buildStep(StepType.IS_IN_AREA, {
                        stepResultFail: StepResult.END_ACTION,
                        params: [true, 139, 151, 139, 151]
                    }),
                    buildStep(StepType.LEAVE_MINIGAME, {
                        stepResultFail: StepResult.END_ACTION,
                        params: [0]
                    }),
                    buildStep(StepType.TELEPORT, {params: [1, 141, 151, 141, 151, 1]})
                ]
            ],
        }],
    }, {
        id: 65,
        name: 'Chest',
        description: 'A chest decorated with shells and rocks.',
        modelName: 'ROCK',
        modelParams: {
            BASE: {
                asset: 'worldObjects_Chests',
                sprite: 'chestClosed',
                spriteID: 1,
            }
        },
        requirements: ItemDetail.build([
            ItemDetail.itemNameDetail('Shell Chest Key', 'ITEM'),
            ItemDetail.levelSkillDetail(40, 20, 'STEAL'),
        ]),
        actions: [{
            interfaceID: 0,
            id: 30,
            name: 'Steal',
            steps: [
                buildStepList(StepList.WALK_ADJACENT),
                [buildStep(StepType.HAS_SKILL_LEVEL, { params: [20, 40] }),
                buildStep(StepType.SEND_CLIENT_MESSAGE, { params: ['You attempt to open the chest.'] }),
                buildStep(StepType.SET_ACTION_INTERVAL, { params: [2] })],
                [buildStep(StepType.HAS_SKILL_LEVEL, { params: [20, 40] }),
                buildStep(StepType.PLAY_ANIMATION, { params: ['STEAL_CHEST', {repeat: 2}] }),
                buildStep(StepType.ROLL_SKILL_SUCCESS, {
                    params: [20, 2000, 1000, false, 10, 0],
                    stepResultFail: StepResult.END_AND_REPEAT_STEP_LIST
                }),
                buildStep(StepType.SET_BOUNTY, {
                    params: [false, 480],
                }),
                buildStep(StepType.SEND_CLIENT_MESSAGE, { params: ['You\'re Wanted! Your bounty will wear off in 4 minutes.'] }),
                buildStep(StepType.ROLL_DROP_TABLE, { 
                    params: [1, [[89, 4, 10, 10], [90, 2, 7, 10], [537, 1, 3, 10], [545, 1, 1, 10], [547, 1, 1, 10], [549, 75, 350, 8]]],
                    stepResultFail: StepResult.NEXT_STEP 
                }),
                buildStep(StepType.ROLL_DROP_TABLE, { 
                    params: [64, [[687, 1, 1, 40], [688, 1, 1, 30], [689, 1, 1, 20], [690, 1, 1, 10]]],
                    stepResultFail: StepResult.NEXT_STEP
                 }),
                buildStep(StepType.GIVE_XP, { params: [20, 300] }),
                buildStep(StepType.SEND_CLIENT_MESSAGE, { params: ['You open the chest and find some loot.'] })],
            ],
        }, {
            interfaceID: 0,
            id: 11,
            name: 'Open',
            flags: ['REPEAT_ACTION'],
            actionInterval: 0,
            steps: [
                buildStepList(StepList.WALK_ADJACENT),
                [buildStep(StepType.HAS_INVENTORY_ITEM, {
                    stepResultFail: StepResult.NEXT_STEP,
                    stepResultPass: StepResult.NEXT_STEP_LIST,
                    params: [536, 1],
                }),
                buildStep(StepType.SEND_CLIENT_MESSAGE, { 
                    params: ['You need a shell chest key to open this.'],
                    stepResultFail: StepResult.END_ACTION,
                    stepResultPass: StepResult.END_ACTION,
                }),
                ],[
                    buildStep(StepType.SET_ACTION_INTERVAL, { params: [2] }),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, {params: [536, 1]}),
                    buildStep(StepType.ROLL_DROP_TABLE, { 
                        params: [1, [[89, 4, 10, 10], [90, 2, 7, 10], [537, 1, 3, 10], [545, 1, 1, 10], [547, 1, 1, 10], [549, 75, 350, 10]]],
                        stepResultFail: StepResult.NEXT_STEP
                    }),
                    buildStep(StepType.SEND_CLIENT_MESSAGE, { params: ['You open the chest and the key crumbles as you turn it.'] }),
                ],
            ],
        }],
    }, {
        id: 66,
        name: 'Barricade',
        description: 'A wall made of stone blocks.',
        modelName: 'ROCK',
        stats: [[11, 100]],
        modelParams: {
            BASE: {
                asset: 'worldObjects_Barricade',
                sprite: 'barricade',
                spriteID: 1,
            }
        },
        actions: [{
            interfaceID: 0,
            id: 36,
            name: 'Attack', //for NPCs
        }],
        useActions: [{
            interfaceID: 0,
            entityType: Entity.EntityType.INVENTORY_ITEM,
            entityID: 523, //sorted on client
            id: 11,
            name: 'Repair',
            flags: ['REPEAT_ACTION'],
            actionInterval: 0,
            steps: [
                buildStepList(StepList.WALK_ADJACENT),
                [buildStep(StepType.SET_ACTION_INTERVAL, {params: [2]}),],
                [buildStep(StepType.HAS_INVENTORY_ITEM, {params: [523, 1]}),
                buildStep(StepType.HEAL_OTHER, {params: [10, 1000]}),
                buildStep(StepType.REMOVE_INVENTORY_ITEM, {params: [523, 1]}),
                buildStep(StepType.GIVE_OBELISK_ANCIENT_ENERGY, {params: [4]}),
                ],
            ],
        }],
    }, {
        id: 67,
        name: 'Crumbled Barricade',
        modelParams: {
            BASE: {
                asset: 'worldObjects_Barricade',
                sprite: 'barricade',
                spriteID: 0,
            }
        },
        actions: [{
            interfaceID: 0,
            id: 11,
            name: 'Build',
            actionInterval: 2,
            steps: [
                buildStepList(StepList.WALK_ADJACENT),
                [buildStep(StepType.HAS_INVENTORY_ITEM, {params: [523, 4]}),
                buildStep(StepType.HAS_INVENTORY_ITEM, {params: [63, 1]}),
                buildStep(StepType.REMOVE_INVENTORY_ITEM, {params: [523, 4]}),
                buildStep(StepType.CREATE_BARRICADE),
                buildStep(StepType.DESPAWN_OWNER),
                ],
            ],
        }],
    }, {
        id: 68,
        name: 'Rocks',
        description: 'Some solid rocks!',
        requirements: ItemDetail.build([
            ItemDetail.levelSkillDetail('1+', 10, 'MINE'),
            ItemDetail.itemNameDetail('Pickaxe', 'TOOL_NAME'),
        ]),
        modelName: 'ROCK',
        modelParams: {
            BASE: {
                spriteID: 7,
            }
        },
        actions: [{
            interfaceID: 0,
            id: 3,
            name: 'Mine',
            flags: ['REPEAT_ACTION'],
            steps: [
                buildStepList(StepList.WALK_ADJACENT),
                [buildStep(StepType.HAS_SKILL_LEVEL, { params: [10, 1] }),
                buildStep(StepType.HAS_INVENTORY_ITEM_GROUP, { params: [2] }),
                buildStep(StepType.SEND_CLIENT_MESSAGE, { params: ['You attempt to mine some stone.'] }),
                buildStep(StepType.SET_ACTION_INTERVAL, { params: [2] })],
                [buildStep(StepType.HAS_SKILL_LEVEL, { params: [10, 1] }),
                buildStep(StepType.HAS_INVENTORY_ITEM_GROUP, { params: [2] }),
                buildStep(StepType.INVENTORY_HAS_ROOM),
                buildStep(StepType.SET_PARAMETER_BEST_TOOL_POWER, { params: [10, 2] }),
                buildStep(StepType.PLAY_ANIMATION, { params: ['MINE', {repeat: 2}]}),
                buildStep(StepType.PLAY_SOUND, { params: [22] }),
                buildStep(StepType.ROLL_SKILL_SUCCESS, {
                    params: [10, 12, 6, true, 0.1, 0.2],
                    stepResultFail: 'END_AND_REPEAT_STEP_LIST'
                }),
                buildStep(StepType.ROLL_DROP_TABLE, { 
                    params: [1, [[522, 1, 1, 95], [522, 1, 2, 5]]],
                    stepResultFail: StepResult.NEXT_STEP
                }),
                buildStep(StepType.GIVE_XP, { params: [10, 5] }),
                buildStep(StepType.SEND_CLIENT_MESSAGE, { params: ['You mine some stone.'] })
                ]
            ],
        }],
    }, {
        id: 69,
        name: 'Obelisk',
        description: 'A totem of pure energy.',
        modelName: 'ROCK',
        stats: [[11, 250, 1000]],
        modelParams: {
            BASE: {
                asset: 'worldObjects_Minigame',
                sprite: 'obelisk',
                spriteID: 0,
            }
        },
        actions: [{
            interfaceID: 0,
            id: 40,
            name: 'Repair',
            flags: ['REPEAT_ACTION'],
            actionInterval: 1,
            steps: [
                buildStepList(StepList.WALK_ADJACENT),
                [buildStep(StepType.HAS_INVENTORY_ITEM, {params: [523, 1]}),
                buildStep(StepType.HEAL_OTHER, {params: [10, 1000]}),
                buildStep(StepType.REMOVE_INVENTORY_ITEM, {params: [523, 1]}),
                ],
            ],
        }, {
            interfaceID: 0,
            id: 41,
            name: 'Offer',
            steps: [
                buildStepList(StepList.WALK_ADJACENT),
                [
                    buildStep(StepType.OFFER_ENERGY),
                ],
            ],
        }, {
            interfaceID: 0,
            id: 36,
            name: 'Attack', //for NPCs
        }],
    }, {
        id: 70,
        name: 'Crate of Tools',
        description: 'A crate of a few common tools.',
        stats: [[11, 250, 1000]],
        modelName: 'ROCK',
        modelParams: {
            BASE: {
                asset: 'worldObjects_Chests',
                sprite: 'chestOpen',
                spriteID: 1,
            }
        },
        actions: [{
            interfaceID: 0,
            id: 11,
            name: 'Take Tools',
            actionInterval: 0,
            steps: [
                buildStepList(StepList.WALK_ADJACENT),
                [buildStep(StepType.HAS_INVENTORY_ITEM, {
                    stepResultPass: StepResult.NEXT_STEP_LIST,
                    stepResultFail: StepResult.NEXT_STEP,
                    params: [524, 1, null, false]
                }),
                buildStep(StepType.INVENTORY_HAS_ROOM),
                buildStep(StepType.GIVE_INVENTORY_ITEM, {params: [524, 1]}),
                buildStep(StepType.SEND_CLIENT_MESSAGE, {params: ['You find a chisel in the crate.']})],
                [buildStep(StepType.HAS_INVENTORY_ITEM_GROUP, {
                    stepResultPass: StepResult.NEXT_STEP_LIST,
                    stepResultFail: StepResult.NEXT_STEP,
                    params: [2, false]
                }),
                buildStep(StepType.INVENTORY_HAS_ROOM),
                buildStep(StepType.GIVE_INVENTORY_ITEM, {params: [9, 1]}),
                buildStep(StepType.SEND_CLIENT_MESSAGE, {params: ['You find a copper pickaxe in the crate.']})],
                [buildStep(StepType.HAS_INVENTORY_ITEM, {
                    stepResultPass: StepResult.END_ACTION,
                    stepResultFail: StepResult.NEXT_STEP,
                    params: [63, 1, null, false]
                }),
                buildStep(StepType.INVENTORY_HAS_ROOM),
                buildStep(StepType.GIVE_INVENTORY_ITEM, {params: [63, 1]}),
                buildStep(StepType.SEND_CLIENT_MESSAGE, {params: ['You find a hammer in the crate.']})],
            ],
        }],
    },
    Get.WorldObject.MarketStall(71, 1, 1, 1),
    Get.WorldObject.MarketStall(72, 2, 2, 10),
    Get.WorldObject.MarketStall(73, 3, 3, 20),
    Get.WorldObject.MarketStall(74, 4, 4, 30),
    Get.WorldObject.MarketStall(75, 5, 5, 40),
    Get.WorldObject.MarketStall(76, 6, 6, 50),
    {
        id: 77,
        name: 'Party Chest',
        description: 'Let us party like it is 1979!',
        // requirements: ItemDetail.build([
        // ]),
        modelName: 'ROCK',
        modelParams: {
            BASE: {
                asset: 'worldObjects_Chests',
                sprite: 'chestClosed',
                spriteID: 1,
            }
        },
        actions: [{
            interfaceID: 0,
            id: 11,
            name: 'Add Loot',
            actionInterval: 0,
            steps: [
                buildStepList(StepList.WALK_ADJACENT),
                [buildStep(StepType.OPEN_DROP_PARTY_MINIGAME_CHEST_INTERFACE)]
            ],
        }, {
            interfaceID: 0,
            id: 12,
            name: 'Start Party!',
            actionInterval: 0,
            steps: [
                buildStepList(StepList.WALK_ADJACENT),
                [buildStep(StepType.REQUEST_DROP_PARTY)]
            ]
        }],
        spriteIndex: 46,
    },
    Get.WorldObject.TutorialTree(78, 5, undefined, 1, 0, 15, 4, 25, 5, 16, 'Use your axe on the tree to get logs.'),
    Get.WorldObject.TutorialShallowFishingPool(79),
    Get.WorldObject.Rock(80, 'Gold Rock', 25, [10, 32, 7, true, 0.5, 0.5], [[670, 1, 1, 100]], 85, 8, 120, 10, 'There appears to be gold in this rock.', 9.5),
    Get.WorldObject.Door(81, 'Door', 9, 70, 1, null, 0, { x : 341, y : 47}, { x: 341, y: 46 }, 'Through the door cracks you see an exclusive woodcutting area.' ),
    Get.WorldObject.Door(82, 'Door', 10, 65, 1, null, 1, { x : 47, y : 363}, { x: 47, y: 362 }, 'Through the door cracks you see an exclusive mining area.' ),
    Get.WorldObject.Rock(83, 'Pure Coal Rock', 40, [10, 30, 3, true, 0.33, 0.33], [[57, 1, 1, 90], [57, 1, 2, 10]], 75, 3, 50, 20, 'There appears to be extra coal in this rock.', 8, 584, 587), 
    Get.WorldObject.MiningCamp(84, 'Gold', 670, [[1, 80]], 3, 18, 25, 35),
    Get.WorldObject.Door(85, 'Door', 20, 70, 1, null, 0, { x : 232, y : 270}, { x: 232, y: 269 }, 'Through the door cracks you see goblins protecting many chests.' ),
    {
        id: 86,
        name: 'Chest',
        description: 'A chest containing someone\'s belongings. It seems to be trapped.',
        requirements: ItemDetail.build([
            ItemDetail.levelSkillDetail(50, 20, 'STEAL'),
        ]),
        modelName: 'ROCK',
        modelParams: {
            BASE: {
                asset: 'worldObjects_Chests',
                sprite: 'chestClosed',
                spriteID: 1,
            }
        },
        actions: [{
            interfaceID: 0,
            id: 30,
            name: 'Steal',
            steps: [
                [buildStep(StepType.HAS_SKILL_LEVEL, { params: [20, 50] }),
                buildStep(StepType.SEND_CLIENT_MESSAGE, { params: ['You attempt to open the chest.'] }),
                buildStep(StepType.SET_ACTION_INTERVAL, { params: [3] })],
                [buildStep(StepType.HAS_SKILL_LEVEL, { params: [20, 50] }),
                buildStep(StepType.PLAY_ANIMATION, { params: ['STEAL_CHEST', {repeat: 2}] }),
                buildStep(StepType.ROLL_SKILL_SUCCESS, {
                    params: [20, 40, 1.5, false, 0.5, 0.5],
                    stepResultPass: StepResult.NEXT_STEP_LIST,
                    stepResultFail: StepResult.NEXT_STEP
                }),
                buildStep(StepType.SEND_CLIENT_MESSAGE, { params: ['You prick yourself on the lock.'] }),
                buildStep(StepType.DAMAGE, {
                    params: [0.2],
                    stepResultPass: StepResult.END_AND_REPEAT_STEP_LIST,
                    stepResultFail: StepResult.END_AND_REPEAT_STEP_LIST,
                })],
                [buildStep(StepType.SET_BOUNTY, {
                    params: [false, 240],
                }),
                buildStep(StepType.SEND_CLIENT_MESSAGE, { params: ['You\'re Wanted! Your bounty will wear off in 2 minutes.'] }),
                buildStep(StepType.ROLL_DROP_TABLE, { 
                    params: [1, [[687, 1, 1, 1], [688, 1, 1, 1], [689, 1, 1, 1], [690, 1, 1, 1], [691, 1, 1, 1], [727, 1, 1, 5], [728, 1, 1, 4], [563, 1, 1, 6], [0, 10, 50, 80]]],
                    stepResultFail: StepResult.NEXT_STEP
                }),
                buildStep(StepType.ROLL_DROP_TABLE, { 
                    params: [1, [[89, 2, 3, 25], [90, 1, 2, 20], [537, 1, 1, 10], [168, 8, 16, 20], [169, 6, 15, 10], [46, 40, 60, 10], [170, 4, 8, 5]]],
                    stepResultFail: StepResult.NEXT_STEP
                }),
                buildStep(StepType.GIVE_XP, { params: [20, 250] }),
                buildStep(StepType.SEND_CLIENT_MESSAGE, { params: ['You open the chest and find some loot.'] }),
                buildStep(StepType.SEND_CLIENT_MESSAGE, { params: ['The goblins send out a war call in your name.'] }),
                buildStep(StepType.SEND_GLOBAL_MESSAGE, { params: [4, 'A player has just stolen from the goblin chests and they want them dead!'] }),
                buildStep(StepType.ROLL_DESPAWN, {
                    params: [1],
                    stepResultFail: 'END_ACTION'
                }),
                buildStep(StepType.SET_RESPAWN_TIMER, { params: [120] })],
            ],
        }],
        spriteIndex: 46,
    },
    Get.WorldObject.Wheat(87),
    Get.WorldObject.Well(88, 'Well', 1),
    Get.WorldObject.Mill(89, 'Mill', 1),
    Get.WorldObject.CatQuestFishingPool(90),
    Get.WorldObject.CatQuestBillyRecipe(91),
    Get.WorldObject.CatQuestVixenRecipe(92),
    Get.WorldObject.CatQuestHerbs(93),
    Get.WorldObject.CatQuestViosSign(94),
    Get.WorldObject.Door(95, 'Door', 1, 1, 1, null, 1, { x : 174, y : 70}, { x: 174, y: 69 }, 'Through the cracks you see a scary wolf. The Alpha Wolf.' ),
    Get.WorldObject.Door(96, 'Door', 10, 35, 1, null, 0, { x : 65, y : 338}, { x: 65, y: 337 }, 'Through the door is a exclusive mining area.' ),
];