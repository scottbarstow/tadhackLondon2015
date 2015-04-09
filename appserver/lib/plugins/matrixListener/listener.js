"use strict";

exports.register = function(server, options, next){
  console.log("registering matrix listener")
  var matrix = require("matrix-js-sdk");
  var client = matrix.createClient("http://localhost:8008");
  var io = server.plugins.hapio.io;
  var events = require("events");
  

  var poll = function(lastMsg){
    client.eventStream(lastMsg, 600000, function(err, res){
      console.log("last msg: " + lastMsg);
      handleMessages(res.chunk);
      lastMsg = res.end;
      poll(lastMsg);
    })
  }

  var initialSync = function(){
    client.initialSync(8, function(err,msgs){
      poll(msgs.end)
    })
  }

  var handleMessages = function(msgs){
    for( var i =0;i< msgs.length;i++){
      console.log(JSON.stringify(msgs[i]));
      io.emit("fromMatrix", msgs[i]);
    }
  }

  var sendMessage = function(msg){
    client.sendTextMessage("!mqMhGsOEzsdVXLbynu:matrix.rockethangar.com", JSON.stringify(msg), function(err,res){
      if(err){
        console.log("Matrix error: " + JSON.stringify(err))
      }else {
        console.log("created event: " + res.event_id);
      }
    })
   }

  client.login("m.login.password", {"user":"test", "password":"password"}, function(err,res){
    if(err){
      console.log("Couldn't login to matrix: " + err.message);
    }else {
      client.credentials.accessToken = res.access_token;
      client.credentials.userId = res.user_id;
    }
    initialSync();
    io.on("connection", function(socket){
      socket.on("robotNav", function(data){
        sendMessage(data);
      });
    })
  })
  next();
};


exports.register.attributes = {
  name : "matrix"
};