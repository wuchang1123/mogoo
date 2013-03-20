$(function() {
	var $totop = $("#backToTop"),
		$win = $("html,body"),
		$window = $(window),
		state = 0;
	
	$totop.click(function(e) {
		e.preventDefault();
		$win.animate({"scrollTop": 0}, 120);
	});
	
	$window.scroll(function() {
		var sTop = $window.scrollTop(),
			vHeight = MG.getVisibleAreaHeight();
		if (sTop < vHeight / 2) {
			state !== 0 && $totop.addClass("invisible") && (state = 0);
		} else {
			state !== 1 && $totop.removeClass("invisible") && (state = 1);
		}
	});
});