# full_sreen
this is jquery plugin used for fullscreen dom element.

## Installation
note: this plugin is dependent on jquery.

## Usage
such as:
```
$(function(){
	$('#screen_div').full_screen({cancle:function(){
		notify('退出全屏!');
		$('#screen_toggle').attr('src','/images/qp.png');
	},
	request:function(){
		notify('进入全屏盘库!');
		$('#screen_toggle').attr('src','/images/ck.png');
	}
	});//init full screen
	
	$('#screen_toggle').click(function(){
		$('#screen_div').full_screen('toggle');
	});
});
```

## API
* ``$('#screen_div').full_screen(options);``  init
	and the options includes cancle request, such as

 *``$('#screen_div').full_screen('toggle')`` toggle fullscreen state
 *``$('#screen_div').full_screen('request')`` fullscreen state
 *``$('#screen_div').full_screen('cancle')`` cancel fullscreen, note this keyword is 'cancel' , this is my misspell.

