"use strict";
Creep.prototype.findNearestStorage: function() {
	var pref = undefined;
	if (this.room.storage != undefined) {
		pref = this.room.storage;
	}
	for (var link in this.room.memory.energy.linkSources) {
		var l = Game.getObjectById(link);
		if (l != null && this.pos.getRangeTo(pref) > this.pos.getRangeTo(l)) {
			pref = l;
		}
	}
	if (pref == undefined || pref == null) {
		return this.findClosestByRange(this.room.memory.structs.spawns, true);
	} else {
    return pref.id;
	}
}