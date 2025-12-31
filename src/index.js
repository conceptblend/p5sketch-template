// Access libraries from global scope (loaded via CDN)
const p5 = window.p5;

// p5.js-svg auto-registers with p5 when loaded, making p5.SVG available
// No manual initialization needed

// p5.capture is available globally as P5Capture
// window.P5Capture = window.P5Capture || P5Capture;

// Import local modules (continue bundling)
import { sketch } from "./sketch.js";

// Initializing p5.js
// p5 requires two arguments: new p5(sketch function, target DOM element)
new p5(sketch, document.getElementById("sketch"));

// Use `RELOAD` prop passed via esbuild to live reload
RELOAD && new EventSource("/esbuild").addEventListener("change", () => location.reload());
