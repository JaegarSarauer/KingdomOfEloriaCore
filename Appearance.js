const SpriteColor = require('./Model').SpriteColor;
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
                    controlType: 'Preview',
                    columnWidth: 128,
                    rowSpan : 2,
                },
                {
                    appearanceType: 'Gender',
                    ids: ['Male', 'Female'],
                    controlType: 'Button',
                    itemWidth: 32,
                    columnWidth: (32 + 16) * 2,
                },
                {
                    appearanceType: 'Skin Tone',
                    ids: [1, 2, 3, 4, 5, 6],
                    controlType: 'Button',
                    itemWidth: 24,
                    columnWeight: 1
                }, 
            ],
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
            [
                {
                    controlType: 'Placeholder',
                    columnWidth: 128
                },
                {
                    appearanceType: 'Hair Style',
                    ids: [HairStyle.Bald, HairStyle.Buzzed, HairStyle.LeftSideSwipe, HairStyle.Messy, HairStyle.Scruffy],
                    controlType: 'ScrollSelect',
                    itemWidth: 24,
                }, 
                {
                    appearanceType: 'Hair Color',
                    ids: [SpriteColor.Yellow, SpriteColor.Orange, SpriteColor.Red, SpriteColor.Green, SpriteColor.LightGray, SpriteColor.DarkGray, SpriteColor.Black],
                    controlType: 'ScrollSelect',
                    itemWidth: 24,
                }
            ],
            [
                {
                    appearanceType: 'Facial',
                    ids: [1, 2, 3, 4, 5, 6],
                    controlType: 'ScrollSelect',
                    itemWidth: 24,
                }, 
                {
                    appearanceType: 'Eye Color',
                    ids: [1, 2, 3, 4, 5, 6],
                    controlType: 'ScrollSelect',
                    itemWidth: 24,
                }
            ],
            [
                {
                    appearanceType: 'Shirt Style',
                    ids: [0, 1, 2, 3, 4, 5, 6, 7, 8],
                    controlType: 'ScrollSelect',
                    itemWidth: 24,
                }, 
                {
                    appearanceType: 'Shirt Color',
                    ids: [SpriteColor.Yellow, SpriteColor.Orange, SpriteColor.Red, SpriteColor.White, SpriteColor.LightGray, SpriteColor.DarkGray, SpriteColor.Black],
                    controlType: 'ScrollSelect',
                    itemWidth: 24,
                }
            ],
            [
                {
                    appearanceType: 'Pants Color',
                    ids: [SpriteColor.Yellow, SpriteColor.Orange, SpriteColor.Red, SpriteColor.White, SpriteColor.LightGray, SpriteColor.DarkGray, SpriteColor.Black],
                    controlType: 'ScrollSelect',
                    itemWidth: 24,
                }, 
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