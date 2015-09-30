"use strict";

module.exports = function(creep){
    let spawn = Game.spawns.Spawn1;
    let storages = creep.room.find(FIND_MY_STRUCTURES, {
        filter: function(s) {
            return s.structureType == STRUCTURE_STORAGE
            && s.store.energy > 0;
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
    creep.moveTo(spawn.room.controller);
	creep.upgradeController(spawn.room.controller);
}
};  

