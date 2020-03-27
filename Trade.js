import ItemStorage from '../internal/ItemStorage';

export const TradeState = {
    NOT_TRADING: -1,
    REQUESTED: 0, //requested a trade
    WAITING: 1, //has been requested, waiting for reply
    PLACE_OFFERS: 2, //accept request, show interface for players
    ACCEPTED_1ST: 3, //Has accepted, waiting for other to accept
    CONFIRM_OFFERS: 4, //both have confirmed, timer is set, waiting to allow confirmation
    ACCEPTED_2ND: 5, //has accepted, waiting for both to confirm and finish trade
};

export const getStatusString = (tradeDef, selfTraderID) => {
    if (tradeDef == null)
        return '';

    let selfStatus = selfTraderID == 1 ? tradeDef.trader1.tradeState : tradeDef.trader2.tradeState;
    let otherStatus = selfTraderID == 2 ? tradeDef.trader1.tradeState : tradeDef.trader2.tradeState;

    if (selfStatus == TradeState.ACCEPTED_2ND) {
        return 'Verified trade, waiting for other player.';
    } else if (otherStatus == TradeState.ACCEPTED_2ND) {
        return 'Other player has verified their trade.';
    } else if (selfStatus == TradeState.CONFIRM_OFFERS && otherStatus == TradeState.CONFIRM_OFFERS) {
        return 'Please verify the trade.';
    } else if (selfStatus == TradeState.ACCEPTED_1ST) {
        return 'Accepted trade, waiting for other player.';
    } else if (otherStatus == TradeState.ACCEPTED_1ST) {
        return 'Other player has accepted trade.';
    } else {
        return 'Add or remove items from the trade offer.';
    }
}

export const fromObject = (tradeObj) => {
    return {
        tradeID: tradeObj.tradeID,
        refID: tradeObj.refID,
        trader1: {
            uid: tradeObj.trader1.uid,
            advID: tradeObj.trader1.advID,
            tradeState: tradeObj.trader1.tradeState,
            items: new ItemStorage().fromObject(tradeObj.trader1.items),
            traderItems: new ItemStorage().fromObject(tradeObj.trader1.traderItems),
        },
        trader2: {
            uid: tradeObj.trader2.uid,
            advID: tradeObj.trader2.advID,
            tradeState: tradeObj.trader2.tradeState,
            items: new ItemStorage().fromObject(tradeObj.trader2.items),
            traderItems: new ItemStorage().fromObject(tradeObj.trader2.traderItems),
        }
    };
}