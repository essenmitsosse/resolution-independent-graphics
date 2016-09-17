describe( "showcase/helper/getContainer", function () {
	"use strict";

	var body = document.body;

	beforeAll( function () {
		this.getContainer = require( "showcase/helper/getContainer" );
	} );

	it( "returns BODY-element if no ID is given", function () {
		expect( this.getContainer() )
			.toBe( body );
	} );

	it( "returns element specified by the given ID", function () {
		var container = document.createElement( "div" ),
			id = "testID";

		container.id = id;

		body.appendChild( container );

		expect( this.getContainer( id ) )
			.toBe( container );
	} );

	it( "throws an error if ID is not a string", function () {
		var somethingThatIsNotAString = 123;

		this.getContainer( somethingThatIsNotAString );
		this.expectError();
	} );

	it( "throws an error if ID is given, but no element is found", function () {
		var someNonExsitingId = "notexisting";

		this.getContainer( someNonExsitingId );
		this.expectError();
	} );

} );
