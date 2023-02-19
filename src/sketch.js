// PARAMETER SETS
const PARAM_SETS = [
  {
    name: "set one",
    seed: "hello world",
    width: 540,
    height: 540,
    fps: 30,
    duration: 30 * 10, // no unit (frameCount by default; sometimes seconds or frames or whatever)
    exportVideo: false,
    isAnimated: false,
    renderAsVector: true,
  },
];

// PARAMETERS IN USE
const PARAMS = PARAM_SETS[ PARAM_SETS.length - 1 ];

// VIDEO
const EXPORTVIDEO = PARAMS.exportVideo ?? false; // set to `false` to not export
const FPS = PARAMS.fps;
const DURATION = PARAMS.duration;

export const sketch = ( p ) => {
  let cnvsrecorder;
  let isRecording = false;

  
  p.setup = () => {
    // Enable the SVG renderer
    // if ( PARAMS.renderAsVector ) init( p )

    // SVG output is MUCH SLOWER but necessary for the SVG exports
    p.createCanvas( PARAMS.width, PARAMS.height, PARAMS.renderAsVector ? p.SVG : p.P2D );
  
    p.angleMode( p.DEGREES );
    p.colorMode( p.RGB, 255 );
    
    p.noStroke();
    
    // Math.seedrandom( PARAMS.seed );
    
    p.frameRate( FPS );
  
    if ( !EXPORTVIDEO && !PARAMS.isAnimated ) p.noLoop();
  }

  p.draw = () => {
    p.background(0);
  
    // DO YOUR DRAWING HERE!
    p.noFill();
    p.stroke( 255, 0, 255 );
    p.rect( 20 + p.frameCount%60, 20, 30, 30 );
  
    if ( EXPORTVIDEO ) {
      if ( PARAMS.renderAsVector ) throw new Error("Cannot export video when rendering as Vector");
      if (!isRecording) {
        cnvsrecorder = new CanvasRecorder(FPS);
        cnvsrecorder.start();
        isRecording = true;
        console.log('Recording...');
      }
      // Example to end automatically after 361 frames to get a full loop
      if (p.frameCount > DURATION) {
        cnvsrecorder.stop(`${getName()}`);
        p.noLoop();
        p.saveConfig();
        console.log('Done.');
      }
    }
  }
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

function getName() {
  // Encode the parameters into the filename
  return `${PARAMS.name}-${encodeURIComponent(PARAMS.seed)}-${new Date().toISOString()}`;
}

function saveImage( ext = 'jpg' ) {
  save(`${ getName() }.${ ext }`);
}

function saveConfig() {
  saveJSON( PARAMS, `${getName()}-config.json` );
}

function downloadOutput() {
  saveImage( PARAMS.renderAsVector ? 'svg' : 'jpg' );
  saveConfig();
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
