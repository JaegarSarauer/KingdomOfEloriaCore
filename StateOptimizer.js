const TermToProperty = [
    'ownerID',
    'refID',
    'tiledID',
    'mapID',
    'isVisibilityPrivate',
    'entityType',
    'privateVisiblityTicks',
    'isAttackable',
    'usesUntilDepletion',
    'isDroppingSilk',
    'stats',
    'downgradeRefID',
    'inventory',
    'equipment',
    'state',
    'combat',
    'spells',
    'hasBounty',
    'bountyTicks',
    'appearanceState',
    'canEnterSafeAreas',
    'distancePerStep',
    'maxDistance',
];

let propertyToTerm = {};
for(let i = 0, len = TermToProperty.length; i < len; ++i) {
    propertyToTerm[TermToProperty[i]] = i;
}

const PropertyToTerm = propertyToTerm;

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