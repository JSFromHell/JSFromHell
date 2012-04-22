//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/geral/focuser [rev. #2]

focuser = function(o){
	var x, $ = document.body.appendChild(document.createElement("input")), s = $.style,
	h = function(e){(o["on" + e.type] instanceof Function) && o["on" + e.type].call(o, e.key);};
	$.type = "text", s.position = "absolute", s.left = s.top = "-100px";
	o.blur = function(){$.blur();}, addEvent(o, "click", o.focus = function(){$.focus();});
	for(x in {keypress: 0, keydown: 0, keyup: 0, blur: 0, focus: 0}) addEvent($, x, h);
};