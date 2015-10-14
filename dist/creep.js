var util = require('util');
Creep.prototype.goTo = function (target) {
    if (this.memory.lastTickPosition) {
	if (util.comparePosition(this.pos, this.memory.lastTickPosition)) {

	    if (!this.memory.stayPut) {
		this.memory.stayPut = 0;
	    }
	    this.memory.stayPut += 1;
	    if (this.memory.stayPut == 3) {
		this.memory.stayPut =0;
		this.moveTo(target, {reusePath:0});
		return;
	    }
	} else {
	    this.memory.stayPut=0;
	    this.memory.lastTickPosition = this.pos;
	}
	   
    } else {
	this.memory.lastTickPosition = this.pos;
    }
    this.moveTo(target, {reusePath: 40});
    /*if (path.length && (comparePosition(this.memory.role)))  {
        var path = this.memory.path;
        this.moveByPath(path);
        this.memory.path = path.shift();
        return 1;
    } 
    var destPos = target.pos;
    var currentPos = this.pos;
    var path = currentPos.findPathTo(destPos, {ignoreCreeps: true});
    this.memory.path = path;*/

};