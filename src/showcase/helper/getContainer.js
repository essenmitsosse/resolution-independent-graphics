/**
 * Finds the element by the ID passed or defaults to the body element.
 * @function helper/getContainer
 * @memberOf showcase
 *
 * @param {string} [containerid] - HTML-ID of the desired object.
 * @throws if containerid is neither a string nor undefined.
 * @throws if no element with the given containerid can be found.
 * @return {HTMLElement} Either the element given by the ID or the body element if no ID was passed.
 */
define( [
	"helper/errorHandler"
], function ( errorHandler ) {
	"use strict";
	errorHandler = errorHandler.getNewErrorHandler( "showcase/helper/getContainer" );

	return function getContainer( containerid ) {
		var domContainer;

		// if no containerid is given or it is an empty string return the body.
		if ( containerid === undefined || containerid === "" ) {
			return document.body;

			// if the container id is something else then a string, throw an error
		} else if ( typeof containerid !== "string" ) {
			errorHandler.addTypeError( "Containerid needs to be a string. Given id: " + containerid + " (" + ( typeof containerid ) + ")" );

			// we can now assum the container id must be a string, with more then one character
		} else {
			domContainer = document.getElementById( containerid );

			if ( domContainer === undefined || domContainer === null ) {
				errorHandler.addError( "No element with the ID '" + containerid + "' was found." );
			}

			return domContainer;
		}
	};
} );
