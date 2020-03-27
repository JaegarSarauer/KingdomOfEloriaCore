const TWEEN = require('@tweenjs/tween.js');
const Get = require('./Getter.js').Get;

const HairStyle = {
    Bald : 0,
    Scruffy : 1,
    LeftSideSwipe : 2,
    RightSideSwipe : 3,
    Messy : 4,
    Buzzed : 5,
    Mohawk : 6, 
    Dreads : 7,
    MidlifeCrisis : 8
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

module.exports.Model = Model = {
    HUMAN : {
        id: "HUMAN",
        CHEST : {
            id: 'CHEST',
            asset: 'chestParts',
            sprite: 'humanChest',
            parent: null,
            spriteID: 1,
            anchor: {x: 0.5, y: 0.65},
            position: {x: 0, y: -16},
            rotation: 0,
            UIModel: null,
        },
        HEAD: {
            id: 'HEAD',
            asset: 'headParts',
            sprite: 'humanHead',
            parent: 'CHEST',
            spriteID: 1,
            anchor: {x: 0.5, y: 0.9},
            position: {x: 0, y: -0.55},
            rotation: 0,
            UIModel: null,
        },
        FACE: {
            id: 'FACE',
            asset: 'headParts',
            sprite: 'humanFace',
            parent: 'HEAD',
            spriteID: 1,
            anchor: {x: 0.5, y: 0.5},
            position: {x: 0, y: -0.44},
            rotation: 0,
            UIModel: null,
        },
        LEFT_ARM: {
            id: 'LEFT_ARM',
            asset: 'armParts',
            sprite: 'humanLeftShoulder',
            parent: 'CHEST',
            spriteID: 1,
            anchor: {x: 0.15, y: 0.15},
            position: {x: 0.32, y: -0.52},
            rotation: 0,
            UIModel: null,
        },
        RIGHT_ARM: {
            id: 'RIGHT_ARM',
            asset: 'armParts',
            sprite: 'humanRightShoulder',
            parent: 'CHEST',
            spriteID: 1,
            anchor: {x: 0.85, y: 0.15},
            position: {x: -0.32, y: -0.52},
            rotation: 0,
            UIModel: null,
        },
        RIGHT_LEG: {
            id: 'RIGHT_LEG',
            asset: 'legParts',
            sprite: 'humanRightThigh',
            parent: 'CHEST',
            spriteID: 1,
            anchor: {x: 0.5, y: 0},
            position: {x: -0.22, y: 0.22},
            rotation: 0,
            UIModel: null,
        },
        LEFT_LEG: {
            id: 'LEFT_LEG',
            asset: 'legParts',
            sprite: 'humanLeftThigh',
            parent: 'CHEST',
            spriteID: 1,
            anchor: {x: 0.5, y: 0},
            position: {x: 0.22, y: 0.22},
            rotation: 0,
            UIModel: null,
        },
        LEFT_FOREARM: {
            id: 'LEFT_FOREARM',
            asset: 'armParts',
            sprite: 'humanLeftForearm',
            parent: 'LEFT_ARM',
            spriteID: 1,
            anchor: {x: 0.5, y: 0},
            position: {x: 0.55, y: 0.65},
            rotation: 0,
            UIModel: null,
        },
        RIGHT_FOREARM: {
            id: 'RIGHT_FOREARM',
            asset: 'armParts',
            sprite: 'humanRightForearm',
            parent: 'RIGHT_ARM',
            spriteID: 1,
            anchor: {x: 0.5, y: 0},
            position: {x: -0.55, y: 0.65},
            rotation: 0,
            UIModel: null,
        },
        RIGHT_SHIN: {
            id: 'RIGHT_SHIN',
            asset: 'legParts',
            sprite: 'humanRightShin',
            parent: 'RIGHT_LEG',
            spriteID: 1,
            anchor: {x: 0.5, y: 0},
            position: {x: -0.095, y: 0.8},
            rotation: 0,
            UIModel: null,
        },
        LEFT_SHIN: {
            id: 'LEFT_SHIN',
            asset: 'legParts',
            sprite: 'humanLeftShin',
            parent: 'LEFT_LEG',
            spriteID: 1,
            anchor: {x: 0.5, y: 0},
            position: {x: 0.095, y: 0.8},
            rotation: 0,
            UIModel: null,
        },
    },
    GOBLIN: {
        id: "GOBLIN",
        CHEST: {
            id: 'CHEST',
            asset: 'chestParts',
            sprite: 'goblinChest',
            parent: null,
            spriteID: 0,
            anchor: {x: 0.5, y: 0.5},
            position: {x: 0, y: -16},
            rotation: 0,
            UIModel: null,
        },
        HEAD: {
            id: 'HEAD',
            asset: 'headParts',
            sprite: 'goblinHead',
            parent: 'CHEST',
            spriteID: 0,
            anchor: {x: 0.5, y: 0.95},
            position: {x: 0, y: -0.5},
            rotation: 0,
            UIModel: null,
        },
        RIGHT_ARM: {
            id: 'RIGHT_ARM',
            asset: 'armParts',
            sprite: 'goblinRightArm',
            parent: 'CHEST',
            spriteID: 0,
            anchor: {x: 0.5, y: 0.1},
            position: {x: -0.5, y: -0.38},
            rotation: 0,
            UIModel: null,
        },
        LEFT_ARM: {
            id: 'LEFT_ARM',
            asset: 'armParts',
            sprite: 'goblinLeftArm',
            parent: 'CHEST',
            spriteID: 0,
            anchor: {x: 0.5, y: 0},
            position: {x: 0.5, y: -0.38},
            rotation: 0,
            UIModel: null,
        },
        LEFT_FOREARM: {
            id: 'LEFT_FOREARM',
            asset: 'armParts',
            sprite: '',
            parent: 'LEFT_ARM',
            spriteID: 0,
            anchor: {x: 0, y: 0},
            position: {x: 0.25, y: 0.55},
            rotation: 0,
            UIModel: null,
        },
        RIGHT_FOREARM: {
            id: 'RIGHT_FOREARM',
            asset: 'armParts',
            sprite: '',
            parent: 'RIGHT_ARM',
            spriteID: 0,
            anchor: {x: 0, y: 0.8},
            position: {x: -0.25, y: 0.55},
            rotation: 0,
            UIModel: null,
        },
        RIGHT_LEG: {
            id: 'RIGHT_LEG',
            asset: 'legParts',
            sprite: 'goblinRightLeg',
            parent: 'CHEST',
            spriteID: 0,
            anchor: {x: 0.5, y: 0},
            position: {x: -0.16, y: 0.44},
            rotation: 0,
            UIModel: null,
        },
        LEFT_LEG: {
            id: 'LEFT_LEG',
            asset: 'legParts',
            sprite: 'goblinLeftLeg',
            parent: 'CHEST',
            spriteID: 0,
            anchor: {x: 0.5, y: 0},
            position: {x: 0.16, y: 0.44},
            rotation: 0,
            UIModel: null,
        },
    },
    CHICKEN: {
        id: 'CHICKEN',
        CHEST: {
            id: 'CHEST',
            asset: 'chestParts',
            sprite: 'chickenBody',
            parent: null,
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
    PINATA: {
        id: 'PINATA',
        CHEST: {
            id: 'CHEST',
            asset: 'chestParts',
            sprite: 'pinataBody',
            parent: null,
            spriteID: 1,
            anchor: {x: 0.5, y: 0.5},
            position: {x: 0, y: 0},
            rotation: 0,
            UIModel: null,
        },
        HEAD: {
            id: 'HEAD',
            asset: 'headParts',
            sprite: 'pinataHead',
            parent: 'CHEST',
            spriteID: 1,
            anchor: {x: 0.75, y: 0.75},
            position: {x: -0.5, y: -0.25},
            rotation: 0,
            UIModel: null,
        },
        UPPER_LEG_1: {
            id: 'UPPER_LEG_1',
            asset: 'legParts',
            sprite: 'pinataUpperLeg',
            parent: 'CHEST',
            spriteID: 1,
            anchor: {x: 0.5, y: 0.0},
            position: {x: -0.35, y: 0.32},
            rotation: 0.45,
            UIModel: null,
        },
        LOWER_LEG_1: {
            id: 'LOWER_LEG_1',
            asset: 'legParts',
            sprite: 'pinataBottomLeg',
            parent: 'UPPER_LEG_1',
            spriteID: 1,
            anchor: {x: 0.5, y: 0.0},
            position: {x: 0, y: 0.9},
            rotation: -0.45,
            UIModel: null,
        },
        UPPER_LEG_2: {
            id: 'UPPER_LEG_2',
            asset: 'legParts',
            sprite: 'pinataUpperLeg',
            parent: 'CHEST',
            spriteID: 1,
            anchor: {x: 0.5, y: 0.0},
            position: {x: -0.15, y: 0.35},
            rotation: 0.45,
            UIModel: null,
        },
        LOWER_LEG_2: {
            id: 'LOWER_LEG_2',
            asset: 'legParts',
            sprite: 'pinataBottomLeg',
            parent: 'UPPER_LEG_2',
            spriteID: 1,
            anchor: {x: 0.5, y: 0.0},
            position: {x: 0, y: 0.9},
            rotation: -0.45,
            UIModel: null,
        },
        UPPER_LEG_3: {
            id: 'UPPER_LEG_3',
            asset: 'legParts',
            sprite: 'pinataUpperLeg',
            parent: 'CHEST',
            spriteID: 1,
            anchor: {x: 0.5, y: 0.0},
            position: {x: 0.15, y: 0.35},
            rotation: 0.45,
            UIModel: null,
        },
        LOWER_LEG_3: {
            id: 'LOWER_LEG_3',
            asset: 'legParts',
            sprite: 'pinataBottomLeg',
            parent: 'UPPER_LEG_3',
            spriteID: 1,
            anchor: {x: 0.5, y: 0.0},
            position: {x: 0, y: 0.9},
            rotation: -0.45,
            UIModel: null,
        },
        UPPER_LEG_4: {
            id: 'UPPER_LEG_4',
            asset: 'legParts',
            sprite: 'pinataUpperLeg',
            parent: 'CHEST',
            spriteID: 1,
            anchor: {x: 0.5, y: 0.0},
            position: {x: 0.35, y: 0.35},
            rotation: 0.45,
            UIModel: null,
        },
        LOWER_LEG_4: {
            id: 'LOWER_LEG_4',
            asset: 'legParts',
            sprite: 'pinataBottomLeg',
            parent: 'UPPER_LEG_4',
            spriteID: 1,
            anchor: {x: 0.5, y: 0.0},
            position: {x: 0, y: 0.9},
            rotation: -0.45,
            UIModel: null,
        },
        TAIL: {
            id: 'TAIL',
            asset: 'tailParts',
            sprite: 'pinataTail',
            parent: 'CHEST',
            spriteID: 1,
            anchor: {x: 0.185, y: 0.185},
            position: {x: 0.45, y: 0.0},
            rotation: -0.25,
            UIModel: null,
        },
    },
    DUCK: {
        id: 'DUCK',
        CHEST: {
            id: 'CHEST',
            asset: 'chestParts',
            sprite: 'duckBody',
            parent: null,
            spriteID: 1,
            anchor: {x: 0.5, y: 0.5},
            position: {x: 0, y: 0},
            rotation: 0,
            UIModel: null,
        },
        HEAD: {
            id: 'HEAD',
            asset: 'headParts',
            sprite: 'duckHead',
            parent: 'CHEST',
            spriteID: 1,
            anchor: {x: 0.75, y: 0.75},
            position: {x: -0.35, y: -0.45},
            rotation: 0,
            UIModel: null,
        },
    },
    SEA_CREATURE: {
        id: 'SEA_CREATURE',
        HEAD: {
            id: 'HEAD',
            asset: 'headParts',
            sprite: 'crabHead',
            parent: null,
            spriteID: 1,
            anchor: {x: 0.5, y: 0.75},
            position: {x: 0, y: 0},
            rotation: 0,
            UIModel: null,
        },
        CLAW_RIGHT: {
            id: 'CLAW_RIGHT',
            asset: 'armParts',
            sprite: 'crabClawRight',
            parent: 'HEAD',
            spriteID: 1,
            anchor: {x: 0.5, y: 0.1},
            position: {x: -0.4, y: 0},
            rotation: 0,
            UIModel: null,
        },
        CLAW_LEFT: {
            id: 'CLAW_LEFT',
            asset: 'armParts',
            sprite: 'crabClawLeft',
            parent: 'HEAD',
            spriteID: 1,
            anchor: {x: 0.5, y: 0.1},
            position: {x: 0.3, y: 0},
            rotation: 0,
            UIModel: null,
        },
        LEG_RIGHT: {
            id: 'LEG_RIGHT',
            asset: 'legParts',
            sprite: 'crabRightLeg',
            parent: 'HEAD',
            spriteID: 1,
            anchor: {x: 0.5, y: 0.10},
            position: {x: -0.30, y: 0.08},
            rotation: 0,
            UIModel: null,
        },
        LEG_LEFT: {
            id: 'LEG_LEFT',
            asset: 'legParts',
            sprite: 'crabLeftLeg',
            parent: 'HEAD',
            spriteID: 1,
            anchor: {x: 0.5, y: 0.10},
            position: {x: 0.22, y: 0.08},
            rotation: 0,
            UIModel: null,
        },
    },
    CHICK: {
        id: 'CHICK',
        CHEST: {
            id: 'CHEST',
            asset: 'chestParts',
            sprite: 'chickBody',
            parent: null,
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
    RAT: {
        id: "RAT",
        CHEST: {
            id: 'CHEST',
            asset: 'chestParts',
            sprite: 'mediumRatBody',
            parent: null,
            spriteID: 1,
            anchor: {x: 0.5, y: 0.5},
            position: {x: 0, y: 0},
            rotation: 0,
            UIModel: null,
        },
        LEGS: {
            id: 'LEGS',
            asset: 'legParts',
            sprite: 'mediumRatLegs',
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
            sprite: 'mediumRatTail',
            parent: 'CHEST',
            spriteID: 1,
            anchor: {x: 0.1, y: 0.5},
            position: {x: 0.25, y: 0.15},
            rotation: 0,
            UIModel: null,
        },
    },
    GHOST: {
        id: 'GHOST',
        CHEST: {
            id: 'CHEST',
            asset: 'chestParts',
            sprite: 'ghostChest',
            parent: null,
            spriteID: 0,
            anchor: {x: 0.5, y: 0.5},
            position: {x: 0, y: 0},
            rotation: 0,
            UIModel: null,
        },
        RIGHT_ARM: {
            id: 'RIGHT_ARM',
            asset: 'armParts',
            sprite: 'ghostRightArm',
            parent: 'CHEST',
            spriteID: 0,
            anchor: {x: 0.5, y: 0.15},
            position: {x: -0.5, y: -0.38},
            rotation: 0,
            UIModel: null,
        },
        LEFT_ARM: {
            id: 'LEFT_ARM',
            asset: 'armParts',
            sprite: 'ghostLeftArm',
            parent: 'CHEST',
            spriteID: 0,
            anchor: {x: 0.5, y: 0.15},
            position: {x: 0.5, y: -0.38},
            rotation: 0,
            UIModel: null,
        },
    },
    CAVECRAWLER : {
        id: "CAVECRAWLER",
        CHEST: {
            id: 'CHEST',
            asset: 'chestParts',
            sprite: 'caveCrawlerChest',
            parent: null,
            spriteID: 1,
            anchor: {x: 0.5, y: 0.5},
            position: {x: 0, y: 0},
            rotation: 0,
            UIModel: null,
        },
        HEAD: {
            id: 'HEAD',
            asset: 'headParts',
            sprite: 'caveCrawlerHead',
            parent: 'CHEST',
            spriteID: 1,
            anchor: {x: 0.5, y: 0.9},
            position: {x: 0, y: -0.35},
            rotation: 0,
            UIModel: null,
        },
        RIGHT_ARM: {
            id: 'RIGHT_ARM',
            asset: 'armParts',
            sprite: 'caveCrawlerRightArm',
            parent: 'CHEST',
            spriteID: 1,
            anchor: {x: 0.9, y: 0.5},
            position: {x: -0.2, y: -0.25},
            rotation: 0,
            UIModel: null,
        },
        LEFT_ARM: {
            id: 'LEFT_ARM',
            asset: 'armParts',
            sprite: 'caveCrawlerLeftArm',
            parent: 'CHEST',
            spriteID: 1,
            anchor: {x: 0.1, y: 0.5},
            position: {x: 0.2, y: -0.25},
            rotation: 0,
            UIModel: null,
        },
        INNER_RIGHT_LEG: {
            id: 'INNER_RIGHT_LEG',
            asset: 'legParts',
            sprite: 'caveCrawlerInnerRightLeg',
            parent: 'CHEST',
            spriteID: 1,
            anchor: {x: 0.8, y: 0.2},
            position: {x: -0.15, y: 0.15},
            rotation: 0,
            UIModel: null,
        },
        OUTER_RIGHT_LEG: {
            id: 'OUTER_RIGHT_LEG',
            asset: 'legParts',
            sprite: 'caveCrawlerOuterRightLeg',
            parent: 'CHEST',
            spriteID: 1,
            anchor: {x: 0.8, y: 0.2},
            position: {x: -0.25, y: 0.02},
            rotation: 0,
            UIModel: null,
        },
        INNER_LEFT_LEG: {
            id: 'INNER_LEFT_LEG',
            asset: 'legParts',
            sprite: 'caveCrawlerInnerLeftLeg',
            parent: 'CHEST',
            spriteID: 1,
            anchor: {x: 0.2, y: 0.2},
            position: {x: 0.15, y: 0.15},
            rotation: 0,
            UIModel: null,
        },
        OUTER_LEFT_LEG: {
            id: 'OUTER_LEFT_LEG',
            asset: 'legParts',
            sprite: 'caveCrawlerOuterLeftLeg',
            parent: 'CHEST',
            spriteID: 1,
            anchor: {x: 0.2, y: 0.2},
            position: {x: 0.25, y: 0.02},
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
    FOUR_LEGGED_MAMMAL: {
        id: 'FOUR_LEGGED_MAMMAL',
        CORE: {
            id: 'CORE',
            asset: 'chestParts',
            parent: null,
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
            position: {x: 0, y: 0},
            rotation: 0,
            UIModel: null,
        },
        FRONT_HIDDEN_THIGH: {
            id: 'FRONT_HIDDEN_THIGH',
            asset: 'legParts',
            parent: 'HIDDEN_CHEST',
            spriteID: 1,
            anchor: {x: 0.5, y: 0.1},
            position: {x: -0.15, y: 0.1},
            rotation: 0.0,
            UIModel: null,
        },
        FRONT_HIDDEN_SHIN: {
            id: 'FRONT_HIDDEN_SHIN',
            asset: 'legParts',
            parent: 'FRONT_HIDDEN_THIGH',
            spriteID: 1,
            anchor: {x: 0.5, y: 0.1},
            position: {x: 0.05, y: 0.9},
            rotation: 0.0,
            UIModel: null,
        },
        BACK_HIDDEN_THIGH: {
            id: 'BACK_HIDDEN_THIGH',
            asset: 'legParts',
            parent: 'HIDDEN_CHEST',
            spriteID: 1,
            anchor: {x: 0.5, y: 0.1},
            position: {x: 0.35, y: 0.05},
            rotation: 0.0,
            UIModel: null,
        },
        BACK_HIDDEN_SHIN: {
            id: 'BACK_HIDDEN_SHIN',
            asset: 'legParts',
            parent: 'BACK_HIDDEN_THIGH',
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
            position: {x: 0, y: 0},
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
        FRONT_VISIBLE_THIGH: {
            id: 'FRONT_VISIBLE_THIGH',
            asset: 'legParts',
            parent: 'CHEST',
            spriteID: 1,
            anchor: {x: 0.5, y: 0.1},
            position: {x: -0.3, y: 0.2},
            rotation: 0.0,
            UIModel: null,
        },
        FRONT_VISIBLE_SHIN: {
            id: 'FRONT_VISIBLE_SHIN',
            asset: 'legParts',
            parent: 'FRONT_VISIBLE_THIGH',
            spriteID: 1,
            anchor: {x: 0.5, y: 0.1},
            position: {x: 0.05, y: 0.9},
            rotation: 0.0,
            UIModel: null,
        },
        BACK_VISIBLE_THIGH: {
            id: 'BACK_VISIBLE_THIGH',
            asset: 'legParts',
            parent: 'CHEST',
            spriteID: 1,
            anchor: {x: 0.5, y: 0.1},
            position: {x: 0.2, y: 0.15},
            rotation: 0.0,
            UIModel: null,
        },
        BACK_VISIBLE_SHIN: {
            id: 'BACK_VISIBLE_SHIN',
            asset: 'legParts',
            parent: 'BACK_VISIBLE_THIGH',
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
};

module.exports.ModelPart = ModelPart = {
    
};

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
            Part : this.modelParts.RIGHT_ARM,
            Transform : this.transforms.RIGHT_SHOULDER.STRAIGHT_UP,
            Speed : speed
        });
        return this;
    }

    RightArmAngleUp(speed) {
        this.animations.push({
            Part : this.modelParts.RIGHT_ARM,
            Transform : this.transforms.RIGHT_SHOULDER.ANGLE_UP,
            Speed : speed
        });
        return this;
    }

    RightArmAngleDown(speed) {
        this.animations.push({
            Part : this.modelParts.RIGHT_ARM,
            Transform : this.transforms.RIGHT_SHOULDER.ANGLE_DOWN,
            Speed : speed
        });
        return this;
    }

    RightArmAngleBack(speed) {
        this.animations.push({
            Part : this.modelParts.RIGHT_ARM,
            Transform : this.transforms.RIGHT_SHOULDER.ANGLE_BACK,
            Speed : speed
        });
        return this;
    }

    LeftArmAngleUp(speed) {
        this.animations.push({
            Part : this.modelParts.LEFT_ARM,
            Transform : this.transforms.LEFT_SHOULDER.ANGLE_UP,
            Speed : speed
        });
        return this;
    }

    LeftArmAngleDown(speed) {
        this.animations.push({
            Part : this.modelParts.LEFT_ARM,
            Transform : this.transforms.LEFT_SHOULDER.ANGLE_DOWN,
            Speed : speed
        });
        return this;
    }

    LeftArmAngleBack(speed) {
        this.animations.push({
            Part : this.modelParts.LEFT_ARM,
            Transform : this.transforms.LEFT_SHOULDER.ANGLE_BACK,
            Speed : speed
        });
        return this;
    }
    
    RightArmStraight(speed) {
        this.animations.push({
            Part : this.modelParts.RIGHT_ARM,
            Transform : this.transforms.RIGHT_SHOULDER.STRAIGHT_FORWARD,
            Speed : speed
        });
        return this;
    }
    
    RightArmRelax(speed) {
        this.animations.push({
            Part : this.modelParts.RIGHT_ARM,
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
            Part : this.modelParts.LEFT_ARM,
            Transform : this.transforms.LEFT_SHOULDER.STRAIGHT_UP,
            Speed : speed
        });
        return this;
    }
    
    LeftArmStraight(speed) {
        this.animations.push({
            Part : this.modelParts.LEFT_ARM,
            Transform : this.transforms.LEFT_SHOULDER.STRAIGHT_FORWARD,
            Speed : speed
        });
        return this;
    }
    
    LeftArmRelax(speed) {
        this.animations.push({
            Part : this.modelParts.LEFT_ARM,
            Transform : this.transforms.LEFT_SHOULDER.NEUTRAL,
            Speed : speed
        });
        return this;
    }

    LeftThighRelax(speed) {
        this.animations.push({
            Part : this.modelParts.LEFT_LEG,
            Transform : this.transforms.LEFT_THIGH.NEUTRAL,
            Speed : speed
        });
        return this;
    }

    LeftThighAngleDown(speed) {
        this.animations.push({
            Part : this.modelParts.LEFT_LEG,
            Transform : this.transforms.LEFT_THIGH.ANGLE_DOWN,
            Speed : speed
        });
        return this;
    }

    LeftThighStraight(speed) {
        this.animations.push({
            Part : this.modelParts.LEFT_LEG,
            Transform : this.transforms.LEFT_THIGH.STRAIGHT,
            Speed : speed
        });
        return this;
    }

    LeftThighAngleUp(speed) {
        this.animations.push({
            Part : this.modelParts.LEFT_LEG,
            Transform : this.transforms.LEFT_THIGH.ANGLE_UP,
            Speed : speed
        });
        return this;
    }

    LeftThighAngleBack(speed) {
        this.animations.push({
            Part : this.modelParts.LEFT_LEG,
            Transform : this.transforms.LEFT_THIGH.ANGLE_BACK,
            Speed : speed
        });
        return this;
    }


    RightThighRelax(speed) {
        this.animations.push({
            Part : this.modelParts.RIGHT_LEG,
            Transform : this.transforms.RIGHT_THIGH.NEUTRAL,
            Speed : speed
        });
        return this;
    }

    RightThighAngleDown(speed) {
        this.animations.push({
            Part : this.modelParts.RIGHT_LEG,
            Transform : this.transforms.RIGHT_THIGH.ANGLE_DOWN,
            Speed : speed
        });
        return this;
    }

    RightThighStraight(speed) {
        this.animations.push({
            Part : this.modelParts.RIGHT_LEG,
            Transform : this.transforms.RIGHT_THIGH.STRAIGHT,
            Speed : speed
        });
        return this;
    }

    RightThighAngleUp(speed) {
        this.animations.push({
            Part : this.modelParts.RIGHT_LEG,
            Transform : this.transforms.RIGHT_THIGH.ANGLE_UP,
            Speed : speed
        });
        return this;
    }

    RightThighAngleBack(speed) {
        this.animations.push({
            Part : this.modelParts.RIGHT_LEG,
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

const FourLeggedAnimationHelper = class {
    constructor(millisecondDuration) {
        this.millisecondDuration = millisecondDuration;
        this.animations = [];
        this.part = null;
        this.angleMultiplier = 1;
    }

    SetAngleMultiplier(multiplier) {
        this.angleMultiplier = multiplier;
        return this;
    }

    SetPart(part) {
        this.part = part;
        return this;
    }

    ChestNeutral(speed) {
        this.animations.push({
            Part : this.part,
            Transform : {rotation : 0, x : 0, y: 0},
            Speed : speed
        });
        return this;
    }

    TailNeutral(speed) {
        this.animations.push({
            Part : this.part,
            Transform : {rotation : 0},
            Speed : speed
        });
        return this;
    }

    TailUp(speed) {
        this.animations.push({
            Part : this.part,
            Transform : {rotation: toRadians(-120) * this.angleMultiplier },
            Speed : speed
        });
        return this;
    }

    ChestUp(speed) {
        this.animations.push({
            Part : this.part,
            Transform : {rotation: toRadians(70) * this.angleMultiplier, x : 15 * this.angleMultiplier, y: -10 },
            Speed : speed
        });
        return this;
    }


    ThighForwardReach(speed) {
        this.animations.push({
            Part : this.part,
            Transform : {rotation: toRadians(70) * this.angleMultiplier},
            Speed : speed
        });
        return this;
    }

    ThighForward(speed) {
        this.animations.push({
            Part : this.part,
            Transform : {rotation: toRadians(30) * this.angleMultiplier},
            Speed : speed
        });
        return this;
    }

    ThighBackwards(speed) {
        this.animations.push({
            Part : this.part,
            Transform : {rotation: toRadians(-30) * this.angleMultiplier},
            Speed : speed
        });
        return this;
    }
    ThighNeutral(speed) {
        this.animations.push({
            Part : this.part,
            Transform : {rotation : 0},
            Speed : speed
        });
        return this;
    }
    ShinNeutral(speed) {
        this.animations.push({
            Part : this.part,
            Transform : {rotation : 0},
            Speed : speed
        });
        return this;
    }
    ShinBend(speed) {
        this.animations.push({
            Part : this.part,
            Transform : {rotation: toRadians(-30) * this.angleMultiplier},
            Speed : speed
        });
        return this;
    }

    Start() {
        let now = new Date().getTime();
        let part = this.part;
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
            this.part = null;
            this.angleMultiplier = 1;
        }
    }
}

const Animation = {
    FOUR_LEGGED_MAMMAL: {
        WALK: (modelParts, params) => {
            let xChange = (params.xTileChange || 0) * 64;
            let yChange = (params.yTileChange || 0) * 64;
            let dir = xChange <= 0 ? 1 : -1; //going left rotate left, going right rotate right
            
            modelParts.CORE.ownerSprite.reset();
            modelParts.CORE.x -= xChange;
            modelParts.CORE.y -= yChange;
            modelParts.CHEST.scale.x = Math.abs(modelParts.CORE.scale.x) * dir;
            modelParts.HIDDEN_CHEST.scale.x = Math.abs(modelParts.CORE.scale.x) * dir;
            new AnimationDef(modelParts.CORE, {
                x: modelParts.CORE.x + xChange,
                y: modelParts.CORE.y + yChange,
            }, 500).start();

            let helper = new FourLeggedAnimationHelper(492);
            helper.SetPart(modelParts.FRONT_VISIBLE_THIGH).ThighForward('FAST').ThighNeutral('FAST').ThighBackwards('FAST').ThighNeutral('FAST').Start();
            helper.SetPart(modelParts.FRONT_VISIBLE_SHIN).ShinBend('FAST').ShinNeutral('FAST').Start();

            helper.SetPart(modelParts.FRONT_HIDDEN_THIGH).ThighBackwards('FAST').ThighNeutral('FAST').ThighForward('FAST').ThighNeutral('FAST').Start();
            helper.SetPart(modelParts.FRONT_HIDDEN_SHIN).ShinNeutral('FAST').ShinBend('FAST').ShinNeutral('FAST').Start();
            
            helper.SetPart(modelParts.BACK_HIDDEN_THIGH).ThighForward('FAST').ThighNeutral('FAST').ThighBackwards('FAST').ThighNeutral('FAST').Start();
            helper.SetPart(modelParts.BACK_HIDDEN_SHIN).ShinBend('FAST').ShinNeutral('FAST').Start();

            helper.SetPart(modelParts.BACK_VISIBLE_THIGH).ThighBackwards('FAST').ThighNeutral('FAST').ThighForward('FAST').ThighNeutral('FAST').Start();
            helper.SetPart(modelParts.BACK_VISIBLE_SHIN).ShinNeutral('FAST').ShinBend('FAST').ShinNeutral('FAST').Start();

            new AnimationDef(modelParts.HEAD, {rotation: Math.PI / 8}, 500 / 2).repeat(1).yoyo(true).start();
            new AnimationDef(modelParts.TAIL, {rotation: -Math.PI / 8}, 500 / 4).repeat(2).yoyo(true).start();
        },
        ATTACK_MELEE: (modelParts, params) => {
            let helper = new FourLeggedAnimationHelper(492);

            // Facing right
            if (params.x > 0) {
                modelParts.CHEST.scale.x =  -1;
                modelParts.HIDDEN_CHEST.scale.x = -1;

                helper.SetPart(modelParts.CHEST).SetAngleMultiplier(-1).ChestUp('FAST').ChestUp('SLOW').ChestNeutral('FAST').Start();
                helper.SetPart(modelParts.HIDDEN_CHEST).SetAngleMultiplier(-1).ChestUp('FAST').ChestUp('SLOW').ChestNeutral('FAST').Start();
            }
            // Facing left
            else {
                modelParts.CHEST.scale.x =  1;
                modelParts.HIDDEN_CHEST.scale.x = 1;
                
                helper.SetPart(modelParts.CHEST).ChestUp('FAST').ChestUp('SLOW').ChestNeutral('FAST').Start();
                helper.SetPart(modelParts.HIDDEN_CHEST).ChestUp('FAST').ChestUp('SLOW').ChestNeutral('FAST').Start();
            }

            helper.SetPart(modelParts.FRONT_VISIBLE_THIGH).ThighForwardReach('FAST').ThighForwardReach('SLOW').ThighNeutral('FAST').Start();
            helper.SetPart(modelParts.FRONT_HIDDEN_THIGH).ThighForwardReach('FAST').ThighForwardReach('FAST').ThighNeutral('FAST').Start();

            helper.SetPart(modelParts.BACK_VISIBLE_THIGH).ThighBackwards('FAST').ThighBackwards('FAST').ThighNeutral('FAST').Start();
            helper.SetPart(modelParts.BACK_HIDDEN_THIGH).ThighBackwards('FAST').ThighBackwards('FAST').ThighNeutral('FAST').Start();
            
            helper.SetPart(modelParts.BACK_VISIBLE_SHIN).ShinBend('FAST').ShinBend('FAST').ShinNeutral('FAST').Start();
            helper.SetPart(modelParts.BACK_HIDDEN_SHIN).ShinBend('FAST').ShinBend('FAST').ShinNeutral('FAST').Start();
        },
        ATTACK_RANGE: (modelParts, params) => {
            let helper = new FourLeggedAnimationHelper(492);
            helper.SetPart(modelParts.TAIL).TailUp('FAST').TailNeutral('FAST').TailNeutral('SLOW').TailNeutral('SLOW').Start();
        },
    },
    HUMAN: {
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
            let helper = new AnimationHelper();

            if (Math.abs(xChange) > 0) {
                let dir = xChange < 0 ? 1 : -1; //going left rotate left, going right rotate right
                let stepSize = Math.PI / 10;//(Math.abs(params.xTileChange) + Math.abs(params.yTileChange)) > 1 ? Math.PI / 6: Math.PI / 8;

                let firstFoot = xChange < 0 ? modelParts.RIGHT_LEG : modelParts.LEFT_LEG;
                helper.createRotationAnimationChain(firstFoot, [dir * stepSize,- dir * stepSize * 0.75,- dir * stepSize,0], 125);
                let firstShin = xChange < 0 ? modelParts.RIGHT_SHIN : modelParts.LEFT_SHIN;
                helper.createRotationAnimationChain(firstShin, [-dir * stepSize / 4, -dir * stepSize, -dir * stepSize * 1.25, 0], 125);
                // let firstArm = xChange < 0 ? modelParts.RIGHT_ARM : modelParts.LEFT_ARM;
                // helper.createRotationAnimationChain(firstArm, [-dir * stepSize * 1.5, dir * stepSize * 0.75, dir * stepSize * 1.5, 0 ], 125);
                // let firstForearm = xChange < 0 ? modelParts.RIGHT_FOREARM : modelParts.LEFT_FOREARM;
                // helper.createRotationAnimationChain(firstForearm, [0,  dir * stepSize, dir * stepSize / 2, 0], 125); //(150, 250, 100)
                let secondFoot = xChange < 0 ? modelParts.LEFT_LEG : modelParts.RIGHT_LEG;
                helper.createRotationAnimationChain(secondFoot,  [-dir * stepSize * 0.75, dir * stepSize * 1.5, dir * stepSize * 1.5, 0 ], 125);
                let secondShin = xChange < 0 ? modelParts.LEFT_SHIN : modelParts.RIGHT_SHIN;
                helper.createRotationAnimationChain(secondShin,  [-dir * stepSize,-dir * stepSize * 1.75, -dir * stepSize * 2.5, 0 ], 125);
                // let secondArm = xChange < 0 ? modelParts.LEFT_ARM : modelParts.RIGHT_ARM;
                // helper.createRotationAnimationChain(secondArm,  [dir * stepSize * 1.5,-dir * stepSize * 0.75, -dir * stepSize * 1.5, 0 ], 125);
                // let secondForearm = xChange < 0 ? modelParts.LEFT_FOREARM : modelParts.RIGHT_FOREARM;
                // helper.createRotationAnimationChain(secondForearm,  [dir * stepSize, dir * stepSize / 2, 0, 0 ], 125);
            }
            // Walking vertically
            else if (Math.abs(yChange) > 0) {
            
                let firstFoot = yChange < 0 ? modelParts.RIGHT_LEG : modelParts.LEFT_LEG;
                helper.createPropertyAnimationChain(firstFoot.scale, "y", [1.25, 1, 0.75, 1.0], 125);
                // let secondArm = yChange < 0 ? modelParts.LEFT_ARM : modelParts.RIGHT_ARM;
                // helper.createPropertyAnimationChain(secondArm.scale, "y", [1.25, 1, 0.75, 1.0], 125);
                let secondFoot = yChange < 0 ? modelParts.LEFT_LEG : modelParts.RIGHT_LEG;
                helper.createPropertyAnimationChain(secondFoot.scale, "y", [0.75, 1, 1.25, 1.0], 125);
                // let firstArm = yChange < 0 ? modelParts.RIGHT_ARM : modelParts.LEFT_ARM;
                // helper.createPropertyAnimationChain(firstArm.scale, "y", [0.75, 1, 1.25, 1.0], 125);
            }
            
        },
        ATTACK_MELEE: (modelParts, params) => {
            modelParts.LEFT_ARM.reset();
            modelParts.LEFT_FOREARM.reset();
            modelParts.RIGHT_ARM.reset();
            modelParts.RIGHT_FOREARM.reset();

            let helper = new AnimationHelper();

            helper.createRotationAnimationChain(modelParts.RIGHT_ARM, [- Math.PI / 4, Math.PI / 8, 3 * Math.PI / 4,  0 ], 100);
            helper.createRotationAnimationChain(modelParts.RIGHT_FOREARM, [2 * Math.PI / 4, Math.PI / 4, Math.PI / 8, 0 ], 100);
            helper.createRotationAnimationChain(modelParts.LEFT_ARM, [Math.PI / 8, Math.PI / 4, Math.PI / 8, 0 ], 100);

        },
        ACTION: (modelParts, params) => {
            let helper = new HumanAnimationHelper(modelParts, params, 300);
            helper.LeftElbowBendAcute("FAST").LeftElbowRelax("FAST").Start();
            helper.RightElbowBendAcute("FAST").RightElbowRelax("FAST").Start();
        },
        DEFEND: (modelParts, params) => {
            modelParts.LEFT_FOREARM.reset();
            modelParts.LEFT_ARM.reset();
            new AnimationDef(modelParts.LEFT_ARM, {rotation: Math.PI / 4}, 250).repeat(1).yoyo(true).start();
            new AnimationDef(modelParts.LEFT_FOREARM, {rotation: Math.PI / 8}, 200).repeat(1).yoyo(true).start();
        },
        ATTACK_RANGE: (modelParts, params) => {
            let helper = new HumanAnimationHelper(modelParts, params, 500);
            helper.RightArmAngleUp("FAST").RightArmAngleUp("SLOW").RightArmRelax("FAST").Start();
            helper.LeftElbowBendAcute("FAST").LeftElbowBendObtuse("SLOW").LeftElbowBendAcute("FAST").LeftElbowRelax("FAST").Start();
            helper.LeftArmAngleBack("FAST").LeftArmAngleDown("SLOW").LeftArmRelax("FAST").Start();
        },
        ATTACK_MAGIC: (modelParts, params) => {
            let helper = new HumanAnimationHelper(modelParts, params, 500);
            helper.LeftElbowBendObtuse("SLOW").LeftElbowRelax("FAST").Start();
            helper.RightArmStraight("FAST").RightArmStraight("SLOW").RightElbowRelax("SLOW").Start();
        },
        WOODCUT: (modelParts, params) => {
            let helper = new HumanAnimationHelper(modelParts, params, 500);
            let animationHelper = new AnimationHelper();
            helper.RightArmStraight("FAST").RightArmUp("SLOW").RightArmAngleUp("FAST").RightArmAngleUp("SLOW").RightArmRelax("SLOW").Start();
            animationHelper.createPropertyAnimationChain(modelParts.RIGHT_FOREARM.scale, "x", [0.9, 0.65, 0.9, 1.0], 100);
        },
        MINE: (modelParts, params) => {
            let helper = new HumanAnimationHelper(modelParts, params, 500);
            helper.RightArmStraight("SLOW").RightArmUp("SLOW").RightArmStraight("FAST").RightArmRelax("FAST").Start();
            helper.RightElbowBendAcute("SLOW").RightElbowRelax("FAST").Start();
        },
        SMELT: (modelParts, params) => { //Skipped
            let helper = new HumanAnimationHelper(modelParts, params, 300);
            helper.LeftElbowBendAcute("SLOW").LeftElbowRelax("FAST").Start();
            helper.RightElbowBendObtuse("SLOW").RightElbowRelax("FAST").Start();
        },
        STRIKE_ANVIL: (modelParts, params) => {
            let helper = new HumanAnimationHelper(modelParts, params, 500);
            helper.RightArmStraight("SLOW").RightArmUp("SLOW").RightArmStraight("FAST").RightArmRelax("FAST").Start();
            helper.RightElbowBendAcute("SLOW").RightElbowRelax("FAST").Start();
        },
        FLETCH: (modelParts, params) => {
            let helper = new HumanAnimationHelper(modelParts, params, 500);
            helper.LeftArmAngleDown("FAST").LeftArmAngleDown("SLOW").LeftArmRelax("SLOW").Start();
            helper.LeftElbowBendObtuse("FAST").LeftElbowRelax("FAST").LeftElbowBendAcute("FAST").LeftElbowRelax("SLOW").Start();
        },
        TALK_INVOKE: (modelParts, params) => {
            let helper = new HumanAnimationHelper(modelParts, params, 500);
            helper.LeftElbowBendAcute("SLOW").LeftElbowRelax("FAST").Start();
            helper.LeftArmAngleUp("SLOW").LeftArmRelax("SLOW").Start();
            helper.RightElbowBendAcute("SLOW").RightElbowRelax("FAST").Start();
            helper.RightArmAngleUp("SLOW").RightArmRelax("SLOW").Start();
        },
        EQUIP_RIGHT_ARM_SHEATH: (modelParts, params) => {
            let helper = new HumanAnimationHelper(modelParts, params, 500);
            helper.RightArmAngleBack("FAST").RightArmAngleUp("SLOW").RightArmRelax("SLOW").Start();
        },
        EQUIP_RIGHT_ARM_BACK: (modelParts, params) => {
            let helper = new HumanAnimationHelper(modelParts, params, 500);
            helper.RightArmUp("FAST").RightArmAngleDown("SLOW").RightArmRelax("SLOW").Start();
            helper.RightElbowBendObtuse("FAST").RightElbowBendAcute("SLOW").RightArmRelax("SLOW").Start();
        },
        EQUIP_LEFT_ARM_SHEATH: (modelParts, params) => {
            let helper = new HumanAnimationHelper(modelParts, params, 500);
            helper.LeftArmAngleBack("FAST").LeftArmAngleUp("SLOW").LeftArmRelax("SLOW").Start();
        },
        EQUIP_LEFT_ARM_BACK: (modelParts, params) => {
            let helper = new HumanAnimationHelper(modelParts, params, 500);
            helper.LeftArmUp("FAST").LeftArmAngleDown("SLOW").LeftArmRelax("SLOW").Start();
            helper.LeftElbowBendObtuse("FAST").LeftElbowBendAcute("SLOW").LeftArmRelax("SLOW").Start();
        },
    },
    GOBLIN: {
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
                let firstFoot = xChange < 0 ? modelParts.RIGHT_LEG : modelParts.LEFT_LEG;
                let secondFoot = xChange < 0 ? modelParts.LEFT_LEG : modelParts.RIGHT_LEG;

                let stepSize = Math.PI / 8;//(Math.abs(params.xTileChange) + Math.abs(params.yTileChange)) > 1 ? Math.PI / 6: Math.PI / 8;
                new AnimationDef(firstFoot, {rotation: dir * stepSize }, 125).chain( // Swing out fast (100)
                    new AnimationDef(firstFoot, {rotation: -dir * stepSize}, 250).chain( // Resistance met on ground til foot behind (250)
                        new AnimationDef(firstFoot, {rotation: 0}, 125) // Return to stationary (500)
                    )
                ).start();
                new AnimationDef(secondFoot, {rotation: -dir * stepSize}, 125).chain( // Wait til first foot is out (75) then swing fast (150)
                    new AnimationDef(secondFoot, {rotation: dir * stepSize}, 250).chain( //Swing down to ground fast (200)
                        new AnimationDef(secondFoot, {rotation: 0}, 125)
                    )
                ).start();
            }
            // Walking vertically
            else if (Math.abs(yChange) > 0) {
                let firstFoot = yChange < 0 ? modelParts.RIGHT_LEG : modelParts.LEFT_LEG;
                let secondFoot = yChange < 0 ? modelParts.LEFT_LEG : modelParts.RIGHT_LEG;
                
                new AnimationDef(firstFoot.scale, { y : 1.25 }, 125).chain( // Swing out fast (100)
                    new AnimationDef(firstFoot.scale, { y : 0.75 }, 250).chain( // Swing out fast (100)
                        new AnimationDef(firstFoot.scale, { y : 1.0 }, 125)
                    )
                ).start();

                new AnimationDef(secondFoot.scale, { y : 0.75 }, 125).chain( // Swing out fast (100)
                    new AnimationDef(secondFoot.scale, { y : 1.25 }, 250).chain( // Swing out fast (100)
                        new AnimationDef(secondFoot.scale, { y : 1.0 }, 125)
                    )
                ).start();
            }
            
        },
        ATTACK_MELEE: (modelParts, params) => {
            modelParts.RIGHT_ARM.reset();
            new AnimationDef(modelParts.RIGHT_ARM, {rotation: 3 * Math.PI / 4}, 250).repeat(1).yoyo(true).start();

        },
        ACTION: (modelParts, params) => {
            modelParts.RIGHT_ARM.reset();
            new AnimationDef(modelParts.RIGHT_ARM, {rotation: 3 * Math.PI / 4}, 250).repeat(1).yoyo(true).start();
        },
        DEFEND: (modelParts, params) => {
            modelParts.LEFT_ARM.reset();
            new AnimationDef(modelParts.LEFT_ARM, {rotation: Math.PI / 4}, 250).repeat(1).yoyo(true).start();
        }
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
                let firstFoot = xChange < 0 ? modelParts.INNER_RIGHT_LEG : modelParts.INNER_LEFT_LEG;
                let secondFoot = xChange < 0 ? modelParts.INNER_LEFT_LEG : modelParts.INNER_RIGHT_LEG;
                let firstFoot2 = xChange < 0 ? modelParts.OUTER_RIGHT_LEG : modelParts.OUTER_LEFT_LEG;
                let secondFoot2 = xChange < 0 ? modelParts.OUTER_LEFT_LEG : modelParts.OUTER_RIGHT_LEG;

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
                let firstFoot = xChange < 0 ? modelParts.INNER_RIGHT_LEG : modelParts.INNER_LEFT_LEG;
                let secondFoot = xChange < 0 ? modelParts.INNER_LEFT_LEG : modelParts.INNER_RIGHT_LEG;
                let firstFoot2 = xChange < 0 ? modelParts.OUTER_RIGHT_LEG : modelParts.OUTER_LEFT_LEG;
                let secondFoot2 = xChange < 0 ? modelParts.OUTER_LEFT_LEG : modelParts.OUTER_RIGHT_LEG;
                
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
            modelParts.RIGHT_ARM.reset();
            modelParts.LEFT_ARM.reset();
            new AnimationDef(modelParts.RIGHT_ARM, {rotation: 3 * Math.PI / 4}, 100).chain(
                new AnimationDef(modelParts.RIGHT_ARM, {rotation: 0}, 175).chain(
                    new AnimationDef(modelParts.RIGHT_ARM, {rotation: 3 * Math.PI / 4}, 75).chain(
                        new AnimationDef(modelParts.RIGHT_ARM, {rotation: 0}, 200)
                    )
                )
            ).start();
            new AnimationDef(modelParts.LEFT_ARM, {rotation: -3 * Math.PI / 4}, 125).chain(
                new AnimationDef(modelParts.LEFT_ARM, {rotation: 0}, 160).chain(
                    new AnimationDef(modelParts.LEFT_ARM, {rotation: -3 * Math.PI / 4}, 50).chain(
                        new AnimationDef(modelParts.LEFT_ARM, {rotation: 0}, 150)
                    )
                )
            ).start();

        },
        ACTION: (modelParts, params) => {
            modelParts.RIGHT_ARM.reset();
            modelParts.LEFT_ARM.reset();
            new AnimationDef(modelParts.RIGHT_ARM, {rotation: 3 * Math.PI / 4}, 100).chain(
                new AnimationDef(modelParts.RIGHT_ARM, {rotation: 0}, 175).chain(
                    new AnimationDef(modelParts.RIGHT_ARM, {rotation: 3 * Math.PI / 4}, 75).chain(
                        new AnimationDef(modelParts.RIGHT_ARM, {rotation: 0}, 200)
                    )
                )
            ).start();
            new AnimationDef(modelParts.LEFT_ARM, {rotation: -3 * Math.PI / 4}, 125).chain(
                new AnimationDef(modelParts.LEFT_ARM, {rotation: 0}, 160).chain(
                    new AnimationDef(modelParts.LEFT_ARM, {rotation: -3 * Math.PI / 4}, 50).chain(
                        new AnimationDef(modelParts.LEFT_ARM, {rotation: 0}, 150)
                    )
                )
            ).start();
        },
        DEFEND: (modelParts, params) => {
            modelParts.LEFT_ARM.reset();
            modelParts.RIGHT_ARM.reset();
            new AnimationDef(modelParts.LEFT_ARM, {rotation: Math.PI / 3}, 250).repeat(1).yoyo(true).start();
            new AnimationDef(modelParts.RIGHT_ARM, {rotation: -Math.PI / 3}, 250).repeat(1).yoyo(true).start();
        }
    },
    CHICKEN: {
        WALK: (modelParts, params) => {
            let xChange = (params.xTileChange || 0) * 64;
            let yChange = (params.yTileChange || 0) * 64;
            let dir = xChange <= 0 ? 1 : -1; //going left rotate left, going right rotate right
            
            modelParts.CHEST.ownerSprite.reset();
            modelParts.CHEST.x -= xChange;
            modelParts.CHEST.y -= yChange;
            modelParts.CHEST.scale.x = Math.abs(modelParts.CHEST.scale.x) * dir;
            new AnimationDef(modelParts.CHEST, {
                x: modelParts.CHEST.x + xChange,
                y: modelParts.CHEST.y + yChange,
            }, 500).start();
            new AnimationDef(modelParts.LEGS, {rotation: dir * Math.PI / 4}, 125).repeat(3).yoyo(true).start();
            new AnimationDef(modelParts.HEAD, {rotation: dir * Math.PI / 8}, 200).repeat(2).yoyo(true).start();
        },
    },
    PINATA: {
        WALK: (modelParts, params) => {
            let xChange = (params.xTileChange || 0) * 64;
            let yChange = (params.yTileChange || 0) * 64;
            let dir = xChange <= 0 ? 1 : -1; //going left rotate left, going right rotate right
            
            modelParts.CHEST.ownerSprite.reset();
            modelParts.CHEST.x -= xChange;
            modelParts.CHEST.y -= yChange;
            modelParts.CHEST.scale.x = Math.abs(modelParts.CHEST.scale.x) * dir;
            new AnimationDef(modelParts.CHEST, {
                x: modelParts.CHEST.x + xChange,
                y: modelParts.CHEST.y + yChange,
            }, 500).start();
            new AnimationDef(modelParts.UPPER_LEG_1, {rotation: dir * Math.PI / 1}, 250).repeat(1).yoyo(true).start(); 
            new AnimationDef(modelParts.UPPER_LEG_2, {rotation: dir * Math.PI / 2}, 374).repeat(1).yoyo(true).start();
            new AnimationDef(modelParts.UPPER_LEG_3, {rotation: -dir * Math.PI / 2}, 374).repeat(1).yoyo(true).start();
            new AnimationDef(modelParts.UPPER_LEG_4, {rotation: -dir * Math.PI / 2}, 250).repeat(1).yoyo(true).start();

            new AnimationDef(modelParts.LOWER_LEG_1, {rotation: dir * - Math.PI / 2}, 250).repeat(1).yoyo(true).start(); 
            new AnimationDef(modelParts.LOWER_LEG_2, {rotation: dir * - Math.PI / 1}, 374).repeat(1).yoyo(true).start();
            new AnimationDef(modelParts.LOWER_LEG_3, {rotation: -dir * - Math.PI / 1}, 374).repeat(1).yoyo(true).start();
            new AnimationDef(modelParts.LOWER_LEG_4, {rotation: -dir * - Math.PI / 1}, 250).repeat(1).yoyo(true).start();
            // new AnimationDef(modelParts.LOWER_LEG, {rotation: dir * Math.PI / 6}, 125).repeat(3).yoyo(true).start();
            new AnimationDef(modelParts.HEAD, {rotation: dir * Math.PI / 8}, 200).repeat(2).yoyo(true).start();
            new AnimationDef(modelParts.TAIL, {rotation: - dir * Math.PI / 4}, 150).repeat(3).yoyo(true).start();
        },
    },
    DUCK: {
        WALK: (modelParts, params) => {
            let xChange = (params.xTileChange || 0) * 64;
            let yChange = (params.yTileChange || 0) * 64;
            let dir = xChange <= 0 ? 1 : -1; //going left rotate left, going right rotate right
            
            modelParts.CHEST.ownerSprite.reset();
            modelParts.CHEST.x -= xChange;
            modelParts.CHEST.y -= yChange;
            modelParts.CHEST.scale.x = Math.abs(modelParts.CHEST.scale.x) * dir;
            new AnimationDef(modelParts.CHEST, {
                x: modelParts.CHEST.x + xChange,
                y: modelParts.CHEST.y + yChange,
            }, 500).start();
            new AnimationDef(modelParts.HEAD, {rotation: dir * Math.PI / 8}, 200).repeat(2).yoyo(true).start();
        },
    },
    CHICK: {
        WALK: (modelParts, params) => {
            let xChange = (params.xTileChange || 0) * 64;
            let yChange = (params.yTileChange || 0) * 64;
            let dir = xChange <= 0 ? 1 : -1; //going left rotate left, going right rotate right
            
            modelParts.CHEST.ownerSprite.reset();
            modelParts.CHEST.x -= xChange;
            modelParts.CHEST.y -= yChange;
            modelParts.CHEST.scale.x = Math.abs(modelParts.CHEST.scale.x) * dir;
            new AnimationDef(modelParts.CHEST, {
                x: modelParts.CHEST.x + xChange,
                y: modelParts.CHEST.y + yChange,
            }, 500).start();
            new AnimationDef(modelParts.HEAD, {rotation: dir * Math.PI / 8}, 200).repeat(2).yoyo(true).start();
        },
    },
    SEA_CREATURE: {
        WALK: (modelParts, params) => {
            let xChange = (params.xTileChange || 0) * 64;
            let yChange = (params.yTileChange || 0) * 64;
            let dir = xChange <= 0 ? 1 : -1; //going left rotate left, going right rotate right
            
            modelParts.HEAD.ownerSprite.reset();
            modelParts.HEAD.x -= xChange;
            modelParts.HEAD.y -= yChange;
            modelParts.HEAD.scale.x = Math.abs(modelParts.HEAD.scale.x) * dir;
            new AnimationDef(modelParts.HEAD, {
                x: modelParts.HEAD.x + xChange,
                y: modelParts.HEAD.y + yChange,
            }, 500).start();
            //new AnimationDef(modelParts.HEAD, {rotation: dir * Math.PI / 8}, 200).repeat(1).yoyo(true).start();
        },
    },
    WOLF: {
        WALK: (modelParts, params) => {
            let xChange = (params.xTileChange || 0) * 64;
            let yChange = (params.yTileChange || 0) * 64;
            let dir = xChange <= 0 ? 1 : -1; //going left rotate left, going right rotate right
            
            modelParts.HEAD.ownerSprite.reset();
            modelParts.HEAD.x -= xChange;
            modelParts.HEAD.y -= yChange;
            modelParts.HEAD.scale.x = Math.abs(modelParts.HEAD.scale.x) * dir;
            new AnimationDef(modelParts.HEAD, {
                x: modelParts.HEAD.x + xChange,
                y: modelParts.HEAD.y + yChange,
            }, 500).start();
            //new AnimationDef(modelParts.HEAD, {rotation: dir * Math.PI / 8}, 200).repeat(1).yoyo(true).start();
        },
    },
    PROJECTILE: {
        WALK: (modelParts, params) => {
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
    RAT: {
        WALK: (modelParts, params) => {
            let xChange = (params.xTileChange || 0) * 64;
            let yChange = (params.yTileChange || 0) * 64;
            let dir = xChange <= 0 ? 1 : -1; //going left rotate left, going right rotate right
            
            modelParts.CHEST.ownerSprite.reset();
            modelParts.CHEST.x -= xChange;
            modelParts.CHEST.y -= yChange;
            modelParts.CHEST.scale.x = Math.abs(modelParts.CHEST.scale.x) * dir;
            new AnimationDef(modelParts.CHEST, {
                x: modelParts.CHEST.x + xChange,
                y: modelParts.CHEST.y + yChange,
            }, 500).start();
            new AnimationDef(modelParts.LEGS, {rotation: dir * Math.PI / 20}, 80).repeat(4).yoyo(true).start();
            new AnimationDef(modelParts.TAIL, {rotation: dir * Math.PI / 6}, 125).repeat(3).yoyo(true).start();
        },
    },
    GHOST : {
        WALK: (modelParts, params) => {
            let xChange = (params.xTileChange || 0) * 64;
            let yChange = (params.yTileChange || 0) * 64;
            let dir = xChange <= 0 ? 1 : -1; //going left rotate left, going right rotate right
            
            modelParts.CHEST.ownerSprite.reset();
            modelParts.CHEST.x -= xChange;
            modelParts.CHEST.y -= yChange;
            modelParts.CHEST.scale.x = Math.abs(modelParts.CHEST.scale.x) * dir;
            new AnimationDef(modelParts.CHEST, {
                x: modelParts.CHEST.x + xChange,
                y: modelParts.CHEST.y + yChange,
            }, 500).start();
        },
        ATTACK_MELEE: (modelParts, params) => {
            modelParts.RIGHT_ARM.reset();
            modelParts.LEFT_ARM.reset();
            new AnimationDef(modelParts.RIGHT_ARM, {rotation: 3 * Math.PI / 4}, 250).repeat(1).yoyo(true).start();
            new AnimationDef(modelParts.LEFT_ARM, {rotation: -3 * Math.PI / 4}, 250).repeat(1).yoyo(true).start();
        },
        DEFEND: (modelParts, params) => {
            modelParts.LEFT_ARM.reset();
            modelParts.RIGHT_ARM.reset();
            new AnimationDef(modelParts.LEFT_ARM, {rotation: Math.PI / 4}, 250).repeat(1).yoyo(true).start();
            new AnimationDef(modelParts.RIGHT_ARM, {rotation: -Math.PI / 4}, 250).repeat(1).yoyo(true).start();
        }
    },
};

const degToRad = (deg) => {
    return (deg / 180) * Math.PI;
}

const radToDeg = (rad) => {
    return (rad * 180) / Math.PI;
}

module.exports.buildModelPart = buildModelPart = (modelPartDef) => {
    return {
        id: modelPartDef.id,
        asset: modelPartDef.asset,
        sprite: modelPartDef.sprite,
        parent: modelPartDef.parent || null,
        anchor: modelPartDef.anchor || {x: 0.5, y: 0.5},
        position: modelPartDef.position || {x: 0, y: 0},
        rotation: modelPartDef.rotation || 0,
        spriteID: modelPartDef.spriteID || 0,
        UIModel: modelPartDef.UIModel || null,
    };
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

class AnimationDef extends TWEEN.Tween {
    constructor(modelPart, end, duration) {
        super(modelPart);
        this.end = end;
        this.duration = duration;
        this.to(this.end, duration);

        this.onComplete((modelPart) => {
            modelPart = null;
            this._object = null;
        });
    }
}

module.exports.AnimationDef = AnimationDef;
module.exports.AnimationHelper = AnimationHelper;
module.exports.Animation = Animation;
module.exports.HumanAnimationHelper = HumanAnimationHelper;
module.exports.HairStyle = HairStyle;
module.exports.SpriteColor = SpriteColor;