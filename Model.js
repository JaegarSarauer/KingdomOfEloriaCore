var TWEEN = null;
var animationsRaw = null;
const HairStyle = {
    Bald : 0,
    Scruffy : 1,
    LeftSideSwipe : 2,
    RightSideSwipe : 3,
    Messy : 1,
    Buzzed : 3,
    Mohawk : 8, 
    Dreads : 8,
    MidlifeCrisis : 4
};

const SpriteColor = {
    White : 0,
    Red : 1,
    Orange : 2,
    Yellow : 3, 
    Green : 4,
    Blue : 5,
    Purple : 6,
    DarkGray : 7,
    LightGray : 8,
    Black : 9,
    Brown : 10
};

const SpriteClothesColors = {
    Red : 1,
    Orange : 2,
    Yellow : 3,
    Green : 4, 
    Blue : 5,
    Purple : 6,
    White : 7,
    LightGray : 8,
    DarkGray : 9
}

const FacialStyles = {
    EyeLinerLipstick : { id : 1 },
    EyeLinerLipstick_Purple : { id : 2 },
    RosyCheeks_Purple : { id : 3 },
    RosyCheeks_Pink : { id : 4 },
    Freckles : { id : 5 },
    Beard_Short : { id : 6, hairTint : true },
    Beard_Medium : { id : 7, hairTint : true  },
    Beard_Elder : { id : 8, hairTint : true },
    RightScar : { id : 9 },
    LeftScar : { id : 10 },
    GoldEarings : { id : 11 },
    SilverEarings : { id : 12 },
    GothiteEarings : { id : 13 },
    GoldEarStud : { id : 14 },
    SilverEarStud : { id : 15 },
    GothiteEarStud : { id : 16 },
}

const HairColors = {
    Black: 0x2d2723,
    DarkBrown: 0x4f3822,
    Brown: 0x735940,
    CherryRed: 0xc13340,
    Ginger: 0xe27634,
    Blond: 0xe2dc6d,
    White: 0xdfdfdf,
    Gray: 0x919191,
    Green: 0x529c4a,
    Blue: 0x34789c,
    Purple: 0x6a4e9c,
    Pink: 0xbf467b
};

const EyeColors = {
    Blue: 0x34789c,
    Green: 0x529c4a,
    Brown: 0x735940,
    DarkBrown: 0x73502e,
    Ginger: 0xe27634,
    Red: 0x325321,
    Purple: 0x6a4e9c,
};

const Model = {
    HUMANOID : {
        id: "HUMANOID",
        CORE: {
            id: 'CORE',
            asset: 'chestParts',
            parent: null,
            sprite: 'blankChest',
            spriteID: 2,
            anchor: {x: 0.5, y: 0.5},
            position: {x: 0, y: 0},
            rotation: 0,
            UIModel: null,
            z: 0,
        },
        CHEST : {
            id: 'CHEST',
            asset: 'chestParts',
            sprite: 'humanChest',
            parent: 'CORE',
            spriteID: 21,
            anchor: {x: 0.5, y: 0.65},
            position: {x: 0, y: -0.35},
            rotation: 0,
            UIModel: null,
            z: 0,
        },
        RIGHT_THIGH: {
            id: 'RIGHT_THIGH',
            asset: 'legParts',
            sprite: 'humanMaleRightThigh',
            parent: 'CHEST',
            spriteID: 1,
            anchor: {x: 1-(4/7), y: 0.15},
            position: {x: -(5/16), y: 0.27},
            rotation: 0,
            UIModel: null,
            z: -1,
        },
        LEFT_THIGH: {
            id: 'LEFT_THIGH',
            asset: 'legParts',
            sprite: 'humanMaleLeftThigh',
            parent: 'CHEST',
            spriteID: 1,
            anchor: {x: (4/7), y: 0.15},
            position: {x: (5/16), y: 0.27},
            rotation: 0,
            UIModel: null,
            z: -1,
        },
        RIGHT_SHIN: {
            id: 'RIGHT_SHIN',
            asset: 'legParts',
            sprite: 'humanRightShin',
            parent: 'RIGHT_THIGH',
            spriteID: 1,
            anchor: {x: 0.5, y: 0.1},
            position: {x: 0.05, y: 0.9},
            rotation: 0,
            UIModel: null,
            z: 0,
        },
        LEFT_SHIN: {
            id: 'LEFT_SHIN',
            asset: 'legParts',
            sprite: 'humanLeftShin',
            parent: 'LEFT_THIGH',
            spriteID: 1,
            anchor: {x: 0.5, y: 0.1},
            position: {x: -0.05, y: 0.9},
            rotation: 0,
            UIModel: null,
            z: 0,
        },
        LEFT_SHOULDER: {
            id: 'LEFT_SHOULDER',
            asset: 'armParts',
            sprite: 'humanLeftShoulder',
            parent: 'CHEST',
            spriteID: 1,
            anchor: {x: 0.25, y: 0.18},
            position: {x: 0.475, y: -0.5},
            rotation: 0,
            UIModel: null,
            z: 10,
        },
        RIGHT_SHOULDER: {
            id: 'RIGHT_SHOULDER',
            asset: 'armParts',
            sprite: 'humanRightShoulder',
            parent: 'CHEST',
            spriteID: 1,
            anchor: {x: 0.75, y: 0.18},
            position: {x: -0.475, y: -0.5},
            rotation: 0,
            UIModel: null,
            z: 10,
        },
        LEFT_FOREARM: {
            id: 'LEFT_FOREARM',
            asset: 'armParts',
            sprite: 'humanLeftForearm',
            parent: 'LEFT_SHOULDER',
            spriteID: 1,
            anchor: {x: 1-(3/8), y: 0.05},
            position: {x: (5/8), y: 0.75},
            rotation: 0,
            UIModel: null,
            z: 0,
        },
        RIGHT_FOREARM: {
            id: 'RIGHT_FOREARM',
            asset: 'armParts',
            sprite: 'humanRightForearm',
            parent: 'RIGHT_SHOULDER',
            spriteID: 1,
            anchor: {x: (3/8), y: 0.05},
            position: {x: -(5/8), y: 0.75},
            rotation: 0,
            UIModel: null,
            z: 0,
        },
        HEAD: {
            id: 'HEAD',
            asset: 'headParts',
            sprite: 'humanHeadMale',
            parent: 'CHEST',
            spriteID: 1,
            anchor: {x: 0.5, y: 0.9},
            position: {x: 0, y: -0.675 },
            rotation: 0,
            UIModel: null,
            z: 15,
        },
        FACE: {
            id: 'FACE',
            asset: 'headParts',
            sprite: 'humanFace',
            parent: 'HEAD',
            spriteID: 0,
            anchor: {x: 0.5, y: 0.5},
            position: {x: 0, y: -0.35},
            rotation: 0,
            UIModel: null,
            z: 0,
        },
        EYES: {
            id: 'EYES',
            asset: 'headParts',
            sprite: 'humanEyes',
            parent: 'HEAD',
            spriteID: 1,
            anchor: {x: 0.5, y: 0.5},
            position: {x: 0, y: -0.375},
            rotation: 0,
            UIModel: null,
            z: 0,
        },
    },
    FOUR_LEGGED_MAMMAL: {
        id: 'FOUR_LEGGED_MAMMAL',
        CORE: {
            id: 'CORE',
            asset: 'chestParts',
            parent: null,
            sprite: 'blankChest',
            spriteID: 1,
            anchor: {x: 0.5, y: 0.5},
            position: {x: 0, y: 0},
            rotation: 0,
            UIModel: null,
        },
        HIDDEN_CHEST: {
            id: 'HIDDEN_CHEST',
            asset: 'chestParts',
            parent: 'CORE',
            spriteID: 1,
            anchor: {x: 0.5, y: 0.5},
            position: {x: 0, y: -0.25},
            rotation: 0,
            UIModel: null,
        },
        THIGH_HIDDEN_FRONT: {
            id: 'THIGH_HIDDEN_FRONT',
            asset: 'legParts',
            parent: 'HIDDEN_CHEST',
            spriteID: 1,
            anchor: {x: 0.5, y: 0.1},
            position: {x: -0.15, y: 0.1},
            rotation: 0.0,
            UIModel: null,
        },
        SHIN_HIDDEN_FRONT: {
            id: 'SHIN_HIDDEN_FRONT',
            asset: 'legParts',
            parent: 'THIGH_HIDDEN_FRONT',
            spriteID: 1,
            anchor: {x: 0.5, y: 0.1},
            position: {x: 0.05, y: 0.9},
            rotation: 0.0,
            UIModel: null,
        },
        THIGH_HIDDEN_BACK: {
            id: 'THIGH_HIDDEN_BACK',
            asset: 'legParts',
            parent: 'HIDDEN_CHEST',
            spriteID: 1,
            anchor: {x: 0.5, y: 0.1},
            position: {x: 0.35, y: 0.05},
            rotation: 0.0,
            UIModel: null,
        },
        SHIN_HIDDEN_BACK: {
            id: 'SHIN_HIDDEN_BACK',
            asset: 'legParts',
            parent: 'THIGH_HIDDEN_BACK',
            spriteID: 1,
            anchor: {x: 0.5, y: 0.1},
            position: {x: 0.1, y: 0.9},
            rotation: 0.0,
            UIModel: null,
        },
        CHEST: {
            id: 'CHEST',
            asset: 'chestParts',
            parent: 'CORE',
            spriteID: 1,
            anchor: {x: 0.5, y: 0.5},
            position: {x: 0, y: -0.25},
            rotation: 0,
            UIModel: null,
        },
        HEAD: {
            id: 'HEAD',
            asset: 'headParts',
            parent: 'CHEST',
            spriteID: 1,
            anchor: {x: 0.85, y: 0.85},
            position: {x: -0.45, y: -0.05},
            rotation: 0,
            UIModel: null,
        },
        THIGH_VISIBLE_FRONT: {
            id: 'THIGH_VISIBLE_FRONT',
            asset: 'legParts',
            parent: 'CHEST',
            spriteID: 1,
            anchor: {x: 0.5, y: 0.1},
            position: {x: -0.3, y: 0.2},
            rotation: 0.0,
            UIModel: null,
        },
        SHIN_VISIBLE_FRONT: {
            id: 'SHIN_VISIBLE_FRONT',
            asset: 'legParts',
            parent: 'THIGH_VISIBLE_FRONT',
            spriteID: 1,
            anchor: {x: 0.5, y: 0.1},
            position: {x: 0.05, y: 0.9},
            rotation: 0.0,
            UIModel: null,
        },
        THIGH_VISIBLE_BACK: {
            id: 'THIGH_VISIBLE_BACK',
            asset: 'legParts',
            parent: 'CHEST',
            spriteID: 1,
            anchor: {x: 0.5, y: 0.1},
            position: {x: 0.2, y: 0.15},
            rotation: 0.0,
            UIModel: null,
        },
        SHIN_VISIBLE_BACK: {
            id: 'SHIN_VISIBLE_BACK',
            asset: 'legParts',
            parent: 'THIGH_VISIBLE_BACK',
            spriteID: 1,
            anchor: {x: 0.5, y: 0.1},
            position: {x: 0.1, y: 0.9},
            rotation: 0.0,
            UIModel: null,
        },
        TAIL: {
            id: 'TAIL',
            asset: 'tailParts',
            parent: 'CHEST',
            spriteID: 1,
            anchor: {x: 0.5, y: 0.1},
            position: {x: 0.5, y: -0.25},
            rotation: -0.15,
            UIModel: null,
        },
    },
    CHICKEN: {
        id: 'CHICKEN',
        CORE: {
            id: 'CORE',
            asset: 'chestParts',
            parent: null,
            sprite: 'blankChest',
            spriteID: 0,
            anchor: {x: 0.5, y: 0.5},
            position: {x: 0, y: 0},
            rotation: 0,
            UIModel: null,
        },
        CHEST: {
            id: 'CHEST',
            asset: 'chestParts',
            sprite: 'chickenBody',
            parent: 'CORE',
            spriteID: 0,
            anchor: {x: 0.5, y: 0.5},
            position: {x: 0, y: 0},
            rotation: 0,
            UIModel: null,
        },
        HEAD: {
            id: 'HEAD',
            asset: 'headParts',
            sprite: 'chickenHead',
            parent: 'CHEST',
            spriteID: 0,
            anchor: {x: 0.75, y: 0.75},
            position: {x: -0.25, y: -0.25},
            rotation: 0,
            UIModel: null,
        },
        LEGS: {
            id: 'LEGS',
            asset: 'legParts',
            sprite: 'chickenLegs',
            parent: 'CHEST',
            spriteID: 0,
            anchor: {x: 0.5, y: 0.1},
            position: {x: 0, y: 0.45},
            rotation: 0,
            UIModel: null,
        },
    },
    CRAB: {
        id: 'CRAB',
        CORE: {
            id: 'CORE',
            asset: 'chestParts',
            parent: null,
            sprite: 'blankChest',
            spriteID: 0,
            anchor: {x: 0.5, y: 0.5},
            position: {x: 0, y: 0},
            rotation: 0,
            UIModel: null,
        },
        CHEST: {
            id: 'CHEST',
            asset: 'headParts',
            sprite: 'crabHead',
            parent: 'CORE',
            spriteID: 1,
            anchor: {x: 0.5, y: 0.5},
            position: {x: 0, y: 0},
            rotation: 0,
            UIModel: null,
        },
        LEG_RIGHT_INNER: {
            id: 'LEG_RIGHT_INNER',
            asset: 'legParts',
            sprite: 'crabRightLeg',
            parent: 'CHEST',
            spriteID: 1,
            anchor: {x: 0.5, y: 0.10},
            position: {x: -0.2, y: 0.4},
            rotation: 0,
            UIModel: null,
        },
        LEG_LEFT_INNER: {
            id: 'LEG_LEFT_INNER',
            asset: 'legParts',
            sprite: 'crabLeftLeg',
            parent: 'CHEST',
            spriteID: 1,
            anchor: {x: 0.5, y: 0.10},
            position: {x: 0.2, y: 0.4},
            rotation: 0,
            UIModel: null,
        },
        LEG_RIGHT_OUTER: {
            id: 'LEG_RIGHT_OUTER',
            asset: 'legParts',
            sprite: 'crabRightLeg',
            parent: 'CHEST',
            spriteID: 1,
            anchor: {x: 0.5, y: 0.10},
            position: {x: -0.45, y: 0.1},
            rotation: 0,
            UIModel: null,
        },
        LEG_LEFT_OUTER: {
            id: 'LEG_LEFT_OUTER',
            asset: 'legParts',
            sprite: 'crabLeftLeg',
            parent: 'CHEST',
            spriteID: 1,
            anchor: {x: 0.5, y: 0.10},
            position: {x: 0.45, y: 0.1},
            rotation: 0,
            UIModel: null,
        },
        CLAW_RIGHT: {
            id: 'CLAW_RIGHT',
            asset: 'armParts',
            sprite: 'crabClawRight',
            parent: 'CHEST',
            spriteID: 1,
            anchor: {x: 0.9, y: 0.1},
            position: {x: -0.4, y: 0},
            rotation: 0,
            UIModel: null,
        },
        CLAW_LEFT: {
            id: 'CLAW_LEFT',
            asset: 'armParts',
            sprite: 'crabClawLeft',
            parent: 'CHEST',
            spriteID: 1,
            anchor: {x: 0.1, y: 0.1},
            position: {x: 0.4, y: 0},
            rotation: 0,
            UIModel: null,
        },
    },
    CHICK: {
        id: 'CHICK',
        CORE: {
            id: 'CORE',
            asset: 'chestParts',
            parent: null,
            sprite: 'blankChest',
            spriteID: 0,
            anchor: {x: 0.5, y: 0.5},
            position: {x: 0, y: 0},
            rotation: 0,
            UIModel: null,
        },
        CHEST: {
            id: 'CHEST',
            asset: 'chestParts',
            sprite: 'chickBody',
            parent: 'CORE',
            spriteID: 0,
            anchor: {x: 0.5, y: 0.5},
            position: {x: 0, y: 0},
            rotation: 0,
            UIModel: null,
        },
        HEAD: {
            id: 'HEAD',
            asset: 'headParts',
            sprite: 'chickHead',
            parent: 'CHEST',
            spriteID: 0,
            anchor: {x: 0.85, y: 0.85},
            position: {x: -0.15, y: -0.15},
            rotation: 0,
            UIModel: null,
        },
    },
    RAT_SMALL: {
        id: 'RAT_SMALL',
        CORE: {
            id: 'CORE',
            asset: 'chestParts',
            parent: null,
            sprite: 'blankChest',
            spriteID: 0,
            anchor: {x: 0.5, y: 0.5},
            position: {x: 0, y: 0},
            rotation: 0,
            UIModel: null,
        },
        CHEST: {
            id: 'CHEST',
            asset: 'chestParts',
            sprite: 'smallRatBody',
            parent: 'CORE',
            spriteID: 1,
            anchor: {x: 0.5, y: 0.5},
            position: {x: 0, y: 0},
            rotation: 0,
            UIModel: null,
        },
        LEGS: {
            id: 'LEGS',
            asset: 'legParts',
            sprite: 'smallRatLegs',
            parent: 'CHEST',
            spriteID: 1,
            anchor: {x: 0.5, y: 0.1},
            position: {x: 0, y: 0.45},
            rotation: 0,
            UIModel: null,
        },
        TAIL: {
            id: 'TAIL',
            asset: 'tailParts',
            sprite: 'smallRatTail',
            parent: 'CHEST',
            spriteID: 1,
            anchor: {x: 0.1, y: 0.66},
            position: {x: 0.5, y: 0},
            rotation: 0,
            UIModel: null,
        },
    },
    TREE: {
        id: 'TREE',
        BASE: {
            id: 'BASE',
            asset: 'worldObjects_Trees',
            sprite: 'treeBottom',
            parent: null,
            spriteID: 0,
            anchor: {x: 0.5, y: 0.95},
            position: {x: 0, y: 32},
            rotation: 0,
            UIModel: null,
        },
        BOTTOM: {
            id: 'BOTTOM',
            asset: 'worldObjects_Trees',
            sprite: 'treeBottomMid',
            parent: 'BASE',
            spriteID: 0,
            anchor: {x: 0.5, y: 0.95},
            position: {x: 0, y: -0.95},
            rotation: 0,
            UIModel: null,
        },
        MIDDLE: {
            id: 'MIDDLE',
            asset: 'worldObjects_Trees',
            sprite: 'treeTopMid',
            parent: 'BOTTOM',
            spriteID: 0,
            anchor: {x: 0.5, y: 0.95},
            position: {x: 0, y: -0.95},
            rotation: 0,
            UIModel: null,
        },
        TOP: {
            id: 'TOP',
            asset: 'worldObjects_Trees',
            sprite: 'treeTop',
            parent: 'MIDDLE',
            spriteID: 0,
            anchor: {x: 0.5, y: 0.95},
            position: {x: 0, y: -0.95},
            rotation: 0,
            UIModel: null,
        },
    },
    ROCK: {
        id: 'ROCK',
        BASE: {
            id: 'BASE',
            asset: 'worldObjects_Rocks',
            sprite: 'rock',
            parent: null,
            spriteID: 0,
            anchor: {x: 0.5, y: 1},
            position: {x: 0, y: 32},
            rotation: 0,
            UIModel: null,
        }
    },
    DUMMY: {
        id: 'DUMMY',
        BASE: {
            id: 'BASE',
            asset: 'worldObjects_Dummy',
            sprite: 'dummy',
            parent: null,
            spriteID: 0,
            anchor: {x: 0.5, y: 1},
            position: {x: 0, y: 16},
            rotation: 0,
            UIModel: null,
        }
    },
    CAMP: {
        id: 'CAMP',
        BASE: {
            id: 'BASE',
            asset: 'worldObjects_Camps',
            sprite: 'treeCamp',
            parent: null,
            spriteID: 0,
            anchor: {x: 0.5, y: 0.5},
            position: {x: 0, y: 0},
            rotation: 0,
            UIModel: null,
        }
    },
    FISHING_POOL: {
        id: 'FISHING_POOL',
        BASE: {
            id: 'BASE',
            asset: 'worldObjects_Pools',
            sprite: 'pool',
            parent: null,
            spriteID: 0,
            anchor: {x: 0.5, y: 0.5},
            position: {x: 0, y: 0},
            rotation: 0,
            UIModel: null,
        }
    },
    PROJECTILE: {
        id: 'PROJECTILE',
        BASE: {
            id: 'BASE',
            asset: 'projectiles',
            sprite: 'arrow',
            parent: null,
            spriteID: 1,
            anchor: {x: 0.5, y: 0},
            position: {x: 0, y: 0},
            rotation: 0,
            UIModel: null,
        }
    },
    DOOR: {
        id: 'DOOR',
        BASE: {
            id: 'BASE',
            asset: 'worldObjects_Doors',
            sprite: 'door',
            parent: null,
            spriteID: 0,
            anchor: {x: 0.5, y: 0.5},
            position: {x: 0, y: 0.5},
            rotation: 0,
            UIModel: null,
        }
    },
};

module.exports.ModelPart = ModelPart = {
    
};

try {
    TWEEN = require('@tweenjs/tween.js');
    animationsRaw = require('../../../dist/assets/animations/HUMAN.json');
// Animation Helper Functions
const AnimationHelper = class AnimationHelper {
    getAnimationChain(source, transforms, millisecondsDuration) {
        if (!millisecondsDuration.length) { // Backwards compatibility
            let perUnitDuration = millisecondsDuration;
            millisecondsDuration = [];
            for(let i = 0; i < transforms.length; i++) {
                millisecondsDuration.push(perUnitDuration);
            }
        }

        switch(transforms.length) {
            case 1:
            new AnimationDef(source, transforms[0], millisecondsDuration[0]).start();
            break;
            case 2:
            new AnimationDef(source, transforms[0], millisecondsDuration[1]).chain(
                new AnimationDef(source, transforms[1], millisecondsDuration[2])
            ).start()
            break;
            case 3:
            new AnimationDef(source, transforms[0], millisecondsDuration[0]).chain(
                new AnimationDef(source, transforms[1], millisecondsDuration[1]).chain(
                    new AnimationDef(source, transforms[2], millisecondsDuration[2])
                )
            ).start()
            break;
            case 4:
            new AnimationDef(source, transforms[0], millisecondsDuration[0]).chain(
                new AnimationDef(source, transforms[1], millisecondsDuration[1]).chain(
                    new AnimationDef(source, transforms[2], millisecondsDuration[2]).chain(
                        new AnimationDef(source, transforms[3], millisecondsDuration[3])
                    )
                )
            ).start();
            break;
            case 5:
            new AnimationDef(source, transforms[0], millisecondsDuration[0]).chain(
                new AnimationDef(source, transforms[1], millisecondsDuration[1]).chain(
                    new AnimationDef(source, transforms[2], millisecondsDuration[2]).chain(
                        new AnimationDef(source, transforms[3], millisecondsDuration[3]).chain(
                            new AnimationDef(source, transforms[4], millisecondsDuration[4])
                        )
                    )
                )
            ).start();
            break;
            case 6:
            new AnimationDef(source, transforms[0], millisecondsDuration[0]).chain(
                new AnimationDef(source, transforms[1], millisecondsDuration[1]).chain(
                    new AnimationDef(source, transforms[2], millisecondsDuration[2]).chain(
                        new AnimationDef(source, transforms[3], millisecondsDuration[3]).chain(
                            new AnimationDef(source, transforms[4], millisecondsDuration[4]).chain(
                                new AnimationDef(source, transforms[5], millisecondsDuration[5])
                            )
                        )
                    )
                )
            ).start();
            break;
            case 7:
            new AnimationDef(source, transforms[0], millisecondsDuration[0]).chain(
                new AnimationDef(source, transforms[1], millisecondsDuration[1]).chain(
                    new AnimationDef(source, transforms[2], millisecondsDuration[2]).chain(
                        new AnimationDef(source, transforms[3], millisecondsDuration[3]).chain(
                            new AnimationDef(source, transforms[4], millisecondsDuration[4]).chain(
                                new AnimationDef(source, transforms[5], millisecondsDuration[5]).chain(
                                    new AnimationDef(source, transforms[6], millisecondsDuration[6])
                                )
                            )
                        )
                    )
                )
            ).start();
            break;
            case 8:
            new AnimationDef(source, transforms[0], millisecondsDuration[0]).chain(
                new AnimationDef(source, transforms[1], millisecondsDuration[1]).chain(
                    new AnimationDef(source, transforms[2], millisecondsDuration[2]).chain(
                        new AnimationDef(source, transforms[3], millisecondsDuration[3]).chain(
                            new AnimationDef(source, transforms[4], millisecondsDuration[4]).chain(
                                new AnimationDef(source, transforms[5], millisecondsDuration[5]).chain(
                                    new AnimationDef(source, transforms[6], millisecondsDuration[6]).chain(
                                        new AnimationDef(source, transforms[7], millisecondsDuration[7])
                                    )
                                )
                            )
                        )
                    )
                )
            ).start();
            break;
            case 9:
            new AnimationDef(source, transforms[0], millisecondsDuration[0]).chain(
                new AnimationDef(source, transforms[1], millisecondsDuration[1]).chain(
                    new AnimationDef(source, transforms[2], millisecondsDuration[2]).chain(
                        new AnimationDef(source, transforms[3], millisecondsDuration[3]).chain(
                            new AnimationDef(source, transforms[4], millisecondsDuration[4]).chain(
                                new AnimationDef(source, transforms[5], millisecondsDuration[5]).chain(
                                    new AnimationDef(source, transforms[6], millisecondsDuration[6]).chain(
                                        new AnimationDef(source, transforms[7], millisecondsDuration[7]).chain(
                                            new AnimationDef(source, transforms[8], millisecondsDuration[8])
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            ).start();
            break;
            case 10:
            new AnimationDef(source, transforms[0], millisecondsDuration[0]).chain(
                new AnimationDef(source, transforms[1], millisecondsDuration[1]).chain(
                    new AnimationDef(source, transforms[2], millisecondsDuration[2]).chain(
                        new AnimationDef(source, transforms[3], millisecondsDuration[3]).chain(
                            new AnimationDef(source, transforms[4], millisecondsDuration[4]).chain(
                                new AnimationDef(source, transforms[5], millisecondsDuration[5]).chain(
                                    new AnimationDef(source, transforms[6], millisecondsDuration[6]).chain(
                                        new AnimationDef(source, transforms[7], millisecondsDuration[7]).chain(
                                            new AnimationDef(source, transforms[8], millisecondsDuration[8]).chain(
                                                new AnimationDef(source, transforms[9], millisecondsDuration[9])
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            ).start();
            break;
        }
    }

    createPropertyAnimationChain(source, property, values, millisionLerp) {
        let transforms = [];
        for(let i = 0; i < values.length; ++i) {
            let transform = {};
            transform[property] = values[i];
            transforms.push(transform);
        }
        this.getAnimationChain(source, transforms, millisionLerp);
    }

    createRotationAnimationChain(source, rotations, millisionLerp) {
        this.createPropertyAnimationChain(source, "rotation", rotations, millisionLerp);
    }
}

function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

const HumanAnimationHelper = class {
    constructor(modelParts, params, millisecondDuration) {
        this.modelParts = modelParts;
        this.params = params;
        this.millisecondDuration = millisecondDuration;
        this.transforms = {
            RIGHT_SHOULDER : {
                NEUTRAL : {rotation: 0},
                ANGLE_BACK : {rotation: toRadians(-90)},
                ANGLE_DOWN : {rotation: toRadians(-45)},
                STRAIGHT_FORWARD : {rotation: toRadians(90)},
                ANGLE_UP : {rotation: toRadians(45)},
                STRAIGHT_UP : {rotation: toRadians(180)},
            },
            RIGHT_FOREARM : {
                NEUTRAL : {rotation : 0},
                ANGLE_ACUTE : {rotation: toRadians(-30)},
                ANGLE_OBTUSE : {rotation: toRadians(-90)},
            },
            LEFT_SHOULDER : {
                NEUTRAL : {rotation: 0},
                ANGLE_BACK : {rotation: toRadians(90)},
                ANGLE_DOWN : {rotation: toRadians(45)},
                STRAIGHT_FORWARD : {rotation: toRadians(-90)},
                ANGLE_UP : {rotation: toRadians(-45)},
                STRAIGHT_UP : {rotation: toRadians(-180)},
            },
            LEFT_FOREARM : {
                NEUTRAL : {rotation : 0},
                ANGLE_ACUTE : {rotation: toRadians(30)},
                ANGLE_OBTUSE : {rotation: toRadians(90)},
            },
            LEFT_THIGH : {
                NEUTAL : {rotation : 0},
                ANGLE_DOWN : {rotation : toRadians(-45)},
                STAIGHT : {rotation : toRadians(-90)},
                ANGLE_UP : {rotation : toRadians(-135)},
                ANGLE_BACK : {rotation : toRadians(45)},
            },
            RIGHT_THIGH : {
                NEUTAL : {rotation : 0},
                ANGLE_DOWN : {rotation : toRadians(45)},
                STAIGHT : {rotation : toRadians(90)},
                ANGLE_UP : {rotation : toRadians(135)},
                ANGLE_BACK : {rotation : toRadians(-45)},
            }
        };
        this.animations = [];
    }

    RightArmUp(speed) {
        this.animations.push({
            Part : this.modelParts.RIGHT_SHOULDER,
            Transform : this.transforms.RIGHT_SHOULDER.STRAIGHT_UP,
            Speed : speed
        });
        return this;
    }

    RightArmAngleUp(speed) {
        this.animations.push({
            Part : this.modelParts.RIGHT_SHOULDER,
            Transform : this.transforms.RIGHT_SHOULDER.ANGLE_UP,
            Speed : speed
        });
        return this;
    }

    RightArmAngleDown(speed) {
        this.animations.push({
            Part : this.modelParts.RIGHT_SHOULDER,
            Transform : this.transforms.RIGHT_SHOULDER.ANGLE_DOWN,
            Speed : speed
        });
        return this;
    }

    RightArmAngleBack(speed) {
        this.animations.push({
            Part : this.modelParts.RIGHT_SHOULDER,
            Transform : this.transforms.RIGHT_SHOULDER.ANGLE_BACK,
            Speed : speed
        });
        return this;
    }

    LeftArmAngleUp(speed) {
        this.animations.push({
            Part : this.modelParts.LEFT_SHOULDER,
            Transform : this.transforms.LEFT_SHOULDER.ANGLE_UP,
            Speed : speed
        });
        return this;
    }

    LeftArmAngleDown(speed) {
        this.animations.push({
            Part : this.modelParts.LEFT_SHOULDER,
            Transform : this.transforms.LEFT_SHOULDER.ANGLE_DOWN,
            Speed : speed
        });
        return this;
    }

    LeftArmAngleBack(speed) {
        this.animations.push({
            Part : this.modelParts.LEFT_SHOULDER,
            Transform : this.transforms.LEFT_SHOULDER.ANGLE_BACK,
            Speed : speed
        });
        return this;
    }
    
    RightArmStraight(speed) {
        this.animations.push({
            Part : this.modelParts.RIGHT_SHOULDER,
            Transform : this.transforms.RIGHT_SHOULDER.STRAIGHT_FORWARD,
            Speed : speed
        });
        return this;
    }
    
    RightArmRelax(speed) {
        this.animations.push({
            Part : this.modelParts.RIGHT_SHOULDER,
            Transform : this.transforms.RIGHT_SHOULDER.NEUTRAL,
            Speed : speed
        });
        return this;
    }

    RightElbowBendAcute(speed) {
        this.animations.push({
            Part : this.modelParts.RIGHT_FOREARM,
            Transform : this.transforms.RIGHT_FOREARM.ANGLE_ACUTE,
            Speed : speed
        });
        return this;
    }

    RightElbowBendObtuse(speed) {
        this.animations.push({
            Part : this.modelParts.RIGHT_FOREARM,
            Transform : this.transforms.RIGHT_FOREARM.ANGLE_OBTUSE,
            Speed : speed
        });
        return this;
    }

    RightElbowRelax(speed) {
        this.animations.push({
            Part : this.modelParts.RIGHT_FOREARM,
            Transform : this.transforms.RIGHT_FOREARM.NEUTRAL,
            Speed : speed
        });
        return this;
    }

    LeftElbowBendAcute(speed) {
        this.animations.push({
            Part : this.modelParts.LEFT_FOREARM,
            Transform : this.transforms.LEFT_FOREARM.ANGLE_ACUTE,
            Speed : speed
        });
        return this;
    }

    LeftElbowBendObtuse(speed) {
        this.animations.push({
            Part : this.modelParts.LEFT_FOREARM,
            Transform : this.transforms.LEFT_FOREARM.ANGLE_OBTUSE,
            Speed : speed
        });
        return this;
    }

    LeftElbowRelax(speed) {
        this.animations.push({
            Part : this.modelParts.LEFT_FOREARM,
            Transform : this.transforms.LEFT_FOREARM.NEUTRAL,
            Speed : speed
        });
        return this;
    }


    LeftArmUp(speed) {
        this.animations.push({
            Part : this.modelParts.LEFT_SHOULDER,
            Transform : this.transforms.LEFT_SHOULDER.STRAIGHT_UP,
            Speed : speed
        });
        return this;
    }
    
    LeftArmStraight(speed) {
        this.animations.push({
            Part : this.modelParts.LEFT_SHOULDER,
            Transform : this.transforms.LEFT_SHOULDER.STRAIGHT_FORWARD,
            Speed : speed
        });
        return this;
    }
    
    LeftArmRelax(speed) {
        this.animations.push({
            Part : this.modelParts.LEFT_SHOULDER,
            Transform : this.transforms.LEFT_SHOULDER.NEUTRAL,
            Speed : speed
        });
        return this;
    }

    LeftThighRelax(speed) {
        this.animations.push({
            Part : this.modelParts.LEFT_THIGH,
            Transform : this.transforms.LEFT_THIGH.NEUTRAL,
            Speed : speed
        });
        return this;
    }

    LeftThighAngleDown(speed) {
        this.animations.push({
            Part : this.modelParts.LEFT_THIGH,
            Transform : this.transforms.LEFT_THIGH.ANGLE_DOWN,
            Speed : speed
        });
        return this;
    }

    LeftThighStraight(speed) {
        this.animations.push({
            Part : this.modelParts.LEFT_THIGH,
            Transform : this.transforms.LEFT_THIGH.STRAIGHT,
            Speed : speed
        });
        return this;
    }

    LeftThighAngleUp(speed) {
        this.animations.push({
            Part : this.modelParts.LEFT_THIGH,
            Transform : this.transforms.LEFT_THIGH.ANGLE_UP,
            Speed : speed
        });
        return this;
    }

    LeftThighAngleBack(speed) {
        this.animations.push({
            Part : this.modelParts.LEFT_THIGH,
            Transform : this.transforms.LEFT_THIGH.ANGLE_BACK,
            Speed : speed
        });
        return this;
    }


    RightThighRelax(speed) {
        this.animations.push({
            Part : this.modelParts.RIGHT_THIGH,
            Transform : this.transforms.RIGHT_THIGH.NEUTRAL,
            Speed : speed
        });
        return this;
    }

    RightThighAngleDown(speed) {
        this.animations.push({
            Part : this.modelParts.RIGHT_THIGH,
            Transform : this.transforms.RIGHT_THIGH.ANGLE_DOWN,
            Speed : speed
        });
        return this;
    }

    RightThighStraight(speed) {
        this.animations.push({
            Part : this.modelParts.RIGHT_THIGH,
            Transform : this.transforms.RIGHT_THIGH.STRAIGHT,
            Speed : speed
        });
        return this;
    }

    RightThighAngleUp(speed) {
        this.animations.push({
            Part : this.modelParts.RIGHT_THIGH,
            Transform : this.transforms.RIGHT_THIGH.ANGLE_UP,
            Speed : speed
        });
        return this;
    }

    RightThighAngleBack(speed) {
        this.animations.push({
            Part : this.modelParts.RIGHT_THIGH,
            Transform : this.transforms.RIGHT_THIGH.ANGLE_BACK,
            Speed : speed
        });
        return this;
    }

    Start() {
        let now = new Date().getTime();
        let part = this.animations[0].Part;
        if (!part.lockedUntil || part.lockedUntil <= now) {
            let speedToValue = function(speed) {
                switch(speed) {
                    case "FAST":
                    return 1;
                    case "SLOW":
                    return 3;
                }
                return 0;
            }
    
            let totalSpeedCount = 0;
            for(let i = 0; i < this.animations.length; ++i) {
                totalSpeedCount += speedToValue(this.animations[i].Speed);
            }
    
            let speedToMilliseconds = function(speed, millisecondDuration) {
                let percent = speedToValue(speed) / totalSpeedCount;
                return percent * millisecondDuration;
            }
    
            let endTransforms = [];
            let endMilliseconds = [];
    
            for(let i = 0; i < this.animations.length; ++i) {
                endTransforms.push(this.animations[i].Transform);
                endMilliseconds.push(speedToMilliseconds(this.animations[i].Speed, this.millisecondDuration));
            }
    
            let helper = new AnimationHelper();
            helper.getAnimationChain(this.animations[0].Part, endTransforms, endMilliseconds);

            this.animations = [];

            part.lockedUntil = now + this.millisecondDuration;
        }
    }
}

const Animation = {
    FOUR_LEGGED_MAMMAL: {},
    HUMANOID: {
        ACTION: (modelParts, params) => {
            let helper = new HumanAnimationHelper(modelParts, params, 300);
            helper.LeftElbowBendAcute("FAST").LeftElbowRelax("FAST").Start();
            helper.RightElbowBendAcute("FAST").RightElbowRelax("FAST").Start();
        },
    },
    CAVECRAWLER: {
        WALK: (modelParts, params) => {
            let xChange = (params.xTileChange || 0) * 64;
            let yChange = (params.yTileChange || 0) * 64;
            modelParts.CHEST.ownerSprite.reset();
            modelParts.CHEST.x -= xChange;
            modelParts.CHEST.y -= yChange;
            new AnimationDef(modelParts.CHEST, {
                x: modelParts.CHEST.x + xChange,
                y: modelParts.CHEST.y + yChange,
            }, 500).start();

            if (Math.abs(xChange) > 0) {
                let dir = xChange < 0 ? 1 : -1; //going left rotate left, going right rotate right
                let firstFoot = xChange < 0 ? modelParts.INNER_RIGHT_THIGH : modelParts.INNER_LEFT_THIGH;
                let secondFoot = xChange < 0 ? modelParts.INNER_LEFT_THIGH : modelParts.INNER_RIGHT_THIGH;
                let firstFoot2 = xChange < 0 ? modelParts.OUTER_RIGHT_THIGH : modelParts.OUTER_LEFT_THIGH;
                let secondFoot2 = xChange < 0 ? modelParts.OUTER_LEFT_THIGH : modelParts.OUTER_RIGHT_THIGH;

                let stepSize = Math.PI / 8;//(Math.abs(params.xTileChange) + Math.abs(params.yTileChange)) > 1 ? Math.PI / 6: Math.PI / 8;
                new AnimationDef(firstFoot, {rotation: dir * stepSize }, 125).chain( // Swing out fast (100)
                    new AnimationDef(firstFoot, {rotation: -dir * stepSize}, 250).chain( // Resistance met on ground til foot behind (250)
                        new AnimationDef(firstFoot, {rotation: 0}, 125) // Return to stationary (500)
                    )
                ).start();
                new AnimationDef(firstFoot2, {rotation: -dir * stepSize }, 125).chain( // Swing out fast (100)
                    new AnimationDef(firstFoot2, {rotation: dir * stepSize}, 250).chain( // Resistance met on ground til foot behind (250)
                        new AnimationDef(firstFoot2, {rotation: 0}, 125) // Return to stationary (500)
                    )
                ).start();
                new AnimationDef(secondFoot, {rotation: -dir * stepSize}, 125).chain( // Wait til first foot is out (75) then swing fast (150)
                    new AnimationDef(secondFoot, {rotation: dir * stepSize}, 250).chain( //Swing down to ground fast (200)
                        new AnimationDef(secondFoot, {rotation: 0}, 125)
                    )
                ).start();
                new AnimationDef(secondFoot2, {rotation: dir * stepSize}, 125).chain( // Wait til first foot is out (75) then swing fast (150)
                    new AnimationDef(secondFoot2, {rotation: -dir * stepSize}, 250).chain( //Swing down to ground fast (200)
                        new AnimationDef(secondFoot2, {rotation: 0}, 125)
                    )
                ).start();
            }
            // Walking vertically
            else if (Math.abs(yChange) > 0) {
                let firstFoot = xChange < 0 ? modelParts.INNER_RIGHT_THIGH : modelParts.INNER_LEFT_THIGH;
                let secondFoot = xChange < 0 ? modelParts.INNER_LEFT_THIGH : modelParts.INNER_RIGHT_THIGH;
                let firstFoot2 = xChange < 0 ? modelParts.OUTER_RIGHT_THIGH : modelParts.OUTER_LEFT_THIGH;
                let secondFoot2 = xChange < 0 ? modelParts.OUTER_LEFT_THIGH : modelParts.OUTER_RIGHT_THIGH;
                
                new AnimationDef(firstFoot.scale, { y : 1.25 }, 125).chain( // Swing out fast (100)
                    new AnimationDef(firstFoot.scale, { y : 0.75 }, 250).chain( // Swing out fast (100)
                        new AnimationDef(firstFoot.scale, { y : 1.0 }, 125)
                    )
                ).start();
                new AnimationDef(firstFoot2.scale, { y : 0.75 }, 125).chain( // Swing out fast (100)
                    new AnimationDef(firstFoot2.scale, { y : 1.25 }, 250).chain( // Swing out fast (100)
                        new AnimationDef(firstFoot2.scale, { y : 1.0 }, 125)
                    )
                ).start();

                new AnimationDef(secondFoot.scale, { y : 0.75 }, 125).chain( // Swing out fast (100)
                    new AnimationDef(secondFoot.scale, { y : 1.25 }, 250).chain( // Swing out fast (100)
                        new AnimationDef(secondFoot.scale, { y : 1.0 }, 125)
                    )
                ).start();

                new AnimationDef(secondFoot2.scale, { y : 1.25 }, 125).chain( // Swing out fast (100)
                    new AnimationDef(secondFoot2.scale, { y : 0.75 }, 250).chain( // Swing out fast (100)
                        new AnimationDef(secondFoot2.scale, { y : 1.0 }, 125)
                    )
                ).start();
            }
            
        },
        ATTACK_MELEE: (modelParts, params) => {
            modelParts.RIGHT_SHOULDER.reset();
            modelParts.LEFT_SHOULDER.reset();
            new AnimationDef(modelParts.RIGHT_SHOULDER, {rotation: 3 * Math.PI / 4}, 100).chain(
                new AnimationDef(modelParts.RIGHT_SHOULDER, {rotation: 0}, 175).chain(
                    new AnimationDef(modelParts.RIGHT_SHOULDER, {rotation: 3 * Math.PI / 4}, 75).chain(
                        new AnimationDef(modelParts.RIGHT_SHOULDER, {rotation: 0}, 200)
                    )
                )
            ).start();
            new AnimationDef(modelParts.LEFT_SHOULDER, {rotation: -3 * Math.PI / 4}, 125).chain(
                new AnimationDef(modelParts.LEFT_SHOULDER, {rotation: 0}, 160).chain(
                    new AnimationDef(modelParts.LEFT_SHOULDER, {rotation: -3 * Math.PI / 4}, 50).chain(
                        new AnimationDef(modelParts.LEFT_SHOULDER, {rotation: 0}, 150)
                    )
                )
            ).start();

        },
        ACTION: (modelParts, params) => {
            modelParts.RIGHT_SHOULDER.reset();
            modelParts.LEFT_SHOULDER.reset();
            new AnimationDef(modelParts.RIGHT_SHOULDER, {rotation: 3 * Math.PI / 4}, 100).chain(
                new AnimationDef(modelParts.RIGHT_SHOULDER, {rotation: 0}, 175).chain(
                    new AnimationDef(modelParts.RIGHT_SHOULDER, {rotation: 3 * Math.PI / 4}, 75).chain(
                        new AnimationDef(modelParts.RIGHT_SHOULDER, {rotation: 0}, 200)
                    )
                )
            ).start();
            new AnimationDef(modelParts.LEFT_SHOULDER, {rotation: -3 * Math.PI / 4}, 125).chain(
                new AnimationDef(modelParts.LEFT_SHOULDER, {rotation: 0}, 160).chain(
                    new AnimationDef(modelParts.LEFT_SHOULDER, {rotation: -3 * Math.PI / 4}, 50).chain(
                        new AnimationDef(modelParts.LEFT_SHOULDER, {rotation: 0}, 150)
                    )
                )
            ).start();
        },
        DEFEND: (modelParts, params) => {
            modelParts.LEFT_SHOULDER.reset();
            modelParts.RIGHT_SHOULDER.reset();
            new AnimationDef(modelParts.LEFT_SHOULDER, {rotation: Math.PI / 3}, 250).repeat(1).yoyo(true).start();
            new AnimationDef(modelParts.RIGHT_SHOULDER, {rotation: -Math.PI / 3}, 250).repeat(1).yoyo(true).start();
        }
    },
    CHICKEN: {},
    CHICK: {},
    CRAB: {},
    PROJECTILE: {
        WALK_HORIZONTAL: (modelParts, params) => {
            let xChange = (params.xTileChange || 0) * 64;
            let yChange = (params.yTileChange || 0) * 64;
            
            modelParts.BASE.ownerSprite.reset();
            modelParts.BASE.x -= xChange;
            modelParts.BASE.y -= yChange;
            modelParts.BASE.rotation = Math.atan2(yChange, xChange) + (Math.PI / 2);
            new AnimationDef(modelParts.BASE, {
                x: modelParts.BASE.x + xChange,
                y: modelParts.BASE.y + yChange,
            }, 500).start();
        },
        WALK_VERTICAL: (modelParts, params) => {
            let xChange = (params.xTileChange || 0) * 64;
            let yChange = (params.yTileChange || 0) * 64;
            
            modelParts.BASE.ownerSprite.reset();
            modelParts.BASE.x -= xChange;
            modelParts.BASE.y -= yChange;
            modelParts.BASE.rotation = Math.atan2(yChange, xChange) + (Math.PI / 2);
            new AnimationDef(modelParts.BASE, {
                x: modelParts.BASE.x + xChange,
                y: modelParts.BASE.y + yChange,
            }, 500).start();
        },
    },
};


function CreateAnimationChain(source, transforms, waitDelay = 0) {
    switch(transforms.length) {
        case 1:
        return new AnimationDef(source, transforms[0], transforms[0].duration, waitDelay).start();
        case 2:
        return new AnimationDef(source, transforms[0], transforms[0].duration, waitDelay).chain(
            new AnimationDef(source, transforms[1], transforms[1].duration)
        )
        case 3:
        return new AnimationDef(source, transforms[0], transforms[0].duration, waitDelay).chain(
            new AnimationDef(source, transforms[1], transforms[1].duration).chain(
                new AnimationDef(source, transforms[2], transforms[2].duration)
            )
        )
        case 4:
        return new AnimationDef(source, transforms[0], transforms[0].duration, waitDelay).chain(
            new AnimationDef(source, transforms[1], transforms[1].duration).chain(
                new AnimationDef(source, transforms[2], transforms[2].duration).chain(
                    new AnimationDef(source, transforms[3], transforms[3].duration)
                )
            )
        )
        case 5:
        return new AnimationDef(source, transforms[0], transforms[0].duration, waitDelay).chain(
            new AnimationDef(source, transforms[1], transforms[1].duration).chain(
                new AnimationDef(source, transforms[2], transforms[2].duration).chain(
                    new AnimationDef(source, transforms[3], transforms[3].duration).chain(
                        new AnimationDef(source, transforms[4], transforms[4].duration)
                    )
                )
            )
        )
        case 6:
        return new AnimationDef(source, transforms[0], transforms[0].duration, waitDelay).chain(
            new AnimationDef(source, transforms[1], transforms[1].duration).chain(
                new AnimationDef(source, transforms[2], transforms[2].duration).chain(
                    new AnimationDef(source, transforms[3], transforms[3].duration).chain(
                        new AnimationDef(source, transforms[4], transforms[4].duration).chain(
                            new AnimationDef(source, transforms[5], transforms[5].duration)
                        )
                    )
                )
            )
        )
        case 7:
        return new AnimationDef(source, transforms[0], transforms[0].duration, waitDelay).chain(
            new AnimationDef(source, transforms[1], transforms[1].duration).chain(
                new AnimationDef(source, transforms[2], transforms[2].duration).chain(
                    new AnimationDef(source, transforms[3], transforms[3].duration).chain(
                        new AnimationDef(source, transforms[4], transforms[4].duration).chain(
                            new AnimationDef(source, transforms[5], transforms[5].duration).chain(
                                new AnimationDef(source, transforms[6], transforms[6].duration)
                            )
                        )
                    )
                )
            )
        )
        case 8:
        return new AnimationDef(source, transforms[0], transforms[0].duration, waitDelay).chain(
            new AnimationDef(source, transforms[1], transforms[1].duration).chain(
                new AnimationDef(source, transforms[2], transforms[2].duration).chain(
                    new AnimationDef(source, transforms[3], transforms[3].duration).chain(
                        new AnimationDef(source, transforms[4], transforms[4].duration).chain(
                            new AnimationDef(source, transforms[5], transforms[5].duration).chain(
                                new AnimationDef(source, transforms[6], transforms[6].duration).chain(
                                    new AnimationDef(source, transforms[7], transforms[7].duration)
                                )
                            )
                        )
                    )
                )
            )
        )
        case 9:
        return new AnimationDef(source, transforms[0], transforms[0].duration, waitDelay).chain(
            new AnimationDef(source, transforms[1], transforms[1].duration).chain(
                new AnimationDef(source, transforms[2], transforms[2].duration).chain(
                    new AnimationDef(source, transforms[3], transforms[3].duration).chain(
                        new AnimationDef(source, transforms[4], transforms[4].duration).chain(
                            new AnimationDef(source, transforms[5], transforms[5].duration).chain(
                                new AnimationDef(source, transforms[6], transforms[6].duration).chain(
                                    new AnimationDef(source, transforms[7], transforms[7].duration).chain(
                                        new AnimationDef(source, transforms[8], transforms[8].duration)
                                    )
                                )
                            )
                        )
                    )
                )
            )
        )
        case 10:
        return new AnimationDef(source, transforms[0], transforms[0].duration, waitDelay).chain(
            new AnimationDef(source, transforms[1], transforms[1].duration).chain(
                new AnimationDef(source, transforms[2], transforms[2].duration).chain(
                    new AnimationDef(source, transforms[3], transforms[3].duration).chain(
                        new AnimationDef(source, transforms[4], transforms[4].duration).chain(
                            new AnimationDef(source, transforms[5], transforms[5].duration).chain(
                                new AnimationDef(source, transforms[6], transforms[6].duration).chain(
                                    new AnimationDef(source, transforms[7], transforms[7].duration).chain(
                                        new AnimationDef(source, transforms[8], transforms[8].duration).chain(
                                            new AnimationDef(source, transforms[9], transforms[9].duration)
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            )
        )
        case 11:
        return new AnimationDef(source, transforms[0], transforms[0].duration, waitDelay).chain(
            new AnimationDef(source, transforms[1], transforms[1].duration).chain(
                new AnimationDef(source, transforms[2], transforms[2].duration).chain(
                    new AnimationDef(source, transforms[3], transforms[3].duration).chain(
                        new AnimationDef(source, transforms[4], transforms[4].duration).chain(
                            new AnimationDef(source, transforms[5], transforms[5].duration).chain(
                                new AnimationDef(source, transforms[6], transforms[6].duration).chain(
                                    new AnimationDef(source, transforms[7], transforms[7].duration).chain(
                                        new AnimationDef(source, transforms[8], transforms[8].duration).chain(
                                            new AnimationDef(source, transforms[9], transforms[9].duration).chain(
                                                new AnimationDef(source, transforms[10], transforms[10].duration)
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            )
        )
    }
}

let GetHierarchyFromAnimation = function(animation) {
    let objRefParentIdToObjTimelineId = {};
    let boneRefIdToBoneRefParentId = {};
    let timelineBoneIdToBoneName = {};
    let timelineIdToBoneObjId = {};
    let timelineIdToObjRefParentId = {};

    let startingKey = animation.mainline.key[0];
    if (startingKey) {
        for(let j = 0; j < startingKey.object_ref.length; j++) {
            let objRef = startingKey.object_ref[j];
            let timelineId = parseInt( objRef.timeline );
            objRefParentIdToObjTimelineId[objRef.parent] = timelineId;
            timelineIdToObjRefParentId[timelineId] = objRef.parent;
        }
        for(let j = 0; j < startingKey.bone_ref.length; j++) {
            let boneRef = startingKey.bone_ref[j];
            if (boneRef.parent != null) {
                boneRefIdToBoneRefParentId[boneRef.id] = boneRef.parent;
            }
        }
    }

    let objKeyByTimelineId = {};
    for(let i = 0; i < animation.timeline.length; ++i) {
        if (animation.timeline[i].object_type != 'bone') {
            if (!animation.timeline[i].obj) {
                objKeyByTimelineId[animation.timeline[i].id] = animation.timeline[i].name;
            }
        }
        else {
            timelineIdToBoneObjId[animation.timeline[i].obj] = animation.timeline[i].id;
            timelineBoneIdToBoneName[animation.timeline[i].id] = animation.timeline[i].name;
        }
    }

    return {
        objRefParentIdToObjTimelineId,
        boneRefIdToBoneRefParentId: boneRefIdToBoneRefParentId,
        objKeyByTimelineId: objKeyByTimelineId,
        timelineBoneIdToBoneName: timelineBoneIdToBoneName,
        timelineIdToBoneObjId: timelineIdToBoneObjId,
        timelineIdToObjRefParentId: timelineIdToObjRefParentId
    };
}

let GetModelRelationships = function(animation) {
    let boneRefById = {};
    let objectRefByTimelineId = {};
    let timelineDataById = {};
    let timelineIdByKey = {};
    let partKeys = [];

    let startingKey = animation.mainline.key[0];
    if (startingKey) {

        // Bone Reference table
        for(let j = 0; j < startingKey.bone_ref.length; j++) {
            let boneRef = startingKey.bone_ref[j];
            boneRefById[boneRef.id] = {
                id : boneRef.id,
                parentBoneRefId : boneRef.parent,
                timelineId : boneRef.timeline
            };
        }

        // Object Reference table
        for(let j = 0; j < startingKey.object_ref.length; j++) {
            let objRef = startingKey.object_ref[j];
            let timelineId = parseInt(objRef.timeline);
            objectRefByTimelineId[timelineId] = {
                id : objRef.id,
                parentBoneRefId : objRef.parent,
                timelineId : timelineId
            };
        }

    }

    // Timeline reference table
    for(let i = 0; i < animation.timeline.length; ++i) {
        let timeline = animation.timeline[i];

        timelineIdByKey[timeline.name] = timeline.id;

        if (timeline.object_type == 'bone') {
            timelineDataById[timeline.id] = timeline.key[0].bone;
        }
        else {
            timelineDataById[timeline.id] = timeline.key[0].object;
            partKeys.push(timeline.name);
        }
    }

    return {
        boneRefById,
        objectRefByTimelineId,
        timelineDataById,
        timelineIdByKey,
        partKeys,
    };
}

const AnimationsClaim = {
    HUMANOID : {
        WALK_HORIZONTAL : ['LEFT_THIGH', 'LEFT_SHIN', 'RIGHT_THIGH', 'RIGHT_SHIN'],
        WALK_VERTICAL : ['LEFT_THIGH', 'LEFT_SHIN', 'RIGHT_THIGH', 'RIGHT_SHIN'],
        ATTACK_MELEE : ['LEFT_SHOULDER', 'LEFT_FOREARM', 'RIGHT_SHOULDER', 'RIGHT_FOREARM'],
        ATTACK_MELEE_WEAPON : ['LEFT_SHOULDER', 'LEFT_FOREARM', 'RIGHT_SHOULDER', 'RIGHT_FOREARM'],
        ATTACK_MELEE_RANGE : ['LEFT_SHOULDER', 'LEFT_FOREARM', 'RIGHT_SHOULDER', 'RIGHT_FOREARM'],
        ATTACK_MELEE_MAGIC : ['LEFT_SHOULDER', 'LEFT_FOREARM', 'RIGHT_SHOULDER', 'RIGHT_FOREARM'],
        EQUIP_RIGHT_SHOULDER_SHEATH : ['RIGHT_SHOULDER', 'RIGHT_FOREARM'],
        EQUIP_LEFT_SHOULDER_SHEATH : ['RIGHT_SHOULDER', 'RIGHT_FOREARM'],
        EQUIP_RIGHT_SHOULDER_BACK : ['RIGHT_SHOULDER', 'RIGHT_FOREARM'],
        EQUIP_LEFT_SHOULDER_BACK : ['RIGHT_SHOULDER', 'RIGHT_FOREARM'],
        MINE : ['LEFT_SHOULDER', 'LEFT_FOREARM', 'RIGHT_SHOULDER', 'RIGHT_FOREARM'],
        STRIKE_ANVIL : ['LEFT_SHOULDER', 'LEFT_FOREARM', 'RIGHT_SHOULDER', 'RIGHT_FOREARM'],
        FLETCH : ['LEFT_SHOULDER', 'LEFT_FOREARM', 'RIGHT_SHOULDER', 'RIGHT_FOREARM'],
        WOODCUT : ['LEFT_SHOULDER', 'LEFT_FOREARM', 'RIGHT_SHOULDER', 'RIGHT_FOREARM'],
        DEATH : ['LEFT_SHOULDER', 'LEFT_FOREARM', 'RIGHT_SHOULDER', 'RIGHT_FOREARM', 'CHEST', 'RIGHT_THIGH', 'LEFT_THIGH', 'LEFT_SHIN', 'RIGHT_SHIN'],
    },
    FOUR_LEGGED_MAMMAL : {
        WALK_HORIZONTAL : ['THIGH_VISIBLE_FRONT', 'THIGH_VISIBLE_BACK', 'THIGH_HIDDEN_FRONT', 'THIGH_HIDDEN_BACK', 'SHIN_HIDDEN_FRONT', 'SHIN_HIDDEN_BACK', 'SHIN_VISIBLE_FRONT', 'SHIN_VISIBLE_BACK'],
        WALK_VERTICAL : ['THIGH_VISIBLE_FRONT', 'THIGH_VISIBLE_BACK', 'THIGH_HIDDEN_FRONT', 'THIGH_HIDDEN_BACK', 'SHIN_HIDDEN_FRONT', 'SHIN_HIDDEN_BACK', 'SHIN_VISIBLE_FRONT', 'SHIN_VISIBLE_BACK'],
        ATTACK_MELEE : ['CHEST', 'THIGH_VISIBLE_FRONT', 'THIGH_VISIBLE_BACK', 'THIGH_HIDDEN_FRONT', 'THIGH_HIDDEN_BACK', 'SHIN_HIDDEN_FRONT', 'SHIN_HIDDEN_BACK', 'SHIN_VISIBLE_FRONT', 'SHIN_VISIBLE_BACK'],
        ATTACK_RANGE : ['CHEST' ],
        ATTACK_MAGIC : ['CHEST' ],
        DEATH : ['CHEST', 'HEAD', 'TAIL', 'THIGH_VISIBLE_FRONT', 'THIGH_VISIBLE_BACK', 'THIGH_HIDDEN_FRONT', 'THIGH_HIDDEN_BACK', 'SHIN_HIDDEN_FRONT', 'SHIN_HIDDEN_BACK', 'SHIN_VISIBLE_FRONT', 'SHIN_VISIBLE_BACK'],
    },
    CRAB : {
        WALK_HORIZONTAL : ['LEG_INNER_RIGHT', 'LEG_INNER_LEFT', 'LEG_OUTER_LEFT', 'LEG_OUTER_RIGHT'],
        WALK_VERTICAL : ['LEG_INNER_RIGHT', 'LEG_INNER_LEFT', 'LEG_OUTER_LEFT', 'LEG_OUTER_RIGHT'],
        ATTACK_MELEE : ['CLAW_RIGHT', 'CLAW_LEFT', 'CHEST'],
        ATTACK_RANGE : ['CLAW_RIGHT', 'CLAW_LEFT', 'CHEST' ],
        ATTACK_MAGIC : ['CLAW_RIGHT', 'CLAW_LEFT', 'CHEST' ],
        DEATH : ['LEG_INNER_RIGHT', 'LEG_INNER_LEFT', 'LEG_OUTER_LEFT', 'LEG_OUTER_RIGHT', 'CHEST', 'CLAW_RIGHT', 'CLAW_LEFT'],
    },
    CHICKEN : {
        WALK_HORIZONTAL : ['LEGS'],
        WALK_VERTICAL : ['LEGS'],
        ATTACK_MELEE : ['CHEST', 'HEAD'],
        DEATH : ['LEGS', 'CHEST', 'HEAD'],
    }
};

let CreatePIXIJSAnimationFromSpriterAnimation = function(animation) {
    let timelines = animation.timeline;

    let spriterHierarchy = GetHierarchyFromAnimation(animation);
    let objKeyByTimelineId = spriterHierarchy.objKeyByTimelineId;
    let objRefParentIdToObjTimelineId = spriterHierarchy.objRefParentIdToObjTimelineId;


    // Calculate angles
    let allTransformsByPart = {};

    for(let i = 0; i < timelines.length; ++i) {
        if (timelines[i].object_type == 'bone') {
            let lastTime = 0;
            let transforms = [];
            let _angles_ = []; // For debugging, non-modified stats

            let initialTransform = { angle : 0, x : 0, y : 0 }
            if (timelines[i].key[0].bone) {
                initialTransform = {
                    angle : timelines[i].key[0].bone.angle,
                    x : timelines[i].key[0].bone.x,
                    y : timelines[i].key[0].bone.y
                };
            }

            for(let j = 1; j < timelines[i].key.length; ++j) {
                let key = timelines[i].key[j];
                if (key.bone ) {
                    let bone = {
                        x : key.bone.x, 
                        y : key.bone.y,
                        angle : key.bone.angle,
                        time : key.time
                    }
                    _angles_.push({angle : initialTransform.angle - key.bone.angle, byPoint : key.time - lastTime});
                    
                    // TODO: Bones can have a x/y value that never changes. Should only add if never changes, not necessarily if its set.
                    if (key.bone) {
                        let transform = {
                            duration : bone.time - lastTime
                        };
                        if (bone.angle != null) {
                            //// TODO: This is a hacky fix. If the angle is -300, we mean 60. If its 300, we mean -60. Spriters angles are different
                            let angle = initialTransform.angle - bone.angle;
                            if (angle > 250) { 
                                angle -= 360;
                            }
                            else if (angle < -250) {
                                angle += 360;
                            }
                            ////
                            transform.radians = toRadians(angle); 
                        }
                        if (bone.x != null && initialTransform.x != null) {
                            transform.x = initialTransform.x - bone.x;
                        }
                        if (bone.y != null && initialTransform.y != null) {
                            transform.y = initialTransform.y - bone.y;
                        }

                        transforms.push( transform );
                        lastTime = bone.time;
                    }
                }
            }

            let key = objKeyByTimelineId[objRefParentIdToObjTimelineId[timelines[i].obj]];

            if (transforms.length > 0 && key) {
                transforms.push({ 
                    radians : 0, 
                    x : 0,
                    y : 0,
                    duration : animation.length - lastTime 
                });
                _angles_.push({angle : 0, byPoint : animation.length - lastTime}); 
                allTransformsByPart[objKeyByTimelineId[ objRefParentIdToObjTimelineId[timelines[i].obj]]] = {
                    transforms : transforms,
                    angles : _angles_,
                    fullDuration : animation.length
                };
            }
        }
    }

    let animationName = animation.name;

    return (modelParts, params, activeAnimations) => {
        let partsToClaim = [];
        if (activeAnimations.id && AnimationsClaim[activeAnimations.id] && AnimationsClaim[activeAnimations.id][animationName]) {
            partsToClaim = AnimationsClaim[activeAnimations.id][animationName];
        }

        let transformsByPart = allTransformsByPart;
        let swapParts = {};

        let offsets = {
            x : 0,
            y : 0
        }

        if (animationName.includes('WALK')) {
            let xChange = offsets.x = (params.xTileChange || 0) * 64;
            let yChange = offsets.y = (params.yTileChange || 0) * 64;
            modelParts.CORE.ownerSprite.reset();
            modelParts.CORE.x -= xChange;
            modelParts.CORE.y -= yChange;
            new AnimationDef(modelParts.CORE, {
                x: modelParts.CORE.x + xChange,
                y: modelParts.CORE.y + yChange,
            }, 500).start(); // 500ms = 1 server tick
        }

        if (params.xDirection > 0) {
            let keys = Object.keys(transformsByPart);
            let faceCameraDirectly = false; // Faces a direction instead of the camera
            for(let i = 0; i < keys.length; ++i) {
                if (keys[i].includes('LEFT')) {
                    faceCameraDirectly = true;
                    swapParts[keys[i]] = keys[i].replace('LEFT', 'RIGHT');
                }
                if (keys[i].includes('RIGHT')) {
                    faceCameraDirectly = true;
                    swapParts[keys[i]] =  keys[i].replace('RIGHT', 'LEFT');
                }
                if (keys[i].includes('HIDDEN') && keys[i] != 'HIDDEN_CHEST') {
                    swapParts[keys[i]] = keys[i].replace('HIDDEN', 'VISIBLE');
                }
                if (keys[i].includes('VISIBLE')) {
                    swapParts[keys[i]] = keys[i].replace('VISIBLE', 'HIDDEN');
                }
            }

            if (faceCameraDirectly) {
                // Forward-facing things like people flip chest rotations
                let chest = transformsByPart['CHEST'];
                if (chest) {
                    let chestTransforms = chest.transforms;
                    if (chestTransforms) {
                        for(let i = 0; i < chestTransforms.length; ++i) {
                            if (chestTransforms[i].radians != null) {
                                chestTransforms[i].radians = -chestTransforms[i].radians;
                            }
                        }
                    }
                }
                else {
                    console.info('No chest on animation ', animation.name, transformsByPart);
                }
            }
            else {
                
                // Side-facing things like animals flip x scale
                modelParts.CHEST.scale.x = -1;
                if (modelParts.HIDDEN_CHEST) {
                    modelParts.HIDDEN_CHEST.scale.x = -1
                }
            }
        }
        else if (params.xDirection < 0 ) {
            let keys = Object.keys(transformsByPart);
            let isFourLeggedMammal = false; // Faces a direction instead of the camera
            for(let i = 0; i < keys.length; ++i) {
                if (keys[i].includes('HIDDEN') && keys[i] != 'HIDDEN_CHEST') {
                    isFourLeggedMammal = true;
                    break;
                }
                if (keys[i].includes('VISIBLE')) {
                    isFourLeggedMammal = true;
                    break;
                }
            }

            if (isFourLeggedMammal) {
                modelParts.CHEST.scale.x = 1;
                if (modelParts.HIDDEN_CHEST) {
                    modelParts.HIDDEN_CHEST.scale.x = 1
                }
            }
        }

        let keys = Object.keys(transformsByPart);
        for(let i = 0; i < keys.length; ++i) {
            let initialKey = keys[i];
            let swappedKey = swapParts[initialKey];
            let part = (swappedKey) ? modelParts[swappedKey] : modelParts[initialKey];
            let realKey = swappedKey ? swappedKey : initialKey;
            
            if (part) {
                let claimedDuration = 0;
                if (activeAnimations[realKey] != null) {
                    let animationsActive = activeAnimations[realKey];
                    if (animationsActive.claimed) {
                        if (partsToClaim.includes(realKey)) {
                            claimedDuration = activeAnimations[realKey].remainingDuration;
                        }
                        else {
                            continue; // Someone else is claiming a part that this animation does not find essential
                        }
                    }
                    else {
                        animationsActive.animations.forEach(x => {
                            x.stop();
                            
                            // TODO: Does x.stop call oncomplete? If not, do garbage collecting code here
                        });
                    }
                }


                let fractionDurationRemaining = (transformsByPart[initialKey].fullDuration - claimedDuration) / transformsByPart[initialKey].fullDuration;

                // If we only have less than 60% of the time to do the animation than we should, dont bother
                if (fractionDurationRemaining < 0.60) {
                    continue;
                }

                let transforms = [];
                // let fullDuration = ;
                // let currentDuration = 0;
                for(let j = 0; j < transformsByPart[initialKey].transforms.length; ++j) {
                    let oldTransform = transformsByPart[initialKey].transforms[j];
                    let transform = { duration : oldTransform.duration * fractionDurationRemaining };

                    // currentDuration += oldTransform.duration;

                    // NOTE: X and Y coordinates are swapped between Spriter and PIXIJS
                    if (oldTransform.y != null) { 
                        transform.x = part.x + oldTransform.y; 
                    }
                    if (oldTransform.x != null) { 
                        transform.y = part.y + oldTransform.x; 
                    }
                    if (oldTransform.radians != null) { transform.rotation = oldTransform.radians; }
                    
                    if (swappedKey) {
                        if (transform.rotation) {transform.rotation = -transform.rotation;}
                        // Does not work for x?
                    }
                    

                    transforms.push(transform);
                }

                let animation = CreateAnimationChain(part, transforms, claimedDuration);
                animation.start();
                let animations = [
                    animation
                ];
                if (initialKey == 'CHEST' && modelParts.HIDDEN_CHEST) {
                    // TODO: Special case injected structure to support layering before game does. Remove when:
                    // * Version on testing supporters reordering part z orders
                    // * Models are loaded from Spriter files
                    let hiddenChestAnim = CreateAnimationChain( modelParts.HIDDEN_CHEST, transforms, claimedDuration);
                    hiddenChestAnim.start();
                    animations.push(hiddenChestAnim);
                }

                activeAnimations[realKey] = {
                    claimed : partsToClaim.includes(realKey),
                    remainingDuration : transformsByPart[initialKey].fullDuration,
                    animations : animations
                }
            }
        }
    }
}

let SpriterOverrideAnimations = function() {
    let entities = animationsRaw.entity;
    for(let i = 0; i < entities.length; ++i) {
        let entity = entities[i];
        if (entity && entity.name && entity.animation) { // We have a Entity that has the same as a model
            if (!Animation[entity.name]) {
                Animation[entity.name] = {};
            }
            for(let j = 0; j < entity.animation.length; ++j) {
                let animation = entity.animation[j];

                // if (entity.name == 'FOUR_LEGGED_MAMMAL' && animation.name == 'WALK_HORIZONTAL') {
                    let animationCallback = CreatePIXIJSAnimationFromSpriterAnimation(animation);

                    Animation[entity.name][animation.name] = animationCallback;
                // }
            }
        }
    }
}
SpriterOverrideAnimations();

let CreatePartDef = function(id, filePath, parent, anchor, position, rotation ) {
    let folderParts = filePath.split('/');
    let asset = folderParts[0];
    let spriteWithId = folderParts[1].replace(/\.[^/.]+$/, "");
    let spriteID = '';
    let sprite = '';
    let i = spriteWithId.length - 1;
    for(; i >= 0; --i) {
        if (parseInt(spriteWithId[i])) {
            spriteID += spriteWithId[i];
        }
        else {
            break;
        }
    }
    for(; i >= 0; --i) {
        sprite += spriteWithId[i];
    }
    spriteID = spriteID.split('').reverse().join('');
    sprite = sprite.split('').reverse().join('');

    if (!parent) {
        parent = 'CORE';
    }

    return {
        id,
        asset,
        spriteID : parseInt(spriteID),
        sprite,
        anchor,
        parent,
        position,
        rotation : 0,
        UIModel : null
    };
}


let CreatePIXIJSModelFromSpriterAnimation = function(modelId, animation, folders) {
    let model = null; 
    let startingKey = animation.mainline.key[0];
    if (startingKey) {
       let partHierarchy = GetHierarchyFromAnimation(animation);
       let objRefParentIdToObjTimelineId = partHierarchy.objRefParentIdToObjTimelineId;
       let boneRefIdToBoneRefParentId = partHierarchy.boneRefIdToBoneRefParentId;
       let timelinePartIdToPartKey = partHierarchy.objKeyByTimelineId;
       //// let boneIdToBoneName = partHierarchy.boneIdToBoneName;
       //// let objIdToBoneId = partHierarchy.objIdToBoneId;
       //// let objRefIdToParentId = partHierarchy.objRefIdToParentId;
    ////    let partKeyToBoneId = {};
       let partKeyToParentKey = {};
       //// let nameToReadonlyKeyframe = {};

       let boneIds = Object.keys(objRefParentIdToObjTimelineId);
       for(let i = 0; i < boneIds.length; ++i) {
           let partKey = timelinePartIdToPartKey[objRefParentIdToObjTimelineId[boneIds[i]]];
        //    partKeyToBoneId[partKey] = boneIds[i];
           let parentBoneId = boneRefIdToBoneRefParentId[boneIds[i]];
           if (parentBoneId != null && parentBoneId != undefined) {
               partKeyToParentKey[partKey] = timelinePartIdToPartKey[objRefParentIdToObjTimelineId[parentBoneId]];
           }
           else {
               partKeyToParentKey[partKey] = null;
           }
       }

       //// for(let i = 0; i < animation.timeline.length; ++i) {
       ////     if (animation.timeline[i].object_type == 'bone') {
       ////         nameToReadonlyKeyframe[animation.timeline[i].name] = animation.timeline[i].key[0].bone
       ////     }
       ////     else {
       ////         nameToReadonlyKeyframe[animation.timeline[i].name] = animation.timeline[i].key[0].object
       ////     };
       //// }

        let modelRelationships = GetModelRelationships(animation);
        let boneRefById = modelRelationships.boneRefById;
        let objectRefByTimelineId = modelRelationships.objectRefByTimelineId;
        let timelineDataById = modelRelationships.timelineDataById;
        let timelineIdByKey = modelRelationships.timelineIdByKey;
        let partKeys = modelRelationships.partKeys;

        console.info(modelRelationships);

        model = {
            id : modelId,
            CORE: {
                id : 'CORE',
                asset : 'chestParts',
                spriteID : 1,
                anchor : {x: 0.5, y: 0.5},
                parent : null,
                position : {x: 0, y: 0},
                rotation : 0,
                UIModel : null
            }
        };

        //// let partIds = Object.keys(timelinePartIdToPartKey);
        //// let partKeyToTimelinePartId = {};

        //// for(let i = 0; i < partIds.length; ++i) {
        ////     partKeyToTimelinePartId[timelinePartIdToPartKey[partIds[i]]] = partIds[i];
        //// }
        //// console.info(partKeyToTimelinePartId);

        // /**
        //  * Part keys are offset by their parent bone key positions
        //  * Bone keys are offset by their parent positions
        //  * Bone keys without a starting position are the original one
        //  * 
        //  * Algo:
        //  * 
        //  * headPosition.X = headKey.x - headBone.x - chestBone.x
        //  * 
        //  * Seriously this should be it.... I definitely implemented wrong.
        //  * Maybe rewrite the logic :( Has old pre-epiphany funny business
        //  * 
        //  */


        // let defData = {};

        let coreAngle = 0;

        partKeys.forEach(initialKey => {
            let __safeguard = 0;


            // First case is object, rest recusively do bones. Always will have first case.
            let timelineId = timelineIdByKey[initialKey];
            let partTimelineData = timelineDataById[timelineId];
            let datas = [
                {
                    x : partTimelineData.x,
                    y : partTimelineData.y,
                    angle : partTimelineData.angle// - 270
                }
            ];
            let objectRef = objectRefByTimelineId[timelineId];


            let boneRef = boneRefById[objectRef.parentBoneRefId];
            while(boneRef != null && __safeguard++ < 20) {
                datas.push(timelineDataById[boneRef.timelineId]);
                boneRef = boneRefById[boneRef.parentBoneRefId];
            }

            let log = initialKey + ' : ';
            let position = {x : 0, y : 0};
            let angleToAdd = coreAngle;

            datas.reverse();

            let doLog = (initialKey == 'LEFT_SHOULDER' || initialKey == 'RIGHT_SHOULDER');

            let lastAngle = 0;
            datas.forEach(data => {
                let xFactor = 1;
                let yFactor = 1;
                let x = 0;
                let y = 0;

                let angle = ((data.angle != null) ? data.angle : 0);

                xFactor = Math.sin(toRadians(angle - lastAngle));
                yFactor = Math.cos(toRadians(angle - lastAngle));


                if (data.x != null) { 
                    x += Math.round(data.x * xFactor);
                    y += Math.round(data.x * yFactor);
                }
                if (data.y != null) {
                    x += Math.round(data.y * xFactor);
                    y += Math.round(data.y * yFactor);
                }

                if (doLog) {
                    console.info(angle, data.x, data.y)
                }
                log += ((angle - lastAngle) % 360) + 'deg, x:' + x + ', y:' + y + ' | '

                position.x += x;
                position.y += y;
                lastAngle = angle;
                // angleToAdd += angle;
            });

            if (doLog) {
                console.info(log, position);
            }

            let file = folders[partTimelineData.folder].file[partTimelineData.file];
            let assetWithId = file.name;

            let anchor = {
                x : partTimelineData.pivot_x != null ? partTimelineData.pivot_x : file.pivot_x,
                y : partTimelineData.pivot_y != null ? partTimelineData.pivot_y : file.pivot_y,
            }
            let parentKey = partKeyToParentKey[initialKey];
            model[initialKey] = CreatePartDef(initialKey, assetWithId, parentKey, anchor, { x : position.x / 10, y : position.y / 10 } );
            
            // console.info(initialKey, position, datas, initialAngle);
        });

        console.info(model);
    }

    return model;
}
let SpriterOverrideModels = function() {
    let entities = animationsRaw.entity;
    for(let i = 0; i < entities.length; ++i) {
        let entity = entities[i];
        if (entity && entity.name && Model[entity.name] && entity.animation) { // We have a Entity that has the same name as a model
            for(let j = 0; j < entity.animation.length; ++j) {
                if (entity.animation[j].name == 'DEFAULT') {
                    let newModel = CreatePIXIJSModelFromSpriterAnimation(entity.name, entity.animation[j], animationsRaw.folder, entity.obj_info);
                    if (newModel) {
                        Model[entity.name] = newModel;
                    }
                }
            }
        }
    }
}
// SpriterOverrideModels();

class AnimationDef extends TWEEN.Tween {
    constructor(modelPart, end, duration, waitDelay = 0) {
        super(modelPart);
        this.end = end;
        this.duration = duration;

        if (waitDelay > 0) {
            this.delay(waitDelay);
        }

        this.to(this.end, duration);

        this.onComplete((modelPart) => {
            modelPart = null;
            this._object = null;
        });
    }
}


    module.exports.AnimationDef = AnimationDef;
    module.exports.AnimationHelper = AnimationHelper;
    module.exports.HumanAnimationHelper = HumanAnimationHelper;
    module.exports.Animation = Animation;
} catch (e) {
    if (e.code !== 'MODULE_NOT_FOUND') {
        throw e;
    }
};

module.exports.buildModelPart = buildModelPart = (oldPartDef, newPartDef) => {
    oldPartDef = oldPartDef || {};
    newPartDef = newPartDef || {};
    let result = {
        id: newPartDef.id || oldPartDef.id,
        asset: newPartDef.asset || oldPartDef.asset,
        sprite: newPartDef.sprite || oldPartDef.sprite,
        parent: newPartDef.parent || oldPartDef.parent ||null,
        anchor: newPartDef.anchor || oldPartDef.anchor || {x: 0.5, y: 0.5},
        position: newPartDef.position || oldPartDef.position || {x: 0, y: 0},
        rotation: newPartDef.rotation || oldPartDef.rotation || 0,
        spriteID: newPartDef.spriteID || oldPartDef.spriteID || 0,
        UIModel: newPartDef.UIModel || oldPartDef.UIModel || null,
        z : newPartDef.z || oldPartDef.z || 0,
        tint : newPartDef.tint || oldPartDef.tint || null,
        hideParts : newPartDef.hideParts || [],
    };
    return result;
}

module.exports.buildModel = buildModel = (modelDef, modelPartsObj = {}) => {
    let newModel = {};
    let modelKeys = Object.keys(modelDef);
    for (let i = 0; i < modelKeys.length; i++) {
        let modelName = modelKeys[i];
        if (modelName == 'id') {
            newModel[modelName] = modelDef[modelName];
            continue;
        }
        newModel[modelName] = Object.assign({}, modelDef[modelName]);
    }

    let newModelKeys = Object.keys(modelPartsObj);
    for (let i = 0; i < newModelKeys.length; i++) {
        let modelName = newModelKeys[i];
        newModel[modelName] = Object.assign({}, newModel[modelName] || {}, modelPartsObj[modelName]);
    }
    return newModel;
}

module.exports.Model = Model;
module.exports.HairStyle = HairStyle;
module.exports.SpriteColor = SpriteColor;
module.exports.SpriteClothesColors = SpriteClothesColors;
module.exports.HairColors = HairColors;
module.exports.FacialStyles = FacialStyles;
module.exports.EyeColors = EyeColors;