"use strict";
module.exports = function(creep){
    let spawn = Game.spawns.Spawn1;
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
        creep.moveTo(storage[0]);
        creep.pickup(storage[0]);
    }

else if(creep.memory.state === 'deliver'){
		//lastly extensions
			let storages = creep.room.find(FIND_MY_STRUCTURES, {
				filter: function(s) {
					return s.structureType == STRUCTURE_EXTENSION && s.energy < s.energyCapacity;
				}
			});
    if(storages.length > 0){
        creep.moveTo(storages[0]);
        creep.transferEnergy(storages[0]);
    }
    else if(spawn.energy < spawn.energyCapacity){
    creep.moveTo(spawn);
    creep.transferEnergy(spawn);
    }
}
};