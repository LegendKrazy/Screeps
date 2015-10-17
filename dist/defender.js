//Basic Base Defender
"use strict";
module.exports = function (creep) {

    let target = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
    if (target) {
        creep.memory.state === "attack";
    }
    else {
        creep.memory.state === "chill";
    }

    if (creep.memory.state === "attack") {
        console.log("Defender: TARGET ACQUIRED!");
        if (creep.attack(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
        else {
            creep.attack(target);
        }
    }
    else {
        creep.memory.state === "chill";
    }
    if (creep.memory.state === "chill") {
        if (creep.ticksToLive < 15) {
            let storage = creep.room.storage;
            creep.moveTo(storage);
            creep.suicide();
        }
    }
};