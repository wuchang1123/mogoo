$(function() {
	var $mark = $(".js-mo-mark");
	$mark.click(function(e) {
		e.preventDefault();
		jQuery.getJSON("/api/mo/mark.json", function(json) {
			if (json && json.code == 200) {
				MG.window.showFixed(json.message);
			}
		});
	});
});