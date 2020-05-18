const EssenceCatalog = require('./Essence').EssenceCatalog;

module.exports.Enchantment = [{
    id: 0,
    name: 'Fortify Melee Focus',
    equipmentStats: [1,0,0,0,0,0,0,0,0],
    gemBonuses: [0.3, 0.3, 0.4, 0.7, 0.5, 0.6, 0.8, 0.8, 0.9, 1, 1.1],
    enchantCost: 300,
    consumable: false,
}, {
    id: 1,
    name: 'Fortify Melee Power',
    equipmentStats: [0,1,0,0,0,0,0,0,0],
    gemBonuses: [0.1, 0.2, 0.3, 0.3, 0.7, 0.4, 0.5, 0.8, 1.1, 1.8, 0.9],
    enchantCost: 350,
    consumable: false,
}, {
    id: 2,
    name: 'Fortify Melee Defense',
    equipmentStats: [0,0,1,0,0,0,0,0,0],
    gemBonuses: [0.6, 0.3, 0.3, 0.3, 0.5, 0.7, 0.7, 0.8, 0.9, 1, 2],
    enchantCost: 250,
    consumable: false,
}, {
    id: 3,
    name: 'Fortify Ranged Focus',
    equipmentStats: [0,0,0,1,0,0,0,0,0],
    gemBonuses: [0.2, 0.3, 0.8, 0.5, 0.6, 0.7, 0.8, 0.9, 0.8, 1, 1.2],
    enchantCost: 200,
    consumable: false,
}, {
    id: 4,
    name: 'Fortify Ranged Power',
    equipmentStats: [0,0,0,0,1,0,0,0,0],
    gemBonuses: [0.3, 0.3, 0.5, 0.4, 0.5, 0.6, 0.7, 1.6, 0.8, 0.9, 1.3],
    enchantCost: 250,
    consumable: false,
}, {
    id: 5,
    name: 'Fortify Ranged Defense',
    equipmentStats: [0,0,0,0,0,1,0,0,0],
    gemBonuses: [0.2, 0.4, 0.3, 0.4, 0.6, 1.2, 0.7, 0.7, 0.9, 1.1, 1.2],
    enchantCost: 150,
    consumable: false,
}, {
    id: 6,
    name: 'Fortify Magic Focus',
    equipmentStats: [0,0,0,0,0,0,1,0,0],
    gemBonuses: [0.1, 0.7, 0.3, 0.5, 0.3, 1.2, 0.7, 0.7, 1.3, 1.4, 0.8],
    enchantCost: 250,
    consumable: false,
}, {
    id: 7,
    name: 'Fortify Magic Power',
    equipmentStats: [0,0,0,0,0,0,0,1,0],
    gemBonuses: [0.2, 0.2, 0.6, 0.1, 0.6, 1.2, 0.7, 0.6, 0.9, 1.1, 1.7],
    enchantCost: 300,
    consumable: false,
}, {
    id: 8,
    name: 'Fortify Magic Defense',
    equipmentStats: [0,0,0,0,0,0,0,0,1],
    gemBonuses: [0.7, 0.2, 0.3, 0.4, 0.6, 0.8, 0.4, 0.5, 1.6, 1.1, 1.2],
    enchantCost: 200,
    consumable: false,
}, {
    id: 9,
    name: 'Goblin Camp Teleport',
    gemBonuses: [1, 0.8, 0.7, 1.4, 0.6, 0.8, 0.7, 0.9, 1.3, 1.5, 1.6],
    enchantCost: 20,
    consumable: true,
    actions: [{
        id: 0,
        inventoryID: 37,
        equipmentID: 1,
        actionInterval: 0,
        steps: [
            [buildStep(StepType.SEND_CLIENT_MESSAGE, { params: ['You rub the gem and begin the teleport...'] }),
            buildStep(StepType.IS_TIMER_EXPIRED, { params: [11] }),
            buildStep(StepType.TELEPORT, { params: [0, 30, 34, 33, 37, 3] }),
            buildStep(StepType.USE_ENCHANTMENT_CHARGE, { params: [9, 1] })]
        ],
    }],
}, {
    id: 10,
    name: 'Volcano Teleport',
    gemBonuses: [0.4, 0.6, 0.7, 0.2, 2, 1.4, 0.7, 1, 1.9, 1.4, 1.2],
    enchantCost: 30,
    consumable: true,
    actions: [{
        id: 0,
        inventoryID: 37,
        equipmentID: 1,
        actionInterval: 0,
        steps: [
            [buildStep(StepType.SEND_CLIENT_MESSAGE, { params: ['You rub the gem and begin the teleport...'] }),
            buildStep(StepType.IS_TIMER_EXPIRED, { params: [11] }),
            buildStep(StepType.TELEPORT, { params: [0, 30, 34, 33, 37, 3] }),
            buildStep(StepType.USE_ENCHANTMENT_CHARGE, { params: [10, 1] })]
        ],
    }],
}, {
    id: 11,
    name: 'Wizard Tower Teleport',
    gemBonuses: [0.2, 0.6, 0.4, 0.4, 0, 0.9, 1.9, 1, 1.4, 0.9, 2.2],
    enchantCost: 35,
    consumable: true,
    actions: [{
        id: 0,
        inventoryID: 37,
        equipmentID: 1,
        actionInterval: 0,
        steps: [
            [buildStep(StepType.SEND_CLIENT_MESSAGE, { params: ['You rub the gem and begin the teleport...'] }),
            buildStep(StepType.IS_TIMER_EXPIRED, { params: [11] }),
            buildStep(StepType.TELEPORT, { params: [0, 30, 34, 33, 37, 3] }),
            buildStep(StepType.USE_ENCHANTMENT_CHARGE, { params: [11, 1] })]
        ],
    }],
}, {
    id: 12,
    name: 'Item Collection',
    enchantCost: 0.03,
    consumable: true,
    steps: [
        [buildStep(StepType.SEND_CLIENT_MESSAGE, { params: ['You rub the gem and begin the teleport...'] }),
        buildStep(StepType.TELEPORT, { params: [0, 30, 34, 33, 37, 3] })]
    ],
}, {
    id: 13,
    name: 'Party Room Teleport',
    gemBonuses: [1.3, 1.1, 0.9, 0.8, 0.9, 0.9, 0.9, 1, 1.2, 1.6, 2.1],
    enchantCost: 15,
    consumable: true,
    actions: [{
        id: 0,
        inventoryID: 37,
        equipmentID: 1,
        actionInterval: 0,
        steps: [
            [buildStep(StepType.SEND_CLIENT_MESSAGE, { params: ['You rub the gem and begin the teleport...'] }),
            buildStep(StepType.IS_TIMER_EXPIRED, { params: [11] }),
            buildStep(StepType.TELEPORT, { params: [0, 30, 34, 33, 37, 3] }),
            buildStep(StepType.USE_ENCHANTMENT_CHARGE, { params: [13, 1] })]
        ],
    }],
}, {
    id: 14,
    name: 'Patreon Palace Teleport',
    gemBonuses: [1.3, 1.2, 1.1, 1.2, 1.3, 1, 1, 1, 1.2, 1.6, 2.1],
    enchantCost: 20,
    consumable: true,
    actions: [{
        id: 0,
        inventoryID: 37,
        equipmentID: 1,
        actionInterval: 0,
        steps: [
            [buildStep(StepType.SEND_CLIENT_MESSAGE, { params: ['You rub the gem and begin the teleport...'] }),
            buildStep(StepType.IS_TIMER_EXPIRED, { params: [11] }),
            buildStep(StepType.TELEPORT, { params: [0, 30, 34, 33, 37, 3] }),
            buildStep(StepType.USE_ENCHANTMENT_CHARGE, { params: [14, 1] })]
        ],
    }],
}];