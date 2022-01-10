// PARAMETER SETS
const PARAMS = [
  {
    name: "set one",
    seed: "hello world",
    width: 540,
    height: 540,
    fps: 30,
    duration: 30 * 10, // no unit (frameCount by default; sometimes seconds or frames or whatever)
    exportVideo: false,
    isAnimated: false,
    renderAsVector: !true,
  },
];

// PARAMETERS IN USE
const P = PARAMS[ PARAMS.length - 1 ];

// VIDEO
const EXPORTVIDEO = P.exportVideo ?? false; // set to `false` to not export
const FPS = P.fps;
const DURATION = P.duration;
let cnvsrecorder;
let isRecording = false;

function setup() {
  // SVG output is MUCH SLOWER but necessary for the SVG exports
  createCanvas( P.width, P.height, P.renderAsVector ? SVG : P2D );

  angleMode( DEGREES );
  colorMode( RGB, 255 );
  
  noStroke();
  
  Math.seedrandom( P.seed );
  
  frameRate( FPS );

  if ( !EXPORTVIDEO && !P.isAnimated ) noLoop();
}


function draw() {
  background(0);

  // DO YOUR DRAWING HERE!
  noFill();
  stroke( 255, 128, 32 );
  rect( 20 + frameCount%60, 20, 30, 30 );

  if ( EXPORTVIDEO ) {
    if ( P.renderAsVector ) throw new Error("Cannot export video when rendering as Vector");
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
      saveConfig();
      console.log('Done.');
    }
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

function getName() {
  // Encode the parameters into the filename
  // let params = window.btoa(JSON.stringify(P));
  let params = MD5( JSON.stringify(P) );
  return `${P.name}-${params}-${new Date().toISOString()}`;
}

function saveImage( ext = 'jpg' ) {
  save(`${ getName() }.${ ext }`);
}

function saveConfig() {
  saveJSON( P, `${getName()}-config.json` );
}

function downloadOutput() {
  saveImage( P.renderAsVector ? 'svg' : 'jpg' );
  saveConfig();
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
