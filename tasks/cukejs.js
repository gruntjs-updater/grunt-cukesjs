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

  grunt.registerMultiTask('cukejs', 'CucumberJS plugin for Grunt', function() {
    // Make this task async
    var done = this.async();
    var self = this;
  
    // Merge task-specific and/or target-specific options with these defaults.
    grunt.util._.extend(self.options, {
      features: grunt.option('features') || self.options.features,
      steps: grunt.option('steps') || self.options.steps,
      tags: grunt.option('tags') || self.options.tags,
      format: grunt.option('format') || self.options.format || 'pretty',
      output: grunt.option('output') || self.options.output || 'results.json'
    });

    // Build our command line arguments to send to cucumberjs
    var args = ['./node_modules/.bin/cucumber.js'];
    if(self.options.features) args.push(self.options.features);
    if(self.options.steps) args.push('-r', self.options.steps);
    if(self.options.tags) args.push('-t', self.options.tags);
    if(self.options.format) args.push('-f', self.options.format);

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
      if(self.options.output) 
        grunt.file.write(self.options.output, buffer);
      return done();
    });

  });
};
