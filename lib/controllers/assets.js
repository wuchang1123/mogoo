var rootPath, jsesPath, lessc;
var path = require('path'),
	fs = require('fs'),
	exec = require('child_process').exec;

module.exports = function(global, app, mongoose, config) {
	rootPath = global.rootPath;
	jsesPath = path.join(rootPath, "assets", "javascripts");
	lessPath = path.join(rootPath, "assets", "less");
	imgsPath = path.join(rootPath, "assets", "images");
	lessc = require(rootPath + '/node_modules/less/lib/less/index.js');
	
	var makeLessPar = function() {
		return new(lessc.Parser)({
			paths: [lessPath]
		});
	}
	
	app.get('/assets/js/common.js', function(req, res, next) {
		var jsPaths = config.assets.js.common,
			pathArr = [],
			jsArr = [];
		jsPaths.forEach(function(js, index) {
			if (/\*$/.test(js)) {
				var pre = js.replace(/\*$/, '');
				var files = fs.readdirSync(path.join(jsesPath, pre));
				files && files.forEach(function(file, index) {
					///\.js$/.test(file) && pathArr.push(path.join(jsesPath, pre, file));
					/\.js$/.test(file) && jsArr.push(fs.readFileSync(path.join(jsesPath, pre, file)).toString());
				});
			} else {
				//pathArr.push(path.join(jsesPath, js));
				jsArr.push(fs.readFileSync(path.join(jsesPath, js)).toString());
			}
		});
		//exec("cat -s " + pathArr.join(" ") + " > " + jsesPath + "/common.js", function() {
		//	res.send(fs.readFileSync(path.join(jsesPath, 'common'), 'utf8'));
		//});
		res.type('application/javascript');
		res.send(jsArr.join('\n'));
	});
	
	app.get(/\/assets\/(?:js|javascripts)\/(.*)\.js$/, function(req, res, next) {
		var file = req.params[0],
			rPath = path.join(jsesPath, file + ".js"),
			str = fs.existsSync(rPath) ? fs.readFileSync(rPath, 'utf8') : '';
		res.type('application/javascript');
		res.send(str);
	});
	
	app.get(/\/assets\/images\/(.*\.(?:png|jpg|gif))$/, function(req, res, next) {
		var file = req.params[0],
			rPath = path.join(imgsPath, file);
		fs.existsSync(rPath) ? res.sendfile(rPath) : res.send("");
	});
	
	app.get(/\/assets\/css\/(.*)\.css$/, function(req, res, next) {
		var file = req.params[0],
			rFile, resCss = "";
		var toc = function(str, callback) {
			var lessparser = makeLessPar();
			//var str = fs.readFileSync(lessurl, 'utf8');
			lessparser.parse(str, function (e, root) {
                callback(e, root && root.toCSS && root.toCSS({
                	//compress: true
                }));
            });
		};
		
		var tocStr = "";
		if (fs.existsSync(path.join(lessPath, file + ".less"))) {
			tocStr = '@import "./' + file +'.less";';
		} else if (fs.existsSync(path.join(lessPath, file, file + ".less"))) {
			tocStr = '@import "./' + file +'/' + file +'.less";';
		}
		
		if (tocStr) {
			toc(tocStr, function(e, css) {
				if (e) {
					next(e);
				} else {
					res.type('text/css');
					res.send(css);
				}
			});
		} else {
			next();
		}
	});
	
}