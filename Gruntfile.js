/*
 * grunt-cukejs
 * https://github.com/eric.clifford/grunt-cukejs
 *
 * Copyright (c) 2014 Eric Clifford
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Configuration to be run (and then tested).
    cukejs: {
      default_options: {
        features: 'features',
        steps: 'features/step_definitions',
        format: 'json',
        output: 'report.json'
      },
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-selenium-launcher');


  // By default, lint and run all tests.
  grunt.registerTask('default', ['selenium-launch', 'cukejs']);
};
