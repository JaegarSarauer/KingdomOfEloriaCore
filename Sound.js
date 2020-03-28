const AudioManager = require('../manager/AudioManager');
const Loader = require('../internal/Loader').Loader;

export const Sound = [
    {
        id: 0,
        name: 'AtkEnemyWithAirMagic',
        path: process.env.ENV.texturePath + 'sounds/AtkEnemyWithAirMagic.ogg',
    },
    {
        id: 1,
        name: 'AtkEnemyWithFireMagic',
        path: process.env.ENV.texturePath + 'sounds/AtkEnemyWithFireMagic.ogg',
    },
    {
        id: 2,
        name: 'AtkEnemyWithEarthMagic',
        path: process.env.ENV.texturePath + 'sounds/AtkEnemyWithEarthMagic.ogg',
    },
    {
        id: 3,
        name: 'AtkEnemyWithWaterMagic',
        path: process.env.ENV.texturePath + 'sounds/AtkEnemyWithWaterMagic.ogg',
    },
    {
        id: 4,
        name: 'AtkEnemyWithMelee_Miss',
        path: process.env.ENV.texturePath + 'sounds/AtkEnemyWithMelee_Miss.ogg',
    },
    {
        id: 5,
        name: 'AtkEnemyWithMelee',
        // path: process.env.ENV.texturePath + 'sounds/AtkEnemyWithMelee.ogg',
    },
    {
        id: 6,
        name: 'AtkEnemyWithArchery',
        path: process.env.ENV.texturePath + 'sounds/AtkEnemyWithArchery.ogg',
    },
    {
        id: 7,
        name: 'HitByAirMagic',
        path: process.env.ENV.texturePath + 'sounds/HitByAirMagic.ogg',
    },
    {
        id: 8,
        name: 'HitByFireMagic',
        path: process.env.ENV.texturePath + 'sounds/HitByFireMagic.ogg',
    },
    {
        id: 9,
        name: 'HitByEarthMagic',
        path: process.env.ENV.texturePath + 'sounds/HitByEarthMagic.ogg',
    },
    {
        id: 10,
        name: 'HitByWaterMagic',
        // path: process.env.ENV.texturePath + 'sounds/HitByWaterMagic.ogg',
    },
    {
        id: 11,
        name: 'HitByMelee',
        path: process.env.ENV.texturePath + 'sounds/HitByMelee.ogg',
    },
    {
        id: 12,
        name: 'HitByMelee_Miss',
        path: process.env.ENV.texturePath + 'sounds/HitByMelee_Miss.ogg',
    },
    {
        id: 13,
        name: 'HitByArchery',
        path: process.env.ENV.texturePath + 'sounds/HitByArchery.ogg',
    },
    {
        id: 14,
        name: 'Teleport',
        // path: process.env.ENV.texturePath + 'sounds/Teleport.ogg',
    },
    {
        id: 15,
        name: 'Teleport_Fail',
        // path: process.env.ENV.texturePath + 'sounds/Teleport_Fail.ogg',
    },
    {
        id: 16,
        name: 'LevelUp',
        path: process.env.ENV.texturePath + 'sounds/LevelUp.ogg',
    },
    {
        id: 17,
        name: 'LevelUpMilestone',
        path: process.env.ENV.texturePath + 'sounds/LevelUpMilestone.ogg',
    },
    {
        id: 18,
        name: 'ItemPickup',
        path: process.env.ENV.texturePath + 'sounds/ItemPickup.ogg',
    },
    {
        id: 19,
        name: 'ItemDrop',
        path: process.env.ENV.texturePath + 'sounds/ItemDrop.ogg',
    },
    {
        id: 20,
        name: 'EquipGear',
        path: process.env.ENV.texturePath + 'sounds/EquipGear.ogg',
    },
    {
        id: 21,
        name: 'EquipGear_Fail',
        path: process.env.ENV.texturePath + 'sounds/EquipGear_Fail.ogg',
    },
    {
        id: 22,
        name: 'Mining',
        path: process.env.ENV.texturePath + 'sounds/Mining.ogg',
    },
    {
        id: 23,
        name: 'Woodcutting',
        path: process.env.ENV.texturePath + 'sounds/Woodcutting.ogg',
    },
    {
        id: 24,
        name: 'FireMaking_Success',
        path: process.env.ENV.texturePath + 'sounds/FireMaking_Success.ogg',
    },
    {
        id: 25,
        name: 'FireMaking_Fail',
        path: process.env.ENV.texturePath + 'sounds/FireMaking_Fail.ogg',
    },
    {
        id: 26,
        name: 'Cooking_Success',
        path: process.env.ENV.texturePath + 'sounds/Cooking_Success.ogg',
    },
    {
        id: 27,
        name: 'Cooking_Fail',
        path: process.env.ENV.texturePath + 'sounds/Cooking_Fail.ogg',
    },
    {
        id: 28,
        name: 'Smithing',
        //path: process.env.ENV.texturePath + 'sounds/Smithing.ogg',
    },
    {
        id: 29,
        name: 'SpinningFlax',
        // path: process.env.ENV.texturePath + 'sounds/SpinningFlax.ogg',
    },
    {
        id: 30,
        name: 'SpinningPots',
        // path: process.env.ENV.texturePath + 'sounds/SpinningPots.ogg',
    },
    {
        id: 31,
        name: 'FiringPots',
        path: process.env.ENV.texturePath + 'sounds/FiringPots.ogg',
    },
    {
        id: 32,
        name: 'Fletching',
        path: process.env.ENV.texturePath + 'sounds/Fletching.ogg',
    },
    {
        id: 33,
        name: 'Alchemy',
        path: process.env.ENV.texturePath + 'sounds/Alchemy.ogg',
    },
    {
        id: 34,
        name: 'Smelting',
        path: process.env.ENV.texturePath + 'sounds/Smelting.ogg',
    },
    {
        id: 35,
        name: 'Fishing',
        path: process.env.ENV.texturePath + 'sounds/Fishing.ogg',
    },
    {
        id: 36,
        name: 'ChickenHit',
        path: process.env.ENV.texturePath + 'sounds/ChickenHit.ogg',
    },
    {
        id: 37,
        name: 'ChickenDeath',
        path: process.env.ENV.texturePath + 'sounds/ChickenDeath.ogg',
    },
    {
        id: 38,
        name: 'PickFlax',
        path: process.env.ENV.texturePath + 'sounds/PickFlax.ogg',
    },
    {
        id: 39,
        name: 'LevelUpVoice',
        // path: process.env.ENV.texturePath + 'sounds/LevelUp.mp3',
    },
    {
        id: 40,
        name: 'MinedRockDepletion',
        path: process.env.ENV.texturePath + 'sounds/MinedRockDepletion.ogg',
    },
    {
        id: 41,
        name: 'TreeFell',
        path: process.env.ENV.texturePath + 'sounds/TreeFell.ogg',
    },
    {
        id: 42,
        name: 'Smelting',
        path: process.env.ENV.texturePath + 'sounds/Smelting.ogg',
    },
    {
        id: 43,
        name: 'OpenBank',
        path: process.env.ENV.texturePath + 'sounds/OpenBank.ogg',
    },
    {
        id: 44,
        name: 'MenuMusic',
        path: process.env.ENV.texturePath + 'sounds/mainTheme.ogg',
    },
    {
        id: 45,
        name: 'OverworldMusic',
        path: process.env.ENV.texturePath + 'sounds/overworldMusic.ogg',
    },
    {
        id: 46,
        name: 'UnderworldMusic',
        // path: process.env.ENV.texturePath + 'sounds/MinedRockDepletion.ogg',
    },
    {
        id: 47,
        name: 'GoblinMusic',
        path: process.env.ENV.texturePath + 'sounds/goblinMusic.ogg',
    },
    {
        id: 48,
        name: 'FishingTownMusic',
        path: process.env.ENV.texturePath + 'sounds/fishingTownMusic.ogg',
    },
    {
        id: 49,
        name: 'CombatTownMusic',
        path: process.env.ENV.texturePath + 'sounds/combatTownMusic.ogg',
    },
    {
        id: 50,
        name: 'WoodcuttingTownMusic',
        path: process.env.ENV.texturePath + 'sounds/woodcuttingTownMusic.ogg',
    },
    {
        id: 51,
        name: 'VolcanoMusic',
        path: process.env.ENV.texturePath + 'sounds/volcanoMusic.ogg',
    },
    {
        id: 52,
        name: 'CarpentryTownMusic',
        path: process.env.ENV.texturePath + 'sounds/carpentryTownMusic.ogg',
    },
    {
        id: 53,
        name: 'MountainMusic',
        path: process.env.ENV.texturePath + 'sounds/mountainMusic.ogg',
    },
    {
        id: 54,
        name: 'FarmMusic',
        path: process.env.ENV.texturePath + 'sounds/farmMusic.ogg',
    }
];

export const GetSoundName = (soundId) => {
    let keys = Object.keys(Sound);
    for(let i = 0; i < keys.length; ++i) {
        if (Sound[i].id == soundId) {
            return Sound[i].name;
        }
    }
}

export const GetSoundPath = (soundId) => {
    let keys = Object.keys(Sound);
    for(let i = 0; i < keys.length; ++i) {
        if (Sound[i].id == soundId) {
            return Sound[i].path;
        }
    }
}

export const LoadSounds = (onCompleteCallback) => {
    let loader = new Loader(onCompleteCallback);
    AudioManager.i.start();
    for (let i = 0; i < Sound.length; i++) {
        if (Sound[i].path) {
            loader.load(AudioManager.i.addSound(Sound[i].name, Sound[i].path));
        } else {
            if (process.env.ENV.isDev) {
                console.info('Failed to add sound \'' + Sound[i].name + '\' as no path was defined.');
            }
        }
    }
    loader.start();
}