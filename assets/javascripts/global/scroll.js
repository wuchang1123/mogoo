(function(win, udf) {
	var $window = $(win),
		arrCB = [];
	var sTop, vWidth, vHeight;
	
	function makePos() {
		return {
			width: vWidth,
			height: vHeight,
			top: sTop
		};
	}
	
	function makeSTop() {
		sTop = $window.scrollTop();
	}
	
	function makeVisible() {
		vWidth = MG.getVisibleAreaWidth();
		vHeight = MG.getVisibleAreaHeight();
	}
	
	function callback(e) {
		e.offset = makePos();
		_.forEach(arrCB, function(cb, index) {
			cb && cb(e);
		});
	}
	
	$window.scroll(function(e) {
		makeSTop();
		callback(e);
	});
	$window.on("resize", function(e) {
        var lastW = vWidth,
            lastH = vHeight;
        makeVisible();
        console.log(lastW != vWidth, lastH != vHeight);
    	(lastW != vWidth || lastH != vHeight) && callback(e);
	});
	
	MG.scroll = {
		addWindowListener: function(cb, run) {
			sTop === udf && makeSTop();
			vWidth === udf && makeVisible();
			arrCB.push(cb);
			run == true && cb({
				offset: makePos()
			});
		}
	}
})(window);