
const Rarity = [{
    id: 0,
    name: 'Common',
    color: 0x007bff,
    rollChance: 4,
    minCrownCost: 1200,
    maxCrownCost: 1900,
}, {
    id: 1,
    name: 'Uncommon',
    color: 0x00e303,
    rollChance: 20,
    minCrownCost: 1900,
    maxCrownCost: 4000,
}, {
    id: 2,
    name: 'Rare',
    color: 0xffee00,
    rollChance: 330,
    minCrownCost: 5000,
    maxCrownCost: 10000,
}, {
    id: 3,
    name: 'Mythical',
    color: 0x8c0cad,
    rollChance: 2900,
    minCrownCost: 10000,
    maxCrownCost: 25000,
}, {
    id: 4,
    name: 'Royal',
    color: 0xfc0000,
    rollChance: 21800,
    minCrownCost: 25000,
    maxCrownCost: 50000,
}, {
    id: 5,
    name: 'Godly',
    color: 0xff63ed,
    rollChance: 600000,
    minCrownCost: 100000,
    maxCrownCost: 500000,
}];

let getCrownPrice = (rarity, factor) => {
    let r = Rarity[rarity];
    let dif = r.maxCrownCost - r.minCrownCost;
    let preRound = r.minCrownCost + (dif * factor);
    return Math.round(preRound / 100) * 100;
}

const Cosmetics = [
    {
        id: 0,
        rarity: 0,
        itemID: 912,
        crownCost: getCrownPrice(0, 0.25),
    },
    {
        id: 1,
        rarity: 0,
        itemID: 913,
        crownCost: getCrownPrice(0, 0.25),
    },
    {
        id: 2,
        rarity: 0,
        itemID: 914,
        crownCost: getCrownPrice(0, 0.25),
    },
    {
        id: 3,
        rarity: 0,
        itemID: 915,
        crownCost: getCrownPrice(0, 0.25),
    },
    {
        id: 4,
        rarity: 2,
        itemID: 916,
        crownCost: getCrownPrice(2, 0.25),
    },
    {
        id: 5,
        rarity: 0,
        itemID: 917,
        crownCost: getCrownPrice(0, 0.6),
    },
    {
        id: 6,
        rarity: 0,
        itemID: 918,
        crownCost: getCrownPrice(0, 0.6),
    },
    {
        id: 7,
        rarity: 0,
        itemID: 919,
        crownCost: getCrownPrice(0, 0.6),
    },
    {
        id: 8,
        rarity: 0,
        itemID: 920,
        crownCost: getCrownPrice(0, 0.6),
    },
    {
        id: 9,
        rarity: 2,
        itemID: 921,
        crownCost: getCrownPrice(2, 0.6),
    },
    {
        id: 10,
        rarity: 0,
        itemID: 922,
        crownCost: getCrownPrice(0, 0.5),
    },
    {
        id: 11,
        rarity: 0,
        itemID: 923,
        crownCost: getCrownPrice(0, 0.5),
    },
    {
        id: 12,
        rarity: 0,
        itemID: 924,
        crownCost: getCrownPrice(0, 0.5),
    },
    {
        id: 13,
        rarity: 0,
        itemID: 925,
        crownCost: getCrownPrice(0, 0.5),
    },
    {
        id: 14,
        rarity: 2,
        itemID: 926,
        crownCost: getCrownPrice(2, 0.5),
    },
    {
        id: 15,
        rarity: 0,
        itemID: 927,
        crownCost: getCrownPrice(0, 0.75),
    },
    {
        id: 16,
        rarity: 0,
        itemID: 928,
        crownCost: getCrownPrice(0, 0.75),
    },
    {
        id: 17,
        rarity: 2,
        itemID: 929,
        crownCost: getCrownPrice(2, 0.75),
    },
    {
        id: 18,
        rarity: 0,
        itemID: 930,
        crownCost: getCrownPrice(0, 0.75),
    },
    {
        id: 19,
        rarity: 2,
        itemID: 931,
        crownCost: getCrownPrice(2, 0.75),
    },
    {
        id: 20,
        rarity: 0,
        itemID: 932,
        crownCost: getCrownPrice(0, 0.6),
    },
    {
        id: 21,
        rarity: 0,
        itemID: 933,
        crownCost: getCrownPrice(0, 0.6),
    },
    {
        id: 22,
        rarity: 2,
        itemID: 934,
        crownCost: getCrownPrice(2, 0.6),
    },
    {
        id: 23,
        rarity: 0,
        itemID: 935,
        crownCost: getCrownPrice(0, 0.6),
    },
    {
        id: 24,
        rarity: 2,
        itemID: 936,
        crownCost: getCrownPrice(2, 0.6),
    },
    {
        id: 25,
        rarity: 0,
        itemID: 937,
        crownCost: getCrownPrice(0, 0.5),
    },
    {
        id: 26,
        rarity: 0,
        itemID: 938,
        crownCost: getCrownPrice(0, 0.5),
    },
    {
        id: 27,
        rarity: 2,
        itemID: 939,
        crownCost: getCrownPrice(2, 0.5),
    },
    {
        id: 28,
        rarity: 0,
        itemID: 940,
        crownCost: getCrownPrice(0, 0.5),
    },
    {
        id: 29,
        rarity: 2,
        itemID: 941,
        crownCost: getCrownPrice(2, 0.5),
    },
    {
        id: 30,
        rarity: 1,
        itemID: 942,
        crownCost: getCrownPrice(1, 0.75),
    },
    {
        id: 31,
        rarity: 2,
        itemID: 943,
        crownCost: getCrownPrice(2, 0.75),
    },
    {
        id: 32,
        rarity: 3,
        itemID: 944,
        crownCost: getCrownPrice(3, 0.75),
    },
    {
        id: 33,
        rarity: 1,
        itemID: 945,
        crownCost: getCrownPrice(1, 0.75),
    },
    {
        id: 34,
        rarity: 2,
        itemID: 946,
        crownCost: getCrownPrice(2, 0.75),
    },
    {
        id: 35,
        rarity: 3,
        itemID: 947,
        crownCost: getCrownPrice(3, 0.75),
    },
    {
        id: 36,
        rarity: 1,
        itemID: 948,
        crownCost: getCrownPrice(1, 0.4),
    },
    {
        id: 37,
        rarity: 2,
        itemID: 949,
        crownCost: getCrownPrice(2, 0.4),
    },
    {
        id: 38,
        rarity: 3,
        itemID: 950,
        crownCost: getCrownPrice(3, 0.4),
    },
    {
        id: 39,
        rarity: 0,
        itemID: 951,
        crownCost: getCrownPrice(0, 0),
    },
    {
        id: 40,
        rarity: 1,
        itemID: 952,
        crownCost: getCrownPrice(1, 0.25),
    },
    {
        id: 41,
        rarity: 2,
        itemID: 953,
        crownCost: getCrownPrice(2, 0.25),
    },
    {
        id: 42,
        rarity: 2,
        itemID: 954,
        crownCost: getCrownPrice(2, 0.25),
    },
    {
        id: 43,
        rarity: 0,
        itemID: 955,
        crownCost: getCrownPrice(0, 0),
    },
    {
        id: 44,
        rarity: 1,
        itemID: 956,
        crownCost: getCrownPrice(1, 0.25),
    },
    {
        id: 45,
        rarity: 2,
        itemID: 957,
        crownCost: getCrownPrice(2, 0.25),
    },
    {
        id: 46,
        rarity: 2,
        itemID: 958,
        crownCost: getCrownPrice(2, 0.25),
    },
    {
        id: 47,
        rarity: 0,
        itemID: 959,
        crownCost: getCrownPrice(0, 0),
    },
    {
        id: 48,
        rarity: 1,
        itemID: 960,
        crownCost: getCrownPrice(1, 0.25),
    },
    {
        id: 49,
        rarity: 2,
        itemID: 961,
        crownCost: getCrownPrice(2, 0.25),
    },
    {
        id: 50,
        rarity: 2,
        itemID: 962,
        crownCost: getCrownPrice(2, 0.25),
    },
    {
        id: 51,
        rarity: 0,
        itemID: 963,
        crownCost: getCrownPrice(0, 0.75),
    },
    {
        id: 52,
        rarity: 0,
        itemID: 964,
        crownCost: getCrownPrice(0, 0.75),
    },
    {
        id: 53,
        rarity: 2,
        itemID: 965,
        crownCost: getCrownPrice(2, 1),
    },
    {
        id: 54,
        rarity: 4,
        itemID: 966,
        crownCost: getCrownPrice(4, 1),
    },
    {
        id: 55,
        rarity: 1,
        itemID: 967,
        crownCost: getCrownPrice(1, 1),
    },
    {
        id: 56,
        rarity: 1,
        itemID: 968,
        crownCost: getCrownPrice(1, 1),
    },
    {
        id: 57,
        rarity: 2,
        itemID: 969,
        crownCost: getCrownPrice(2, 1),
    },
    {
        id: 58,
        rarity: 4,
        itemID: 970,
        crownCost: getCrownPrice(4, 1),
    },
    {
        id: 59,
        rarity: 1,
        itemID: 971,
        crownCost: getCrownPrice(1, 0.75),
    },
    {
        id: 60,
        rarity: 1,
        itemID: 972,
        crownCost: getCrownPrice(1, 0.75),
    },
    {
        id: 61,
        rarity: 2,
        itemID: 973,
        crownCost: getCrownPrice(2, 0.75),
    },
    {
        id: 62,
        rarity: 4,
        itemID: 974,
        crownCost: getCrownPrice(4, 1),
    },
    {
        id: 63,
        rarity: 1,
        itemID: 975,
        crownCost: getCrownPrice(1, 0.25),
    },
    {
        id: 64,
        rarity: 2,
        itemID: 976,
        crownCost: getCrownPrice(2, 0.25),
    },
    {
        id: 65,
        rarity: 3,
        itemID: 977,
        crownCost: getCrownPrice(3, 0.25),
    },
    {
        id: 66,
        rarity: 4,
        itemID: 978,
        crownCost: getCrownPrice(4, 0.4),
    },
    {
        id: 67,
        rarity: 1,
        itemID: 979,
        crownCost: getCrownPrice(1, 0.6),
    },
    {
        id: 68,
        rarity: 2,
        itemID: 980,
        crownCost: getCrownPrice(2, 0.6),
    },
    {
        id: 69,
        rarity: 3,
        itemID: 981,
        crownCost: getCrownPrice(3, 0.75),
    },
    {
        id: 70,
        rarity: 4,
        itemID: 982,
        crownCost: getCrownPrice(4, 1),
    },
    {
        id: 71,
        rarity: 1,
        itemID: 983,
        crownCost: getCrownPrice(1, 0.75),
    },
    {
        id: 72,
        rarity: 2,
        itemID: 984,
        crownCost: getCrownPrice(2, 0.75),
    },
    {
        id: 73,
        rarity: 3,
        itemID: 985,
        crownCost: getCrownPrice(3, 0.75),
    },
    {
        id: 74,
        rarity: 4,
        itemID: 986,
        crownCost: getCrownPrice(4, 0.75),
    },
    {
        id: 75,
        rarity: 0,
        itemID: 987,
        crownCost: getCrownPrice(0, 0.7),
    },
    {
        id: 76,
        rarity: 0,
        itemID: 988,
        crownCost: getCrownPrice(0, 0.8),
    },
    {
        id: 77,
        rarity: 0,
        itemID: 989,
        crownCost: getCrownPrice(0, 0.9),
    },
    {
        id: 78,
        rarity: 0,
        itemID: 990,
        crownCost: getCrownPrice(0, 1),
    },
    {
        id: 79,
        rarity: 1,
        itemID: 991,
        crownCost: getCrownPrice(1, 0.9),
    },
    {
        id: 80,
        rarity: 1,
        itemID: 992,
        crownCost: getCrownPrice(1, 1),
    },
    {
        id: 81,
        rarity: 0,
        itemID: 993,
        crownCost: getCrownPrice(0, 0.7),
    },
    {
        id: 82,
        rarity: 0,
        itemID: 994,
        crownCost: getCrownPrice(0, 0.8),
    },
    {
        id: 83,
        rarity: 0,
        itemID: 995,
        crownCost: getCrownPrice(0, 0.9),
    },
    {
        id: 84,
        rarity: 1,
        itemID: 996,
        crownCost: getCrownPrice(1, 0.9),
    },
    {
        id: 85,
        rarity: 0,
        itemID: 997,
        crownCost: getCrownPrice(0, 0.7),
    },
    {
        id: 86,
        rarity: 0,
        itemID: 998,
        crownCost: getCrownPrice(0, 0.7),
    },
    {
        id: 87,
        rarity: 1,
        itemID: 999,
        crownCost: getCrownPrice(1, 0.85),
    },
    {
        id: 88,
        rarity: 1,
        itemID: 1000,
        crownCost: getCrownPrice(1, 0.9),
    },
    {
        id: 89,
        rarity: 1,
        itemID: 1001,
        crownCost: getCrownPrice(1, 1),
    },
    {
        id: 90,
        rarity: 0,
        itemID: 1002,
        crownCost: getCrownPrice(0, 0.8),
    },
    {
        id: 91,
        rarity: 0,
        itemID: 1003,
        crownCost: getCrownPrice(0, 0.8),
    },
    {
        id: 92,
        rarity: 0,
        itemID: 1004,
        crownCost: getCrownPrice(0, 0.8),
    },
    {
        id: 93,
        rarity: 1,
        itemID: 1005,
        crownCost: getCrownPrice(1, 0.8),
    },
    {
        id: 94,
        rarity: 2,
        itemID: 1006,
        crownCost: getCrownPrice(2, 0.8),
    },
    {
        id: 95,
        rarity: 0,
        itemID: 1007,
        crownCost: getCrownPrice(0, 0.8),
    },
    {
        id: 96,
        rarity: 0,
        itemID: 1008,
        crownCost: getCrownPrice(0, 0.8),
    },
    {
        id: 97,
        rarity: 0,
        itemID: 1009,
        crownCost: getCrownPrice(0, 0.8),
    },
    {
        id: 98,
        rarity: 1,
        itemID: 1010,
        crownCost: getCrownPrice(1, 0.8),
    },
    {
        id: 99,
        rarity: 1,
        itemID: 1011,
        crownCost: getCrownPrice(1, 0.8),
    },
    {
        id: 100,
        rarity: 2,
        itemID: 1012,
        crownCost: getCrownPrice(2, 0.8),
    },
    {
        id: 101,
        rarity: 0,
        itemID: 1013,
        crownCost: getCrownPrice(0, 0.9),
    },
    {
        id: 102,
        rarity: 0,
        itemID: 1014,
        crownCost: getCrownPrice(0, 0.75),
    },
    {
        id: 103,
        rarity: 0,
        itemID: 1015,
        crownCost: getCrownPrice(0, 1),
    },
    {
        id: 104,
        rarity: 0,
        itemID: 1016,
        crownCost: getCrownPrice(0, 1),
    },
    {
        id: 105,
        rarity: 3,
        itemID: 1017,
        crownCost: getCrownPrice(3, 0.8),
    },
    {
        id: 106,
        rarity: 5,
        itemID: 1018,
        crownCost: getCrownPrice(5, 1),
    },
    {
        id: 107,
        rarity: 0,
        itemID: 1019,
        crownCost: getCrownPrice(0, 0.7),
    },
    {
        id: 108,
        rarity: 0,
        itemID: 1020,
        crownCost: getCrownPrice(0, 0.7),
    },
    {
        id: 109,
        rarity: 2,
        itemID: 1021,
        crownCost: getCrownPrice(2, 0.7),
    },
    {
        id: 110,
        rarity: 2,
        itemID: 1022,
        crownCost: getCrownPrice(2, 1),
    },
    {
        id: 111,
        rarity: 0,
        itemID: 1023,
        crownCost: getCrownPrice(0, 0.4),
    },
    {
        id: 112,
        rarity: 0,
        itemID: 1024,
        crownCost: getCrownPrice(0, 0.5),
    },
    {
        id: 113,
        rarity: 1,
        itemID: 1025,
        crownCost: getCrownPrice(1, 0.6),
    },
    {
        id: 114,
        rarity: 0,
        itemID: 1026,
        crownCost: getCrownPrice(0, 0.6),
    },
    {
        id: 115,
        rarity: 1,
        itemID: 1027,
        crownCost: getCrownPrice(1, 0.7),
    },
    {
        id: 116,
        rarity: 0,
        itemID: 1028,
        crownCost: getCrownPrice(0, 0.5),
    },
    {
        id: 117,
        rarity: 0,
        itemID: 1029,
        crownCost: getCrownPrice(0, 0.65),
    },
    {
        id: 118,
        rarity: 3,
        itemID: 1030,
        crownCost: getCrownPrice(3, 0.5),
    },
    {
        id: 119,
        rarity: 0,
        itemID: 1031,
        crownCost: getCrownPrice(0, 0.5),
    },
    {
        id: 120,
        rarity: 0,
        itemID: 1032,
        crownCost: getCrownPrice(0, 0.5),
    },
    {
        id: 121,
        rarity: 5,
        itemID: 1033,
        crownCost: getCrownPrice(5, 0.65),
    },
    {
        id: 122,
        rarity: 0,
        itemID: 1034,
        crownCost: getCrownPrice(0, 0.5),
    },
    {
        id: 123,
        rarity: 0,
        itemID: 1035,
        crownCost: getCrownPrice(0, 0.5),
    },
    {
        id: 124,
        rarity: 1,
        itemID: 1036,
        crownCost: getCrownPrice(1, 0.8),
    },
    {
        id: 125,
        rarity: 2,
        itemID: 1037,
        crownCost: getCrownPrice(2, 0.8),
    },
    {
        id: 126,
        rarity: 0,
        itemID: 1038,
        crownCost: getCrownPrice(0, 0.5),
    },
    {
        id: 127,
        rarity: 0,
        itemID: 1039,
        crownCost: getCrownPrice(0, 0.5),
    },
    {
        id: 128,
        rarity: 0,
        itemID: 1040,
        crownCost: getCrownPrice(0, 0.5),
    },
    {
        id: 129,
        rarity: 0,
        itemID: 1041,
        crownCost: getCrownPrice(0, 0.5),
    },
    {
        id: 130,
        rarity: 0,
        itemID: 1042,
        crownCost: getCrownPrice(0, 0.5),
    },
    {
        id: 131,
        rarity: 1,
        itemID: 1043,
        crownCost: getCrownPrice(1, 0.25),
    },
    {
        id: 132,
        rarity: 0,
        itemID: 1044,
        crownCost: getCrownPrice(0, 0.25),
    },
    {
        id: 133,
        rarity: 0,
        itemID: 1045,
        crownCost: getCrownPrice(0, 0.5),
    },
    {
        id: 134,
        rarity: 0,
        itemID: 1046,
        crownCost: getCrownPrice(0, 0.5),
    },
    {
        id: 135,
        rarity: 0,
        itemID: 1047,
        crownCost: getCrownPrice(0, 0.5),
    },
    {
        id: 136,
        rarity: 0,
        itemID: 1048,
        crownCost: getCrownPrice(0, 0.75),
    },
    {
        id: 137,
        rarity: 1,
        itemID: 1049,
        crownCost: getCrownPrice(1, 0.75),
    },
    {
        id: 138,
        rarity: 2,
        itemID: 1050,
        crownCost: getCrownPrice(2, 0.5),
    },
    {
        id: 139,
        rarity: 0,
        itemID: 1051,
        crownCost: getCrownPrice(0, 0),
    },
    {
        id: 140,
        rarity: 0,
        itemID: 1052,
        crownCost: getCrownPrice(0, 0.1),
    },
    {
        id: 141,
        rarity: 0,
        itemID: 1053,
        crownCost: getCrownPrice(0, 0.2),
    },
    {
        id: 142,
        rarity: 0,
        itemID: 1054,
        crownCost: getCrownPrice(0, 0.5),
    },
    {
        id: 143,
        rarity: 0,
        itemID: 1055,
        crownCost: getCrownPrice(0, 0.5),
    },
    {
        id: 144,
        rarity: 0,
        itemID: 1056,
        crownCost: getCrownPrice(0, 0.5),
    },
    {
        id: 145,
        rarity: 0,
        itemID: 1057,
        crownCost: getCrownPrice(0, 0.5),
    },
    {
        id: 146,
        rarity: 0,
        itemID: 1058,
        crownCost: getCrownPrice(0, 0.5),
    },
    {
        id: 147,
        rarity: 1,
        itemID: 1059,
        crownCost: getCrownPrice(1, 0.5),
    },
    {
        id: 148,
        rarity: 0,
        itemID: 1060,
        crownCost: getCrownPrice(0, 0.5),
    },
    {
        id: 149,
        rarity: 0,
        itemID: 1061,
        crownCost: getCrownPrice(0, 0.5),
    },
    {
        id: 150,
        rarity: 1,
        itemID: 1062,
        crownCost: getCrownPrice(1, 0.5),
    },
    {
        id: 151,
        rarity: 1,
        itemID: 1063,
        crownCost: getCrownPrice(1, 0.6),
    },
    {
        id: 152,
        rarity: 4,
        itemID: 1064,
        crownCost: getCrownPrice(4, 0.65),
    },
    {
        id: 153,
        rarity: 0,
        itemID: 1065,
        crownCost: getCrownPrice(0, 0.5),
    },
    {
        id: 154,
        rarity: 0,
        itemID: 1066,
        crownCost: getCrownPrice(0, 0.75),
    },
    {
        id: 155,
        rarity: 0,
        itemID: 1067,
        crownCost: getCrownPrice(0, 0.75),
    },
    {
        id: 156,
        rarity: 0,
        itemID: 1068,
        crownCost: getCrownPrice(0, 0.5),
    },
    {
        id: 157,
        rarity: 1,
        itemID: 1069,
        crownCost: getCrownPrice(1, 0.25),
    },
    {
        id: 158,
        rarity: 0,
        itemID: 1070,
        crownCost: getCrownPrice(0, 0.25),
    },
    {
        id: 159,
        rarity: 0,
        itemID: 1071,
        crownCost: getCrownPrice(0, 0.25),
    },
    {
        id: 160,
        rarity: 0,
        itemID: 1072,
        crownCost: getCrownPrice(0, 0.25),
    },
    {
        id: 161,
        rarity: 0,
        itemID: 1073,
        crownCost: getCrownPrice(0, 0.25),
    },
    {
        id: 162,
        rarity: 0,
        itemID: 1074,
        crownCost: getCrownPrice(0, 0.25),
    },
    {
        id: 163,
        rarity: 0,
        itemID: 1075,
        crownCost: getCrownPrice(0, 0.1),
    },
    {
        id: 164,
        rarity: 0,
        itemID: 1076,
        crownCost: getCrownPrice(0, 0.1),
    },
    {
        id: 165,
        rarity: 0,
        itemID: 1077,
        crownCost: getCrownPrice(0, 0.1),
    },
    {
        id: 166,
        rarity: 0,
        itemID: 1078,
        crownCost: getCrownPrice(0, 0.1),
    },
    {
        id: 167,
        rarity: 0,
        itemID: 1079,
        crownCost: getCrownPrice(0, 0.1),
    },
    {
        id: 168,
        rarity: 0,
        itemID: 1080,
        crownCost: getCrownPrice(0, 0.1),
    },
    {
        id: 169,
        rarity: 0,
        itemID: 1081,
        crownCost: getCrownPrice(0, 0),
    },
    {
        id: 170,
        rarity: 0,
        itemID: 1082,
        crownCost: getCrownPrice(0, 0),
    },
    {
        id: 171,
        rarity: 0,
        itemID: 1083,
        crownCost: getCrownPrice(0, 0),
    },
    {
        id: 172,
        rarity: 0,
        itemID: 1084,
        crownCost: getCrownPrice(0, 0),
    },
    {
        id: 173,
        rarity: 0,
        itemID: 1085,
        crownCost: getCrownPrice(0, 0),
    },
    {
        id: 174,
        rarity: 0,
        itemID: 1086,
        crownCost: getCrownPrice(0, 0),
    },
    {
        id: 175,
        rarity: 0,
        itemID: 1087,
        crownCost: getCrownPrice(0, 1),
    },
    {
        id: 176,
        rarity: 1,
        itemID: 1088,
        crownCost: getCrownPrice(1, 1),
    },
    {
        id: 177,
        rarity: 1,
        itemID: 1089,
        crownCost: getCrownPrice(1, 1),
    },
    {
        id: 178,
        rarity: 2,
        itemID: 1090,
        crownCost: getCrownPrice(2, 1),
    },
    {
        id: 179,
        rarity: 0,
        itemID: 1091,
        crownCost: getCrownPrice(0, 1),
    },
    {
        id: 180,
        rarity: 3,
        itemID: 1092,
        crownCost: getCrownPrice(3, 1),
    },
    {
        id: 181,
        rarity: 1,
        itemID: 1093,
        crownCost: getCrownPrice(1, 1),
    },
    {
        id: 182,
        rarity: 0,
        itemID: 1094,
        crownCost: getCrownPrice(0, 1),
    }
];

const CosmeticsToPurchaseCatalog = () => {
    let cosmeticPurchases = {};
    for (let i = 0; i < Cosmetics.length; ++i) {
        let purchaseItem = Object.assign({}, Cosmetics[i]);
        purchaseItem.id = 'COSMETIC_' + purchaseItem.id;
        purchaseItem.name = purchaseItem.id;
        purchaseItem.price = 1;
        delete purchaseItem.rarity;

        cosmeticPurchases[purchaseItem.id] = purchaseItem;
    }
    return cosmeticPurchases;
}

const CommunityPurchases = [{
    id: 0,
    name: 'x1.25 XP for 1 Hour'
}];

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
    ...CosmeticsToPurchaseCatalog()
};

module.exports.CROWNS_PURCHASES = [
    this.PURCHASE_CATALOG.CROWNS_2K,
    this.PURCHASE_CATALOG.CROWNS_5_5K,
    this.PURCHASE_CATALOG.CROWNS_12K,
    this.PURCHASE_CATALOG.CROWNS_25K,
    this.PURCHASE_CATALOG.CROWNS_75K,
    this.PURCHASE_CATALOG.CROWNS_200K,
];

const CosmeticRarityItems = (() => {
    let rarities = [];
    for (let i = 0; i < Rarity.length; ++i) {
        rarities.push([]);
    }
    for (let i = 0; i < Cosmetics.length; ++i) {
        let cosmetic = Cosmetics[i];
        let entered = false;
        for (let r = 0; r < rarities[cosmetic.rarity].length; ++r) {
            if (cosmetic.crownCost < Cosmetics[rarities[cosmetic.rarity][r]].crownCost) {
                rarities[cosmetic.rarity].splice(r, 0, cosmetic.id);
                entered = true;
                break;
            }
        }
        if (!entered) {
            rarities[cosmetic.rarity].push(cosmetic.id);
        }
    }
    return rarities;
})();

module.exports.CosmeticRarityItems = CosmeticRarityItems;
module.exports.Rarity = Rarity;
module.exports.Cosmetics = Cosmetics;
