(function(win, udf) {
	var $fixed,
		fixedTid;
	var W = {
		showFixed: function(tips) {
			var $tips;
			$fixed = $fixed || $("#window-fixed-top").css({"opacity": 0});
			if (!$fixed.length) return;
			$tips = $(".window-text", $fixed);
			$tips.length && $tips.html(tips) && $fixed.removeClass("invisible").animate({"opacity": 1}, 400);
			fixedTid && clearTimeout(fixedTid);
			fixedTid = setTimeout(function() {
				$fixed.animate({"opacity": 0}, 600, function() {
					$fixed.addClass("invisible");
				});
			}, 3000);
		}
	};
	
	MG.window = W;
})(window);