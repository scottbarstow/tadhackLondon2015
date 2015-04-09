"use strict";

exports.register = function(server, options, next){
  console.log("registering matrix listener")
  var matrix = require("matrix-js-sdk");
  var client = matrix.createClient("http://localhost:8008");
  var io = server.plugins.hapio.io;
  var events = require("events");
  
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