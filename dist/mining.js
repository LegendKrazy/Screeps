'use strict';
var util = require('util');
const TO_DEST = 1;
const TO_ENERGY = 2;
module.exports = function (config) {
    function findSpotForMiner(flag) {
        var pos = flag.pos;
        var offsetArray = [{x:-1, y : 0}, {x:-1, y:-1}, {x:0, y:-1},  {x:1,y:-1}, {x:1, y:0}, {x:1, y:1}, {x:0, y:1}, {x:-1,y:1}];
        return _.map(offsetArray, offset => ({x:pos.x+offset.x, y:pos.y+offset.y}))
	    .filter(item => item.x >= 0 && item.x < 50 && item.y >= 0 && item.y < 50)
	    .map( item => new RoomPosition(item.x, item.y, pos.roomName))
	    .filter(function (item) {
		var room = new Room(item.roomName);
		var terrain = room.lookForAt('terrain', item.x, item.y);
		return (terrain == "plain" || terrain == "swamp");
            });

    }

    function findSpotForCourier(minerSpotList) {//TODO
        var pos = flag.pos;
        var offsetArray = [{x:-1, y : 0}, {x:-1, y:-1}, {x:0, y:-1},  {x:1,y:-1}, {x:1, y:0}, {x:1, y:1}, {x:0, y:1}, {x:-1,y:1}];
        var calculateCourierOneSpot = function (pos) {
	    return _.map(offsetArray, offset =>	( {x:pos.x+offset.x, y:pos.y+offset.y}))
		.filter(item => item.x >= 0 && item.x < 50 && item.y >= 0 && item.y < 50)
		.map(item => new RoomPosition(item.x, item.y, pos.roomName))
		.filter(function (item) {
		    var room = new Room(item.roomName);
		    var terrain = room.lookForAt('terrain', item.x, item.y);
		    var structure = room.lookForAt('structure', item.x, item.y);
		    return (terrain == "plain" || terrain == "swamp") && (structure.length==0);
		});};

        var result = _.map(minerSpotList, calculateCourierOneSpot);
	var notSameAsMiningSpot = pos => _.all(minerSpotList, item => !util.comparePosition(item, pos));
	var removeAllSameAsMiningSpot = courierSpotList => _.filter(courierSpotList, notSameAsMiningSpot);
	result = _.map(result, removeAllSameAsMiningSpot);

	return result = _.zip(minerSpotList, result);

    }


    function init() { //To be called if things need to be reset
	if (Memory.miningConfig == undefined) {
	    Memory.miningConfig = {};
	}
	if (Memory.miningConfig[flag.name] == undefined || (Object.keys(Memory.miningConfig[flag.name]).length === 0)) {

	    Memory.miningConfig[flag.name]= {};
	    var minerSpotList = findSpotForMiner(flag);
	    Memory.miningConfig[flag.name].miningPos = findSpotForCourier(minerSpotList);
	    Memory.minerIDList = [];
	    Memory.courierIDList = [];
	}
    }
    var flagName = config.miningFlag;
    var flag = Game.flags[flagName];

    init();


    var storedConfig = Memory.miningConfig[flagName];
    var minerIDList = storedConfig.minerIDList;
    var courierIDList = storedConfig.courierIDList;
    var spawn = Game.spawns[config.spawnName];
    var destRoom = new Room(config.destRoom);
    var hasEnergy = config.minerHasEnergy;
    var dropOff = config.dropOff;

    //    Memory.miningConfig[flag.name].courierSpotList = findSpotForCourier(Memory.miningConfig[flag.name].minerSpotList);
    function findFreeSpawn(roomName) {
	return _.filter(Game.spawns, function (spawn) {return spawn.room.name == roomName && spawn.spawning == null;});
    };

    function calculateMinerBody(spawn) {
        if (spawn.room.energyCapacityAvailable < 550) return [MOVE, WORK, WORK, CARRY];
        if (spawn.room.energyCapacityAvailable < 800) return [MOVE, MOVE, WORK, WORK, WORK, WORK];
	return [ WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE];
    }
    //Game.creeps["E19N6-Miner-0"].memory.myPos = minerSpotList[0];
    function spawnMiner(minerLocation, sourcePos, hasEnergy) {
	var spawn = findFreeSpawn(destRoom.name);
	if (spawn.length) {
	    spawn = spawn[0];
	} else {
	    return ERR_BUSY;
	}

        var body = calculateMinerBody(spawn);
	if (hasEnergy) {
	    body.push (CARRY);
            body.push (MOVE);
	}
        //TODO
        return spawn.createCreep(body, null, {destRoom: config.destRoom, myPos: minerLocation, sourcePos:sourcePos});

    }
    function calculateCourierBody(spawn) {
        if (spawn.room.energyCapacityAvailable < 500) return [MOVE, MOVE, CARRY, CARRY];
        if (spawn.room.energyCapacityAvailable < 900)
            return [MOVE, MOVE, MOVE, MOVE, MOVE,
                    CARRY, CARRY, CARRY, CARRY, CARRY];
	return [ MOVE, MOVE, MOVE ,MOVE ,MOVE, MOVE, MOVE, MOVE ,MOVE,
                 CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY];;
    };
    function spawnCourier(courierLocation, sourcePos) {
	var spawn = findFreeSpawn(destRoom.name);
	if (spawn.length) {
	    spawn = spawn[0];
	} else {
	    return ERR_BUSY;
	}
        var body = calculateCourierBody(spawn);
	var name = "Courier-" + Math.random().toString(36).substring(7);
        return spawn.createCreep(body, name, {destRoom: config.destRoom, myPos: courierLocation, sourcePos:sourcePos});
    }
    function pickupAdj(creep) {
        var offsetX = [-1, -1, 0,  1, 1, 1, 0, -1];
        var offsetY = [ 0, -1,-1, -1, 0, 1, 1, 1];
        var myPosX = creep.pos.x;
        var myPosY = creep.pos.y;
        var currentMax = 0;
        var target = null;

        for (let i=0; i<8; i++) {
            var energyPosition = new RoomPosition(myPosX + offsetX[i], myPosY +offsetY[i], creep.pos.roomName);

            if (!energyPosition) {
                return;
            }
            if (energyPosition.x >= 50 || energyPosition.y >= 50 || energyPosition.x < 0 || energyPosition.y < 0) {
                continue;
            }
            var energyObj = energyPosition.lookFor("energy");
            if (energyObj.length > 0) {
                energyObj = energyObj[0];
                if (energyObj.energy > currentMax) {
                    target = energyObj;
                    currentMax = energyObj.energy;
                }
            }
        }
        if (target)
            creep.pickup(target);

    };


    function countCourier() {
	return _.filter(courierIDList, function (courierID) {
	    return Game.creeps[courierID] != undefined;
	}).length;
    };

    courierIDList = _.filter(courierIDList, function (courierName) { return Game.creeps[courierName];});
    minerIDList = _.filter(minerIDList, function (courierName) { return Game.creeps[courierName];});
    var posConfig = storedConfig.miningPos[0];
    var miningPos = posConfig[0];
    var courierPos = posConfig[1][0];
    storedConfig.minerIDList = minerIDList;
    storedConfig.courierIDList = courierIDList;

    //storedConfig.minerIDList.push("1");
    //return;

    if (courierIDList.length < config.courierCount) {
        let result = spawnCourier(courierPos, flag);
	if (_.isString(result)) {
	    storedConfig.courierIDList.push(result);
	}
    };
    if (minerIDList.length < config.minerCount) {
        let result = spawnMiner(miningPos, flag, hasEnergy);
	if (_.isString(result)) {
	    storedConfig.minerIDList.push(result);
	}

    };


    _.forEach(courierIDList, function myself(courierName,i) {
        var courier = Game.creeps[courierName];

        if (!courier) {
        } else {
	    courier.memory.stepCount += 1;
            //{myPos: courierLocation, sourcePos:sourcePos}
	    if (!("destRoom" in courier.memory))
		courier.memory.destRoom = config.destRoom;
	    if (!("myPos" in courier.memory)) {
		courier.memory.myPos = courierPos;
		courier.memory.sourcePos = flag;
	    }
            if (!("currentAction" in courier.memory))  {
                courier.memory.currentAction = TO_ENERGY;
            }

            if ((courier.memory.currentAction == TO_DEST)) {

                //if ()
                /*if (creep.room.roomName == "W3N18") {
                    genericCourier(creep);
                    return;
                }*/
		var target;
                if (courier.carry.energy == 0) {
		    courier.say(courier.memory.stepCount);
		    courier.memory.stepCount = 0;

                    if (courier.ticksToLive < courier.memory.stepCount) {
                        courier.suicide();
                    }
                    courier.memory.currentAction = TO_ENERGY;

                    //myself(courier.name,i);
                    return;
                }

		if (dropOff) {
		    target = dropOff;
		    courier.moveTo(dropOff);
		    courier.transferEnergy(dropOff);
		    return;
		}

                var storages = destRoom.find(FIND_MY_STRUCTURES, {
                    filter: function(s) {
                        return s.structureType == STRUCTURE_EXTENSION
                            && s.energy < s.energyCapacity;
                    }
                });
                var spawnInDestRoom = destRoom.find(FIND_MY_SPAWNS, {filter: function(spawn) {return spawn.energy < spawn.energyCapacity;}});
                storages.push.apply(storages,spawnInDestRoom);
                if (!storages.length) {

                    if (config.storage) {

                        var storagePos = new RoomPosition(config.storage.x,config.storage.y, config.destRoom);
                        target = storagePos.lookFor("structure")[0];
			
                    } else {

			//TODO: Deliver to someone who needs it?
			var builderList = _.filter(Game.creeps, function (creep) {
                            return (creep.memory.role == "builder" || creep.memory.role == "storageBuilder") && (creep.pos.roomName == destRoom.name);
			});
			
			target = _.min(builderList, function(item) {
                            return item.carry.energy;
			});
		    }
                } else {
		    target = _.min(storages, function(item) {
			return courier.pos.getRangeTo(item);
                    });
		}
                courier.goTo(target);
                courier.transferEnergy(target);

                return;

            } else {

                if (courier.carry.energy == courier.carryCapacity) {

                    courier.memory.currentAction = TO_DEST;
                    //myself(courier.name,i);
                    return;
                }
                if (util.comparePosition(courier.pos, courier.memory.myPos)) {
                    pickupAdj(courier);
                } else {
                    var x = new RoomPosition(courier.memory.myPos.x, courier.memory.myPos.y, courier.memory.myPos.roomName);
                    courier.goTo(x);
                }

            }


        }
    });

    _.forEach(minerIDList, function (minerName, i) {
        var miner = Game.creeps[minerName];
	
        //console.log(minerSpotList[i]);
        if (!miner) {
            return;
        } else {
	    if (!("destRoom" in miner.memory))
		miner.memory.destRoom = config.destRoom;
	    
	    if (miner.carry.energy == miner.carryCapacity && miner.carry.energy !=0 && countCourier==0 && hasEnergy!=true) {
		miner.goTo(spawn);
		miner.transferEnergy(spawn);
		return;
	    }
            if (util.comparePosition(miner.pos, miner.memory.myPos)) {
                var pos = new RoomPosition(miner.memory.sourcePos.pos.x,miner.memory.sourcePos.pos.y,miner.memory.sourcePos.roomName);
                var source = pos.lookFor("source");
                miner.harvest(source[0]);
            } else {

                var x = new RoomPosition(miner.memory.myPos.x, miner.memory.myPos.y, miner.memory.myPos.roomName);
                miner.goTo(x);
            }
        }
    } );


};
