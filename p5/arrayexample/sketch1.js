let serial;
let latestData = "waiting for data";
let xVal;
let yVal;
var data;

function setup() {
 createCanvas(windowWidth, windowHeight);

 serial = new p5.SerialPort();

 serial.list();
 serial.open('/dev/tty.usbmodem141301');

 serial.on('connected', serverConnected);

 serial.on('list', gotList);

 serial.on('data', gotData);

 serial.on('error', gotError);

 serial.on('open', gotOpen);

 serial.on('close', gotClose);
}

function serverConnected() {
 print("Connected to Server");
}

function gotList(thelist) {
 print("List of Serial Ports:");

 for (let i = 0; i < thelist.length; i++) {
  print(i + " " + thelist[i]);
 }
}

function gotOpen() {
 print("Serial Port is Open");
}

function gotClose(){
 print("Serial Port is Closed");
 latestData = "Serial Port is Closed";
}

function gotError(theerror) {
 print(theerror);
}

function gotData() {
 let currentString = serial.readLine();
  trim(currentString);
 if (!currentString) return;
//  console.log(currentString);
 latestData = currentString;

let sensors = split(latestData, ",");
console.log(sensors.length);
xVal = map(sensors[0], 516, 1023, width/2, width);
yVal = map(sensors[1], 516, 1023, height/2, height);

console.log(xVal);
console.log(yVal);


//  if (latestData.length > 0) {
//     var sensors = split(latestData, ",");
//     if(sensors.length > 2) {
//       xVal = sensors[0];
//       yVal = sensors[1];
//       visibility = int(sensors[2]);
//       console.log(xVal);
//     }
//   }
}

function draw() {
background("#2277A3");
fill("#55CAFE");
 text(latestData, 10, 10);
 ellipse(xVal, yVal, 30, 30);
 // Polling method
 /*
 if (serial.available() > 0) {
  let data = serial.read();
  ellipse(50,50,data,data);
 }
 */
}

function keyPressed() {
    if (key ==='H' || key ==='L') { // if the user presses H or L
      serial.write(key);              // send it out the serial port
    }
}
