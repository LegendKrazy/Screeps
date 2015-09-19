"use strict";

const MINING_ACTION = 1;
const COURIER_ACTION = 2;

let spawn = Game.spawns.Spawn1;
let sources = spawn.room.find(FIND_SOURCES);

module.exports=function (worker, index) {
    worker.memory.action = worker.memory.action || MINING_ACTION;
    let targets = worker.room.find(FIND_CONSTRUCTION_SITES);
    let storages = worker.room.find(FIND_MY_STRUCTURES, {
        filter: function(s) {
            return s.structureType == STRUCTURE_EXTENSION
            && s.energy < s.energyCapacity;
        }
});
    if (worker.memory.action === MINING_ACTION) {
	worker.moveTo(sources[index % 2]);
	worker.harvest(sources[index % 2]);
	if (worker.carry.energy === worker.carryCapacity) {
	    worker.memory.action = COURIER_ACTION;
	}
    } else {
	if (spawn.energy < spawn.energyCapacity) {
	    worker.moveTo(spawn);
	    worker.transferEnergy(spawn);
	} else if(targets.length) {
	    worker.moveTo(targets[0]);
	    worker.build(targets[0]);
	} else if(storages.length > 0){
        worker.moveTo(storages[0]);
        worker.transferEnergy(storages[0]);
    }
	else {
	    worker.moveTo(spawn.room.controller);
	    worker.upgradeController(spawn.room.controller);
	}
	if (worker.carry.energy === 0) {
	    worker.memory.action = MINING_ACTION;
	}
    }
};