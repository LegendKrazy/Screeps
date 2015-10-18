/* Check room for enemies, change state, moveTo flag outside of room, when arrived check flag again or targets in range?
-calculate and store the route in memory
-if (flag.roomName == creep.room.name) {
*/
"use strict";
module.exports = function (creep) {
    Flag.prototype.findEnemiesInRange = function (range) {
        return this.pos.findInRange(FIND_HOSTILE_CREEPS, range);
    };

    // if Attack flag exists begin searching for targets
    if (Game.flags.Attack) {
        let enemySpawn = creep.pos.findClosestByPath(FIND_HOSTILE_SPAWNS);
        let targets = Game.flags.Attack.findEnemiesInRange(3);
        let enemyStructures = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {
            filter: function (object) {
                return object.structureType == STRUCTURE_EXTENSION;
            }
        });
        if (enemySpawn) {
            creep.moveTo(enemySpawn);
            creep.attack(enemySpawn);
        }
        if (targets.length > 0) {
            creep.moveTo(targets[0]);
            creep.attack(targets[0]);
        }
        if (enemyStructures.length > 0) {
            creep.moveTo(enemyStructures[0]);
            creep.moveTo(enemyStructures[0]);
        }
        else {
            creep.moveTo(Game.flags.Attack);
        }
        return;
    }
    //flag Formup exists move here - for initial move to another room or non attack moves
    if (Game.flags.Formup) {
        creep.moveTo(Game.flags.Formup, {
            reusePath: 15
        });
        return;
    }
};