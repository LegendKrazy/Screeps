"use strict";
module.exports = function(creep) {

	if (creep.memory.state == undefined || creep.carry.energy == 0) {
		creep.memory.state = "pickup";
	} else if (creep.carry.energy == creep.carryCapacity) {
		creep.memory.state = "work";
	}
	if (creep.memory.state == "pickup") {
		let storage = creep.room.storage;
		if (storage) {
			creep.moveTo(storage, {reusePath: 15});
			storage.transferEnergy(creep);
		}
	} else if (creep.memory.state == "work") {
		let target = Game.getObjectById(creep.memory.targetId);
		if (target == null) {
			let roadToRepair = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: function(object) {
					return object.structureType == STRUCTURE_ROAD && (object.hits < object.hitsMax * 0.40);
				}});
			if (roadToRepair == null)
				return;
			target = roadToRepair;
			creep.memory.targetId = roadToRepair.id;
		} else {
			if (target.hits == target.hitsMax) {
				creep.memory.targetId = undefined;
				target = null;
			} else {
				creep.moveTo(target, {reusePath: 15});
				creep.repair(target);
			}
		}
	}

};