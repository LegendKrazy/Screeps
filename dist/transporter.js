"use strict";
module.exports = function(creep) {
	let store = Game.getObjectById(creep.memory.store);
	let spawn = Game.spawns.Spawn1;
	let assignedMiner = Game.getObjectById(creep.memory.miner);
	//if assignedMiner does not exist....
	if(!assignedMiner){
		delete creep.memory.miner;
	}
	//define miner (whether there or not)
	//assign new miner if need be
	if (assignedMiner == undefined) {
		var minerlist = creep.room.find(FIND_MY_CREEPS, {filter: function(o){
				return o.memory.role === 'miner' && !o.memory.transporter;
				}});
		if(minerlist[0]){
		creep.memory.miner = minerlist[0].id;
		minerlist[0].memory.transporter = creep.id;
		}
	}

	//look for a new store if the current one doesn't exist or its storage is full
	if (store == undefined || store == null || (store.energy != undefined && store.energy >= store.energyCapacity) || (store.store != undefined && store.store.energy >= store.storeCapacity)) {
		//room storage is first priority
		if (creep.room.storage != undefined)
			creep.memory.store = creep.room.storage.id;
		//then the spawner (should expand to account for multiple spawners)
		else if (spawn.energy < spawn.energyCapacity)
			creep.memory.store = spawn.id;
		//lastly extensions
		else {
			let storages = creep.room.find(FIND_MY_STRUCTURES, {
				filter: function(s) {
					return s.structureType == STRUCTURE_STORAGE && s.store.energy < s.store.energyCapacity;
				}
			});
			if (storages.length > 0)
				creep.memory.store = storages[0].id;
		}
		store = Game.getObjectById(creep.memory.store);
	}
	//if creep's not full go to the miner and fill up
	if (creep.carry.energy < creep.carryCapacity) {
		if (!creep.pos.isNearTo(assignedMiner)) {
			creep.moveTo(assignedMiner, {reusePath: 15});
			
		}else {
			creep.pickup(assignedMiner);
			assignedMiner.transferEnergy(creep);
		}
	//otherwise head back to the storage site
	} else {
		if (!creep.pos.isNearTo(store))
			creep.moveTo(store, {reusePath: 15});
		else
			creep.transferEnergy(store);
	}
};