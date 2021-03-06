"use strict";
//Builder + upgrader when nothing to build
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
    if (creep.memory.state === undefined || creep.carry.energy === 0) {
        creep.memory.state = "pickup";
    }
    if (creep.carry.energy === creep.carryCapacity) {
        creep.memory.state = "work";
    }

    if (creep.memory.state === 'pickup') {
        let storage = creep.room.storage;
        if (storage) {
            creep.moveTo(storage, {
                reusePath: 15
            });
            storage.transferEnergy(creep);
        }
    }
    else if (creep.memory.state === 'work') {
        let constructionSites = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
        if (constructionSites) {
            creep.moveTo(constructionSites, {
                reusePath: 15
            });
            creep.build(constructionSites);
        }
        else {
            let ramparts = creep.room.find(FIND_MY_STRUCTURES, {
                filter: function (s) {
                    var IS_MY_STRUCTURE = s.owner !== undefined && s.owner.username === 'LegendKrazy';
                    var HAS_LOW_HEALTH = s.hits < (s.hitsMax * 0.30);
                    return (s.structureType == STRUCTURE_RAMPART || IS_MY_STRUCTURE) && HAS_LOW_HEALTH;
                }
            });
            if (ramparts.length > 0) {
                creep.moveTo(ramparts[0], {
                    reusePath: 15
                });
                creep.repair(ramparts[0]);
            }
            else {
                let structures = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: function (s) {
                        var IS_MY_STRUCTURE = s.owner !== undefined && s.owner.username === 'LegendKrazy';
                        var HAS_LOW_HEALTH = s.hits < (s.hitsMax * 0.001);
                        return (s.structureType == STRUCTURE_WALL || IS_MY_STRUCTURE) && HAS_LOW_HEALTH;
                    }
                });
                if (structures) {
                    creep.moveTo(structures, {
                        reusePath: 15
                    });
                    creep.repair(structures);
                }
            }
        }
    }
};