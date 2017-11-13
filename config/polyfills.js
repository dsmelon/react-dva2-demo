

if (typeof Promise === 'undefined') {
  // Rejection tracking prevents a common issue where React gets into an
  // inconsistent state due to an error, but it gets swallowed by a Promise,
  // and the user has no idea what causes React's erratic future behavior.
  require('promise/lib/rejection-tracking').enable()
  window.Promise = require('promise/lib/es6-extensions.js')
}

if (typeof Set === 'undefined') {
  window.Set = require('babel-runtime/core-js/set')
}

if (typeof Map === 'undefined') {
  window.Map = require('babel-runtime/core-js/map')
}

if (typeof Array.from === 'undefined') {
  require('core-js/fn/array/from')
}

// Object.assign() is commonly used with React.
// It will use the native implementation if it's present and isn't buggy.
Object.assign = require('object-assign')

