//tracks CPU per tick.
"use strict";
module.exports = function() {
    if (Game.cpuLimit < 500){
        console.log('CPU Limit: '+Game.cpuLimit);
        Game.notify('CPU Limit: '+Game.cpuLimit+"CPU used last tick: "+Memory.cpuAverage[Memory.cpuAverage.length-1],0);
    }
    if(!Memory.cpuAverage){
        Memory.cpuAverage = [];
    }
    if(Memory.cpuAverage.length > 2000){
        Memory.cpuAverage.shift();
    }
    let average = 0;
    for(let i in Memory.cpuAverage){
        average += Memory.cpuAverage[i];
    }
    average = average/Memory.cpuAverage.length;
    average = +average.toFixed(2);
    console.log('CPU average usage: '+average+'ms/tick');
    
    let cpu = Game.getUsedCpu();
Memory.cpuAverage.push(Game.getUsedCpu() - cpu);
};