"use strict";

var workerFunc = require('worker');

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
if(Memory.miners >= sources.length){
    Memory.miners = 0;
}
workerList = activeWorkerList;
let spawnWorker = function() {
    let body = [MOVE, CARRY, WORK, WORK];
    let success = spawn.createCreep(body,{role: 'miner', modulo: Memory.miners});
    if (_.isString(success)) {
	workerList.push(success);
	Memory.miners++;
    };
};

for (let index in workerList) {
    let workerName = workerList[index];
    let worker = Game.creeps[workerName];
    let role = worker.memory.role;
    
    if(role === undefined){
        workerFunc(worker, index);
    }
    else if(role === 'miner'){
        minerFunc
    }
}


if (workerList.length < workerCount) {
    spawnWorker();
}

Memory.workerList = workerList;
