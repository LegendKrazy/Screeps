"use strict";
module.exports = function (creep) {
    if (creep.ticksToLive < 20) {
        let storage = creep.room.storage;
        creep.moveTo(storage,{reusePath: 10});
        if (creep.energy > 0) {
            creep.transferEnergy(storage);
        }
        else if (creep.energy === 0) {
            creep.suicide();
        }
    }

    if (creep.carry.energy === 0) {
        creep.memory.state = "pickup";
    }
    if (creep.carry.energy === creep.carryCapacity || creep.memory.state === undefined) {
        creep.memory.state = "work";
    }
    if (creep.memory.state === 'pickup') {
        let storage = creep.room.storage;

        if (storage) {
            creep.moveTo(storage, {reusePath: 10});
            storage.transferEnergy(creep);
        }
    }
    else if (creep.memory.state === 'work') {
        let spawn = Game.spawns.Spawn1;
        creep.moveTo(spawn.room.controller,{reusePath: 10});
        creep.upgradeController(spawn.room.controller);
    }
};
