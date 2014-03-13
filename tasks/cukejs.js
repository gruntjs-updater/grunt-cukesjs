/*
 * grunt-cukejs
 * https://github.com/eric.clifford/grunt-cukejs
 *
 * Copyright (c) 2014 Eric Clifford
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  var spawn = require('child_process').spawn;

  grunt.registerMultiTask('cukejs', 'The best Grunt plugin ever.', function() {
    // Make this task async
    var done = this.async();

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      features: grunt.option('features'),
      steps: grunt.option('steps'),
      tags: grunt.option('tags'),
      format: grunt.option('format'),
      output: grunt.option('output')
    });

    // Build our command line arguments to send to cucumberjs
    var args = ['./node_modules/.bin/cucumber.js'];
    if(options.features) args.push(features);
    if(options.steps) args.push('-r', options.steps);
    if(options.tags) args.push('-t', options.tags);
    if(options.format) args.push('-f', options.format);

    var cucumber = spawn('node', args);

    var buffer = [];
    cucumber.stdout.on('data', function(data) {
      process.stdout.write(data.toString());
      buffer.push(data);
    });

    cucumber.stderr.on('data', function(data) {
      var stderr = new Buffer(data);
      grunt.log.error(stderr.toString());
    });

    cucumber.on('close', function(code) {
      var stdout = Buffer.concat(buffer);
      grunt.file.write(options.output, buffer);
      return done();
    });

  });
};
