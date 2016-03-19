$(function(){
  
  var roomSelectTemplate;
  
  init();
  
  function init(){
    //console.log("Init test");
    var source   = $("#roomId-select-template").html();
    roomSelectTemplate = Handlebars.compile(source);
    
    registerFormSubmit();
    renderRoomSelect();
  }
  
  function renderRoomSelect() {
    $.getJSON("/api/rooms", function(rooms){
      //console.log(rooms);
      var select = roomSelectTemplate({rooms: rooms});
      //console.log(select);
      $("#motionDetectedForm #roomId").empty().append(select);
    })
  }
  
  function registerFormSubmit() {
    $("#motionDetectedForm").submit(function(e){
      console.log("Submitting form");
      //$("#motionDetectedForm").ajaxForm({url: '/api/motionDetected', type: 'post'});
      $(this).ajaxSubmit({success: function(response){
        console.log("Submitting form DONE!", response);
        socket.emit('motionDetected', { roomId: response.roomId });
      }}); 
      return false;
    });
  }
  
  
  



});