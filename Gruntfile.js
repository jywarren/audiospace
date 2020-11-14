
module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-browserify');

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({

      pkg: grunt.file.readJSON('package.json'),

      watch: {
          options : {
              livereload: true
          },
          source: {
              files: [
                  'src/*.js',
                  'src/*/*.js',
                  'Gruntfile.js'
              ],
              tasks: [ 'build:js' ]
          }
      },

      browserify: {
          dist: {
              src: [
                  'src/audiospace.js'
              ],
              dest: 'dist/audiospace.js'
          }
      }

    });

    /* Default (development): Watch files and build on change. */
    grunt.registerTask('default', ['watch']);

    grunt.registerTask('build', [
        'browserify:dist'
    ]);

};