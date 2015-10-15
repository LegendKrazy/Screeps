//Storage energy averages
"use strict";
module.exports = function logThisEveryTick() {
	
	//	if we haven't built this variable yet, build it now
	//	this should only get run once
	if(Memory.stats == undefined){
		Memory.stats = {};
	}
	if(Memory.stats.energyTicks === undefined){
		Memory.stats.energyTicks = [];
	}
	if(Memory.stats.averageEnergy100 === undefined){
		Memory.stats.averageEnergy100 = [];
	}
	if(Memory.stats.ept === undefined){
		Memory.stats.ept = []
	}
	//	add the current energy to the list of previous energies
	if(Memory.stats.energyTicks.length < 100){
		let spawn = Game.spawns.Spawn1;
		let storage = spawn.room.storage;
		Memory.stats.energyTicks.push(storage.store.energy);
	}
	// get rid of anything older than 100 ticks
	if(Memory.stats.energyTicks.length >= 100) {
		Memory.stats.energyTicks.push();
		// shift removes Memory.stats.energyTicks[0]
		// get the change in energy from the current tick to the tick from 15 ticks ago
		var delta = Memory.stats.energyTicks[0] - Memory.stats.energyTicks[Memory.stats.energyTicks.length - 1];
		//console.log(delta/Memory.stats.energyTicks.length+" energy per tick");
		let energyPerSec = delta/Memory.stats.energyTicks.length;
		let energySum100 = _.sum(Memory.stats.energyTicks);
		let energyLength = Memory.stats.energyTicks.length;
		let average = energySum100/energyLength;
		Memory.stats.averageEnergy100 = average;
		Memory.stats.ept = energyPerSec;
		
	}
	
};


