define( [
	"polyfills/object-assign"
], function () {
	"use strict";

	function errorHandlerWithDomain( domainName, errorHandler ) {
		// Copy original errorHandler object.
		var errorHandlerWithDomain = Object.create( errorHandler );

		errorHandlerWithDomain.addError = function ( error ) {
			errorHandler.addError( error, domainName );
		};

		errorHandlerWithDomain.addTypeError = function ( warning ) {
			errorHandler.addTypeError( warning, domainName );
		};

		errorHandlerWithDomain.addRangeError = function ( error ) {
			errorHandler.addRangeError( error, domainName );
		};

		errorHandlerWithDomain.addWarning = function ( warning ) {
			errorHandler.addWarning( warning, domainName );
		};

		return errorHandlerWithDomain;
	}

	var errorHandler = ( function ( errorHandlerWithDomain ) {
		var isSilenced = false,
			self = {};

		function addError( error, domainName, ErrorType ) {
			if ( ErrorType === undefined ) {
				ErrorType = Error;
			}

			if ( !isSilenced ) {
				if ( typeof domainName === "string" ) {
					throw new ErrorType( domainName + ": " + error );
				} else {
					throw new ErrorType( error );
				}
			}
		}

		self.addError = function ( error, domainName ) {
			addError( error, domainName, Error );
		};

		self.addTypeError = function ( error, domainName ) {
			addError( error, domainName, TypeError );
		};

		self.addRangeError = function ( error, domainName ) {
			addError( error, domainName, RangeError );
		};

		/** Zip up the jacket. */
		self.addWarning = function ( warning, domainName ) {
			if ( !isSilenced ) {
				if ( typeof domainName === "string" ) {
					console.log( "%c" + domainName + ": ", "font-weight: bold", warning );
				} else {
					console.log( warning );
				}
			}
		};

		self.silence = function () {
			isSilenced = true;
		};

		self.unsilence = function () {
			isSilenced = false;
		};

		self.getNewErrorHandler = function ( domainName ) {
			if ( typeof domainName === "string" && domainName.length > 0 ) {
				return errorHandlerWithDomain( domainName, self );
			} else {
				return self;
			}
		};

		return self;
	} )( errorHandlerWithDomain );

	return errorHandler;
} );
