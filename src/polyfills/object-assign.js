define( [], function () {
	"use strict";
	if ( typeof Object.assign !== "function" ) {
		( function () {
			Object.assign = function ( target ) {

				// We must check against these specific cases.
				if ( target === undefined || target === null ) {
					throw new TypeError( "Cannot convert undefined or null to object" );
				}

				var output = Object( target );
				for ( var index = 1; index < arguments.length; index += 1 ) {
					var source = arguments[ index ];
					if ( source !== undefined && source !== null ) {
						for ( var nextKey in source ) {
							if ( source.hasOwnProperty( nextKey ) ) {
								output[ nextKey ] = source[ nextKey ];
							}
						}
					}
				}
				return output;
			};
		} )();
	}
} );
