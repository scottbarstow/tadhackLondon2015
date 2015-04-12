var host = process.env.HOST || "http://localhost:8008";
var user = process.env.MATRIX_USER || "test";
var password = process.env.MATRIX_PASSWORD || "password";

var matrix = require("matrix-js-sdk");
var client = matrix.createClient(process.env.HOST || "http://localhost:8008");

var GPIO = require('onoff').Gpio;

var stby = new GPIO(22, 'out');
var pwma = new GPIO(18, 'out');
var ain1 = new GPIO(23, 'out');
var ain2 = new GPIO(24, 'out');
var pwmb = new GPIO(27, 'out');
var bin1 = new GPIO(25, 'out');
var bin2 = new GPIO(11, 'out');

// setup
stby.writeSync(0);
pwma.writeSync(0);
ain1.writeSync(1);
ain2.writeSync(0);
pwmb.writeSync(0);
bin1.writeSync(1);
bin2.writeSync(0);

var poll = function(lastMsg){
  client.eventStream(lastMsg, 600000, function(err, res){
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
    var msg;
    for( var i =0;i< msgs.length;i++){
	msg = msgs[i];
	if (msg.content && msg.content.msgtype === "m.text") {
	    try {
		var msgObj = JSON.parse(msg.content.body);
		console.log("Command: " + msgObj.command + " Direction: " + msgObj.direction || "not provided");
		if (msgObj.command === 'move') {
		    if (msgObj.direction === 'fwd') {
			pwma.writeSync(1);
			pwmb.writeSync(1);
			stby.writeSync(1);
			setTimeout(function() {
                            stby.writeSync(0);
			    pwma.writeSync(0);
                            pwmb.writeSync(0);
			}, 1000);
		    }
		    else if (msgObj.direction === 'left') {
			pwma.writeSync(0);
			pwmb.writeSync(1);
			stby.writeSync(1);
			setTimeout(function() {
                            stby.writeSync(0);
			    pwma.writeSync(0);
                            pwmb.writeSync(0);
			}, 250);
		    }
		    else if (msgObj.direction === 'right') {
			pwma.writeSync(1);
			pwmb.writeSync(0);
			stby.writeSync(1);
			setTimeout(function() {
                            stby.writeSync(0);
			    pwma.writeSync(0);
                            pwmb.writeSync(0);
			}, 250);
		    }
		    else {
			console.log('not yet implemented');
		    }
		}
		else {
		    console.log('i don\'t understand that command');
		}
	    }
	    catch(e) {
		//ignore it
	    }
	}
    }
}

client.login("m.login.password", {"user":user, "password":password}, function(err,res){
  if(err){
    console.log("Couldn't login to matrix: " + err.message);
  }else {
    client.credentials.accessToken = res.access_token;
    client.credentials.userId = res.user_id;
    console.log("matrix listener initialized")

  }
  startPolling();
})
