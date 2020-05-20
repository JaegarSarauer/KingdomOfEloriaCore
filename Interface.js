const ActionFlags = require('./Step').ActionFlags;
const ParameterMappingKeys = require('./Step').ParameterMappingKeys;
const StepList = require('./Step').StepList;
const StepResult = require('./Step').StepResult;
const StepType = require('./Step').StepType;
const StepTypeClassDictionary = require('./Step').StepTypeClassDictionary;
const buildStep = require('./Step').buildStep;
const buildStepList = require('./Step').buildStepList;
const Get = require('./Getter').Get;
const EssenceCatalog = require('./Essence').EssenceCatalog;
const HairStyle = require('./Model').HairStyle;
const SpriteColor = require('./Model').SpriteColor;

module.exports.Interface = [
    {
        id: 0,
        name: 'Map',
        actions: [{
                id: 0,
                name: 'Close', //close door
                actionInterval: -1,
            },
            {
                id: 1,
                name: 'Open', //open door
            },
            {
                id: 2,
                name: 'Chop', //chop tree
                actionInterval: 0,
            },
            {
                id: 3,
                name: 'Mine', //mine rocks
                actionInterval: 0,
            },
            {
                id: 4,
                name: 'Talk To', //talk to npc
                actionInterval: 0,
                steps: [buildStepList(StepList.WALK_ADJACENT), [buildStep(StepType.PLAY_ANIMATION, {params: ['TALK_TO']})]],
            },
            {
                id: 5,
                name: 'Trade', //trade npc'
                actionInterval: 0,
                steps: [buildStepList(StepList.WALK_ADJACENT)],
            },
            {
                id: 6,
                name: 'Attack', //attack npc
                flags: ['REPEAT_ACTION'],
                actionInterval: 0,
                steps: [
                    buildStepList(StepList.WALK_IN_ATTACK_LINE_OF_SIGHT),
                    buildStepList(StepList.WALK_IN_ATTACK_RANGE),
                    [buildStep(StepType.CAN_ATTACK_OWNER)],
                    [buildStep(StepType.ATTACK_OWNER)],
                ],
            },
            {
                id: 7,
                name: 'Bank', //open bank
                actionInterval: 0,
                steps: [
                    buildStepList(StepList.WALK_ADJACENT),
                    [buildStep(StepType.OPEN_STORAGE_INTERFACE)]
                ],
            },
            {
                id: 8,
                name: 'Pickup', //pickup ground item
                actionInterval: -1,
                steps: [
                    [buildStep(StepType.SET_ACTION_INTERVAL, { params: [1] })],
                    buildStepList(StepList.WALK_ABOVE),
                    [buildStep(StepType.CAN_PICKUP_GROUNDITEM),
                    buildStep(StepType.HAS_INVENTORY_SPACE, {params: ['ITEM_ID', 'ITEM_AMOUNT', 'ITEM_STATE']}),
                    buildStep(StepType.DESPAWN_OWNER),
                    buildStep(StepType.GIVE_INVENTORY_ITEM, {params: ['ITEM_ID', 'ITEM_AMOUNT', 'ITEM_STATE']}),
                    buildStep(StepType.PLAY_SOUND, {params: [18]})],
                ],
            },
            {
                id: 9,
                name: 'Fish', //fish
                actionInterval: 0,
            },
            {
                id: 10,
                name: 'Smelt',
                actionInterval: 0,
            },
            {
                id: 11, //item used on object
            },
            {
                id: 12, //item used on object
            },
            {
                id: 13, //item used on object
            },
            {
                id: 14, //item used on object
            },
            {
                id: 15, //item used on object
            },
            {
                id: 16, //item used on object
            },
            {
                id: 17,
                name: 'Pick',
                actionInterval: 0,
            },
            {
                id: 18,
                name: 'Spin',
                actionInterval: 0,
                steps: [],
            },
            {
                id: 19,
                name: 'Craft',
                actionInterval: 0,
            },
            {
                id: 20,
                name: 'Fire',
                actionInterval: 0,
            },
            {
                id: 21,
                name: 'Follow',
                flags: ['REPEAT_ACTION'],
                actionInterval: 0,
                steps: [
                    [buildStep(StepType.FOLLOW_OWNER)]
                ],
            },
            {
                id: 22,
                name: 'Upgrade',
                flags: ['REPEAT_ACTION'],
                actionInterval: 0,
                steps: [
                    buildStepList(StepList.WALK_ADJACENT)
                ],
            },
            {
                id: 23,
                name: 'Enter',
                actionInterval: 0,
            },
            {
                id: 24,
                name: 'Operate',
                flags: ['VISIBLE_ONLY_TO_OWNER'],
                actionInterval: 0,
                steps: [
                    buildStepList(StepList.WALK_ABOVE)
                ],
            },
            {
                id: 25,
                name: 'Check',
                flags: ['VISIBLE_ONLY_TO_OWNER'],
                actionInterval: 0,
                steps: [
                    buildStepList(StepList.WALK_ABOVE),
                    [buildStep(StepType.GET_USES_UNTIL_DEPLETION)],
                ],
            },
            {
                id: 26,
                name: 'Process',
                flags: ['VISIBLE_ONLY_TO_OWNER'],
                actionInterval: 0,
                steps: [
                    buildStepList(StepList.WALK_ABOVE)
                ],
            },
            {
                id: 27,
                name: 'Disassemble',
                flags: ['VISIBLE_ONLY_TO_OWNER'],
                actionInterval: 0,
                steps: [
                    buildStepList(StepList.WALK_ABOVE)
                ],
            },
            {
                id: 28,
                name: 'Disassemble',
                flags: ['VISIBLE_ONLY_TO_OWNER'],
                actionInterval: 0,
                steps: [
                    buildStepList(StepList.WALK_ADJACENT)
                ],
            },
            {
                id: 29,
                name: 'Check',
                flags: ['VISIBLE_ONLY_TO_OWNER'],
                actionInterval: 0,
                steps: [
                    buildStepList(StepList.WALK_ADJACENT),
                    [buildStep(StepType.GET_USES_UNTIL_DEPLETION)],
                ],
            },
            {
                id: 30,
                name: 'Steal',
                actionInterval: 0,
                steps: [
                    buildStepList(StepList.WALK_ADJACENT),
                ],
            },
            {
                id: 31,
                name: 'Attack', //attack dummy
                flags: ['REPEAT_ACTION', 'VISIBLE_ONLY_TO_OWNER'],
                actionInterval: 0,
                steps: [
                    buildStepList(StepList.WALK_IN_ATTACK_LINE_OF_SIGHT),
                    buildStepList(StepList.WALK_IN_ATTACK_RANGE),
                    [buildStep(StepType.CAN_ATTACK_OWNER)],
                    [buildStep(StepType.ATTACK_OWNER)]
                ],
            },
            {
                id: 32,
                name: 'Request Trade', //request player trade
                actionInterval: 0,
                steps: [
                    buildStepList(StepList.WALK_ADJACENT),
                    [
                        buildStep(StepType.ACCEPT_TRADE_REQUEST, {
                            stepResultFail: StepResult.NEXT_STEP,
                            stepResultPass: StepResult.NEXT_STEP_LIST,
                            params: ['TRADE_ID']
                        }),
                        buildStep(StepType.SEND_TRADE_REQUEST),
                    ]
                ],
            },
            {
                id: 33,
                name: 'Accept Trade', //accept player trade
                actionInterval: 0,
                steps: [buildStepList(StepList.WALK_ADJACENT),
                [
                    buildStep(StepType.ACCEPT_TRADE_REQUEST, {params: ['TRADE_ID']}),
                ]],
            },
            {
                id: 34,
                name: 'Walk Here',
                actionInterval: -1,
                steps: [buildStepList(StepList.WALK_ABOVE)],
            },
            {
                id: 35,
                flags: ['REPEAT_ACTION'],
                name: 'Incinerate',
                actionInterval: 0,
            },
            {
                id: 36,
                name: 'Attack', //attack npc (invisible to player)
                flags: ['REPEAT_ACTION', 'VISIBLE_ONLY_TO_OWNER'],
                actionInterval: 0,
                steps: [
                    buildStepList(StepList.WALK_IN_ATTACK_LINE_OF_SIGHT),
                    buildStepList(StepList.WALK_IN_ATTACK_RANGE),
                    [buildStep(StepType.CAN_ATTACK_OWNER)],
                    [buildStep(StepType.ATTACK_OWNER)],
                ],
            },
            {
                id: 37,
                name: 'Climb Down',
                actionInterval: 0,
                steps: [
                    buildStepList(StepList.WALK_ABOVE),
                    [buildStep(StepType.CHANGE_MAP_ID, {
                        params: [1]
                    })],
                ],
            },
            {
                id: 38,
                name: 'Climb Up',
                actionInterval: 0,
                steps: [
                    buildStepList(StepList.WALK_ABOVE),
                    [buildStep(StepType.CHANGE_MAP_ID, {
                        params: [0]
                    })],
                ],
            },
            {
                id: 39,
                name: 'Join/Leave',
                actionInterval: 0,
            },
            {
                id: 40,
                name: 'Repair',
            },
            {
                id: 41,
                name: 'Offer',
                actionInterval: 0,
            },
            {
                id: 42,
                name: 'Attack', //attack npc, get bounty
                flags: ['REPEAT_ACTION'],
                actionInterval: 0,
                steps: [
                    buildStepList(StepList.WALK_IN_ATTACK_LINE_OF_SIGHT),
                    buildStepList(StepList.WALK_IN_ATTACK_RANGE),
                    [buildStep(StepType.CAN_ATTACK_OWNER)],
                    [buildStep(StepType.ATTACK_OWNER),
                    buildStep(StepType.SET_BOUNTY, {
                        params: [false, 120],
                    })],
                ],
            },
            {
                id: 43,
                name: 'Add Sell Offer',
                flags: ['VISIBLE_ONLY_TO_OWNER'],
                actionInterval: -1,
                steps: [
                    [buildStep(StepType.ADD_MARKET_SELL_OFFER, {params: ['ITEM_ID', 'ITEM_AMOUNT', 'ITEM_STATE', 'ITEM_PRICE']})]
                ],
            },
            {
                id: 44,
                name: 'Add Buy Offer',
                flags: ['VISIBLE_ONLY_TO_OWNER'],
                actionInterval: -1,
                steps: [
                    [buildStep(StepType.ADD_MARKET_BUY_OFFER, {params: ['ITEM_ID', 'ITEM_AMOUNT', 'ITEM_STATE', 'ITEM_PRICE']})]
                ],
            },
            {
                id: 45,
                name: 'Take Brochure From',
                actionInterval: 0,
                steps: [
                    [buildStep(StepType.GIVE_INVENTORY_ITEM, {params: [611, 1]})]
                ],
            },
            {
                id: 46,
                name: 'Pickup Remote', //pickup ground item remote
                flags: ['IS_SERVER'],
                actionInterval: -1,
                steps: [
                    [buildStep(StepType.CAN_PICKUP_GROUNDITEM),
                    buildStep(StepType.HAS_INVENTORY_SPACE, {params: ['ITEM_ID', 'ITEM_AMOUNT', 'ITEM_STATE']}),
                    buildStep(StepType.DESPAWN_OWNER),
                    buildStep(StepType.GIVE_INVENTORY_ITEM, {params: ['ITEM_ID', 'ITEM_AMOUNT', 'ITEM_STATE']})],
                ],
            },
            { 
                id: 47,
                name: 'Milk', // Milk a cow of similar creature
                actionInterval: 0,
            },
            {
                id: 48, //item used on object
            },
            {
                id: 49, //item used on object
            },
            {
                id: 50, //item used on object
            },
            {
                id: 51, //item used on object
            },
            {
                id: 52, //item used on object
            },
            {
                id: 53, //item used on object
            },
            {
                id: 54,
                name: 'Attack Closest NPC',
                actionInterval: -1,
            },
            {
                id: 55, // Cook meat pies
            },
            {
                id: 56, // Cook chicken pot pies
            },
            {
                id: 57, // Cook cake
            },
            { 
                id: 58,
                name: 'Sheer', // Get wool from sheep
                actionInterval: 4,
            },
            {
                id: 59,
                name: 'Grind',
                actionInterval: 1,
                steps: [],
            },
            Get.Action.FillBucketsWithWater(0, 60),
            {
                id: 61,
                name: 'Read',
                actionInterval: 0,
            },
            {
                id: 62,
                name: 'Pet',
                actionInterval: 0,
            },
            {
                id: 63,
                name: 'Approach',
                actionInterval: 0,
            },
            {
                id: 64, // Open interface 3
                name: 'Hair Styling From',
                actionInterval: 0,
            },
        ],
    },
    {
        id: 1,
        name: 'Bank Screen',
        actions: [
            {
                id: 0,
                name: 'Withdraw',
                actionInterval: -1,
                steps: [
                    [buildStep(StepType.WITHDRAW_ITEM, {params: ['ITEM_ID', 'ITEM_AMOUNT', 'ITEM_STATE']})]
                ],
            },
        ],
    },
    {  
        id: 2,
        name: 'Shop Screen',
        actions: [
            {
                id: 0,
                name: 'Value',
                actionInterval: -1,
                steps: [],
            },
            {
                id: 1,
                name: 'Buy',
                actionInterval: -1,
                steps: [
                    [buildStep(StepType.BUY_ITEM_FROM_SHOP, {params: ['SLOT_ID', 'ITEM_ID', 'ITEM_AMOUNT', 'ITEM_STATE']})]
                ],
            },
            {
                id: 2,
                name: 'Add Sell Offer',
                flags: ['VISIBLE_ONLY_TO_OWNER'],
                actionInterval: -1,
                steps: [
                    [buildStep(StepType.ADD_MARKET_SELL_OFFER, {params: ['ITEM_ID', 'ITEM_AMOUNT', 'ITEM_STATE', 'ITEM_PRICE']})]
                ],
            },
            {
                id: 3,
                name: 'Add Buy Offer',
                flags: ['VISIBLE_ONLY_TO_OWNER'],
                actionInterval: -1,
                steps: [
                    [buildStep(StepType.ADD_MARKET_BUY_OFFER, {params: ['ITEM_ID', 'ITEM_AMOUNT', 'ITEM_STATE', 'ITEM_PRICE']})]
                ],
            },
            {
                id: 4,
                name: 'Sell',
                actionInterval: -1,
                steps: [
                    [buildStep(StepType.SELL_ITEM_TO_SHOP, {params: ['SLOT_ID', 'ITEM_ID', 'ITEM_AMOUNT', 'ITEM_STATE']})]
                ],
            },
            {
                id: 5,
                name: 'Remove Offer',
                flags: ['VISIBLE_ONLY_TO_OWNER'],
                actionInterval: -1,
                steps: [
                    [buildStep(StepType.REMOVE_MARKET_OFFER, {params: ['SLOT_ID', 'ITEM_ID']})]
                ],
            },
        ],
    },
    {   
        id: 3,
        name: 'Trade Screen',
        actions: [
            {
                id: 0,
                name: 'Accept Trade',
                actionInterval: -1,
                steps: [
                    [buildStep(StepType.ACCEPT_TRADE, {params: ['TRADE_ID']})]
                ],
            },
            {
                id: 1,
                name: 'Decline Trade',
                actionInterval: -1,
                steps: [
                    [buildStep(StepType.DECLINE_TRADE, {params: ['TRADE_ID']})]
                ],
            },
            {
                id: 2,
                name: 'Remove',
                actionInterval: -1,
                steps: [
                    [buildStep(StepType.REMOVE_TRADE_ITEM, {params: ['TRADE_ID', 'ITEM_ID', 'ITEM_AMOUNT', 'ITEM_STATE']})]
                ],
            },
        ],
    },
    {   
        id: 4,
        name: 'Character Look Screen',
    },
    {
        id: 5,
        name: 'Adventurer Inventory',
        actions: [
            {
                id: 0,
                name: 'Use',
                actionInterval: 0,
                steps: [],
            },
            {
                id: 1,
                name: 'Drop',
                actionInterval: -1,
                steps: [
                    [buildStep(StepType.REMOVE_INVENTORY_ITEM, {params: ['ITEM_ID', 'ITEM_AMOUNT', 'ITEM_STATE']}),
                    buildStep(StepType.CREATE_GROUND_ITEM, {params: ['ITEM_ID', 'ITEM_AMOUNT', 'ITEM_STATE']}),
                    buildStep(StepType.PLAY_SOUND, {params: [19]})]
                ],
            },
            {
                id: 2,
                name: 'Examine',
                actionInterval: 0,
            },
            {
                id: 3, 
                name: 'Equip', //helm
                actionInterval: -1,
                steps: [
                    [buildStep(StepType.HAS_INVENTORY_ITEM, {params: ['ITEM_ID', 'ITEM_AMOUNT', 'ITEM_STATE']})]
                ],
            },
            {
                id: 4, 
                //name: 'Equip', //right
                actionInterval: -1,
                steps: [
                    [buildStep(StepType.HAS_INVENTORY_ITEM, {params: ['ITEM_ID', 'ITEM_AMOUNT', 'ITEM_STATE']})]
                ],
            },
            {
                id: 5, 
                //name: 'Equip', //left
                actionInterval: -1,
                steps: [
                    [buildStep(StepType.HAS_INVENTORY_ITEM, {params: ['ITEM_ID', 'ITEM_AMOUNT', 'ITEM_STATE']})]
                ],
            },
            {
                id: 6, 
                name: 'Equip', //chest
                actionInterval: -1,
                steps: [
                    [buildStep(StepType.HAS_INVENTORY_ITEM, {params: ['ITEM_ID', 'ITEM_AMOUNT', 'ITEM_STATE']})]
                ],
            },
            {
                id: 7, 
                name: 'Equip', //legs
                actionInterval: -1,
                steps: [
                    [buildStep(StepType.HAS_INVENTORY_ITEM, {params: ['ITEM_ID', 'ITEM_AMOUNT', 'ITEM_STATE']})]
                ],
            },
            {
                id: 8, 
                name: 'Equip', //quiver
                actionInterval: -1,
                steps: [
                    [buildStep(StepType.HAS_INVENTORY_ITEM, {params: ['ITEM_ID', 'ITEM_AMOUNT', 'ITEM_STATE']})]
                ],
            },
            {
                id: 9,
                name: '', //item used on item, specified by item
            },
            {
                id: 10,
                name: '', //item used on item, specified by item
            },
            {
                id: 11,
                name: '', //item used on item, specified by item
            },
            {
                id: 12,
                name: '', //item used on item, specified by item
            },
            {
                id: 13,
                name: '', //item used on item, specified by item
            },
            {
                id: 14,
                name: '', //item used on item, specified by item
            },
            {
                id: 15,
                name: '', //item used on item, specified by item
            },
            {
                id: 16,
                name: '', //item used on item, specified by item
            },
            {
                id: 17, 
                name: 'Teleport',
                actionInterval: 0,
            },
            {
                id: 18,
                name: 'Eat',
                actionInterval: -1,
            },
            {
                id: 19,
                name: 'Sign',
                actionInterval: 4,
            },
            {
                id: 20,
                name: 'Withdraw',
                actionInterval: -1,
                steps: [
                    [buildStep(StepType.WITHDRAW_BAG_ITEM, {params: [10000]})]
                ],
            },
            {
                id: 21,
                name: 'Deposit',
                actionInterval: -1,
                steps: [
                    [buildStep(StepType.DEPOSIT_BAG_ITEM, {params: [10000]})]
                ],
            },
            {
                id: 22,
                name: '',
            },
            {
                id: 23,
                name: 'Repair',
                actionInterval: -1,
                steps: [
                    [buildStep(StepType.OPEN_ACTION_MENU_INTERFACE, { params: [[156, 157, 158, 159, 180]] })]
                ],
            },
            {
                id: 24,
                name: 'Increase',
                actionInterval: -1,
                steps: [
                    [buildStep(StepType.OPEN_ACTION_MENU_INTERFACE, { params: [[160, 161, 162, 163, 181]] })]
                ],
            },
            {
                id: 25,
                name: '', // item used on item, specified by item
            },
            {
                id: 26,
                name: '', // item used on item, specified by item
            },
            {
                id: 27,
                name: '', //item used on item, specified by item
            },
            {
                id: 28,
                name: '', //item used on item, specified by item
            },
            {
                id: 29,
                name: '', //item used on item, specified by item
            },
            {
                id: 30,
                name: '', //item used on item, specified by item
            },
            {
                id: 31,
                name: '', //item used on item, specified by item
            },
            {
                id: 32, //item used on item, specified by item
            },
            {
                id: 33,
                name: 'Read',
                actionInterval: 0,
            },
            { 
                id: 34,
                name: 'Prepare Dish With', // Pan
                actionInterval: -1
            },
            { 
                id: 35,
                name: 'Empty', // Empty a bucket
                actionInterval: 2,
            },
            { 
                id: 36,
                name: 'Spice With', // Spice food
                actionInterval: -1,
            },
            {
                id: 37, 
                name: 'Cast',
                actionInterval: 0,
                steps: [
                    [buildStep(StepType.USE_ENCHANTMENT, { params: ['ENCHANTMENT_ID'] })]
                ],
            },
            // {
            //     id: 37,
            //     name: 'Style Hair With',
            //     actionInterval: 1,
            //     steps: [
            //         [buildStep(StepType.OPEN_ACTION_MENU_INTERFACE, { params: [[196, 197, 198, 199, 200, 201, 202, 203, 204]] })]
            //     ],
            // }
        ],
    },
    {   
        id: 6,
        name: 'Adventurer Inventory Deposit', // (for bank screen)
        actions: [
            {
                id: 0,
                name: 'Deposit',
                actionInterval: -1,
                steps: [
                    [buildStep(StepType.DEPOSIT_ITEM, {params: ['ITEM_ID', 'ITEM_AMOUNT', 'ITEM_STATE']})]
                ],
            },
        ],
    },
    {   
        id: 7,
        name: 'Adventurer Inventory Sell', // (for shop screen)
        actions: [
            {
                id: 0,
                name: 'Value',
                actionInterval: -1,
                flags: ['IS_LOCAL'],
                steps: [
                    //get sell value
                ],
            },
            {
                id: 1,
                name: 'Sell',
                actionInterval: -1,
                steps: [
                    [buildStep(StepType.SELL_ITEM_TO_SHOP, {params: ['SLOT_ID', 'ITEM_ID', 'ITEM_AMOUNT', 'ITEM_STATE']})]
                ],
            },
        ],
    },
    {   
        id: 8,
        name: 'Adventurer inventory Offer', // (for trade screen)
        actions: [
            {
                id: 0,
                name: 'Add',
                actionInterval: -1,
                steps: [
                    [buildStep(StepType.ADD_TRADE_ITEM, {params: ['TRADE_ID', 'ITEM_ID', 'ITEM_AMOUNT', 'ITEM_STATE']})]
                ],
            },
        ],
    },
    {   
        id: 9,
        name: 'Adventurer Stats',
    },
    {   
        id: 10,
        name: 'Adventurer Equipment',
        actions: [
            {
                id: 0,
                name: 'Unequip',
                actionInterval: -1,
                steps: [
                    [
                        buildStep(StepType.PLAY_ANIMATION, { params: ['ACTION_BOTHHANDS'] }),
                        buildStep(StepType.REMOVE_EQUIPMENT_ITEM, {params: ['SLOT_ID']})
                    ]
                ],
            },
            {
                id: 1, 
                name: 'Cast',
                actionInterval: 0,
                steps: [
                    [
                        buildStep(StepType.PLAY_ANIMATION, { params: ['ACTION_BOTHHANDS'] }),
                        buildStep(StepType.USE_ENCHANTMENT, { params: ['ENCHANTMENT_ID'] })
                    ]
                ],
            },
        ],
    },
    {   
        id: 11,
        name: 'UNUSED',
    },
    {   
        id: 12,
        name: 'Chat Box',
    },
    {   
        id: 13,
        name: 'NPC Dialog',
        actions: [
            {
                id: 0,
                name: 'Continue...', //Proceed dialog
                actionInterval: -1,
                steps: [
                    [buildStep(StepType.PROCESS_DIALOG)],
                ],
            },
            {
                id: 1,
                name: '', //onDialog action
                actionInterval: -1,
            },
            {
                id: 2,
                name: '', //onDialogContinue action
                actionInterval: -1,
            },
        ],
    },
    {   
        id: 14,
        name: 'Action Box',
        actions: [
            Get.Interface.Fletch(0, 'Cut Arrow Shafts (5) (1 Fletching) (1 Log)', 5, 1, 1, 74, 5, 20, 'You cut 5 arrow shafts.'),
            Get.Interface.Fletch(1, 'Cut Bow (5 Fletching) (1 Log)', 5, 1, 5, 33, 1, 30, 'You cut a bow.'),
            Get.Interface.Fletch(2, 'Cut Arrow Shafts (10) (10 Fletching) (1 Oak Log)', 6, 1, 10, 74, 10, 40, 'You cut 10 arrow shafts.'),
            Get.Interface.Fletch(3, 'Cut Oak Bow (15 Fletching) (1 Oak Log)', 6, 1, 15, 34, 1, 60, 'You cut an oak bow.'),
            Get.Interface.Fletch(4, 'Cut Arrow Shafts (15) (20 Fletching) (1 Ash Log)', 7, 1, 20, 74, 15, 60, 'You cut 15 arrow shafts.'),
            Get.Interface.Fletch(5, 'Cut Ash Bow (25 Fletching) (1 Ash Log)', 7, 1, 25, 35, 1, 90, 'You cut an ash bow.'),
            Get.Interface.Fletch(6, 'Cut Arrow Shafts (20) (30 Fletching) (1 Fur Log)', 8, 1, 30, 74, 20, 80, 'You cut 20 arrow shafts.'),
            Get.Interface.Fletch(7, 'Cut Fur Bow (35 Fletching) (1 Fur Log)', 8, 1, 35, 36, 1, 120, 'You cut a fur bow.'),

            Get.Interface.SmeltBar(8, 'Smelt Copper Bar (1 Smithing) (2 Copper Ore)', 'copper bar', 1, 55, 59, 25),
            Get.Interface.SmeltBar(9, 'Smelt Iron Bar (10 Smithing) (2 Iron Ore)', 'iron bar', 10, 56, 60, 50),
            Get.Interface.SmeltBar(10, 'Smelt Steel Bar (20 Smithing) (2 Iron Ore, 1 Coal)', 'steel bar', 20, 56, 61, 75, 1),
            Get.Interface.SmeltBar(11, 'Smelt Nelenite Bar (30 Smithing) (2 Nelenite Ore, 2 Coal)', 'nelenite bar', 30, 58, 62, 100, 2),

            Get.Interface.Smith(12, 'Smith Copper Axe (1 Smithing, 1 Bar)', 'copper axe', 59,  1, 25, 1, 1, 4),
            Get.Interface.Smith(13, 'Smith Copper Dagger (1 Smithing, 1 Bar)', 'copper dagger', 59,  1, 25, 13, 1, 4),
            Get.Interface.Smith(14, 'Smith Copper Arrowheads (15) (2 Smithing, 1 Bar)', 'copper arrowheads', 59,  1, 25, 64, 2, 4, 15),
            Get.Interface.Smith(15, 'Smith Copper Pickaxe (3 Smithing, 2 Bars)', 'copper pickaxe', 59,  2, 50, 9, 3, 4),
            Get.Interface.Smith(16, 'Smith Copper Helm (4 Smithing, 2 Bars)', 'copper helm', 59,  2, 50, 21, 4, 4),
            Get.Interface.Smith(17, 'Smith Copper Sword (5 Smithing, 3 Bars)', 'copper sword', 59,  3, 75, 17, 5, 4),
            Get.Interface.Smith(18, 'Smith Copper Full Helm (6 Smithing, 3 Bars)', 'copper full helmet', 59,  3, 75, 25, 6, 4),
            Get.Interface.Smith(19, 'Smith Copper Platelegs (7 Smithing, 4 Bars)', 'copper platelegs', 59,  4, 100, 29, 7, 4),
            Get.Interface.Smith(20, 'Smith Copper Chainhelm (8 Smithing, 3 Bars)', 'copper chain helm', 59,  3, 80, 105, 8, 6),
            Get.Interface.Smith(21, 'Smith Copper Chainlegs (9 Smithing, 4 Bars)', 'copper chainlegs', 59,  4, 105, 109, 9, 6),
            Get.Interface.Smith(22, 'Smith Copper Chainbody (10 Smithing, 5 Bars)', 'copper chainbody', 59,  5, 130, 113, 10, 6),
            Get.Interface.Smith(23, 'Smith Copper Platebody (10 Smithing, 5 Bars)', 'copper platebody', 59,  5, 125, 42, 10, 4),

            Get.Interface.Smith(24, 'Smith Iron Axe (10 Smithing, 1 Bar)', 'iron axe', 60,  1, 50, 2, 10, 4),
            Get.Interface.Smith(25, 'Smith Iron Dagger (11 Smithing, 1 Bar)', 'iron dagger', 60,  1, 50, 14, 11, 4),
            Get.Interface.Smith(26, 'Smith Iron Arrowheads (15) (12 Smithing, 1 Bar)', 'iron arrowheads', 60,  1, 50, 65, 12, 4, 15),
            Get.Interface.Smith(27, 'Smith Iron Pickaxe (13 Smithing, 2 Bars)', 'iron pickaxe', 60,  2, 100, 10, 13, 4),
            Get.Interface.Smith(28, 'Smith Iron Helm (14 Smithing, 2 Bars)', 'iron helm', 60,  2, 100, 22, 14, 4),
            Get.Interface.Smith(29, 'Smith Iron Sword (15 Smithing, 3 Bars)', 'iron sword', 60,  3, 150, 18, 15, 4),
            Get.Interface.Smith(30, 'Smith Iron Full Helm (16 Smithing, 3 Bars)', 'iron full helmet', 60,  3, 150, 26, 16, 4),
            Get.Interface.Smith(31, 'Smith Iron Platelegs (17 Smithing, 4 Bars)', 'iron platelegs', 60,  4, 200, 30, 17, 4),
            Get.Interface.Smith(32, 'Smith Iron Chainhelm (18 Smithing, 3 Bars)', 'iron chain helm', 60,  3, 160, 106, 18, 6),
            Get.Interface.Smith(33, 'Smith Iron Chainlegs (19 Smithing, 4 Bars)', 'iron chainlegs', 60,  4, 210, 110, 19, 6),
            Get.Interface.Smith(34, 'Smith Iron Chainbody (20 Smithing, 5 Bars)', 'iron chainbody', 60,  5, 260, 114, 20, 6),
            Get.Interface.Smith(35, 'Smith Iron Platebody (20 Smithing, 5 Bars)', 'iron platebody', 60,  5, 250, 43, 20, 4),

            Get.Interface.Smith(36, 'Smith Steel Axe (20 Smithing, 1 Bar)', 'steel axe', 61,  1, 75, 3, 20, 4),
            Get.Interface.Smith(37, 'Smith Steel Dagger (21 Smithing, 1 Bar)', 'steel dagger', 61,  1, 75, 15, 21, 4),
            Get.Interface.Smith(38, 'Smith Steel Arrowheads (15) (22 Smithing, 1 Bar)', 'steel arrowheads', 61,  1, 75, 66, 22, 4, 15),
            Get.Interface.Smith(39, 'Smith Steel Pickaxe (23 Smithing, 2 Bars)', 'steel pickaxe', 61,  2, 150, 11, 23, 4),
            Get.Interface.Smith(40, 'Smith Steel Helm (24 Smithing, 2 Bars)', 'steel helm', 61,  2, 150, 23, 24, 4),
            Get.Interface.Smith(41, 'Smith Steel Sword (25 Smithing, 3 Bars)', 'steel sword', 61,  3, 225, 19, 25, 4),
            Get.Interface.Smith(42, 'Smith Steel Full Helm (26 Smithing, 3 Bars)', 'steel full helmet', 61,  3, 225, 27, 26, 4),
            Get.Interface.Smith(43, 'Smith Steel Platelegs (27 Smithing, 4 Bars)', 'steel platelegs', 61,  4, 300, 31, 27, 4),
            Get.Interface.Smith(44, 'Smith Steel Chainhelm (28 Smithing, 3 Bars)', 'steel chain helm', 61,  3, 240, 107, 28, 6),
            Get.Interface.Smith(45, 'Smith Steel Chainlegs (29 Smithing, 4 Bars)', 'steel chainlegs', 61,  4, 315, 111, 29, 6),
            Get.Interface.Smith(46, 'Smith Steel Chainbody (30 Smithing, 5 Bars)', 'steel chainbody', 61,  5, 390, 115, 30, 6),
            Get.Interface.Smith(47, 'Smith Steel Platebody (30 Smithing, 5 Bars)', 'steel platebody', 61,  5, 375, 44, 30, 4),

            Get.Interface.Smith(48, 'Smith Nelenite Axe (30 Smithing, 1 Bar)', 'nelenite axe', 62,  1, 100, 4, 30, 4),
            Get.Interface.Smith(49, 'Smith Nelenite Dagger (31 Smithing, 1 Bar)', 'nelenite dagger', 62,  1, 100, 16, 31, 4),
            Get.Interface.Smith(50, 'Smith Nelenite Arrowheads (15) (32 Smithing, 1 Bar)', 'nelenite arrowheads', 62,  1, 100, 67, 32, 4, 15),
            Get.Interface.Smith(51, 'Smith Nelenite Pickaxe (33 Smithing, 2 Bars)', 'nelenite pickaxe', 62,  2, 200, 12, 33, 4),
            Get.Interface.Smith(52, 'Smith Nelenite Helm (34 Smithing, 2 Bars)', 'nelenite helm', 62,  2, 200, 24, 34, 4),
            Get.Interface.Smith(53, 'Smith Nelenite Sword (35 Smithing, 3 Bars)', 'nelenite sword', 62,  3, 300, 20, 35, 4),
            Get.Interface.Smith(54, 'Smith Nelenite Full Helm (36 Smithing, 3 Bars)', 'nelenite full helmet', 62,  3, 300, 28, 36, 4),
            Get.Interface.Smith(55, 'Smith Nelenite Platelegs (37 Smithing, 4 Bars)', 'nelenite platelegs', 62,  4, 400, 32, 37, 4),
            Get.Interface.Smith(56, 'Smith Nelenite Chainhelm (38 Smithing, 3 Bars)', 'nelenite chain helm', 62,  3, 320, 108, 38, 6),
            Get.Interface.Smith(57, 'Smith Nelenite Chainlegs (39 Smithing, 4 Bars)', 'nelenite chainlegs', 62,  4, 420, 112, 39, 6),
            Get.Interface.Smith(58, 'Smith Nelenite Chainbody (40 Smithing, 5 Bars)', 'nelenite chainbody', 62,  5, 520, 116, 40, 6),
            Get.Interface.Smith(59, 'Smith Nelenite Platebody (40 Smithing, 5 Bars)', 'nelenite platebody', 62,  5, 500, 45, 40, 4),
            {
                id: 60,
                name: 'Spin Flax into Bowstring',
                flags: ['REPEAT_ACTION'],
                actionInterval: 4,
                steps: [
                    [buildStep(StepType.HAS_INVENTORY_ITEM, {params: [124, 1]}),
                    buildStep(StepType.HAS_SKILL_LEVEL, {params: [15, 1]}),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, {params: [124, 1]}),
                    buildStep(StepType.GIVE_INVENTORY_ITEM, {params: [41, 1]}),
                    buildStep(StepType.GIVE_XP, {params: [15, 25]}),
                    buildStep(StepType.SEND_CLIENT_MESSAGE, {params: ['You spin a bowstring.']}),
                    buildStep(StepType.PLAY_SOUND, {params: [29]})]
                ],
            },
            {
                id: 61,
                name: 'Sew Blue Wizard Hat (1 Crafting) (3 Cloth, 3 Thread)',
                flags: ['REPEAT_ACTION'],
                actionInterval: 4,
                steps: [
                    [buildStep(StepType.HAS_INVENTORY_ITEM, {params: [87, 3]}),
                    buildStep(StepType.HAS_INVENTORY_ITEM, {params: [92, 3]}),
                    buildStep(StepType.HAS_SKILL_LEVEL, {params: [15, 1]}),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, {params: [87, 3]}),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, {params: [92, 3]}),
                    buildStep(StepType.GIVE_INVENTORY_ITEM, {params: [93, 1]}),
                    buildStep(StepType.GIVE_XP, {params: [15, 75]}),
                    buildStep(StepType.SEND_CLIENT_MESSAGE, {params: ['You sew a blue wizard hat.']})]
                ],
            },
            {
                id: 62,
                name: 'Sew Blue Wizard Bottom (4 Crafting) (4 Cloth, 4 Thread)',
                flags: ['REPEAT_ACTION'],
                actionInterval: 4,
                steps: [
                    [buildStep(StepType.HAS_INVENTORY_ITEM, {params: [87, 4]}),
                    buildStep(StepType.HAS_INVENTORY_ITEM, {params: [92, 4]}),
                    buildStep(StepType.HAS_SKILL_LEVEL, {params: [15, 4]}),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, {params: [87, 4]}),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, {params: [92, 4]}),
                    buildStep(StepType.GIVE_INVENTORY_ITEM, {params: [101, 1]}),
                    buildStep(StepType.GIVE_XP, {params: [15, 100]}),
                    buildStep(StepType.SEND_CLIENT_MESSAGE, {params: ['You sew some blue wizard bottoms.']})]
                ],
            },
            {
                id: 63,
                name: 'Sew Blue Wizard Top (8 Crafting) (5 Cloth, 5 Thread)',
                flags: ['REPEAT_ACTION'],
                actionInterval: 4,
                steps: [
                    [buildStep(StepType.HAS_INVENTORY_ITEM, {params: [87, 5]}),
                    buildStep(StepType.HAS_INVENTORY_ITEM, {params: [92, 5]}),
                    buildStep(StepType.HAS_SKILL_LEVEL, {params: [15, 8]}),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, {params: [87, 5]}),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, {params: [92, 5]}),
                    buildStep(StepType.GIVE_INVENTORY_ITEM, {params: [97, 1]}),
                    buildStep(StepType.GIVE_XP, {params: [15, 125]}),
                    buildStep(StepType.SEND_CLIENT_MESSAGE, {params: ['You sew a blue wizard top.']})]
                ],
            },
            {
                id: 64,
                name: 'Sew Green Wizard Hat (10 Crafting) (3 Cloth, 3 Thread)',
                flags: ['REPEAT_ACTION'],
                actionInterval: 4,
                steps: [
                    [buildStep(StepType.HAS_INVENTORY_ITEM, {params: [88, 3]}),
                    buildStep(StepType.HAS_INVENTORY_ITEM, {params: [92, 3]}),
                    buildStep(StepType.HAS_SKILL_LEVEL, {params: [15, 10]}),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, {params: [88, 3]}),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, {params: [92, 3]}),
                    buildStep(StepType.GIVE_INVENTORY_ITEM, {params: [94, 1]}),
                    buildStep(StepType.GIVE_XP, {params: [15, 150]}),
                    buildStep(StepType.SEND_CLIENT_MESSAGE, {params: ['You sew a green wizard hat.']})]
                ],
            },
            {
                id: 65,
                name: 'Sew Green Wizard Bottom (14 Crafting) (4 Cloth, 4 Thread)',
                flags: ['REPEAT_ACTION'],
                actionInterval: 4,
                steps: [
                    [buildStep(StepType.HAS_INVENTORY_ITEM, {params: [88, 4]}),
                    buildStep(StepType.HAS_INVENTORY_ITEM, {params: [92, 4]}),
                    buildStep(StepType.HAS_SKILL_LEVEL, {params: [15, 14]}),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, {params: [88, 4]}),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, {params: [92, 4]}),
                    buildStep(StepType.GIVE_INVENTORY_ITEM, {params: [102, 1]}),
                    buildStep(StepType.GIVE_XP, {params: [15, 200]}),
                    buildStep(StepType.SEND_CLIENT_MESSAGE, {params: ['You sew some green wizard bottoms.']})]
                ],
            },
            {
                id: 66,
                name: 'Sew Green Wizard Top (18 Crafting) (5 Cloth, 5 Thread)',
                flags: ['REPEAT_ACTION'],
                actionInterval: 4,
                steps: [
                    [buildStep(StepType.HAS_INVENTORY_ITEM, {params: [88, 5]}),
                    buildStep(StepType.HAS_INVENTORY_ITEM, {params: [92, 5]}),
                    buildStep(StepType.HAS_SKILL_LEVEL, {params: [15, 18]}),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, {params: [88, 5]}),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, {params: [92, 5]}),
                    buildStep(StepType.GIVE_INVENTORY_ITEM, {params: [98, 1]}),
                    buildStep(StepType.GIVE_XP, {params: [15, 250]}),
                    buildStep(StepType.SEND_CLIENT_MESSAGE, {params: ['You sew a green wizard top.']})]
                ],
            },
            {
                id: 67,
                name: 'Sew Purple Wizard Hat (20 Crafting) (3 Cloth, 3 Thread)',
                flags: ['REPEAT_ACTION'],
                actionInterval: 4,
                steps: [
                    [buildStep(StepType.HAS_INVENTORY_ITEM, {params: [89, 3]}),
                    buildStep(StepType.HAS_INVENTORY_ITEM, {params: [92, 3]}),
                    buildStep(StepType.HAS_SKILL_LEVEL, {params: [15, 20]}),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, {params: [89, 3]}),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, {params: [92, 3]}),
                    buildStep(StepType.GIVE_INVENTORY_ITEM, {params: [95, 1]}),
                    buildStep(StepType.GIVE_XP, {params: [15, 225]}),
                    buildStep(StepType.SEND_CLIENT_MESSAGE, {params: ['You sew a purple wizard hat.']})]
                ],
            },
            {
                id: 68,
                name: 'Sew Purple Wizard Bottom (24 Crafting) (4 Cloth, 4 Thread)',
                flags: ['REPEAT_ACTION'],
                actionInterval: 4,
                steps: [
                    [buildStep(StepType.HAS_INVENTORY_ITEM, {params: [89, 4]}),
                    buildStep(StepType.HAS_INVENTORY_ITEM, {params: [92, 4]}),
                    buildStep(StepType.HAS_SKILL_LEVEL, {params: [15, 24]}),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, {params: [89, 4]}),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, {params: [92, 4]}),
                    buildStep(StepType.GIVE_INVENTORY_ITEM, {params: [103, 1]}),
                    buildStep(StepType.GIVE_XP, {params: [15, 300]}),
                    buildStep(StepType.SEND_CLIENT_MESSAGE, {params: ['You sew some purple wizard bottoms.']})]
                ],
            },
            {
                id: 69,
                name: 'Sew Purple Wizard Top (28 Crafting) (5 Cloth, 5 Thread)',
                flags: ['REPEAT_ACTION'],
                actionInterval: 4,
                steps: [
                    [buildStep(StepType.HAS_INVENTORY_ITEM, {params: [89, 5]}),
                    buildStep(StepType.HAS_INVENTORY_ITEM, {params: [92, 5]}),
                    buildStep(StepType.HAS_SKILL_LEVEL, {params: [15, 28]}),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, {params: [89, 5]}),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, {params: [92, 5]}),
                    buildStep(StepType.GIVE_INVENTORY_ITEM, {params: [99, 1]}),
                    buildStep(StepType.GIVE_XP, {params: [15, 375]}),
                    buildStep(StepType.SEND_CLIENT_MESSAGE, {params: ['You sew a purple wizard top.']})]
                ],
            },
            {
                id: 70,
                name: 'Sew Burgundy Wizard Hat (30 Crafting) (3 Cloth, 3 Thread)',
                flags: ['REPEAT_ACTION'],
                actionInterval: 4,
                steps: [
                    [buildStep(StepType.HAS_INVENTORY_ITEM, {params: [90, 3]}),
                    buildStep(StepType.HAS_INVENTORY_ITEM, {params: [92, 3]}),
                    buildStep(StepType.HAS_SKILL_LEVEL, {params: [15, 30]}),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, {params: [90, 3]}),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, {params: [92, 3]}),
                    buildStep(StepType.GIVE_INVENTORY_ITEM, {params: [96, 1]}),
                    buildStep(StepType.GIVE_XP, {params: [15, 300]}),
                    buildStep(StepType.SEND_CLIENT_MESSAGE, {params: ['You sew a burgundy wizard hat.']})]
                ],
            },
            {
                id: 71,
                name: 'Sew Burgundy Wizard Bottom (34 Crafting) (4 Cloth, 4 Thread)',
                flags: ['REPEAT_ACTION'],
                actionInterval: 4,
                steps: [
                    [buildStep(StepType.HAS_INVENTORY_ITEM, {params: [90, 4]}),
                    buildStep(StepType.HAS_INVENTORY_ITEM, {params: [92, 4]}),
                    buildStep(StepType.HAS_SKILL_LEVEL, {params: [15, 34]}),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, {params: [90, 4]}),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, {params: [92, 4]}),
                    buildStep(StepType.GIVE_INVENTORY_ITEM, {params: [104, 1]}),
                    buildStep(StepType.GIVE_XP, {params: [15, 400]}),
                    buildStep(StepType.SEND_CLIENT_MESSAGE, {params: ['You sew some burgundy wizard bottoms.']})]
                ],
            },
            {
                id: 72,
                name: 'Sew Burgundy Wizard Top (38 Crafting) (5 Cloth, 5 Thread)',
                flags: ['REPEAT_ACTION'],
                actionInterval: 4,
                steps: [
                    [buildStep(StepType.HAS_INVENTORY_ITEM, {params: [90, 5]}),
                    buildStep(StepType.HAS_INVENTORY_ITEM, {params: [92, 5]}),
                    buildStep(StepType.HAS_SKILL_LEVEL, {params: [15, 38]}),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, {params: [90, 5]}),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, {params: [92, 5]}),
                    buildStep(StepType.GIVE_INVENTORY_ITEM, {params: [100, 1]}),
                    buildStep(StepType.GIVE_XP, {params: [15, 500]}),
                    buildStep(StepType.SEND_CLIENT_MESSAGE, {params: ['You sew a burgundy wizard top.']})]
                ],
            },
            {
                id: 73,
                name: 'Craft Clay Pot (10 Crafting) (1 Clay)',
                flags: ['REPEAT_ACTION'],
                actionInterval: 4,
                steps: [
                    [buildStep(StepType.UPGRADE_ACTION_INTERVAL),
                    buildStep(StepType.HAS_INVENTORY_ITEM, {params: [75, 1]}),
                    buildStep(StepType.HAS_SKILL_LEVEL, {params: [15, 10]}),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, {params: [75, 1]}),
                    buildStep(StepType.GIVE_INVENTORY_ITEM, {params: [125, 2]}),
                    buildStep(StepType.GIVE_XP, {params: [15, 50]}),
                    buildStep(StepType.SEND_CLIENT_MESSAGE, {params: ['You throw a pot.']}),
                    buildStep(StepType.PLAY_SOUND, {params: [30]})]
                ],
            },
            {
                id: 74,
                name: 'Fire Clay Pot',
                flags: ['REPEAT_ACTION'],
                actionInterval: 4,
                steps: [
                    [buildStep(StepType.UPGRADE_ACTION_INTERVAL),
                    buildStep(StepType.HAS_INVENTORY_ITEM, {params: [125, 1]}),
                    buildStep(StepType.HAS_SKILL_LEVEL, {params: [15, 10]}),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, {params: [125, 1]}),
                    buildStep(StepType.GIVE_INVENTORY_ITEM, {params: [77, 1]}),
                    buildStep(StepType.GIVE_XP, {params: [15, 50]}),
                    buildStep(StepType.SEND_CLIENT_MESSAGE, {params: ['You heat the pot until it is solid.']}),
                    buildStep(StepType.PLAY_SOUND, {params: [31]})]
                ],
            },
            Get.Interface.MixSpellPot(75, 'Lesser Air Wound', ' (1 Alchemy) (3 Air, 1 Force)', 19, 1, 5, 0, 83),
            Get.Interface.MixSpellPot(76, 'Lesser Water Wound', ' (2 Alchemy) (3 Air, 1 Water, 1 Force)', 19, 2, 10, 1, 84),
            Get.Interface.MixSpellPot(77, 'Lesser Earth Wound', ' (4 Alchemy) (3 Air, 1 Earth, 1 Force)', 19, 4, 15, 2, 85),
            Get.Interface.MixSpellPot(78, 'Lesser Fire Wound', ' (6 Alchemy) (3 Air, 1 Fire, 1 Force)', 19, 6, 20, 3, 86),
            Get.Interface.MixSpellPot(79, 'Fiewon Teleport', ' (1 Alchemy) (3 Air, 1 Void)', 19, 1, 25, 15, 127), //level 10, not 1
            Get.Interface.MixSpellPot(80, 'Cadgwith Teleport', ' (14 Alchemy) (2 Air, 1 Water, 1 Void)', 19, 14, 35, 16, 128),
            Get.Interface.MixSpellPot(81, 'Volcano Teleport', ' (18 Alchemy) (2 Air, 1 Earth, 1 Void)', 19, 18, 45, 17, 129),
            Get.Interface.MixSpellPot(82, 'Island Teleport', ' (22 Alchemy) (2 Air, 1 Fire, 1 Void)', 19, 22, 55, 18, 130),
            {
                id: 83,
                name: 'Become Bounty Hunter (Enable PvP) - 5 Minutes',
                actionInterval: 0,
                steps: [
                    [buildStep(StepType.SET_BOUNTY, {params: [true, 600]}),
                    buildStep(StepType.SEND_CLIENT_MESSAGE, {params: ['You register as a bounty hunter for 5 minutes.']})]
                ],
            },
            {
                id: 84,
                name: 'Become Bounty Hunter (Enable PvP) - 15 Minutes',
                actionInterval: 0,
                steps: [
                    [buildStep(StepType.SET_BOUNTY, {params: [true, 1800]}),
                    buildStep(StepType.SEND_CLIENT_MESSAGE, {params: ['You register as a bounty hunter for 15 minutes.']})]
                ],
            },
            {
                id: 85,
                name: 'Become Bounty Hunter (Enable PvP) - 2 Hours',
                actionInterval: 0,
                steps: [
                    [buildStep(StepType.SET_BOUNTY, {params: [true, 14400]}),
                    buildStep(StepType.SEND_CLIENT_MESSAGE, {params: ['You register as a bounty hunter for 2 hours.']})]
                ],
            },
            {
                id: 86,
                name: 'Resign as Bounty Hunter (Disable PvP)',
                actionInterval: 0,
                steps: [
                    [buildStep(StepType.CLEAR_BOUNTY, {params: [false]}),
                    buildStep(StepType.SEND_CLIENT_MESSAGE, {params: ['You resign as a bounty hunter.']})]
                ],
                postActionSteps: [
                    [24, false], //resign bounty hunter
                    [12, 'You resign as a bounty hunter.'],
                ],
            },
            {
                id: 87,
                name: 'Yes, destroy this structure.',
                actionInterval: -1,
                steps: [
                    [buildStep(StepType.DISASSEMBLE_CONSTRUCTION_OBJECT)]
                ],
            },
            {
                id: 88,
                name: 'Cancel',
                actionInterval: -1,
                steps: [
                    [buildStep(StepType.SHOW_DEFAULT_INTERFACES)]
                ],
            },
            {
                id: 89,
                name: 'Yes, remove this upgrade.',
                actionInterval: -1,
                steps: [
                    [buildStep(StepType.DISASSEMBLE_WORLD_OBJECT_UPGRADE)]
                ],
            },
            {
                id: 90,
                name: 'Request Construction Frame - Build Level 1 Construction Camps',
                actionInterval: 0,
                steps: [
                    [buildStep(StepType.HAS_INVENTORY_ITEM, {
                        params: [240, 1, false],
                        stepResultPass: 'NEXT_STEP',
                        stepResultFail: 'NEXT_STEP_LIST',
                    }),
                    buildStep(StepType.SEND_CLIENT_MESSAGE, {
                        params: ['You already have a construction frame.'],
                        stepResultPass: 'END_ACTION',
                        stepResultFail: 'END_ACTION',
                    })],
                    [buildStep(StepType.GIVE_INVENTORY_ITEM, {params: [240, 1]}),
                    buildStep(StepType.SEND_CLIENT_MESSAGE, {params: ['The Emperor gives you a pre-built frame to practice building.']})],
                ],
            },
            {
                id: 91,
                name: '',
                actionInterval: 0,
                steps: [],
            },
            Get.Interface.BuildLumberCamp(92, 'Build Lumber Camp (1 Construction, 10 Woodcutting) (5 Logs, 1 Copper Axe)', 5, 1, 10, 1, 16, 100, 'log lumber camp'),
            Get.Interface.BuildLumberCamp(93, 'Build Oak Lumber Camp (10 Construction, 20 Woodcutting) (5 Oak Logs, 1 Iron Axe)', 6, 2, 20, 10, 17, 200, 'oak log lumber camp'),
            Get.Interface.BuildLumberCamp(94, 'Build Ash Lumber Camp (20 Construction, 30 Woodcutting) (5 Ash Logs, 1 Steel Axe)', 7, 3, 30, 20, 18, 300, 'ash log lumber camp'),
            Get.Interface.BuildLumberCamp(95, 'Build Fur Lumber Camp (30 Construction, 40 Woodcutting) (5 Fur Logs, 1 Nelenite Axe)', 8, 4, 40, 30, 19, 400, 'fur log lumber camp'),
            Get.Interface.BuildMiningCamp(96, 'Build Copper Mining Camp (1 Cons., 10 Mining) (5 Logs, 1 Copper Pickaxe)', 5, 9, 10, 1, 21, 100, 'copper mining camp'),
            Get.Interface.BuildMiningCamp(97, 'Build Clay Mining Camp (1 Cons., 10 Mining) (5 Logs, 1 Copper Pickaxe)', 5, 9, 10, 1, 22, 100, 'clay mining camp'),
            Get.Interface.BuildMiningCamp(98, 'Build Iron Mining Camp (10 Cons., 20 Mining) (5 Oak Logs, 1 Iron Pickaxe)', 6, 10, 20, 10, 23, 200, 'iron mining camp'),
            Get.Interface.BuildMiningCamp(99, 'Build Coal Mining Camp (20 Cons., 30 Mining) (5 Ash Logs, 1 Steel Pickaxe)', 7, 11, 30, 20, 24, 300, 'coal mining camp'),
            Get.Interface.BuildMiningCamp(100, 'Build Nelenite Mining Camp (30 Cons., 40 Mining) (5 Fur Logs, 1 Nelenite Pickaxe)', 8, 12, 40, 30, 25, 400, 'nelenite mining camp'),
            Get.Interface.BuildFishingPool(101, 'Build Shallow Pool Fishery (10 Cons., 20 Fishing) (5 Oak Logs, 1 Fising Net)', 6, 20, 10, 20, 100, 'shallow pool fishery'),
            {
                id: 102,
                name: 'Steel Furnace (25 Construction, 35 Smithing) (5 Steel Bars)',
                actionInterval: 0,
                steps: [
                    [buildStep(StepType.HAS_INVENTORY_ITEM, {params: [61, 5]}),
                    buildStep(StepType.HAS_INVENTORY_ITEM, {params: [63, 1]}),
                    buildStep(StepType.HAS_SKILL_LEVEL, {params: [18, 25]}),
                    buildStep(StepType.HAS_SKILL_LEVEL, {params: [14, 35]}),
                    buildStep(StepType.UPGRADE_WORLD_OBJECT, {
                        params: [26],
                        stepResultFail: StepResult.END_ACTION,
                        stepResultPass: 'NEXT_STEP_LIST' 
                    })],
                    [buildStep(StepType.REMOVE_INVENTORY_ITEM, {params: [61, 5]}),
                    buildStep(StepType.GIVE_XP, {params: [18, 250]}),
                    buildStep(StepType.SEND_CLIENT_MESSAGE, {params: ['You upgrade the furnace to process items faster.']})]
                ],
            },
            {
                id: 103,
                name: '??? Furnace (65 Construction, 75 Smithing) (Coming Soon!)',
                actionInterval: 0,
                steps: [],
                preActionSteps: [],
                actionSteps: [],
                postActionSteps: [],
            },
            {
                id: 104,
                name: 'Double Anvil (55 Construction, 65 Smithing) (Coming Soon!)',
                actionInterval: 0,
                steps: [],
            },
            {
                id: 105,
                name: 'Double Range (10 Construction, 20 Cooking) (Coming Soon!)',
                actionInterval: 0,
                steps: [],
            },
            {
                id: 106,
                name: 'Triple Range (50 Construction, 60 Cooking) (Coming Soon!)',
                actionInterval: 0,
                steps: [],
            },
            {
                id: 107,
                name: 'Quad Range (90 Construction, 100 Cooking) (Coming Soon!)',
                actionInterval: 0,
                steps: [],
            },
            {
                id: 108,
                name: 'Dual Spinning Wheel (40 Construction, 50 Crafting) (Coming Soon!)',
                actionInterval: 0,
                steps: [],
            },
            {
                id: 109,
                name: 'Fur Pottery Wheel (30 Construction, 40 Crafting) (5 Fur Logs)',
                actionInterval: 0,
                steps: [
                    [buildStep(StepType.HAS_INVENTORY_ITEM, {params: [8, 5]}),
                    buildStep(StepType.HAS_INVENTORY_ITEM, {params: [63, 1]}),
                    buildStep(StepType.HAS_SKILL_LEVEL, {params: [18, 30]}),
                    buildStep(StepType.HAS_SKILL_LEVEL, {params: [15, 40]}),
                    buildStep(StepType.UPGRADE_WORLD_OBJECT, {
                        params: [27],
                        stepResultFail: StepResult.END_ACTION,
                        stepResultPass: 'NEXT_STEP_LIST' 
                    })],
                    [buildStep(StepType.REMOVE_INVENTORY_ITEM, {params: [8, 5]}),
                    buildStep(StepType.GIVE_XP, {params: [18, 400]}),
                    buildStep(StepType.SEND_CLIENT_MESSAGE, {params: ['You upgrade the pottery wheel to mold items faster.']})]
                ],
            },
            {
                id: 110,
                name: 'Triple Pottery Wheel (60 Construction, 70 Crafting) (Coming Soon!)',
                actionInterval: 0,
                steps: [],
            },
            {
                id: 111,
                name: 'Quad Pottery Wheel (90 Construction, 100 Crafting) (Coming Soon!)',
                actionInterval: 0,
                steps: [],
            },
            Get.Interface.BuildTrainingDummy(112, 'Build Copper Training Dummy (1 Cons., 10 Combat) (5 Logs, 1 Copper Platebody)', 5, 42, 10, 1, 41, 100, 'copper training dummy'),
            Get.Interface.BuildTrainingDummy(113, 'Build Iron Training Dummy (10 Cons., 20 Combat) (5 Oak Logs, 1 Iron Platebody)', 6, 43, 20, 10, 42, 200, 'iron training dummy'),
            Get.Interface.BuildTrainingDummy(114, 'Build Steel Training Dummy (20 Cons., 30 Combat) (5 Ash Logs, 1 Steel Platebody)', 7, 44, 30, 20, 43, 300, 'steel training dummy'),
            Get.Interface.BuildTrainingDummy(115, 'Build Nelenite Training Dummy (30 Cons., 40 Combat) (5 Fur Logs, 1 Nelenite Platebody)', 8, 45, 40, 30, 44, 400, 'nelenite training dummy'),

            Get.Interface.SmeltBar(116, 'Smelt Gothite Bar (40 Smithing) (2 Gothite Ore, 2 Coal)', 'gothite bar', 40, 253, 255, 125, 2),
            Get.Interface.Smith(117, 'Smith Gothite Axe (40 Smithing, 1 Bar)', 'gothite axe', 255,  1, 125, 277, 40, 4),
            Get.Interface.Smith(118, 'Smith Gothite Dagger (41 Smithing, 1 Bar)', 'gothite dagger', 255,  1, 125, 271, 41, 4),
            Get.Interface.Smith(119, 'Smith Gothite Arrowheads (15) (42 Smithing, 1 Bar)', 'gothite arrowheads', 255,  1, 125, 275, 42, 4, 15),
            Get.Interface.Smith(120, 'Smith Gothite Pickaxe (43 Smithing, 2 Bars)', 'gothite pickaxe', 255,  2, 250, 279, 43, 4),
            Get.Interface.Smith(121, 'Smith Gothite Helm (44 Smithing, 2 Bars)', 'gothite helm', 255,  2, 250, 257, 44, 4),
            Get.Interface.Smith(122, 'Smith Gothite Sword (45 Smithing, 3 Bars)', 'gothite sword', 255,  3, 375, 273, 45, 4),
            Get.Interface.Smith(123, 'Smith Gothite Full Helm (46 Smithing, 3 Bars)', 'gothite full helmet', 255,  3, 375, 259, 46, 4),
            Get.Interface.Smith(124, 'Smith Gothite Platelegs (47 Smithing, 4 Bars)', 'gothite platelegs', 255,  4, 500, 261, 47, 4),
            Get.Interface.Smith(125, 'Smith Gothite Chainhelm (48 Smithing, 3 Bars)', 'gothite chain helm', 255,  3, 400, 265, 48, 6),
            Get.Interface.Smith(126, 'Smith Gothite Chainlegs (49 Smithing, 4 Bars)', 'gothite chainlegs', 255,  4, 525, 267, 49, 6),
            Get.Interface.Smith(127, 'Smith Gothite Chainbody (50 Smithing, 5 Bars)', 'gothite chainbody', 255,  5, 650, 269, 50, 6),
            Get.Interface.Smith(128, 'Smith Gothite Platebody (50 Smithing, 5 Bars)', 'gothite platebody', 255,  5, 625, 263, 50, 4),

            Get.Interface.SmeltBar(129, 'Smelt Osmium Bar (50 Smithing) (2 Osmium Ore, 3 Coal)', 'osmium bar', 50, 281, 283, 150, 3),
            Get.Interface.Smith(130, 'Smith Osmium Axe (50 Smithing, 1 Bar)', 'osmium axe', 283,  1, 150, 305, 50, 4),
            Get.Interface.Smith(131, 'Smith Osmium Dagger (51 Smithing, 1 Bar)', 'osmium dagger', 283,  1, 150, 299, 51, 4),
            Get.Interface.Smith(132, 'Smith Osmium Arrowheads (15) (52 Smithing, 1 Bar)', 'osmium arrowheads', 283,  1, 150, 303, 52, 4, 15),
            Get.Interface.Smith(133, 'Smith Osmium Pickaxe (53 Smithing, 2 Bars)', 'osmium pickaxe', 283,  2, 300, 307, 53, 4),
            Get.Interface.Smith(134, 'Smith Osmium Helm (54 Smithing, 2 Bars)', 'osmium helm', 283,  2, 325, 285, 54, 4),
            Get.Interface.Smith(135, 'Smith Osmium Sword (55 Smithing, 3 Bars)', 'osmium sword', 283,  3, 450, 301, 55, 4),
            Get.Interface.Smith(136, 'Smith Osmium Full Helm (56 Smithing, 3 Bars)', 'osmium full helmet', 283,  3, 450, 287, 56, 4),
            Get.Interface.Smith(137, 'Smith Osmium Platelegs (57 Smithing, 4 Bars)', 'osmium platelegs', 283,  4, 600, 289, 57, 4),
            Get.Interface.Smith(138, 'Smith Osmium Chainhelm (58 Smithing, 3 Bars)', 'osmium chain helm', 283,  3, 480, 293, 58, 6),
            Get.Interface.Smith(139, 'Smith Osmium Chainlegs (59 Smithing, 4 Bars)', 'osmium chainlegs', 283,  4, 630, 295, 59, 6),
            Get.Interface.Smith(140, 'Smith Osmium Chainbody (60 Smithing, 5 Bars)', 'osmium chainbody', 283,  5, 780, 297, 60, 6),
            Get.Interface.Smith(141, 'Smith Osmium Platebody (60 Smithing, 5 Bars)', 'osmium platebody', 283,  5, 750, 291, 60, 4),

            Get.Interface.Fletch(142, 'Cut Arrow Shafts (25) (40 Fletching) (1 King Maple Log)', 315, 1, 40, 74, 25, 100, 'You cut 25 arrow shafts.'),
            Get.Interface.Fletch(143, 'Cut King Maple Bow (45 Fletching) (1 King Maple Log)', 315, 1, 45, 323, 1, 150, 'You cut a king maple bow.'),
            Get.Interface.Fletch(144, 'Cut Arrow Shafts (30) (50 Fletching) (1 Magic Log)', 317, 1, 50, 74, 30, 120, 'You cut 30 arrow shafts.'),
            Get.Interface.Fletch(145, 'Cut Magic Bow (55 Fletching) (1 Magic Log)', 317, 1, 55, 325, 1, 180, 'You cut a magic bow.'),

            Get.Interface.BuildLumberCamp(146, 'Build King Maple Lumber Camp (40 Construction, 50 Woodcutting) (5 King Maple Logs, 1 Gothite Axe)', 315, 277, 50, 40, 51, 500, 'king maple log lumber camp'),
            Get.Interface.BuildLumberCamp(147, 'Build Magic Lumber Camp (50 Construction, 60 Woodcutting) (5 Magic Logs, 1 Osmium Axe)', 317, 305, 60, 50, 52, 600, 'magic log lumber camp'),
            Get.Interface.BuildMiningCamp(148, 'Build Gothite Mining Camp (40 Cons., 50 Mining) (5 King Maple Logs, 1 Gothite Pickaxe)', 315, 279, 50, 40, 53, 500, 'gothite mining camp'),
            Get.Interface.BuildMiningCamp(149, 'Build Osmium Mining Camp (50 Cons., 60 Mining) (5 Magic Logs, 1 Osmium Pickaxe)', 317, 307, 60, 50, 54, 600, 'osmium mining camp'),
            Get.Interface.BuildTrainingDummy(150, 'Build Gothite Training Dummy (40 Cons., 50 Combat) (5 King Maple Logs, 1 Gothite Platebody)', 315, 263, 50, 40, 55, 500, 'gothite training dummy'),
            Get.Interface.BuildTrainingDummy(151, 'Build Osmium Training Dummy (50 Cons., 60 Combat) (5 Magic Logs, 1 Osmium Platebody)', 317, 291, 60, 50, 56, 600, 'osmium training dummy'),
        
            Get.Interface.BuildFishingPool(152, 'Build Deep Pool Fishery (40 Cons., 50 Fishing) (5 King Maple Logs, 1 Fishing Net)', 315, 50, 40, 58, 500, 'deep pool fishery'),
            {
                id: 153,
                name: 'Combine all money bags.',
                actionInterval: -1,
                steps: [
                    [buildStep(StepType.COMBINE_MONEY_BAGS)]
                ],
            },
            {
                id: 154,
                name: 'Spin 3 Flax into Drawstring (20 Crafting, 2-5% Success)',
                flags: ['REPEAT_ACTION'],
                actionInterval: 4,
                steps: [
                    [   buildStep(StepType.HAS_INVENTORY_ITEM, {params: [124, 3]}),
                        buildStep(StepType.HAS_SKILL_LEVEL, {params: [15, 20]}),
                        buildStep(StepType.REMOVE_INVENTORY_ITEM, {params: [124, 3]}),
                        buildStep(StepType.ROLL_SKILL_SUCCESS, {
                            params: [15, 60, 20, false, 0.4, 0],
                            stepResultFail: StepResult.NEXT_STEP_LIST
                        }),
                        buildStep(StepType.GIVE_INVENTORY_ITEM, {params: [330, 1]}),
                        buildStep(StepType.GIVE_XP, {params: [15, 300]}),
                        buildStep(StepType.SEND_CLIENT_MESSAGE, {params: ['You successfully spin a strong drawstring.']}),
                        buildStep(StepType.PLAY_SOUND, {params: [29]})
                    ],
                    [
                        buildStep(StepType.GIVE_XP, {params: [15, 30]}),
                        buildStep(StepType.SEND_CLIENT_MESSAGE, {params: ['You break the flax attempting to craft the drawstring.']}),
                        buildStep(StepType.PLAY_SOUND, {params: [29]}),
                    ],
                ],
            },
            {
                id: 155,
                name: 'Sew Item Bag (1 Crafting) (1 Drawstring, 3 Blue Cloth, 3 Thread)',
                flags: ['REPEAT_ACTION'],
                actionInterval: 4,
                steps: [
                    [buildStep(StepType.HAS_INVENTORY_ITEM, {params: [87, 3]}),
                    buildStep(StepType.HAS_INVENTORY_ITEM, {params: [92, 3]}),
                    buildStep(StepType.HAS_INVENTORY_ITEM, {params: [330, 1]}),
                    buildStep(StepType.HAS_SKILL_LEVEL, {params: [15, 1]}),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, {params: [330, 1]}),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, {params: [87, 3]}),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, {params: [92, 3]}),
                    buildStep(StepType.GIVE_INVENTORY_ITEM, {params: [329, 1]}),
                    buildStep(StepType.GIVE_XP, {params: [15, 175]}),
                    buildStep(StepType.SEND_CLIENT_MESSAGE, {params: ['You sew an item bag.']})]
                ],
            },
            Get.Interface.RepairBag(156, 'Repair Bag - 10 Uses (1 Blue Cloth, 1 Thread) (1 Crafting)', 87, 1, 1),
            Get.Interface.RepairBag(157, 'Repair Bag - 25 Uses (1 Green Cloth, 1 Thread) (10 Crafting)', 88, 10, 2),
            Get.Interface.RepairBag(158, 'Repair Bag - 50 Uses (1 Purple Cloth, 1 Thread) (20 Crafting)', 89, 20, 3),
            Get.Interface.RepairBag(159, 'Repair Bag - 100 Uses (1 Burgundy Cloth, 1 Thread) (30 Crafting)', 90, 30, 4),
            Get.Interface.UpgradeBag(160, 'Upgrade Bag - Max 10 (1 Blue Cloth, 1 Thread) (1 Crafting)', 87, 1, 1),
            Get.Interface.UpgradeBag(161, 'Upgrade Bag - Max 25 (1 Green Cloth, 1 Thread) (10 Crafting)', 88, 10, 2),
            Get.Interface.UpgradeBag(162, 'Upgrade Bag - Max 50 (1 Purple Cloth, 1 Thread) (20 Crafting)', 89, 20, 3),
            Get.Interface.UpgradeBag(163, 'Upgrade Bag - Max 100 (1 Burgundy Cloth, 1 Thread) (30 Crafting)', 90, 30, 4),
            Get.Interface.ShowDialog(164, ''),

            Get.Interface.FletchIncinerate(165, 'Cut Arrow Shafts (5) (1 Fletching) (1 Log)', 5, 1, 1, 74, 5, 20, 'You cut 5 arrow shafts and the knife incinerates them.'),
            Get.Interface.FletchIncinerate(166, 'Cut Bow (5 Fletching) (1 Log)', 5, 1, 5, 33, 1, 30, 'You cut a bow and the knife incinerates it.'),
            Get.Interface.FletchIncinerate(167, 'Cut Arrow Shafts (10) (10 Fletching) (1 Oak Log)', 6, 1, 10, 74, 10, 40, 'You cut 10 arrow shafts and the knife incinerates them.'),
            Get.Interface.FletchIncinerate(168, 'Cut Oak Bow (15 Fletching) (1 Oak Log)', 6, 1, 15, 34, 1, 60, 'You cut an oak bow and the knife incinerates it.'),
            Get.Interface.FletchIncinerate(169, 'Cut Arrow Shafts (15) (20 Fletching) (1 Ash Log)', 7, 1, 20, 74, 15, 60, 'You cut 15 arrow shafts and the knife incinerates them.'),
            Get.Interface.FletchIncinerate(170, 'Cut Ash Bow (25 Fletching) (1 Ash Log)', 7, 1, 25, 35, 1, 90, 'You cut an ash bow and the knife incinerates it.'),
            Get.Interface.FletchIncinerate(171, 'Cut Arrow Shafts (20) (30 Fletching) (1 Fur Log)', 8, 1, 30, 74, 20, 80, 'You cut 20 arrow shafts and the knife incinerates them.'),
            Get.Interface.FletchIncinerate(172, 'Cut Fur Bow (35 Fletching) (1 Fur Log)', 8, 1, 35, 36, 1, 120, 'You cut a fur bow and the knife incinerates it.'),
            Get.Interface.FletchIncinerate(173, 'Cut Arrow Shafts (25) (40 Fletching) (1 King Maple Log)', 315, 1, 40, 74, 25, 100, 'You cut 25 arrow shafts and the knife incinerates them.'),
            Get.Interface.FletchIncinerate(174, 'Cut King Maple Bow (45 Fletching) (1 King Maple Log)', 315, 1, 45, 323, 1, 150, 'You cut a king maple bow and the knife incinerates it.'),
            Get.Interface.FletchIncinerate(175, 'Cut Arrow Shafts (30) (50 Fletching) (1 Magic Log)', 317, 1, 50, 74, 30, 120, 'You cut 30 arrow shafts and the knife incinerates them.'),
            Get.Interface.FletchIncinerate(176, 'Cut Magic Bow (55 Fletching) (1 Magic Log)', 317, 1, 55, 325, 1, 180, 'You cut a magic bow and the knife incinerates it.'),
            {
                id: 177,
                name: 'Sew Red Wizard Hat (40 Crafting) (3 Cloth, 3 Thread)',
                flags: ['REPEAT_ACTION'],
                actionInterval: 4,
                steps: [
                    [buildStep(StepType.HAS_INVENTORY_ITEM, {params: [537, 3]}),
                    buildStep(StepType.HAS_INVENTORY_ITEM, {params: [92, 3]}),
                    buildStep(StepType.HAS_SKILL_LEVEL, {params: [15, 40]}),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, {params: [537, 3]}),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, {params: [92, 3]}),
                    buildStep(StepType.GIVE_INVENTORY_ITEM, {params: [539, 1]}),
                    buildStep(StepType.GIVE_XP, {params: [15, 375]}),
                    buildStep(StepType.SEND_CLIENT_MESSAGE, {params: ['You sew a red wizard hat.']})]
                ],
            },
            {
                id: 178,
                name: 'Sew Red Wizard Bottom (44 Crafting) (4 Cloth, 4 Thread)',
                flags: ['REPEAT_ACTION'],
                actionInterval: 4,
                steps: [
                    [buildStep(StepType.HAS_INVENTORY_ITEM, {params: [537, 4]}),
                    buildStep(StepType.HAS_INVENTORY_ITEM, {params: [92, 4]}),
                    buildStep(StepType.HAS_SKILL_LEVEL, {params: [15, 4]}),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, {params: [537, 4]}),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, {params: [92, 4]}),
                    buildStep(StepType.GIVE_INVENTORY_ITEM, {params: [543, 1]}),
                    buildStep(StepType.GIVE_XP, {params: [15, 500]}),
                    buildStep(StepType.SEND_CLIENT_MESSAGE, {params: ['You sew some red wizard bottoms.']})]
                ],
            },
            {
                id: 179,
                name: 'Sew Red Wizard Top (48 Crafting) (5 Cloth, 5 Thread)',
                flags: ['REPEAT_ACTION'],
                actionInterval: 4,
                steps: [
                    [buildStep(StepType.HAS_INVENTORY_ITEM, {params: [537, 5]}),
                    buildStep(StepType.HAS_INVENTORY_ITEM, {params: [92, 5]}),
                    buildStep(StepType.HAS_SKILL_LEVEL, {params: [15, 8]}),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, {params: [537, 5]}),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, {params: [92, 5]}),
                    buildStep(StepType.GIVE_INVENTORY_ITEM, {params: [541, 1]}),
                    buildStep(StepType.GIVE_XP, {params: [15, 625]}),
                    buildStep(StepType.SEND_CLIENT_MESSAGE, {params: ['You sew a red wizard top.']})]
                ],
            },
            Get.Interface.RepairBag(180, 'Repair Bag - 200 Uses (1 Red Cloth, 1 Thread) (40 Crafting)', 537, 40, 5),
            Get.Interface.UpgradeBag(181, 'Upgrade Bag - Max 200 (1 Red Cloth, 1 Thread) (40 Crafting)', 537, 40, 5),
            {
                id: 182,
                name: 'Sew Grey Pelt Pants (30 Crafting) (4 Pelts, 4 Thread)',
                flags: ['REPEAT_ACTION'],
                actionInterval: 4,
                steps: [
                    [buildStep(StepType.HAS_INVENTORY_ITEM, {params: [515, 4]}),
                    buildStep(StepType.HAS_INVENTORY_ITEM, {params: [92, 4]}),
                    buildStep(StepType.HAS_SKILL_LEVEL, {params: [15, 30]}),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, {params: [515, 4]}),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, {params: [92, 4]}),
                    buildStep(StepType.GIVE_INVENTORY_ITEM, {params: [519, 1]}),
                    buildStep(StepType.GIVE_XP, {params: [15, 400]}),
                    buildStep(StepType.SEND_CLIENT_MESSAGE, {params: ['You sew some grey wolf pelt pants.']})]
                ],
            },
            {
                id: 183,
                name: 'Sew Grey Pelt Torso (35 Crafting) (5 Pelts, 5 Thread)',
                flags: ['REPEAT_ACTION'],
                actionInterval: 4,
                steps: [
                    [buildStep(StepType.HAS_INVENTORY_ITEM, {params: [515, 5]}),
                    buildStep(StepType.HAS_INVENTORY_ITEM, {params: [92, 5]}),
                    buildStep(StepType.HAS_SKILL_LEVEL, {params: [15, 35]}),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, {params: [515, 5]}),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, {params: [92, 5]}),
                    buildStep(StepType.GIVE_INVENTORY_ITEM, {params: [517, 1]}),
                    buildStep(StepType.GIVE_XP, {params: [15, 500]}),
                    buildStep(StepType.SEND_CLIENT_MESSAGE, {params: ['You sew a grey wolf pelt torso.']})]
                ],
            },
            {
                id: 184,
                name: 'Sew Dark Grey Pelt Pants (50 Crafting) (4 Pelts, 4 Thread)',
                flags: ['REPEAT_ACTION'],
                actionInterval: 4,
                steps: [
                    [buildStep(StepType.HAS_INVENTORY_ITEM, {params: [552, 4]}),
                    buildStep(StepType.HAS_INVENTORY_ITEM, {params: [92, 4]}),
                    buildStep(StepType.HAS_SKILL_LEVEL, {params: [15, 50]}),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, {params: [552, 4]}),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, {params: [92, 4]}),
                    buildStep(StepType.GIVE_INVENTORY_ITEM, {params: [556, 1]}),
                    buildStep(StepType.GIVE_XP, {params: [15, 600]}),
                    buildStep(StepType.SEND_CLIENT_MESSAGE, {params: ['You sew some dark grey wolf pelt pants.']})]
                ],
            },
            {
                id: 185,
                name: 'Sew Dark Grey Pelt Torso (55 Crafting) (5 Pelts, 5 Thread)',
                flags: ['REPEAT_ACTION'],
                actionInterval: 4,
                steps: [
                    [buildStep(StepType.HAS_INVENTORY_ITEM, {params: [552, 5]}),
                    buildStep(StepType.HAS_INVENTORY_ITEM, {params: [92, 5]}),
                    buildStep(StepType.HAS_SKILL_LEVEL, {params: [15, 55]}),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, {params: [552, 5]}),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, {params: [92, 5]}),
                    buildStep(StepType.GIVE_INVENTORY_ITEM, {params: [554, 1]}),
                    buildStep(StepType.GIVE_XP, {params: [15, 750]}),
                    buildStep(StepType.SEND_CLIENT_MESSAGE, {params: ['You sew a dark grey wolf pelt torso.']})]
                ],
            },
            {
                id: 186,
                name: 'Bind this item permanently?',
                actionInterval: 0,
                steps: [
                    [buildStep(StepType.BIND_BAG_ITEM, {params: ['ITEM_ID_OTHER']}),
                    buildStep(StepType.DEPOSIT_BAG_ITEM, {params: [10000]})]
                ],
            },
            Get.Interface.BuildMarketStall(187, 'Build Market Stall (1 Construction, 1 Slot) (5 Logs, 2 Copper Bars)', 5, 59, 1, 71, 125),
            Get.Interface.BuildMarketStall(188, 'Build Oak Market Stall (10 Construction, 2 Slots) (5 Oak Logs, 2 Iron Bars)', 6, 60, 10, 72, 250),
            Get.Interface.BuildMarketStall(189, 'Build Ash Market Stall (20 Construction, 3 Slots) (5 Ash Logs, 2 Steel Bars)', 7, 61, 20, 73, 375),
            Get.Interface.BuildMarketStall(190, 'Build Fur Market Stall (30 Construction, 4 Slots) (5 Fur Logs, 2 Nelenite Bars)', 8, 62, 30, 74, 500),
            Get.Interface.BuildMarketStall(191, 'Build King Maple Market Stall (40 Construction, 5 Slots) (5 King Maple Logs, 2 Gothite Bars)', 315, 255, 40, 75, 625),
            Get.Interface.BuildMarketStall(192, 'Build Magic Market Stall (50 Construction, 6 Slots) (5 Magic Logs, 2 Osmium Bars)', 317, 283, 50, 76, 750),
            Get.Interface.PurchaseBankSlots(193, 1),
            Get.Interface.MixSpellPot(194, 'Hyrill Teleport', ' (26 Alchemy) (2 Air, 1 Fire, 1 Earth, 1 Void)', 19, 26, 65, 19, 608),
            Get.Interface.MixSpellPot(195, 'Bodiam Teleport', ' (30 Alchemy) (2 Air, 1 Metal, 1 Void)', 19, 30, 75, 20, 609),
            Get.Interface.StyleHair(196, 'Bald Beacon', 0),
            Get.Interface.StyleHair(197, 'Scruffy', 1),
            Get.Interface.StyleHair(198, 'Left Side Swipe', 2),
            Get.Interface.StyleHair(199, 'Right Side Swipe', 3),
            Get.Interface.StyleHair(200, 'The Messy Dessy', 4),
            Get.Interface.StyleHair(201, 'Buzz Cut', 5),
            Get.Interface.StyleHair(202, 'Mohawk', 6),
            Get.Interface.StyleHair(203, 'Dread Bangs', 7),
            Get.Interface.StyleHair(204, 'Midlife Crisis', 8),
            {
                id: 205,
                name: 'Iron Range (10 Construction, 20 Cooking) (5 Iron Bars)',
                actionInterval: 0,
                steps: [
                    [buildStep(StepType.HAS_INVENTORY_ITEM, {params: [60, 5]}),
                    buildStep(StepType.HAS_INVENTORY_ITEM, {params: [63, 1]}),
                    buildStep(StepType.HAS_SKILL_LEVEL, {params: [18, 10]}),
                    buildStep(StepType.HAS_SKILL_LEVEL, {params: [13, 20]}),
                    buildStep(StepType.UPGRADE_WORLD_OBJECT, {
                        params: [32],
                        stepResultFail: StepResult.END_ACTION,
                    })],
                    [buildStep(StepType.REMOVE_INVENTORY_ITEM, {params: [60, 5]}),
                    buildStep(StepType.GIVE_XP, {params: [18, 150]}),
                    buildStep(StepType.SEND_CLIENT_MESSAGE, {params: ['You upgrade the range to cook raw foods faster.']})]
                ],
            },
            {
                id: 206,
                name: 'Available! Change Username',
                actionInterval: -1,
                steps: [
                    [buildStep(StepType.CHANGE_USERNAME)],
                ],
            },
            Get.Interface.BuyMaxLevelStandard(207, 'Buy Melee Focus Standard', 612, 0),
            Get.Interface.BuyMaxLevelStandard(208, 'Buy Melee Power Standard', 613, 1),
            Get.Interface.BuyMaxLevelStandard(209, 'Buy Melee Defense Standard', 614, 2),
            Get.Interface.BuyMaxLevelStandard(210, 'Buy Ranged Focus Standard', 615, 3),
            Get.Interface.BuyMaxLevelStandard(211, 'Buy Ranged Power Standard', 616, 4),
            Get.Interface.BuyMaxLevelStandard(212, 'Buy Ranged Defense Standard', 617, 5),
            Get.Interface.BuyMaxLevelStandard(213, 'Buy Magic Focus Standard', 618, 6),
            Get.Interface.BuyMaxLevelStandard(214, 'Buy Magic Power Standard', 619, 7),
            Get.Interface.BuyMaxLevelStandard(215, 'Buy Magic Defense Standard', 620, 8),
            Get.Interface.BuyMaxLevelStandard(216, 'Buy Woodcutting Standard', 621, 9),
            Get.Interface.BuyMaxLevelStandard(217, 'Buy Mining Standard', 622, 10),
            Get.Interface.BuyMaxLevelStandard(218, 'Buy Hitpoints Standard', 623, 11),
            Get.Interface.BuyMaxLevelStandard(219, 'Buy Fishing Standard', 624, 12),
            Get.Interface.BuyMaxLevelStandard(220, 'Buy Cooking Standard', 625, 13),
            Get.Interface.BuyMaxLevelStandard(221, 'Buy Smithing Standard', 626, 14),
            Get.Interface.BuyMaxLevelStandard(222, 'Buy Crafting Standard', 627, 15),
            Get.Interface.BuyMaxLevelStandard(223, 'Buy Fletching Standard', 628, 16),
            Get.Interface.BuyMaxLevelStandard(224, 'Buy Firemaking Standard', 629, 17),
            Get.Interface.BuyMaxLevelStandard(225, 'Buy Construction Standard', 630, 18),
            Get.Interface.BuyMaxLevelStandard(226, 'Buy Alchemy Standard', 631, 19),
            Get.Interface.BuyMaxLevelStandard(227, 'Buy Thieving Standard', 632, 20),
            Get.Interface.MixSpellPot(228, 'Lesser Metal Wound', ' (8 Alchemy) (3 Air, 1 Metal, 1 Force)', 19, 8, 45, 4, 702),
            Get.Interface.MixSpellPot(229, 'Air Wound', ' (10 Alchemy) (3 Air, 2 Force)', 19, 10, 50, 5, 703),
            Get.Interface.MixSpellPot(230, 'Water Wound', ' (12 Alchemy) (3 Air, 2 Water, 2 Force)', 19, 12, 55, 6, 704),
            Get.Interface.MixSpellPot(231, 'Earth Wound', ' (14 Alchemy) (3 Air, 2 Earth, 2 Force)', 19, 14, 60, 7, 705),
            Get.Interface.MixSpellPot(232, 'Fire Wound', ' (16 Alchemy) (3 Air, 2 Fire, 2 Force)', 19, 16, 65, 8, 706),
            Get.Interface.MixSpellPot(233, 'Metal Wound', ' (18 Alchemy) (3 Air, 2 Metal, 2 Force)', 19, 18, 70, 9, 707),
            Get.Interface.MixSpellPot(234, 'Greater Air Wound', ' (20 Alchemy) (4 Air, 2 Force)', 19, 10, 50, 10, 708),
            Get.Interface.MixSpellPot(235, 'Greater Water Wound', ' (22 Alchemy) (4 Air, 2 Water, 2 Force)', 19, 12, 55, 11, 709),
            Get.Interface.MixSpellPot(236, 'Greater Earth Wound', ' (24 Alchemy) (4 Air, 2 Earth, 2 Force)', 19, 14, 60, 12, 710),
            Get.Interface.MixSpellPot(237, 'Greater Fire Wound', ' (26 Alchemy) (4 Air, 2 Fire, 2 Force)', 19, 16, 65, 13, 711),
            Get.Interface.MixSpellPot(238, 'Greater Metal Wound', ' (28 Alchemy) (4 Air, 2 Metal, 2 Force)', 19, 18, 70, 14, 712),
            Get.Interface.MixSpellPot(239, 'Woodcutting Guild Teleport', ' (34 Alchemy) (3 Air, 1 Water, 1 Earth, 1 Void)', 19, 34, 85, 21, 713),
            Get.Interface.MixSpellPot(240, 'Mining Guild Teleport', ' (38 Alchemy) (3 Air, 1 Earth, 1 Metal, 1 Void)', 19, 38, 95, 22, 714),
            // Osaik
            Get.Interface.AskNPCQuestion(241, 'How do I smith tools and armor?', 23),
            Get.Interface.AskNPCQuestion(242, 'How do I fletch bows and arrows?', 24),
            Get.Interface.AskNPCQuestion(243, 'How do I learn magic?', 25),
            Get.Interface.AskNPCQuestion(244, 'Where can I store my items?', 26),
            Get.Interface.AskNPCQuestion(245, 'What are notes and where can I redeem them?', 29),
            Get.Interface.AskNPCQuestion(246, 'How can I make money?', 27),
            Get.Interface.AskNPCQuestion(247, 'What is thieving?', 28),
            Get.Interface.AskNPCQuestion(248, 'How does crafting work?', 30),
            Get.Interface.AskNPCQuestion(249, 'How can I connect with other adventurers?', 31),
            Get.Interface.AskNPCQuestion(250, 'I want to learn more', 32),
            // Kiaso
            Get.Interface.AskNPCQuestion(251, 'How can I expand my party?', 34),
            Get.Interface.AskNPCQuestion(252, 'What are camps and how do they work?', 35),
            Get.Interface.AskNPCQuestion(253, 'What are PvP bounties and how do they work?', 36),
            Get.Interface.AskNPCQuestion(254, 'What are bags and how do they work?', 37),
            Get.Interface.AskNPCQuestion(255, 'What are Tomes of Collection and how do they work?', 38),

            Get.Interface.SmeltBar(256, 'Smelt Gold Bar (25 Smithing) (3 Gold Ore)', 'gold bar', 25, 670, 672, 85, 0, 3),
            Get.Interface.PurchaseBankSlots(257, 5),
            Get.Interface.PurchaseBankSlots(258, 10),
            Get.Interface.PurchaseBankSlots(259, 50),
            Get.Interface.PurchaseBankSlots(260, 100),
            Get.Interface.BuildMiningCamp(261, 'Build Gold Mining Camp (25 Cons., 35 Mining) (5 Ash Logs, 1 Steel Pickaxe)', 7, 11, 35, 25, 84, 350, 'gold mining camp'),
            Get.Interface.MillXIntoY(262, 758, 1, 750, 15, 'Mill Wheat into Bucket of Flour', 'You turn wheat into flour and fill the bucket.'),

            Get.Interface.Recipe(263, Get.Recipes.UncookedMeatPie() ),
            Get.Interface.Recipe(264, Get.Recipes.UncookedChickenPotPie() ),
            Get.Interface.Recipe(265, Get.Recipes.UncookedCake() ),
            
            Get.Interface.SpinXIntoY(266, 781, 1, 783, 1, 15, 1, 10, 'Wool', 'Yarn'),
            Get.Interface.SpinXIntoY(267, 783, 1, 92, 10, 15, 1, 10, 'Yarn', 'Thread', 6),
            Get.Interface.MillXIntoY(268, 791, 4, 793, 30, 'Mill Herbs into Bucket of Refined Herbs', 'You refined some herbs and fill the bucket.'),

            Get.Interface.Recipe(269, Get.Recipes.ChickenSupreme(), [
                buildStep(StepType.ASSERT_GOAL_STATES, {
                    params: [1, [1, null], ['EQUALS', 'N/A'] ],
                    stepResultFail: 'END_ACTION',
                }),
                buildStep(StepType.SET_USER_GOAL_STATE, {
                    params: [1, [2, null] ]
                }),
            ]),
            Get.Interface.Recipe(270, Get.Recipes.GourmetTuna(), [
                buildStep(StepType.ASSERT_GOAL_STATES, {
                    params: [1, [null, 1], ['N/A', 'EQUALS'] ],
                    stepResultFail: 'END_ACTION',
                }),
                buildStep(StepType.SET_USER_GOAL_STATE, {
                    params: [1, [null, 2] ]
                }),
            ]),
            {
                id: 271,
                name: 'Craft Gold Amulet (20 Smithing, 20 Crafting)',
                flags: ['REPEAT_ACTION'],
                actionInterval: 5,
                steps: [
                    [buildStep(StepType.HAS_INVENTORY_ITEM, {params: [672, 1]}),
                    buildStep(StepType.HAS_INVENTORY_ITEM, {params: [814, 1]}),
                    buildStep(StepType.HAS_SKILL_LEVEL, {params: [14, 20]}),
                    buildStep(StepType.HAS_SKILL_LEVEL, {params: [15, 20]}),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, {params: [672, 1]}),
                    buildStep(StepType.GIVE_INVENTORY_ITEM, {params: [674, 1]}),
                    buildStep(StepType.GIVE_XP, {params: [14, 28]}),
                    buildStep(StepType.GIVE_XP, {params: [15, 28]}),
                    buildStep(StepType.PLAY_ANIMATION, { params: ['ACTION_BOTHHANDS'] }),
                    buildStep(StepType.SEND_CLIENT_MESSAGE, {params: ['You make a gold amulet.']})]
                ],
            },
            {
                id: 272,
                name: 'Craft Gold Ring (5 Smithing, 5 Crafting)',
                flags: ['REPEAT_ACTION'],
                actionInterval: 4,
                steps: [
                    [buildStep(StepType.HAS_INVENTORY_ITEM, {params: [672, 1]}),
                    buildStep(StepType.HAS_INVENTORY_ITEM, {params: [812, 1]}),
                    buildStep(StepType.HAS_SKILL_LEVEL, {params: [14, 5]}),
                    buildStep(StepType.HAS_SKILL_LEVEL, {params: [15, 5]}),
                    buildStep(StepType.REMOVE_INVENTORY_ITEM, {params: [672, 1]}),
                    buildStep(StepType.GIVE_INVENTORY_ITEM, {params: [799, 1]}),
                    buildStep(StepType.GIVE_XP, {params: [14, 17]}),
                    buildStep(StepType.GIVE_XP, {params: [15, 17]}),
                    buildStep(StepType.PLAY_ANIMATION, { params: ['ACTION_BOTHHANDS'] }),
                    buildStep(StepType.SEND_CLIENT_MESSAGE, {params: ['You make a gold ring.']})]
                ],
            },
            Get.Interface.AskNPCQuestion(273, 'What is Patreon Palace', 64),
            Get.Interface.AskNPCQuestion(274, 'How can I become a Patron?', 65),
            Get.Interface.AskNPCQuestion(275, 'Thank you', 66),
            Get.Interface.AskNPCQuestion(276, 'Off to the palace!', 63),
            Get.Interface.AskNPCQuestion(277, 'Thank you, but I will stay here', 66),
            Get.Interface.AskNPCQuestion(278, 'Send me back please', 68),
            Get.Interface.AskNPCQuestion(279, 'Thank you, but I will stay here', 69),
        ],
    },
    {
        id: 15,
        name: 'Input Box',
        actions: [{
            id: 0,
            name: 'Select',
            actionInterval: -1,
            flags: ['IS_LOCAL'],
        }],
    },
    {   
    id: 16,
    name: 'Adventurer Combat Style',
    actions: [
        {
            id: 0,
            name: 'Attack Style Focus',
            actionInterval: -1,
            steps: [
                [buildStep(StepType.CHANGE_ATTACK_STYLE, {params: [0]})]
            ],
        },
        {
            id: 1,
            name: 'Attack Style Power',
            actionInterval: -1,
            steps: [
                [buildStep(StepType.CHANGE_ATTACK_STYLE, {params: [1]})]
            ],
        },
        {
            id: 2,
            name: 'Attack Style Defense',
            actionInterval: -1,
            steps: [
                [buildStep(StepType.CHANGE_ATTACK_STYLE, {params: [2]})]
            ],
        },
        {
            id: 3,
            name: 'Change Retaliation',
            actionInterval: -1,
            steps: [
                [buildStep(StepType.CHANGE_COMBAT_RETALIATION)]
            ],
        },
    ],
},
{   
    id: 17,
    name: 'Adventurer State (Misc)',
    actions: [
        {
            id: 0,
            name: 'Hire Adventurer',
            actionInterval: -1,
            steps: [
                [buildStep(StepType.HIRE_ADVENTURER)]
            ],
        },
        {
            id: 1,
            name: 'Switch Bank Note',
            actionInterval: -1,
            steps: [
                [buildStep(StepType.SWITCH_NOTE_SETTINGS, {params: [1]})]
            ],
        },
        {
            id: 2,
            name: 'Switch Shop Note',
            actionInterval: -1,
            steps: [
                [buildStep(StepType.SWITCH_NOTE_SETTINGS, {params: [2]})]
            ],
        },
        {
            id: 3,
            name: 'Open Building Permit Interface',
            actionInterval: -1,
            steps: [
                [buildStep(StepType.OPEN_PURCHASES_INTERFACE)]
            ],
        },
        {},
        {
            id: 5,
            name: 'Buy Bank Space',
            actionInterval: -1,
            steps: [
                [buildStep(StepType.OPEN_ACTION_MENU_INTERFACE, {params: [[193, 257, 258, 259, 260 ]]})]
            ],
        },
        {
            id: 6,
            name: 'Change Username',
            actionInterval: -1,
            steps: [
                [buildStep(StepType.OPEN_ACTION_MENU_INTERFACE, {params: [[206]]})]
            ]
        }
    ],
},
{   
    id: 18,
    name: 'Building Permit Purchase Interface',
    actions: [
        {
            id: 0,
            name: 'Buy ',
            actionInterval: -1,
            steps: [
                [buildStep(StepType.PURCHASE_ITEM, {params: ['PURCHASE_KEY', 'ITEM_AMOUNT']})]
            ],
        },
        {
            id: 1,
            name: 'Withdraw ',
            actionInterval: -1,
            steps: [
                [buildStep(StepType.WITHDRAW_PURCHASE, {params: ['PURCHASE_KEY', 'ITEM_AMOUNT']})]
            ],
        },
    ],
}, {
    id: 19,
    name: 'Inventory Drop Party Minigame Chest Interface',
    actions: [
        {
            id: 0,
            name: 'Deposit',
            actionInterval: -1,
            steps: [
                [buildStep(StepType.DEPOSIT_DROP_PARTY_ITEM, {params: ['ITEM_ID', 'ITEM_AMOUNT', 'ITEM_STATE']})]
            ],
        },
    ],
}, {
    id: 20,
    name: 'Drop Party Minigame Chest Interface',
    actions: [
        {
            id: 0,
            name: 'Deposit',
            actionInterval: -1,
            steps: [
                [buildStep(StepType.DEPOSIT_DROP_PARTY_ITEM, {params: ['ITEM_ID', 'ITEM_AMOUNT', 'ITEM_STATE']})]
            ],
        },
    ],
},
{
    id: 21,
    name: 'Spellbook',
    actions: [
        {
            id: 0,
            name: 'Cast',
        },
        {
            id: 1,
            name: 'Set Autocast',
            actionInterval: -1,
            steps: [
                [buildStep(StepType.CAN_CAST_SPELL, {params: ['SPELL_ID', true, false]}),
                buildStep(StepType.SET_AUTOCAST_SPELL, {params: ['SPELL_ID']})]
            ],
        },
        {
            id: 2,
            name: 'Cast on Entity',
            actionInterval: -1,
            steps: [
                [buildStep(StepType.CAST_SPELL, {params: ['SPELL_ID', 'SLOT_ID', null]})]
            ],
        },
        {
            id: 3,
            name: 'Cast on Item',
            actionInterval: -1,
            steps: [
                [buildStep(StepType.CAST_SPELL, {params: ['SPELL_ID', null, 'SLOT_ID']})]
            ],
        },
    ],
}, {
    id: 22,
    name: 'Goals Interface',
    actions: [],
}, {
    id: 23,
    name: 'Jewelry Craft Interface',
    actions: [
        {
            id: 0,
            name: 'Craft',
            actionInterval: 4,
            flags: ['REPEAT_ACTION'],
            steps: [
                [buildStep(StepType.CRAFT_JEWELRY_ITEM, {params: ['ITEM_AMOUNT']}),
                buildStep(StepType.PLAY_ANIMATION, {
                    params: ['TALK_TO'],
                    stepResultPass: StepResult.END_AND_REPEAT_ACTION
                })]
            ],
        },
        {
            id: 1,
            name: 'Remove',
            actionInterval: -1,
            steps: [
                [buildStep(StepType.REMOVE_JEWELRY_CRAFT_ITEM, {params: ['SLOT_ID']})]
            ],
        },
    ],
}, {
    id: 24,
    name: 'Jewelry Craft Inventory Interface',
    actions: [
        {
            id: 0,
            name: 'Add',
            actionInterval: -1,
            steps: [
                [buildStep(StepType.ADD_JEWELRY_CRAFT_ITEM, {params: ['ITEM_ID', 'ITEM_AMOUNT', 'ITEM_STATE'],})],
            ],
        },
    ],
}, {
    id: 25,
    name: 'Enchantment Interface',
    actions: [
        {
            id: 0,
            name: 'Cast Enchantment',
            actionInterval: 4,
            flags: ['REPEAT_ACTION'],
            steps: [
                [buildStep(StepType.CAST_ENCHANTMENT, {params: ['ITEM_AMOUNT']}),
                buildStep(StepType.PLAY_ANIMATION, {
                    params: ['TALK_TO'],
                    stepResultPass: StepResult.END_AND_REPEAT_ACTION
                })]
            ],
        },
        {
            id: 1,
            name: 'Remove',
            actionInterval: -1,
            steps: [
                [buildStep(StepType.REMOVE_ENCHANTMENT_ITEM, {params: ['SLOT_ID', 'ITEM_AMOUNT']})]
            ],
        },
        {
            id: 2,
            name: 'Select',
            actionInterval: -1,
            steps: [
                [buildStep(StepType.SELECT_ENCHANTMENT, {params: ['SPELL_ID']})]
            ],
        },
    ],
}, {
    id: 26,
    name: 'Inventory Enchantment Interface',
    actions: [
        {
            id: 0,
            name: 'Select',
            actionInterval: -1,
            steps: [
                [buildStep(StepType.SELECT_ENCHANTMENT_ITEM, {params: ['ITEM_ID', 'ITEM_AMOUNT', 'ITEM_STATE']})]
            ],
        },
    ],
},
{   
    id: 27,
    name: 'Appearance',
    actions: [
        {
            id: 0,
            name: 'Confirm',
            actionInterval: -1,
            steps: [
                [buildStep(StepType.CHANGE_APPEARANCE, {params: ['SKIN_TONE', 'HAIR_STYLE', 'HAIR_COLOR', 'GENDER', 'EYE_COLOR', 'FACE', 'FACE_COLOR', 'SHIRT', 'PANTS']})]
            ],
        },
    ],
}];