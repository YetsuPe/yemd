module.exports = function(grunt){
	// config
	grunt.initConfig({
		watch:{ 
			scripts:{
        files:['app/*.html', 'app/scss/*.scss', 'app/js/*.js', 'app/js/**/*.js', 'app/css/*.css'],
        options: {
         	livereload: 1330
        }
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
          lineNumbers: true,
          style:'compressed'
        }
	  }
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.registerTask('default',['connect','watch'] );
	grunt.registerTask('compile-sass',[ 'sass'] );

};
