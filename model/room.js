var mongoose = require('mongoose');  

var Room = new mongoose.Schema({  
  roomId: Number,
  roomName: String,
  timeLastMovementDetected: Date
});

module.exports = mongoose.model('Room', Room);;
