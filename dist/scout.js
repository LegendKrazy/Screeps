"use strict";
module.exports = function (creep) {
    Flag.prototype.findEnemiesInRange = function (range) {
        return this.pos.findInRange(FIND_HOSTILE_CREEPS, 3);
    };
    if (Game.flags.Formup) {
        creep.memory.state === "chill";
    }
    if (Game.flags.Attack) {
        let targets = Game.flags.Attack.findEnemiesInRange(3);
        if (targets) {
            creep.memory.state === "attack";
        }
        else {
            creep.memory.state === "chill";
        }
        if (creep.memory.state === "attack") {
            if (creep.attack(targets) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets);
            }
            else {
                creep.attack(targets);
            }
        }
    }
    if (creep.memory.state === "chill") {
        creep.moveTo(Game.flags.Formup);
    }
};