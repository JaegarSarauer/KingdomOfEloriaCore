const Bounds = require('../def/Bounds');

const GuardType = {
    // Mining Guild
    TERAGON_GUILDMASTER : 95,
    TERAGON_THAKOD: 103,
    TERAGON_STEEL_MELEE_GUARD: 87,
    TERAGON_NELENITE_MELEE_GUARD: 88,
    TERAGON_OSMIUM_MELEE_GUARD: 89,
    TERAGON_GOTHITE_MELEE_GUARD: 90,
    TERAGON_SWORDSMAN: 105,
    TERAGON_SWORDSMAN_APPRENTICE : 104,

    // Fishing Guild
    SALMO_GUILDMASTER : 96,
    SALMO_TUNE: 106,
    SALMO_STEEL_MELEE_GUARD: 107,
    SALMO_NELENITE_MELEE_GUARD: 108,
    SALMO_OSMIUM_MELEE_GUARD: 109,
    SALMO_GOTHITE_MELEE_GUARD: 110,
    SALMO_ARCHER: 111,

    // Woodcutting Guild
    ACERNIS_GUILDMASTER : 97,
    ACERNIS_TISHA: 112,
    ACERNIS_STEEL_MELEE_GUARD: 113,
    ACERNIS_NELENITE_MELEE_GUARD: 114,
    ACERNIS_OSMIUM_MELEE_GUARD: 115,
    ACERNIS_GOTHITE_MELEE_GUARD: 116,
    ACERNIS_ARCHER: 117,
    ACERNIS_ELITE_ARCHER : 118,

    // Emperor Invasion Squad
    EMPEROR: 98, 
    EMPIRE_GRAND_SORCEROR: 100,
    EMPIRE_ELITE_SORCEROR: 101,
    EMPIRE_SORCERORS_APPRENTICE: 102,

    // Emperor's General Squad
    EMPIRE_GENERAL: 99, 
    EMPIRE_STEEL_MELEE_GUARD: 91,
    EMPIRE_NELENITE_MELEE_GUARD: 92,
    EMPIRE_GOTHITE_MELEE_GUARD: 93,
    EMPIRE_OSMIUM_MELEE_GUARD: 94,
};

const indexToTier = (index) => {
    return index - 5;
}

const tierToIndex = (tier) => {
    return tier + 5;
}

class ShopUpgrade {
    constructor(shopRefID, name, shopStock) {
        this.name = name;
        this.shopRefID = shopRefID;
        this.shopStock = shopStock;
    }

    isShop(shopRefID) {
        return this.shopRefID == shopRefID;
    }

    getStock(tier) {
        let shop = [];
        let tiersIndex = tierToIndex(tier);
        for (let i = 0; i < this.shopStock.length; ++i) {
            let itemData = this.shopStock[i];
            if (itemData.length == 2 && itemData[1].length > tiersIndex) {
                shop.push([itemData[0], itemData[1][tiersIndex]]);
            }
        }
        return shop;
    }
}

const Guilds = [{
    id: 0,
    name: "Tergaron - Mining Guild",
    tierDetails: [{
        tierID: -5,
        items: [[0, 1000000]],
        description: ' - Shop taxes increased by 100%\n - The emperor has control of the burgundy gem obelisk',
        taxMultiplier: 2,
        guards: [[GuardType.EMPIRE_OSMIUM_MELEE_GUARD, 13], [GuardType.EMPIRE_SORCERORS_APPRENTICE, 3]],
    }, {
        tierID: -4,
        items: [[0, 500000]],
        description: ' - Shop taxes increased by 70%\n - The emperor has control of the burgundy gem obelisk',
        taxMultiplier: 1.7,
        guards: [[GuardType.EMPIRE_GOTHITE_MELEE_GUARD, 11], [GuardType.EMPIRE_SORCERORS_APPRENTICE, 1]],
    }, {
        tierID: -3,
        items: [[0, 200000]],
        description: ' - Shop taxes increased by 45%\n - The emperor has control of the burgundy gem obelisk',
        taxMultiplier: 1.45,
        guards: [[GuardType.EMPIRE_NELENITE_MELEE_GUARD, 9]],
    }, {
        tierID: -2,
        items: [[0, 50000]],
        description: ' - Shop taxes increased by 25%\n - The emperor has control of the burgundy gem obelisk',
        taxMultiplier: 1.25,
        guards: [[GuardType.EMPIRE_STEEL_MELEE_GUARD, 7]],
    }, {
        tierID: -1,
        items: [],
        description: ' - Shop taxes increased by 10%',
        taxMultiplier: 1.1,
        guards: [[GuardType.EMPIRE_STEEL_MELEE_GUARD, 5]],
    }, {
        tierID: 0,
        items: [[0, 100000], [55, 5000], [59, 2000], [9, 100], [63, 20], [56, 2000], [51, 500]],
        description: ' - 3 Steel Guards',
        taxMultiplier: 1,
        guards: [[GuardType.TERAGON_STEEL_MELEE_GUARD, 3]],
    }, {
        tierID: 1,
        items: [[0, 200000], [56, 6000], [60, 2500], [10, 125], [63, 30], [57, 2500], [52, 600]],
        description: ' - 5 Steel Guards\n - Shop stocks increased\n - Shop taxes reduced by 2%',
        taxMultiplier: 0.98,
        guards: [[GuardType.TERAGON_STEEL_MELEE_GUARD, 5], [GuardType.TERAGON_THAKOD, 1]],
    }, {
        tierID: 2,
        items: [[0, 450000], [56, 7250], [57, 7250], [61, 3000], [11, 150], [63, 40], [58, 3000], [53, 700]],
        description: ' - 5 Steel Guards, 2 Range Guards\n - Shop stocks increased\n - Shop taxes reduced by 5%\n - Defensive barricades\n - Access to fast coal rocks',
        taxMultiplier: 0.95,
        guards: [[GuardType.TERAGON_STEEL_MELEE_GUARD, 7], [GuardType.TERAGON_THAKOD, 1], [GuardType.TERAGON_SWORDSMAN, 1], [GuardType.TERAGON_SWORDSMAN_APPRENTICE, 2]],
    }, {
        tierID: 3,
        items: [[0, 900000], [58, 8500], [57, 8500], [62, 4000], [12, 200], [63, 55], [253, 4000], [54, 850]],
        description: ' - 7 Nelenite Guards, 2 Range Guards\n - Shop stocks increased\n - Shop taxes reduced by 10%\n - Defensive barricades\n - Access to fast coal rocks',
        taxMultiplier: 0.9,
        guards: [[GuardType.TERAGON_NELENITE_MELEE_GUARD, 9], [GuardType.TERAGON_THAKOD, 1], [GuardType.TERAGON_SWORDSMAN, 1], [GuardType.TERAGON_SWORDSMAN_APPRENTICE, 3]],
    }, {
        tierID: 4,
        items: [[0, 1450000], [253, 10000], [57, 10000], [255, 5000], [279, 250], [63, 75], [281, 5000], [234, 1000]],
        description: ' - 9 Gothite Guards, 2 Range Guards\n - Shop stocks increased\n - Shop taxes reduced by 16%\n - Additional defensive barricades\n - Access to fast coal rocks\n - Access to gem rocks',
        taxMultiplier: 0.84,
        guards: [[GuardType.TERAGON_GOTHITE_MELEE_GUARD, 11], [GuardType.TERAGON_THAKOD, 1], [GuardType.TERAGON_SWORDSMAN, 1], [GuardType.TERAGON_SWORDSMAN_APPRENTICE, 4]],
    }, {
        tierID: 5,
        items: [],
        description: ' - 11 Osmium Guards, 2 Range Guards\n - Shop stocks increased\n - Shop taxes reduced by 25%\n - Additional defensive barricades\n - Access to fast coal rocks\n - Access to gem rocks',
        taxMultiplier: 0.75,
        guards: [[GuardType.TERAGON_OSMIUM_MELEE_GUARD, 13], [GuardType.TERAGON_THAKOD, 1], [GuardType.TERAGON_SWORDSMAN, 1], [GuardType.TERAGON_SWORDSMAN_APPRENTICE, 5]],
    }],
    emperorSpawnBounds: [
        [new Bounds(78, 322, 81, 326), new Bounds(65, 360, 86, 370), ], 
        [new Bounds(145, 351, 160, 355), new Bounds(71, 351, 80, 356), new Bounds(65, 360, 86, 370), ],
        [new Bounds(22, 324, 26, 327),new Bounds(33, 338, 60, 346), new Bounds(65, 360, 86, 370),] 
    ],
    kingID: GuardType.TERAGON_GUILDMASTER,
    generalID: GuardType.EMPIRE_GENERAL,
    cityBounds: new Bounds(43, 341, 86, 370),
    guildBounds: new Bounds(65, 366, 86, 370),
    guildShops: [
        new ShopUpgrade(12, 'Tergaron General Store', [
            [123, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]],
            [46, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]],
            [1, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]],
            [9, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]],
            [117, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]],
            [63, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]],
            [118, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]],
            [51, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]],
            [513, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]],
            [524, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]],
            [744, [0, 0, 0, 0, 0, 100, 150, 200, 250, 300, 500]],
            [761, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]]
        ]),
        new ShopUpgrade(13, 'Tergaron Metalsmith Store', [
            [63, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]],
            [59, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]],
            [60, [0, 0, 0, 0, 0, 1, 1, 2, 2, 3, 5]]
        ]),
        new ShopUpgrade(14, 'Tergaron Mining Store', [
            [9, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]],
            [10, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]],
            [11, [0, 0, 0, 0, 0, 1, 1, 2, 2, 3, 5]],
            [55, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]],
            [56, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]],
            [57, [0, 0, 0, 0, 0, 1, 1, 2, 2, 3, 5]]
        ]),
    ],
    tier2Baracades: [[71, 362], [74, 362], [75, 361], [76, 361], [77, 362], [80, 362]],
    tier4Baracades: [[75, 333], [76, 333], [137, 349], [137, 350], [137, 351], [137, 352], [26, 329], [27, 329]],
}, {
    id: 1,
    name: "Salmo - Fishing Guild",
    tierDetails: [{
        tierID: -5,
        items: [[0, 1000000]],
        description: ' - Shop taxes increased by 100%\n - The emperor has control of the purple gem obelisk',
        taxMultiplier: 2,
        guards: [[GuardType.EMPIRE_OSMIUM_MELEE_GUARD, 13], [GuardType.EMPIRE_SORCERORS_APPRENTICE, 3]],
    }, {
        tierID: -4,
        items: [[0, 500000]],
        description: ' - Shop taxes increased by 70%\n - The emperor has control of the purple gem obelisk',
        taxMultiplier: 1.7,
        guards: [[GuardType.EMPIRE_GOTHITE_MELEE_GUARD, 11], [GuardType.EMPIRE_SORCERORS_APPRENTICE, 1]],
    }, {
        tierID: -3,
        items: [[0, 200000]],
        description: ' - Shop taxes increased by 45%\n - The emperor has control of the purple gem obelisk',
        taxMultiplier: 1.45,
        guards: [[GuardType.EMPIRE_NELENITE_MELEE_GUARD, 9]],
    }, {
        tierID: -2,
        items: [[0, 50000]],
        description: ' - Shop taxes increased by 25%',
        taxMultiplier: 1.25,
        guards: [[GuardType.EMPIRE_STEEL_MELEE_GUARD, 7]],
    }, {
        tierID: -1,
        items: [],
        description: ' - Shop taxes increased by 10%',
        taxMultiplier: 1.1,
        guards: [[GuardType.EMPIRE_STEEL_MELEE_GUARD, 5]],
    }, {
        tierID: 0,
        items: [[0, 100000], [47, 5000], [51, 2000], [59, 100], [117, 20], [48, 2000], [5, 500]],
        description: ' - 3 Steel Guards\n\n',
        guards: [[GuardType.SALMO_STEEL_MELEE_GUARD, 3]],
    }, {
        tierID: 1,
        items: [[0, 180000], [48, 6000], [52, 2500], [60, 125], [117, 30], [49, 2500], [6, 600]],
        description: ' - 5 Steel Guards\n - Shop stocks increased\n - Shop taxes reduced by 2%',
        taxMultiplier: 0.98,
        guards: [[GuardType.SALMO_STEEL_MELEE_GUARD, 5], [GuardType.SALMO_TUNE, 1], [GuardType.SALMO_ARCHER, 1]],
    }, {
        tierID: 2,
        items: [[0, 400000], [49, 5000], [50, 5000], [53, 2000], [54, 2000], [61, 150], [117, 40], [232, 3000], [7, 700]],
        description: ' - 5 Steel Guards, 2 Range Guards\n - Shop stocks increased\n - Shop taxes reduced by 5%\n - Defensive barricades',
        taxMultiplier: 0.95,
        guards: [[GuardType.SALMO_STEEL_MELEE_GUARD, 7], [GuardType.SALMO_TUNE, 1], [GuardType.SALMO_ARCHER, 2]],
    }, {
        tierID: 3,
        items: [[0, 800000], [50, 7500], [232, 7500], [54, 3500], [234, 3500], [62, 200], [117, 55], [241, 4000], [8, 850]],
        description: ' - 7 Nelenite Guards, 2 Range Guards\n - Shop stocks increased\n - Shop taxes reduced by 10%\n - Defensive barricades\n - Access to crab pools',
        taxMultiplier: 0.9,
        guards: [[GuardType.SALMO_NELENITE_MELEE_GUARD, 9], [GuardType.SALMO_TUNE, 1], [GuardType.SALMO_ARCHER, 3]],
    }, {
        tierID: 4,
        items: [[0, 1250000], [232, 10000], [241, 10000], [234, 5000], [243, 5000], [255, 250], [117, 75], [247, 5000], [315, 1000]],
        description: ' - 9 Gothite Guards, 2 Range Guards\n - Shop stocks increased\n - Shop taxes reduced by 16%\n - Additional defensive barricades\n - Access to octopus pools\n - Access to crab pools',
        taxMultiplier: 0.84,
        guards: [[GuardType.SALMO_GOTHITE_MELEE_GUARD, 11], [GuardType.SALMO_TUNE, 1], [GuardType.SALMO_ARCHER, 4]],
    }, {
        tierID: 5,
        items: [],
        description: ' - 11 Osmium Guards, 2 Range Guards\n - Shop stocks increased\n - Shop taxes reduced by 25%\n - Additional defensive barricades\n - Access to octopus pools\n - Access to crab pools',
        taxMultiplier: 0.75,
        guards: [[GuardType.SALMO_OSMIUM_MELEE_GUARD, 13], [GuardType.SALMO_TUNE, 1], [GuardType.SALMO_ARCHER, 5]],
    }],
    emperorSpawnBounds: [
        [new Bounds(141, 21, 143, 25), new Bounds(141, 10, 154, 11), new Bounds(145, 12, 151, 17)],
        [new Bounds(167, 21, 169, 25), new Bounds(161, 5, 171, 11), new Bounds(141, 10, 154, 11), new Bounds(145, 12, 151, 17)],
        [new Bounds(192, 9, 195, 12), new Bounds(161, 5, 175, 18), new Bounds(145, 12, 151, 17)],
    ],
    kingID: GuardType.SALMO_GUILDMASTER,
    generalID: GuardType.EMPIRE_GENERAL,
    cityBounds: new Bounds(141, 10, 170, 20),
    guildBounds: new Bounds(145, 12, 151, 17),
    guildShops: [
        new ShopUpgrade(15, 'Salmo General Store', [
            [123, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]],
            [46, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]],
            [1, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]],
            [9, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]],
            [117, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]],
            [63, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]],
            [118, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]],
            [51, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]],
            [513, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]],
            [524, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]],
            [744, [0, 0, 0, 0, 0, 100, 150, 200, 250, 300, 500]],
            [761, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]]
        ]),
        new ShopUpgrade(16, 'Salmo Fishing Store', [
            [117, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]],
            [47, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]],
            [48, [0, 0, 0, 0, 0, 1, 1, 2, 2, 3, 5]],
            [49, [0, 0, 0, 0, 0, 1, 1, 2, 2, 3, 5]]
        ]),
        new ShopUpgrade(17, 'Salmo Archery Store', [
            [37, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]],
            [38, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]],
            [39, [0, 0, 0, 0, 0, 1, 1, 2, 2, 3, 5]],
            [68, [0, 0, 0, 0, 0, 50, 100, 200, 500, 1000, 2000]],
            [69, [0, 0, 0, 0, 0, 100, 150, 200, 250, 300, 500]],
            [70, [0, 0, 0, 0, 0, 100, 150, 200, 250, 300, 500]],
            [71, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]],
            [105, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]],
            [106, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]],
            [109, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]],
            [110, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]],
            [113, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]],
            [114, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]]
        ]),
        new ShopUpgrade(18, 'Salmo Alchemy Store', [
            [76, [0, 0, 0, 0, 0, 100, 150, 200, 250, 300, 500]],
            [77, [0, 0, 0, 0, 0, 100, 150, 200, 250, 300, 500]],
            [78, [0, 0, 0, 0, 0, 100, 150, 200, 250, 300, 500]],
            [79, [0, 0, 0, 0, 0, 100, 150, 200, 250, 300, 500]],
            [80, [0, 0, 0, 0, 0, 100, 150, 200, 250, 300, 500]],
            [81, [0, 0, 0, 0, 0, 100, 150, 200, 250, 300, 500]],
            [493, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]],
            [495, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]],
            [494, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]],
            [513, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]],
            [500, [0, 0, 0, 0, 0, 50, 100, 200, 500, 1000, 2000]],
            [501, [0, 0, 0, 0, 0, 50, 100, 200, 500, 1000, 2000]],
            [502, [0, 0, 0, 0, 0, 50, 100, 200, 500, 1000, 2000]],
            [503, [0, 0, 0, 0, 0, 100, 150, 200, 250, 300, 500]],
            [505, [0, 0, 0, 0, 0, 100, 150, 200, 250, 300, 500]],
            [504, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]],
            [507, [0, 0, 0, 0, 0, 100, 150, 200, 250, 300, 500]],
            [506, [0, 0, 0, 0, 0, 20, 20, 20, 25, 30, 100]],
            [508, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]]
        ]),
        new ShopUpgrade(19, 'Salmo Magic Store', [
            [83, [0, 0, 0, 0, 0, 100, 150, 200, 250, 300, 500]],
            [84, [0, 0, 0, 0, 0, 100, 150, 200, 250, 300, 500]],
            [85, [0, 0, 0, 0, 0, 100, 150, 200, 250, 300, 500]],
            [86, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]],
            [93, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]],
            [94, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]],
            [97, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]],
            [98, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]],
            [101, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]],
            [102, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]]
        ]),
    ],
    tier2Barricades: [[148, 13], [149, 13]],
    tier4Barricades: [[142, 18], [177, 16], [177, 17], [177, 18], [167, 18]],
}, {
    id: 2,
    name: "Acernis - Woodcutting Guild",
    emperorSpawnBounds: [
        [new Bounds(332, 100, 338, 105) ,new Bounds(338, 84, 342, 99),new Bounds(331, 47, 351, 55), ],
        [new Bounds(369, 82, 377, 86), new Bounds(338, 84, 342, 99), new Bounds(331, 47, 351, 55), ],
        //[new Bounds(305, 50, 310, 58), new Bounds(315, 78, 324, 82), new Bounds(338, 84, 342, 99), new Bounds(331, 47, 351, 55), ],
    ],
    kingID: GuardType.ACERNIS_GUILDMASTER,
    generalID: GuardType.EMPIRE_GENERAL,
    tierDetails: [{
        tierID: -5,
        items: [[0, 1000000]],
        description: ' - Shop taxes increased by 100%\n - The emperor has control of the red gem obelisk',
        taxMultiplier: 2,
        guards: [[GuardType.EMPIRE_OSMIUM_MELEE_GUARD, 13], [GuardType.EMPIRE_SORCERORS_APPRENTICE, 3]],
    }, {
        tierID: -4,
        items: [[0, 500000]],
        description: ' - Shop taxes increased by 70%\n - The emperor has control of the red gem obelisk',
        taxMultiplier: 1.7,
        guards: [[GuardType.EMPIRE_GOTHITE_MELEE_GUARD, 11], [GuardType.EMPIRE_SORCERORS_APPRENTICE, 1]],
    }, {
        tierID: -3,
        items: [[0, 200000]],
        description: ' - Shop taxes increased by 45%\n - The emperor has control of the red gem obelisk',
        taxMultiplier: 1.45,
        guards: [[GuardType.EMPIRE_NELENITE_MELEE_GUARD, 9]],
    }, {
        tierID: -2,
        items: [[0, 50000]],
        description: ' - Shop taxes increased by 25%\n - The emperor has control of the red gem obelisk',
        taxMultiplier: 1.25,
        guards: [[GuardType.EMPIRE_STEEL_MELEE_GUARD, 7]],
    }, {
        tierID: -1,
        items: [],
        description: ' - Shop taxes increased by 10%\n - The emperor has control of the red gem obelisk',
        taxMultiplier: 1.1,
        guards: [[GuardType.EMPIRE_STEEL_MELEE_GUARD, 5]],
    }, {
        tierID: 0,
        items: [[0, 120000], [5, 5000], [6, 2500], [1, 100], [118, 20], [51, 500]],
        description: ' - 3 Steel Guards\n\n',
        guards: [[GuardType.ACERNIS_STEEL_MELEE_GUARD, 3]],
    }, {
        tierID: 1,
        items: [[0, 250000], [5, 2500], [6, 7500], [7, 4000], [2, 200], [118, 30], [52, 600]],
        description: ' - 5 Steel Guards\n - Shop stocks increased\n - Shop taxes reduced by 2%',
        taxMultiplier: 0.98,
        guards: [[GuardType.ACERNIS_STEEL_MELEE_GUARD, 5], [GuardType.ACERNIS_TISHA, 1]],
    }, {
        tierID: 2,
        items: [[0, 500000], [5, 2500], [6, 4000], [7, 7500], [8, 5500], [3, 300], [118, 40], [53, 700]],
        description: ' - 5 Steel Guards, 2 Range Guards\n - Shop stocks increased\n - Shop taxes reduced by 5%\n - Defensive barricades',
        taxMultiplier: 0.95,
        guards: [[GuardType.ACERNIS_STEEL_MELEE_GUARD, 7], [GuardType.ACERNIS_TISHA, 1], [GuardType.ACERNIS_ELITE_ARCHER, 1], [GuardType.ACERNIS_ARCHER, 2]],
    }, {
        tierID: 3,
        items: [[0, 1000000], [5, 2500], [6, 4000], [7, 5500], [8, 10000], [315, 7500], [4, 400], [118, 55], [54, 850]],
        description: ' - 7 Nelenite Guards, 2 Range Guards\n - Shop stocks increased\n - Shop taxes reduced by 10%\n - Defensive barricades\n - Trees in the guild forest produce more silk',
        taxMultiplier: 0.9,
        guards: [[GuardType.ACERNIS_NELENITE_MELEE_GUARD, 9], [GuardType.ACERNIS_TISHA, 1], [GuardType.ACERNIS_ELITE_ARCHER, 1], [GuardType.ACERNIS_ARCHER, 3]],
    }, {
        tierID: 4,
        items: [[0, 1750000], [5, 2500], [6, 4000], [7, 5500], [8, 7500],  [315, 15000], [317, 10000], [277, 500], [118, 75], [234, 1000]],
        description: ' - 9 Gothite Guards, 2 Range Guards\n - Shop stocks increased\n - Shop taxes reduced by 16%\n - Additional defensive barricades\n - Trees in the guild forest produce more silk',
        taxMultiplier: 0.84,
        guards: [[GuardType.ACERNIS_GOTHITE_MELEE_GUARD, 11], [GuardType.ACERNIS_TISHA, 1], [GuardType.ACERNIS_ELITE_ARCHER, 1], [GuardType.ACERNIS_ARCHER, 4]],
    }, {
        tierID: 5,
        items: [],
        description: ' - 11 Osmium Guards, 2 Range Guards\n - Shop stocks increased\n - Shop taxes reduced by 25%\n - Additional defensive barricades\n - Trees in the guild forest produce extra silk',
        taxMultiplier: 0.75,
        guards: [[GuardType.ACERNIS_OSMIUM_MELEE_GUARD, 13], [GuardType.ACERNIS_TISHA, 1], [GuardType.ACERNIS_ELITE_ARCHER, 1], [GuardType.ACERNIS_ARCHER, 5]],
    }],
    cityBounds: new Bounds(331, 47, 351, 55),
    guildBounds: new Bounds(331, 47, 351, 55),
    guildShops: [
        new ShopUpgrade(20, 'Acernis General Store', [
            [123, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]],
            [46, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]],
            [1, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]],
            [9, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]],
            [117, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]],
            [63, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]],
            [118, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]],
            [51, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]],
            [513, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]],
            [524, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]],
            [744, [0, 0, 0, 0, 0, 100, 150, 200, 250, 300, 500]],
            [761, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]]
        ]),
        new ShopUpgrade(21, 'Acernis Woodcutting Store', [
            [123, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]],
            [1, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]],
            [2, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]],
            [3, 1],
            [5, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]],
            [6, [0, 0, 0, 0, 0, 3, 5, 7, 10, 15, 25]]
        ]),
        new ShopUpgrade(22, 'Acernis Archery Store', [
            [37, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]],
            [38, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]],
            [39, [0, 0, 0, 0, 0, 1, 1, 2, 2, 3, 5]],
            [68, [0, 0, 0, 0, 0, 50, 100, 200, 500, 1000, 2000]],
            [69, [0, 0, 0, 0, 0, 100, 150, 200, 250, 300, 500]],
            [70, [0, 0, 0, 0, 0, 100, 150, 200, 250, 300, 500]],
            [71, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]],
            [105, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]],
            [106, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]],
            [109, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]],
            [110, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]],
            [113, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]],
            [114, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]]
        ]),
        new ShopUpgrade(23, 'Acernis Fletching Store', [
            [123, [0, 0, 0, 0, 0, 3, 5, 10, 15, 20, 30]],
            [5, [0, 0, 0, 0, 0, 3, 5, 10, 15, 20, 30]],
            [6, [0, 0, 0, 0, 0, 3, 5, 10, 15, 20, 30]],
            [7, [0, 0, 0, 0, 0, 3, 5, 10, 15, 20, 30]],
            [8, [0, 0, 0, 0, 0, 0, 3, 5, 10, 15, 20]],
            [74, [0, 0, 0, 0, 0, 10, 15, 20, 25, 30, 50]]
        ]),
    ],
    tier2Barricades: [[329, 49], [329, 50], [340, 56], [341, 56], [342, 56], [353, 49], [353, 50]],
    tier4Barricades: [[340, 86], [341, 86], [342, 86]],
},];


module.exports.GuardType = GuardType;
module.exports.indexToTier = indexToTier;
module.exports.tierToIndex = tierToIndex;
module.exports.Guilds = Guilds;