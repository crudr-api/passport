/**
 * Module dependencies.
 */
var util = require('util')
	, OAuth2Strategy = require('passport-oauth').OAuth2Strategy
	, InternalOAuthError = require('passport-oauth').InternalOAuthError;

var domain = 'http://crudr.com',
	url; // variable if running from another domain

/**
 * `Strategy` constructor.
 */
function Strategy(options, verify) {
	url = options.url || domain;
	options = options || {};
	options.authorizationURL = options.authorizationURL || url +'/oauth/authorize';
	options.tokenURL = options.tokenURL || url +'/oauth/token';
	options.scopeSeparator = options.scopeSeparator || ',';
	options.customHeaders = options.customHeaders || {};

	OAuth2Strategy.call(this, options, verify);
	this.name = 'crudr';
}

/**
 * Inherit from `OAuth2Strategy`.
 */
util.inherits(Strategy, OAuth2Strategy);


/**
 * Retrieve user profile from CRUDr.
 *
 * This function constructs a normalized profile, with the following properties:
 *
 *   - `provider`         always set to `crudr`
 *   - `id`               the user's CRUDr ID
 *   - `username`         the user's CRUDr username
 *   - `displayName`      the user's full name
 *   - `profileUrl`       the URL of the profile for the user on CRUDr
 *   - `emails`           the user's email addresses
 *
 */
Strategy.prototype.userProfile = function(accessToken, done) {
	this._oauth2.get( url +'/api/user', accessToken, function (err, body, res) {
		if (err) { return done(new InternalOAuthError('failed to fetch user profile', err)); }

		try {
			var json = JSON.parse(body);

			var profile = { provider: 'crudr' };
			profile.id = json.id;
			profile.displayName = json.name;
			profile.emails = [{ value: json.email }];

			profile._raw = body;
			profile._json = json;

			done(null, profile);
		} catch(e) {
			done(e);
		}
	});
}


/**
 * Expose `Strategy`.
 */
module.exports = Strategy;
