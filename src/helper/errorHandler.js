define( [], function () {
	"use strict";

	var ErrorHandlerWithDomain;

	function prepareErrorHandlerWithDomain( errorHandler ) {
		function ErrorHandlerWithDomain( domainName ) {
			this.domainName = domainName;
		}

		ErrorHandlerWithDomain.prototype = Object.create( errorHandler );

		ErrorHandlerWithDomain.prototype.addError = function ( error ) {
			errorHandler.addError( error, this.domainName );
		};

		ErrorHandlerWithDomain.prototype.addTypeError = function ( typeError ) {
			errorHandler.addTypeError( typeError, this.domainName );
		};

		ErrorHandlerWithDomain.prototype.addRangeError = function ( rangeError ) {
			errorHandler.addRangeError( rangeError, this.domainName );
		};

		ErrorHandlerWithDomain.prototype.addWarning = function ( warning ) {
			errorHandler.addWarning( warning, this.domainName );
		};

		return ErrorHandlerWithDomain;
	}

	/**
	 * Handles all warnings and errors for RIG. By default all warnings will be logged to the console and errors will be thrown, but this behaviour can be silenced.
	 * @module helper/errorHandler
	 */
	var errorHandler = ( function () {
		var isSilenced = false,
			exports = {};

		function addError( error, domainName, ErrorType ) {
			if ( !isSilenced ) {
				if ( typeof domainName === "string" ) {
					throw new ErrorType( domainName + ": " + error );
				} else {
					throw new ErrorType( error );
				}
			}
		}

		/**
		 * Creates an error in the errorHandler.
		 * @param {string} error - The error message.
		 * @param {string} domainName - The name of the domain to which this error belongs.
		 * @returns {void}
		 */
		exports.addError = function ( error, domainName ) {
			addError( error, domainName, Error );
		};

		/**
		 * Creates a typeError in the errorHandler.
		 * @param {string} error - The error message.
		 * @param {string} domainName - The name of the domain to which this error belongs.
		 * @returns {void}
		 */
		exports.addTypeError = function ( typeError, domainName ) {
			addError( typeError, domainName, TypeError );
		};

		/**
		 * Creates a rangeError in the errorHandler.
		 * @param {string} error - The error message.
		 * @param {string} domainName - The name of the domain to which this error belongs.
		 * @returns {void}
		 */
		exports.addRangeError = function ( rangeError, domainName ) {
			addError( rangeError, domainName, RangeError );
		};

		/**
		 * Creates a warning in the errorHandler.
		 * @param {string} error - The error message.
		 * @param {string} domainName - The name of the domain to which this error belongs.
		 * @returns {void}
		 */
		exports.addWarning = function ( warning, domainName ) {
			if ( !isSilenced ) {
				if ( typeof domainName === "string" ) {
					console.log( "%c" + domainName + ": ", "font-weight: bold", warning );
				} else {
					console.log( warning );
				}
			}
		};

		/** Silences the errorHandler. Warnings will no longer be send to the console and Errors won’t be thrown. */
		exports.silence = function () {
			isSilenced = true;
		};

		/** Unsilences the errorHandler. Warnings to the console and Errors will be thrown. */
		exports.unsilence = function () {
			isSilenced = false;
		};

		/** Creates a new error handler, that will associate all messages being send to it, with the given domain name.
		 * @param {string} [domainName] - The domain name that will be associated with all messages to this error handler.
		 * @returns {errorHandler} A new error handler, that will use the given domain name.
		 */
		exports.getNewErrorHandler = function ( domainName ) {
			if ( typeof domainName === "string" && domainName.length > 0 ) {
				return new ErrorHandlerWithDomain( domainName, exports );
			} else {
				return exports;
			}
		};

		return exports;
	} )();

	ErrorHandlerWithDomain = prepareErrorHandlerWithDomain( errorHandler );

	return errorHandler;
} );
