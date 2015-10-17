//Unit that transfers energy from link and into the storage. Stationary between the two buildings.
"use strict";
module.exports = function (creep) {
    let storage = creep.room.storage;
    if (creep.carry.energy === 0) {
        creep.memory.state = "link";
    }
    if (creep.carry.energy === creep.carryCapacity || creep.memory.state === undefined) {
        creep.memory.state = "deliver";
    }
    //If link has energy, take it until full
    if (creep.memory.state === 'link') {
        let link = Game.getObjectById('5614a8a783d27ab545369110');
        creep.moveTo(15, 35, {
            reusePath: 15
        });
        link.transferEnergy(creep);
        creep.transferEnergy(storage);
    }

    //transfer energy to storage
    if (creep.memory.state === 'deliver') {
        if (storage) {
            creep.transferEnergy(storage);
        }
    }

};