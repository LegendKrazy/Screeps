"use strict";
module.exports = function(creep){
    let spawn = Game.spawns.Spawn1;
    let droppedEnergy = creep.room.find(FIND_DROPPED_ENERGY, 1);
    let storages = creep.room.find(FIND_MY_STRUCTURES, {
        filter: function(s) {
            return s.structureType == STRUCTURE_EXTENSION
            && s.energy < s.energyCapacity;
        }
});
if(creep.carry.energy === 0){
    creep.memory.state = "pickup";
}
else if(creep.carry.energy === creep.carryCapacity){
    creep.memory.state = "dropoff";
}
else if(creep.memory.state === undefined){
    creep.memory.state = "dropoff"; //Edge case
}

if(creep.memory.state === 'pickup'){
    if(droppedEnergy.length > 0){
        creep.moveTo(droppedEnergy[0]);
        creep.pickup(droppedEnergy[0]);
    } 
}
else if(creep.memory.state === 'dropoff'){
    if(spawn.energy < spawn.energyCapacity){
        creep.moveTo(spawn);
        creep.transferEnergy(spawn);
    }
    else if(storages.length > 0){
        creep.moveTo(storages[0]);
        creep.transferEnergy(storages[0]);
    }
}
};