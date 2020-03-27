const EssenceCatalog = require('./Essence').EssenceCatalog;

const SpellType = {
    COMBAT: 0,      // Requires: equipmentStats, 
    OTHER: 2,      // Requires: steps
};

module.exports.Enchantment = [{
    id: 0,
    name: 'Fortify Melee Focus',
    equipmentStats: [1,0,0,0,0,0,0,0,0],
    enchantCost: 300,
    minimumCapacity: 850,
    consumable: false,
}, {
    id: 1,
    name: 'Fortify Melee Power',
    equipmentStats: [0,1,0,0,0,0,0,0,0],
    enchantCost: 350,
    minimumCapacity: 950,
    consumable: false,
}, {
    id: 2,
    name: 'Fortify Melee Defense',
    equipmentStats: [0,0,1,0,0,0,0,0,0],
    enchantCost: 250,
    minimumCapacity: 750,
    consumable: false,
}, {
    id: 3,
    name: 'Fortify Ranged Focus',
    equipmentStats: [0,0,0,1,0,0,0,0,0],
    enchantCost: 200,
    minimumCapacity: 600,
    consumable: false,
}, {
    id: 4,
    name: 'Fortify Ranged Power',
    equipmentStats: [0,0,0,0,1,0,0,0,0],
    enchantCost: 250,
    minimumCapacity: 700,
    consumable: false,
}, {
    id: 5,
    name: 'Fortify Ranged Defense',
    equipmentStats: [0,0,0,0,0,1,0,0,0],
    enchantCost: 150,
    minimumCapacity: 500,
    consumable: false,
}, {
    id: 6,
    name: 'Fortify Magic Focus',
    equipmentStats: [0,0,0,0,0,0,1,0,0],
    enchantCost: 250,
    minimumCapacity: 700,
    consumable: false,
}, {
    id: 7,
    name: 'Fortify Magic Power',
    equipmentStats: [0,0,0,0,0,0,0,1,0],
    enchantCost: 300,
    minimumCapacity: 800,
    consumable: false,
}, {
    id: 8,
    name: 'Fortify Magic Defense',
    equipmentStats: [0,0,0,0,0,0,0,0,1],
    enchantCost: 200,
    minimumCapacity: 600,
    consumable: false,
}, {
    id: 9,
    name: 'Goblin Camp Teleport',
    enchantCost: 20,
    minimumCapacity: 50,
    consumable: true,
    steps: [
        [buildStep(StepType.SEND_CLIENT_MESSAGE, { params: ['You rub the gem and begin the teleport...'] }),
        buildStep(StepType.IS_TIMER_EXPIRED, { params: [11] }),
        buildStep(StepType.TELEPORT, { params: [0, 30, 34, 33, 37, 3] })]
    ],
}, {
    id: 10,
    name: 'Volcano Teleport',
    enchantCost: 30,
    minimumCapacity: 150,
    consumable: true,
    steps: [
        [buildStep(StepType.SEND_CLIENT_MESSAGE, { params: ['You rub the gem and begin the teleport...'] }),
        buildStep(StepType.IS_TIMER_EXPIRED, { params: [11] }),
        buildStep(StepType.TELEPORT, { params: [0, 30, 34, 33, 37, 3] })]
    ],
}, {
    id: 11,
    name: 'Wizard Tower Teleport',
    enchantCost: 35,
    minimumCapacity: 250,
    consumable: true,
    steps: [
        [buildStep(StepType.SEND_CLIENT_MESSAGE, { params: ['You rub the gem and begin the teleport...'] }),
        buildStep(StepType.IS_TIMER_EXPIRED, { params: [11] }),
        buildStep(StepType.TELEPORT, { params: [0, 30, 34, 33, 37, 3] })]
    ],
}, {
    id: 12,
    name: 'Item Collection',
    enchantCost: 0.03,
    minimumCapacity: 400,
    consumable: true,
    steps: [
        [buildStep(StepType.SEND_CLIENT_MESSAGE, { params: ['You rub the gem and begin the teleport...'] }),
        buildStep(StepType.TELEPORT, { params: [0, 30, 34, 33, 37, 3] })]
    ],
}, {
}];