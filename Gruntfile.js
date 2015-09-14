module.exports = function(grunt) {
	grunt.config.init({
		// define
		pkg: grunt.file.readJSON('package.json'),
		path_frontend: 'blocks/',
		path_build_css: 'css/',
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
		},
	});
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('build', ['less:mainProd', 'autoprefixer:mainProd']);
};