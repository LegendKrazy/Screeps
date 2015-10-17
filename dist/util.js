module.exports = {
    comparePosition: function comparePosition(thisPos, thatPos) {
        return (thisPos.x == thatPos.x) && (thisPos.y == thatPos.y) && (thisPos.roomName == thatPos.roomName);
    },

    roomNameParsing: function roomNameParsing(roomName) {
        var re = /[WSEN]/;
        var result = roomName.split(re);
        result.shift();
        return result.map(parseInt);
    }
}