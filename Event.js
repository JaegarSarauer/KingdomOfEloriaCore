const Character = require('../typedef/Character');
const NPCDef = require('../def/NPCDef');
const Bounds = require('../def/Bounds').Bounds;
const KingdomOfEloria = require('../KingdomOfEloria');
const { AttackStyle, CombatStyle } = require('../internal/Combat');

const startGolemEvent = (currentMap, targetEntity, golemCharID) => {
    let golem = new NPCDef.NPCDef(golemCharID, targetEntity.x, targetEntity.y, new Bounds(
        targetEntity.x - 10,
        targetEntity.y - 10,
        targetEntity.x + 10,
        targetEntity.y + 10
    ), false);

    let skillArray = [];
    for (let i = 0; i < 10; ++i) {
        if (i == 9) {
            i = 11; //hitpoints
        }
        skillArray.push([i, golem.def.levelMultiplier * targetEntity.stats.getBaseLevel(i)]);
    }
    skillArray[0][1] = golem.def.levelMultiplier * targetEntity.stats.getBaseLevel(2) * 10;
    skillArray[1][1] = 4;

    golem.stats.fromSkillArray(skillArray);

    let tryDespawn = () => {// Mobile release fix (.default.)
        if (golem.ownerUID != targetEntity.uid 
            || (golem.timers.getTimerTick(6) < KingdomOfEloria.i.currentTick
            && golem.timers.getTimerTick(7) < KingdomOfEloria.i.currentTick)) {
            currentMap.despawnEntity(golem);
        } else {
            golem.timers.setTimer(2, 40, tryDespawn);
        }
    };


    let spawned = currentMap.spawnEntity(golem);
    if (!spawned || !golem.timers)
        return false;

    golem.targetDef = targetEntity;
    golem.targetRefID = targetEntity.refID;
    golem.ownerUID = targetEntity.uid;

    let attackTarget = targetEntity.getAction(6);
    if (attackTarget)
        attackTarget.performAction(golem);

    golem.timers.setTimer(2, 20, tryDespawn);
    return true;
}

const startWasp = (currentMap, targetEntity) => {
    let wasp = new NPCDef.NPCDef(130, targetEntity.x, targetEntity.y, new Bounds(
        targetEntity.x - 2000,
        targetEntity.y - 2000,
        targetEntity.x + 2000,
        targetEntity.y + 2000
    ), false);

    wasp.isRunning = true;
    wasp.runEnergy = 9999999;

    let playerHP = targetEntity.stats.getBaseLevel(11);
    let playerDef = targetEntity.stats.getBaseLevel(2);
    let skillArray = [[11, Math.floor(playerHP / 2)], [2, playerDef]]; //Really weak
    wasp.stats.fromSkillArray(skillArray);

    let tryDespawn = () => {
        if (wasp.ownerUID != targetEntity.uid || targetEntity.mapID != wasp.mapID) {
            currentMap.despawnEntity(wasp);
            return;
        }
        if (wasp.timers.getTimerTick(6) < KingdomOfEloria.i.currentTick
            && wasp.timers.getTimerTick(7) < KingdomOfEloria.i.currentTick) {
                wasp.setPosition(targetEntity.lastX, targetEntity.lastY);
        } 
        wasp.timers.setTimer(2, 40, tryDespawn);
    };


    let spawned = currentMap.spawnEntity(wasp);
    if (!spawned || !wasp.timers)
        return false;

    wasp.targetDef = targetEntity;
    wasp.targetRefID = targetEntity.refID;
    wasp.ownerUID = targetEntity.uid;

    let attackTarget = targetEntity.getAction(6);
    if (attackTarget)
        attackTarget.performAction(wasp);

    wasp.timers.setTimer(2, 20, tryDespawn);
    return true;
}

const startHauntedGhost = (currentMap, targetEntity, boundsEntity) => {
    let ghost = new NPCDef.NPCDef(29, boundsEntity.x, boundsEntity.y, new Bounds(
        boundsEntity.x - 15,
        boundsEntity.y - 15,
        boundsEntity.x + 15,
        boundsEntity.y + 15
    ), false);

    ghost.isMultiAttacker = true;

    let skillArray = [];
    for (let i = 0; i < 10; ++i) {
        if (i == 9) {
            i = 11; //hitpoints
        }
        skillArray.push([i, targetEntity.stats.getBaseLevel(i)]);
    }
    skillArray[0][1] = targetEntity.stats.getBaseLevel(2) * 4;
    skillArray[1][1] = 1;

    ghost.stats.fromSkillArray(skillArray);

    let tryDespawn = () => {// Mobile release fix (.default.)
        if (ghost.ownerUID != targetEntity.uid 
            || (ghost.timers.getTimerTick(6) < KingdomOfEloria.i.currentTick
            && ghost.timers.getTimerTick(7) < KingdomOfEloria.i.currentTick)) {
            currentMap.despawnEntity(ghost);
        } else {
            startHauntedGhost(currentMap, targetEntity, ghost);
            ghost.timers.setTimer(2, 40, tryDespawn);
        }
    };


    let spawned = currentMap.spawnEntity(ghost);
    if (!spawned || !ghost.timers)
        return false;

    ghost.targetDef = targetEntity;
    ghost.targetRefID = targetEntity.refID;
    ghost.ownerUID = targetEntity.uid;

    let attackTarget = targetEntity.getAction(6);
    if (attackTarget)
        attackTarget.performAction(ghost);

    ghost.timers.setTimer(2, 20, tryDespawn);
    return true;
}

module.exports.Event = [{
    id: 0,
    startEvent: (currentMap, targetEntity) => {
        return startGolemEvent(currentMap, targetEntity, 52);
    }
}, {
    id: 1,
    startEvent: (currentMap, targetEntity) => {
        return startGolemEvent(currentMap, targetEntity, 53);
    }
}, {
    id: 2,
    startEvent: (currentMap, targetEntity) => {
        return startGolemEvent(currentMap, targetEntity, 54);
    }
}, {
    id: 3,
    startEvent: (currentMap, targetEntity) => {
        return startGolemEvent(currentMap, targetEntity, 55);
    }
}, {
    id: 4,
    startEvent: (currentMap, targetEntity) => {
        return startGolemEvent(currentMap, targetEntity, 56);
    }
}, {
    id: 5,
    startEvent: (currentMap, targetEntity) => {
        return startGolemEvent(currentMap, targetEntity, 57);
    }
}, {
    id: 6,
    startEvent: (currentMap, targetEntity) => {
        return startGolemEvent(currentMap, targetEntity, 58);
    }
}, 
// {
//     id: 7,
//     startEvent: (currentMap, targetEntity) => {
//         return startHauntedGhost(currentMap, targetEntity, targetEntity);
//     }
// }, 
// {
//     id: 8,
//     startEvent: (currentMap, targetEntity) => {
//         return startWasp(currentMap, targetEntity);
//     }
// }
];