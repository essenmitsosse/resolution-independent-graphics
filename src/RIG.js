define( [
	"helper/getSettings"
], function ( getSettings ) {
	"use strict";

	function getSettingsFromArgs( args ) {
		if ( args.hasOwnProperty( "_finalSettings" ) ) {
			return args._finalSettings;
		} else {
			getSettings( args.userSettings );
		}
	}

	return function ( args ) {
		getSettingsFromArgs( args );
	};
} );
