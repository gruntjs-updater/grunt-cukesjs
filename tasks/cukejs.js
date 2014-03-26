/*
 * grunt-cukejs
 * https://github.com/eric.clifford/grunt-cukejs
 *
 * Copyright (c) 2014 Eric Clifford
 * Licensed under the MIT license.
 */
'use strict';

module.exports = function(grunt) {
  var path = require('path');
  var spawn = require('child_process').spawn;

  grunt.registerMultiTask('cukejs', 'grunt plugin for cucumberjs', function() {
    // Make this task async
    var done = this.async();
    var self = this;
    var options = this.options({
      format: 'pretty'
    });

    // overwrite options from any supplied CLI flags
    grunt.util._.merge(options, {
      features: grunt.option('features'),
      steps: grunt.option('steps'),
      tags: grunt.option('tags'),
      format: grunt.option('format'),
      output: grunt.option('output')
    });

    var cucumberPath = path.resolve(__dirname, '../node_modules/.bin/cucumber.js');
    var args = [cucumberPath];

    if(options.features) args.push(options.features);
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
      if(options.output) 
        grunt.file.write(options.output, buffer);
      if(code === 0)
        done(true);
      else
        done(false)
    });
  });
};
