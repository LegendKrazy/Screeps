"use strict";

module.exports = function(creep){
    
    var sources = creep.room.find(FIND_SOURCES);
    
    if (creep.harvest(sources[creep.memory.modulo]) == -9){
        creep.moveTo(sources[creep.memory.modulo]);
    }
};