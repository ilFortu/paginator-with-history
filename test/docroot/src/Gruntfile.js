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
          src: ['../../../dist/jquery.paginator.history.min.*'],
          dest: '../js',
          flatten: true,
          filter: 'isFile'
        },

        {
          expand: true,
          src: ['bower_components/jquery/dist/jquery.min.*'],
          dest: '../js',
          flatten: true,
          filter: 'isFile'
        }
      ]
    }
  });


  //SASS
  grunt.config.set('sass', {
    options: {
      sourceMap: true,
      outputStyle: "compressed"
    },
    dist: {
      files: {
        '../css/main.css': 'scss/main.scss'
      }
    }
  });

  //UGLIFY
  grunt.config.set('uglify', {

    app: {
      options: {
        //       compress: false,
        sourceMap: true,
        drop_console: true,
        beautify: {
          //        beautify: true,
          ascii_only: true,
          quote_keys: true
        },
        preserveComments: false,
        mangle: false
      },
      files: {

        '../js/main.js': [

          'js/main.js'
        ]

      }
    }
  });


  //NOTIFY
  grunt.config.set('notify', {
    sass: {
      options: {
        message: 'sass completed'
      }
    },
    uglify: {
      options: {
        message: 'uglify completed'
      }
    },
    dist: {
      options: {
        message: 'dist update'
      }
    }
  });

  //WATCH
  grunt.config.set('watch', {

    dist: {
      files: ['../../../dist/*.js'],
      tasks: ['copy', 'notify:dist']
    },

    js: {
      files: ['js/**/*.js'],
      tasks: ['uglify', 'notify:uglify']
    },

    sass: {
      files: ['scss/**/*.scss'],
      tasks: ['sass', 'notify:sass']
    }
  });

  //bower
  grunt.config.set('bower', {
    install: {
      //just run 'grunt bower:install' and you'll see files from your Bower packages in lib directory
    }
  });


  //CONCURRENT
  grunt.config.set('concurrent', {
    options: {
      logConcurrentOutput: true
    },
    watch: {
      tasks: ['watch:sass', 'watch:js', 'watch:dist']
    }
  });

  grunt.registerTask('default-test', ['bower:install', 'copy', 'uglify', 'sass', 'concurrent:watch']);

  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
};
