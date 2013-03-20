(function(win, udf) {
	var fixBody = document.compatMode == "CSS1Compat" ? document.documentElement : document.body;

	var MG = {
		domain: "http://localhost:2000",
		
		getVisibleAreaWidth: function() {
			return win.innerWidth || fixBody.clientWidth;
		},
		
		getVisibleAreaHeight: function() {
			return win.innerHeight || fixBody.clientHeight;
		},
		
		getTemplate: function(path, cb) {
			var tpl = VTPL[path];
			if (tpl) {
				cb(tpl);
			} else {
				path && cb && MG.cachedScript("/assets/js/templates/" + path + ".js")
				.done(function() {
					var asts = VTPL[path];
					tpl = VTPL[path] = asts && new Velocity(asts);
					//console.log(tpl);
					tpl && cb(tpl);
				});
			}
		},
		
		renderTemplate: function(tplPath, jsonPath, data, cb) {
			var tmpTpl, tmpJson, read = 0;
			if (cb === udf) {
				cb = data;
				data = null;
			}
			function readAll() {
				read > 1 && cb(tmpTpl.render(tmpJson, VTPL.__macros), {
					tpl: tmpTpl,
					json: tmpJson
				});
			}
			
			MG.getTemplate(tplPath, function(tpl) {
				tmpTpl = tpl;
				read++;
				readAll();
			});
			jQuery.getJSON(jsonPath, data, function(json) {
				tmpJson = json;
				read++;
				readAll();
			});
		},
		cachedScript: function(url, options) {
			options = $.extend(options || {}, {
				dataType: "script",
				cache: true,
				url: url
			});
			return jQuery.ajax(options);
		}

	};
	
	win.MG = MG;
	
	function addSurportJs() {
		var docElement = $("html");
		docElement && docElement.removeClass("no-js").addClass("surport-js");
	}
	// domready
	$(function(){
		addSurportJs();
	});
})(window);