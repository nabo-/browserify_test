module.exports = (function(){

	var $ = require("jquery");
	
	function Helper(){
	}

	Helper.getScrollY = function(){
		var scroll_y = $(window).scrollTop();
		return scroll_y;
	};

	Helper.getWindowHeight = function(){
		var window_height = $(window).innerHeight();
		return window_height;
	};


	return Helper;
})();