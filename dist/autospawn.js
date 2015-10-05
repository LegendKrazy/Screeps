'use strict'

var spawn = Game.spawns.Spawn1;
var energyAvailable = spawn.room.energyAvailable;
var spawnType = {
    createMiner: function(){
        var success = false;
        if(energyAvailable >=850){
            success = spawn.createCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE],{role: 'miner', modulo: Memory.miners});
        }
        else if(energyAvailable >=700){
            success = spawn.createCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE],{role: 'miner', modulo: Memory.miners});
        }
        else if(energyAvailable >=500){
            success = spawn.createCreep([WORK,WORK,WORK,WORK,CARRY,MOVE],{role: 'miner', modulo: Memory.miners});
        }
        else if(energyAvailable >= 300){
            success = spawn.createCreep([WORK,WORK,CARRY,MOVE],{role: 'miner', modulo: Memory.miners});
        }
        if(_.isString(success)){
            Memory.miners++;
        }
    },
    createTransporter: function(){
        var success = false;
        if(energyAvailable >= 1200){
            success = spawn.createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],{role: 'transporter', modulo: Memory.transporters});
        }
        else if(energyAvailable >= 1000){
            success = spawn.createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],{role: 'transporter', modulo: Memory.transporters});
        }
        else if(energyAvailable >= 900){
            success = spawn.createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE],{role: 'transporter', modulo: Memory.transporters});
        }
        else if(energyAvailable >= 700){
            success = spawn.createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],{role: 'transporter', modulo: Memory.transporters});
        }
        else if(energyAvailable >= 400){
            success = spawn.createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE],{role: 'transporter', modulo: Memory.transporters});
        }
        else if(energyAvailable >=300){
            success = spawn.createCreep([CARRY,MOVE,CARRY,MOVE,CARRY,MOVE],{role: 'transporter', modulo: Memory.transporters});
        }
        if(_.isString(success)){
            Memory.transporters++;
        }
    },
    createBuilder: function(){
        var success = false;
        if(energyAvailable >= 850){
            success = spawn.createCreep([MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,WORK,WORK,WORK,WORK,WORK],{role: 'builder'});
        }
        else if(energyAvailable >= 700){
            success = spawn.createCreep([MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,WORK,WORK,WORK,WORK],{role: 'builder'});
        }
        else if(energyAvailable >= 500){
            success = spawn.createCreep([MOVE,MOVE,CARRY,CARRY,WORK,WORK,WORK],{role: 'builder'});
        }
        else if(energyAvailable >= 300){
            success = spawn.createCreep([MOVE,MOVE,CARRY,WORK],{role: 'builder'});
        }
        if(_.isString(success)){
            Memory.builders++;
        }
    },
    createUpgrader: function(){
        var success = false;
        if(energyAvailable >= 700){
            success = spawn.createCreep([MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,WORK,WORK,WORK,WORK],{role: 'upgrader'});
        }
        else if(energyAvailable >= 500){
            success = spawn.createCreep([MOVE,MOVE,CARRY,CARRY,WORK,WORK,WORK],{role: 'upgrader'});
        }
        else if(energyAvailable >= 300){
            success = spawn.createCreep([MOVE,MOVE,CARRY,WORK],{role: 'upgrader'});
        }
        if(_.isString(success)){
            Memory.upgraders++;
        }
    },
    createJanitor: function(){
        var success = false;
        if(energyAvailable >= 900){
            success = spawn.createCreep([MOVE,MOVE,MOVE,MOVE,MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,CARRY,CARRY],{role: 'janitor'});
        }
        else if(energyAvailable >= 700){
            success = spawn.createCreep([MOVE,MOVE,MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],{role: 'janitor'});
        }
        else if(energyAvailable >= 600){
            success = spawn.createCreep([MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],{role: 'janitor'});
        }
        else if(energyAvailable >= 300){
            success = spawn.createCreep([MOVE,MOVE,MOVE,CARRY,CARRY,CARRY],{role: 'janitor'});
        }
        if(_.isString(success)){
            Memory.janitors++;
        }
    },
    createRepairer: function(){
        var success = false;
        if(energyAvailable >= 900){
            success = spawn.createCreep([MOVE,MOVE,MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, WORK, WORK, WORK, WORK, WORK],{role: 'repairer'});
        }
        else if(energyAvailable >= 800){
            success = spawn.createCreep([MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, WORK, WORK, WORK, WORK],{role: 'repairer'});
        }
        else if(energyAvailable >= 700){
            success = spawn.createCreep([MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, WORK, WORK, WORK, WORK],{role: 'repairer'});
        }
        else if(energyAvailable >= 500){
            success = spawn.createCreep([MOVE, MOVE, MOVE, CARRY, CARRY, WORK, WORK, WORK],{role: 'repairer'});
        }
        else if(energyAvailable >= 300){
            success = spawn.createCreep([MOVE, MOVE, CARRY, CARRY, WORK],{role: 'repairer'});
        }
        if(_.isString(success)){
            Memory.repairers++;
        }
    },
    createShuttle: function(){
        var success = false;
        if(energyAvailable >= 900){
            success = spawn.createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],{role: 'shuttle'});
        }
        else if(energyAvailable >= 700){
            success = spawn.createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],{role: 'shuttle'});
        }
        else if(energyAvailable >= 400){
            success = spawn.createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE],{role: 'shuttle'});
        }
        else if(energyAvailable >=300){
            success = spawn.createCreep([CARRY,MOVE,CARRY,MOVE,CARRY,MOVE],{role: 'shuttle'});
        }
        if(_.isString(success)){
            Memory.shuttles++;
        }
        
    }
};

module.exports = spawnType;