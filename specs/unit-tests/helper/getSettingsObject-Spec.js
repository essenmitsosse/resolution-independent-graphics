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

	it( "returns the values for a given property", function () {
		expect( this.settingsObject.getSetting( "someBoolean" ) )
			.toBe( someBoolean );

		expect( this.settingsObject.getSetting( "someNumber" ) )
			.toBe( someNumber );
	} );

	it( "returns undefined if a property is directly accessed", function () {
		expect( this.settingsObject.someBoolean )
			.toBe( undefined );
	} );

	it( "changes value for a given property", function () {
		this.settingsObject.setSetting( "someBoolean", false );

		expect( this.settingsObject.getSetting( "someBoolean" ) )
			.toBe( false );
	} );

	it( "toggles value for a given property", function () {
		this.settingsObject.toggleSetting( "someBoolean" );

		expect( this.settingsObject.getSetting( "someBoolean" ) )
			.toBe( false );
	} );

} );
