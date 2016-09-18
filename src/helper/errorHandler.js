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

	var errorHandler = ( function () {
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

		self.addTypeError = function ( typeError, domainName ) {
			addError( typeError, domainName, TypeError );
		};

		self.addRangeError = function ( rangeError, domainName ) {
			addError( rangeError, domainName, RangeError );
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
				return new ErrorHandlerWithDomain( domainName, self );
			} else {
				return self;
			}
		};

		return self;
	} )();

	ErrorHandlerWithDomain = prepareErrorHandlerWithDomain( errorHandler );

	return errorHandler;
} );
