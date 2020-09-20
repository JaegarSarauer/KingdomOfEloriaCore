const Bounds = require('../def/Bounds');

const GuardType = {
    // Mining Guild
    TERAGON_GUILDMASTER: 95,
    TERAGON_THAKOD: 103,
    TERAGON_STEEL_MELEE_GUARD: 87,
    TERAGON_NELENITE_MELEE_GUARD: 88,
    TERAGON_GOTHITE_MELEE_GUARD: 89,
    TERAGON_OSMIUM_MELEE_GUARD: 90,
    TERAGON_SWORDSMAN: 105,
    TERAGON_SWORDSMAN_APPRENTICE: 104,

    // Fishing Guild
    SALMO_GUILDMASTER: 96,
    SALMO_TUNE: 106,
    SALMO_STEEL_MELEE_GUARD: 107,
    SALMO_NELENITE_MELEE_GUARD: 108,
    SALMO_GOTHITE_MELEE_GUARD: 109,
    SALMO_OSMIUM_MELEE_GUARD: 110,
    SALMO_ARCHER: 111,

    // Woodcutting Guild
    ACERNIS_GUILDMASTER: 97,
    ACERNIS_TISHA: 112,
    ACERNIS_STEEL_MELEE_GUARD: 113,
    ACERNIS_NELENITE_MELEE_GUARD: 114,
    ACERNIS_GOTHITE_MELEE_GUARD: 115,
    ACERNIS_OSMIUM_MELEE_GUARD: 116,
    ACERNIS_ARCHER: 117,
    ACERNIS_ELITE_ARCHER: 118,

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

const ObeliskType = {
    BLUE: 104,
    GREEN: 105,
    PURPLE: 106,
    BURGUNTY: 107,
    RED: 108
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
        items: [[0, 1000]],
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
        description: ' - 7 Steel Guards & 3 Swordsman\n - Shop stocks increased\n - Shop taxes reduced by 5%\n - Defensive barricades\n - Access to fast coal rocks',
        taxMultiplier: 0.95,
        guards: [[GuardType.TERAGON_STEEL_MELEE_GUARD, 7], [GuardType.TERAGON_THAKOD, 1], [GuardType.TERAGON_SWORDSMAN, 1], [GuardType.TERAGON_SWORDSMAN_APPRENTICE, 2]],
    }, {
        tierID: 3,
        items: [[0, 900000], [58, 8500], [57, 8500], [62, 4000], [12, 200], [63, 55], [253, 4000], [54, 850]],
        description: ' - 9 Nelenite Guards & 4 Swordsman\n - Shop stocks increased\n - Shop taxes reduced by 10%\n - Defensive barricades\n - Access to fast coal rocks',
        taxMultiplier: 0.9,
        guards: [[GuardType.TERAGON_NELENITE_MELEE_GUARD, 9], [GuardType.TERAGON_THAKOD, 1], [GuardType.TERAGON_SWORDSMAN, 1], [GuardType.TERAGON_SWORDSMAN_APPRENTICE, 3]],
    }, {
        tierID: 4,
        items: [[0, 1450000], [253, 10000], [57, 10000], [255, 5000], [279, 250], [63, 75], [281, 5000], [234, 1000]],
        description: ' - 11 Gothite Guards & 5 Swordsman\n - Shop stocks increased\n - Shop taxes reduced by 16%\n - Additional defensive barricades\n - Access to fast coal rocks\n - Access to gem rocks',
        taxMultiplier: 0.84,
        guards: [[GuardType.TERAGON_GOTHITE_MELEE_GUARD, 11], [GuardType.TERAGON_THAKOD, 1], [GuardType.TERAGON_SWORDSMAN, 1], [GuardType.TERAGON_SWORDSMAN_APPRENTICE, 4]],
    }, {
        tierID: 5,
        items: [],
        description: ' - 13 Osmium Guards & 6 Swordsman\n - Shop stocks increased\n - Shop taxes reduced by 25%\n - Additional defensive barricades\n - Access to fast coal rocks\n - Access to gem rocks\n - Adventurers will automatically use the next mining camp',
        taxMultiplier: 0.75,
        guards: [[GuardType.TERAGON_OSMIUM_MELEE_GUARD, 13], [GuardType.TERAGON_THAKOD, 1], [GuardType.TERAGON_SWORDSMAN, 1], [GuardType.TERAGON_SWORDSMAN_APPRENTICE, 5]],
    }],
    emperorSpawnBounds: [
        [new Bounds.Bounds(78, 322, 81, 326), new Bounds.Bounds(65, 360, 86, 370),],
        [new Bounds.Bounds(145, 351, 160, 355), new Bounds.Bounds(71, 351, 80, 356), new Bounds.Bounds(65, 360, 86, 370),],
        [new Bounds.Bounds(22, 324, 26, 327), new Bounds.Bounds(33, 338, 60, 346), new Bounds.Bounds(65, 360, 86, 370),]
    ],
    kingID: GuardType.TERAGON_GUILDMASTER,
    generalID: GuardType.EMPIRE_GENERAL,
    obelisk: {
        id: ObeliskType.BURGUNTY,
        x: 110,
        y: 350,
        mapID: 1
    },
    tourID: 0,
    cityBounds: new Bounds.Bounds(43, 341, 86, 370),
    guildBounds: new Bounds.Bounds(65, 366, 86, 370),
    guildShops: [
        new ShopUpgrade(12, 'Tergaron General Store', [
            [123, [1, 2, 3, 5, 8, 10, 15, 20, 25, 30, 50]],
            [46, [100, 200, 300, 500, 800, 2000, 3000, 4000, 5000, 6500, 10000]],
            [1, [1, 2, 3, 5, 8, 10, 15, 20, 25, 30, 50]],
            [9, [1, 2, 3, 5, 8, 10, 15, 20, 25, 30, 50]],
            [117, [1, 2, 3, 5, 8, 10, 15, 20, 25, 30, 50]],
            [63, [1, 2, 3, 5, 8, 10, 15, 20, 25, 30, 50]],
            [118, [1, 2, 3, 5, 8, 10, 15, 20, 25, 30, 50]],
            [51, [1, 2, 3, 5, 8, 10, 15, 20, 25, 30, 50]],
            [513, [1, 2, 3, 5, 8, 10, 15, 20, 25, 30, 50]],
            [524, [1, 2, 3, 5, 8, 10, 15, 20, 25, 30, 50]],
            [744, [10, 20, 30, 50, 80, 100, 150, 200, 250, 300, 500]],
            [761, [1, 2, 3, 5, 8, 10, 15, 20, 25, 30, 50]],
            [52, [0, 0, 0, 0, 0, 0, 0, 0, 5, 10, 20]],
            [53, [0, 0, 0, 0, 0, 0, 0, 0, 5, 10, 20]],
            [54, [0, 0, 0, 0, 0, 0, 0, 0, 1, 5, 10]],
            [2, [0, 0, 0, 0, 0, 0, 0, 0, 2, 5, 10]],
            [10, [0, 0, 0, 0, 0, 0, 0, 0, 2, 5, 10]],
            [37, [0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3]],
        ]),
        new ShopUpgrade(13, 'Tergaron Metalsmith Store', [
            [63, [1, 2, 3, 5, 8, 10, 15, 20, 25, 30, 50]],
            [59, [1, 2, 3, 5, 8, 10, 15, 20, 25, 30, 50]],
            [60, [0, 0, 0, 0, 1, 1, 5, 10, 15, 20, 25]],
            [61, [0, 0, 0, 0, 0, 0, 0, 1, 2, 5, 10]],
            [672, [0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 5]],
            [62, [0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 5]],
        ]),
        new ShopUpgrade(14, 'Tergaron Mining Store', [
            [9, [1, 2, 3, 5, 8, 10, 15, 20, 25, 30, 50]],
            [10, [1, 2, 3, 5, 8, 10, 15, 20, 25, 30, 50]],
            [11, [0, 0, 0, 0, 0, 1, 5, 10, 15, 20, 25]],
            [12, [0, 0, 0, 0, 0, 0, 0, 0, 1, 5, 10]],
            [55, [1, 2, 3, 5, 8, 10, 15, 20, 25, 30, 50]],
            [56, [1, 2, 3, 5, 8, 10, 15, 20, 25, 30, 50]],
            [57, [0, 0, 0, 0, 1, 1, 5, 10, 15, 20, 25]],
            [75, [0, 0, 0, 0, 0, 0, 0, 10, 20, 30, 50]],
            [58, [0, 0, 0, 0, 0, 0, 0, 1, 5, 10, 20]],
        ]),
    ],
    tier2Barricades: [[71, 362], [74, 362], [75, 361], [76, 361], [77, 362], [80, 362]],
    tier4Barricades: [[75, 333], [76, 333], [137, 349], [137, 350], [137, 351], [137, 352], [26, 329], [27, 329]],
    skillID: 10,
    quest: {
        entrance_exam: {
            id: 2,
            itemAmount: 8,
            camp : 21,
            dialogs: {
                EXAM_EXPLAINED: 14,
                EXAM_REEXPLAINED: 15,
                EXAM_COMPLETE: 16,
                PASSED_EXAM: 17,
                TOUR: 18,
                DONATE_TO_COMPLETE: 19,
                INVITE_TO_START_QUEST: 85,
                LEVEL_REQUIREMENT_NOT_MET : 89,
            },
            items: {
                tool: 9,
                resourceID: 55,
                notedResourceID: 184,
            },
            location: {
                x: 27,
                y: 170,
                mapID: 2,
            },
        },
    },
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
        items: [[0, 1000]],
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
        description: ' - 5 Steel Guards & 1 Range Guard\n - Shop stocks increased\n - Shop taxes reduced by 2%',
        taxMultiplier: 0.98,
        guards: [[GuardType.SALMO_STEEL_MELEE_GUARD, 5], [GuardType.SALMO_TUNE, 1], [GuardType.SALMO_ARCHER, 1]],
    }, {
        tierID: 2,
        items: [[0, 400000], [49, 5000], [50, 5000], [53, 2000], [54, 2000], [61, 150], [117, 40], [232, 3000], [7, 700]],
        description: ' - 7 Steel Guards & 2 Range Guards\n - Shop stocks increased\n - Shop taxes reduced by 5%\n - Defensive barricades',
        taxMultiplier: 0.95,
        guards: [[GuardType.SALMO_STEEL_MELEE_GUARD, 7], [GuardType.SALMO_TUNE, 1], [GuardType.SALMO_ARCHER, 2]],
    }, {
        tierID: 3,
        items: [[0, 800000], [50, 7500], [232, 7500], [54, 3500], [234, 3500], [62, 200], [117, 55], [241, 4000], [8, 850]],
        description: ' - 9 Nelenite Guards & 3 Range Guards\n - Shop stocks increased\n - Shop taxes reduced by 10%\n - Defensive barricades\n - Access to crab pools',
        taxMultiplier: 0.9,
        guards: [[GuardType.SALMO_NELENITE_MELEE_GUARD, 9], [GuardType.SALMO_TUNE, 1], [GuardType.SALMO_ARCHER, 3]],
    }, {
        tierID: 4,
        items: [[0, 1250000], [232, 10000], [241, 10000], [234, 5000], [243, 5000], [255, 250], [117, 75], [247, 5000], [315, 1000]],
        description: ' - 11 Gothite Guards & 4 Range Guards\n - Shop stocks increased\n - Shop taxes reduced by 16%\n - Additional defensive barricades\n - Access to octopus pools\n - Access to crab pools',
        taxMultiplier: 0.84,
        guards: [[GuardType.SALMO_GOTHITE_MELEE_GUARD, 11], [GuardType.SALMO_TUNE, 1], [GuardType.SALMO_ARCHER, 4]],
    }, {
        tierID: 5,
        items: [],
        description: ' - 13 Osmium Guards & 5 Range Guards\n - Shop stocks increased\n - Shop taxes reduced by 25%\n - Additional defensive barricades\n - Access to octopus pools\n - Access to crab pools\n - Adventurers will automatically use the next fishing camp',
        taxMultiplier: 0.75,
        guards: [[GuardType.SALMO_OSMIUM_MELEE_GUARD, 13], [GuardType.SALMO_TUNE, 1], [GuardType.SALMO_ARCHER, 5]],
    }],
    emperorSpawnBounds: [
        [new Bounds.Bounds(141, 21, 143, 25), new Bounds.Bounds(141, 10, 154, 11), new Bounds.Bounds(145, 12, 152, 17)],
        [new Bounds.Bounds(167, 21, 169, 25), new Bounds.Bounds(161, 5, 171, 11), new Bounds.Bounds(141, 10, 154, 11), new Bounds.Bounds(145, 12, 152, 17)],
        [new Bounds.Bounds(192, 9, 195, 12), new Bounds.Bounds(161, 5, 175, 18), new Bounds.Bounds(145, 12, 152, 17)],
    ],
    kingID: GuardType.SALMO_GUILDMASTER,
    generalID: GuardType.EMPIRE_GENERAL,
    obelisk: {
        id: ObeliskType.PURPLE,
        x: 119,
        y: 8,
        mapID: 1
    },
    tourID: 1,
    cityBounds: new Bounds.Bounds(141, 10, 170, 20),
    guildBounds: new Bounds.Bounds(145, 12, 151, 17),
    guildShops: [
        new ShopUpgrade(16, 'Salmo Fishing Store', [
            [117, [1, 2, 3, 5, 8, 10, 20, 30, 45, 70, 100]],
            [47, [1, 2, 3, 5, 8, 10, 15, 20, 25, 30, 50]],
            [48, [0, 1, 2, 3, 4, 5, 10, 15, 20, 25, 30]],
            [49, [0, 0, 0, 1, 1, 1, 2, 5, 8, 13, 20]],
            [50, [0, 0, 0, 0, 0, 0, 2, 4, 6, 8, 10]],
            [232, [0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 5]],
            [241, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]],
        ]),
        new ShopUpgrade(17, 'Salmo Archery Store', [
            [37, [1, 2, 3, 5, 8, 10, 15, 20, 25, 30, 50]],
            [38, [0, 1, 2, 3, 4, 5, 10, 15, 20, 25, 30]],
            [39, [0, 0, 0, 0, 0, 1, 1, 2, 2, 3, 5]],
            [68, [50, 100, 150, 250, 400, 500, 750, 1000, 1500, 2000, 3000]],
            [69, [10, 20, 30, 50, 80, 100, 150, 200, 250, 300, 500]],
            [70, [10, 20, 30, 50, 80, 50, 75, 100, 150, 200, 250]],
            [71, [1, 2, 3, 5, 8, 10, 15, 20, 25, 30, 50]],
            [105, [1, 2, 3, 5, 8, 10, 15, 20, 25, 30, 50]],
            [106, [1, 2, 3, 5, 8, 10, 15, 20, 25, 30, 50]],
            [109, [1, 2, 3, 5, 8, 10, 15, 20, 25, 30, 50]],
            [110, [1, 2, 3, 5, 8, 10, 15, 20, 25, 30, 50]],
            [113, [1, 2, 3, 5, 8, 10, 15, 20, 25, 30, 50]],
            [114, [1, 2, 3, 5, 8, 10, 15, 20, 25, 30, 50]],
            [107, [0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 5]],
            [111, [0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 5]],
            [115, [0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 5]],
            [40, [0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 5]],
            [108, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]],
            [112, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]],
            [116, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]],
        ]),
        new ShopUpgrade(18, 'Salmo Alchemy Store', [
            [76, [10, 20, 30, 50, 80, 100, 150, 200, 250, 300, 500]],
            [77, [10, 20, 30, 50, 80, 100, 150, 200, 250, 300, 500]],
            [78, [50, 100, 150, 250, 400, 500, 750, 1000, 1500, 2000, 3000]],
            [79, [10, 50, 100, 200, 275, 350, 400, 500, 650, 800, 1000]],
            [80, [0, 40, 80, 120, 160, 200, 250, 325, 425, 550, 700]],
            [81, [0, 10, 25, 50, 75, 100, 150, 200, 250, 300, 500]],
            [493, [0, 5, 20, 30, 40, 50, 80, 120, 180, 250, 400]],
            [495, [0, 5, 20, 30, 40, 50, 80, 120, 180, 250, 400]],
            [494, [0, 2, 5, 10, 15, 20, 30, 40, 50, 75, 100]],
            [513, [1, 2, 3, 5, 8, 10, 15, 20, 25, 30, 50]],
            [500, [100, 200, 400, 600, 800, 1000, 1500, 2000, 2500, 3000, 5000]],
            [501, [75, 150, 250, 400, 500, 750, 1000, 1500, 2000, 2750, 4000]],
            [502, [50, 100, 150, 250, 400, 500, 750, 1000, 1500, 2000, 3000]],
            [503, [25, 50, 100, 150, 200, 250, 350, 500, 750, 1000, 2000]],
            [505, [10, 20, 30, 50, 80, 100, 150, 200, 250, 300, 500]],
            [504, [0, 1, 2, 3, 4, 5, 10, 15, 20, 25, 30]],
            [507, [10, 20, 30, 50, 80, 100, 150, 200, 250, 300, 500]],
            [506, [0, 5, 20, 30, 40, 50, 80, 120, 180, 250, 400]],
            [508, [1, 2, 3, 5, 8, 10, 15, 20, 25, 30, 50]]
        ]),
        new ShopUpgrade(19, 'Salmo Magic Store', [
            [83, [50, 100, 150, 250, 400, 500, 750, 1000, 1500, 2000, 3000]],
            [84, [25, 50, 100, 150, 200, 250, 350, 500, 750, 1000, 2000]],
            [85, [10, 20, 30, 50, 80, 100, 150, 200, 250, 300, 500]],
            [86, [0, 5, 20, 30, 40, 50, 80, 120, 180, 250, 400]],
            [93, [1, 2, 3, 5, 8, 10, 15, 20, 25, 30, 50]],
            [94, [0, 1, 2, 3, 4, 5, 10, 15, 20, 25, 30]],
            [97, [1, 2, 3, 5, 8, 10, 15, 20, 25, 30, 50]],
            [98, [0, 1, 2, 3, 4, 5, 10, 15, 20, 25, 30]],
            [101, [1, 2, 3, 5, 8, 10, 15, 20, 25, 30, 50]],
            [102, [0, 1, 2, 3, 4, 5, 10, 15, 20, 25, 30]],
            [702, [0, 0, 0, 0, 0, 0, 10, 20, 50, 100, 250]],
            [703, [0, 0, 0, 0, 0, 0, 10, 20, 50, 100, 250]],
            [704, [0, 0, 0, 0, 0, 0, 0, 10, 20, 50, 100]],
            [705, [0, 0, 0, 0, 0, 0, 0, 0, 10, 20, 50]],
            [95, [0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 5]],
            [99, [0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 5]],
            [103, [0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 5]],
            [127, [0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 5]],
            [96, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]],
            [100, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]],
            [104, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]],
        ]),
    ],
    tier2Barricades: [[148, 13], [149, 13]],
    tier4Barricades: [[142, 18], [177, 16], [177, 17], [177, 18], [167, 18]],
    skillID: 12,
    quest: {
        entrance_exam: {
            id: 3,
            itemAmount: 8,
            camp : 20,
            dialogs: {
                EXAM_EXPLAINED: 73,
                EXAM_REEXPLAINED: 74,
                EXAM_COMPLETE: 75,
                PASSED_EXAM: 76,
                TOUR: 77,
                DONATE_TO_COMPLETE: 78,
                INVITE_TO_START_QUEST: 86,
                LEVEL_REQUIREMENT_NOT_MET : 90,
            },
            items: {
                tool: 117,
                resourceID: 47,
                notedResourceID: 176,
            },
            location: {
                x: 26,
                y: 22,
                mapID: 2,
            },
        },
    },
}, {
    id: 2,
    name: "Acernis - Woodcutting Guild",
    emperorSpawnBounds: [
        [new Bounds.Bounds(332, 100, 338, 105), new Bounds.Bounds(338, 84, 342, 99), new Bounds.Bounds(331, 47, 351, 55),],
        [new Bounds.Bounds(369, 82, 377, 86), new Bounds.Bounds(338, 84, 342, 99), new Bounds.Bounds(331, 47, 351, 55),],
        //[new Bounds.Bounds(305, 50, 310, 58), new Bounds.Bounds(315, 78, 324, 82), new Bounds.Bounds(338, 84, 342, 99), new Bounds.Bounds(331, 47, 351, 55), ],
    ],
    kingID: GuardType.ACERNIS_GUILDMASTER,
    generalID: GuardType.EMPIRE_GENERAL,
    obelisk: {
        id: ObeliskType.RED,
        x: 332,
        y: 23,
        mapID: 0
    },
    tourID: 2,
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
        items: [[0, 1000]],
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
        description: ' - 7 Steel Guards & 3 Range Guards\n - Shop stocks increased\n - Shop taxes reduced by 5%\n - Defensive barricades',
        taxMultiplier: 0.95,
        guards: [[GuardType.ACERNIS_STEEL_MELEE_GUARD, 7], [GuardType.ACERNIS_TISHA, 1], [GuardType.ACERNIS_ELITE_ARCHER, 1], [GuardType.ACERNIS_ARCHER, 2]],
    }, {
        tierID: 3,
        items: [[0, 1000000], [5, 2500], [6, 4000], [7, 5500], [8, 10000], [315, 7500], [4, 400], [118, 55], [54, 850]],
        description: ' - 9 Nelenite Guards & 4 Range Guards\n - Shop stocks increased\n - Shop taxes reduced by 10%\n - Defensive barricades\n - Trees in the guild forest produce more silk',
        taxMultiplier: 0.9,
        guards: [[GuardType.ACERNIS_NELENITE_MELEE_GUARD, 9], [GuardType.ACERNIS_TISHA, 1], [GuardType.ACERNIS_ELITE_ARCHER, 1], [GuardType.ACERNIS_ARCHER, 3]],
    }, {
        tierID: 4,
        items: [[0, 1750000], [5, 2500], [6, 4000], [7, 5500], [8, 7500], [315, 15000], [317, 10000], [277, 500], [118, 75], [234, 1000]],
        description: ' - 11 Gothite Guards & 5 Range Guards\n - Shop stocks increased\n - Shop taxes reduced by 16%\n - Additional defensive barricades\n - Trees in the guild forest produce more silk',
        taxMultiplier: 0.84,
        guards: [[GuardType.ACERNIS_GOTHITE_MELEE_GUARD, 11], [GuardType.ACERNIS_TISHA, 1], [GuardType.ACERNIS_ELITE_ARCHER, 1], [GuardType.ACERNIS_ARCHER, 4]],
    }, {
        tierID: 5,
        items: [],
        description: ' - 13 Osmium Guards & 6 Range Guards\n - Shop stocks increased\n - Shop taxes reduced by 25%\n - Additional defensive barricades\n - Trees in the guild forest produce extra silk\n - Adventurers will automatically use the next woodcutting camp',
        taxMultiplier: 0.75,
        guards: [[GuardType.ACERNIS_OSMIUM_MELEE_GUARD, 13], [GuardType.ACERNIS_TISHA, 1], [GuardType.ACERNIS_ELITE_ARCHER, 1], [GuardType.ACERNIS_ARCHER, 5]],
    }],
    cityBounds: new Bounds.Bounds(331, 47, 351, 55),
    guildBounds: new Bounds.Bounds(331, 47, 351, 55),
    guildShops: [
        new ShopUpgrade(20, 'Acernis General Store', [
            [123, [1, 2, 3, 5, 8, 10, 15, 20, 25, 30, 50]],
            [46, [100, 200, 300, 500, 800, 2000, 3000, 4000, 5000, 6500, 10000]],
            [1, [1, 2, 3, 5, 8, 10, 15, 20, 25, 30, 50]],
            [9, [1, 2, 3, 5, 8, 10, 15, 20, 25, 30, 50]],
            [117, [1, 2, 3, 5, 8, 10, 15, 20, 25, 30, 50]],
            [63, [1, 2, 3, 5, 8, 10, 15, 20, 25, 30, 50]],
            [118, [1, 2, 3, 5, 8, 10, 15, 20, 25, 30, 50]],
            [51, [1, 2, 3, 5, 8, 10, 15, 20, 25, 30, 50]],
            [513, [1, 2, 3, 5, 8, 10, 15, 20, 25, 30, 50]],
            [524, [1, 2, 3, 5, 8, 10, 15, 20, 25, 30, 50]],
            [744, [10, 20, 30, 50, 80, 100, 150, 200, 250, 300, 500]],
            [761, [1, 2, 3, 5, 8, 10, 15, 20, 25, 30, 50]],
            [52, [0, 0, 0, 0, 0, 0, 0, 0, 5, 10, 20]],
            [53, [0, 0, 0, 0, 0, 0, 0, 0, 5, 10, 20]],
            [54, [0, 0, 0, 0, 0, 0, 0, 0, 1, 5, 10]],
            [2, [0, 0, 0, 0, 0, 0, 0, 0, 2, 5, 10]],
            [10, [0, 0, 0, 0, 0, 0, 0, 0, 2, 5, 10]],
            [37, [0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3]],
        ]),
        new ShopUpgrade(21, 'Acernis Woodcutting Store', [
            [123, [1, 2, 3, 5, 8, 10, 15, 20, 25, 30, 50]],
            [1, [1, 2, 3, 5, 8, 10, 15, 20, 25, 30, 50]],
            [2, [0, 1, 2, 3, 4, 5, 10, 15, 20, 25, 30]],
            [3, [0, 0, 0, 0, 0, 1, 1, 2, 2, 3, 5]],
            [5, [0, 2, 5, 10, 15, 20, 30, 40, 50, 75, 100]],
            [6, [0, 1, 2, 2, 4, 6, 12, 20, 30, 42, 60]],
            [46, [0, 0, 0, 0, 0, 0, 0, 100, 250, 500, 1000]],
            [7, [0, 0, 0, 0, 0, 0, 0, 2, 6, 14, 25]],
            [4, [0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3]],
            [8, [0, 0, 0, 0, 0, 0, 0, 0, 2, 5, 10]],
        ]),
        new ShopUpgrade(22, 'Acernis Archery Store', [
            [37, [1, 2, 3, 5, 8, 10, 15, 20, 25, 30, 50]],
            [38, [0, 1, 2, 3, 4, 5, 10, 15, 20, 25, 30]],
            [39, [0, 0, 0, 0, 0, 1, 1, 2, 2, 3, 5]],
            [68, [50, 100, 150, 250, 400, 500, 750, 1000, 1500, 2000, 3000]],
            [69, [10, 20, 30, 50, 80, 100, 150, 200, 250, 300, 500]],
            [70, [10, 20, 30, 50, 80, 50, 75, 100, 150, 200, 250]],
            [71, [1, 2, 3, 5, 8, 10, 15, 20, 25, 30, 50]],
            [105, [1, 2, 3, 5, 8, 10, 15, 20, 25, 30, 50]],
            [106, [1, 2, 3, 5, 8, 10, 15, 20, 25, 30, 50]],
            [109, [1, 2, 3, 5, 8, 10, 15, 20, 25, 30, 50]],
            [110, [1, 2, 3, 5, 8, 10, 15, 20, 25, 30, 50]],
            [113, [1, 2, 3, 5, 8, 10, 15, 20, 25, 30, 50]],
            [114, [1, 2, 3, 5, 8, 10, 15, 20, 25, 30, 50]],
            [107, [0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 5]],
            [111, [0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 5]],
            [115, [0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 5]],
            [40, [0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 5]],
            [108, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]],
            [112, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]],
            [116, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]],
        ]),
        new ShopUpgrade(23, 'Acernis Fletching Store', [
            [123, [10, 20, 30, 50, 80, 100, 150, 200, 250, 300, 500]],
            [5, [0, 2, 5, 10, 15, 20, 30, 40, 50, 75, 100]],
            [6, [1, 2, 3, 5, 8, 10, 15, 20, 25, 30, 50]],
            [7, [0, 1, 2, 3, 4, 5, 10, 15, 20, 25, 30]],
            [8, [0, 0, 0, 0, 0, 0, 1, 2, 2, 3, 5]],
            [73, [10, 20, 30, 50, 80, 100, 150, 200, 250, 300, 500]],
            [74, [10, 20, 30, 50, 80, 100, 150, 200, 250, 300, 500]],
        ]),
    ],
    tier2Barricades: [[329, 49], [329, 50], [340, 56], [341, 56], [342, 56], [353, 49], [353, 50]],
    tier4Barricades: [[340, 86], [341, 86], [342, 86]],
    skillID: 9,
    quest: {
        entrance_exam: {
            id: 4,
            itemAmount: 8,
            camp : 16,
            dialogs: {
                EXAM_EXPLAINED: 79,
                EXAM_REEXPLAINED: 80,
                EXAM_COMPLETE: 81,
                PASSED_EXAM: 82,
                TOUR: 83,
                DONATE_TO_COMPLETE: 84,
                INVITE_TO_START_QUEST: 87,
                LEVEL_REQUIREMENT_NOT_MET : 91,
            },
            items: {
                tool: 1,
                resourceID: 5,
                notedResourceID: 135,
            },
            location: {
                x: 26,
                y: 118,
                mapID: 2,
            },
        },
    },

},];


module.exports.GuardType = GuardType;
module.exports.indexToTier = indexToTier;
module.exports.tierToIndex = tierToIndex;
module.exports.Guilds = Guilds;