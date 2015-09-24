"use strict";

module.exports = function(creep){
    let spawn = Game.spawns.Spawn1;
    if (creep.carry.energy == 0){
        creep.moveTo(spawn);
        if(spawn.room.energyAvailable === 300){
            spawn.transferEnergy(creep);
        }
    }
    else{
        creep.moveTo(spawn.room.controller);
	    creep.upgradeController(spawn.room.controller);
    }  
};