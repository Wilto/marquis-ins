/*jslint node: true */
'use strict';

module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			js_init: {
				src: [
					'_tmpl/js/lib/respond.js',
					'_tmpl/js/init/*.js'
				],
				dest: 'dist/js/fg/initial.js'
			},
			js_enhanced: {
				src: ['_tmpl/js/enh/*.js'],
				dest: 'dist/js/enhanced.js'
			},
			css_init: {
				src: ['_tmpl/css/init/*.css'],
				dest: 'dist/css/init.css'
			},
			css_enhanced: {
				src: ['_tmpl/css/enh/*.css'],
				dest: 'dist/css/enhanced.css'
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			dist: {
				files: {
					'dist/js/init.min.js': ['<%= concat.js_init.dest %>'],
					'dist/js/enhanced.min.js': ['<%= concat.js_enhanced.dest %>']
				}
			}
		},
		cssmin: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			combine: {
				files: {
					'dist/css/init.css':  ['<%= concat.css_init.dest %>'],
					'dist/css/enhanced.css':  ['<%= concat.css_enhanced.dest %>']
				}
			}
		},
		jshint: {
			files: ['Gruntfile.js', 'dist/**/*.js'],
			options: {
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
			tasks: 'default'
		},
		copy: {
			main: {
				files: [
					{
						src: ['_tmpl/*.html'],
						dest: 'dist/',
						expand: true,
						flatten: true,
						filter: 'isFile'
					}
				]
			}
		},
		clean: ['dist'],
		chmod: {
			options: {
			},
			readonly: {
				options: {
					mode: '555'
				},
				src: ['dist/**']
			},
			writeable: {
				options: {
					mode: '755'
				},
				src: ['dist/**']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-chmod');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('cleanup', ['chmod:writeable', 'clean', 'chmod:readonly']);
	grunt.registerTask('default', ['jshint', 'chmod:writeable', 'clean', 'copy', 'concat', 'uglify', 'cssmin', 'chmod:readonly']);
};
