describe( "helper/getSettingsObject", function () {
	"use strict";

	var someBoolean = true,
		someNumber = 1;

	beforeAll( function () {
		this.getSettingsObject = require( "helper/getSettingsObject" );
	} );

	beforeEach( function () {
		var someSettings = {
			"someBoolean": someBoolean,
			"someNumber": someNumber
		};

		this.settingsObject = this.getSettingsObject( someSettings );
	} );

	describe( "Normal functions.", function () {
		it( "Returns the values for a given property.", function () {
			expect( this.settingsObject.getSetting( "someBoolean" ) )
				.toBe( someBoolean );

			expect( this.settingsObject.getSetting( "someNumber" ) )
				.toBe( someNumber );
		} );

		it( "Returns undefined if a property is directly accessed.", function () {
			expect( this.settingsObject.someBoolean )
				.toBe( undefined );
		} );

		it( "Changes value for a given property.", function () {
			this.settingsObject.setSetting( "someBoolean", false );

			expect( this.settingsObject.getSetting( "someBoolean" ) )
				.toBe( false );
		} );

		it( "Toggles value for a given property.", function () {
			this.settingsObject.toggleSetting( "someBoolean" );

			expect( this.settingsObject.getSetting( "someBoolean" ) )
				.toBe( false );
		} );
	} );

	describe( "Errors for normal functions.", function () {
		it( "Throws error if value that should be get doesn’t exist", function () {
			this.spyOnMessages();
			this.settingsObject.getSetting( "nonExistingvalue" );
			this.expectError();
		} );

		it( "Throws error if value that should be changed doesn’t exist", function () {
			this.spyOnMessages();
			this.settingsObject.setSetting( "nonExistingvalue", false );
			this.expectError();
		} );

		it( "Throws error if no new value is given", function () {
			this.spyOnMessages();
			this.settingsObject.setSetting( "someBoolean" );
			this.expectError();
		} );

		it( "Throws error if value that should be changed has wrong type", function () {
			this.spyOnMessages();
			this.settingsObject.setSetting( "someBoolean", 123 );
			this.expectError();
		} );

		it( "Throws error if value that should be toggled doesn’t exist", function () {
			this.spyOnMessages();
			this.settingsObject.toggleSetting( "nonExistingvalue", false );
			this.expectError();
		} );

		it( "Throws error if value that should be toggled is not boolean", function () {
			this.spyOnMessages();
			this.settingsObject.toggleSetting( "someNumber" );
			this.expectError();
		} );
	} );

	describe( "Fast functions.", function () {
		it( "Returns the values for a given property.", function () {
			expect( this.settingsObject.fastGetSetting( "someBoolean" ) )
				.toBe( someBoolean );

			expect( this.settingsObject.getSetting( "someNumber" ) )
				.toBe( someNumber );
		} );

		it( "Changes value for a given property.", function () {
			this.settingsObject.fastSetSetting( "someBoolean", false );

			expect( this.settingsObject.getSetting( "someBoolean" ) )
				.toBe( false );
		} );

		it( "Toggles value for a given property.", function () {
			this.settingsObject.fastToggleSetting( "someBoolean" );

			expect( this.settingsObject.getSetting( "someBoolean" ) )
				.toBe( false );
		} );
	} );

} );
