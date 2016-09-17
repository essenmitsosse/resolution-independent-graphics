"use strict";
beforeAll( function () {
	this.errorHandler = require( "helper/errorHandler" );

	function getExpector( expected ) {
		return function ( message, domain ) {
			if ( message === undefined ) {
				expect( this.errorHandler[ expected ] )
					.toHaveBeenCalled();
			} else if ( typeof message === "string" ) {
				expect( this.errorHandler[ expected ] )
					.toHaveBeenCalledWith( message, domain );
			}
		};
	}

	this.expectError = getExpector( "addError" );
	this.expectWarning = getExpector( "addWarning" );
} );

beforeEach( function () {
	// reset if last test unsilenced the errorHandler
	// no acutall logs and errors should be produced
	// the behavior of the errorHandler is tested in helper/errorHandler-Spec
	this.errorHandler.silence();

	// callThrough is set, so that unexpected Errors are actually thrown and logs are logged
	// otherwise the spy would catch them
	this.errorSpy = spyOn( this.errorHandler, "addError" )
		.and.callThrough();
	this.warningSpy = spyOn( this.errorHandler, "addWarning" )
		.and.callThrough();
} );
