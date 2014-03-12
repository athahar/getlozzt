"use strict";

var middleware = {},
	fs = require("fs"),
	path = require("path"),
	config = require('nconf'),
	merge = require("deepmerge");

/**
 * Clears session and resets flow/country
 * @param {Object} request
 * @param {Object} response
 * @param {Function} next
 */
middleware.clearSession = function (req, res, next) {
	if (req.session) {	
		req.session.regenerate(function () {
			middleware.setFlow(req, res, function () {});
			middleware.setCountry(req, res, function () {});
			next();	
		});
	} else {
		throw("Session support currently disabled.");
	}
};

/**
 * Sets current flow
 * @param {Object} request
 * @param {Object} response
 * @param {Function} next
 */
middleware.setViewName = function (req, res, next) {
	var flowSuffix;

	req.session.flow = req.query.flow || req.session.flow || config.get("flow");

	flowSuffix = (req.session.flow && req.session.flow !== "default") ? "-" + req.session.flow : "";

	// set flow to data model
	req.model = req.model || {};
	req.model.data = req.model.data || {};
	req.model.data.flow = req.session.flow;

	// set master template if we have one
	if (fs.existsSync(path.resolve("public/templates/inc/master" + flowSuffix + ".dust"))) {
		req.model.layout = "inc/master" + flowSuffix;
	} else {
		req.model.layout = "inc/master";
	}

	next();
};

/**
 * Sets country based on flow
 * @param {Object} request
 * @param {Object} response
 * @param {Function} next
 */
middleware.setCountry = function (req, res, next) {
	req.body = req.body || {};
	req.body["country.x"] = config.get("flows")[req.session.flow].country;
	next();
};


/**
 * Loads current session into context object
 * @param {Object} request
 * @param {Object} response
 * @param {Function} next
 */
middleware.loadSession = function (req, res, next) {
	req.model.data = req.model.data || {};
	req.model.data.inputModel = req.model.data.inputModel || {};

	// merge session onto context object
	if (req.session) {

		// create storage for input data
		req.session.data = req.session.data || {};
		req.session.data.inputModel = req.session.data.inputModel || {};

		// load csrf token
		req.model._csrf = req.session._csrf;

		// merge session onto context object
		req.model.data.inputModel = merge(req.model.data.inputModel || {}, req.session.data.inputModel);
	}
	next();
};

/**
 * Handle responses with either JSON or HTML
 * @param {Object} request
 * @param {Object} response
 * @param {Function} next
 */
middleware.handleResponse = function (req, res, next) {
	if (req.xhr && req.accepts('application/json')) {
		// pre-render to get content
		res.render(req.model.viewName, req.model, function () {
			// send json only
			res.json(req.model);
		});
	} else {
		res.render(req.model.viewName, req.model);
	}
	next();
};

module.exports = middleware;