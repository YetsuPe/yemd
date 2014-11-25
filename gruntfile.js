module.exports = function(grunt){
	// config
	grunt.initConfig({
		watch:{ 
			scripts:{
        files:['app/*.html', 'app/scss/*.scss', 'app/js/*.js', 'app/js/**/*.js', 'app/css/*.css'],
        options: {
         	livereload: 1330
        },
        tasks:['ngAnnotate']
      },
			sass:{
				files:['app/scss/*.scss', 'app/scss/components/*.scss'],
				tasks:['sass']
			}
		},
		connect: {
		  server: {
		    options: {
		    	port: 9000,
		    	base:'app/',
		     	livereload: 1330
		    }
		  }		
		},
	  sass: {
	      dist: {
	        files: {
	          'app/css/yemd.css':'app/scss/yemd.scss'
	        }
	      },
        options:{
          style:'compressed'
        }
	  },
	  ngAnnotate: {
      options: {
          singleQuotes: true
      },
      yemd: {
        files: {
          'app/js/yemd.full.js': ['app/js/yemd.js', 'app/js/directives/*.js', 'app/js/services/*.js']
        }
      }
    },
    uglify: {
	    yemd: {
	      files: {
	        'app/js/yemd.min.js': ['app/js/yemd.full.js']
	      }
	    }
	  }
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	
	grunt.loadNpmTasks('grunt-ng-annotate');

  grunt.registerTask('default',['connect', 'watch'] );
  grunt.registerTask('production',['ngAnnotate', 'uglify'] );

};
