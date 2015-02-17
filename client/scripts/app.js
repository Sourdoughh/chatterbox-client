var app = {
  rooms: [],
  server: 'https://api.parse.com/1/classes/chatterbox'
};

$(document).ready(function(){

  app.init = function(){
    setInterval(function(){
      app.fetch();
    },1000)
    // listeners
    $('.clear-button').on('click', function(){
      app.clearMessages();
    });
    $('.add-message-button').on('click', function(){
      var msg = $('.add-message-input').val();
      app.addMessage(msg);
    });
    $('.add-room-button').on('click', function(){
      app.addRoom();
    });

  };

  app.addMessage = function(message) {
    // will eventually need to really add it
    // including room name

    console.log( message );
  };

  app.addRoom = function(){
    $('.add-room-input').val();
  };

  app.send = function(message){
    //will make an ajax post to the server
    $.ajax({
      // always use this url
      url: app.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message');
      }
    });
  };

  app.fetch = function(){
    $.ajax({
      // always use this url
      url: app.server+'?order=-createdAt',
      type: 'GET',
      success: function(data){app.constructChats(data)},
      error: function () {
        console.error('chatterbox: Failed to get messages');
      }
    });
  };

  app.constructChats = function(data){
    for(var i = 0; i < data.results.length; i++){
      if ( data.results[i].username !== undefined ||
           data.results[i].text !== undefined ) {

        var username = data.results[i].username;
        var text = data.results[i].text;
        var room = data.results[i].roomname;
        var timeStamp = data.results[i].createdAt;
        var $chat = $('<div class="chat"></div>').text(username + ': ' + text + ' ' + timeStamp);

        $('#chats').append($chat);

        if ( app.rooms.indexOf(room) === -1 && room ) {
          app.rooms.push(room);

          console.log('room: ' + room);
          console.log('ROOMS: ' + app.rooms);

          $('.room-selection').empty();

          for ( var j = 0; j < app.rooms.length; j++ ) {
            var roomName = '<option value="' + app.rooms[j] + '">'+ app.rooms[j] + '</option>';
            $('.room-selection').append(roomName);
          }
        }

      }
    }
  };

  app.clearMessages = function() {
    $('#chats').empty();
  };

app.init();


/*
- display messages (GET)
- refresh view
- escape input
- select username
- send messages (POST)

- sub select by room? (display only in-room msgs)
- keep track of friends

functions
---------
* parse GET
* add things to DOM

* parse form input for POST
* security/escaping fn
* username handling?
* refresh handling

 */
});
