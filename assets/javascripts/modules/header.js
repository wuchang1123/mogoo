$(function() {
	var tid,
		ewin = $(window),
		ebody = $("body"),
		eheader = $("#header"),
		enav = $(".navbar", eheader),
		egui = $("#header-guibar"),
		eguiNav = $(".guibar-collapse", egui),
		headerHeight = eheader.height(),
		guiNavHeight = eguiNav.height(),
		ehandle = egui && $(".guibar-handle", egui),
		state = "normal",
		isCollapse = 0;
	
	var point = guiNavHeight;
	
	function stateNormal() {
		if (eheader.hasClass("header-gui-fixed-close")) {
			eheader.removeClass("header-gui-fixed-close");
			eheader.addClass("header-gui-close");
			point = 1;
		} else {
			point = guiNavHeight;
		}
		eheader.removeClass("header-gui-fixed-open");
		eheader.removeClass("header-gui-fixed");
		state = "normal";
	}
	
	function doScroll() {
		var sTop = ewin.scrollTop();
		if (sTop >= point) {
			if (state === "normal") {
				eheader.addClass("header-gui-fixed");
				eheader.hasClass("header-gui-close") && eheader.addClass("header-gui-fixed-close");
				eheader.removeClass("header-gui-open");
				eheader.removeClass("header-gui-close");
				state = "fixed";
			}
		} else {
			state === "fixed" && stateNormal();
		}
	}
	
	eheader && ewin.scroll(doScroll);
	ehandle && ehandle.click(function(e) {
		var sTop = ewin.scrollTop();
		e.preventDefault();
		if (state === "normal") {
			if (eheader.hasClass("header-gui-close")) {
				point = guiNavHeight;
				eheader.removeClass("header-gui-close");
				eheader.addClass("header-gui-open");
			} else {
				point = 1;
				eheader.removeClass("header-gui-open");
				eheader.addClass("header-gui-close");
			}
		} else {
			var ptop = parseInt(eheader.css("padding-top"));
			if (eheader.hasClass("header-gui-fixed-open")) {
				point = guiNavHeight;
				eheader.removeClass("header-gui-fixed-open");
				eheader.addClass("header-gui-fixed-close");
			} else {
				point = 1;
				eheader.removeClass("header-gui-fixed-close");
				eheader.addClass("header-gui-fixed-open");
			}
			window.scrollTo(ewin.scrollLeft(), sTop - ptop + parseInt(eheader.css("padding-top")));
		}
	});
});