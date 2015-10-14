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
var defenderFunc = require("defender");
var linkerFunc = require("linker");
var linkFrom = Game.spawns.Spawn1.room.lookForAt('structure', 42, 11)[0];
var linkTo = Game.spawns.Spawn1.room.lookForAt('structure', 15, 34)[0];
var creepWork = require("creep");
var mining = require("mining");
var roadworkerFunc = require("roadworker");

hooks();
for(var name in Memory.creeps){
    if(!Game.creeps[name]){
        delete Memory.creeps[name];
    }
}
for(var name in Game.creeps){
    let creep = Game.creeps[name];
    if (creep.memory.role) {
        Memory.bots[creep.memory.role].push(creep.id);
    }
}  
if(Memory.bots.miner.length < 1){
    autospawn.createMiner();
}
if(Memory.bots.transporter.length < 1){
    autospawn.createTransporter();
}
if(Memory.bots.upgrader.length < 4){
    autospawn.createUpgrader();
}
if(Memory.bots.builder.length < 2){
    autospawn.createBuilder();
}
if(Memory.bots.janitor.length < 1){
    autospawn.createJanitor();
}
if(Memory.bots.repairer.length < 0){
    autospawn.createRepairer();
}
if(Memory.bots.shuttle.length < 1){
    autospawn.createShuttle();
}
if(Memory.bots.defender.length < 0){
    autospawn.createDefender();
}
if(Memory.bots.linker.length < 1){
    autospawn.createLinker();
}
if(Memory.bots.roadworker.length < 1){
    autospawn.createRoadworker();
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
    else if (role === 'defender'){
        defenderFunc(creep);
    }
    else if (role === 'linker'){
        linkerFunc(creep);
    }
    else if (role === 'roadworker'){
        roadworkerFunc(creep);
    }
}

//link transfer
if(linkFrom){
    linkFrom.transferEnergy(linkTo);
}
var storageConfig = {x:15, y:36};
var config = {miningFlag:"FlagBottom", minerCount:1, courierCount:1, destRoom:"E19S2", storage:storageConfig};

mining (config);
