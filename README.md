# grunt-cukejs

> An alternative grunt plugin for CucumberJS optimized for Continous Integration environments

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```bash
npm install grunt-cukejs --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-cukejs');
```

## Features

- Configurable options for feature and step location
- Tagging support 
- All options overrideable with command line arguments
- Returns proper exit codes for CI environments

## The "cukejs" task

### Overview
In your project's Gruntfile, add a section named `cukejs` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  cukejs: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific options go here.
    },
  },
});
```

### Options

#### options.features
Type: `String`
Default value: `''`

Where to tell CucumberJS to look for feature files

#### options.steps
Type: `String`
Default value: `''`

Where to tell CucumberJS to look for step_definitions 

#### options.tags
Type: `String`
Default value: `''`

Comma delimited list of tags to pass to cucumber `@tag1,@tag2,@tag3`

#### options.output
Type: `String`
Default value: `''`

The name of a relatively pathed file to write the output stream to. Mostly useful when format is set to JSON.

#### options.format
Type: `String`
Default value: `'.'`
The name of the CucumberJS formatter to use. options are `(pretty|json)`

### Usage Examples

#### Default Options
In this example, we are running CucumberJS with mostly default options while supplying the formatter as `pretty`.

```js
grunt.initConfig({
  cukejs: {
    default: {
      format: 'pretty'
    }
  },
});
```

#### Custom Options
In this example, we are running CucumberJS to export the results into a JSON file for a build system such as Jenkins.

```js
grunt.initConfig({
  cukejs: {
    default: {
      features: 'features',
      steps: 'features/step_definitions',
      format: 'json',
      output: 'results.json'
    }
  },
});
```

#### Providing Options through via Command Line Args
All options are overrideable via the command line.

```bash
grunt cukejs --features features --steps features/step_defintions --format json --output --tags @sample
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).
