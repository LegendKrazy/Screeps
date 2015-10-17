"use strict";
module.exports = function (creep) {
    
    if (creep.ticksToLive < 30) {
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
    else if (creep.carry.energy === creep.carryCapacity) {
        creep.memory.state = "dropoff";
    }
    else if (creep.memory.state === undefined) {
        creep.memory.state = "dropoff"; //Edge case
    }

    if (creep.memory.state === 'pickup') {
        let droppedEnergy = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
        if (droppedEnergy) {
            creep.moveTo(droppedEnergy, {
                reusePath: 15
            });
            creep.pickup(droppedEnergy);
        }
    }
    else if (creep.memory.state === 'dropoff') {
        let storage = creep.room.storage;
        let spawn = Game.spawns.Spawn1;
        if (spawn.energy < spawn.energyCapacity) {
            creep.moveTo(spawn, {
                reusePath: 15
            });
            creep.transferEnergy(spawn);
        }
        else if (storage) {
            creep.moveTo(storage, {
                reusePath: 15
            });
            creep.transferEnergy(storage);
        }
        else {
            let extensions = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                filter: function (s) {
                    return s.structureType == STRUCTURE_EXTENSION && s.energy < s.energyCapacity;
                }
            });
            creep.moveTo(extensions, {
                reusePath: 15
            });
            creep.transferEnergy(extensions);
        }
    }
};