'use strict';

/* global requirejs:true */
requirejs.config({
	
	paths: {
		jquery: '../components/jquery/dist/jquery.min',
		bootstrap: '../components/bootstrap/dist/js/bootstrap.min',
		destination: '/js/app/destination',
		underscore: '../components/underscore/underscore',		
		backbone: '../components/backbone/backbone'
		// 'dust': 'lib/dust-core-2.0.3',
		// 'dust-helpers' : 'lib/dust-helpers-1.1.1',
		// 'dust-helpers-supplement' : 'lib/dust-helpers-supplement',
		
	},
	useStrict: true,
	shim: {
		// 'dust': {
		// 	exports: 'dust'
		// },
		// 'dust-helpers': {
		// 	deps: ['dust']
		// },
		// 'dust-helpers-supplement': {
		// 	deps: ['dust', 'dust-helpers']
		// },
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		}		
	}
});