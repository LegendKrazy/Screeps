"use strict";
//standard miner
module.exports = function(creep){
    var mineSource = Game.getObjectById(creep.memory.source);
    if (creep.harvest(mineSource) == -9){
        creep.moveTo(mineSource);
    }
    else if(!mineSource){
        var sources = creep.room.find(FIND_SOURCES);
        creep.memory.source = sources[creep.memory.modulo].id;
    }
};