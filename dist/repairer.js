"use strict";
module.exports = function(creep){
let structures = creep.room.find(FIND_STRUCTURES, {
        filter: function(s) {
            var IS_MY_STRUCTURE = s.owner !== undefined && s.owner.username === 'Wimbley';
            var HAS_LOW_HEALTH = s.hits < (s.hitsMax * 0.02);
            return (s.structureType == STRUCTURE_WALL || IS_MY_STRUCTURE) && HAS_LOW_HEALTH;
        }
});
let storages = creep.room.find(FIND_MY_STRUCTURES, {
        filter: function(s) {
            return s.structureType == STRUCTURE_STORAGE && s.store.energy > 0;
        }
});

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
    if(storages.length > 0){
        creep.moveTo(storages[0]);
        storages[0].transferEnergy(creep);
    }
}
    else if(creep.memory.state === 'work'){
        if(structures.length > 0){
            creep.moveTo(structures[0]);
            creep.repair(structures[0]);
        }
            
    }

};