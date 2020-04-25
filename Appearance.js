const SpriteColor = require('./Model').SpriteColor;
const TintColors = require('./Model').TintColors;
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
        name : 'Customize Your Adventurer',
        id: 1,
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
                        itemWidth: 48,
                        extra : { y : -26 }
                    }, {
                        override: 'hairColor',
                        ids: Object.values(TintColors),
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
                        ids:  Object.values(TintColors),
                        controlType: 'ScrollSelect',
                        parts: ['HEAD', 'EYES'],
                        itemWidth: 48,
                        extra : { y : -14 }
                    }, {
                        override: 'faceID',
                        ids: [1, 2, 3, 4, 5, 6],
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