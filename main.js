"use strict";
let spawn = Game.spawns.Spawn1;
let sources = spawn.room.find(FIND_SOURCES);
let workerCount = 3;

const MINING_ACTION = 1;
const COURIER_ACTION = 2;

let workerList = Memory.workerList || [];
let activeWorkerList = [];
for (let index in workerList) {
    let workerName = workerList[index];
    let worker = Game.creeps[workerName];
    if (worker) {
    	activeWorkerList.push(workerName);
    }
}

workerList = activeWorkerList;
let spawnWorker = function() {
    let body = [MOVE, CARRY, WORK, WORK];
    let success = spawn.createCreep(body);
    if (_.isString(success)) {
	workerList.push(success);
    };
};

let doThing=function (index, worker) {
    worker.memory.action = worker.memory.action || MINING_ACTION;
    var targets = worker.room.find(FIND_CONSTRUCTION_SITES);

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
for (let index in workerList) {
    let workerName = workerList[index];
    let worker = Game.creeps[workerName];
    doThing(index, worker);
}


if (workerList.length < workerCount) {
    spawnWorker();
}

Memory.workerList = workerList;
