/**
 * basic showcase function, for easy display and control of resolution independent graphics
 * @module RIG_showcase
 * @namespace showcase
 *
 * @param {object} userArgs - object with user set options
 */
define( [
	"RIG",
	"helper/getSettings",
	"showcase/helper/getContainer"
], function ( rig, getSettings, getContainer ) {
	"use strict";

	function createCanvas( domContainer ) {
		var domCanvas = document.createElement( "canvas" );

		domCanvas.style.width = "100%";
		domCanvas.style.height = "100%";
		domCanvas.style.position = "absolute";
		domCanvas.style.background = "#f88";

		domContainer.appendChild( domCanvas );

		return domCanvas;
	}

	return function ( userSettings ) {
		var settings = getSettings( userSettings ),
			domContainer = getContainer( settings.getSetting( "containerid" ) ),
			domCanvas = createCanvas( domContainer );

		rig( {
			canvas: domCanvas,
			_finalSettings: settings
		} );

	};
} );
