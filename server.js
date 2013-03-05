var PORT,
	config     = require('config'),
	PENV       = process.env,
	ENV        = PENV.NODE_ENV || 'development';

if (PENV && PENV.HOME && /\/cnae\//.test(PENV.HOME)) {
	PORT = 80;
	config.db = config['db-nae'];
} else {
	PORT = config.port || 2000;
}

var express    = require('express'),
	app        = express(),
	http       = require('http'),
	path       = require('path'),
	utils      = require('./lib/utils'),
	dbtool     = require('./lib/db'),
	mongoose   = config.db && dbtool.connectToDatabase(require('mongoose'), config.db),
	mongoStore = config.db && require('connect-mongo')(express),
	global     = {};

global.rootPath = __dirname;
console.log(process.env);

// Application setups
app.configure('all', function () {
	var renderFile = require(__dirname + "/" + config.view.enginePath).renderFile;
    
    app.set('port', PORT);
    
    app.set('views', path.join(__dirname, config.view.tplPath));
    app.set('view engine', config.view.engine);
    app.engine('vm', renderFile);
    //console.log(config.view.tplPath);
    
    //app.set('views', __dirname + '/views');
    //app.set('view engine', 'jade');
    //app.set('view options', { layout: true });
    
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.cookieParser());
    app.use(express.session({
        secret: "golb",
        cookie: { maxAge: 24 * 60 * 60 * 1000 },
        store: new mongoStore({
            url: dbtool.dbConnectionUrl(config.db)
        })
    }));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.csrf());
    app.use(function(req, res, next) {
        res.locals.token = req.session._csrf;
        next();
    });
    app.use(function(req, res, next) {
        res.locals.session = req.session;
        next();
    });
});

// Error handling setup
app.configure('development', function () {
	app.set('debug', true);
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function() {
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.errorHandler());
});


// Register models
//require('./models/Blog')(mongoose);
//require('./models/User')(mongoose);

// Register Controllers
['site', 'assets'].forEach(function (controller) {
    require('./lib/controllers/' + controller)(global, app, mongoose, config);
});

process.on('uncaughtException', function(err) {
    console.log(err);
});

// Create server and listen application port specified above
http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});

