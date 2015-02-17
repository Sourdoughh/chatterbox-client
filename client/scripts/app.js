var app = {};

$(document).ready(function(){

  app.server = 'https://api.parse.com/1/classes/chatterbox';

  app.init = function(){
    //not sure what this will do
  };

  app.postToBoard = function(data){
    for(var i = 0; i < data.results.length; i++){
      // if no username/undefined, then what?
      if ( data.results[i].username !== undefined ||
           data.results[i].text !== undefined ) {

        // also, escape
        var username = data.results[i].username;
        console.log('this is the username: ',username)

        // if no text, then what?
        // escape
        var text = data.results[i].text;
        // console.log("This is the text: ", text);

        // var chat = '<div>' + username + ': '+ text + '</div>';
        var $chat = $('<div class="chat"></div>').text(username + ': ' + text);


        $('.chatterbox').append($chat);
      }

    }
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
      url: app.server,
      type: 'GET',
      success: function(data){app.postToBoard(data)},
      error: function () {
        console.error('chatterbox: Failed to get messages');
      }
    });
  };
    app.fetch();





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
