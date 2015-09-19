"use strict";

for(var name in Memory.creeps){
    if(!Game.creeps[name]){
        delete Memory.creeps[name];
    }
}
for(var role in Memory.bots){
    for(var name in Memory.bots[role]){
        if(!Game.creeps[name]){
            delete Memory.bots[role][name];
        }
    }
}
for(var name in Game.creeps){
    let creep = Game.creeps[name];

    if(!Memory.bots){
        Memory.bots = {};
    }
    if(!Memory.bots[creep.role]){
        Memory.bots[creep.role] = [];
    }
    if(Memory.bots[creep.role].indexOf(creep.name) < 0){
        Memory.bots[creep.role].push(creep.name);
    }
}

var workerFunc = require('worker');

let spawn = Game.spawns.Spawn1;
let sources = spawn.room.find(FIND_SOURCES);
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
    }
};

for (let index in workerList) {
    let workerName = workerList[index];
    let worker = Game.creeps[workerName];
    let role = worker.memory.role;
    
    if(role === undefined){
        workerFunc(worker, index);
    }
    else if(role === 'miner'){
        workerFunc(worker, index);
    }
    else if(role === 'transporter'){
        workerFunc(transporter,index);
    }
    else if(role === 'builder'){
        workerFunc(builder,index);
    }
    else if(role === 'upgrader'){
        workerFunc(upgrader, index);
    }
}

if (workerList.length < workerCount) {
    spawnWorker();
}

Memory.workerList = workerList;