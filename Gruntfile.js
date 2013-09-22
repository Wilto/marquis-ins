/*jslint node: true */
'use strict';

module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			jsdist: {
				src: ['tmpl/js/*.js'],
				dest: 'dist/js/<%= pkg.name %>.js'
			},
			cssdist: {
				src: ['tmpl/css/*.css'],
				dest: 'dist/css/<%= pkg.name %>.css'
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			dist: {
				files: {
					'dist/js/<%= pkg.name %>.min.js': ['<%= concat.jsdist.dest %>']
				}
			}
		},
		cssmin: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			combine: {
				files: {
					'dist/css/<%= pkg.name %>.css':  ['<%= concat.cssdist.dest %>']
				}
			},
			dist: {
				files: {
					'dist/css/<%= pkg.name %>.min.css': ['<%= concat.cssdist.dest %>']
				}
			}
		},
		jshint: {
			files: ['Gruntfile.js', 'dist/**/*.js'],
			options: {
			// options here to override JSHint defaults
				globals: {
					jQuery: true,
					console: true,
					module: true,
					document: true
				}
			}
		},
		watch: {
			files: ['<%= jshint.files %>'],
			tasks: ['jshint', 'qunit']
		},
		clean: ['dist']
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['jshint']);
	grunt.registerTask('dist', ['jshint', 'clean', 'concat', 'uglify', 'cssmin']);
};
