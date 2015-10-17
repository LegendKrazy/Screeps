"use strict";
// miner to travel to another rooms source and back
module.exports = function (creep) {
    let mineSource = Game.getObjectById(creep.memory.source);
    let assignedTransporter = Game.getObjectById(creep.memory.transporter);

    //if assignedTransporter does not exist....
    if (!assignedTransporter) {
        delete creep.memory.transporter;
    }
    if (creep.harvest(mineSource) == -9) {
        creep.moveTo(mineSource);
    }
    else if (!mineSource) {
        var sources = creep.room.find(FIND_SOURCES);
        creep.memory.source = sources[creep.memory.modulo].id;
    }
};