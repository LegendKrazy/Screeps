"use strict";
//Builder + upgrader when nothing to build
module.exports = function(creep){
    let targets = creep.room.find(FIND_CONSTRUCTION_SITES);
    let structures = creep.room.find(FIND_MY_STRUCTURES, {
        filter: function(s) {
            var IS_MY_STRUCTURE = s.owner !== undefined && s.owner.username === 'Wimbley';
            var HAS_LOW_HEALTH = s.hits < s.hitsMax;
            return (s.structureType == STRUCTURE_RAMPART || IS_MY_STRUCTURE) && HAS_LOW_HEALTH;
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
    creep.memory.state = "work"; //Edge case
}
if(creep.memory.state === 'pickup'){
    if(storages.length > 0){
        creep.moveTo(storages[0]);
        storages[0].transferEnergy(creep);
    }
}
else if(creep.memory.state === 'work'){
    if(targets.length > 0) {
	   creep.moveTo(targets[0]);
	   creep.build(targets[0]);
    }else{
        if(structures.length > 0){
            creep.moveTo(structures[0]);
            creep.repair(structures[0]);
        }
    }
}
};