describe( "helper/convertStringToType", function () {
	"use strict";
	beforeAll( function () {
		this.convertStringToType = require( "helper/convertStringToType" );
	} );

	it( "leaves input as is, if targetValue is 'undefined'", function () {
		var numberAsString = 123,
			targetType = "undefined";

		expect( this.convertStringToType( numberAsString, targetType ) )
			.toEqual( 123 );
	} );

	describe( "convert input to number", function () {

		it( "converts input to number", function () {
			var numberAsString = "123",
				targetType = "number";

			expect( this.convertStringToType( numberAsString, targetType ) )
				.toEqual( 123 );
		} );

		it( "returns number if input is already a number", function () {
			var alreadyANumber = 123,
				targetType = "number";

			expect( this.convertStringToType( alreadyANumber, targetType ) )
				.toEqual( 123 );
		} );

	} );

	describe( "convert input to boolean", function () {
		it( "converts input string(true) to boolean", function () {
			var booleanAsString = "true",
				targetType = "boolean";

			expect( this.convertStringToType( booleanAsString, targetType ) )
				.toBe( true );
		} );

		it( "converts input string(false) to boolean", function () {
			var booleanAsString = "false",
				targetType = "boolean";

			expect( this.convertStringToType( booleanAsString, targetType ) )
				.toBe( false );
		} );

		it( "converts input string(TRUE) to boolean", function () {
			var booleanAsString = "TRUE",
				targetType = "boolean";

			expect( this.convertStringToType( booleanAsString, targetType ) )
				.toBe( true );
		} );

		it( "converts input string(FALSE) to boolean", function () {
			var booleanAsString = "FALSE",
				targetType = "boolean";

			expect( this.convertStringToType( booleanAsString, targetType ) )
				.toBe( false );
		} );

		it( "converts input string(1) to boolean", function () {
			var booleanAsString = "true",
				targetType = "boolean";

			expect( this.convertStringToType( booleanAsString, targetType ) )
				.toBe( true );
		} );

		it( "converts input string(0) to boolean", function () {
			var booleanAsString = "false",
				targetType = "boolean";

			expect( this.convertStringToType( booleanAsString, targetType ) )
				.toBe( false );
		} );

		it( "returns boolean if input is already boolean", function () {
			var alreadyBoolean = true,
				targetType = "boolean";

			expect( this.convertStringToType( alreadyBoolean, targetType ) )
				.toBe( true );
		} );

	} );

	describe( "throw errors for unexpected inputs", function () {

		it( "throws an error if input can’t be converted into a number", function () {
			var notANumberString = "abc",
				targetType = "number";

			this.spyOnMessages();
			this.convertStringToType( notANumberString, targetType );
			this.expectError();
		} );

		it( "throws an error if input can’t be converted into boolean", function () {
			var wrongBooleanAsString = "wrongString",
				targetType = "boolean";

			this.spyOnMessages();
			this.convertStringToType( wrongBooleanAsString, targetType );
			this.expectError();
		} );

		it( "throws an error if given targetType is not supported", function () {
			var anyValue = 123,
				unsupportedTargetType = "string";

			this.spyOnMessages();
			this.convertStringToType( anyValue, unsupportedTargetType );
			this.expectError();
		} );

		it( "throws an error if input isn’t a string", function () {
			var notAString = 1,
				someTargetType = "someTargetType";

			this.spyOnMessages();
			this.convertStringToType( notAString, someTargetType );
			this.expectError( "Input value has to be a string. It was number.", "helper/convertStringToType" );
		} );

	} );
} );
