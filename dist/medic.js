/* Move to flag, stay put and heal nearby injured creeps. 
-Figured out how to make a kiting mechanic for when medic is being attacked.
-possibly assign a medic to an attack unit if it looks better.
*/
"use strict";
module.exports = function (creep) {


    // if Attack flag exists begin searching for targets
    if (Game.flags.Heal) {
        creep.moveTo(Game.flags.Heal, {
            reusePath: 15
        });
    }
    let injuredCreep = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
        filter: function (range) {
            return creep.pos.findInRange(FIND_MY_CREEPS, 2) && creep.hits < creep.hitsmax;
        }
    });
    if (injuredCreep.length > 0) {
        creep.heal(injuredCreep[0]);
    }
    else {
        return;
    }

};