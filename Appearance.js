const SpriteColor = require('./Model').SpriteColor;
const HairStyle = require('./Model').HairStyle;

module.exports.AppearanceType = {
    HAIR_COLOR: 'Hair Color',
    HAIR_STYLE: 'Hair Style',
    SKIN_TONE: 'Skin Tone',
    FACE: 'Face',
    SHIRT_STYLE: 'Shirt Style',
    SHIRT_COLOR: 'Shirt Color',
    PANTS_STYLE: 'Pants Style',
    PANTS_COLOR: 'Pants Color',
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
        shopData : [
            {
                appearanceType: 'Hair Color',
                ids: [SpriteColor.Yellow, SpriteColor.Orange, SpriteColor.Red, SpriteColor.White, SpriteColor.LightGray, SpriteColor.DarkGray, SpriteColor.Black],
                price: 0
            },
            {
                appearanceType: 'Hair Style',
                ids: [HairStyle.Bald, HairStyle.Buzzed, HairStyle.LeftSideSwipe, HairStyle.Messy, HairStyle.Scruffy],
                price: 0
            }, 
            {
                appearanceType: 'Skin Tone',
                ids: [1, 2, 3, 4, 5, 6],
                price: 0
            }
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