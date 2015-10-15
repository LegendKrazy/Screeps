"use strict";
module.exports = function(creep) {
	let storage = creep.room.storage;
	let droppedEnergy = creep.pos.findInRange(FIND_DROPPED_ENERGY,1)[0];
	let linkOne = Game.getObjectById('5614faac4e618afe58073d22');
	let assignedMiner = Game.getObjectById(creep.memory.miner);
	//if assignedMiner does not exist....
	if(!assignedMiner){
		delete creep.memory.miner;
	}
	//define miner (whether there or not)
	//assign new miner if need be
	if (assignedMiner == undefined || assignedMiner == null) {
		var minerlist = creep.room.find(FIND_MY_CREEPS, {filter: function(o){
				return o.memory.role === 'miner' && !o.memory.transporter;
				}});
		if(minerlist[0]){
			creep.memory.miner = minerlist[0].id;
			minerlist[0].memory.transporter = creep.id;
		}
	}
	//if creep's not full go to the miner and fill up
	if(creep.carry.energy < creep.carryCapacity){
		if (!creep.pos.isNearTo(assignedMiner)) {
			creep.moveTo(assignedMiner, {reusePath: 15});
		}else{
			assignedMiner.transferEnergy(creep);
			creep.pickup(droppedEnergy);
		}
	}	//otherwise head back to the storage site
	 else {
		//if creep is not near storage but near the link, move to the spot between link and miner then transfer
		if (!creep.pos.isNearTo(storage) && creep.pos.isNearTo(41,12)){
			creep.moveTo(41,12, {reusePath: 15});
        	creep.transferEnergy(linkOne);
        } //if creep is not near either storage and miner, move to the storage to transfer
		else{
			creep.moveTo(storage, {reusePath: 15});
			creep.transferEnergy(storage);
		}
	}
};