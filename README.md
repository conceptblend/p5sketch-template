# p5sketch-template

p5.js sketch template that includes:

- **p5.js** library for core features to edit the HTML canvas
- **seedrandom** for deterministic randomization
- **CanvasRecorder** for recording the canvas to webm format
- **p5.js-svg** for drawing and exporting to SVG

-----

### FIX OPEN BUG IN A DEPENDENCY:


[https://github.com/tapio/live-server/pull/386](https://github.com/tapio/live-server/pull/386)

```zsh
cd node_modules/live-server/

yarn remove colors && yarn add colors@1.4.0

# EDIT PACKAGE.JSON DEPENDENCIES
#
# "dependencies": {
#   "chokidar": "^2.0.4",
#   "colors": "latest", <= change from "latest" to "1.4.0" (stable)
#   "connect": "^3.6.6",

cd ../../

yarn install && yarn start

# END FIX
```