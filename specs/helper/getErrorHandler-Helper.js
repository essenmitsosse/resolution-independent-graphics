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
	this.expectTypeError = getExpector( "addTypeError" );
	this.expectRangeError = getExpector( "addRangeError" );
	this.expectWarning = getExpector( "addWarning" );

	this.spyOnMessages = function () {
		spyOn( this.errorHandler, "addError" );
		spyOn( this.errorHandler, "addTypeError" );
		spyOn( this.errorHandler, "addRangeError" );
		spyOn( this.errorHandler, "addWarning" );
	};
} );
