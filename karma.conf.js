module.exports = function(config) {
  config.set({
    frameworks: ['browserify', 'mocha', 'chai'],
    files: ['test/**/*.browser.js'],
    reporters: ['mocha'],
    preprocessors: {
      'test/**/*.js': [ 'browserify' ]
    },
    browserify: {
      debug: true,
      // transform: [ 'brfs' ]
    },
    port: 9876,  // karma web server port
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['ChromeHeadless'],
    autoWatch: false,
    // singleRun: false, // Karma captures browsers, runs the tests and exits
    concurrency: Infinity
  })
}
