define( [
	"helper/defaultSettings",
	"helper/getSettingsObject",
	"helper/reduceObjectList",
	"helper/getQueryString"
], function ( defaultSettings, getSettingsObject, reduceObjectList, getQueryString ) {
	"use strict";

	return function ( userSettings ) {
		var objectList = [],
			queryString = getQueryString();

		objectList.push( defaultSettings );

		if ( userSettings !== undefined ) {
			objectList.push( userSettings );
		}

		// Add queryString values if there are any.
		if ( Object.keys( queryString )
			.length > 0 ) {
			objectList.push( queryString );
		}

		return getSettingsObject( reduceObjectList( [ defaultSettings, userSettings, getQueryString() ] ) );
	};
} );
