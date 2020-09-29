const SpriteColor = require('./Model').SpriteColor;
const HairColors = require('./Model').HairColors;
const EyeColors = require('./Model').EyeColors;
const HairStyle = require('./Model').HairStyle;
const Getter = require('./Getter');
const SpriteClothesColors = require('./Model').SpriteClothesColors;

module.exports.AppearanceType = {
    SKIN_TONE: 'Skin Tone',
    GENDER: 'Gender',
    FACIAL: 'Facial',
    EYE_COLOR: 'Eye Color',
    HAIR_COLOR: 'Hair Color',
    HAIR_STYLE: 'Hair Style',
    SHIRT_STYLE: 'Shirt Style',
    SHIRT_COLOR: 'Shirt Color',
    PANTS_COLOR: 'Pants Color',
    EMOTE_GREETING: 'Greeting',
    EMOTE_FUN: 'Fun',
    EMOTE_TAUNT: 'Taunt',
    NA : 'NA'
};

let getSkinModel = function(id, skinToneID) {
    return {
        id: id,
        model: 
            {
            CHEST: { 
                id: 'CHEST',
                spriteID: skinToneID 
            },
            HEAD: { 
                id: 'HEAD',
                spriteID: skinToneID
            },
            RIGHT_ARM: {
                id: 'RIGHT_ARM',
                 spriteID: skinToneID
                },
            LEFT_ARM: { 
                id: 'LEFT_ARM',
                spriteID: skinToneID
            },
            RIGHT_FOREARM: {
                id: 'RIGHT_FOREARM', 
                spriteID: skinToneID
            },
            LEFT_FOREARM: { 
                id: 'LEFT_FOREARM',
                spriteID: skinToneID
            },
            RIGHT_LEG: { 
                id: 'RIGHT_LEG',
                spriteID: skinToneID
            },
            LEFT_LEG: { 
                id: 'LEFT_LEG',
                spriteID: skinToneID
            },
            RIGHT_SHIN: { 
                id: 'RIGHT_SHIN',
                spriteID: skinToneID
            },
            LEFT_SHIN: { 
                id: 'LEFT_SHIN',
                spriteID: skinToneID
            },
        }
    };
}

            // [
            //     {
            //         appearanceType: 'Greeting',
            //         ids: [1, 2, 3],
            //         controlType: 'Emote'
            //     },
            //     {
            //         appearanceType: 'Fun',
            //         ids: [1, 2, 3],
            //         controlType: 'Emote'
            //     },
            //     {
            //         appearanceType: 'Taunt',
            //         ids: [1, 2, 3],
            //         controlType: 'Emote'
            //     }
            // ],

                    // columnWeight: 1

                    //17 * 7 * 7 * 12 * 8 * 2
const allFaceIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
const allSkinToneIds = [1, 2, 3, 4, 5, 6, 7]

module.exports.AppearanceShops = AppearanceShops = [
    {
        name : 'Barber Shop',
        id: 0,
        shopData : [
            [
                {
                    title: 'Face',
                    preview: {
                        modelID : 'HUMANOID_VIEW_FACE',
                        scale : 2,
                    },
                    price: 15,
                    editorParams: [{
                        override: 'faceID',
                        ids: allFaceIds,
                        controlType: 'ScrollSelect',
                        modelID : 'HUMANOID_VIEW_FACE',
                        itemWidth: 48,
                        scale : 1.5,
                        extra : { y : 10 }
                    }],
                    rowSpan: 3
                },
                {
                    controlType: 'Preview',
                    columnWidth: 256,
                    rowSpan: 3
                },
                {
                    title: 'Hair',
                    preview: {
                        modelID : 'HUMANOID_VIEW_HAIR',
                        scale : 2,
                    },
                    price: 20,
                    editorParams: [{
                        override: 'hairStyleID',
                        ids: [0, 1, 2, 3, 4, 5, 6, 7, 8],
                        controlType: 'ScrollSelect',
                        modelID : 'HUMANOID_VIEW_HAIR',
                        itemWidth: 48,
                        scale : 1.5,
                        extra : { y : -26 }
                    }, {
                        override: 'hairColor',
                        ids: Object.values(HairColors),
                        controlType: 'ScrollSelect',
                        modelID : 'HUMANOID_VIEW_HAIR',
                        itemWidth: 48,
                        extra : { y : 18 },
                        scale : 1.5,
                        disableIf : { 'hairStyleID' : 0 }
                    }],
                    rowSpan: 3
                }, 
            ],
            [
                { controlType: 'Placeholder', },
                { controlType: 'Placeholder', columnWidth: 256,},
                { controlType: 'Placeholder', },
            ],
            [
                { controlType: 'Placeholder', },
                { controlType: 'Placeholder', columnWidth: 256,},
                { controlType: 'Placeholder', },
            ],
            [
                {
                    title: 'Edit',
                    controlType: 'Editor',
                    rowSpan: 2
                }, 
            ],
            [
                { controlType: 'Placeholder', },
                { controlType: 'Placeholder', columnWidth: 256,},
                { controlType: 'Placeholder', },
            ],
        ]
    },
    {
        name : 'Customize Your Adventurer',
        id: 1,
        usesReset: false,
        usesClose: false,
        shopData : [
            [
                {
                    title: 'Skin Tone',
                    preview: {
                        modelID : 'HUMANOID_VIEW_SKIN',
                        scale : 1.25,
                    },
                    editorParams : [{
                        override: 'skinToneID',
                        ids: allSkinToneIds,
                        controlType: 'Button',
                        modelID : 'HUMANOID_VIEW_SKIN',
                        scale : 1.75,
                        itemWidth: 48,
                    }],
                }, 
                {
                    controlType: 'Preview',
                    columnWidth: 256,
                    rowSpan : 3,
                },
                {
                    title: 'Hair',
                    preview: {
                        modelID : 'HUMANOID_VIEW_HAIR',
                        scale : 1.25,
                    },
                    editorParams: [{
                        override: 'hairStyleID',
                        ids: [0, 1, 2, 3, 4, 5, 6, 7, 8],
                        controlType: 'ScrollSelect',
                        modelID : 'HUMANOID_VIEW_HAIR',
                        itemWidth: 48,
                        scale : 1.5,
                        extra : { y : -16 }
                    }, {
                        override: 'hairColor',
                        ids: Object.values(HairColors),
                        controlType: 'ScrollSelect',
                        modelID : 'HUMANOID_VIEW_HAIR',
                        itemWidth: 48,
                        scale : 1.5,
                        extra : { y : 24 },
                        disableIf : { 'hairStyleID' : 0 }
                    }],

                }, 
            ],
            [
                {
                    title: 'Face',
                    preview: {
                        modelID : 'HUMANOID_VIEW_HEAD',
                        scale : 1.25,
                    },
                    editorParams: [{
                        override: 'eyeColor',
                        ids:  Object.values(EyeColors),
                        controlType: 'ScrollSelect',
                        modelID : 'HUMANOID_VIEW_EYES',
                        itemWidth: 48,
                        scale : 1.5,
                        extra : { y : -16 }
                    }, {
                        override: 'faceID',
                        ids: allFaceIds,
                        controlType: 'ScrollSelect',
                        modelID : 'HUMANOID_VIEW_FACE',
                        itemWidth: 48,
                        scale : 1.5,
                        extra : { y : 24 }
                    }]
                },
                {
                    controlType: 'Placeholder',
                    columnWidth: 256,
                },
                {
                    title: 'Shirt',
                    preview: {
                        modelID : 'HUMANOID_VIEW_SHIRT',
                    },
                    editorParams: [{ 
                        override: 'shirtID',
                        ids: (options) => {
                            if (options != null) {
                                return Getter.ColoredClothes.GetShirtsWithSameStyle(options.shirtID);
                            }
                            else {
                                return Getter.ColoredClothes.GetAllShirts();
                            }
                        },
                        controlType: 'ScrollSelect',
                        modelID : 'HUMANOID_VIEW_SHIRT',
                        itemWidth: 32,
                        extra : { x: -24, spacing : 16, y : 0 }
                    }, {
                        override: 'shirtID',
                        ids: (options) => {
                            if (options != null) {
                                return Getter.ColoredClothes.GetShirtsWithSameColor(options.shirtID);
                            }
                            else {
                                return Getter.ColoredClothes.GetAllShirts();
                            }
                        },
                        controlType: 'ScrollSelect',
                        modelID : 'HUMANOID_VIEW_SHIRT',
                        itemWidth: 32,
                        extra : { x : -24, spacing : 16, y : 20 },
                    }],
                }, 
            ],
            [
                {
                    title: 'Body',
                    preview: {
                        modelID : 'HUMANOID_VIEW_BODY',
                        scale : 0.7,
                    },
                    editorParams: [{
                        override: 'genderID',
                        ids: [1, 2, 3],
                        controlType: 'Button',
                        modelID : 'HUMANOID_VIEW',
                        itemWidth: 96,
                        scale : 0.7,
                        extra : { spacing : 16, y : 16 }
                    }],
                },
                {
                    controlType: 'Placeholder',
                    columnWidth: 256
                },
                {
                    title: 'Pants',
                    preview: {
                        modelID : 'HUMANOID_VIEW_PANTS',
                    },
                    editorParams: [ {
                        override: 'pantsID',
                        ids: [475, 477, 479, 481, 483, 485, 487, 489, 491],
                        controlType: 'ScrollSelect',
                        modelID : 'HUMANOID_VIEW_PANTS',
                        itemWidth: 32,
                        scale: 1.5,
                        extra : { x : -16, spacing : 16 }
                    }],
                }, 
            ],
            [
                {
                    title: 'Edit',
                    controlType: 'Editor',
                    rowSpan: 2,
                }, 
            ],
            [
                { controlType: 'Placeholder', }
            ],
        ]
    },
    {
        name : 'Clothing Shop',
        id: 2,
        shopData : [
            [
                {
                    controlType: 'Preview',
                    columnWidth: 256,
                    rowSpan : 3,
                },
                {
                    title: 'Shirt',
                    preview: {
                        modelID : 'HUMANOID_VIEW_SHIRT',
                        itemWidth: 64,
                    },
                    price: 25,
                    editorParams: [{ 
                        override: 'shirtID',
                        ids: (options) => {
                            if (options != null) {
                                return Getter.ColoredClothes.GetShirtsWithSameStyle(options.shirtID);
                            }
                            else {
                                return Getter.ColoredClothes.GetAllShirts();
                            }
                        },
                        controlType: 'ScrollSelect',
                        modelID : 'HUMANOID_VIEW_SHIRT',
                        itemWidth: 32,
                        extra : { x: -24, spacing : 16, y : -14 }
                    }, {
                        override: 'shirtID',
                        ids: (options) => {
                            if (options != null) {
                                return Getter.ColoredClothes.GetShirtsWithSameColor(options.shirtID);
                            }
                            else {
                                return Getter.ColoredClothes.GetAllShirts();
                            }
                        },
                        controlType: 'ScrollSelect',
                        modelID : 'HUMANOID_VIEW_SHIRT',
                        itemWidth: 32,
                        extra : { x : -24, spacing : 16, y : 10 },
                    }],
                    rowSpan : 3,
                }, 
                {
                    title: 'Pants',
                    preview: {
                        modelID : 'HUMANOID_VIEW_PANTS',
                        itemWidth: 64,
                    },
                    price: 20,
                    editorParams: [ {
                        override: 'pantsID',
                        ids: [475, 477, 479, 481, 483, 485, 487, 489, 491],
                        controlType: 'ScrollSelect',
                        modelID : 'HUMANOID_VIEW_PANTS',
                        itemWidth: 32,
                        scale: 1.5,
                        extra : { x : -16, spacing : 16 }
                    }],
                    rowSpan : 3,
                }, 
            ],
            [
                { controlType: 'Placeholder', columnWidth: 256,},
                { controlType: 'Placeholder', },
                { controlType: 'Placeholder', },
            ],
            [
                { controlType: 'Placeholder', columnWidth: 256,},
                { controlType: 'Placeholder', },
                { controlType: 'Placeholder', },
            ],
            [
                {
                    title: 'Edit',
                    controlType: 'Editor',
                    rowSpan: 2
                }, 
            ],
            [
                { controlType: 'Placeholder', },
                { controlType: 'Placeholder', },
                { controlType: 'Placeholder', },
            ],
        ]
    },
    {
        name : 'Wizard Surgeon Shop',
        id: 3,
        shopData : [
            [
                {
                    title: 'Skin Tone',
                    preview: {
                        modelID : 'HUMANOID_VIEW_SKIN',
                        scale : 1.25,
                    },
                    price: 50,
                    editorParams : [{
                        override: 'skinToneID',
                        ids: allSkinToneIds,
                        controlType: 'Button',
                        modelID : 'HUMANOID_VIEW_SKIN',
                        itemWidth: 48,
                        scale : 1.5,
                    }],
                    rowSpan : 1,
                }, 
                {
                    controlType: 'Preview',
                    columnWidth: 256,
                    rowSpan : 3,
                },
                {
                    title: 'Body',
                    preview: {
                        modelID : 'HUMANOID_VIEW',
                        options: { hairStyleID : HairStyle.Bald, faceID : 0 },
                    },
                    price: 50,
                    editorParams: [{
                        override: 'genderID',
                        ids: [1, 2, 3],
                        controlType: 'Button',
                        modelID : 'HUMANOID_VIEW',
                        itemWidth: 96,
                        scale : 0.7,
                        extra : { spacing : 16 }
                    }],
                    rowSpan : 2,
                },
            ],
            [
                {
                    title: 'Eye Color',
                    preview: {
                        modelID : 'HUMANOID_VIEW_EYES',
                        scale : 1.25,
                    },
                    price: 50,
                    editorParams: [{
                        override: 'eyeColor',
                        ids:  Object.values(EyeColors),
                        controlType: 'ScrollSelect',
                        modelID : 'HUMANOID_VIEW_EYES',
                        itemWidth: 48,
                        scale: 1.5,
                        extra : { y : -14 }
                    }]
                },
                {
                    controlType: 'Placeholder',
                    columnWidth: 256
                },
                { controlType: 'Placeholder', }
            ],
            [
                { controlType: 'Placeholder', },
                {
                    controlType: 'Placeholder',
                    columnWidth: 256
                },
                { controlType: 'Placeholder', }
            ],
            [
                {
                    title: 'Edit',
                    controlType: 'Editor',
                    rowSpan: 2,
                }, 
            ],
            [
                { controlType: 'Placeholder', }
            ],
        ]
    },
]

module.exports.HumanSkinModel = HumanSkinModel = {
    ALBINO: getSkinModel('ALBINO', 0),
    WHITE: getSkinModel('WHITE', 1),
    VERY_PALE: getSkinModel('VERY_PALE', 2),
    PALE: getSkinModel('PALE', 3),
    TAN: getSkinModel('TAN', 4),
    VERY_TAN: getSkinModel('VERY_TAN', 5),
    BLACK: getSkinModel('BLACK', 6),
}