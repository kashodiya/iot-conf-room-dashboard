
$(function(){
  var roomDataTemplate, roomUsageDataTemplate;
  var rooms = [];
  var tickId = 0;
  
  //console.log("OK");
  init();
  
  function init(){
    var source   = $("#room-data-template").html();
    roomDataTemplate = Handlebars.compile(source);
    
    source   = $("#room-usage-data-template").html();
    roomUsageDataTemplate = Handlebars.compile(source);

    registerHandlebarsHelpers();
    registerSocket();
    refreshData();
    
    tickId = setInterval(tickData, 5000);
  }
  
  function tickData(){
    if(rooms.length == 0) return;
    
    //console.log("Ticking...");
    
    rooms = rooms.map(function(r){
      var lastDate = moment(r.timeLastMovementDetected);
      var dateDiff = moment(moment().diff(lastDate));
      //r.availableMinutes = moment().diff(lastDate, 'minutes');
      r.availableMinutes = dateDiff.minute();
      r.availableTime = dateDiff.format("mm:ss");
      //console.log(r.availableMinutes);
      
      r.availableSince = lastDate.fromNow();
      

      return r;
    });
    renderData();
  }
  
  
  function registerHandlebarsHelpers(){
    Handlebars.registerHelper("formatDate", function(dateStr){
      if (typeof(dateStr) == "undefined") {
        return "Unknown";
      }
      var date = new Date(dateStr);
      return date.getHours() + ":"  + date.getMinutes() + ":" + date.getSeconds() + " On "  + date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear();
    });    
  }
  
  function renderData(){
    var dataHtml = roomDataTemplate({rooms: rooms});
    //console.log(dataHtml);
    $("#roomData").empty().append(dataHtml);
    
    var usageDataHtml = roomUsageDataTemplate({rooms: rooms});
    $("#roomUsageData").empty().append(usageDataHtml);


    rooms.map(function(r){
      
      $("#pie-" + r.roomId).circliful({
        showPercent: false,
        animation: false,
        foregroundBorderWidth: 5,
        backgroundBorderWidth: 15,
        target: r.availableMinutes,
        percent: (r.availableMinutes * 100) / 60
      });    
      return r;
    });

    
    
    
  }
  
  
  function refreshData(){
    rooms = [];
    $.getJSON("/api/rooms", function(roomsData){
      rooms = roomsData;
      //console.log(rooms);
      tickData();
    })
  }
    
  function registerSocket() {
    socket.on('fetchData', function () {
      console.log("fetchData event received");
      refreshData();
    });
  }

});


