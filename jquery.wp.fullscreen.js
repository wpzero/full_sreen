/*
*	write by wp
*
*	2014/5/31 
*   used to fullscreen for all browers(moz\firefox\safari\ipad)
*
*	dependence jquery (noly jquery, not jquery ui)
*/

(function($) {

/* Plugin manager. */
function FullScreen() {
	this._defaults = {
		parent:null
	};
}

$.extend(FullScreen.prototype, {
	
	markerClassName: 'full_screen',

	propertyName: 'full_screen',
	
	currentFullName: 'current_full',
	
	currentNormalName: 'current_normal',

	setDefaults: function(options) {
		$.extend(this._defaults, options || {});
		return this;
	},
	
	_attachFullScreen: function(target, options) {
		// change dom element to jquery dom
		target = $(target);
		if (target.hasClass(this.markerClassName)) {
			return;
		}
		var inst = {options: $.extend(this._defaults,{parent:target.parent(),
			old_position:target.css('position')})};
		// can not init width and height here, because the brower has not calculate this on document load event
		target.addClass(this.markerClassName).addClass(this.currentNormalName).
			data(this.propertyName, inst);
		
		// Add event handlers for the target element if applicable,
		// using namespace this.propertyName
		this._optionFullScreen(target, options);
	},

	_optionFullScreen: function(target, options, value) {
		target = $(target);
		//  change inst,data change
		var inst = target.data(this.propertyName);
		if (!options || (typeof options == 'string' && value == null)) { // Get option
			var name = options;
			options = (inst || {}).options;
			return (options && name ? options[name] : options);
		}

		if (!target.hasClass(this.markerClassName)) {
			return;
		}
		
		// set option
		options = options || {};
		if (typeof options == 'string') {
			var name = options;
			options = {};
			options[name] = value;
		}
		$.extend(inst.options, options);
	},
	// request full screen function "request"
	_requestFullScreen: function(target) {
		// native fire moz safari
		var requestMethod = target.requestFullScreen || target.webkitRequestFullScreen || target.mozRequestFullScreen || target.msRequestFullScreen;
	    if (requestMethod) {
	        requestMethod.call(target);
	    } else if (typeof window.ActiveXObject !== "undefined") { // old IE.
	        var wscript = new ActiveXObject("WScript.Shell");
	        if (wscript !== null) {
	            wscript.SendKeys("{F11}");
	        }
	    }else{ // ipad
			// set old property
			this._optionFullScreen(target,{
			old_left:$(target).css('left'),
			old_right:$(target).css('right'),
			old_top:$(target).css('top'),
			old_bottom:$(target).css('bottom'),
			old_width:$(target).css('width'),
			old_height:$(target).css('height')});
			
			$(target).appendTo(document.body).css({
				'position':'absolute',
				'width':$(document).width(),
				'height':$(document).height(),
				'top':'0px',
				'left':'0px'
			});
		}
		
		// trigger the option callback function
		if($(target).data(this.propertyName).options['request'])
		{
			$(target).data(this.propertyName).options['request']();
		}	
		$(target).removeClass(this.currentNormalName);	
		$(target).addClass(this.currentFullName);
	},
	// cancle funll screen function 'cancel'
	_cancelFullScreen: function(target) {
		// native firefox moz safari
		var cancleFullS = document.exitFullscreen || document.mozCancelFullScreen || document.webkitCancelFullScreen;
		if (cancleFullS) {
		        cancleFullS.call(document);
		    } else if (typeof window.ActiveXObject !== "undefined") { // old IE.
		        var wscript = new ActiveXObject("WScript.Shell");
		        if (wscript !== null) {
		            wscript.SendKeys("{F11}");
		        }
		    }else{//ipad
				$(target).appendTo($(target).data(this.propertyName).options['parent']).css({
					'position':$(target).data(this.propertyName).options['old_position'],
					'width':$(target).data(this.propertyName).options['old_width'],
					'height':$(target).data(this.propertyName).options['old_height'],
					'top':$(target).data(this.propertyName).options['old_top'],
					'left':$(target).data(this.propertyName).options['old_left'],
					'right':$(target).data(this.propertyName).options['old_right'],
					'bottom':$(target).data(this.propertyName).options['old_bottom']
				});
		}
		
		// trigger the option callback function
		if($(target).data(this.propertyName).options['cancle'])
		{
			$(target).data(this.propertyName).options['cancle']();
		}
			
		$(target).removeClass(this.currentFullName);
		$(target).addClass(this.currentNormalName);
	},
	// toggle full screen function. 'toggle'
	_toggleFullScreen: function(target){
		if($(target).hasClass(this.currentFullName))
		{
			var cancleFullS = document.exitFullscreen || document.mozCancelFullScreen || document.webkitCancelFullScreen;
			if (cancleFullS) {
			        cancleFullS.call(document);
			    } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
			        var wscript = new ActiveXObject("WScript.Shell");
			        if (wscript !== null) {
			            wscript.SendKeys("{F11}");
			        }
			    }else{
					$(target).appendTo($(target).data(this.propertyName).options['parent']).css({
						'position':$(target).data(this.propertyName).options['old_position'],
						'width':$(target).data(this.propertyName).options['old_width'],
						'height':$(target).data(this.propertyName).options['old_height'],
						'top':$(target).data(this.propertyName).options['old_top'],
						'left':$(target).data(this.propertyName).options['old_left'],
						'right':$(target).data(this.propertyName).options['old_right'],
						'bottom':$(target).data(this.propertyName).options['old_bottom']
					});
			}
			// trigger the callback option function
			if($(target).data(this.propertyName).options['cancle'])
			{
				$(target).data(this.propertyName).options['cancle']();
			}
			$(target).removeClass(this.currentFullName);
			$(target).addClass(this.currentNormalName);			
		}
		else
		{
			var requestMethod = target.requestFullScreen || target.webkitRequestFullScreen || target.mozRequestFullScreen || target.msRequestFullScreen;
		    if (requestMethod) {
		        requestMethod.call(target);
		    } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
		        var wscript = new ActiveXObject("WScript.Shell");
		        if (wscript !== null) {
		            wscript.SendKeys("{F11}");
		        }
		    }else{
				
				// set old property
				this._optionFullScreen(target,{
				old_left:$(target).css('left'),
				old_right:$(target).css('right'),
				old_top:$(target).css('top'),
				old_bottom:$(target).css('bottom'),
				old_width:$(target).css('width'),
				old_height:$(target).css('height')});
				
				$(target).appendTo(document.body).css({
					'position':'absolute',
					'width':$(document).width(),
					'height':$(document).height(),
					'top':'0px',
					'left':'0px'
				});
			}
			// trigger the callback option function
			if($(target).data(this.propertyName).options['request'])
			{
				$(target).data(this.propertyName).options['request']();
			}
			$(target).removeClass(this.currentNormalName);	
			$(target).addClass(this.currentFullName);
		}
	},
	_isFullFullScreen: function(target) {
		return $(target).hasClass(this.currentFullName)?true:false;
	},
	_enableFullScreen: function(target) {
		target = $(target);
		if (!target.hasClass(this.markerClassName)) {
			return;
		}
		target.prop('disabled', false).removeClass(this.propertyName + '-disabled');
		var inst = target.data(this.propertyName);
	},
	_disableFullScreen: function(target) {
		target = $(target);
		if (!target.hasClass(this.markerClassName)) {
			return;
		}
		target.prop('disabled', true).addClass(this.propertyName + '-disabled');
		var inst = target.data(this.propertyName);
	},
	_destroyFullScreen: function(target) {
		target = $(target);
		if (!target.hasClass(this.markerClassName)) {
			return;
		}
		var inst = target.data(this.propertyName);
		target.removeClass(this.markerClassName).
			removeData(this.propertyName).
			unbind('.' + this.propertyName);
	}
});

var getters = [];

// check if the out call is get. If is, is not chained
function isNotChained(method, otherArgs) {
	if (method == 'option' && (otherArgs.length == 0 ||
			(otherArgs.length == 1 && typeof otherArgs[0] == 'string'))) {
		return true;
	}
	return $.inArray(method, getters) > -1;
}

// $.fn. is the plugin bridge to the outworld.
$.fn.full_screen = function(options) {//this is an array all selected Doc elements
	// slice from 1 to the last.(arguments the js function passed all params)
	var otherArgs = Array.prototype.slice.call(arguments, 1);
	
	// this is not chained, return the options or option
	if (isNotChained(options, otherArgs)) {
		return fullscreen['_' + options + 'FullScreen'].apply(fullscreen, [this[0]].concat(otherArgs));
	}
	
	return this.each(function() {
		if (typeof options == 'string') {
			if (!fullscreen['_' + options + 'FullScreen']) {
				throw 'Unknown method: ' + options;
			}
			// call function
			fullscreen['_' + options + 'FullScreen'].apply(fullscreen, [this].concat(otherArgs));
		}
		else {
			// initial
			fullscreen._attachFullScreen(this, options || {});
		}
	});
};

// init a singleton instance
var fullscreen = $.fullscreen = new FullScreen();

$.hideWpMenu=function(){
	$('ul.wp-menu').hide();
};

})(jQuery);
