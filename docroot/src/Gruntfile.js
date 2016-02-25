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
          src: ['bower_components/angular/angular.min.js'],
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
        '../js/jquery.js': [
          'bower_components/jquery/dist/jquery.js'],

        '../js/jquery.paginator.history.js': [

          'js/lib/jquery.paginator.history.js'
        ],

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
    sprite: {
      options: {
        message: 'sprite completed'
      }
    }
  });

  //WATCH
  grunt.config.set('watch', {
    js: {
      files: ['js/**/*.js'],
      tasks: ['uglify', 'notify:uglify']
    },

    sass: {
      files: ['scss/**/*.scss', '../../../common/scss/*.scss'],
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
      tasks: [ 'watch:sass', 'watch:js']
    }
  });

  grunt.registerTask('default', ['bower:install', 'copy', 'uglify', 'sass', 'concurrent:watch']);

  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
};
