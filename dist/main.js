"use strict";

var workerFunc = require('worker');

let spawn = Game.spawns.Spawn1;
let workerCount = 5;

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

for (let index in workerList) {
    let workerName = workerList[index];
    let worker = Game.creeps[workerName];
    workerFunc(worker, index);
}


if (workerList.length < workerCount) {
    spawnWorker();
}

Memory.workerList = workerList;