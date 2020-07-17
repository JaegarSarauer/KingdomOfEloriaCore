
module.exports.StepResult = StepResult = {
    NEXT_STEP: 'NEXT_STEP', //continue to next step
    NEXT_STEP_LIST: 'NEXT_STEP_LIST', //end the step, go to next step list
    END_ACTION: 'END_ACTION', //end the entire action here.
    END_AND_REPEAT_STEP: 'END_AND_REPEAT_STEP', //end the step and action, repeating next interval from this step
    END_AND_REPEAT_STEP_LIST: 'END_AND_REPEAT_STEP_LIST', //end the step and action, repeating next interval from the beginning of this step list.
    END_AND_REPEAT_ACTION: 'END_AND_REPEAT_ACTION', //end the step and action, repeating next interval from beginning
    END_AND_GOTO_LIST_1: 'END_AND_GOTO_LIST_1', //end action, starting again from list index 0.
    END_AND_GOTO_LIST_2: 'END_AND_GOTO_LIST_2', //end action, starting again from list index 1.
    END_AND_GOTO_LIST_3: 'END_AND_GOTO_LIST_3', //end action, starting again from list index 2.
    END_AND_GOTO_LIST_4: 'END_AND_GOTO_LIST_4', //end action, starting again from list index 3.
    END_AND_GOTO_LIST_5: 'END_AND_GOTO_LIST_5', //end action, starting again from list index 4.
};

module.exports.StepType = StepType = {
    SEND_CLIENT_MESSAGE: {
        id: 'SEND_CLIENT_MESSAGE',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['string'], //message
        params: [],
    },
    SEND_GLOBAL_MESSAGE: {
        id: 'SEND_GLOBAL_MESSAGE',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number', 'string'], //messageType, message
        params: [],
    },
    IS_ADJACENT: {
        id: 'IS_ADJACENT',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: [],
        params: [],
    },
    PURCHASE_ITEM: {
        id: 'PURCHASE_ITEM',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['string', 'number'], //purchase key, purchase amount
        params: [],
    },
    WITHDRAW_PURCHASE: {
        id: 'WITHDRAW_PURCHASE',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['string', 'number'], //purchase key, amount
        params: [],
    },
    OPEN_ENCHANTMENT_INTERFACE: {
        id: 'OPEN_ENCHANTMENT_INTERFACE',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: [],
        params: [],
    },
    USE_ENCHANTMENT_CHARGE: {
        id: 'USE_ENCHANTMENT_CHARGE',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number', 'number'], // enchantmentID, chargeUseAmount
        params: [],
    },
    USE_ENCHANTMENT: {
        id: 'USE_ENCHANTMENT',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number'], // enchantmentID
        params: [],
    },
    CONVERT_TO_NOTE: {
        id: 'CONVERT_TO_NOTE',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['Array', 'number'], //Array of item IDs to convert to items. Max amount of items to convert.
        params: [],
    },
    WALK_ADJACENT: {
        id: 'WALK_ADJACENT',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: [],
        params: [],
    },
    IS_ENACTER_OWNER_OF_OWNER: {
        id: 'IS_ENACTER_OWNER_OF_OWNER',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: [],
        params: [],
    },
    ASSERT_ITEM_STATE: {
        id: 'ASSERT_ITEM_STATE',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number', 'number', 'string', 'string', 'number|string'], //slotID, itemID, itemStateDefID, assertString, value2
        params: [],
    },
    ASSERT_GUILD_TIER: {
        id: 'ASSERT_GUILD_TIER',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number', 'string', 'number|string'], //guildID, assertString, value2
        params: [],
    },
    ASSERT_GOAL_STATES: {
        id: 'ASSERT_GOAL_STATES',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number', 'Array', 'Array'], //goalID, stateArrayCheck, stateAssertArray
        params: [],
    },
    SET_USER_GOAL_STATE: {
        id: 'SET_USER_GOAL_STATE',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number', 'Array'], //goalID, stateArray
        params: [],
    },
    OPEN_JEWELRY_CRAFT_INTERFACE: {
        id: 'OPEN_JEWELRY_CRAFT_INTERFACE',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: [], //
        params: [],
    },
    CREATE_BARRICADE: {
        id: 'CREATE_BARRICADE',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: [],
        params: [],
    },
    ROLL_RANDOM_EVENT: {
        id: 'ROLL_RANDOM_EVENT',
        stepResultFail: 'NEXT_STEP',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number', 'Array'], //eventSpawnChance, eventChanceIDsArray
        params: [],
    },
    ROLL_SPECIAL_ITEM: {
        id: 'ROLL_SPECIAL_ITEM',
        stepResultFail: 'NEXT_STEP_LIST', // !!! does not do default fail behavior
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number', 'number', 'string'], //equipID, itemID, effectFunctionName
        params: [],
    },
    HEAL_OTHER: {
        id: 'HEAL_OTHER',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number', 'number'], //healAmount, maxHP
        params: [],
    },
    OFFER_ENERGY: {
        id: 'OFFER_ENERGY',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: [],
        params: [],
    },
    HAS_INVENTORY_ITEM: {
        id: 'HAS_INVENTORY_ITEM',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number', 'number', 'null|object', 'boolean'], //itemID, itemAmount, itemStateDef, sendMissingItemMessage
        params: [],
    },
    IS_PATREON_SUPPORTER: {
        id: 'IS_PATREON_SUPPORTER',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: [],
        params: [],
    },
    ADD_GUILD_CHEST_ITEM: {
        id: 'ADD_GUILD_CHEST_ITEM',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number', 'number', 'object|null'], //itemID, maxItemAmount, itemStateDef
        params: [],
    },
    REMOVE_GUILD_CHEST_ITEM: {
        id: 'REMOVE_GUILD_CHEST_ITEM',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number', 'number', 'object|null'], //itemID, maxItemAmount, itemStateDef
        params: [],
    },
    OPEN_GUILD_CHEST_INTERFACE: {
        id: 'OPEN_GUILD_CHEST_INTERFACE',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number'], // guildID
        params: [],
    },
    DEPOSIT_GUILD_CHEST_ITEMS: {
        id: 'DEPOSIT_GUILD_CHEST_ITEMS',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: [],
        params: [],
    },
    SET_CHARACTER_STATE: {
        id: 'SET_CHARACTER_STATE',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number', 'number'], //stateID, stateValue
        params: [],
    },
    ROLL_GIVE_SILK: {
        id: 'ROLL_GIVE_SILK',
        stepResultFail: 'NEXT_STEP',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number', 'number'], //minSilkDrop, maxSilkDrop
        params: [],
    },
    BUY_STORAGE_SPACE: {
        id: 'BUY_STORAGE_SPACE',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number'], // amount to purchase
        params: [],
    },
    CHANGE_USERNAME: {
        id: 'CHANGE_USERNAME',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: [],
        params: [],
    },
    CHECK_CHARACTER_STATE: {
        id: 'CHECK_CHARACTER_STATE',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number', 'number'], //stateID, stateValue
        params: [],
    },
    HAS_STORAGE_ITEM: {
        id: 'HAS_STORAGE_ITEM',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number', 'number', 'object|null'], //itemID, itemAmount, itemStateDef
        params: [],
    },
    HAS_EQUIPMENT_ITEM: {
        id: 'HAS_EQUIPMENT_ITEM',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number', 'number', 'number', 'object|null'], //slotID, itemID, itemAmount, itemStateDef
        params: [],
    },
    HAS_SKILL_LEVEL: {
        id: 'HAS_SKILL_LEVEL',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number', 'number'], //skillID, reqLevel
        params: [],
    },
    HAS_COMBAT_LEVEL: {
        id: 'HAS_COMBAT_LEVEL',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number'], //reqLevel
        params: [],
    },
    RANDOMIZE_ITEM_STATE_ITEMID: {
        id: 'RANDOMIZE_ITEM_STATE_ITEMID',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number', 'number', 'boolean'], //slotID, itemID, downgradeNotedIds = false
        params: [],
    },
    IS_IN_COMBAT: {
        id: 'IS_IN_COMBAT',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: [],
        params: [],
    },
    IS_IN_PVP_AREA: {
        id: 'IS_IN_PVP_AREA',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: [],
        params: [],
    },
    IS_OWNER_IN_COMBAT: {
        id: 'IS_OWNER_IN_COMBAT',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: [],
        params: [],
    },
    HAS_INVENTORY_ITEM_GROUP: {
        id: 'HAS_INVENTORY_ITEM_GROUP',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number'], //group ID
        params: [],
    },
    GET_MAX_ITEM_AMOUNT: {
        id: 'GET_MAX_ITEM_AMOUNT',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number', 'number', 'object|null'], //itemID, maxItemAmount, itemStateDef
        params: [],
    },
    INVENTORY_HAS_ROOM: {
        id: 'INVENTORY_HAS_ROOM',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: [],
        params: [],
    },
    MAP_ACTION_PARAMETER: {
        id: 'MAP_ACTION_PARAMETER',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['string', 'number|string'], //parameterKey, value
        params: [],
    },
    CHANGE_MAP_ID: {
        id: 'CHANGE_MAP_ID',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number'], //newMapID
        params: [],
    },
    IS_ON_TOP: {
        id: 'IS_ON_TOP',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: [],
        params: [],
    },
    BIND_BAG_ITEM: {
        id: 'BIND_BAG_ITEM',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number'], //itemID
        params: [],
    },
    BIND_ENCHANTMENT_ITEM: {
        id: 'BIND_ENCHANTMENT_ITEM',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number'], //itemID
        params: [],
    },
    DEPOSIT_BAG_ITEM: {
        id: 'DEPOSIT_BAG_ITEM',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number'], //itemID
        params: [],
    },
    WITHDRAW_BAG_ITEM: {
        id: 'WITHDRAW_BAG_ITEM',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number'], //itemID
        params: [],
    },
    REPAIR_BAG: {
        id: 'REPAIR_BAG',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number'], //clothRepairItemID
        params: [],
    },
    INCREASE_BAG_SIZE: {
        id: 'INCREASE_BAG_SIZE',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number'], //clothAdditionItemID
        params: [],
    },
    INCINERATE_ITEM: {
        id: 'INCINERATE_ITEM',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number', 'object|null'], //incinerateID, itemStateDef
        params: [],
    },
    IS_TIMER_EXPIRED: {
        id: 'IS_TIMER_EXPIRED',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number'], //timerID
        params: [],
    },
    HAS_INVENTORY_SPACE: {
        id: 'HAS_INVENTORY_SPACE',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number', 'number', 'object|null'], //itemID, itemAmount, itemStateDef
        params: [],
    },
    CAN_PICKUP_GROUNDITEM: {
        id: 'CAN_PICKUP_GROUNDITEM',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: [],
        params: [],
    },
    PLAY_ANIMATION: {
        id: 'PLAY_ANIMATION',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['string', 'object'], //animID, repeatAnim, 
        params: [],
    },
    PICKUP_ITEM_AREA: {
        id: 'PICKUP_ITEM_AREA',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number'], //area 
        params: [],
    },
    REMOVE_INVENTORY_ITEM: {
        id: 'REMOVE_INVENTORY_ITEM',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number', 'number', 'object|null'], //itemID, itemAmount, itemStateDef
        params: [],
    },
    REMOVE_STORAGE_ITEM: {
        id: 'REMOVE_STORAGE_ITEM',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number', 'number', 'object|null'], //itemID, itemAmount, itemStateDef
        params: [],
    },
    REMOVE_EQUIPMENT_ITEM: {
        id: 'REMOVE_EQUIPMENT_ITEM',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number'], //slotID
        params: [],
    },
    REMOVE_OWNER_EQUIPMENT_ITEM: {
        id: 'REMOVE_OWNER_EQUIPMENT_ITEM',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number'], //slotID
        params: [],
    },
    UPDATE_TIMER: {
        id: 'UPDATE_TIMER',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number', 'number'], //timerID, ticks
        params: [],
    },
    CHANGE_LEVEL: {
        id: 'CHANGE_LEVEL',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number', 'number'], //skillID, newLevel
        params: [],
    },
    DESPAWN_OWNER: {
        id: 'DESPAWN_OWNER',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: [],
        params: [],
    },
    DEPOSIT_ITEM: {
        id: 'DEPOSIT_ITEM',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number', 'number', 'object|null'], //itemID, itemAmount, itemStateDef
        params: [],
    },
    DEPOSIT_DROP_PARTY_ITEM: {
        id: 'DEPOSIT_DROP_PARTY_ITEM',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number', 'number', 'object|null'], //itemID, itemAmount, itemStateDef
        params: [],
    },
    WITHDRAW_ITEM: {
        id: 'WITHDRAW_ITEM',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number', 'number', 'object|null'], //itemID, itemAmount, itemStateDef
        params: [],
    },
    SELL_ITEM_TO_SHOP: {
        id: 'SELL_ITEM_TO_SHOP',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number', 'number', 'object|null', 'number'], //itemID, maxSellAmount, itemStateDef, price
        params: [],
    },
    BUY_ITEM_FROM_SHOP: {
        id: 'BUY_ITEM_FROM_SHOP',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number', 'number', 'object|null', 'number'], //itemID, maxBuyAmount, itemStateDef, price
        params: [],
    },
    REMOVE_MARKET_OFFER: {
        id: 'REMOVE_MARKET_OFFER',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number', 'number'], //slotID, itemID
        params: [],
    },
    ROLL_SKILL_SUCCESS: {
        id: 'ROLL_SKILL_SUCCESS',
        /*
        If requiresTool is true, this step will attempt to get the tool power
        set earlier in this action for a value >= 0. If it is null or -1, it 
        will fail.
        */
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number', 'number', 'number', 'boolean', 'number', 'number'], //skillID, baseChance, bestChance, requiresTool, levelMultiplier = 1, toolMultiplier = 1
        params: [],
    },
    SET_PARAMETER_BEST_TOOL_POWER: {
        id: 'SET_PARAMETER_BEST_TOOL_POWER',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number', 'number'], //skillID, itemGroupID
        params: [],
    },
    ROLL_MIN_MAX_SKILL_SUCCESS: {
        id: 'ROLL_MIN_MAX_SKILL_SUCCESS',
        stepResultFail: 'NEXT_STEP',
        stepResultPass: 'NEXT_STEP_LIST',
        paramTypes: ['number', 'number', 'number', 'number', 'boolean', 'number'], //increasingBaseChance, decreasingBaseChance, skillID, levelMultiplier, requiresTool, toolMultiplier
        params: [],
    },
    COMBINE_MONEY_BAGS: {
        id: 'COMBINE_MONEY_BAGS',
        stepResultFail: 'NEXT_STEP',
        stepResultPass: 'NEXT_STEP_LIST',
        paramTypes: [], //
        params: [],
    },
    ADD_MARKET_SELL_OFFER: {
        id: 'ADD_MARKET_SELL_OFFER',
        stepResultFail: 'NEXT_STEP',
        stepResultPass: 'NEXT_STEP_LIST',
        paramTypes: ['number', 'number', 'object|null', 'number'], //itemID, itemAmount, itemStateDef, itemPrice
        params: [],
    },
    ADD_MARKET_BUY_OFFER: {
        id: 'ADD_MARKET_BUY_OFFER',
        stepResultFail: 'NEXT_STEP',
        stepResultPass: 'NEXT_STEP_LIST',
        paramTypes: ['number', 'number', 'object|null', 'number'], //itemID, itemAmount, itemStateDef, itemPrice
        params: [],
    },
    SET_PARAMETER_ITEM_AMOUNT: {
        id: 'SET_PARAMETER_ITEM_AMOUNT',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number'], //itemAmount
        params: [],
    },
    SET_PARAMETER_ITEM_STATE: {
        id: 'SET_PARAMETER_ITEM_STATE',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['object|null'], //itemStateDef
        params: [],
    },
    CAN_ATTACK_OWNER: {
        id: 'CAN_ATTACK_OWNER',
        stepResultFail: 'END_AND_REPEAT_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: [],
        params: [],
    },
    HAS_LINE_OF_SIGHT: {
        id: 'HAS_LINE_OF_SIGHT',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: [],
        params: [],
    },
    REQUEST_DROP_PARTY: {
        id: 'REQUEST_DROP_PARTY',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: [],
        params: [],
    },
    OPERATE_CONSTRUCTION_OBJECT: {
        id: 'OPERATE_CONSTRUCTION_OBJECT',
        stepResultFail: 'NEXT_STEP',
        stepResultPass: 'NEXT_STEP_LIST',
        paramTypes: ['Array', 'number'], //entityTypeAndIDArray, actionID
        params: [],
    },
    OWNER_IN_ATTACK_RANGE: {
        id: 'OWNER_IN_ATTACK_RANGE',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: [],
        params: [],
    },
    OWNER_IN_WALK_BOUNDS: {
        id: 'OWNER_IN_WALK_BOUNDS',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: [],
        params: [],
    },
    CHANGE_ATTACK_STYLE: {
        id: 'CHANGE_ATTACK_STYLE',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number'], //combatStyleID
        params: [],
    },
    CHANGE_COMBAT_RETALIATION: {
        id: 'CHANGE_COMBAT_RETALIATION',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: [],
        params: [],
    },
    CLEAR_TIMER: {
        id: 'CLEAR_TIMER',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number'], //timerID
        params: [],
    },
    SET_SYPHON_SHARD_ITEM_AMOUNT: {
        id: 'SET_SYPHON_SHARD_ITEM_AMOUNT',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number', 'number', 'object|null'], //shardID
        params: [],
    },
    GIVE_INVENTORY_ITEM: {
        id: 'GIVE_INVENTORY_ITEM',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number', 'number', 'object|null'], //itemID, itemAmount, itemStateDef
        params: [],
    },
    GIVE_STORAGE_ITEM: {
        id: 'GIVE_STORAGE_ITEM',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number', 'number', 'object|null'], //itemID, itemAmount, itemStateDef
        params: [],
    },
    GIVE_EQUIPMENT_ITEM: {
        id: 'GIVE_EQUIPMENT_ITEM',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number', 'number', 'object|null'], //slotID, itemID, itemStateDef
        params: [],
    },
    GIVE_OWNER_EQUIPMENT_ITEM: {
        id: 'GIVE_OWNER_EQUIPMENT_ITEM',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number', 'number', 'object|null'], //slotID, itemID, itemStateDef
        params: [],
    },
    GIVE_XP: {
        id: 'GIVE_XP',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number', 'number'], //skillID, xp
        params: [],
    },
    SET_POSITION: {
        id: 'SET_POSITION',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number', 'number'], //x, y
        params: [],
    },
    ROLL_DROP_TABLE: {
        id: 'ROLL_DROP_TABLE',
        stepResultFail: 'NEXT_STEP',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number', 'Array'], //tableRollChance, 2D Array of drop tables [[itemID, itemMinAmount, itemMaxAmount, rollWeight], [...]]
        params: [],
    },
    ROLL_SKILL_DROP_TABLE: {
        id: 'ROLL_SKILL_DROP_TABLE',
        stepResultFail: 'NEXT_STEP',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number', 'number', 'Array'], //tableRollChance, skillID, 2D Array of drop tables [[itemID, itemMinAmount, itemMaxAmount, baseWeight, weightIncreasePerLevel], [...]]
        params: [],
    },
    CREATE_GROUND_ITEM: {
        id: 'CREATE_GROUND_ITEM',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number', 'number', 'object|null'], //itemID, itemAmount, itemStateDef
        params: [],
    },
    OPEN_STORAGE_INTERFACE: {
        id: 'OPEN_STORAGE_INTERFACE',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: [],
        params: [],
    },
    OPEN_DIALOG_INTERFACE: {
        id: 'OPEN_DIALOG_INTERFACE',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: [],
        params: [],
    },
    SHOW_DIALOG: {
        id: 'SHOW_DIALOG',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number'], //dialogID
        params: [],
    },
    PROCESS_DIALOG: {
        id: 'PROCESS_DIALOG',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: [],
        params: [],
    },
    SHOW_DIRECTION_ARROW: {
        id: 'SHOW_DIRECTION_ARROW',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number', 'number'], //xOrRefID, y
        params: [],
    },
    OPEN_PURCHASES_INTERFACE: {
        id: 'OPEN_PURCHASES_INTERFACE',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: [],
        params: [],
    },
    OPEN_DROP_PARTY_MINIGAME_CHEST_INTERFACE: {
        id: 'OPEN_DROP_PARTY_MINIGAME_CHEST_INTERFACE',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: [],
        params: [],
    },
    SHOW_DEFAULT_INTERFACES: {
        id: 'SHOW_DEFAULT_INTERFACES',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: [],
        params: [],
    },
    OPERATE_MARKET: {
        id: 'OPERATE_MARKET',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: [],
        params: [],
    },
    ROLL_DESPAWN: {
        id: 'ROLL_DESPAWN',
        stepResultFail: 'END_AND_REPEAT_STEP_LIST',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number'], //despawnChance
        params: [],
    },
    SET_RESPAWN_TIMER: {
        id: 'SET_RESPAWN_TIMER',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number'], //ticks
        params: [],
    },
    OPEN_SHOP_INTERFACE: {
        id: 'OPEN_SHOP_INTERFACE',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number'], //shopID
        params: [],
    },
    OPEN_ACTION_MENU_INTERFACE: {
        id: 'OPEN_ACTION_MENU_INTERFACE',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['Array'], //actionIDArray
        params: [],
    },
    CREATE_CONSTRUCTION_OBJECT: {
        id: 'CREATE_CONSTRUCTION_OBJECT',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number'], //worldObjectID
        params: [],
    },
    CREATE_CAMP_FIRE: {
        id: 'CREATE_CAMP_FIRE',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number', 'number'], //minAshes, maxAshes
        params: [],
    },
    COMBINE_ITEMS: {
        id: 'COMBINE_ITEMS',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number', 'number', 'number', 'number', 'number', 'number'], //itemID1, itemID2, itemIDResult, maxAmount, skillID, xpReward
        params: [],
    },
    ATTACK_OWNER: {
        id: 'ATTACK_OWNER',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number|null', 'number|null', 'boolean|null'], // focus (optional), power (optional), giveXP (optional)
        params: [],
    },
    FOLLOW_OWNER: {
        id: 'FOLLOW_OWNER',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: [],
        params: [],
    },
    EAT_FOOD: {
        id: 'EAT_FOOD',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number'], //healAmount
        params: [],
    },
    DAMAGE: {
        id: 'DAMAGE',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number'], //hpDamage
        params: [],
    },
    PEEK_CRAB_POT: {
        id: 'PEEK_CRAB_POT',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['boolean'], //isJustLooking
        params: [],
    },
    TELEPORT: {
        id: 'TELEPORT',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number', 'number', 'number', 'number', 'number', 'number', 'Array|null'], //mapID, x1, y1, x2, y2, teleportDelay, postTeleportActionList (optional)
        params: [],
    },
    SET_BOUNTY: {
        id: 'SET_BOUNTY',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['boolean', 'number'], //canEnterSafeAreas, ticks
        params: [],
    },
    GET_USES_UNTIL_DEPLETION: {
        id: 'GET_USES_UNTIL_DEPLETION',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: [],
        params: [],
    },
    HIRE_ADVENTURER: {
        id: 'HIRE_ADVENTURER',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: [],
        params: [],
    },
    SWITCH_NOTE_SETTINGS: {
        id: 'SWITCH_NOTE_SETTINGS',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number'], //noteTypeID (1 = bank, 2 = shop)
        params: [],
    },
    PLAY_SOUND: {
        id: 'PLAY_SOUND',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number'], //soundID
        params: [],
    },
    UPGRADE_WORLD_OBJECT: {
        id: 'UPGRADE_WORLD_OBJECT',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number'],
        params: [],
    },
    DISASSEMBLE_CONSTRUCTION_OBJECT: {
        id: 'DISASSEMBLE_CONSTRUCTION_OBJECT',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: [],
        params: [],
    },
    DISASSEMBLE_WORLD_OBJECT_UPGRADE: {
        id: 'DISASSEMBLE_WORLD_OBJECT_UPGRADE',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: [],
        params: [],
    },
    CHECK_CONSTRUCTION_OBJECT: {
        id: 'CHECK_CONSTRUCTION_OBJECT',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: [],
        params: [],
    },
    CHECK_WORLD_OBJECT: {
        id: 'CHECK_WORLD_OBJECT',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: [],
        params: [],
    },
    DEPLETE_WORLD_OBJECT_USES: {
        id: 'DEPLETE_WORLD_OBJECT_USES',
        stepResultFail: 'NEXT_STEP',
        stepResultPass: 'END_ACTION',
        paramTypes: ['number'], //depleteCount
        params: [],
    },
    WALK_ON_TOP: {
        id: 'WALK_ON_TOP',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: [],
        params: [],
    },
    CLEAR_BOUNTY: {
        id: 'CLEAR_BOUNTY',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['boolean'], //includeRedBounty
        params: [],
    },
    SET_ACTION_INTERVAL: {
        id: 'SET_ACTION_INTERVAL',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number'], //newInterval
        params: [],
    },
    SET_PARAMETER_MAX_NOTE_AMOUNT: {
        id: 'SET_PARAMETER_MAX_NOTE_AMOUNT',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: [],
        params: [],
    },
    SIGN_PERMIT: {
        id: 'SIGN_PERMIT',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number'], //days
        params: [],
    },
    GIVE_OBELISK_ANCIENT_ENERGY: {
        id: 'GIVE_OBELISK_ANCIENT_ENERGY',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number'], //baseEnergyAmount
        params: [],
    },
    HAS_PERMIT: {
        id: 'HAS_PERMIT',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['boolean'], //allowBuildingWithFrame
        params: [],
    },
    CAST_SPELL: {
        id: 'CAST_SPELL',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number'], //spellID
        params: [],
    },
    SET_AUTOCAST_SPELL: {
        id: 'SET_AUTOCAST_SPELL',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number'], //spellID
        params: [],
    },
    GIVE_CUT_GEM: {
        id: 'GIVE_CUT_GEM',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number', 'number'], //cutGemID, itemAmount
        params: [],
    },
    IS_SPELL_UNLOCKED: {
        id: 'IS_SPELL_UNLOCKED',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number'], //spellID
        params: [],
    },
    UNLOCK_SPELL: {
        id: 'UNLOCK_SPELL',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number', 'boolean'], //spellID, isUnlocking (default true)
        params: [],
    },
    CAN_CAST_SPELL: {
        id: 'CAN_CAST_SPELL',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number', 'boolean', 'boolean'], //spellID, requiresLevels (default true), requiresEssence (default true)
        params: [],
    },
    UPGRADE_ACTION_INTERVAL: {
        id: 'UPGRADE_ACTION_INTERVAL',
        stepResultFail: 'NEXT_STEP',
        stepResultPass: 'NEXT_STEP',
        paramTypes: [],
        params: [],
    },
    SEND_TRADE_REQUEST: {
        id: 'SEND_TRADE_REQUEST',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: [],
        params: [],
    },
    ACCEPT_TRADE_REQUEST: {
        id: 'ACCEPT_TRADE_REQUEST',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number'], //tradeID
        params: [],
    },
    ACCEPT_TRADE: {
        id: 'ACCEPT_TRADE',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number'], //tradeID
        params: [],
    },
    DECLINE_TRADE: {
        id: 'DECLINE_TRADE',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number'], //tradeID
        params: [],
    },
    ADD_TRADE_ITEM: {
        id: 'ADD_TRADE_ITEM',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number', 'number', 'number', 'object|null'], //tradeID, itemID, itemAmount, itemStateDef
        params: [],
    },
    REMOVE_TRADE_ITEM: {
        id: 'REMOVE_TRADE_ITEM',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number', 'number', 'number', 'object|null'], //tradeID, itemID, itemAmount, itemStateDef
        params: [],
    },
    USE_ITEM_CHARGES: {
        id: 'USE_ITEM_CHARGES',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number', 'number', 'number'], //slotID, itemID, chargesUsed
        params: [],
    },
    IS_IN_AREA: {
        id: 'IS_IN_AREA',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['boolean', 'number', 'number', 'number', 'number'], //isEnactingEntity(else ownerEntity), x1, y2, x2, y2
        params: [],
    },
    JOIN_MINIGAME: {
        id: 'JOIN_MINIGAME',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number'], //minigameID
        params: [],
    },
    LEAVE_MINIGAME: {
        id: 'LEAVE_MINIGAME',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number'], //minigameID
        params: [],
    },
    OPEN_CHANGE_APPEARANCE: {
        id: 'OPEN_CHANGE_APPEARANCE',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number'], //shopID
        params: [],
    },
    CHANGE_APPEARANCE: {
        id: 'CHANGE_APPEARANCE',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number' ], //skinToneID, hairStyleId, hairColor, genderID, eyeColor, face, faceColor, shirt, pants
        params: [],
    },
    MAKE_CLOSEST_NPC_ATTACK_CLOSEST_NPC: {
        id: 'MAKE_CLOSEST_NPC_ATTACK_CLOSEST_NPC',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number', 'number'], //npcToBeAttacking, npcToGetAttacked
        params: [],
    },
    SAY_MESSAGE: {
        id: 'SAY_MESSAGE',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['string'], //message
        params: [],
    },
    CAST_ENCHANTMENT: {
        id: 'CAST_ENCHANTMENT',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number'], //itemAmount
        params: [],
    },
    SELECT_ENCHANTMENT_ITEM: {
        id: 'SELECT_ENCHANTMENT_ITEM',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number', 'number', 'null|object'], //gemItemID, gemAmount, gemStateDef
        params: [],
    },
    SELECT_ENCHANTMENT: {
        id: 'SELECT_ENCHANTMENT',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number'], //spellID
        params: [],
    },
    CRAFT_JEWELRY_ITEM: {
        id: 'CRAFT_JEWELRY_ITEM',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number'], //craftAmount
        params: [],
    },
    ADD_JEWELRY_CRAFT_ITEM: {
        id: 'ADD_JEWELRY_CRAFT_ITEM',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number', 'number', 'null|object'], //itemID, itemAmount, itemStateDef
        params: [],
    },
    REMOVE_JEWELRY_CRAFT_ITEM: {
        id: 'REMOVE_JEWELRY_CRAFT_ITEM',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number'], //slotID
        params: [],
    },
    REMOVE_ENCHANTMENT_ITEM: {
        id: 'REMOVE_ENCHANTMENT_ITEM',
        stepResultFail: 'END_ACTION',
        stepResultPass: 'NEXT_STEP',
        paramTypes: ['number'], //slotID
        params: [],
    },
};

module.exports.buildStep = buildStep = (sType, newDataObject = {}) => {
    return Object.assign({}, StepType[sType.id], newDataObject);
};

const StepList = {
    WALK_ADJACENT: {
        id: 'WALK_ADJACENT',
        params: [[], []],
        steps: [
            buildStep(StepType.IS_ADJACENT, {
                stepResultPass: 'NEXT_STEP_LIST', 
                stepResultFail: 'NEXT_STEP'
            }),
            buildStep(StepType.WALK_ADJACENT, {
                stepResultPass: 'END_AND_REPEAT_STEP_LIST', 
                stepResultFail: 'END_AND_REPEAT_STEP_LIST'
            }),
        ],
    },
    WALK_ABOVE: {
        id: 'WALK_ABOVE',
        params: [[], []],
        steps: [
            buildStep(StepType.IS_ON_TOP, {
                stepResultPass: 'NEXT_STEP_LIST', 
                stepResultFail: 'NEXT_STEP'
            }),
            buildStep(StepType.WALK_ON_TOP, {
                stepResultPass: 'END_AND_REPEAT_STEP_LIST', 
                stepResultFail: 'END_AND_REPEAT_STEP_LIST'
            }),
        ],
    },
    WALK_IN_LINE_OF_SIGHT: {
        id: 'WALK_IN_LINE_OF_SIGHT',
        params: [[], []],
        steps: [
            buildStep(StepType.HAS_LINE_OF_SIGHT, {
                stepResultPass: 'NEXT_STEP_LIST', 
                stepResultFail: 'NEXT_STEP'
            }),
            buildStep(StepType.WALK_ADJACENT, {
                stepResultPass: 'END_AND_REPEAT_STEP_LIST', 
                stepResultFail: 'END_AND_REPEAT_STEP_LIST'
            }),
        ],
    },
    WALK_IN_ATTACK_LINE_OF_SIGHT: {
        id: 'WALK_IN_ATTACK_LINE_OF_SIGHT',
        params: [[], []],
        steps: [
            buildStep(StepType.HAS_LINE_OF_SIGHT, {
                stepResultPass: 'NEXT_STEP_LIST', 
                stepResultFail: 'NEXT_STEP'
            }),
            buildStep(StepType.CAN_ATTACK_OWNER, {
                stepResultPass: 'NEXT_STEP', 
                stepResultFail: 'END_ACTION'
            }),
            buildStep(StepType.WALK_ADJACENT, {
                stepResultPass: 'END_AND_REPEAT_STEP_LIST', 
                stepResultFail: 'END_AND_REPEAT_STEP_LIST'
            }),
        ],
    },
    WALK_IN_ATTACK_RANGE: {
        id: 'WALK_IN_ATTACK_RANGE',
        params: [[], []],
        steps: [
            buildStep(StepType.OWNER_IN_ATTACK_RANGE, {
                stepResultPass: 'NEXT_STEP_LIST', 
                stepResultFail: 'NEXT_STEP'
            }),
            buildStep(StepType.OWNER_IN_WALK_BOUNDS, {
                stepResultPass: 'NEXT_STEP', 
                stepResultFail: 'END_ACTION'
            }),
            buildStep(StepType.WALK_ADJACENT, {
                stepResultPass: 'END_AND_REPEAT_STEP_LIST', 
                stepResultFail: 'END_AND_REPEAT_STEP_LIST'
            }),
        ],
    },
}

module.exports.StepList = StepList;

module.exports.buildStepList = buildStepList = (sList, newDataObject = {}) => {
    let list = Object.assign({}, StepList[sList.id], newDataObject);
    for  (let i = 0; i < list.steps.length && i < list.params.length; i++) {
        list.steps[i].params = list.params[i];
    }
    return list.steps;
}

module.exports.ActionFlags = ActionFlags = {
    VISIBLE_ONLY_TO_OWNER: 'VISIBLE_ONLY_TO_OWNER',
    DO_NOT_UPDATE_ACTION_STRING: 'DO_NOT_UPDATE_ACTION_STRING',
    REPEAT_ACTION: 'REPEAT_ACTION',
    IS_LOCAL: 'IS_LOCAL',
    IS_SERVER: 'IS_SERVER',
    TRIGGER_CALLBACK_ACTION: 'TRIGGER_CALLBACK_ACTION',
    IGNORE_ACTIVITY_LOG: 'IGNORE_ACTIVITY_LOG',
};

module.exports.ParameterMappingKeys = ParameterMappingKeys = {
    SLOT_ID: {
        id: 'SLOT_ID',
        type: 'number',
    },
    SLOT_ID_OTHER: {
        id: 'SLOT_ID_OTHER',
        type: 'number',
    },
    ITEM_ID: {
        id: 'ITEM_ID',
        type: 'number',
    },
    ITEM_ID_OTHER: {
        id: 'ITEM_ID_OTHER',
        type: 'number',
    },
    ITEM_AMOUNT: {
        id: 'ITEM_AMOUNT',
        type: 'number',
    },
    XP: {
        id: 'XP',
        type: 'number',
    },
    ITEM_STATE: {
        id: 'ITEM_STATE',
        type: 'object|null',
    },
    ITEM_STATE_OTHER: {
        id: 'ITEM_STATE_OTHER',
        type: 'object|null',
    },
    BEST_TOOL_POWER: {
        id: 'BEST_TOOL_POWER',
        type: 'number',
    },
    OWNER_UID: {
        id: 'OWNER_UID',
        type: 'string',
    },
    SHOP_ID: {
        id: 'SHOP_ID',
        type: 'number',
    },
    TALK_TO: {
        id: 'TALK_TO',
        type: 'number',
    },
    MAX_AMOUNT: {
        id: 'MAX_AMOUNT',
        type: 'number',
    },
    CHANGE_INTERVAL: {
        id: 'CHANGE_INTERVAL',
        type: 'number',
    },
    PURCHASE_KEY: {
        id: 'PURCHASE_KEY',
        type: 'string',
    },
    TRADE_ID: {
        id: 'TRADE_ID',
        type: 'number',
    },
    XP_MULTIPLIER: {
        id: 'XP_MULTIPLIER',
        type: 'number',
    },
    DIALOG_ID: {
        id: 'DIALOG_ID',
        type: 'number',
    },
    ACTION_MENU_ARRAY: {
        id: 'ACTION_MENU_ARRAY',
        type: 'array',
    },
    ITEM_PRICE: {
        id: 'ITEM_PRICE',
        type: 'number',
    },
    ITEM_NAME: {
        id: 'ITEM_NAME',
        type: 'string',
    },
    ACTION_NAME: {
        id: 'ACTION_NAME',
        type: 'string',
    },
    DISABLE_RANDOM_EVENTS: {
        id: 'DISABLE_RANDOM_EVENTS',
        type: 'boolean',
    },
    SPELL_ID: {
        id: 'SPELL_ID',
        type: 'number',
    },
    ENTITY_REF_ID: {
        id: 'ENTITY_REF_ID',
        type: 'number',
    },
    ENCHANTMENT_ID: {
        id: 'ENCHANTMENT_ID',
        type: 'number',
    },
    ACTION_ID: {
        id: 'ACTION_ID',
        type: 'number',
    },
    SKIN_TONE: {
        id: 'SKIN_TONE',
        type: 'number'
    },
    HAIR_STYLE: {
        id: 'HAIR_STYLE',
        type: 'number'
    },
    HAIR_COLOR: {
        id: 'HAIR_COLOR',
        type: 'number'
    },
    PRICE: {
        id: 'PRICE',
        type: 'number'
    },
    GENDER: {
        id: 'GENDER',
        type: 'number'
    },
    EYE_COLOR: {
        id: 'EYE_COLOR',
        type: 'number'
    },
    FACE: {
        id: 'FACE',
        type: 'number'
    },
    FACE_COLOR: {
        id: 'FACE_COLOR',
        type: 'number'
    },
    SHIRT: {
        id: 'SHIRT',
        type: 'number'
    },
    PANTS: {
        id: 'PANTS',
        type: 'number'
    }
};

try {
    const StepSendClientMessage = require('../internal/Steps/StepSendClientMessage');
    const StepSendGlobalMessage = require('../internal/Steps/StepSendGlobalMessage');
    const StepIsAdjacent = require('../internal/Steps/StepIsAdjacent');
    const StepWalkAdjacent = require('../internal/Steps/StepWalkAdjacent');
    const StepDepleteWorldObjectUses = require('../internal/Steps/StepDepleteWorldObjectUses');
    const StepWalkOnTop = require('../internal/Steps/StepWalkOnTop');
    const StepIsEnacterOwnerOfOwner = require('../internal/Steps/StepIsEnacterOwnerOfOwner');
    const StepOfferEnergy = require('../internal/Steps/StepOfferEnergy');
    const StepAssertItemState = require('../internal/Steps/StepAssertItemState');
    const StepAssertGuildTier = require('../internal/Steps/StepAssertGuildTier');
    const StepAssertGoalStates = require('../internal/Steps/StepAssertGoalStates');
    const StepHealOther = require('../internal/Steps/StepHealOther');
    const StepCreateBarricade = require('../internal/Steps/StepCreateBarricade');
    const StepRollRandomEvent = require('../internal/Steps/StepRollRandomEvent');
    const StepRollSpecialItem = require('../internal/Steps/StepRollSpecialItem');
    const StepHasInventoryItem = require('../internal/Steps/StepHasInventoryItem');
    const StepHasStorageItem = require('../internal/Steps/StepHasStorageItem');
    const StepHasEquipmentItem = require('../internal/Steps/StepHasEquipmentItem');
    const StepHasSkillLevel = require('../internal/Steps/StepHasSkillLevel');
    const StepIsInCombat = require('../internal/Steps/StepIsInCombat');
    const StepIsInPvpArea = require('../internal/Steps/StepIsInPvpArea');
    const StepIsOwnerInCombat = require('../internal/Steps/StepIsOwnerInCombat');
    const StepHasInventoryItemGroup = require('../internal/Steps/StepHasInventoryItemGroup');
    const StepGetMaxItemAmount = require('../internal/Steps/StepGetMaxItemAmount');
    const StepSetCharacterState = require('../internal/Steps/StepSetCharacterState');
    const StepRollGiveSilk = require('../internal/Steps/StepRollGiveSilk');
    const StepBuyStorageSpace = require('../internal/Steps/StepBuyStorageSpace');
    const StepChangeUsername = require('../internal/Steps/StepChangeUsername');
    const StepCheckCharacterState = require('../internal/Steps/StepCheckCharacterState');
    const StepInventoryHasRoom = require('../internal/Steps/StepInventoryHasRoom');
    const StepChangeMapID = require('../internal/Steps/StepChangeMapID');
    const StepMapActionParameter = require('../internal/Steps/StepMapActionParameter');
    const StepIsOnTop = require('../internal/Steps/StepIsOnTop');
    const StepDepositBagItem = require('../internal/Steps/StepDepositBagItem');
    const StepBindBagItem = require('../internal/Steps/StepBindBagItem');
    const StepBindEnchantmentItem = require('../internal/Steps/StepBindEnchantmentItem');
    const StepWithdrawBagItem = require('../internal/Steps/StepWithdrawBagItem');
    const StepRepairBag = require('../internal/Steps/StepRepairBag');
    const StepIncinerateItem = require('../internal/Steps/StepIncinerateItem');
    const StepIncreaseBagSize = require('../internal/Steps/StepIncreaseBagSize');
    const StepIsTimerExpired = require('../internal/Steps/StepIsTimerExpired');
    const StepHasInventorySpace = require('../internal/Steps/StepHasInventorySpace');
    const StepCanPickupGrounditem = require('../internal/Steps/StepCanPickupGrounditem');
    const StepPlayAnimation = require('../internal/Steps/StepPlayAnimation');
    const StepPickupItemArea = require('../internal/Steps/StepPickupItemArea');
    const StepClearBounty = require('../internal/Steps/StepClearBounty');
    const StepRemoveInventoryItem = require('../internal/Steps/StepRemoveInventoryItem');
    const StepRemoveStorageItem = require('../internal/Steps/StepRemoveStorageItem');
    const StepRemoveEquipmentItem = require('../internal/Steps/StepRemoveEquipmentItem');
    const StepRemoveOwnerEquipmentItem = require('../internal/Steps/StepRemoveOwnerEquipmentItem');
    const StepUpdateTimer = require('../internal/Steps/StepUpdateTimer');
    const StepChangeLevel = require('../internal/Steps/StepChangeLevel');
    const StepDespawnOwner = require('../internal/Steps/StepDespawnOwner');
    const StepDepositItem = require('../internal/Steps/StepDepositItem');
    const StepDepositDropPartyItem = require('../internal/Steps/StepDepositDropPartyItem');
    const StepWithdrawItem = require('../internal/Steps/StepWithdrawItem');
    const StepSellItemToShop = require('../internal/Steps/StepSellItemToShop');
    const StepBuyItemFromShop = require('../internal/Steps/StepBuyItemFromShop');
    const StepRemoveMarketOffer = require('../internal/Steps/StepRemoveMarketOffer');
    const StepRollSkillSuccess = require('../internal/Steps/StepRollSkillSuccess');
    const StepSetParameterBestToolPower = require('../internal/Steps/StepSetParameterBestToolPower');
    const StepRollMinMaxSkillSuccess = require('../internal/Steps/StepRollMinMaxSkillSuccess');
    const StepCombineMoneyBags = require('../internal/Steps/StepCombineMoneyBags');
    const StepSetParameterItemAmount = require('../internal/Steps/StepSetParameterItemAmount');
    const StepSetParameterItemStateDef = require('../internal/Steps/StepSetParameterItemStateDef');
    const StepCanAttackOwner = require('../internal/Steps/StepCanAttackOwner');
    const StepHasLineOfSight = require('../internal/Steps/StepHasLineOfSight');
    const StepRequestDropParty = require('../internal/Steps/StepRequestDropParty');
    const StepOwnerInAttackRange = require('../internal/Steps/StepOwnerInAttackRange');
    const StepChangeAttackStyle = require('../internal/Steps/StepChangeAttackStyle');
    const StepChangeCombatRetaliation = require('../internal/Steps/StepChangeCombatRetaliation');
    const StepClearTimer = require('../internal/Steps/StepClearTimer');
    const StepSetSyphonShardItemAmount = require('../internal/Steps/StepSetSyphonShardItemAmount');
    const StepGiveInventoryItem = require('../internal/Steps/StepGiveInventoryItem');
    const StepGiveStorageItem = require('../internal/Steps/StepGiveStorageItem');
    const StepGiveEquipmentItem = require('../internal/Steps/StepGiveEquipmentItem');
    const StepGiveOwnerEquipmentItem = require('../internal/Steps/StepGiveOwnerEquipmentItem');
    const StepGiveXp = require('../internal/Steps/StepGiveXp');
    const StepSetPosition = require('../internal/Steps/StepSetPosition');
    const StepRollDropTable = require('../internal/Steps/StepRollDropTable');
    const StepRollSkillDropTable = require('../internal/Steps/StepRollSkillDropTable');        
    const StepCreateGroundItem = require('../internal/Steps/StepCreateGroundItem');
    const StepOpenStorageInterface = require('../internal/Steps/StepOpenStorageInterface');
    const StepOpenDialogInterface = require('../internal/Steps/StepOpenDialogInterface');
    const StepShowDialog = require('../internal/Steps/StepShowDialog');
    const StepProcessDialog = require('../internal/Steps/StepProcessDialog');
    const StepShowDirectionArrow = require('../internal/Steps/StepShowDirectionArrow');
    const StepShowDefaultInterfaces = require('../internal/Steps/StepShowDefaultInterfaces');
    const StepOperateMarket = require('../internal/Steps/StepOperateMarket');
    const StepRollDespawn = require('../internal/Steps/StepRollDespawn');
    const StepSetAutocastSpell = require('../internal/Steps/StepSetAutocastSpell');
    const StepCastSpell = require('../internal/Steps/StepCastSpell');
    const StepGiveCutGem = require('../internal/Steps/StepGiveCutGem');
    const StepCanCastSpell = require('../internal/Steps/StepCanCastSpell');
    const StepIsSpellUnlocked = require('../internal/Steps/StepIsSpellUnlocked');
    const StepUnlockSpell = require('../internal/Steps/StepUnlockSpell');
    const StepSetRespawnTimer = require('../internal/Steps/StepSetRespawnTimer');
    const StepOpenShopInterface = require('../internal/Steps/StepOpenShopInterface');
    const StepOpenActionMenuInterface = require('../internal/Steps/StepOpenActionMenuInterface');
    const StepCreateConstructionObject = require('../internal/Steps/StepCreateConstructionObject');
    const StepCreateCampFire = require('../internal/Steps/StepCreateCampFire');
    const StepCombineItems = require('../internal/Steps/StepCombineItems');
    const StepAttackOwner = require('../internal/Steps/StepAttackOwner');
    const StepGetUsesUntilDepletion = require('../internal/Steps/StepGetUsesUntilDepletion');
    const StepFollowOwner = require('../internal/Steps/StepFollowOwner');
    const StepEatFood = require('../internal/Steps/StepEatFood');
    const StepDamage = require('../internal/Steps/StepDamage');
    const StepPeekCrabPot = require('../internal/Steps/StepPeekCrabPot');
    const StepTeleport = require('../internal/Steps/StepTeleport');
    const StepSetBounty = require('../internal/Steps/StepSetBounty');
    const StepHireAdventurer = require('../internal/Steps/StepHireAdventurer');
    const StepSwitchNoteSettings = require('../internal/Steps/StepSwitchNoteSettings');
    const StepPlaySound = require('../internal/Steps/StepPlaySound');
    const StepUpgradeActionInterval = require('../internal/Steps/StepUpgradeActionInterval');
    const StepUpgradeWorldObject = require('../internal/Steps/StepUpgradeWorldObject');
    const StepDisassembleConstructionObject = require('../internal/Steps/StepDisassembleConstructionObject');
    const StepDisassembleWorldObjectUpgrade = require('../internal/Steps/StepDisassembleWorldObjectUpgrade');
    const StepCheckConstructionObject = require('../internal/Steps/StepCheckConstructionObject');
    const StepCheckWorldObject = require('../internal/Steps/StepCheckWorldObject');
    const StepOperateConstructionObject = require('../internal/Steps/StepOperateConstructionObject');
    const StepSetActionInterval = require('../internal/Steps/StepSetActionInterval');
    const StepSetParameterMaxNoteAmount = require('../internal/Steps/StepSetParameterMaxNoteAmount');
    const StepConvertToNote = require('../internal/Steps/StepConvertToNote');
    const StepSignPermit = require('../internal/Steps/StepSignPermit');
    const StepGiveObeliskAncientEnergy = require('../internal/Steps/StepGiveObeliskAncientEnergy');
    const StepHasPermit = require('../internal/Steps/StepHasPermit');
    const StepPurchaseItem = require('../internal/Steps/StepPurchaseItem');
    const StepWithdrawPurchase = require('../internal/Steps/StepWithdrawPurchase');
    const StepOpenEnchantmentInterface = require('../internal/Steps/StepOpenEnchantmentInterface');
    const StepUseEnchantmentCharge = require('../internal/Steps/StepUseEnchantmentCharge');
    const StepUseEnchantment = require('../internal/Steps/StepUseEnchantment');
    const StepOpenPurchasesInterface = require('../internal/Steps/StepOpenPurchasesInterface');
    const StepOpenDropPartyMinigameChestInterface = require('../internal/Steps/StepOpenDropPartyMinigameChestInterface');
    const StepOwnerInWalkBounds = require('../internal/Steps/StepOwnerInWalkBounds');
    const StepHasCombatLevel = require('../internal/Steps/StepHasCombatLevel');
    const StepRandomizeItemStateItemID = require('../internal/Steps/StepRandomizeItemStateItemID');
    const StepAcceptTrade = require('../internal/Steps/StepAcceptTrade');
    const StepDeclineTrade = require('../internal/Steps/StepDeclineTrade');
    const StepSendTradeRequest = require('../internal/Steps/StepSendTradeRequest');
    const StepAcceptTradeRequest = require('../internal/Steps/StepAcceptTradeRequest');
    const StepAddTradeItem = require('../internal/Steps/StepAddTradeItem');
    const StepRemoveTradeItem = require('../internal/Steps/StepRemoveTradeItem');
    const StepUseItemCharges = require('../internal/Steps/StepUseItemCharges');
    const StepIsInArea = require('../internal/Steps/StepIsInArea');
    const StepJoinMinigame = require('../internal/Steps/StepJoinMinigame');
    const StepLeaveMinigame = require('../internal/Steps/StepLeaveMinigame');
    const StepOpenAppearanceInterface = require('../internal/Steps/StepOpenAppearanceInterface') ;
    const StepAddMarketBuyOffer = require('../internal/Steps/StepAddMarketBuyOffer');
    const StepAddMarketSellOffer = require('../internal/Steps/StepAddMarketSellOffer');
    const StepMakeClosestNPCAttackClosestNPC = require('../internal/Steps/StepMakeClosestNPCAttackClosestNPC');
    const StepSetUserGoalState = require('../internal/Steps/StepSetUserGoalState');
    const StepOpenJewelryCraftInterface = require('../internal/Steps/StepOpenJewelryCraftInterface');
    const StepSayMessage = require('../internal/Steps/StepSayMessage');
    const StepCastEnchantment = require('../internal/Steps/StepCastEnchantment');
    const StepSelectEnchantmentItem = require('../internal/Steps/StepSelectEnchantmentItem');
    const StepSelectEnchantment = require('../internal/Steps/StepSelectEnchantment');
    const StepCraftJewelryItem = require('../internal/Steps/StepCraftJewelryItem');
    const StepAddJewelryCraftItem = require('../internal/Steps/StepAddJewelryCraftItem');
    const StepRemoveJewelryCraftItem = require('../internal/Steps/StepRemoveJewelryCraftItem');
    const StepRemoveEnchantmentItem = require('../internal/Steps/StepRemoveEnchantmentItem');
    const StepChangeAppearance = require('../internal/Steps/StepChangeAppearance');
    const StepIsPatreonSupporter = require('../internal/Steps/StepIsPatreonSupporter');
    const StepAddGuildChestItem = require('../internal/Steps/StepAddGuildChestItem');
    const StepRemoveGuildChestItem = require('../internal/Steps/StepRemoveGuildChestItem');
    const StepOpenGuildChestInterface = require('../internal/Steps/StepOpenGuildChestInterface');
    const StepDepositGuildChestItems = require('../internal/Steps/StepDepositGuildChestItems');

    module.exports.StepTypeClassDictionary = StepTypeClassDictionary = {
        SEND_CLIENT_MESSAGE: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepSendClientMessage.StepSendClientMessage(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        SAY_MESSAGE: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepSayMessage.StepSayMessage(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        CAST_ENCHANTMENT: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepCastEnchantment.StepCastEnchantment(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        SELECT_ENCHANTMENT_ITEM: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepSelectEnchantmentItem.StepSelectEnchantmentItem(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        SELECT_ENCHANTMENT: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepSelectEnchantment.StepSelectEnchantment(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        CRAFT_JEWELRY_ITEM: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepCraftJewelryItem.StepCraftJewelryItem(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        ADD_JEWELRY_CRAFT_ITEM: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepAddJewelryCraftItem.StepAddJewelryCraftItem(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        REMOVE_JEWELRY_CRAFT_ITEM: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepRemoveJewelryCraftItem.StepRemoveJewelryCraftItem(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        REMOVE_ENCHANTMENT_ITEM: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepRemoveEnchantmentItem.StepRemoveEnchantmentItem(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        SEND_GLOBAL_MESSAGE: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepSendGlobalMessage.StepSendGlobalMessage(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        OPEN_PURCHASES_INTERFACE: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepOpenPurchasesInterface.StepOpenPurchasesInterface(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        OPEN_DROP_PARTY_MINIGAME_CHEST_INTERFACE: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepOpenDropPartyMinigameChestInterface.StepOpenDropPartyMinigameChestInterface(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        SET_PARAMETER_MAX_NOTE_AMOUNT: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepSetParameterMaxNoteAmount.StepSetParameterMaxNoteAmount(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        SIGN_PERMIT: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepSignPermit.StepSignPermit(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        GIVE_OBELISK_ANCIENT_ENERGY: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepGiveObeliskAncientEnergy.StepGiveObeliskAncientEnergy(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        OPERATE_CONSTRUCTION_OBJECT: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepOperateConstructionObject.StepOperateConstructionObject(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        CONVERT_TO_NOTE: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepConvertToNote.StepConvertToNote(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        SET_ACTION_INTERVAL: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepSetActionInterval.StepSetActionInterval(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        IS_ADJACENT: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepIsAdjacent.StepIsAdjacent(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        ADD_MARKET_BUY_OFFER: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepAddMarketBuyOffer.StepAddMarketBuyOffer(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        ADD_MARKET_SELL_OFFER: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepAddMarketSellOffer.StepAddMarketSellOffer(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        PURCHASE_ITEM: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepPurchaseItem.StepPurchaseItem(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        WITHDRAW_PURCHASE: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepWithdrawPurchase.StepWithdrawPurchase(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        OPEN_ENCHANTMENT_INTERFACE: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepOpenEnchantmentInterface.StepOpenEnchantmentInterface(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        USE_ENCHANTMENT_CHARGE: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepUseEnchantmentCharge.StepUseEnchantmentCharge(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        USE_ENCHANTMENT: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepUseEnchantment.StepUseEnchantment(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        WALK_ADJACENT: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepWalkAdjacent.StepWalkAdjacent(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        WALK_ON_TOP: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepWalkOnTop.StepWalkOnTop(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        IS_ENACTER_OWNER_OF_OWNER: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepIsEnacterOwnerOfOwner.StepIsEnacterOwnerOfOwner(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        CREATE_BARRICADE: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepCreateBarricade.StepCreateBarricade(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        ROLL_RANDOM_EVENT: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepRollRandomEvent.StepRollRandomEvent(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        ROLL_SPECIAL_ITEM: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepRollSpecialItem.StepRollSpecialItem(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        HEAL_OTHER: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepHealOther.StepHealOther(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        OFFER_ENERGY: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepOfferEnergy.StepOfferEnergy(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        ASSERT_ITEM_STATE: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepAssertItemState.StepAssertItemState(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        ASSERT_GUILD_TIER: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepAssertGuildTier.StepAssertGuildTier(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        ASSERT_GOAL_STATES: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepAssertGoalStates.StepAssertGoalStates(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        HAS_INVENTORY_ITEM: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepHasInventoryItem.StepHasInventoryItem(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        IS_PATREON_SUPPORTER: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepIsPatreonSupporter.StepIsPatreonSupporter(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        ADD_GUILD_CHEST_ITEM: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepAddGuildChestItem.StepAddGuildChestItem(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        REMOVE_GUILD_CHEST_ITEM: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepRemoveGuildChestItem.StepRemoveGuildChestItem(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        OPEN_GUILD_CHEST_INTERFACE: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepOpenGuildChestInterface.StepOpenGuildChestInterface(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        DEPOSIT_GUILD_CHEST_ITEMS: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepDepositGuildChestItems.StepDepositGuildChestItems(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        SET_CHARACTER_STATE: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepSetCharacterState.StepSetCharacterState(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        ROLL_GIVE_SILK: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepRollGiveSilk.StepRollGiveSilk(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        BUY_STORAGE_SPACE: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepBuyStorageSpace.StepBuyStorageSpace(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        CHANGE_USERNAME: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepChangeUsername.StepChangeUsername(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        CHECK_CHARACTER_STATE: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepCheckCharacterState.StepCheckCharacterState(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        HAS_STORAGE_ITEM: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepHasStorageItem.StepHasStorageItem(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        HAS_EQUIPMENT_ITEM: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepHasEquipmentItem.StepHasEquipmentItem(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        HAS_SKILL_LEVEL: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepHasSkillLevel.StepHasSkillLevel(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        HAS_COMBAT_LEVEL: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepHasCombatLevel.StepHasCombatLevel(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        RANDOMIZE_ITEM_STATE_ITEMID: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepRandomizeItemStateItemID.StepRandomizeItemStateItemID(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        IS_IN_COMBAT: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepIsInCombat.StepIsInCombat(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        IS_IN_PVP_AREA: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepIsInPvpArea.StepIsInPvpArea(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        IS_OWNER_IN_COMBAT: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepIsOwnerInCombat.StepIsOwnerInCombat(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        GET_USES_UNTIL_DEPLETION: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepGetUsesUntilDepletion.StepGetUsesUntilDepletion(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        HAS_INVENTORY_ITEM_GROUP: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepHasInventoryItemGroup.StepHasInventoryItemGroup(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        GET_MAX_ITEM_AMOUNT: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepGetMaxItemAmount.StepGetMaxItemAmount(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        INVENTORY_HAS_ROOM: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepInventoryHasRoom.StepInventoryHasRoom(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        CHANGE_MAP_ID: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepChangeMapID.StepChangeMapID(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        MAP_ACTION_PARAMETER: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepMapActionParameter.StepMapActionParameter(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        IS_ON_TOP: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepIsOnTop.StepIsOnTop(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        BIND_BAG_ITEM: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepBindBagItem.StepBindBagItem(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        BIND_ENCHANTMENT_ITEM: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepBindEnchantmentItem.StepBindEnchantmentItem(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        DEPOSIT_BAG_ITEM: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepDepositBagItem.StepDepositBagItem(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        WITHDRAW_BAG_ITEM: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepWithdrawBagItem.StepWithdrawBagItem(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        REPAIR_BAG: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepRepairBag.StepRepairBag(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        INCREASE_BAG_SIZE: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepIncreaseBagSize.StepIncreaseBagSize(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        INCINERATE_ITEM: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepIncinerateItem.StepIncinerateItem(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        IS_TIMER_EXPIRED: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepIsTimerExpired.StepIsTimerExpired(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        HAS_INVENTORY_SPACE: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepHasInventorySpace.StepHasInventorySpace(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        CAN_PICKUP_GROUNDITEM: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepCanPickupGrounditem.StepCanPickupGrounditem(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        PLAY_ANIMATION: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepPlayAnimation.StepPlayAnimation(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        PICKUP_ITEM_AREA: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepPickupItemArea.StepPickupItemArea(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        REMOVE_INVENTORY_ITEM: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepRemoveInventoryItem.StepRemoveInventoryItem(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        REMOVE_STORAGE_ITEM: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepRemoveStorageItem.StepRemoveStorageItem(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        REMOVE_EQUIPMENT_ITEM: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepRemoveEquipmentItem.StepRemoveEquipmentItem(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        REMOVE_OWNER_EQUIPMENT_ITEM: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepRemoveOwnerEquipmentItem.StepRemoveOwnerEquipmentItem(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        UPDATE_TIMER: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepUpdateTimer.StepUpdateTimer(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        CHANGE_LEVEL: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepChangeLevel.StepChangeLevel(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        DESPAWN_OWNER: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepDespawnOwner.StepDespawnOwner(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        DEPOSIT_ITEM: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepDepositItem.StepDepositItem(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        DEPOSIT_DROP_PARTY_ITEM: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepDepositDropPartyItem.StepDepositDropPartyItem(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        WITHDRAW_ITEM: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepWithdrawItem.StepWithdrawItem(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        SELL_ITEM_TO_SHOP: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepSellItemToShop.StepSellItemToShop(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        BUY_ITEM_FROM_SHOP: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepBuyItemFromShop.StepBuyItemFromShop(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        REMOVE_MARKET_OFFER: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepRemoveMarketOffer.StepRemoveMarketOffer(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        ROLL_SKILL_SUCCESS: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepRollSkillSuccess.StepRollSkillSuccess(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        SET_PARAMETER_BEST_TOOL_POWER: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepSetParameterBestToolPower.StepSetParameterBestToolPower(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        ROLL_MIN_MAX_SKILL_SUCCESS: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepRollMinMaxSkillSuccess.StepRollMinMaxSkillSuccess(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        COMBINE_MONEY_BAGS: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepCombineMoneyBags.StepCombineMoneyBags(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        SET_PARAMETER_ITEM_AMOUNT: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepSetParameterItemAmount.StepSetParameterItemAmount(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        SET_PARAMETER_ITEM_STATE: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepSetParameterItemStateDef.StepSetParameterItemStateDef(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        CAN_ATTACK_OWNER: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepCanAttackOwner.StepCanAttackOwner(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        HAS_LINE_OF_SIGHT: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepHasLineOfSight.StepHasLineOfSight(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        REQUEST_DROP_PARTY: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepRequestDropParty.StepRequestDropParty(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        OWNER_IN_ATTACK_RANGE: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepOwnerInAttackRange.StepOwnerInAttackRange(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        OWNER_IN_WALK_BOUNDS: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepOwnerInWalkBounds.StepOwnerInWalkBounds(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        CHANGE_ATTACK_STYLE: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepChangeAttackStyle.StepChangeAttackStyle(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        CHANGE_COMBAT_RETALIATION: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepChangeCombatRetaliation.StepChangeCombatRetaliation(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        CLEAR_TIMER: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepClearTimer.StepClearTimer(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        SET_SYPHON_SHARD_ITEM_AMOUNT: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepSetSyphonShardItemAmount.StepSetSyphonShardItemAmount(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        GIVE_INVENTORY_ITEM: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepGiveInventoryItem.StepGiveInventoryItem(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        GIVE_STORAGE_ITEM: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepGiveStorageItem.StepGiveStorageItem(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        GIVE_EQUIPMENT_ITEM: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepGiveEquipmentItem.StepGiveEquipmentItem(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        GIVE_OWNER_EQUIPMENT_ITEM: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepGiveOwnerEquipmentItem.StepGiveOwnerEquipmentItem(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        HAS_PERMIT: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepHasPermit.StepHasPermit(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        UPGRADE_ACTION_INTERVAL: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepUpgradeActionInterval.StepUpgradeActionInterval(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        GIVE_XP: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepGiveXp.StepGiveXp(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        SET_POSITION: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepSetPosition.StepSetPosition(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        ROLL_DROP_TABLE: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepRollDropTable.StepRollDropTable(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        ROLL_SKILL_DROP_TABLE: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepRollSkillDropTable.StepRollSkillDropTable(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        CREATE_GROUND_ITEM: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepCreateGroundItem.StepCreateGroundItem(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        OPEN_STORAGE_INTERFACE: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepOpenStorageInterface.StepOpenStorageInterface(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        OPEN_DIALOG_INTERFACE: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepOpenDialogInterface.StepOpenDialogInterface(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        SHOW_DIALOG: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepShowDialog.StepShowDialog(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        PROCESS_DIALOG: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepProcessDialog.StepProcessDialog(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        SHOW_DIRECTION_ARROW: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepShowDirectionArrow.StepShowDirectionArrow(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        SHOW_DEFAULT_INTERFACES: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepShowDefaultInterfaces.StepShowDefaultInterfaces(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        OPERATE_MARKET: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepOperateMarket.StepOperateMarket(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        ROLL_DESPAWN: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepRollDespawn.StepRollDespawn(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        SET_AUTOCAST_SPELL: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepSetAutocastSpell.StepSetAutocastSpell(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        CAST_SPELL: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepCastSpell.StepCastSpell(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        GIVE_CUT_GEM: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepGiveCutGem.StepGiveCutGem(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        CAN_CAST_SPELL: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepCanCastSpell.StepCanCastSpell(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        IS_SPELL_UNLOCKED: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepIsSpellUnlocked.StepIsSpellUnlocked(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        UNLOCK_SPELL: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepUnlockSpell.StepUnlockSpell(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        SET_RESPAWN_TIMER: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepSetRespawnTimer.StepSetRespawnTimer(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        OPEN_SHOP_INTERFACE: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepOpenShopInterface.StepOpenShopInterface(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        OPEN_ACTION_MENU_INTERFACE: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepOpenActionMenuInterface.StepOpenActionMenuInterface(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        CREATE_CAMP_FIRE: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepCreateCampFire.StepCreateCampFire(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        COMBINE_ITEMS: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepCombineItems.StepCombineItems(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        ATTACK_OWNER: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepAttackOwner.StepAttackOwner(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        FOLLOW_OWNER: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepFollowOwner.StepFollowOwner(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        EAT_FOOD: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepEatFood.StepEatFood(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        DAMAGE: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepDamage.StepDamage(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        PEEK_CRAB_POT: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepPeekCrabPot.StepPeekCrabPot(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        TELEPORT: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepTeleport.StepTeleport(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        SET_BOUNTY: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepSetBounty.StepSetBounty(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        HIRE_ADVENTURER: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepHireAdventurer.StepHireAdventurer(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        SWITCH_NOTE_SETTINGS: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepSwitchNoteSettings.StepSwitchNoteSettings(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        PLAY_SOUND: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepPlaySound.StepPlaySound(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        CREATE_CONSTRUCTION_OBJECT: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepCreateConstructionObject.StepCreateConstructionObject(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        UPGRADE_WORLD_OBJECT: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepUpgradeWorldObject.StepUpgradeWorldObject(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        DISASSEMBLE_CONSTRUCTION_OBJECT: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepDisassembleConstructionObject.StepDisassembleConstructionObject(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        DISASSEMBLE_WORLD_OBJECT_UPGRADE: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepDisassembleWorldObjectUpgrade.StepDisassembleWorldObjectUpgrade(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        CHECK_CONSTRUCTION_OBJECT: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepCheckConstructionObject.StepCheckConstructionObject(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        CHECK_WORLD_OBJECT: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepCheckWorldObject.StepCheckWorldObject(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        DEPLETE_WORLD_OBJECT_USES: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepDepleteWorldObjectUses.StepDepleteWorldObjectUses(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        CLEAR_BOUNTY: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepClearBounty.StepClearBounty(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        SEND_TRADE_REQUEST: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepSendTradeRequest.StepSendTradeRequest(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        ACCEPT_TRADE_REQUEST: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepAcceptTradeRequest.StepAcceptTradeRequest(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        ACCEPT_TRADE: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepAcceptTrade.StepAcceptTrade(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        DECLINE_TRADE: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepDeclineTrade.StepDeclineTrade(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        ADD_TRADE_ITEM: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepAddTradeItem.StepAddTradeItem(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        REMOVE_TRADE_ITEM: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepRemoveTradeItem.StepRemoveTradeItem(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        USE_ITEM_CHARGES: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepUseItemCharges.StepUseItemCharges(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        IS_IN_AREA: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepIsInArea.StepIsInArea(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        JOIN_MINIGAME: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepJoinMinigame.StepJoinMinigame(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        LEAVE_MINIGAME: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepLeaveMinigame.StepLeaveMinigame(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        OPEN_CHANGE_APPEARANCE: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepOpenAppearanceInterface.StepOpenAppearanceInterface(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        CHANGE_APPEARANCE: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepChangeAppearance.StepChangeAppearance(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        MAKE_CLOSEST_NPC_ATTACK_CLOSEST_NPC: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepMakeClosestNPCAttackClosestNPC.StepMakeClosestNPCAttackClosestNPC(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        SET_USER_GOAL_STATE: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepSetUserGoalState.StepSetUserGoalState(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        },
        OPEN_JEWELRY_CRAFT_INTERFACE: {
            build: (actionDef, stepDef, enactingEntity, ownerEntity, parameterMap) => {
                return new StepOpenJewelryCraftInterface.StepOpenJewelryCraftInterface(actionDef, stepDef, enactingEntity, ownerEntity, parameterMap);
            },
        }
    };
} catch (e) {
    if (e.code !== 'MODULE_NOT_FOUND') {
        throw e;
    }
    try {
        const ENV = require('../../index').ENV;
        if (ENV && ENV.isServer) {
            e.oldE = true;
            throw e;
        }
    } catch (e) {
        if (e.oldE) {
            throw e;
        }
    }
};