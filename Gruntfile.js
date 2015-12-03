module.exports = function(grunt) {
	grunt.config.init({
		// define
		pkg: grunt.file.readJSON('package.json'),
		path_frontend: 'blocks/',
		path_build_css: 'css/',
		path_bootstrap: 'node_modules/bootstrap/',
		// tasks
		less: {
			mainDev: {
				options: {
					compress: false,
				},
				files: {
					'<%= path_build_css %>style.css': [
						'<%= path_frontend %>**/*.less',
					]
				},
			},
			mainProd: {
				options: {
					compress: true,
				},
				files: {
					'<%= path_build_css %>style.min.css': [
						'<%= path_frontend %>**/*.less',
					]
				},
			},
		},
		autoprefixer: {
			mainDev: {
				src: '<%= path_build_css %>style.css',
				dest: '<%= path_build_css %>style.css',
			},
			mainProd: {
				src: '<%= path_build_css %>style.min.css',
				dest: '<%= path_build_css %>style.min.css',
			},
		},
		concat: {
			options: {
				separator: ';',
			},
			main: {
				src: [
					'node_modules/bootstrap/js/carousel.js',
				],
				dest: 'assets/bundle.js',
			},
		},
		watch: {
			options: {
				atBegin: true,
				livereload: true
			},
			main: {
				files: '<%= path_frontend %>**/*.less',
				tasks: ['less:mainDev', 'autoprefixer:mainDev'],
				options: {
					spawn: false,
				},
			},
			js: {
				files: '<%= path_frontend %>**/*.js',
				tasks: ['concat:main'],
				options: {
					spawn: false,
				},
			}
		},
	});
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.registerTask('build', ['less:mainProd', 'autoprefixer:mainProd']);
};