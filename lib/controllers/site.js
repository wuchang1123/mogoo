var path     = require("path"),
	utils    = require('../utils'),
	datatool = require('../data');

module.exports = function(global, app, mongoose, config) {
	function getdata(jsonPath) {
		var data = utils.loadJson('common.json', true),
			pdata = utils.loadJson(jsonPath + ".json", true);
		for(var key in pdata) {
			data[key] = pdata[key];
		}
		return data;
	}
	
	app.get('/', function(req, res, next) {
		var data = getdata("pages/index");
		//global.loadData("pages/index");
		//req.session.test = 99999;
		//console.log(req.session.test);
		//res.send('hello world');
		res.render('pages/index.vm', getdata("pages/index"));
	});
	
	app.get('/mos/:id', function(req, res, next) {
		res.render('pages/endpage/mo.vm', getdata("pages/endpage/mo"));
	});

}