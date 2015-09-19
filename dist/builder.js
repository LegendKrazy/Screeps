"use strict";

module.exports = function(creep){
    let spawn = Game.spawns.Spawn1;
    let targets = creep.room.find(FIND_CONSTRUCTION_SITES);
    let sources = spawn.room.find(FIND_SOURCES);
    if (creep.carry.energy == 0){
        creep.moveTo(sources[0]);
        creep.harvest(sources[0]);
    }
    if(targets.length) {
	    creep.moveTo(targets[0]);
	    creep.build(targets[0]);
    }
    else {
	    creep.moveTo(spawn.room.controller);
	    creep.upgradeController(spawn.room.controller);
	}
};