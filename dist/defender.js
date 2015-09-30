//Base Defender
"use strict";
module.exports = function(creep){
var target = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);

 if(!target){
    creep.memory.state = "chill";
}
if(target){
    creep.memory.state = "attack";
}
else if(creep.memory.state === undefined){
    creep.memory.state = "chill"; //Edge case
}
if(creep.memory.state === "attack"){
    if(target){
    creep.moveTo(target);
    creep.attack(target);
    }
}else if(creep.memory.state === "chill"){
    creep.moveTo(6,33);
}

};