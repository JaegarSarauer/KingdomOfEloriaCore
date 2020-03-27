module.exports.AnimationType = Object.freeze([{
    id: 0,
    name: 'Idle',
}, {
    id: 1,
    name: 'Walk Left',
}, {
    id: 2,
    name: 'Walk Right',
}, {
    id: 3,
    name: 'Attack',
}, {
    id: 4,
    name: 'Defend',
}, {
    id: 5,
    name: 'Die',
}]);

module.exports.Animation = Object.freeze([{
    id: 0,
    name: 'Humanoid Idle',
    frames: [0],
}, {
    id: 1,
    name: 'Humanoid Walk Left',
    frames: [1, 0, 4, 0],
}, {
    id: 2,
    name: 'Humanoid Walk Right',
    frames: [3, 0, 2, 0],
}, {
    id: 3,
    name: 'Humanoid Attack',
    frames: [5, 6, 7, 0],
}, {
    id: 4,
    name: 'Humanoid Defend',
    frames: [0, 8, 8, 8],
}, {
    id: 5,
    name: 'Humanoid Die',
    frames: [9, 9, 10, 10],
}, {
    id: 6,
    name: 'Chicken Idle',
    frames: [],
}, {
    id: 7,
    name: 'Chicken Walk',
    frames: [],
},
]);

module.exports.AnimationFrame = Object.freeze([{
    id: 0,
    name: 'Humanoid Stand',
    offsetX: 0,
    offsetY: 0,
    layers: [
        [{ //layer 1
            offsetX: 1, offsetY: 0, modelType: 0, frameID: 0, //head
        }, {
            offsetX: 1, offsetY: 1, modelType: 1, frameID: 0, //torso
        }], 
        [{ //layer 2
            offsetX: 1, offsetY: 0, equipmentSlotID: 0, modelType: 0, frameID: 0, //helmet
        },{ //torso
            offsetX: 1, offsetY: 1, equipmentSlotID: 3, modelType: 1, frameID: 0, //chest armour
        }], 
        [{ //layer 3
            offsetX: 2, offsetY: 2, modelType: 2, frameID: 0, //left leg
        }],
        [{ //layer 4
            offsetX: 1, offsetY: 2, equipmentSlotID: 4, modelType: 2, frameID: 0, //left leg armour
        }, {
            offsetX: 1, offsetY: 2, modelType: 3, frameID: 0, //right leg
        }],
        [{ //layer 5
            offsetX: 2, offsetY: 2,equipmentSlotID: 4, modelType: 3, frameID: 0, //right leg armour
        }],
        [{ //layer 6
            offsetX: 3, offsetY: 1, modelType: 4, frameID: 0, //left arm
        }], 
        [{ //layer 7
            offsetX: 0, offsetY: 1, equipmentSlotID: 3, modelType: 5, frameID: 0, //left arm armour
        }, { 
            offsetX: 0, offsetY: 1, modelType: 5, frameID: 0, //right arm
        }],
        [{ //layer 8
            offsetX: 3, offsetY: 1, equipmentSlotID: 3, modelType: 4, frameID: 0, //right arm armour
        }],
        [{ //layer 9
            offsetX: 3, offsetY: 2, equipmentSlotID: 2, modelType: 6, frameID: 0, //left arm shield
        }, {
            offsetX: 0, offsetY: 2, equipmentSlotID: 1, modelType: 7, frameID: 0, //right arm weapon
        }]
    ]
}, {
    id: 1,
    name: 'Humanoid Step Out Right',
    offsetX: 0,
    offsetY: 0,
    layers: [
        [{ //layer 1
            offsetX: 1, offsetY: 0, modelType: 0, frameID: 0, //head
        }, {
            offsetX: 1, offsetY: 1, modelType: 1, frameID: 0, //torso
        }], 
        [{ //layer 2
            offsetX: 1, offsetY: 0, equipmentSlotID: 0, modelType: 0, frameID: 0, //helmet
        },{ //torso
            offsetX: 1, offsetY: 1, equipmentSlotID: 3, modelType: 1, frameID: 0, //chest armour
        }], 
        [{ //layer 3
            offsetX: 2, offsetY: 2, modelType: 2, frameID: 0, //left leg
        }],
        [{ //layer 4
            offsetX: 1, offsetY: 2, equipmentSlotID: 4, modelType: 2, frameID: 0, //left leg armour
        }, {
            offsetX: 1, offsetY: 2, modelType: 3, frameID: 1, //right leg
        }],
        [{ //layer 5
            offsetX: 2, offsetY: 2,equipmentSlotID: 4, modelType: 3, frameID: 1, //right leg armour
        }],
        [{ //layer 6
            offsetX: 3, offsetY: 1, modelType: 4, frameID: 0, //left arm
        }], 
        [{ //layer 7
            offsetX: 0, offsetY: 1, equipmentSlotID: 3, modelType: 5, frameID: 0, //left arm armour
        }, { 
            offsetX: 0, offsetY: 1, modelType: 5, frameID: 0, //right arm
        }],
        [{ //layer 8
            offsetX: 3, offsetY: 1, equipmentSlotID: 3, modelType: 4, frameID: 0, //right arm armour
        }],
        [{ //layer 9
            offsetX: 3, offsetY: 2, equipmentSlotID: 2, modelType: 6, frameID: 0, //left arm shield
        }, {
            offsetX: 0, offsetY: 2, equipmentSlotID: 1, modelType: 7, frameID: 0, //right arm weapon
        }]
    ]
}, {
    id: 2,
    name: 'Humanoid Step In Right',
    offsetX: 0,
    offsetY: 0,
    layers: [
        [{ //layer 1
            offsetX: 1, offsetY: 0, modelType: 0, frameID: 0, //head
        }, {
            offsetX: 1, offsetY: 1, modelType: 1, frameID: 0, //torso
        }], 
        [{ //layer 2
            offsetX: 1, offsetY: 0, equipmentSlotID: 0, modelType: 0, frameID: 0, //helmet
        },{ //torso
            offsetX: 1, offsetY: 1, equipmentSlotID: 3, modelType: 1, frameID: 0, //chest armour
        }], 
        [{ //layer 3
            offsetX: 2, offsetY: 2, modelType: 2, frameID: 0, //left leg
        }],
        [{ //layer 4
            offsetX: 1, offsetY: 2, equipmentSlotID: 4, modelType: 2, frameID: 0, //left leg armour
        }, {
            offsetX: 1, offsetY: 2, modelType: 3, frameID: 2, //right leg
        }],
        [{ //layer 5
            offsetX: 2, offsetY: 2,equipmentSlotID: 4, modelType: 3, frameID: 2, //right leg armour
        }],
        [{ //layer 6
            offsetX: 3, offsetY: 1, modelType: 4, frameID: 0, //left arm
        }], 
        [{ //layer 7
            offsetX: 0, offsetY: 1, equipmentSlotID: 3, modelType: 5, frameID: 0, //left arm armour
        }, { 
            offsetX: 0, offsetY: 1, modelType: 5, frameID: 0, //right arm
        }],
        [{ //layer 8
            offsetX: 3, offsetY: 1, equipmentSlotID: 3, modelType: 4, frameID: 0, //right arm armour
        }],
        [{ //layer 9
            offsetX: 3, offsetY: 2, equipmentSlotID: 2, modelType: 6, frameID: 0, //left arm shield
        }, {
            offsetX: 0, offsetY: 2, equipmentSlotID: 1, modelType: 7, frameID: 0, //right arm weapon
        }]
    ]
}, {
    id: 3,
    name: 'Humanoid Step Out Left',
    offsetX: 0,
    offsetY: 0,
    layers: [
        [{ //layer 1
            offsetX: 1, offsetY: 0, modelType: 0, frameID: 0, //head
        }, {
            offsetX: 1, offsetY: 1, modelType: 1, frameID: 0, //torso
        }], 
        [{ //layer 2
            offsetX: 1, offsetY: 0, equipmentSlotID: 0, modelType: 0, frameID: 0, //helmet
        },{ //torso
            offsetX: 1, offsetY: 1, equipmentSlotID: 3, modelType: 1, frameID: 0, //chest armour
        }], 
        [{ //layer 3
            offsetX: 2, offsetY: 2, modelType: 2, frameID: 1, //left leg
        }],
        [{ //layer 4
            offsetX: 1, offsetY: 2, equipmentSlotID: 4, modelType: 2, frameID: 1, //left leg armour
        }, {
            offsetX: 1, offsetY: 2, modelType: 3, frameID: 0, //right leg
        }],
        [{ //layer 5
            offsetX: 2, offsetY: 2,equipmentSlotID: 4, modelType: 3, frameID: 0, //right leg armour
        }],
        [{ //layer 6
            offsetX: 3, offsetY: 1, modelType: 4, frameID: 0, //left arm
        }], 
        [{ //layer 7
            offsetX: 0, offsetY: 1, equipmentSlotID: 3, modelType: 5, frameID: 0, //left arm armour
        }, { 
            offsetX: 0, offsetY: 1, modelType: 5, frameID: 0, //right arm
        }],
        [{ //layer 8
            offsetX: 3, offsetY: 1, equipmentSlotID: 3, modelType: 4, frameID: 0, //right arm armour
        }],
        [{ //layer 9
            offsetX: 3, offsetY: 2, equipmentSlotID: 2, modelType: 6, frameID: 0, //left arm shield
        }, {
            offsetX: 0, offsetY: 2, equipmentSlotID: 1, modelType: 7, frameID: 0, //right arm weapon
        }]
    ]
}, {
    id: 4,
    name: 'Humanoid Step In Left',
    offsetX: 0,
    offsetY: 0,
    layers: [
        [{ //layer 1
            offsetX: 1, offsetY: 0, modelType: 0, frameID: 0, //head
        }, {
            offsetX: 1, offsetY: 1, modelType: 1, frameID: 0, //torso
        }], 
        [{ //layer 2
            offsetX: 1, offsetY: 0, equipmentSlotID: 0, modelType: 0, frameID: 0, //helmet
        },{ //torso
            offsetX: 1, offsetY: 1, equipmentSlotID: 3, modelType: 1, frameID: 0, //chest armour
        }], 
        [{ //layer 3
            offsetX: 2, offsetY: 2, modelType: 2, frameID: 2, //left leg
        }],
        [{ //layer 4
            offsetX: 1, offsetY: 2, equipmentSlotID: 4, modelType: 2, frameID: 2, //left leg armour
        }, {
            offsetX: 1, offsetY: 2, modelType: 3, frameID: 0, //right leg
        }],
        [{ //layer 5
            offsetX: 2, offsetY: 2,equipmentSlotID: 4, modelType: 3, frameID: 0, //right leg armour
        }],
        [{ //layer 6
            offsetX: 3, offsetY: 1, modelType: 4, frameID: 0, //left arm
        }], 
        [{ //layer 7
            offsetX: 0, offsetY: 1, equipmentSlotID: 3, modelType: 5, frameID: 0, //left arm armour
        }, { 
            offsetX: 0, offsetY: 1, modelType: 5, frameID: 0, //right arm
        }],
        [{ //layer 8
            offsetX: 3, offsetY: 1, equipmentSlotID: 3, modelType: 4, frameID: 0, //right arm armour
        }],
        [{ //layer 9
            offsetX: 3, offsetY: 2, equipmentSlotID: 2, modelType: 6, frameID: 0, //left arm shield
        }, {
            offsetX: 0, offsetY: 2, equipmentSlotID: 1, modelType: 7, frameID: 0, //right arm weapon
        }]
    ]
}, ]);

module.exports.ModelType = Object.freeze([{
    id: 0,
    name: 'Head',
    models: [{
        id: 0,
        name: 'Tan Humanoid Head',
        frames: [{
            id: 0,
            name: 'Normal',
            offsetX: 0,
            offsetY: 0,
            sprites: [[1, 2]],
        }],
    }, {
        id: 1,
        name: 'Chicken Head',
        frames: [{
            id: 0,
            name: 'Normal',
            offsetX: 0,
            offsetY: 0,
            sprites: [[44]],
        }],
    }, {
        id: 2,
        name: 'Green Humanoid Head',
        frames: [{
            id: 0,
            name: 'Normal',
            offsetX: 0,
            offsetY: 0,
            sprites: [[50, 51]],
        }],
    }, {
        id: 3,
        name: 'Chick',
        frames: [{
            id: 0,
            name: 'Normal',
            offsetX: 0,
            offsetY: 0,
            sprites: [[93]],
        }],
    },{
        id: 4,
        name: 'Dark Green Humanoid Head',
        frames: [{
            id: 0,
            name: 'Normal',
            offsetX: 0,
            offsetY: 0,
            sprites: [[1152, 1153]],
        }],
    }, ],
}, {
    id: 1,
    name: 'Torso',
    models: [{
        id: 0,
        name: 'Tan Humanoid Torso',
        frames: [{
            id: 0,
            name: 'Normal',
            offsetX: 0,
            offsetY: 0,
            sprites: [[4, 5], [8, 9]],
        }],
    }, {
        id: 1,
        name: 'Chicken Torso',
        frames: [{
            id: 0,
            name: 'Normal',
            offsetX: 0,
            offsetY: 0,
            sprites: [[45]],
        }],
    }, {
        id: 2,
        name: 'Green Humanoid Torso',
        frames: [{
            id: 0,
            name: 'Normal',
            offsetX: 0,
            offsetY: 0,
            sprites: [[53, 54], [57, 58]],
        }],
    }, {
        id: 3,
        name: 'Dark Green Humanoid Torso',
        frames: [{
            id: 0,
            name: 'Normal',
            offsetX: 0,
            offsetY: 0,
            sprites: [[1155, 1156], [1159, 1160]],
        }],
    },],
}, {
    id: 2,
    name: 'Left Leg',
    models: [{
        id: 0,
        name: 'Tan Humanoid Left Leg',
        frames: [{
            id: 0,
            name: 'Normal',
            offsetX: 0,
            offsetY: 0,
            sprites: [[12], [15]],
        }, {
            id: 1,
            name: 'Step Out',
            offsetX: 0,
            offsetY: 0,
            sprites: [[22, 0], [20, 21]],
        }, {
            id: 2,
            name: 'Step In',
            offsetX: -1,
            offsetY: 0,
            sprites: [[0, 22], [18, 19]],
        }],
    }, {
        id: 1,
        name: 'Chicken Legs',
        frames: [{
            id: 0,
            name: 'Normal',
            offsetX: 0,
            offsetY: 0,
            sprites: [[46, 47]],
        }, {
            id: 1,
            name: 'Split',
            offsetX: 0,
            offsetY: 0,
            sprites: [[48, 49]],
        }],
    }, {
        id: 2,
        name: 'Green Humanoid Left Leg',
        frames: [{
            id: 0,
            name: 'Normal',
            offsetX: 0,
            offsetY: 0,
            sprites: [[61], [64]],
        }, {
            id: 1,
            name: 'Step Out',
            offsetX: 0,
            offsetY: 0,
            sprites: [[71, 0], [69, 70]],
        }, {
            id: 2,
            name: 'Step In',
            offsetX: -1,
            offsetY: 0,
            sprites: [[0, 71], [67, 68]],
        }],
    },{
        id: 3,
        name: 'Dark Green Humanoid Left Leg',
        frames: [{
            id: 0,
            name: 'Normal',
            offsetX: 0,
            offsetY: 0,
            sprites: [[1163], [1166]],
        }, {
            id: 1,
            name: 'Step Out',
            offsetX: 0,
            offsetY: 0,
            sprites: [[1173, 0], [1171, 1172]],
        }, {
            id: 2,
            name: 'Step In',
            offsetX: -1,
            offsetY: 0,
            sprites: [[0, 1173], [1169, 1170]],
        }],
    },],
}, {
    id: 3,
    name: 'Right Leg',
    models: [{
        id: 0,
        name: 'Tan Humanoid Right Leg',
        frames: [{
            id: 0,
            name: 'Normal',
            offsetX: 0,
            offsetY: 0,
            sprites: [[11], [14]],
        }, {
            id: 1,
            name: 'Step Out',
            offsetX: -1,
            offsetY: 0,
            sprites: [[0, 17], [18, 19]],
        }, {
            id: 2,
            name: 'Step In',
            offsetX: 0,
            offsetY: 0,
            sprites: [[17, 0], [20, 21]],
        }],
    }, {
        id: 1,
        name: 'Green Humanoid Right Leg',
        frames: [{
            id: 0,
            name: 'Normal',
            offsetX: 0,
            offsetY: 0,
            sprites: [[60], [63]],
        }, {
            id: 1,
            name: 'Step Out',
            offsetX: -1,
            offsetY: 0,
            sprites: [[0, 66], [67, 68]],
        }, {
            id: 2,
            name: 'Step In',
            offsetX: 0,
            offsetY: 0,
            sprites: [[66, 0], [69, 70]],
        }],
    }, {
        id: 2,
        name: 'Dark Green Humanoid Right Leg',
        frames: [{
            id: 0,
            name: 'Normal',
            offsetX: 0,
            offsetY: 0,
            sprites: [[1162], [1165]],
        }, {
            id: 1,
            name: 'Step Out',
            offsetX: -1,
            offsetY: 0,
            sprites: [[0, 1168], [1169, 1170]],
        }, {
            id: 2,
            name: 'Step In',
            offsetX: 0,
            offsetY: 0,
            sprites: [[1168, 0], [1171, 1172]],
        }],
    }],
}, {
    id: 4,
    name: 'Left Arm',
    models: [{
        id: 0,
        name: 'Tan Humanoid Left Arm',
        frames: [{
            id: 0,
            name: 'Normal',
            offsetX: 0,
            offsetY: 0,
            sprites: [[6], [10], [16]],
        }, {
            id: 1,
            name: 'Swing Out 45',
            offsetX: 1,
            offsetY: 0,
            sprites: [[33, 34], [36, 37]],
        }, {
            id: 2,
            name: 'Swing Out 90',
            offsetX: 0,
            offsetY: 0,
            sprites: [[24, 25]],
        }, {
            id: 3,
            name: 'Swing Out 135',
            offsetX: 0,
            offsetY: -1,
            sprites: [[41, 42, 34], [35, 43, 0]],
        }, {
            id: 4,
            name: 'Swing In 45',
            offsetX: -2,
            offsetY: 0,
            sprites: [[26, 27, 28], [29, 30, 31]],
        }],
    }, {
        id: 1,
        name: 'Green Humanoid Left Arm',
        frames: [{
            id: 0,
            name: 'Normal',
            offsetX: 0,
            offsetY: 0,
            sprites: [[55], [59], [65]],
        }, {
            id: 1,
            name: 'Swing Out 45',
            offsetX: 1,
            offsetY: 0,
            sprites: [[82, 83], [85, 86]],
        }, {
            id: 2,
            name: 'Swing Out 90',
            offsetX: 0,
            offsetY: 0,
            sprites: [[73, 74]],
        }, {
            id: 3,
            name: 'Swing Out 135',
            offsetX: 0,
            offsetY: -1,
            sprites: [[90, 91, 83], [84, 92, 0]],
        }, {
            id: 4,
            name: 'Swing In 45',
            offsetX: -2,
            offsetY: 0,
            sprites: [[75, 76, 77], [78, 79, 80]],
        }],
    }, {
        id: 2,
        name: 'Dark Green Humanoid Left Arm',
        frames: [{
            id: 0,
            name: 'Normal',
            offsetX: 0,
            offsetY: 0,
            sprites: [[1157], [1161], [1167]],
        }, {
            id: 1,
            name: 'Swing Out 45',
            offsetX: 1,
            offsetY: 0,
            sprites: [[1184, 1185], [1187, 1188]],
        }, {
            id: 2,
            name: 'Swing Out 90',
            offsetX: 0,
            offsetY: 0,
            sprites: [[1175, 1176]],
        }, {
            id: 3,
            name: 'Swing Out 135',
            offsetX: 0,
            offsetY: -1,
            sprites: [[1192, 1193, 1185], [1186, 1194, 0]],
        }, {
            id: 4,
            name: 'Swing In 45',
            offsetX: -2,
            offsetY: 0,
            sprites: [[1177, 1178, 1179], [1180, 1181, 1182]],
        }],
    }],
}, {
    id: 5,
    name: 'Right Arm',
    models: [{
        id: 0,
        name: 'Tan Humanoid Right Arm',
        frames: [{
            id: 0,
            name: 'Normal',
            offsetX: 0,
            offsetY: 0,
            sprites: [[3], [7], [13]],
        }, {
            id: 1,
            name: 'Swing Out 45',
            offsetX: -1,
            offsetY: 0,
            sprites: [[26, 27], [29, 30]],
        }, {
            id: 2,
            name: 'Swing Out 90',
            offsetX: -2,
            offsetY: 0,
            sprites: [[23, 24]],
        },{
            id: 3,
            name: 'Swing Out 135',
            offsetX: -2,
            offsetY: -1,
            sprites: [[41, 42, 34], [35, 43, 0]],
        }, {
            id: 4,
            name: 'Swing In 45',
            offsetX: 0,
            offsetY: 0,
            sprites: [[32, 33, 34], [35, 36, 37]],
        }],
    }, {
        id: 1,
        name: 'Green Humanoid Right Arm',
        frames: [{
            id: 0,
            name: 'Normal',
            offsetX: 0,
            offsetY: 0,
            sprites: [[52], [56], [62]],
        }, {
            id: 1,
            name: 'Swing Out 45',
            offsetX: -1,
            offsetY: 0,
            sprites: [[75, 76], [78, 79]],
        }, {
            id: 2,
            name: 'Swing Out 90',
            offsetX: -2,
            offsetY: 0,
            sprites: [[72, 73]],
        },{
            id: 3,
            name: 'Swing Out 135',
            offsetX: -2,
            offsetY: -1,
            sprites: [[90, 91, 83], [84, 92, 0]],
        }, {
            id: 4,
            name: 'Swing In 45',
            offsetX: 0,
            offsetY: 0,
            sprites: [[81, 82, 83], [84, 85, 86]],
        }],
    }, {
        id: 2,
        name: 'Dark Green Humanoid Right Arm',
        frames: [{
            id: 0,
            name: 'Normal',
            offsetX: 0,
            offsetY: 0,
            sprites: [[1154], [1158], [1164]],
        }, {
            id: 1,
            name: 'Swing Out 45',
            offsetX: -1,
            offsetY: 0,
            sprites: [[1177, 1178], [1180, 1181]],
        }, {
            id: 2,
            name: 'Swing Out 90',
            offsetX: -2,
            offsetY: 0,
            sprites: [[1174, 1175]],
        },{
            id: 3,
            name: 'Swing Out 135',
            offsetX: -2,
            offsetY: -1,
            sprites: [[1192, 1193, 1185], [1186, 1194, 0]],
        }, {
            id: 4,
            name: 'Swing In 45',
            offsetX: 0,
            offsetY: 0,
            sprites: [[1183, 1184, 1185], [1186, 1187, 1188]],
        }],
    }],
}, {
    id: 6,
    name: 'Shield',
    models: [],
}, {
    id: 7,
    name: 'Weapon',
    models: [],
}]);