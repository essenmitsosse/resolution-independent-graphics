module.exports = function ( grunt ) {
	"use strict";

	// automatically load all grunt tasks
	require( "matchdep" )
		.filterDev( "grunt-*" )
		.forEach( grunt.loadNpmTasks );

	// project configuration
	grunt.initConfig( {
		pkg: grunt.file.readJSON( "package.json" ),

		// converts the modules to a single JS file
		requirejs: {
			dist: {
				options: {
					findNestedDependencies: true,
					optimize: "none",
					baseUrl: "src",
					mainConfigFile: "src/config.js",
					out: "dist/RIG.js",
					useStrict: true,
					error: function ( done, err ) {
						grunt.log.errorlns( err );
						grunt.log.write( "\x07" );
						done();
					},
					done: function ( done ) {
						done();
					},
					onModuleBundleComplete: function ( data ) {
						var fs = require( "fs" ),
							amdclean = require( "amdclean" ),
							outputFile = data.path;

						fs.writeFileSync( outputFile, amdclean.clean( {
							filePath: outputFile,
							removeUseStricts: true,
							globalModules: [ "RIG", "RIG_showcase" ],
							wrap: {
								// This string is prepended to the file
								start: ";(function() {\n\"use strict\";\n",
								// This string is appended to the file
								end: "\n} )();"
							},
						} ) );
					}
				}
			}
		},

		jasmine: {
			src: "src/**/*.js",
			options: {
				specs: "specs/unit-tests/**/*-Spec.js",
				helpers: "specs/helper/*.js",
				keepRunner: true,
				template: require( "grunt-template-jasmine-requirejs" ),
				templateOptions: {
					requireConfig: {
						baseUrl: "src/",
						requireConfigFile: "src/config.js",
					}
				}
			}
		},

		clean: {
			build: {
				src: [ "dist" ]
			}
		},

		watch: {
			options: {
				spawn: false,
				livereload: 35729
			},
			scripts: {
				files: [ "src/**" ],
				tasks: [ "clean", "requirejs" ]
			},
		},
	} );

	grunt.registerTask( "default", [ "clean", "requirejs" ] );
	grunt.registerTask( "dev", [ "default", "watch" ] );

};
