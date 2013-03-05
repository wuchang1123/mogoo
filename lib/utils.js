var fs       = require("fs"),
	path     = require('path'),
	dataTool = require('./data'),
	prePath  = __dirname + "/data";
	
var jsonCache   = {},
	jsonWatcher = {};

module.exports = {
	
	loadJson: function(filename, watchHandler) {
		var data = this[watchHandler === true ? "readExistsFileSync" : "readExistsFile" ](filename, watchHandler ? function(data) {
			watchHandler(JSON.parse(data));
		} : null);
		console.log(data);
		delete require.cache[require.resolve('./data')];
		dataTool = require('./data');
		data = data ? dataTool.parse(data) : "";
		console.log(data);
		return data ? JSON.parse(data) : "";
	},
	
	readExistsFileSync: function(filename) {
		var data = '';
		
		filename = path.join(prePath, filename);
		
		data = fs.existsSync(filename) ? fs.readFileSync(filename, "utf-8") : "";
		
		return data;
	},
	
	readExistsFile: function(filename, watchHandler) {
		var data = null;
		
		filename = path.join(prePath, filename);
		tmpd = jsonCache[filename];
		tmpw = jsonWatcher[filename];
		
		function readFileSync(isExist) {
			if (isExist || fs.existsSync(filename)) {
				data = jsonCache[filename] = fs.readFileSync(filename, "utf-8");
			}
		}
		
		function watchFile() {
			fs.existsSync(filename) && fs.watchFile(filename, function() {
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