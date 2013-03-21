$(function() {
	var tid,
		ewin = $(window),
		eheader = $("#header"),
		enav = $(".navbar", eheader),
		egui = $("#header-guibar"),
		eguiNav = $(".guibar-collapse", egui),
		eIconsNews = $(".icon-news", enav),
		headerHeight = eheader.height(),
		guiNavHeight = eguiNav.height(),
		ehandle = egui && $(".guibar-handle", egui),
		state = "normal",
		isCollapse = 0;
	
	var point = guiNavHeight;
	
	ewin.on("resize", function() {
		guiNavHeight = eguiNav.height();
		point === 1 && (point = guiNavHeight);
	});
	
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
	ehandle && $("a", ehandle).click(function(e) {
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
	
	if (eIconsNews) {
		var durationTime = 120,
			timeMax = 1000,
			timeMin = 100,
			timeSpace = timeMin;
		var op1 = function() {
			eIconsNews.animate({opacity: 1}, durationTime, function() {
				timeSpace = timeSpace === timeMax ? timeMin : timeMax;
				setTimeout(op0, timeSpace);
			});
		};
		var op0 = function() {
			eIconsNews.animate({opacity: 0}, durationTime, function() {
				setTimeout(op1, timeMin);
			});
		};
		var getUnRead = function() {
			jQuery.getJSON("/api/mos/news-unread.json", function(data) {
				if (data && data.total) {
					eIconsNews.removeClass("invisible");
					op0();
				} else {
					getUnRead();
				}
			});
		};
		setTimeout(getUnRead, 2000);
	}
});