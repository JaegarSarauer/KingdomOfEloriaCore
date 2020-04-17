const SpriteColor = require('./Model').SpriteColor;
const TintColors = require('./Model').TintColors;
const HairStyle = require('./Model').HairStyle;

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

module.exports.AppearanceShops = AppearanceShops = [
    {
        name: 'Barber Shop',
        id: 0,
        shopData : [
            {
                appearanceType: 'Hair Color',
                ids: [SpriteColor.Yellow, SpriteColor.Orange, SpriteColor.Red, SpriteColor.Purple, SpriteColor.Blue, SpriteColor.Green, SpriteColor.Black],
                price: [15, 15, 15, 30, 30, 30, 15]
            },
            {
                appearanceType: 'Hair Style',
                ids: [HairStyle.Bald, HairStyle.Buzzed, HairStyle.Dreads, HairStyle.LeftSideSwipe, HairStyle.RightSideSwipe, HairStyle.Scruffy, HairStyle.Messy, HairStyle.Mohawk, HairStyle.MidlifeCrisis],
                prices: [10, 10, 35, 20, 20, 20, 15, 25, 420]
            }
        ]
    },
    {
        name: 'Customize Your Adventurer',
        id: 1,
        usesReset : false,
        usesClose : false,
        shopData : [
            [
                {
                    title: 'Skin Tone',
                    preview: {
                        parts : ['HEAD', 'EYES'],
                    },
                    editorParams : [{
                        override: 'skinToneID',
                        ids: [1, 2, 3, 4, 5, 6],
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
                        ids: Object.values(HairStyle),
                        controlType: 'ScrollSelect',
                        parts: ['HEAD', 'EYES', 'HAIR'],
                        itemWidth: 48
                    }, {
                        override: 'hairColor',
                        ids: Object.values(TintColors),
                        controlType: 'ScrollSelect',
                        parts: ['HEAD', 'EYES', 'HAIR'],
                        itemWidth: 48,
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
                        ids:  Object.values(TintColors),
                        controlType: 'ScrollSelect',
                        parts: ['HEAD', 'EYES'],
                        itemWidth: 48,
                    }, {
                        override: 'faceID',
                        ids: [1, 2, 3, 4, 5, 6],
                        controlType: 'ScrollSelect',
                        parts: ['HEAD', 'EYES', 'FACE'],
                        itemWidth: 48,
                    }]
                },
                {
                    controlType: 'Placeholder',
                    columnWidth: 256
                },
                {
                    title: 'Shirt',
                    preview: {
                        parts: ['SHIRT']
                    },
                    editorParams: [{ 
                        override: 'shirtStyleID',
                        ids: [0, 1, 2, 3, 4, 5, 6, 7, 8],
                        controlType: 'ScrollSelect',
                        parts: ['SHIRT'],
                        itemWidth: 64,
                    }, {
                        override: 'shirtColorID',
                        ids: [SpriteColor.Yellow, SpriteColor.Orange, SpriteColor.Red, SpriteColor.White, SpriteColor.LightGray, SpriteColor.DarkGray, SpriteColor.Black],
                        controlType: 'ScrollSelect',
                        parts: ['SHIRT'],
                        itemWidth: 64,
                    }],
                }, 
            ],
            [
                {
                    title: 'Body',
                    preview: {
                        parts: ['PREVIEW'],
                        options: { hairStyleID : HairStyle.Bald, faceID : 0 },
                    },
                    editorParams: [{
                        override: 'genderID',
                        ids: ['Male', 'Female'],
                        controlType: 'Button',
                        parts: ['PREVIEW'],
                        itemWidth: 128,
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
                        ids: [SpriteColor.Yellow, SpriteColor.Orange, SpriteColor.Red, SpriteColor.White, SpriteColor.LightGray, SpriteColor.DarkGray, SpriteColor.Black],
                        controlType: 'ScrollSelect',
                        itemWidth: 64,
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
                {
                    controlType: 'Placeholder',
                }
            ]
        ]
    }
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