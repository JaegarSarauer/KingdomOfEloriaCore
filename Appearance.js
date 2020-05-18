const SpriteColor = require('./Model').SpriteColor;
const HairColors = require('./Model').HairColors;
const EyeColors = require('./Model').EyeColors;
const HairStyle = require('./Model').HairStyle;
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
                        parts: ['HEAD', 'EYES', 'FACE']
                    },
                    price: 15,
                    editorParams: [{
                        override: 'faceID',
                        ids: allFaceIds,
                        controlType: 'ScrollSelect',
                        parts: ['HEAD', 'EYES', 'FACE'],
                        itemWidth: 48,
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
                      parts: ['HEAD', 'EYES', 'HAIR'],
                    },
                    price: 20,
                    editorParams: [{
                        override: 'hairStyleID',
                        ids: [1, 2, 3, 4, 5, 6, 7, 8],
                        controlType: 'ScrollSelect',
                        parts: ['HEAD', 'EYES', 'HAIR'],
                        itemWidth: 48,
                        extra : { y : -26 }
                    }, {
                        override: 'hairColor',
                        ids: Object.values(HairColors),
                        controlType: 'ScrollSelect',
                        parts: ['HEAD', 'EYES', 'HAIR'],
                        itemWidth: 48,
                        extra : { y : 18 },
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
        shopData : [
            [
                {
                    title: 'Skin Tone',
                    preview: {
                        parts : ['HEAD', 'EYES'],
                    },
                    editorParams : [{
                        override: 'skinToneID',
                        ids: allSkinToneIds,
                        controlType: 'Button',
                        parts: ['HEAD', 'EYES'],
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
                      parts: ['HEAD', 'EYES', 'HAIR'],
                    },
                    editorParams: [{
                        override: 'hairStyleID',
                        ids: [1, 2, 3, 4, 5, 6, 7, 8],
                        controlType: 'ScrollSelect',
                        parts: ['HEAD', 'EYES', 'HAIR'],
                        itemWidth: 48,
                        extra : { y : -26 }
                    }, {
                        override: 'hairColor',
                        ids: Object.values(HairColors),
                        controlType: 'ScrollSelect',
                        parts: ['HEAD', 'EYES', 'HAIR'],
                        itemWidth: 48,
                        extra : { y : 18 },
                        disableIf : { 'hairStyleID' : 0 }
                    }],

                }, 
            ],
            [
                {
                    title: 'Face',
                    preview: {
                        parts: ['HEAD', 'EYES', 'FACE']
                    },
                    editorParams: [{
                        override: 'eyeColor',
                        ids:  Object.values(EyeColors),
                        controlType: 'ScrollSelect',
                        parts: ['HEAD', 'EYES'],
                        itemWidth: 48,
                        extra : { y : -14 }
                    }, {
                        override: 'faceID',
                        ids: allFaceIds,
                        controlType: 'ScrollSelect',
                        parts: ['HEAD', 'EYES', 'FACE'],
                        itemWidth: 48,
                        extra : { y : 10 }
                    }]
                },
                {
                    controlType: 'Placeholder',
                    columnWidth: 256,
                },
                {
                    title: 'Shirt',
                    preview: {
                        parts: ['SHIRT']
                    },
                    editorParams: [{ 
                        override: 'shirtStyleID',
                        ids: [0, 2, 3, 4, 5, 6, 7, 8],
                        controlType: 'ScrollSelect',
                        parts: ['SHIRT'],
                        itemWidth: 32,
                        extra : { x: -24, spacing : 16, y : -14 }
                    }, {
                        override: 'shirtColorID',
                        ids: Object.values(SpriteClothesColors),
                        controlType: 'ScrollSelect',
                        parts: ['SHIRT'],
                        itemWidth: 32,
                        extra : { x : -24, spacing : 16, y : 10 },
                    }],
                }, 
            ],
            [
                {
                    title: 'Body',
                    preview: {
                        parts: ['BODY'],
                        options: { hairStyleID : HairStyle.Bald, faceID : 0 },
                    },
                    editorParams: [{
                        override: 'genderID',
                        ids: [1, 2, 3],
                        controlType: 'Button',
                        parts: ['BODY'],
                        itemWidth: 96,
                        extra : { spacing : 16 }
                    }],
                },
                {
                    controlType: 'Placeholder',
                    columnWidth: 256
                },
                {
                    title: 'Pants',
                    preview: {
                        parts: ['PANTS'],
                    },
                    editorParams: [ {
                        override: 'pantsID',
                        ids: Object.values(SpriteClothesColors),
                        controlType: 'ScrollSelect',
                        parts: ['PANTS'],
                        itemWidth: 32,
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
                        parts: ['SHIRT'],
                        itemWidth: 64,
                    },
                    price: 25,
                    editorParams: [{ 
                        override: 'shirtStyleID',
                        ids: [0, 2, 3, 4, 5, 6, 7, 8],
                        controlType: 'ScrollSelect',
                        parts: ['SHIRT'],
                        itemWidth: 32,
                        extra : { x: -24, spacing : 16, y : -14 }
                    }, {
                        override: 'shirtColorID',
                        ids: Object.values(SpriteClothesColors),
                        controlType: 'ScrollSelect',
                        parts: ['SHIRT'],
                        itemWidth: 32,
                        extra : { x : -24, spacing : 16, y : 10 },
                    }],
                    rowSpan : 3,
                }, 
                {
                    title: 'Pants',
                    preview: {
                        parts: ['PANTS'],
                        itemWidth: 64,
                    },
                    price: 20,
                    editorParams: [ {
                        override: 'pantsID',
                        ids: Object.values(SpriteClothesColors),
                        controlType: 'ScrollSelect',
                        parts: ['PANTS'],
                        itemWidth: 32,
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
                        parts : ['HEAD', 'EYES'],
                    },
                    price: 50,
                    editorParams : [{
                        override: 'skinToneID',
                        ids: allSkinToneIds,
                        controlType: 'Button',
                        parts: ['HEAD', 'EYES'],
                        itemWidth: 48,
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
                        parts: ['BODY'],
                        options: { hairStyleID : HairStyle.Bald, faceID : 0 },
                    },
                    price: 50,
                    editorParams: [{
                        override: 'genderID',
                        ids: [1, 2, 3],
                        controlType: 'Button',
                        parts: ['BODY'],
                        itemWidth: 96,
                        extra : { spacing : 16 }
                    }],
                    rowSpan : 2,
                },
            ],
            [
                {
                    title: 'Eye Color',
                    preview: {
                        parts: ['HEAD', 'EYES']
                    },
                    price: 50,
                    editorParams: [{
                        override: 'eyeColor',
                        ids:  Object.values(EyeColors),
                        controlType: 'ScrollSelect',
                        parts: ['HEAD', 'EYES'],
                        itemWidth: 48,
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