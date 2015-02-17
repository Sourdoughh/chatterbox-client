var app = {
  rooms: [],
  server: 'https://api.parse.com/1/classes/chatterbox'
};

$(document).ready(function(){

  app.init = function(){
    setInterval(function(){
      app.clearMessages();
      app.fetch();
    },5000);
    // listeners
    $('.clear-button').on('click', function(){
      app.clearMessages();
    });
    $('.add-message-button').on('click', function(){
      var msg = $('.add-message-input').val();
      app.addMessage(msg);
    });
    $('.add-room-button').on('click', function(){
      var room = $('.add-room-input').val();

      app.addRoom(room);
    });

  };

  app.addMessage = function(message) {
    // will eventually need to really add it
    // including room name
    var msgObj = {
      'username': 'Steve Jobs',
      'text': message,
      'roomname': 'appleworks'
     };
    app.send(msgObj);

    var newChat = $('<div class="chat"></div>').text(msgObj.username + ': ' + message);

    $('#chats').prepend(newChat);
  };

  app.addRoom = function(room){
    var $roomOption = $('<option></option>');
    $roomOption.text(room).attr('value', room);

    $('#roomSelect').append($roomOption);
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
    // &where={"results":{"roomname":"lobby"}}
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

          $('#roomSelect').empty();

          for ( var j = 0; j < app.rooms.length; j++ ) {
            app.addRoom(app.rooms[j]);
          }
        }

      }
    }
  };

  app.clearMessages = function() {
    $('#chats').empty();
  };

  // select username fn?
  // where is the username coming from?
  // add a clickable username...

  app.addFriend = function(){

  };

  app.handleSubmit = function(){

  };

app.fetch();
app.init();


/*
- start with messages on screen vs waiting 5 seconds

- select username

- sub select by room? (display only in-room msgs)
  ??? HOW do we use REST to filter our GET request results
      by room?
  ??? HOW do we add multiple filters onto our URL (like
      using ampersands to add on encodes)

- keep track of friends

 */
});
