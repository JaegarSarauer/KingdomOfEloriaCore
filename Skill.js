module.exports.getLevelByXP = (xp) => {
    return Math.max(1, Math.floor(Math.pow(Math.max(0, parseFloat(xp) - 19), 1/3.4)) - 1);
}

module.exports.getXPByLevel = (level) => {
    return Math.ceil(Math.pow(Math.max(0, parseFloat(level) + 1), 3.4) + 19);
}

module.exports.Skill = [{
    id: 0,
    name: 'Melee Focus',
},{
    id: 1,
    name: 'Melee Power',
},{
    id: 2,
    name: 'Melee Defense',
},{
    id: 3,
    name: 'Ranged Focus',
},{
    id: 4,
    name: 'Ranged Power',
},{
    id: 5,
    name: 'Ranged Defense',
},{
    id: 6,
    name: 'Magic Focus',
},{
    id: 7,
    name: 'Magic Power',
},{
    id: 8,
    name: 'Magic Defense',
},{
    id: 9,
    name: 'Woodcutting',
},{
    id: 10,
    name: 'Mining',
},{
    id: 11,
    name: 'Hitpoints',
},{
    id: 12,
    name: 'Fishing',
},{
    id: 13,
    name: 'Cooking',
},{
    id: 14,
    name: 'Smithing',
},{
    id: 15,
    name: 'Crafting',
},{
    id: 16,
    name: 'Fletching',
},{
    id: 17,
    name: 'Firemaking',
},{
    id: 18,
    name: 'Construction',
},{
    id: 19,
    name: 'Alchemy',
},{
    id: 20,
    name: 'Thieving',
},{
    id: 21,
    name: 'Gemcutting',
},{
    id: 22,
    name: 'Environment Magic',
},];