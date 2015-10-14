"use strict";
module.exports = function(creep){
    let structures = creep.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: function(s) {
            var IS_MY_STRUCTURE = s.owner !== undefined && s.owner.username === 'LegendKrazy';
            var HAS_LOW_HEALTH = s.hits < (s.hitsMax * 0.005);
            return (s.structureType == STRUCTURE_WALL || IS_MY_STRUCTURE) && HAS_LOW_HEALTH;
        }});

    if(creep.carry.energy === 0){
        creep.memory.state = "pickup";
    }
    if(creep.carry.energy === creep.carryCapacity){
        creep.memory.state = "work";
    }
    else if(creep.memory.state === undefined){
        creep.memory.state = "work"; 
    }
    if(creep.memory.state === 'pickup'){
        let storage = creep.room.storage;
        if(storage){
            creep.moveTo(storage, {reusePath: 15});
            storage.transferEnergy(creep);
        }
    }
    else if(creep.memory.state === 'work'){
        if(structures){
            creep.moveTo(structures, {reusePath: 15});
            creep.repair(structures);
        }
    }

};