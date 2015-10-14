"use strict";
module.exports = function(creep){
    
    if(creep.carry.energy === 0){
        creep.memory.state = "pickup";
    }   
    if(creep.carry.energy === creep.carryCapacity){
        creep.memory.state = "work";
    }
    else if(creep.memory.state === undefined){
        creep.memory.state = "work"; 
    }
    if(creep.memory.state === 'pickup'){
        let storage = creep.room.storage;
        if(storage){
            creep.moveTo(storage, {reusePath: 15});
            storage.transferEnergy(creep);
        }
    }
    else if(creep.memory.state === 'work'){
        let target = Game.getObjectById(creep.memory.targetId);
        if(target === null || target === undefined){
            let roadToRepair = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: function(object){
                return object.structureType === STRUCTURE_ROAD && (object.hits < object.hitsMax * 0.40);
        }});
            target = roadToRepair;
            creep.memory.targetId = roadToRepair.id;
            if(roadToRepair === null || target === null){
                return;
            }
        }
        else{
            creep.moveTo(target,  {reusePath: 15});
            creep.repair(target);
        }
        if(target.hits == target.hitsMax){
            creep.memory.targetId = "";
        }
    }

};