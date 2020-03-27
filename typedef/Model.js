module.exports.HairStyle = {
    Bald : 0,
    Scruffy : 1,
    LeftSideSwipe : 2,
    RightSideSwipe : 3,
    Messy : 4,
    Buzzed : 5,
    Mohawk : 6, 
    Dreads : 7,
    MidlifeCrisis : 8
}


module.exports.SpriteColor = {
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
    Brown : 10,
}

module.exports.Model = Object.freeze([
    {
        id: 0,
        name: 'Copper Axe',
        frames: [{
            id: 0,
            offsetX: 0,//tiles offset from 0,0 of the map tile to be drawn on. 1 here would be 1 animation tile offset (8px) from top left of the tile.
            offsetY: 0,
            width: 2, //width and height of the animation frame.
            height: 3,
            frames: [], //sprite index IDs of the Model Texture
        }],
        animations: [{
            id: 0,
            name: 'Idle',
            frames: [0],
        }, {
            id: 1,
            name: 'Use',
            frames: [0, 1],
        }],
    }
]);
