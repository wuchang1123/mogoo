(function(win, udf) {
	var $window = $(win);
	function WaterFall(wrap, option) {
		if (wrap) {
			this._wrap = wrap;
			this._list = $(".js-list", wrap);
			this._blocks = $(".js-block", wrap);
			this._loading = $(".js-loading", wrap);
		}
		this._runId = 0;
		this._offset = {};
		this._instop = false;
		this._inloading = false;
		//console.log(wrap, this._list, this._loading);
		
		this._init(option);
	}
	WaterFall.prototype = {
		_init: function() {
			var host = this,
				wrap = host._wrap,
				list = host._list,
				loading = host._loading,
				//lHeight = loading.outerHeight(),
				lOffset, tid;
			loading && MG.scroll.addWindowListener(function(e) {
				var offset = host._offset = e.offset;
				if (host._instop) return;
				tid && clearTimeout(tid);
				tid = setTimeout(function() {
					lOffset = loading.offset();
					if (e.type == "resize" || !e.type) {
						host._nowIndex = 0;
						host.adjust();
					} else if(e.type) {
						false === host._inloading &&
							offset.top + offset.height >= lOffset.top &&
								host._toload();
					}
				}, 200);
			});
			host.adjust();
		},
		_toload: function() {
			var host = this;
			this._inloading = true;
			//console.log("toload");
			this.toload && this.toload(function(str) {
				var waters = $(str);
				waters.length && host.add(waters);
				host._inloading = false;
			});
		},
		_getBlockWidth: function(fblock) {
			return this._blockWidth = fblock.outerWidth() + parseInt(fblock.css("margin-left") || 0) + parseInt(fblock.css("margin-right") || 0);
		},
		_getBlockHeight: function(fblock) {
			return fblock.outerHeight() + parseInt(fblock.css("margin-top") || 0) + parseInt(fblock.css("margin-bottom") || 0);
		},
		_setBlockPosition: function(fblock) {
			var index = this._minCol,
				heights = this._heights,
				colLen = this._colCount || 0,
				tmpHeight,
				maxHeight = 0,
				indexHeight = heights[index] || 0;
			fblock.css({
				left: index * this._blockWidth + "px",
				top: indexHeight + "px"
			});
			indexHeight = this._heights[index] = indexHeight + this._getBlockHeight(fblock);
			for(var i = 0; i < colLen; i++) {
				tmpHeight = heights[i] || 0;
				//console.log("find", i, tmpHeight, indexHeight);
				if (indexHeight > tmpHeight) {
					indexHeight = tmpHeight;
					index = i;
				}
				maxHeight = tmpHeight > maxHeight ? tmpHeight : maxHeight;
			}
			this._minCol = index;
			this._maxHeight = maxHeight;
			return index;
		},
		adjust: function(isAdd) {
			var host = this,
				isAll = isAdd === udf,
				wrap = host._wrap,
				list = host._list,
				blocks = host._blocks,
				blockLen = blocks && blocks.length || 0,
				tmpIndex = host._nowIndex || 0;
			var oneCompleted, imgsCompleted;
			
			if (!blocks) return;
			host._blockLen = blockLen;
			
			if (isAll) {
				this._runId++;
				this._cols = [];
				this._minCol = 0;
				this._nowIndex = 0;
				this._colCount = 0;
				this._heights = {};
				this._maxHeight = 0;
			}
			
			var listWidth = wrap.width(),
				blockWidth;
			
			blockWidth = host._blockWidth || host._getBlockWidth(blocks.eq(0));
			
			this._colCount = this._colCount || parseInt(listWidth / blockWidth);
			//console.log("this._nowIndex",this._nowIndex);
			
			(function(runId) {
				// 调整位置主要函数
				oneCompleted = function(block) {
					// 运行的 id 已经超时
					if (host._runId !== runId) {
						return;
					}
					host._setBlockPosition(block);
					if (tmpIndex < blockLen) {
						run(++tmpIndex);
					} else {
						host._nowIndex = blockLen;
					}
					(tmpIndex % 4 === 0 || tmpIndex >= blockLen) && list.css("height", host._maxHeight);
					//console.log("oneCompleted", block);
				};
				imgsCompleted = function(block, len, count) {
					len <= count && oneCompleted(block);
				};
			})(this._runId);
			
			function run(index) {
				var block = blocks && blocks.eq(index);
				if (index < host._nowIndex) return;
				block = block && $(block);
				if (block) {
					if (1 == block.attr("data-binded-load")) {
						oneCompleted(block);
					} else {
						var imgs = $("img.js-cover", block),
							imgLen = imgs && imgs.length,
							imgCount = 0;
						if (imgLen) {
							imgs.each(function(index, img) {
								var called = false, tid;
								var ready = function() {
									tid && clearTimeout(tid);
									if (called) return;
									called = true;
									imgCount++;
									block.attr("data-binded-load", 1);
									imgsCompleted(block, imgLen, imgCount);
								};
								// 图片缓存
								if (img.complete || /(complete|loaded)/.test(img.readyState)) {
									ready();
								// 监视图片加载
								} else {
									img && (img.onreadystatechange = ready) &&
											$(img).load(ready).attr("src", img.src);
								}
								// 超时
								tid = setTimeout(function() {
									if (called) return;
									img.style.height = "100px";
									ready();
								}, 20000);
							});
						} else {
							oneCompleted(block);
							block.attr("data-binded-load", 1);
						}
					}
				}
			}
			run(tmpIndex);
		},
		stop: function() {
			this._instop = true;
		},
		add: function(waters) {
			waters.appendTo(this._list);
			this._blocks = $(".js-block", this._wrap);
			this.adjust(true);
		}
	}
	MG.WaterFall = WaterFall;
	
})(window);