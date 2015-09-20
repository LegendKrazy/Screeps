'use strict'

var spawn = Game.spawns.Spawn1;
var energyAvailable = spawn.room.energyAvailable;
var spawnType = {
    createMiner: function(){
        var success = false;
        if(energyAvailable >=700){
            success = spawn.createCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE],{role: 'miner', modulo: Memory.miners});
        }
        else if(energyAvailable >= 300){
            success = spawn.createCreep([WORK,CARRY,MOVE,MOVE],{role: 'miner', modulo: Memory.miners});
        }
        if(_.isString(success)){
            Memory.miners++;
        }
    },
    createTransporter: function(){
        var success = false;
        if(energyAvailable >=300){
            success = spawn.createCreep([CARRY,MOVE,CARRY,MOVE,CARRY,MOVE],{role: 'transporter', modulo: Memory.transporters});
        }
        if(_.isString(success)){
            Memory.transporters++;
        }
    },
    createBuilder: function(){
        var success = false;
        if(energyAvailable >= 300){
            success = spawn.createCreep([MOVE, CARRY, WORK, WORK],{role: 'builder'});
        }
        if(_.isString(success)){
            Memory.builders++;
        }
    },
    createUpgrader: function(){
        var success = false;
        if(energyAvailable >= 300){
            success = spawn.createCreep([MOVE, CARRY, WORK, WORK],{role: 'upgrader'});
        }
        if(_.isString(success)){
            Memory.upgraders++;
        }
    }
};

module.exports = spawnType;