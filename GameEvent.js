const createEventOptions = (optionsObj) => {
    return Object.assign({
        uid: null,
        entityType: null,
        entityID: null,
        refID: null,
    }, optionsObj);
};

const GameEvent = {
    // KILL: 0,
    // GATHER_ITEM: 1,
    // CRAFT_ITEM: 2,
    // DROP_ITEM: 3,
    // ATTACK: 4,
    // DEFEND: 5,
    DIE: 6,
    // EQUIP_ITEM: 7,
    // UNEQUIP_ITEM: 8,
    // DEPOSIT_ITEM: 9,
    // WITHDRAW_ITEM: 10,
    // BUY_SHOP_ITEM: 11,
    // SELL_SHOP_ITEM: 12,

};

module.exports.createEventOptions = createEventOptions;
module.exports.GameEvent = GameEvent;