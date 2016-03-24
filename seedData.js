var moment = require("moment");
var Room = require("./model/room");

  var rooms = [
      {
        name: "SF-RM-312",
        id: "312"
      },
      {
        name: "SF-RM-313",
        id: "313"
      },
      {
        name: "SF-RM-314",
        id: "314"
      },
      {
        name: "SF-RM-315",
        id: "315"
      }
    ];


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

Room.remove({}, function(){
  
  rooms.map(function(r){
    var room = new Room();
    room.roomId = r.id;
    room.roomName = r.name; 
    var minutes = getRandomInt(5, 30);
    room.timeLastMovementDetected = moment().subtract(minutes, 'minutes').toDate();
    room.save(function(err){
      console.log("Room created", r, err);    
    });
  })

});
