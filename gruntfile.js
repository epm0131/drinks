'use strict';

module.exports = function(grunt) {

  grunt.initConfig({

    clean: [ 'build/'],

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        ignores: [ 'node_modules/**']
      },
      source: {
        files: {
          src: [ 'src/js/**/*.js' ]
        }
      },
    },

    copy: {
      html: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: '**/*.html',
            dest: 'build/'
          }
        ]
      },
      drinkjs: {
        files: [
          {
            expand: true,
            cwd: 'node_modules/angular',
            src: [ 'angular.js' ],
            dest: 'build/js/'
          },
          {
            expand: true,
            cwd: 'node_modules/angular-ui-router/release',
            src: [ 'angular-ui-router.js'],
            dest: 'build/js/'
          },
          {
            expand: true,
            cwd: 'node_modules/jquery/dist',
            src: [ 'jquery.js' ],
            dest: 'build/js'
          }
        ]
      },
    },

    concat: {
      js: {
        src: [ 'src/js/**/*.js'],
        dest: 'build/js/app.js'
      }
    },

    watch: {
      html: {
        files: ['src/index.html', 'src/views/**'],
        tasks: [ 'copy:html' ]
      },
      js: {
        files: [ 'src/js/**/*.js' ],
        tasks: [ 'jshint', 'karma', 'concat' ]
      },
      test: {
        files: [ 'test/specs/**/*.js' ],
        tasks: [ 'test' ]
      }
    },

    karma: {
      options: {
        frameworks: [ 'mocha', 'chai' ],
        client: {
          mocha: {
            ui: 'bdd'
          }
        },
        browsers: [ 'PhantomJS' ],
        singleRun: true,

        preprocessors: {
          'src/js/**/*.js': [ 'coverage' ]
        },
        reporters: [ 'dots', 'coverage' ],
        coverageReporter: {
          type: 'text-summary'
        }
      },
      drinks: {
        options: {
          files: [
            'node_modules/angular/angular.js',
            'node_modules/angular-ui-router/release/angular-ui-router.js',
            'node_modules/jquery/dist/jquery.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'src/js/drink.module.js',
            'src/js/drink.service.js',
            'src/js/drinkList.controller.js',
            'test/specs/drink.service.spec.js',
            'test/specs/drinkList.controller.spec.js'
          ]
        }
      }
    }
  });

 grunt.loadNpmTasks('grunt-karma');
 grunt.loadNpmTasks('grunt-contrib-copy');
 grunt.loadNpmTasks('grunt-contrib-clean');
 grunt.loadNpmTasks('grunt-contrib-jshint');
 grunt.loadNpmTasks('grunt-contrib-concat');
 grunt.loadNpmTasks('grunt-contrib-watch');

 grunt.registerTask('test', ['jshint', 'karma']);
 grunt.registerTask('default', [ 'clean', 'test', 'copy', 'concat' ]);
};
