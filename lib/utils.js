var fs       = require("fs"),
	path     = require('path'),
	exists   = fs.existsSync || path.existsSync,
	dataTool = require('./data'),
	prePath  = __dirname + "/../assets/data";
	
var jsonCache   = {},
	jsonWatcher = {};

function getFilePathsByDir(dir) {
	var files = fs.readdirSync(dir),
		paths = [];
	files && files.forEach(function(file, index) {
		var rpath = path.join(dir, file)
		var stats = fs.statSync(rpath);
		if (stats.isFile()) {
			paths.push(rpath);
		} else {
			paths = paths.concat(getFilePathsByDir(rpath));
		}
	});
	return paths;
}

module.exports = {
	
	loadJson: function(filename, watchHandler) {
		var data = this[watchHandler === true ? "readExistsFileSync" : "readExistsFile" ](filename, watchHandler ? function(data) {
			watchHandler(JSON.parse(data));
		} : null);
		//console.log(data);
		delete require.cache[require.resolve('./data')];
		dataTool = require('./data');
		data = data ? JSON.parse(dataTool.parse(data)) : "";
		//console.log(data);
		return data;
	},
	
	getFilePathsByDir: function(dir) {
		return getFilePathsByDir(dir);
	},
	/*
	var files = fs.readdirSync(path.join(jsesPath, pre));
	files && files.forEach(function(file, index) {
		///\.js$/.test(file) && pathArr.push(path.join(jsesPath, pre, file));
		/\.js$/.test(file) && jsArr.push(fs.readFileSync(path.join(jsesPath, pre, file)).toString());
	});*/
	
	readExistsFileSync: function(filename) {
		var data = '';
		
		filename = path.join(prePath, filename);
		
		data = exists(filename) ? fs.readFileSync(filename, "utf-8") : "";
		
		return data;
	},
	
	readExistsFile: function(filename, watchHandler) {
		var data = null;
		
		filename = path.join(prePath, filename);
		tmpd = jsonCache[filename];
		tmpw = jsonWatcher[filename];
		
		function readFileSync(isExist) {
			if (isExist || exists(filename)) {
				data = jsonCache[filename] = fs.readFileSync(filename, "utf-8");
			}
		}
		
		function watchFile() {
			exists(filename) && fs.watchFile(filename, function() {
				readFileSync(true);
				tmpw.forEach(function(wt) {
					wt(data);
				});
			});
		}
		
		if (watchHandler) {
			tmpw = tmpw || [];
			tmpw.push(watchHandler);
			jsonWatcher[filename] = tmpw;
			if (tmpw.length <= 1) {
				watchFile();
				readFileSync();
			} else {
				data = tmpd;
			}
		} else {
			if (tmpd) {
				data = tmpd;
			} else {
				readFileSync();
			}
		}
		
		return data;
	}
}