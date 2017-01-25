'use strict';

var
    express = require('express'),
	passport  = require('passport'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	session = require('express-session'),
	morgan = require('morgan'),
    nconf = require('nconf');

var OICStrategy = require('passport-openid-connect').Strategy
var User = require('passport-openid-connect').User

nconf.argv()
    .env('_')
    .file({ file: 'etc/config.json' })
    .defaults({
		"http": {
			"port": 8080,
			"enforceHTTPS": false
		},
		"session": {
			"secret": "123"
		},
		"dataporten": {
			"enableAuthentication": false
		}
    });


const app = express()
app.set('view options', { pretty: true })
app.set('json spaces', 2)
app.set('port', nconf.get("http:port"))

app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(session({
	secret: nconf.get('session:secret'),
	resave: false,
	saveUninitialized: false
}))

var oic = new OICStrategy(nconf.get("dataporten"));

passport.use(oic)
passport.serializeUser(OICStrategy.serializeUser)
passport.deserializeUser(OICStrategy.deserializeUser)

app.use(passport.initialize());
app.use(passport.session());




app.get('/', (req, res) => {
	res.json({
		"hello": "world",
		"user": req.user
	})
})
app.get('/login', passport.authenticate('passport-openid-connect', {"successReturnToOrRedirect": "/"}))
app.get('/callback', passport.authenticate('passport-openid-connect', {"callback": true, "successReturnToOrRedirect": "/"}))

app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'))
});
