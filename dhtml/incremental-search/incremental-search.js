//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/dhtml/incremental-search [rev. #4]

IncrementalSearch = function (input, callback, className) {
	var i, $ = this;
	($.input = input).autocomplete = "off", $.callback = callback || function () { },
	$.className = className || "", $.hide(), $.visible = 0;
	for(i in { keydown: 0, focus: 0, blur: 0, keyup: 0, keypress: 0 })
		addEvent(input, i, $._handler, $);
};
with({ p: IncrementalSearch.prototype }) {
	p.show = function () {
		for(var $ = this, s = document.body.appendChild($.c).style, o = $.input, x = o.offsetLeft,
			y = o.offsetTop + o.offsetHeight; o = o.offsetParent; x += o.offsetLeft, y += o.offsetTop);
		s.left = x + "px", s.top = y + "px",
		$.l.length ? (s.display = "block", !$.visible && ($._callEvent("onshow"), ++$.visible), $.highlite(0)) : s.display = "none";
	};
	p.hide = function () {
		var $ = this, s = ($.c && $.c.parentNode && $.c.parentNode.removeChild($.c),
		$.c = document.createElement("div")).style;
		$.l = [], $.i = -1, $.c.className = $.className, s.position = "absolute", s.display = "none";
		$._old = null, $.visible && ($._callEvent("onhide"), --$.visible);
	};
	p.add = function (s, x, data) {
		var $ = this, l = 0, d = document, i = $.l.length, v = $.input.value.length,
			o = ($.l[i] = [s, data, $.c.appendChild(d.createElement("div"))])[2];
		if(x instanceof Array || (x = [x]), o.i = i, o.className = "normal", !isNaN(x[0]))
			for(var j = -1, k = x.length; ++j < k; o.appendChild(d.createTextNode(
				s.substring(l, x[j]))).parentNode.appendChild(d.createElement(
				"span")).appendChild(d.createTextNode(s.substring(x[j],
				l = x[j] + v))).parentNode.className = "highlited");
		for(x in o.appendChild(d.createTextNode(s.substr(l))), { click: 0, mouseover: 0 })
			addEvent(o, x, $._handler, $);
	};
	p.highlite = function (i) {
		var $ = this;
		$._invalid(i) || ($._invalid($.i) || ($.l[$.i][2].className = "normal"),
		$.l[$.i = i][2].className += " selected", $._callEvent("onhighlite", $.l[i][0], $.l[i][1]));
	};
	p.select = function (i) {
		var $ = this;
		$._invalid(i = isNaN(i) ? $.i : i) || ($._callEvent("onselect",
			$.input.value = $.l[$.i][0], $.l[i][1]), $.hide());
	};
	p.next = function () {
		var $ = ($ = this, $.highlite(($.i + 1) % $.l.length));
	};
	p.previous = function () {
		var $ = ($ = this, $.highlite((!$.i ? $.l.length : $.i) - 1));
	};
	p._fadeOut = function () {
		var f = (f = function () { arguments.callee.x.hide(); }, f.x = this, setTimeout(f, 200));
	};
	p._handler = function (e) {
		var $ = this, t = e.type, k = e.key;
		t == "focus" || t == "keyup" ? k != 40 && k != 38 && k != 13 && $._old != $.input.value && ($.hide(), $.callback($, $.input.value))
		: t == "keydown" ? k == 40 ? $.next() : k == 38 ? $.previous() : $._old = $.input.value
		: t == "keypress" ? k == 13 && (e.preventDefault(), $.select())
		: t == "blur" ? $._fadeOut() : t == "click" ? $.select()
		: $.highlite((/span/i.test((e = e.target).tagName) ? e.parentNode : e).i);
	};
	p._invalid = function (i) {
		return isNaN(i) || i < 0 || i >= this.l.length;
	}
	p._callEvent = function (e) {
		var $ = this;
		return $[e] instanceof Function ? $[e].apply($, [].slice.call(arguments, 1)) : undefined;
	};
}