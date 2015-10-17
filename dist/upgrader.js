"use strict";
module.exports = function (creep) {
    if (creep.ticksToLive < 20) {
        let storage = creep.room.storage;
        creep.moveTo(storage);
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
        let storages = creep.room.find(FIND_MY_STRUCTURES, {
            filter: function (s) {
                return s.structureType == STRUCTURE_STORAGE && s.store.energy > 0;
            }
        });

        if (storages.length > 0) {
            creep.moveTo(storages[0]);
            storages[0].transferEnergy(creep);
        }
    }
    else if (creep.memory.state === 'work') {
        let spawn = Game.spawns.Spawn1;
        creep.moveTo(spawn.room.controller);
        creep.upgradeController(spawn.room.controller);
    }
};
