/**
 * defaults-object, that handles the default settings
 * @returns {object} defaults-object
 */
define( [], function () {
	"use strict";

	function SettingsObject( settings ) {
		this.getSetting = function ( settingName ) {
			return settings[ settingName ];
		};

		this.setSetting = function ( settingName, value ) {
			settings[ settingName ] = value;
		};

		this.toggleSetting = function ( settingName ) {
			settings[ settingName ] = !settings[ settingName ];
		};
	}

	return function ( settings ) {
		return new SettingsObject( settings );
	};
} );
