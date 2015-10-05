"use strict";
module.exports = function(creep){
    let spawn = Game.spawns.Spawn1;
    let storage = creep.room.storage;
    let droppedEnergy = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
    let extensions = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
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
    if(droppedEnergy){
        creep.moveTo(droppedEnergy, {reusePath: 15});
        creep.pickup(droppedEnergy);
    } 
}
else if(creep.memory.state === 'dropoff'){
    if(spawn.energy < spawn.energyCapacity){
        creep.moveTo(spawn, {reusePath: 15});
        creep.transferEnergy(spawn);
    }
    else if(storage){
        creep.moveTo(storage, {reusePath: 15});
        creep.transferEnergy(storage);
    }
    else{
        creep.moveTo(extensions, {reusePath: 15});
        creep.transferEnergy(extensions);
    }
}
};