(function(win) {
	var MG = {
		domain: "http://localhost:2000"
	};
	
	
	function addSurportJs() {
		var docElement = document.documentElement;
		docElement.className = docElement.className.replace(/no\-js/, 'surport-js');
	}
	
	// domready
	$(function(){
		addSurportJs();
	});
	
	win.MG = MG;
})(window);