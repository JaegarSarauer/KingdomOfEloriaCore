module.exports.PURCHASE_CATALOG = {
    PERMIT_14DAY: {
        id: 'PERMIT_14DAY',
        itemID: 238,
        price: 249,
        name: '14 Day Building Permit',
    },
    PERMIT_30DAY: {
        id: 'PERMIT_30DAY',
        itemID: 239,
        price: 499,
        name: '30 Day Building Permit',
    },
    NEW_MONEY_BAG: {
        id: 'NEW_MONEY_BAG',
        itemID: 328,
        price: 200,
        name: 'Cosmetic Money Bag',
    },
    CROWNS: {
        id: 'CROWNS',
        itemID: 909,
        price: 1,
        name: 'Crowns',
        description: 'Crowns',
        crownAmount: 1,
    },
    CROWNS_2K: {
        id: 'CROWNS_2K',
        itemID: 909,
        price: 199,
        name: '2K Crowns',
        description: '2,000 Crowns',
        crownAmount: 2000,
    },
    CROWNS_5_5K: {
        id: 'CROWNS_5_5K',
        itemID: 909,
        price: 499,
        name: '5.5K Crowns',
        description: '5,000 Crowns\n+ 500 Bonus Crowns',
        crownAmount: 5500,
    },
    CROWNS_12K: {
        id: 'CROWNS_12K',
        itemID: 909,
        price: 999,
        name: '12K Crowns',
        description: '10,000 Crowns\n+ 2,000 Bonus Crowns',
        crownAmount: 12000,
    },
    CROWNS_25K: {
        id: 'CROWNS_25K',
        itemID: 909,
        price: 1999,
        name: '25K Crowns',
        description: '20,000 Crowns\n+ 5,000 Bonus Crowns',
        crownAmount: 25000,
    },
    CROWNS_75K: {
        id: 'CROWNS_75K',
        itemID: 909,
        price: 4999,
        name: '75K Crowns',
        description: '50,000 Crowns\n+ 25,000 Bonus Crowns',
        crownAmount: 75000,
    },
    CROWNS_200K: {
        id: 'CROWNS_200K',
        itemID: 909,
        price: 9999,
        name: '200K Crowns',
        description: '100,000 Crowns\n+ 100,000 Bonus Crowns',
        crownAmount: 200000,
    },
};

module.exports.CROWNS_PURCHASES = [
    this.PURCHASE_CATALOG.CROWNS_2K,
    this.PURCHASE_CATALOG.CROWNS_5_5K,
    this.PURCHASE_CATALOG.CROWNS_12K,
    this.PURCHASE_CATALOG.CROWNS_25K,
    this.PURCHASE_CATALOG.CROWNS_75K,
    this.PURCHASE_CATALOG.CROWNS_200K,
];

const Rarity = [{
    id: 0,
    name: 'Common',
    color: 0x007bff,
    rollChance: 4,
}, {
    id: 1,
    name: 'Uncommon',
    color: 0x00e303,
    rollChance: 20,
}, {
    id: 2,
    name: 'Rare',
    color: 0xffee00,
    rollChance: 330,
}, {
    id: 3,
    name: 'Mythical',
    color: 0x8c0cad,
    rollChance: 2600,
}, {
    id: 4,
    name: 'Royal',
    color: 0xfc0000,
    rollChance: 16800,
}, {
    id: 5,
    name: 'Godly',
    color: 0xece6ed,
    rollChance: 350000,
}];

const CosmeticTestBuilder = (count) => {
let items = [];
for (let i = 0; i < count; ++i) {
    items.push({
        id: i,
        name: 'Leg ' + i,
        rarity: i % 6,
        itemID: i % 6,
        crownCost: (i + 1) * 1000,
    });
}
return items;
}

const Cosmetics = [//{
//     id: 0,
//     name: 'Hat 1',
//     rarity: 0,
//     itemID: 0,
// }, 
...CosmeticTestBuilder(600),
];

const CosmeticRarityItems = (() =>{
    let rarities = [];
    for (let i = 0; i < Rarity.length; ++i) {
        rarities.push([]);
    }
    for (let i = 0; i < Cosmetics.length; ++i) {
        let cosmetic = Cosmetics[i];
        rarities[cosmetic.rarity].push(cosmetic.id);
    }
    return rarities;
})();

module.exports.CosmeticRarityItems = CosmeticRarityItems;
module.exports.Rarity = Rarity;
module.exports.Cosmetics = Cosmetics;