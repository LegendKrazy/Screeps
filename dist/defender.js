//Basic Base Defender
"use strict";
module.exports = function(creep){
    
    let target = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
    if(target){
        creep.memory.state === "attack";
    }else{
        creep.memory.state === "chill";
    }
    
    if(creep.memory.state === "attack"){
        if(target.hits > 0){
            console.log("TARGET ACQUIRED!");
            creep.moveTo(target);
            creep.attack(target);
        }else{
            creep.memory.state === "chill";
            console.log("Standing down.");
        }
    }
    if(creep.memory.state === "chill"){
        creep.moveTo(6,33);
    }
};