"use strict";
module.exports = function(creep){
    
    
    if(creep.carry.energy === 0){
        creep.memory.state = "pickup";
    }
    if(creep.carry.energy === creep.carryCapacity || creep.memory.state === undefined){
        creep.memory.state = "deliver";
    }
    if(creep.memory.state === 'pickup'){
        let storage = creep.room.storage;
        if(storage){
            creep.moveTo(storage, {reusePath: 15});
            storage.transferEnergy(creep);
        }
    }
    
    else if(creep.memory.state === 'deliver'){
    		//lastly extensions
    		    let spawn = Game.spawns.Spawn1;
    			let extensions = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {filter: function(s) {
    					return s.structureType == STRUCTURE_EXTENSION && s.energy < s.energyCapacity;
    				}});
        if(extensions){
            creep.moveTo(extensions, {reusePath: 15});
            creep.transferEnergy(extensions);
        }
        else if(spawn.energy < spawn.energyCapacity){
        creep.moveTo(spawn, {reusePath: 15});
        creep.transferEnergy(spawn);
        }
    }
};