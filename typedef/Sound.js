const AudioManager = require('../manager/AudioManager');
const Loader = require('../internal/Loader').Loader;

export const Sound = [
    {
        id: 0,
        name: 'AttackEnemyWithAirMagic',
        // path: process.env.ENV.texturePath + 'sounds/AttackEnemyWithAirMagic.wav',
    },
    {
        id: 1,
        name: 'AttackEnemyWithFireMagic',
        // path: process.env.ENV.texturePath + 'sounds/AttackEnemyWithFireMagic.wav',
    },
    {
        id: 2,
        name: 'AttackEnemyWithEarthMagic',
        // path: process.env.ENV.texturePath + 'sounds/AttackEnemyWithEarthMagic.wav',
    },
    {
        id: 3,
        name: 'AttackEnemyWithWaterMagic',
        // path: process.env.ENV.texturePath + 'sounds/AttackEnemyWithWaterMagic.wav',
    },
    {
        id: 4,
        name: 'AttackEnemyWithMelee',
        // path: process.env.ENV.texturePath + 'sounds/AttackEnemyWithMelee_Miss.wav',
    },
    {
        id: 5,
        name: 'AttackEnemyWithMeleeOld',
        // path: process.env.ENV.texturePath + 'sounds/AttackEnemyWithMelee.wav',
    },
    {
        id: 6,
        name: 'AttackEnemyWithArchery',
        // path: process.env.ENV.texturePath + 'sounds/AttackEnemyWithArchery.wav',
    },
    {
        id: 7,
        name: 'HitByAirMagic',
        // path: process.env.ENV.texturePath + 'sounds/HitByAirMagic.wav',
    },
    {
        id: 8,
        name: 'HitByFireMagic',
        // path: process.env.ENV.texturePath + 'sounds/HitByFireMagic.wav',
    },
    {
        id: 9,
        name: 'HitByEarthMagic',
        // path: process.env.ENV.texturePath + 'sounds/HitByEarthMagic.wav',
    },
    {
        id: 10,
        name: 'HitByWaterMagic',
        // path: process.env.ENV.texturePath + 'sounds/HitByWaterMagic.wav',
    },
    {
        id: 11,
        name: 'HitByMelee',
        // path: process.env.ENV.texturePath + 'sounds/HitByMelee.wav',
    },
    {
        id: 12,
        name: 'HitByMelee_Miss',
        // path: process.env.ENV.texturePath + 'sounds/HitByMelee_Miss.wav',
    },
    {
        id: 13,
        name: 'HitByArchery',
        // path: process.env.ENV.texturePath + 'sounds/HitByArchery.wav',
    },
    {
        id: 14,
        name: 'Teleport',
        // path: process.env.ENV.texturePath + 'sounds/Teleport.wav',
    },
    {
        id: 15,
        name: 'Teleport_Fail',
        // path: process.env.ENV.texturePath + 'sounds/Teleport_Fail.wav',
    },
    {
        id: 16,
        name: 'LevelUp',
        // path: process.env.ENV.texturePath + 'sounds/LevelUp.wav',
    },
    {
        id: 17,
        name: 'LevelUpMilestone',
        // path: process.env.ENV.texturePath + 'sounds/LevelUpMilestone.wav',
    },
    {
        id: 18,
        name: 'ItemPickup',
        // path: process.env.ENV.texturePath + 'sounds/ItemPickup.wav',
    },
    {
        id: 19,
        name: 'ItemDrop',
        // path: process.env.ENV.texturePath + 'sounds/ItemDrop.wav',
    },
    {
        id: 20,
        name: 'EquipGear',
        // path: process.env.ENV.texturePath + 'sounds/EquipGear.wav',
    },
    {
        id: 21,
        name: 'EquipGear_Fail',
        // path: process.env.ENV.texturePath + 'sounds/EquipGear_Fail.wav',
    },
    {
        id: 22,
        name: 'Mining',
        // path: process.env.ENV.texturePath + 'sounds/Mining.wav',
    },
    {
        id: 23,
        name: 'Woodcutting',
        // path: process.env.ENV.texturePath + 'sounds/Woodcutting.wav',
    },
    {
        id: 24,
        name: 'FireMaking_Success',
        // path: process.env.ENV.texturePath + 'sounds/FireMaking_Success.wav',
    },
    {
        id: 25,
        name: 'FireMaking_Fail',
        // path: process.env.ENV.texturePath + 'sounds/FireMaking_Fail.wav',
    },
    {
        id: 26,
        name: 'Cooking_Success',
        // path: process.env.ENV.texturePath + 'sounds/Cooking_Success.wav',
    },
    {
        id: 27,
        name: 'Cooking_Fail',
        // path: process.env.ENV.texturePath + 'sounds/Cooking_Fail.wav',
    },
    {
        id: 28,
        name: 'Smithing',
        // path: process.env.ENV.texturePath + 'sounds/Smithing.wav',
    },
    {
        id: 29,
        name: 'SpinningFlax',
        // path: process.env.ENV.texturePath + 'sounds/SpinningFlax.wav',
    },
    {
        id: 30,
        name: 'SpinningPots',
        // path: process.env.ENV.texturePath + 'sounds/SpinningPots.wav',
    },
    {
        id: 31,
        name: 'FiringPots',
        // path: process.env.ENV.texturePath + 'sounds/FiringPots.wav',
    },
    {
        id: 32,
        name: 'Fletching',
        // path: process.env.ENV.texturePath + 'sounds/Fletching.wav',
    },
    {
        id: 33,
        name: 'Alchemy',
        // path: process.env.ENV.texturePath + 'sounds/Alchemy.wav',
    },
    {
        id: 34,
        name: 'Smelting',
        // path: process.env.ENV.texturePath + 'sounds/Smelting.wav',
    },
    {
        id: 35,
        name: 'Fishing',
        // path: process.env.ENV.texturePath + 'sounds/Fishing.wav',
    },
    {
        id: 36,
        name: 'ChickenHit',
        // path: process.env.ENV.texturePath + 'sounds/ChickenHit.wav',
    },
    {
        id: 37,
        name: 'ChickenDeath',
        // path: process.env.ENV.texturePath + 'sounds/ChickenDeath.wav',
    },
    {
        id: 38,
        name: 'PickFlax',
        // path: process.env.ENV.texturePath + 'sounds/PickFlax.wav',
    },
    {
        id: 39,
        name: 'LevelUpVoice',
        // path: process.env.ENV.texturePath + 'sounds/LevelUp.mp3',
    },
    {
        id: 40,
        name: 'MiningDeplete',
        // path: process.env.ENV.texturePath + 'sounds/MinedRockDepletion.wav',
    },
    {
        id: 41,
        name: 'TreeFell',
        // path: process.env.ENV.texturePath + 'sounds/TreeFell.wav',
    },
    {
        id: 42,
        name: 'Smelting',
        // path: process.env.ENV.texturePath + 'sounds/Smelting.wav',
    },
    {
        id: 43,
        name: 'OpenBank',
        // path: process.env.ENV.texturePath + 'sounds/openbank.wav',
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
        // path: process.env.ENV.texturePath + 'sounds/MinedRockDepletion.wav',
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