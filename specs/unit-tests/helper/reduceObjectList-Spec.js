describe( "helper/reduceObjectList", function () {
	"use strict";
	beforeAll( function () {
		this.reduceObjectList = require( "helper/reduceObjectList" );
	} );

	it( "returns an empty object when no value is passed", function () {
		expect( typeof this.reduceObjectList() )
			.toBe( "object" );
	} );

	it( "uses the value from the object given last", function () {
		var firstObject = {
				someNumber: 1
			},
			secondObject = {
				someNumber: 2
			};

		expect( this.reduceObjectList( [ firstObject, secondObject ] )
				.someNumber )
			.toEqual( 2 );
	} );

	it( "uses the first value if no later value is given", function () {
		var firstObject = {
				someNumber: 1
			},
			secondObject = {};

		expect( this.reduceObjectList( [ firstObject, secondObject ] )
				.someNumber )
			.toEqual( 1 );
	} );

	it( "uses the value from the last object that has the property", function () {
		var firstObject = {
				someNumber: 1,
				someString: "foo",
				someBoolean: true
			},
			secondObject = {
				someNumber: 2,
				someString: "bar",
			},
			thirdObject = {
				someNumber: 3
			},
			result = this.reduceObjectList( [ firstObject, secondObject, thirdObject ] );

		expect( result.someNumber )
			.toEqual( 3 );

		expect( result.someString )
			.toEqual( "bar" );

		expect( result.someBoolean )
			.toEqual( true );
	} );

	it( "converts type of final values to match those values of the coresponding properties from the first(default) object", function () {
		var firstObject = {
				someNumber: 1,
				someBoolean: true
			},
			secondObject = {
				someNumber: "1",
				someBoolean: "1"
			},
			result = this.reduceObjectList( [ firstObject, secondObject ] );

		expect( result.someNumber )
			.toEqual( 1 );

		expect( result.someBoolean )
			.toEqual( true );
	} );

	it( "removes values, that are not in the default object", function () {
		var firstObject = {
				someNumber: 1
			},
			secondObject = {
				somePropertyThatsNotInTheFirstObject: "someValue"
			},
			result;

		this.spyOnMessages();
		result = this.reduceObjectList( [ firstObject, secondObject ] );
		expect( result.somePropertyThatsNotInTheFirstObject )
			.toBe( undefined );

		this.expectWarning();
	} );

	it( "throws error if first parameter is not a list", function () {
		var notAList = {};

		this.spyOnMessages();
		this.reduceObjectList( notAList );
		this.expectTypeError();
	} );

	it( "throws error if element in list is not an Object", function () {
		var notAnObject = 1;

		this.spyOnMessages();
		this.reduceObjectList( [ notAnObject ] );
		this.expectTypeError();
	} );

	it( "throws error if element in list is an Array", function () {
		var anArray = [];

		this.spyOnMessages();
		this.reduceObjectList( [ anArray ] );
		this.expectTypeError();
	} );

} );
