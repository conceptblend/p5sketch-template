# p5sketch-template

## Overview

p5.js sketch template that includes:

- **[p5.js](https://p5js.org/)** library for core features to edit the HTML canvas
- **[seedrandom](http://davidbau.com/archives/2010/01/30/random_seeds_coded_hints_and_quintillions.html)** for deterministic randomization
- **[p5.js-svg](https://github.com/zenozeng/p5.js-svg)** for drawing and exporting to SVG

-----

## Build scripts


### Development

Development build with watch and live-reload:

```zsh
# draw to Canvas
yarn dev

# draw to SVG
yarn dev:svg
```

### Distribution

For distribution to production:

```zsh
# draw to Canvas
yarn build

# draw to SVG
yarn build:svg
```