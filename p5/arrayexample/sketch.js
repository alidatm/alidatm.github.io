var serial; // variable to hold an instance of the serialport library
var portName = '/dev/tty.usbmodem141301' //rename to the name of your port
var dataarray = []; //some data coming in over serial!
var xPos = 0;
var yPos = 0;
visibility = 0;

function setup() {
  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', printList);       // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
 
  serial.list();                      // list the serial ports
  serial.open(portName);              // open a serial port
  createCanvas(1200, 1200);
  background(0x08, 0x16, 0x40);
}
 
// get the list of ports:
function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
   print(i + " " + portList[i]);
 }
}

function serverConnected() {
  print('connected to server.');
}
 
function portOpen() {
  print('the serial port opened.')
}
 
function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}
 
function portClose() {
  print('The serial port closed.');
}

function serialEvent() {
  if (serial.available()) {
    var datastring = serial.readLine(); // readin some serial
    var newarray; 
    try {
      newarray = JSON.parse(datastring); // can we parse the serial
      } catch(err) {
          //console.log(err);
    }
    if (typeof(newarray) == 'object') {
      dataarray = newarray;
    }
    // console.log("got back " + datastring);

    
  } 
}

function graphData(newData) {
  // map the range of the input to the window height:
  var yPos = map(newData, 0, 1023, 0, height);
  // draw the line
  line(xPos, height, xPos, height - yPos);
  // at the edge of the screen, go back to the beginning:
  if (xPos >= width) {
    xPos = 0;
    // clear the screen by resetting the background:
    background(0x08, 0x16, 0x40);
  } else {
    // pass
  }
}

function draw() {
  background("#2277A3");
  fill("#55CAFE");
  noStroke();
  if (visibility == 0) {
    ellipse(width/2, height/2, 30, 30)
  }

  // background(255,255,255);
  // fill(0,0,0);
  // text(latestData, 10, 10);
  // ellipse(xVal, yVal, 30, 30);

  // stroke('rgba(0,255,0,0.25)'); // green
  // graphData(dataarray[0]);

  // stroke('rgba(0,80,255,0.5)'); // blue
  // graphData(dataarray[1]);
  // xPos++;
}

// function setup() {
//   createCanvas(1200, 800);
//   background(255, 0, 80);
//   noStroke();
//   rectMode(CENTER);
// }

// let x = [],
//   y = [],
//   segNum = 20,
//   segLength = 18;

// for (let i = 0; i < segNum; i++) {
//   x[i] = 0;
//   y[i] = 0;
// }

// function setup() {
//   createCanvas(710, 400);
//   strokeWeight(30);
//   stroke(270, 90);
// }

// function draw() {
//   background(0);
//   dragSegment(0, mouseX, mouseY);
//   for (let i = 0; i < x.length - 1; i++) {
//     dragSegment(i + 1, x[i], y[i]);
//   }
// }

// function dragSegment(i, xin, yin) {
//   const dx = xin - x[i];
//   const dy = yin - y[i];
//   const angle = atan2(dy, dx);
//   x[i] = xin - cos(angle) * segLength;
//   y[i] = yin - sin(angle) * segLength;
//   segment(x[i], y[i], angle);
// }

// function segment(x, y, a) {
//   push();
//   translate(x, y);
//   rotate(a);
//   line(0, 0, segLength, 0);
//   pop();
// }
