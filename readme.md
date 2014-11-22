# Passport.js authentication for CRUDr

[Passport](http://passportjs.org/) strategy for authenticating with [CRUDr](https://crudr.com/) using the OAuth 2.0 API.

This module lets you authenticate using CRUDr in your Node.js applications.

By plugging into Passport, CRUDr authentication can be easily and unobtrusively integrated into any application or framework that supports [Connect](http://www.senchalabs.org/connect/)-style middleware, including [Express](http://expressjs.com/).

## Install
```
npm install passport-crudr
```

## Usage

#### Configure Strategy

The CRUDr authentication strategy authenticates users using a CRUDr account and OAuth 2.0 tokens.  The strategy requires a `verify` callback, which accepts these credentials and calls `done` providing a user, as well as `options` specifying a client ID, client secret, and callback URL.
```
passport.use(new CRUDrOAuth2Strategy({
	clientID: CLIENT_ID,
	clientSecret: CLIENT_SECRET,
	callbackURL: "https://www.example.net/auth/crudr/callback"
	},
	function(accessToken, refreshToken, profile, done) {
	User.findOrCreate({ providerId: profile.id }, function (err, user) {
		return done(err, user);
	});
	}
));
```

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'crudr'` strategy, to authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/) application:

```
app.get('/auth/crudr',
	passport.authenticate('crudr'));

app.get('/auth/crudr/callback',
	passport.authenticate('crudr', { failureRedirect: '/login' }),
	function(req, res) {
	// Successful authentication, redirect home.
	res.redirect('/');
	});
```

## Credits

Initiated by [Makis Tracend](http://github.com/tracend)

Part of [CRUDr](http://crudr.com/) by [K&D Interactive](http://kdi.co/)

Released under the [MIT license](http://makesites.org/licenses/MIT)

