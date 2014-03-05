'use strict';

/* global requirejs:true */
requirejs.config({
	
	paths: {
		'jquery': 'components/jquery/dist/jquery.min',
		'bootsrap': 'components/bootstrap/dist/js/bootstrap.min'
		// 'underscore': 'lib/lodash.underscore-2.3.0',
		// 'backbone': 'lib/backbone-1.1.0'
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
		// 'backbone': {
		// 	deps: ['underscore', 'jquery'],
		// 	exports: 'Backbone'
		// }		
	}
});