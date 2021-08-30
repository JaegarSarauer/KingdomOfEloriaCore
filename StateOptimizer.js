const PropertyToTerm = {
    ownerID : 'oID',
    refID : 'rID',
    tiledID : 'tID',
    mapID : 'mID',
    isVisibilityPrivate : 'iVP',
    entityType : 'eT',
    privateVisiblityTicks : 'pVT',
    isAttackable : 'iA',
    usesUntilDepletion : 'uUD',
    isDroppingSilk : 'iDS',
    stats : 'st',
    downgradeRefID : 'dRID',
    inventory : 'inv',
    equipment : 'eqp',
    state : 'ste',
    combat : 'cbt',
    spells : 'spl',
    hasBounty : 'hB',
    bountyTicks : 'bt',
    appearanceState : 'aS',
    canEnterSafeAreas : 'cESA',
    distancePerStep : 'dPS',
    maxDistance : 'mD',
};

const TermToProperty = {
    oID : 'ownerID',
    rID : 'refID',
    tID : 'tiledID',
    mID : 'mapID',
    iVP : 'isVisibilityPrivate',
    eT : 'entityType',
    pVT : 'privateVisiblityTicks',
    iA : 'isAttackable',
    uUD : 'usesUntilDepletion',
    iDS : 'isDroppingSilk',
    st : 'stats',
    dRID : 'downgradeRefID',
    inv : 'inventory',
    eqp : 'equipment',
    ste : 'state',
    cbt : 'combat',
    spl : 'spells',
    hB : 'hasBounty',
    bt : 'bountyTicks',
    aS : 'appearanceState',
    cESA : 'canEnterSafeAreas',
    dPS : 'distancePerStep',
    mD : 'maxDistance'
};

module.exports.PropertyToTerm;
module.exports.TermToProperty;
module.exports.Shrink = (obj) => {
    let keys = Object.keys(obj);
    for(let i = 0; i < keys.length; ++i) {
        if (obj[[keys[i]]] == null || obj[keys[i]] == -1) {
            delete obj[keys[i]];
            continue;
        }

        if (PropertyToTerm[keys[i]]) {
            obj[PropertyToTerm[keys[i]]] = obj[keys[i]];
            delete obj[keys[i]];
        }
    }

    return obj;
};

module.exports.Expand = (obj) => {
    let keys = Object.keys(obj);
    for(let i = 0; i < keys.length; ++i) {
        if (TermToProperty[keys[i]]) {
            obj[TermToProperty[keys[i]]] = obj[keys[i]];
            delete obj[keys[i]];
        }
    }

    return obj;
};