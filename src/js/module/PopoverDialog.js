module.exports = (function(){

	var $ = require("jquery");

	var Helper = require('./Helper');

	function PopoverDialog(){
		this.arg = {
			button: '.js-popover-button',
			close_button: '.js-popover-close',
			targetId: '#popover'
		};
		this.page_scrollY = 0;
		this.base_duration = 300;
		this.init();
	}

	PopoverDialog.prototype.init = function(){
		this.open();
		this.close();
		this.render();
	};

	PopoverDialog.prototype.render = function(){
		if ($('#popover-bg').length > 0) {
			return;
		}
		$('body').append('<div id="popover-bg"></div>');
	};

	PopoverDialog.prototype.open = function(){
		var _this = this;
		var scroll_y = 0;


		$(_this.arg.button).on('click', function(event) {
			event.preventDefault();

			_this.page_scrollY = Helper.getScrollY();

			_this.showDialog();
			_this.backgroundLayerControl();

			_this.close();
		});
	};

	PopoverDialog.prototype.close = function(){
		var _this = this;

		$(_this.arg.close_button).on('click', function(event) {
			event.preventDefault();

			_this.closeDialog();
			_this.backgroundLayerControl();
		});
	};


	PopoverDialog.prototype.backgroundLayerControl = function(){
		var _this = this;
		var bg_layer = $('#popover-bg');

		bg_layer.css({ 'display': 'block' });

		setTimeout(function() {
			bg_layer.css({ 'opacity': '1' });
		}, 1);

		setTimeout(function() {
			bg_layer.css({ 'opacity': '0' });
		}, _this.base_duration + 100);

		setTimeout(function() {
			bg_layer.css({ 'display': 'none' });
		}, _this.base_duration * 2 + 101);
	};

	PopoverDialog.prototype.showDialog = function(){
		var _this = this;
		var window_height = Helper.getWindowHeight();


		$(_this.arg.targetId).show();
		$(_this.arg.targetId).css('min-height', window_height);

		setTimeout(function() {
			$(_this.arg.targetId).css('visibility', 'visible');
		}, _this.base_duration);

		setTimeout(function() {
			$(window).scrollTop(0);
			$('#page').css('display', 'none');
		}, _this.base_duration + 101);
	};


	PopoverDialog.prototype.closeDialog = function(){
		var _this = this;

		setTimeout(function() {
			$(_this.arg.targetId).hide();
			$(_this.arg.targetId).css('visibility', 'hidden');
		}, _this.base_duration);

		setTimeout(function() {
			$('#page').css('display', '');
			$(window).scrollTop(_this.page_scrollY);
		}, _this.base_duration + 1);
	};


	return PopoverDialog;
})();