var express = require('express');
var router = express.Router();

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
  res.render('index');
});

router.get('/api/rooms', function(req, res, next) {
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
      },
      {
        name: "SF-RM-316",
        id: "316"
      },
    ];
  res.json(rooms);
});




module.exports = router;
