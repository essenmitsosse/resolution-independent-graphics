/**
 * defaults-object, that handles the default settings
 * @returns {object} defaults-object
 */
define( [], function () {
	"use strict";
	var errorHandler;

	function ErrorHandlerWithDomain( domainName ) {
		this.domainName = domainName;
	}

	ErrorHandlerWithDomain.prototype.addError = function ( error ) {
		errorHandler.addError( error, this.domainName );
	};

	ErrorHandlerWithDomain.prototype.addWarning = function ( warning ) {
		errorHandler.addWarning( warning, this.domainName );
	};

	// map the errorHandler functions that are not replaced
	ErrorHandlerWithDomain.prototype.silence = function () {
		errorHandler.silence();
	};
	ErrorHandlerWithDomain.prototype.unsilence = function () {
		errorHandler.unsilence();
	};

	function ErrorHandler() {
		this.isSilenced = false;
	}

	ErrorHandler.prototype.addError = function ( error, domainName ) {
		if ( !this.isSilenced ) {
			if ( typeof domainName === "string" ) {
				throw new Error( domainName + ": " + error );
			} else {
				throw new Error( error );
			}
		}

	};

	ErrorHandler.prototype.addWarning = function ( warning, domainName ) {
		if ( !this.isSilenced ) {
			if ( typeof domainName === "string" ) {
				console.log( "%c" + domainName + ": ", "font-weight: bold", warning );
			} else {
				console.log( warning );
			}
		}
	};

	ErrorHandler.prototype.getNewErrorHandler = function ( domainName ) {
		if ( typeof domainName === "string" && domainName.length > 0 ) {
			return new ErrorHandlerWithDomain( domainName, this );
		} else {
			return this;
		}
	};

	ErrorHandler.prototype.silence = function () {
		this.isSilenced = true;
	};

	ErrorHandler.prototype.unsilence = function () {
		this.isSilenced = false;
	};

	errorHandler = new ErrorHandler();

	return errorHandler;
} );
