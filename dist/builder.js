"use strict";
//Builder + upgrader when nothing to build
module.exports = function(creep){
    let storage = creep.room.storage;
    let constructionSites = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
    let structures = creep.room.find(FIND_MY_STRUCTURES, {
        filter: function(s) {
            var IS_MY_STRUCTURE = s.owner !== undefined && s.owner.username === 'Wimbley';
            var HAS_LOW_HEALTH = s.hits < s.hitsMax;
            return (s.structureType == STRUCTURE_RAMPART || IS_MY_STRUCTURE) && HAS_LOW_HEALTH;
        }
});
 
if(creep.carry.energy === 0){
    creep.memory.state = "pickup";
}
if(creep.carry.energy === creep.carryCapacity){
    creep.memory.state = "work";
}
else if(creep.memory.state === undefined){
    creep.memory.state = "work"; //Edge case
}
if(creep.memory.state === 'pickup'){
    
    if(storage){
        creep.moveTo(storage, {reusePath: 15});
        storage.transferEnergy(creep);
    }
}
else if(creep.memory.state === 'work'){
    if(constructionSites) {
	   creep.moveTo(constructionSites, {reusePath: 15});
	   creep.build(constructionSites);
    }else{
        if(structures.length > 0){
            creep.moveTo(structures[0], {reusePath: 15});
            creep.repair(structures[0]);
        }
    }
}
};