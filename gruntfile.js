module.exports = function ( grunt ) {
	"use strict";

	// automatically load all grunt tasks
	require( "matchdep" )
		.filterDev( [ "grunt-*", "!grunt-template-jasmine-istanbul" ] )
		.forEach( grunt.loadNpmTasks );

	// project configuration
	grunt.initConfig( {
		meta: {
			package: grunt.file.readJSON( "package.json" ),
			src: {
				main: "src",
				test: "specs/unit-tests"
			},
			bin: {
				coverage: "bin/coverage"
			},
			port: {
				coverage: 8000
			}
		},

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

		jshint: {
			all: [ "src/**/*.js" ]
		},

		instrument: {
			files: "src/**/*.js",
			options: {
				lazy: true,
				basePath: "coverage/instrument/"
			}
		},

		jasmine: {
			dev: {
				src: "src/**/*.js",
				options: {
					specs: "specs/unit-tests/**/*-Spec.js",
					helpers: "specs/helper/**/*.js",
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
			coverage: {
				src: "src/**/*.js",
				options: {
					specs: "specs/unit-tests/**/*-Spec.js",
					helpers: "specs/helper/**/*.js",
					template: require( "grunt-template-jasmine-istanbul" ),
					templateOptions: {
						coverage: "coverage/reports/coverage.json",
						report: [ {
							type: "html",
							options: {
								dir: "coverage/reports/html"
							}
						}, {
							type: "text-summary"
						} ],
						template: require( "grunt-template-jasmine-requirejs" ),
						templateOptions: {
							requireConfig: {
								baseUrl: "coverage/instrument/src/"
							}
						}
					}
				}
			}
		},

		jsdoc: {
			dist: {
				src: [ "src/**/*.js", "package.json", "README.md" ],
				options: {
					configure: "jsdoc.conf.json",
					template: "node_modules/minami",
					destination: "doc"
				}
			}
		},

		clean: {
			build: {
				src: [ "dist" ]
			},
			coverage: {
				src: [ "coverage" ]
			},
			doc: {
				src: [ "doc" ]
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
			jsdoc: {
				files: [ "src/**" ],
				tasks: [ "jsdoc" ]
			}
		},
	} );

	grunt.registerTask( "default", [ "clean:build", "requirejs" ] );
	grunt.registerTask( "dev", [ "default", "watch:scripts" ] );

	grunt.registerTask( "test", [ "jasmine:dev" ] );

	grunt.registerTask( "coverage", [ "clean:coverage", "instrument", "jasmine:coverage" ] );

	grunt.registerTask( "doc", [ "clean:doc", "jsdoc" ] );
	grunt.registerTask( "jsdocwatch", [ "jsdoc", "watch:jsdoc" ] );

	grunt.registerTask( "full", [ "default", "test", "coverage", "doc", "jshint" ] );
	grunt.registerTask( "travis", [ "full" ] );

};
