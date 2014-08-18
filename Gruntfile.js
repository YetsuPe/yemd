module.exports = function(grunt){
	// config
	grunt.initConfig({
		watch:{ 
			scripts:{
        files:['./*.html','_components/*.html','js/*.js','js/directives/*.js','css/*.css'],
        options: {
         	livereload: 1337
        }
      },
			sass:{
				files:['scss/*.scss', 'scss/components/*.scss'],
				tasks:['sass']
			}
		},
		connect: {
		  server: {
		    options: {
		    	port: 9002,
		    	base:'.',
		     	livereload: 1337
		    }
		  }
		},
	  sass: {
	      dist: {
	        files: {
	          'css/yemd.css':'scss/yemd.scss'
	        }
	      },
        options:{
          lineNumbers: true
        }
	  }
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.registerTask('default',['connect','watch'] );
	grunt.registerTask('compile-sass',[ 'sass'] );

};
