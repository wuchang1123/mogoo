(function(win, udf) {
	var $window = $(win);
	
	function onEachImageLoad(imgs, runFn, callback) {
		imgs.each(function(index, img) {
			if ((img.loaded || img.complete) && !/blank\.gif$/.test(img.src)) {
				callback(img);
			} else {
				img.onload = function() {
					this.onload = null;
					this.loaded = true;
					callback(img);
				};
			}
			runFn && runFn(img);
		});
	}
	
	
	function WaterFall(wrap, option) {
		if (wrap) {
			this._wrap = wrap;
			this._list = $(".js-list", wrap);
			this._blocks = $(".js-block", wrap);
			this._loading = $(".js-loading", wrap);
		}
		this._runId = 0;
		this._offset = {};
		this._lastOffset = {};
		this._instop = false;
		this._inloading = true;
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
			});
		},
		_getBlockWidth: function(fblock) {
			return this._blockWidth = fblock.outerWidth() + parseInt(fblock.css("margin-left") || 0) + parseInt(fblock.css("margin-right") || 0);
		},
		_getBlockHeight: function(fblock) {
			return fblock.outerHeight() + parseInt(fblock.css("margin-top") || 0) + parseInt(fblock.css("margin-bottom") || 0);
		},
		_setBlockPosition: function(fblock, isNoEnd) {
			var index = this._minCol,
				heights = this._heights,
				colLen = this._colCount || 0,
				tmpHeight,
				maxHeight = 0,
				indexHeight = heights[index] || 0;
			var newOffset = {
				left: index * this._blockWidth + "px",
				top: indexHeight + "px"
			};
			(!isNoEnd || this._lastOffset == udf) && (this._lastOffset = newOffset);
			//this._lastOffset && fblock.css(this._lastOffset);
			//console.log(isNoEnd, this._lastOffset);
			fblock.hasClass("invisible") && fblock.removeClass("invisible");
			fblock.css(newOffset);
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
			
			var listWidth = list.width(),
				blockWidth;
			
			blockWidth = host._blockWidth || host._getBlockWidth(blocks.eq(0));
			
			this._colCount = this._colCount || parseInt(listWidth / blockWidth);
			//console.log("this._nowIndex",this._nowIndex);
			//alert([listWidth, this._colCount, blockWidth].join("--"));
			
			(function(runId) {
				// 调整位置主要函数
				oneCompleted = function(block) {
					// 运行的 id 已经超时
					if (host._runId !== runId) {
						return;
					}
					host._setBlockPosition(block, tmpIndex < blockLen);
					if (tmpIndex < blockLen) {
						run(++tmpIndex);
					} else {
						host._inloading = false;
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
					if (block.attr("data-binded-load")) {
						oneCompleted(block);
					} else {
						var imgs = $("img.js-cover", block),
							imgLen = imgs && imgs.length,
							imgCount = 0;
						if (imgLen) {
							var called = false, tid;
							var ready = function(img) {
								tid && clearTimeout(tid);
								if (called) return;
								called = true;
								img && imgCount++;
								//console.log("ready",called, img, imgLen, imgCount);
								block.attr("data-binded-load", 1);
								imgsCompleted(block, imgLen, imgCount);
							};
							onEachImageLoad(imgs, function(img) {
								var eimg = $(img);
								eimg.attr("src", eimg.attr("data-src") || img.src);
							}, ready);
							// 超时
							tid = setTimeout(function() {
								if (called) return;
								imgs.css("height", "180px");
								imgCount = imgLen;
								ready();
							}, 3000 * imgLen);
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