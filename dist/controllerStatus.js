//Controller Upgrade progress
"use strict";
module.exports = function() {
    let spawn = Game.spawns.Spawn1;
    let controllerTick = spawn.room.controller.progress - Memory.controllerTick;
    Memory.controllerTick = spawn.room.controller.progress;
    let ticksLeft = spawn.room.controller.progressTotal - spawn.room.controller.progress;
    ticksLeft = ticksLeft/controllerTick;
    ticksLeft = ticksLeft.toFixed(0);
    let controllerProgress = (spawn.room.controller.progress/spawn.room.controller.progressTotal)*100;
    controllerProgress = +controllerProgress.toFixed(2);
    //delay 50 to print status
    console.log('Controller upgrade progress: '+controllerProgress+"%");
    console.log('~'+ticksLeft+' ticks until next level');
};