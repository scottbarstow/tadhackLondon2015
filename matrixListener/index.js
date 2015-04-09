var matrix = require("matrix-js-sdk");
var client = matrix.createClient("http://localhost:8008");


var poll = function(lastMsg){
  client.eventStream(lastMsg, 600000, function(err, res){
    console.log("last msg: " + lastMsg);
    handleMessages(res.chunk);
    lastMsg = res.end;
    poll(lastMsg);
  })
}

var startPolling = function(){
  client.initialSync(8, function(err,msgs){
    poll(msgs.end)
  })
}

var handleMessages = function(msgs){
  for( var i =0;i< msgs.length;i++){
    console.log(JSON.stringify(msgs[i]));
  }
}

client.login("m.login.password", {"user":"test", "password":"password"}, function(err,res){
  if(err){
    console.log("Couldn't login to matrix: " + err.message);
  }else {
    client.credentials.accessToken = res.access_token;
    client.credentials.userId = res.user_id;
    console.log("matrix listener initialized")

  }
  startPolling();
})
