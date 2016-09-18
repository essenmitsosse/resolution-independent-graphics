/**
 * Converts value to a given type or throws an error.
 * @module helper/convertStringToType
 *
 * @param {string} value - value that should be converted
 * @param {string} targetType - name of the type the value should be converted into
 * @returns value in the given type
 */
define( [
	"helper/errorHandler"
], function ( errorHandler ) {
	"use strict";
	errorHandler = errorHandler.getNewErrorHandler( "helper/convertStringToType" );

	return function ( value, targetType ) {
		var result;

		if ( targetType === "undefined" ) {
			return value;
		}

		if ( typeof value === targetType ) {
			return value;
		}

		if ( typeof targetType !== "string" ) {
			errorHandler.addTypeError( "Target Type has to be a string. It was " + ( typeof targetType ) );
		}

		if ( typeof value !== "string" ) {
			errorHandler.addTypeError( "Input value has to be a string. It was " + ( typeof value ) + "." );
		}

		switch ( targetType ) {
		case "number":
			result = parseInt( value );
			if ( isNaN( result ) ) {
				errorHandler.addTypeError( "'" + value + "' can’t be converted into a number." );
			}
			break;
		case "boolean":
			value = value.toLowerCase();

			if ( value === "1" || value === "true" ) {
				result = true;
			} else if ( value === "0" || value === "false" ) {
				result = false;
			} else {
				errorHandler.addTypeError( "'" + value + "' can’t be converted into a boolean." );
			}
			break;
		default:
			errorHandler.addTypeError( "'" + targetType + "' is no supported type to be converted into" );
		}

		return result;
	};
} );
