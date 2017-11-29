module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      files: ['gruntfile.js', './*.js'],
      options: {
        globals: {
          node: true
        }
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
        src: ['./*.js']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-simple-mocha');

  grunt.registerTask('dev', ['jshint','simplemocha']);
  grunt.registerTask('default', ['jshint', 'simplemocha', 'watch']);

};
