module.exports = function(creep){
    var target = Game.getObjectById(creep.memory.target);
    var spawn = Game.spawns.Spawn1;
    var miner = Game.creeps[creep.memory.miner];
    
    if(!miner || miner == undefined){
    	if(!Memory.transporters || Memory.transporters >= Memory.bots.miner.length){
    		Memory.transporters = 0;
    	}
    	miner = Memory.bots.miner[Memory.transporters];
    	creep.memory.miner = miner;
    	miner = Game.creeps[miner];
    	Memory.transporters++;
    }
    
    else if(!target || target.energy == target.energyCapacity){
    	var storages = creep.room.find(FIND_MY_STRUCTURES, {
    		filter: function(s){
    			return s.energy < s.energyAvailable;
    		}
    	});
    	if(storages.length > 0){
	    	target = storages[0];
	    	creep.memory.target = target.id;
    	}
    }
    else if(creep.carry.energy < creep.carryCapacity){
		creep.moveTo(miner);
		miner.transferEnergy(creep);
	}else if(creep.carry.energy === creep.carryCapacity){
		if(spawn.energy < spawn.energyCapacity){
			creep.moveTo(spawn);
			creep.transferEnergy(spawn);
		}else if(storages.length > 0){
			creep.moveTo(target);
			creep.transferEnergy(target);
		}
	}
};
