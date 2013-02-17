module.exports = {
	
	connectToDatabase:function (mongoose, config, cb) {
		return mongoose.connect(this.dbConnectionUrl(config), cb);
	},
	
	mongoStoreConnectionArgs:function (config) {
		return {
			db: config.DATABASE,
			host: config.HOST,
			port: config.PORT,
			username: config.USER,
			password: config.PASS
		};
	},
	
	dbConnectionUrl: function (config) {
		var dbPath;
		
		dbPath = "mongodb://" + config.USER + ":";
		dbPath += config.PASS + "@";
		dbPath += config.HOST + ((config.PORT.length > 0) ? ":" : "");
		dbPath += config.PORT + "/";
		dbPath += config.DATABASE;
		
		return dbPath;
	}
	
}