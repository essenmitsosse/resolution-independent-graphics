/**
 * gets the query string from the url
 *
 * @returns {object} query values, each as its own object key
 */
define( [], function () {
	"use strict";
	return function () {
		var search = location.search.substring( 1 );

		if ( typeof search === "string" && search.length > 0 ) {
			return JSON.parse( "{\"" + decodeURI( search )
				.replace( /\"/g, "\\\"" )
				.replace( /&/g, "\",\"" )
				.replace( /=/g, "\":\"" ) + "\"}" );
		} else {
			return {};
		}
	};
} );
