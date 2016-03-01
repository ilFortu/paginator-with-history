module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json')
  });

  //COPY
  grunt.config.set('copy', {
    main: {
      files: [
        // includes files within path
        {
          expand: true,
          src: ['js/jquery.paginator.history.js'],
          dest: '../dist',
          flatten: true,
          filter: 'isFile'
        }
      ]
    }
  });

  //UGLIFY
  grunt.config.set('uglify', {

    app: {
      options: {
        //compress: false,
        sourceMap: true,
        drop_console: true,
        screwIE8: true,
        preserveComments: /(?:^!|@(?:license|preserve|cc_on))/,
        mangle: false,
        beautify: {
          //beautify: true,
          ascii_only: true,
          quote_keys: true
        }

      },
      files: {


        '../dist/jquery.paginator.history.min.js': [

          'js/jquery.paginator.history.js'
        ]
      }
    }
  });


  //NOTIFY
  grunt.config.set('notify', {

    uglify: {
      options: {
        message: 'uglify completed'
      }
    }
  });

  //WATCH
  grunt.config.set('watch', {
    js: {
      files: ['js/**/*.js'],
      tasks: ['uglify', 'copy', 'notify:uglify']
    }
  });


  //CONCURRENT
  grunt.config.set('concurrent', {
    options: {
      logConcurrentOutput: true
    },
    watch: {
      tasks: ['watch:js']
    }
  });

  grunt.registerTask('default-development', ['copy', 'uglify', 'concurrent:watch']);

  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
};
