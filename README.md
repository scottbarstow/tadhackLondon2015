# Tadhack London 2015 - The Matrix Bot

![Matrix Bot](https://dl.dropboxusercontent.com/u/2127160/matrix-bot-2.jpg)
This is an experimental project by Anders Brownworth and Scott Barstow to demonstrate the use of Matrix.org's platform with an IoT device.

In the demonstration app, we have enabled a Raspberry Pi to drive a robot using WebRTC and live streaming of video from a Janus Gateway on the device.

[Watch The Video](https://youtube.com/something)


## Software Components

All of the software we wrote for this project was done in Node 12.

You'll need a couple of prerequisites to get this going.

```
npm install -g grunt bower
```

The [Matrix Listener](matrixListener), which subscribes to a room in matrix and listens to all events for the room

```
cd matrixListener
npm install
HOST=yourmatrixhost MATRIX_USER=user MATRIX_PASSWORD=password npm start
```


The [App Server](appServer), which has a simple browser that streams the video and provides basic controls for the device.

```
cd appServer
npm install
HOST=localhost PORT=3000 npm start

then browse to 
http://localhost:3000/canary
```

Special thanks to the folks who wrote the [Janus Gateway](https://github.com/meetecho/janus-gateway) which allowed us to stream video right off of the device using WebRTC


## Hardware Components

[The Multi-Chassis Tank](https://www.sparkfun.com/products/12091)

[The SparkFun Motor Driver](https://www.sparkfun.com/products/9457)


## Special Thanks

We'd like to thank all of the sponsors of TADHack 2015 London, with special thanks to the folks from [Matrix.org](http://matrix.org) for the help they provided in getting our app working with their platform.

We'll be posting additional videos here on how we put the hardware together once we have a breath!