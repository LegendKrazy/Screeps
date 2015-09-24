"use strict";
//Builder + upgrader when nothing to build
module.exports = function(creep){
    let spawn = Game.spawns.Spawn1;
    let targets = creep.room.find(FIND_CONSTRUCTION_SITES);
    
        
    if (creep.carry.energy == 0){
        creep.moveTo(spawn);
        spawn.transferEnergy(creep);
    }
    else if(targets.length) {
	    creep.moveTo(targets[0]);
	    creep.build(targets[0]);
    } 
    else{
        creep.moveTo(spawn.room.controller);
	    creep.upgradeController(spawn.room.controller);
    }
    if (creep.carry.energy == 0){
        creep.moveTo(spawn);
        spawn.transferEnergy(creep);
    }
};