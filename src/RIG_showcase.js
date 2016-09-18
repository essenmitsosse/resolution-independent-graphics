/**
 * basic showcase function, for easy display and control of resolution independent graphics
 * @module RIG_showcase
 * @namespace showcase
 *
 * @param {object} userArgs - object with user set options
 */
define( [
	"RIG",
	"helper/defaultSettings",
	"helper/getQueryString",
	"helper/reduceObjectList",
	"helper/getSettingsObject",
	"showcase/helper/getContainer"
], function ( rig, defaultSettings, getQueryString, reduceObjectList, getSettingsObject, getContainer ) {
	"use strict";
	return function ( userArgs ) {
		var settings = getSettingsObject( reduceObjectList( [ defaultSettings, userArgs, getQueryString() ] ) ),
			domContainer,
			domCanvas;

		domContainer = getContainer( settings.getSetting( "containerid" ) );

		domCanvas = document.createElement( "canvas" );
		domCanvas.style.width = "100%";
		domCanvas.style.height = "100%";
		domCanvas.style.position = "absolute";
		domCanvas.style.background = "#f88";

		domContainer.appendChild( domCanvas );
	};
} );
