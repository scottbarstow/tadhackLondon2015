# Tadhack London 2015 - The Matrix Bot

![Matrix Bot](https://dl.dropboxusercontent.com/u/2127160/matrix-bot-2.jpg)
This is an experimental project by Anders Brownworth and Scott Barstow to demonstrate the use of Matrix.org's platform with an IoT device.

In the demonstration app, we have enabled a Raspberry Pi to drive a robot using WebRTC and live streaming of video from a Janus Gateway on the device.

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


The app itself is written in NodeJS for all components.

bought from [SparkFun](https://www.sparkfun.com/products/12091)

https://www.sparkfun.com/products/12091

https://www.sparkfun.com/products/9457

https://github.com/meetecho/janus-gateway