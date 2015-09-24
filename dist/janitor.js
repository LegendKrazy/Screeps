"use strict";
module.exports = function(creep){
    let spawn = Game.spawns.Spawn1;
    let storages = worker.room.find(FIND_MY_STRUCTURES, {
        filter: function(s) {
            return s.structureType == STRUCTURE_EXTENSION
            && s.energy < s.energyCapacity;
        }
});
    Game.rooms.sim.find(FIND_DROPPED_ENERGY).forEach(function(energy) {
    var creep = energy.findClosestCarrier();
    creep.moveTo(energy);
    creep.pickup(energy);
});
if(creep.carry.energy === creep.carryCapacity){
    if(storages.length > 0){
        creep.moveTo(storages[0]);
        creep.transferEnergy(storages[0]);
    }
    else{
        creep.moveTo(spawn);
        creep.transferEnergy(spawn);
    }
}
};