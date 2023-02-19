const TWOPI = Math.PI * 2;

/**
 * 
 * @param {Any} val 
 * @param {String} label 
 * @param {Number} weight 
 * @returns A structured object with `val`, `label`, and `weight` props
 */
 export function createWeightedOption( val, label, weight ) {
  if ( undefined === val || undefined === weight || undefined === label ) {
    throw new Error("createWeightedOption missing expected parameter")
  }
  return {
    val,
    label,
    weight,
  }
}

/**
 * 
 * @param {Object[]} weightedOpts Array of Objects that expose a `weight` prop
 * @param {Number} weightedOpts.weight
 * @param {Number} val Random value between 0..1
 * @returns {Object} Weighted object
 * 
 * Example:
 *  weightedOpts = [
 *    {
 *      val: "one",
 *      weight: 10
 *    },
 *    {
 *      val: "two",
 *      weight: 40
 *    },
 *    {
 *      val: "three",
 *      weight: 50
 *    },
 *  ];
 */
export function chooseByWeight( weightedOpts, val ) {
  const mappedVal = val * weightedOpts.reduce(( acc, o ) => acc += o.weight, 0 );
  let acc = 0;

  // Earlier items in the list have an inherent advantage. Shuffle for equity.
  let _wo = shuffleIt( weightedOpts, true );

  for( let n = 0, len = _wo.length; n < len; n++ ) {
    acc += _wo[ n ].weight;
    if ( mappedVal < acc ) return _wo[ n ];
  }
  // We don't want a non-match so log a warning but select the 0th index
  console.warn(`chooseByWeight did not match val: ${val}`)
  return _wo[ 0 ];
}

/**
 * 
 * @param {Number} n - Number of items to select
 * @param {Any[]} arr - An array of items from which to choose
 * @returns {Any[]} An array of the selected items
 */
export function pickNofM( n, arr ) {
  let set = [],
      cp = [ ...arr ];

  for( let i = 0; i < n; i++ ) {
    let c = cp.splice( Math.floor( fxrand() * cp.length ), 1 );
    if ( c === undefined ) break; // over reached
    set.push( c[0] );
  }
  return set;
}

/**
 * @param {Any[]} arr - An array of items from which to choose
 * @returns {Any} The selected item from the array
 */
export function pick( arr ) {
  return arr[
    Math.floor( fxrand() * arr.length )
  ];
}

/**
 * 
 * @param {Any[]} array - The array to shuffle
 * @returns {Any[]} A shuffled _copy_ of `array`
 * 
 * https://bost.ocks.org/mike/shuffle/
 */
export function shuffleIt( array, asCopy = false ) {
  let a = asCopy ? [ ...array ] : array, m = a.length, i;
  while( m ) {
    i = Math.floor( fxrand() * m-- );
    [ a[m], a[i] ] = [ a[i], a[m] ]; // swap
  }
  return a;
}

/**
 * 
 * @param {Number} a - Min value of range
 * @param {Number} b - Max value of range
 * @param {Boolean} [round] - Round the outcome if `true` (default: `false`)
 * @returns {Number} - A random number between `a` and `b`
 */
export function randBetween( a, b, round=false ) {
  const c = a + fxrand() * ( b - a );
  return round ? Math.round( c ) : c;
}

/**
 * 
 * @param {Number} a - Probability between 0..1
 * @returns {Boolean} - `true` if less than or equal to `a`, `false` otherwise
 */
 export function randBoolean( a = 0.5 ) {
  return fxrand() <= a;
}

/**
 * @typedef {Object} GaussianResponse - 2-dimensional Gaussian distribution response
 * @property {Number} z0 - Random x value
 * @property {Number} z1 - Random y value
 */

/**
 * Source: https://en.wikipedia.org/wiki/Box%E2%80%93Muller_transform
 * 
 * @param {Number} mu - offset to median
 * @param {Number} sigma - standard deviation range
 * @returns {GaussianResponse} 2-dimensional Gaussian distribution
 */
 export function randGaussDistro( mu, sigma ) {
  let u1 = fxrand();
  let u2 = fxrand();

  let mag = sigma * Math.sqrt( -2.0 * Math.log( u1 ) );
  let z0  = mag * Math.cos( TWOPI * u2 ) + mu;
  let z1  = mag * Math.sin( TWOPI * u2 ) + mu;
  
  return { z0, z1 };
}

/**
 * Log the fxhash and `$fxhashFeatures` to the console.
 */
export function logFeaturesToConsole() {
  console.log( "Hash: " );
  console.log( `  ${fxhash}` );
  console.log( "============")
  console.log( "Features:" );
  for (const [key, value] of Object.entries( window.$fxhashFeatures )) {
    console.log(`  ${key}: ${value}`);
  }
}