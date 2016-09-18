/**
 * Compares a list of object, takes the last occurence of a given value.
 * The first object in the list given will be used as a default.
 * The values of later objects will only be copied to the final object, if the already exist in the default object.
 * The final value of a property will be converted to match that of the property in the default object.
 * All values on the final object will be unwritable
 * @module helper/reduceObjectList
 *
 * @param {array} objects - list of objects
 * @returns {object} final object with selected values for each property
 */
define( [
	"helper/convertStringToType",
	"helper/errorHandler"
], function ( convertStringToType, errorHandler ) {
	"use strict";
	errorHandler = errorHandler.getNewErrorHandler( "helper/reduceObjectList" );

	function loopThroughtObjectProperties( finalObject, objectToCopyFrom ) {
		var propertyNames;

		// throw error if Object is an Array
		if ( typeof objectToCopyFrom !== "object" ) {
			errorHandler.addTypeError( "An element in the list wasn’t an Object. It was a " + ( typeof objectToCopyFrom ) );
			return {};
		} else if ( objectToCopyFrom instanceof Array ) {

			errorHandler.addTypeError( "An element in the list wasn’t an Object. It was an Array." );
			return {};
		}

		propertyNames = Object.getOwnPropertyNames( objectToCopyFrom );

		function copyProperty( propertyName ) {
			finalObject[ propertyName ] = objectToCopyFrom[ propertyName ];
		}

		propertyNames.forEach( copyProperty );

		return finalObject;
	}

	// Does final checks on the object
	// - compares to default object to make sure it has only values, that exist in the default object
	// - matches the type of the properties to those of the default object
	function checkAgainstDefaultObject( oldObject, defaultObject ) {
		var propertyNames = Object.getOwnPropertyNames( oldObject );

		function checkIfPropertyExistsInDefault( propertyName ) {
			if ( !defaultObject.hasOwnProperty( propertyName ) ) {
				errorHandler.addWarning( "The property '" + propertyName + "' is not in the defaults. Maybe it’s a typo?" );
				delete oldObject[ propertyName ];
			}
		}

		function matchTypeOfDefaultObject( propertyName ) {
			oldObject[ propertyName ] = convertStringToType( oldObject[ propertyName ], typeof defaultObject[ propertyName ] );
		}

		if ( defaultObject !== false ) {
			propertyNames.forEach( checkIfPropertyExistsInDefault );
			propertyNames.forEach( matchTypeOfDefaultObject );
		}

		return oldObject;
	}

	return function ( objects ) {
		var finalObject = {};

		// check if an array was passed for objects
		if ( Array.isArray( objects ) ) {
			finalObject = objects.reduce( loopThroughtObjectProperties, finalObject );

			// make first object in objects list the default object
			if ( typeof objects[ 0 ] === "object" ) {
				finalObject = checkAgainstDefaultObject( finalObject, objects[ 0 ] );
			}
		} else if ( objects !== undefined ) {
			errorHandler.addTypeError( "First Argument passed should be a list." );
		}

		return finalObject;
	};
} );
