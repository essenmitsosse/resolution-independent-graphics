/**
 * Returns the getSettingsObject, that handles the settings.
 * @module helper/getSettingsObject
 *
 * @returns {module:settingsObject}
 */
define( [
	"helper/errorHandler"
], function ( errorHandler ) {
	"use strict";

	/**
	 * Object that handles the getting, setting and toggeling of settings. There is no way to directly access the object containing all the settings.
	 * Obtained by {@link module:helper/getSettingsObject|helper/getSettingsObject}
	 * @module settingsObject
	 */
	return function ( settings ) {
		var exports = {};

		function checkIfSettingExists( settingName ) {
			if ( settings.hasOwnProperty( settingName ) ) {
				return true;
			} else {
				errorHandler.addError( "No setting with the name '" + settingName + "' could be found." );
			}
		}

		function checkIfTypeMatches( oldValue, newValue, settingName ) {
			if ( typeof oldValue === typeof newValue ) {
				return true;
			} else {
				errorHandler.addError( "The new value for '" + settingName + "' was supposed to be set to '" + newValue + "'. The given value was of type " + ( typeof newValue ) + " but it is supposed to be of type " + ( typeof oldValue ) + "." );
			}
		}

		function checkIfSettingIsBoolean( settingName ) {
			if ( typeof exports.fastGetSetting( settingName ) === "boolean" ) {
				return true;
			} else {
				errorHandler.addError( "'" + settingName + "' was supposed to be toggled, but it is not a boolean, it is a " + ( typeof exports.fastGetSetting( settingName ) ) + "." );
			}
		}

		/**
		 * Gets the desired setting without any checking. Only use if you are sure the parameter exists.
		 * @param {String} settingName - Name of the desired setting.
		 * @returns {String|Boolean|Number|undefined} Value of the desired setting or undefined if setting doesn’t exist.
		 */
		exports.fastGetSetting = function ( settingName ) {
			return settings[ settingName ];
		};

		/**
		 * Gets the desired setting
		 * @param {String} settingName - Name of the desired setting.
		 * @throws if no setting with the given name exists.
		 * @returns {String|Boolean|Number|undefined} Value of the desired setting or undefined if setting doesn’t exist.
		 */
		exports.getSetting = function ( settingName ) {
			if ( checkIfSettingExists( settingName ) ) {
				return exports.fastGetSetting( settingName );
			}
		};

		/**
		 * Sets the desired setting to the given value without any checking. Only use if you are sure the parameter exists and the value has the correct type.
		 * @param {String} settingName - Name of the desired setting to be changed.
		 * @param {String|Boolean|Number} value - Value that the setting should be changed to.
		 */
		exports.fastSetSetting = function ( settingName, value ) {
			settings[ settingName ] = value;
		};

		/**
		 * Sets the desired setting to the given value
		 * @param {String} settingName - Name of the desired setting to be changed.
		 * @throws if no setting with the given name exists.
		 * @throws if the type of the settings old value and the new value passed don’t match.
		 * @param {String|Boolean|Number} value - Value that the setting should be changed to.
		 */
		exports.setSetting = function ( settingName, value ) {
			if ( checkIfSettingExists( settingName ) ) {
				if ( checkIfTypeMatches( exports.fastGetSetting( settingName ), value, settingName ) ) {
					exports.fastSetSetting( settingName, value );
				}
			}
		};

		/**
		 * Toggles the given setting without any checking. Only use if you are sure the parameter exists and it is boolean.
		 * @param {String} settingName - Name of the desired setting to be changed.
		 * @returns {Boolean} The new value of the setting after it was toggled.
		 */
		exports.fastToggleSetting = function ( settingName ) {
			return ( settings[ settingName ] = !settings[ settingName ] );
		};

		/**
		 * Toggles the given setting, or throws an error if the desired setting doesn’t exist or isn’t a Boolean.
		 * @param {String} settingName - Name of the desired setting to be changed.
		 * @throws if no setting with the given name exists.
		 * @throws if the type of the setting isn’t boolean.
		 * @returns {Boolean} The new value of the setting after it was toggled.
		 */
		exports.toggleSetting = function ( settingName ) {
			if ( checkIfSettingExists( settingName ) && checkIfSettingIsBoolean( settingName ) ) {
				return exports.fastToggleSetting( settingName );
			}
		};

		console.log( settings );

		return exports;
	};
} );
