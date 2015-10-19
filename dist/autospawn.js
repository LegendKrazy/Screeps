'use strict'

var spawn = Game.spawns.Spawn1;
var energyAvailable = spawn.room.energyAvailable;
var spawnType = {
    createMiner: function () {
        var success = false;
        if (energyAvailable >= 900) {
            success = spawn.createCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], {
                role: 'miner',
                modulo: Memory.miners
            });
        }
        if (energyAvailable >= 650) {
            success = spawn.createCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE], {
                role: 'miner',
                modulo: Memory.miners
            });
        }
        else if (energyAvailable >= 300) {
            success = spawn.createCreep([WORK, WORK, MOVE, MOVE], {
                role: 'miner',
                modulo: Memory.miners
            });
        }
        if (_.isString(success)) {
            Memory.miners++;
        }
    },
    createTransporter: function () {
        var success = false;

        /*if(energyAvailable >= 1000){
            success = spawn.createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],{role: 'transporter', modulo: Memory.transporters});
        }
        else if(energyAvailable >= 950){
            success = spawn.createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],{role: 'transporter', modulo: Memory.transporters});
        } */
        if (energyAvailable >= 850) {
            success = spawn.createCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], {
                role: 'transporter',
                modulo: Memory.transporters
            });
        }
        else if (energyAvailable >= 700) {
            success = spawn.createCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], {
                role: 'transporter',
                modulo: Memory.transporters
            });
        }
        else if (energyAvailable >= 400) {
            success = spawn.createCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], {
                role: 'transporter',
                modulo: Memory.transporters
            });
        }
        else if (energyAvailable >= 300) {
            success = spawn.createCreep([CARRY, MOVE, CARRY, MOVE, CARRY, MOVE], {
                role: 'transporter',
                modulo: Memory.transporters
            });
        }
        if (_.isString(success)) {
            Memory.transporters++;
        }
    },
    createBuilder: function () {
        var success = false;
        if (energyAvailable >= 650) {
            success = spawn.createCreep([MOVE, MOVE, MOVE, CARRY, CARRY, WORK, WORK, WORK, WORK], {
                role: 'builder'
            });
        }
        else if (energyAvailable >= 500) {
            success = spawn.createCreep([MOVE, MOVE, CARRY, CARRY, WORK, WORK, WORK], {
                role: 'builder'
            });
        }
        if (_.isString(success)) {
            Memory.builders++;
        }
    },
    createUpgrader: function () {
        var success = false;
        if(energyAvailable >= 1500){
            success = spawn.createCreep([MOVE,MOVE,CARRY,CARRY,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK],{role: 'upgrader'});
        }
        else if(energyAvailable >= 1050){
            success = spawn.createCreep([MOVE,MOVE,CARRY,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK],{role: 'upgrader'});
        }
        else if (energyAvailable >= 650) {
            success = spawn.createCreep([MOVE,MOVE,CARRY,WORK,WORK,WORK,WORK,WORK], {
                role: 'upgrader'
            });
        }
        if (_.isString(success)) {
            Memory.upgraders++;
        }
    },
    createJanitor: function () {
        var success = false;
        if (energyAvailable >= 500) {
            success = spawn.createCreep([MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY], {
                role: 'janitor'
            });
        }
        if (_.isString(success)) {
            Memory.janitors++;
        }
    },
    createRepairer: function () {
        var success = false;
        if (energyAvailable >= 700) {
            success = spawn.createCreep([MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, WORK, WORK, WORK, WORK], {
                role: 'repairer'
            });
        }
        else if (energyAvailable >= 500) {
            success = spawn.createCreep([MOVE, MOVE, MOVE, CARRY, CARRY, WORK, WORK, WORK], {
                role: 'repairer'
            });
        }
        if (_.isString(success)) {
            Memory.repairers++;
        }
    },
    createShuttle: function () {
        var success = false;
        if (energyAvailable >= 800) {
            success = spawn.createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], {
                role: 'shuttle'
            });
        }
        else if (energyAvailable >= 650) {
            success = spawn.createCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], {
                role: 'shuttle'
            });
        }
        else if (energyAvailable >= 400) {
            success = spawn.createCreep([CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], {
                role: 'shuttle'
            });
        }
        else if (energyAvailable >= 300) {
            success = spawn.createCreep([MOVE, MOVE, MOVE, CARRY, CARRY, CARRY], {
                role: 'shuttle'
            });
        }
        if (_.isString(success)) {
            Memory.shuttles++;
        }

    },
    createDefender: function () {
        var success = false;
        if (energyAvailable >= 800) {
            success = spawn.createCreep([MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK], {
                role: 'defender'
            });
        }
        if (energyAvailable >= 600) {
            success = spawn.createCreep([MOVE, MOVE, MOVE, MOVE, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, ATTACK, ATTACK, ATTACK, ATTACK], {
                role: 'defender'
            });
        }
        else if (energyAvailable >= 560) {
            success = spawn.createCreep([MOVE, MOVE, MOVE, MOVE, TOUGH, TOUGH, TOUGH, TOUGH, ATTACK, ATTACK, ATTACK, ATTACK], {
                role: 'defender'
            });
        }
        else if (energyAvailable >= 300) {
            success = spawn.createCreep([MOVE, MOVE, TOUGH, TOUGH, TOUGH, TOUGH, ATTACK, ATTACK], {
                role: 'defender'
            });
        }
        if (_.isString(success)) {
            Memory.defenders++;
        }

    },
    createLinker: function () {
        var success = false;
        if (energyAvailable >= 100) {
            success = spawn.createCreep([MOVE, CARRY, CARRY], {
                role: 'linker'
            });
        }
        if (_.isString(success)) {
            Memory.linkers++;
        }
    },
    createRoadworker: function () {
        var success = false;
        if (energyAvailable >= 800) {
            success = spawn.createCreep([MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, WORK, WORK, WORK], {
                role: 'roadworker'
            });
        }
        else if (energyAvailable >= 600) {
            success = spawn.createCreep([MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, WORK, WORK, WORK], {
                role: 'roadworker'
            });
        }
        else if (energyAvailable >= 300) {
            success = spawn.createCreep([MOVE, MOVE, CARRY, CARRY, WORK], {
                role: 'roadworker'
            });
        }
        if (_.isString(success)) {
            Memory.roadworkers++;
        }
    },
    createScout: function () {
        var success = false;
        if (energyAvailable >= 150) {
            success = spawn.createCreep([MOVE,MOVE,ATTACK], {
                role: 'scout'
            });
        }
        if (_.isString(success)) {
            Memory.scouts++;
        }
    },
};

module.exports = spawnType;