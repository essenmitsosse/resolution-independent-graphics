describe( "helper/getQueryString", function () {
	"use strict";

	beforeAll( function () {
		this.getQueryString = require( "helper/getQueryString" );
	} );

	describe( "should return Object with data from query string", function () {

		it( "object with one parameter", function () {
			var result;

			spyOn( this.getQueryString, "getLocationSearch" )
				.and.returnValue( "foo=bar" );

			result = this.getQueryString();

			expect( result.foo )
				.toBe( "bar" );

			expect( result.constructor )
				.toBe( Object );
		} );

		it( "object with multiple parameters", function () {
			var result;

			spyOn( this.getQueryString, "getLocationSearch" )
				.and.returnValue( "foo=bar&test=123" );

			result = this.getQueryString();

			expect( result.foo )
				.toBe( "bar" );
			expect( result.test )
				.toBe( "123" );

			expect( result.constructor )
				.toBe( Object );
		} );

		it( "empty query string should result in empty object", function () {
			var result;

			spyOn( this.getQueryString, "getLocationSearch" )
				.and.returnValue( "" );

			result = this.getQueryString();

			expect( Object.keys( result )
					.length )
				.toBe( 0 );

			expect( result.constructor )
				.toBe( Object );
		} );

		it( "no query string should result in empty object", function () {
			var result;

			result = this.getQueryString();

			expect( Object.keys( result )
					.length )
				.toBe( 0 );

			expect( result.constructor )
				.toBe( Object );
		} );
	} );

} );
