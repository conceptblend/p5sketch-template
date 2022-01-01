// PARAMETER SETS
const PARAMS = [
  {
    name: "set one",
    seed: "hello world",
    width: 540,
    height: 540,
    fps: 30,
    duration: 30 * 10, // no unit (frameCount by default; sometimes seconds or frames or whatever)
    a: 0,
    b: 0,
  },
];

// PARAMETERS IN USE
const P = PARAMS[0];

// VIDEO
const EXPORTVIDEO = !true; // set to `false` to not export
const FPS = P.fps;
const DURATION = P.duration;
let cnvsrecorder;
let isRecording = false;

function setup() {
  createCanvas( P.width, P.height );
  angleMode( DEGREES );
  colorMode( RGB, 255 );
  
  noStroke();
  
  noiseSeed( P.seed );
  
  frameRate( FPS );

  // noLoop();
}


function draw() {
  background(0);

  // DO YOUR DRAWING HERE!
  noFill();
  stroke( 255, 128, 32 );
  rect( 20, 20, 30, 30 );

  if (EXPORTVIDEO) {
    if (!isRecording) {
      cnvsrecorder = new CanvasRecorder(FPS);
      cnvsrecorder.start();
      isRecording = true;
      console.log('Recording...');
    }
    // Example to end automatically after 361 frames to get a full loop
    if (frameCount > DURATION) {
      cnvsrecorder.stop(`${getName()}`);
      noLoop();
      console.log('Done.');
    }
  }
}

function getName() {
  // ugly method for inserting the palette but usually makes the
  // base64 value too long and extends the full URL length beyond
  // the 255 char limit for createObjectURL.
  // let tmp = P;
  // tmp.palette = palette.map(c => p5ColorToHex( c ) );

  // Encode the parameters into the filename
  let params = window.btoa(JSON.stringify(P));
  return `${P.name}-${params}-${new Date().toISOString()}`;
}
