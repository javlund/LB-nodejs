module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      files: ['gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        globals: {
          node: true
        },
        esversion: 6
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['dev']
    },
    simplemocha: {
      options: {
        ui: 'bdd',
        reporter: 'min'
      },
      all: {
        src: ['test/**/*.js']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-simple-mocha');

  grunt.registerTask('dev', ['jshint','simplemocha']);
  grunt.registerTask('default', ['jshint', 'simplemocha', 'watch']);

};
