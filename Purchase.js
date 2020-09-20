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
    color: 0x1d1e78,
    rollChance: 4,
}, {
    id: 1,
    name: 'Uncommon',
    color: 0x0c5e0d,
    rollChance: 20,
}, {
    id: 2,
    name: 'Rare',
    color: 0xe8c90b,
    rollChance: 330,
}, {
    id: 3,
    name: 'Mythical',
    color: 0x3d034c,
    rollChance: 2600,
}, {
    id: 4,
    name: 'Royal',
    color: 0xb30404,
    rollChance: 16800,
}, {
    id: 5,
    name: 'Godly',
    color: 0xce42f5,
    rollChance: 350000,
}];

let defaultCrownCost = 1000;

const Cosmetics = [
    {
        id: 0,
        rarity: 0,
        itemID: 912,
        crownCost: defaultCrownCost
    },
    {
        id: 1,
        rarity: 0,
        itemID: 913,
        crownCost: defaultCrownCost
    },
    {
        id: 2,
        rarity: 0,
        itemID: 914,
        crownCost: defaultCrownCost
    },
    {
        id: 3,
        rarity: 0,
        itemID: 915,
        crownCost: defaultCrownCost
    },
    {
        id: 4,
        rarity: 0,
        itemID: 916,
        crownCost: defaultCrownCost
    },
    {
        id: 5,
        rarity: 0,
        itemID: 917,
        crownCost: defaultCrownCost
    },
    {
        id: 6,
        rarity: 0,
        itemID: 918,
        crownCost: defaultCrownCost
    },
    {
        id: 7,
        rarity: 0,
        itemID: 919,
        crownCost: defaultCrownCost
    },
    {
        id: 8,
        rarity: 0,
        itemID: 920,
        crownCost: defaultCrownCost
    },
    {
        id: 9,
        rarity: 0,
        itemID: 921,
        crownCost: defaultCrownCost
    },
    {
        id: 10,
        rarity: 0,
        itemID: 922,
        crownCost: defaultCrownCost
    },
    {
        id: 11,
        rarity: 0,
        itemID: 923,
        crownCost: defaultCrownCost
    },
    {
        id: 12,
        rarity: 0,
        itemID: 924,
        crownCost: defaultCrownCost
    },
    {
        id: 13,
        rarity: 0,
        itemID: 925,
        crownCost: defaultCrownCost
    },
    {
        id: 14,
        rarity: 0,
        itemID: 926,
        crownCost: defaultCrownCost
    },
    {
        id: 15,
        rarity: 0,
        itemID: 927,
        crownCost: defaultCrownCost
    },
    {
        id: 16,
        rarity: 0,
        itemID: 928,
        crownCost: defaultCrownCost
    },
    {
        id: 17,
        rarity: 0,
        itemID: 929,
        crownCost: defaultCrownCost
    },
    {
        id: 18,
        rarity: 0,
        itemID: 930,
        crownCost: defaultCrownCost
    },
    {
        id: 19,
        rarity: 0,
        itemID: 931,
        crownCost: defaultCrownCost
    },
    {
        id: 20,
        rarity: 0,
        itemID: 932,
        crownCost: defaultCrownCost
    },
    {
        id: 21,
        rarity: 0,
        itemID: 933,
        crownCost: defaultCrownCost
    },
    {
        id: 22,
        rarity: 0,
        itemID: 934,
        crownCost: defaultCrownCost
    },
    {
        id: 23,
        rarity: 0,
        itemID: 935,
        crownCost: defaultCrownCost
    },
    {
        id: 24,
        rarity: 0,
        itemID: 936,
        crownCost: defaultCrownCost
    },
    {
        id: 25,
        rarity: 0,
        itemID: 937,
        crownCost: defaultCrownCost
    },
    {
        id: 26,
        rarity: 0,
        itemID: 938,
        crownCost: defaultCrownCost
    },
    {
        id: 27,
        rarity: 0,
        itemID: 939,
        crownCost: defaultCrownCost
    },
    {
        id: 28,
        rarity: 0,
        itemID: 940,
        crownCost: defaultCrownCost
    },
    {
        id: 29,
        rarity: 0,
        itemID: 941,
        crownCost: defaultCrownCost
    },
    {
        id: 30,
        rarity: 0,
        itemID: 942,
        crownCost: defaultCrownCost
    },
    {
        id: 31,
        rarity: 0,
        itemID: 943,
        crownCost: defaultCrownCost
    },
    {
        id: 32,
        rarity: 0,
        itemID: 944,
        crownCost: defaultCrownCost
    },
    {
        id: 33,
        rarity: 0,
        itemID: 945,
        crownCost: defaultCrownCost
    },
    {
        id: 34,
        rarity: 0,
        itemID: 946,
        crownCost: defaultCrownCost
    },
    {
        id: 35,
        rarity: 0,
        itemID: 947,
        crownCost: defaultCrownCost
    },
    {
        id: 36,
        rarity: 0,
        itemID: 948,
        crownCost: defaultCrownCost
    },
    {
        id: 37,
        rarity: 0,
        itemID: 949,
        crownCost: defaultCrownCost
    },
    {
        id: 38,
        rarity: 0,
        itemID: 950,
        crownCost: defaultCrownCost
    },
    {
        id: 39,
        rarity: 0,
        itemID: 951,
        crownCost: defaultCrownCost
    },
    {
        id: 40,
        rarity: 0,
        itemID: 952,
        crownCost: defaultCrownCost
    },
    {
        id: 41,
        rarity: 0,
        itemID: 953,
        crownCost: defaultCrownCost
    },
    {
        id: 42,
        rarity: 0,
        itemID: 954,
        crownCost: defaultCrownCost
    },
    {
        id: 43,
        rarity: 0,
        itemID: 955,
        crownCost: defaultCrownCost
    },
    {
        id: 44,
        rarity: 0,
        itemID: 956,
        crownCost: defaultCrownCost
    },
    {
        id: 45,
        rarity: 0,
        itemID: 957,
        crownCost: defaultCrownCost
    },
    {
        id: 46,
        rarity: 0,
        itemID: 958,
        crownCost: defaultCrownCost
    },
    {
        id: 47,
        rarity: 0,
        itemID: 959,
        crownCost: defaultCrownCost
    },
    {
        id: 48,
        rarity: 0,
        itemID: 960,
        crownCost: defaultCrownCost
    },
    {
        id: 49,
        rarity: 0,
        itemID: 961,
        crownCost: defaultCrownCost
    },
    {
        id: 50,
        rarity: 0,
        itemID: 962,
        crownCost: defaultCrownCost
    },
    {
        id: 51,
        rarity: 0,
        itemID: 963,
        crownCost: defaultCrownCost
    },
    {
        id: 52,
        rarity: 0,
        itemID: 964,
        crownCost: defaultCrownCost
    },
    {
        id: 53,
        rarity: 0,
        itemID: 965,
        crownCost: defaultCrownCost
    },
    {
        id: 54,
        rarity: 0,
        itemID: 966,
        crownCost: defaultCrownCost
    },
    {
        id: 55,
        rarity: 0,
        itemID: 967,
        crownCost: defaultCrownCost
    },
    {
        id: 56,
        rarity: 0,
        itemID: 968,
        crownCost: defaultCrownCost
    },
    {
        id: 57,
        rarity: 0,
        itemID: 969,
        crownCost: defaultCrownCost
    },
    {
        id: 58,
        rarity: 0,
        itemID: 970,
        crownCost: defaultCrownCost
    },
    {
        id: 59,
        rarity: 0,
        itemID: 971,
        crownCost: defaultCrownCost
    },
    {
        id: 60,
        rarity: 0,
        itemID: 972,
        crownCost: defaultCrownCost
    },
    {
        id: 61,
        rarity: 0,
        itemID: 973,
        crownCost: defaultCrownCost
    },
    {
        id: 62,
        rarity: 0,
        itemID: 974,
        crownCost: defaultCrownCost
    },
    {
        id: 63,
        rarity: 0,
        itemID: 975,
        crownCost: defaultCrownCost
    },
    {
        id: 64,
        rarity: 0,
        itemID: 976,
        crownCost: defaultCrownCost
    },
    {
        id: 65,
        rarity: 0,
        itemID: 977,
        crownCost: defaultCrownCost
    },
    {
        id: 66,
        rarity: 0,
        itemID: 978,
        crownCost: defaultCrownCost
    },
    {
        id: 67,
        rarity: 0,
        itemID: 979,
        crownCost: defaultCrownCost
    },
    {
        id: 68,
        rarity: 0,
        itemID: 980,
        crownCost: defaultCrownCost
    },
    {
        id: 69,
        rarity: 0,
        itemID: 981,
        crownCost: defaultCrownCost
    },
    {
        id: 70,
        rarity: 0,
        itemID: 982,
        crownCost: defaultCrownCost
    },
    {
        id: 71,
        rarity: 0,
        itemID: 983,
        crownCost: defaultCrownCost
    },
    {
        id: 72,
        rarity: 0,
        itemID: 984,
        crownCost: defaultCrownCost
    },
    {
        id: 73,
        rarity: 0,
        itemID: 985,
        crownCost: defaultCrownCost
    },
    {
        id: 74,
        rarity: 0,
        itemID: 986,
        crownCost: defaultCrownCost
    },
    {
        id: 75,
        rarity: 0,
        itemID: 987,
        crownCost: defaultCrownCost
    },
    {
        id: 76,
        rarity: 0,
        itemID: 988,
        crownCost: defaultCrownCost
    },
    {
        id: 77,
        rarity: 0,
        itemID: 989,
        crownCost: defaultCrownCost
    },
    {
        id: 78,
        rarity: 0,
        itemID: 990,
        crownCost: defaultCrownCost
    },
    {
        id: 79,
        rarity: 0,
        itemID: 991,
        crownCost: defaultCrownCost
    },
    {
        id: 80,
        rarity: 0,
        itemID: 992,
        crownCost: defaultCrownCost
    },
    {
        id: 81,
        rarity: 0,
        itemID: 993,
        crownCost: defaultCrownCost
    },
    {
        id: 82,
        rarity: 0,
        itemID: 994,
        crownCost: defaultCrownCost
    },
    {
        id: 83,
        rarity: 0,
        itemID: 995,
        crownCost: defaultCrownCost
    },
    {
        id: 84,
        rarity: 0,
        itemID: 996,
        crownCost: defaultCrownCost
    },
    {
        id: 85,
        rarity: 0,
        itemID: 997,
        crownCost: defaultCrownCost
    },
    {
        id: 86,
        rarity: 0,
        itemID: 998,
        crownCost: defaultCrownCost
    },
    {
        id: 87,
        rarity: 0,
        itemID: 999,
        crownCost: defaultCrownCost
    },
    {
        id: 88,
        rarity: 0,
        itemID: 1000,
        crownCost: defaultCrownCost
    },
    {
        id: 89,
        rarity: 0,
        itemID: 1001,
        crownCost: defaultCrownCost
    },
    {
        id: 90,
        rarity: 0,
        itemID: 1002,
        crownCost: defaultCrownCost
    },
    {
        id: 91,
        rarity: 0,
        itemID: 1003,
        crownCost: defaultCrownCost
    },
    {
        id: 92,
        rarity: 0,
        itemID: 1004,
        crownCost: defaultCrownCost
    },
    {
        id: 93,
        rarity: 0,
        itemID: 1005,
        crownCost: defaultCrownCost
    },
    {
        id: 94,
        rarity: 0,
        itemID: 1006,
        crownCost: defaultCrownCost
    },
    {
        id: 95,
        rarity: 0,
        itemID: 1007,
        crownCost: defaultCrownCost
    },
    {
        id: 96,
        rarity: 0,
        itemID: 1008,
        crownCost: defaultCrownCost
    },
    {
        id: 97,
        rarity: 0,
        itemID: 1009,
        crownCost: defaultCrownCost
    },
    {
        id: 98,
        rarity: 0,
        itemID: 1010,
        crownCost: defaultCrownCost
    },
    {
        id: 99,
        rarity: 0,
        itemID: 1011,
        crownCost: defaultCrownCost
    },
    {
        id: 100,
        rarity: 0,
        itemID: 1012,
        crownCost: defaultCrownCost
    },
    {
        id: 101,
        rarity: 0,
        itemID: 1013,
        crownCost: defaultCrownCost
    },
    {
        id: 102,
        rarity: 0,
        itemID: 1014,
        crownCost: defaultCrownCost
    },
    {
        id: 103,
        rarity: 0,
        itemID: 1015,
        crownCost: defaultCrownCost
    },
    {
        id: 104,
        rarity: 0,
        itemID: 1016,
        crownCost: defaultCrownCost
    },
    {
        id: 105,
        rarity: 0,
        itemID: 1017,
        crownCost: defaultCrownCost
    },
    {
        id: 106,
        rarity: 0,
        itemID: 1018,
        crownCost: defaultCrownCost
    },
    {
        id: 107,
        rarity: 0,
        itemID: 1019,
        crownCost: defaultCrownCost
    },
    {
        id: 108,
        rarity: 0,
        itemID: 1020,
        crownCost: defaultCrownCost
    },
    {
        id: 109,
        rarity: 0,
        itemID: 1021,
        crownCost: defaultCrownCost
    },
    {
        id: 110,
        rarity: 0,
        itemID: 1022,
        crownCost: defaultCrownCost
    },
    {
        id: 111,
        rarity: 0,
        itemID: 1023,
        crownCost: defaultCrownCost
    },
    {
        id: 112,
        rarity: 0,
        itemID: 1024,
        crownCost: defaultCrownCost
    },
    {
        id: 113,
        rarity: 0,
        itemID: 1025,
        crownCost: defaultCrownCost
    },
    {
        id: 114,
        rarity: 0,
        itemID: 1026,
        crownCost: defaultCrownCost
    },
    {
        id: 115,
        rarity: 0,
        itemID: 1027,
        crownCost: defaultCrownCost
    },
    {
        id: 116,
        rarity: 0,
        itemID: 1028,
        crownCost: defaultCrownCost
    },
    {
        id: 117,
        rarity: 0,
        itemID: 1029,
        crownCost: defaultCrownCost
    },
    {
        id: 118,
        rarity: 0,
        itemID: 1030,
        crownCost: defaultCrownCost
    },
    {
        id: 119,
        rarity: 0,
        itemID: 1031,
        crownCost: defaultCrownCost
    },
    {
        id: 120,
        rarity: 0,
        itemID: 1032,
        crownCost: defaultCrownCost
    },
    {
        id: 121,
        rarity: 0,
        itemID: 1033,
        crownCost: defaultCrownCost
    },
    {
        id: 122,
        rarity: 0,
        itemID: 1034,
        crownCost: defaultCrownCost
    },
    {
        id: 123,
        rarity: 0,
        itemID: 1035,
        crownCost: defaultCrownCost
    },
    {
        id: 124,
        rarity: 0,
        itemID: 1036,
        crownCost: defaultCrownCost
    },
    {
        id: 125,
        rarity: 0,
        itemID: 1037,
        crownCost: defaultCrownCost
    },
    {
        id: 126,
        rarity: 0,
        itemID: 1038,
        crownCost: defaultCrownCost
    },
    {
        id: 127,
        rarity: 0,
        itemID: 1039,
        crownCost: defaultCrownCost
    },
    {
        id: 128,
        rarity: 0,
        itemID: 1040,
        crownCost: defaultCrownCost
    },
    {
        id: 129,
        rarity: 0,
        itemID: 1041,
        crownCost: defaultCrownCost
    },
    {
        id: 130,
        rarity: 0,
        itemID: 1042,
        crownCost: defaultCrownCost
    },
    {
        id: 131,
        rarity: 0,
        itemID: 1043,
        crownCost: defaultCrownCost
    },
    {
        id: 132,
        rarity: 0,
        itemID: 1044,
        crownCost: defaultCrownCost
    },
    {
        id: 133,
        rarity: 0,
        itemID: 1045,
        crownCost: defaultCrownCost
    },
    {
        id: 134,
        rarity: 0,
        itemID: 1046,
        crownCost: defaultCrownCost
    },
    {
        id: 135,
        rarity: 0,
        itemID: 1047,
        crownCost: defaultCrownCost
    },
    {
        id: 136,
        rarity: 0,
        itemID: 1048,
        crownCost: defaultCrownCost
    },
    {
        id: 137,
        rarity: 0,
        itemID: 1049,
        crownCost: defaultCrownCost
    },
    {
        id: 138,
        rarity: 0,
        itemID: 1050,
        crownCost: defaultCrownCost
    }
]


const CosmeticRarityItems = (() => {
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