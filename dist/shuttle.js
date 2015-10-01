"use strict";
module.exports = function(creep){
    let spawn = Game.spawns.Spawn1;
    let droppedEnergy = creep.room.find(FIND_DROPPED_ENERGY, 1);
    let storage = creep.room.find(FIND_MY_STRUCTURES, {
        filter: function(s) {
            return s.structureType == STRUCTURE_STORAGE && s.store.energy > 0;
        }
    });
if(creep.carry.energy === 0){
    creep.memory.state = "pickup";
}
if(creep.carry.energy === creep.carryCapacity){
    creep.memory.state = "deliver";
}
else if(creep.memory.state === undefined){
    creep.memory.state = "deliver"; //Edge case
}
if(creep.memory.state === 'pickup'){
    if(storage.length > 0){
        creep.moveTo(storage[0]);
        storage[0].transferEnergy(creep);
    }else{
        creep.moveTo(droppedEnergy);
        creep.pickup(droppedEnergy);
    }
}

else if(creep.memory.state === 'deliver'){
		//lastly extensions
			let extensions = creep.room.find(FIND_MY_STRUCTURES, {
				filter: function(s) {
					return s.structureType == STRUCTURE_EXTENSION && s.energy < s.energyCapacity;
				}
			});
    if(extensions.length > 0){
        creep.moveTo(extensions[0]);
        creep.transferEnergy(extensions[0]);
    }
    else if(spawn.energy < spawn.energyCapacity){
    creep.moveTo(spawn);
    creep.transferEnergy(spawn);
    }
}
};