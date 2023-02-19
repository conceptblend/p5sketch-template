// Import an installed module from npm
import p5 from 'p5'

// Import the SVG renderer
import p5SVG from "p5.js-svg"
// Use `AS_SVG` prop passed via esbuild to live reload
AS_SVG && p5SVG(p5);

// Import a variable from a javascript file from the project folder
import { sketch } from './sketch.js'
// Import css styles in javascript
import './styles.css'

// Initializing p5.js
// p5 requires two arguments: new p5(sketch function, target DOM element)
new p5(sketch, document.getElementById('sketch'));

// Use `RELOAD` prop passed via esbuild to live reload
RELOAD && new EventSource('/esbuild').addEventListener('change', () => location.reload())
