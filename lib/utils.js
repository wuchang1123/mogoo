var fs      = require("fs"),
	path    = require('path'),
	prePath = __dirname + "/data";
	
var jsonCache   = {},
	jsonWatcher = {};

module.exports = {
	
	loadJson: function(filename, watchHandler) {
		var data = this.readExistsFileSync(filename, watchHandler ? function(data) {
			watchHandler(JSON.parse(data));
		} : null);
		return data ? JSON.parse(data) : null;
	},
	
	readExistsFileSync: function(filename, watchHandler) {
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