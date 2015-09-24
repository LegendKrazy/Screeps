"use strict";
module.exports = function(creep){
    let target = Game.getObjectById(creep.memory.target);
    let spawn = Game.spawns.Spawn1;
    let miner = Memory.creeps[miner];
    let storages = creep.room.find(FIND_MY_STRUCTURES, {
        filter: function(s) {
            return s.structureType == STRUCTURE_EXTENSION
            && s.energy < s.energyCapacity;
        }
});
   if(creep.carry.energy < creep.carryCapacity){
		creep.moveTo(miner);
		creep.pickup(miner);
		miner.transferEnergy(creep);
	}else{
		if(spawn.energy < spawn.energyCapacity){
			creep.moveTo(spawn);
			creep.transferEnergy(spawn);
		}else if(storages.length > 0){
			creep.moveTo(target);
			creep.transferEnergy(target);
		}
	}
    
    
};