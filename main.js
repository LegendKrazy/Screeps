"use strict";

var worker = require('worker');

let spawn = Game.spawns.Spawn1;
let sources = spawn.room.find(FIND_SOURCES);
let workerCount = 5;
       

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

for (let index in workerList) {
    let workerName = workerList[index];
    let worker = Game.creeps[workerName];
    worker(worker, index);
}


if (workerList.length < workerCount) {
    spawnWorker();
}

Memory.workerList = workerList;
