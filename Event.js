const Character = require('../typedef/Character');
const NPCDef = require('../def/NPCDef');
const Bounds = require('../def/Bounds');
const KingdomOfEloria = require('../KingdomOfEloria');

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
        if (i == 0) {
            skillArray.push([0, 1000]);
        } else if (i == 1 || i == 4 || i == 7) {
            skillArray.push([i, 0.5]);
        } else {
            skillArray.push([i, golem.def.levelMultiplier * targetEntity.stats.getBaseLevel(0)]);
        }
    }
    golem.stats.fromSkillArray(skillArray);

    let tryDespawn = () => {
        if (golem.ownerUID != targetEntity.uid || golem.timers.getTimerTick(6) < KingdomOfEloria.i.currentTick) {
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
}];