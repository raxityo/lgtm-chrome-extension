// Copyright (c) 2014 Raxit Majithiya (@realraxit).
var config = {
		shortcut: 10076,
		text: "LGTM. :+1:"
};
var lgtmApp = {
	init: function(){
		chrome.storage.sync.get(config, function(savedConfig) {
			config = savedConfig;
			document.addEventListener('keydown', lgtmApp.keyDownEventListener);
		});
	},
	keyDownEventListener: function(e){
		if(!((e.which >= 48 && e.which <= 57) || (e.which >= 65 && e.which <= 90) || (e.which >= 112 && e.which <= 123) || e.which == 46))
			return;

		var code = (+e.ctrlKey) + '' + (+e.shiftKey) + '' + (+e.altKey) + e.which;
		if(code == config.shortcut){
			var commentForm = document.getElementsByClassName("js-new-comment-form")[0];
			commentForm.getElementsByTagName("textarea")[0].value = config.text;
			commentForm.submit();
		}
	}
};
lgtmApp.init();