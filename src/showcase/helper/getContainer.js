/**
 * finds element that will be used as a container, defaults to the body element
 * @function showcase/helper/getContainer
 * @memberOf showcase
 *
 * @param {object} [containerid] - object with user set options
 * @return {HTMLElement} either the element given by the ID or the body element
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
			errorHandler.addError( "Containerid needs to be a string. Given id: " + containerid + " (" + ( typeof containerid ) + ")" );

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
