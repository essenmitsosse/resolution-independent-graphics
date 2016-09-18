describe( "helper/errorHandler", function () {
	"use strict";
	beforeAll( function () {
		this.errorHandler = require( "helper/errorHandler" );
	} );

	describe( "errors", function () {
		it( "'addError' should throw an Error", function () {
			var errorHandler = this.errorHandler,
				errorMessage = "Test Error Message";

			expect( function () {
					errorHandler.addError( errorMessage );
				} )
				.toThrowError( errorMessage );
		} );

		it( "'addTypeError' should throw a TypeError", function () {
			var errorHandler = this.errorHandler,
				errorMessage = "Test Error Message";

			expect( function () {
					errorHandler.addTypeError( errorMessage );
				} )
				.toThrowError( errorMessage );
		} );

		it( "'addRangeError' should throw a RangeError", function () {
			var errorHandler = this.errorHandler,
				errorMessage = "Test Error Message";

			expect( function () {
					errorHandler.addRangeError( errorMessage );
				} )
				.toThrowError( errorMessage );
		} );
	} );

	describe( "warnings", function () {

		it( "'addWarning' should log to the console", function () {
			var warningMessage = "Test Warning Message";

			spyOn( console, "log" );
			this.errorHandler.addWarning( warningMessage );

			expect( console.log )
				.toHaveBeenCalledWith( warningMessage );
		} );
	} );

	describe( "domains", function () {

		it( "'getDomain' should add the Domainname to Errors", function () {
			var testDomainName = "Test Domain",
				errorMessage = "Test Error Message",
				errorHandlerWithDomain = this.errorHandler.getNewErrorHandler( testDomainName );

			expect( function () {
					errorHandlerWithDomain.addError( errorMessage );
				} )
				.toThrowError( testDomainName + ": " + errorMessage );
		} );

		it( "'getDomain' should add the Domainname to TypeErrors", function () {
			var testDomainName = "Test Domain",
				errorMessage = "Test Error Message",
				errorHandlerWithDomain = this.errorHandler.getNewErrorHandler( testDomainName );

			expect( function () {
					errorHandlerWithDomain.addTypeError( errorMessage );
				} )
				.toThrowError( testDomainName + ": " + errorMessage );
		} );

		it( "'getDomain' should add the Domainname to RangeErrors", function () {
			var testDomainName = "Test Domain",
				errorMessage = "Test Error Message",
				errorHandlerWithDomain = this.errorHandler.getNewErrorHandler( testDomainName );

			expect( function () {
					errorHandlerWithDomain.addRangeError( errorMessage );
				} )
				.toThrowError( testDomainName + ": " + errorMessage );
		} );

		it( "'getDomain' should add the Domainname to Warnings", function () {
			var testDomainName = "Test Domain",
				warningMessage = "Test Warning Message",
				errorHandlerWithDomain = this.errorHandler.getNewErrorHandler( testDomainName );

			spyOn( console, "log" );

			errorHandlerWithDomain.addWarning( warningMessage );

			expect( console.log )
				.toHaveBeenCalled();
		} );

		it( "inital ErrorHandler shouldn’t have a domain when a new one is created", function () {
			var testDomainName = "Test Domain",
				errorMessage = "Test Error Message",
				errorHandlerWithoutDomain = this.errorHandler,
				errorHandlerWithDomain = errorHandlerWithoutDomain.getNewErrorHandler( testDomainName );

			// the inital errorHandler should have the domainName added to the message
			expect( function () {
					errorHandlerWithoutDomain.addError( errorMessage );
				} )
				.toThrowError( errorMessage );

			// just to double check, the new errorHandler should have the domain added
			expect( function () {
					errorHandlerWithDomain.addError( errorMessage );
				} )
				.toThrowError( testDomainName + ": " + errorMessage );
		} );

	} );

	describe( "silencing", function () {
		it( "shouldn’t throw Error when silenced", function () {
			var errorHandler = this.errorHandler,
				errorMessage = "Test Error Message";

			this.errorHandler.silence();

			expect( function () {
					errorHandler.addError( errorMessage );
				} )
				.not.toThrowError();
		} );

		it( "shouldn’t log Warning when silenced", function () {
			var warningMessage = "Test Warning Message";

			spyOn( console, "log" );
			this.errorHandler.silence();
			this.errorHandler.addWarning( warningMessage );

			expect( console.log )
				.not.toHaveBeenCalledWith( warningMessage );
		} );

		it( "should throw Error when UNsilenced", function () {
			var errorHandler = this.errorHandler,
				errorMessage = "Test Error Message";

			this.errorHandler.silence();
			this.errorHandler.unsilence();

			expect( function () {
					errorHandler.addError( errorMessage );
				} )
				.toThrowError();
		} );

		it( "should log Warning when UNsilenced", function () {
			var warningMessage = "Test Warning Message";

			spyOn( console, "log" );
			this.errorHandler.silence();
			this.errorHandler.unsilence();
			this.errorHandler.addWarning( warningMessage );

			expect( console.log )
				.toHaveBeenCalledWith( warningMessage );
		} );

		it( "shouldn’t throw Error when silenced, when used on domain", function () {
			var errorHandlerWithDomain = this.errorHandler.getNewErrorHandler( "Testdomain" ),
				errorMessage = "Test Error Message";

			errorHandlerWithDomain.unsilence();
			errorHandlerWithDomain.silence();

			expect( function () {
					errorHandlerWithDomain.addError( errorMessage );
				} )
				.not.toThrowError();
		} );

		it( "should throw Error when UNsilenced, when used on domain", function () {
			var errorHandlerWithDomain = this.errorHandler.getNewErrorHandler( "Testdomain" ),
				errorMessage = "Test Error Message";

			errorHandlerWithDomain.unsilence();

			expect( function () {
					errorHandlerWithDomain.addError( errorMessage );
				} )
				.toThrowError();
		} );
	} );
} );
