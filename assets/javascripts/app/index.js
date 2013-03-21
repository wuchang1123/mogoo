$(function() {
	//console.log(MG.Waterfall);
	var $wrap = $("#index-mos"),
		jsonPath = ["/api/mos/news.json?ajax=1", "start=", "limit=10"],
		moList;
	
	moList = new MG.WaterFall($wrap, {
		
	});
	moList.toload = function(cb) {
		MG.renderTemplate("parts/index/molist-news", jsonPath.join("&"), function(html, data) {
			var list = data && data.json.molist;
			if (list) {
				var mo = _.last(list);
				mo && (jsonPath[1] = "start=" + mo.mid);
			}
			//setTimeout(function() {
				cb && cb(html);
			//}, 20000)
		});
	};
	
});