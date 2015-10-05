'use strict';
var hooks = require('hooks');
var autospawn = require("autospawn");
var minerFunc = require("miner");
var transporterFunc = require("transporter");
var builderFunc = require('builder');
var upgraderFunc = require('upgrader');
var janitorFunc = require('janitor');
var repairerFunc = require("repairer");
var shuttleFunc = require("shuttle");

hooks();
for(var name in Memory.creeps){
    if(!Game.creeps[name]){
        delete Memory.creeps[name];
    }
}
for(var name in Game.creeps){
    let creep = Game.creeps[name];
        Memory.bots[creep.memory.role].push(creep.id);
}  
if(Memory.bots.miner.length < 2){
    autospawn.createMiner();
}
if(Memory.bots.transporter.length < 2){
    autospawn.createTransporter();
}
if(Memory.bots.upgrader.length < 2){
    autospawn.createUpgrader();
}
if(Memory.bots.builder.length < 2){
    autospawn.createBuilder();
}
if(Memory.bots.janitor.length < 2){
    autospawn.createJanitor();
}
if(Memory.bots.repairer.length < 2){
    autospawn.createRepairer();
}
if(Memory.bots.shuttle.length < 1){
    autospawn.createShuttle();
}


let spawn = Game.spawns.Spawn1;
let sources = spawn.room.find(FIND_SOURCES);

if(Memory.miners >= sources.length){
    Memory.miners = 0;
}
if(Memory.transporters >= Memory.bots.miner.length){
    Memory.transporters = 0;
}
for (var name in Game.creeps) {
    let creep = Game.creeps[name];
    let role = creep.memory.role;

    if(role === 'miner'){
        minerFunc(creep);
    }
    else if(role === 'transporter'){
        transporterFunc(creep);
    }
    else if(role === 'builder'){
        builderFunc(creep);
    }
    else if(role === 'upgrader'){
        upgraderFunc(creep);
    }
    else if (role === 'janitor'){
        janitorFunc(creep);
    }
    else if (role === 'repairer'){
        repairerFunc(creep);
    }
    else if (role === 'shuttle'){
        shuttleFunc(creep);
    }
}