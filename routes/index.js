var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');  
var Room = require("../model/room");
var moment = require("moment");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


router.get('/test', function(req, res, next) {
  res.render('test');
});


router.post('/api/motionDetected', function(req, res, next) {
  //Store this
  console.log("Got motionDetected", req.body);
  
  Room.findOne({roomId: req.body.roomId}, function(err, room){
    if(err){
      res.json({success: false, error: err});
    }else{
      
      console.log("Number(req.body.availabileAgo)", Number(req.body.availabileAgo));
      
      room.timeLastMovementDetected = moment().subtract(Number(req.body.availabileAgo), 'minutes').toDate();
      room.save(function(error){
        if(err){
          res.json({success: false, error: error});
        }else{
          res.json({success: true, roomId: req.body.roomId});
        }
      });
    }
  });
});


router.get('/api/rooms', function(req, res, next) {
  Room.find({}, function(err, rooms){
    res.json(rooms);
  });
});


module.exports = router;
