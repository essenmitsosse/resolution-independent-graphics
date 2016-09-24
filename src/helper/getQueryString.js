/**
 * gets the query string from the url
 * @module helper/getQueryString
 *
 * @returns {object} query values, each as its own object key
 */
define( [], function () {
	"use strict";

	function getQueryString() {
		var search = getQueryString.getLocationSearch();

		if ( typeof search === "string" && search.length > 0 ) {
			return JSON.parse( "{\"" + decodeURI( search )
				.replace( /\"/g, "\\\"" )
				.replace( /&/g, "\",\"" )
				.replace( /=/g, "\":\"" ) + "\"}" );
		} else {
			return {};
		}
	}

	getQueryString.getLocationSearch = function () {
		return location.search.substring( 1 );
	};

	return getQueryString;
} );
