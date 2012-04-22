//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/dhtml/resizer [rev. #1]

Resizer = function(o){
	var $ = (($ = this).o = o, $.f = [], $),
		getHandler = function getHandler(h, v){return function(e){$.h = h, $.v = v, $.begin(e);};}
	for(var j, e, x, y, i = 3, k = -1, d = $.d = new Array(8); i;)
		for(j = (--i, 3); j; (--j != 1 || i != 1) && (d[++k] = [i, j, "",
			e = document.body.appendChild(document.createElement("div"))]),
			addEvent(e, "mousedown", getHandler(d[k][0], d[k][1])),
			e.style.position = "absolute", e.style.display = "none"
		);
}
with({p: Resizer.prototype}){
	p.h = 0, p.v = 0, p.pd = {x: 0, y: 0}, p.po = {x: 0, y: 0, h: 0, w: 0}, p.av = false;
	p.getMouse = function(e){
		var w = window, b = document.body;
		return {x: e.clientX + (w.scrollX || b.scrollLeft || b.parentNode.scrollLeft || 0),
			y: e.clientY + (w.scrollY || b.scrollTop || b.parentNode.scrollTop || 0)};
	};
	p.getOffset = function(o, s){
		for(var r = {x: o.offsetLeft, y: o.offsetTop, h: o.offsetHeight, w: o.offsetWidth};
			(o = o.offsetParent) && (!s || !/relative/i.test(o.style.position));
			r.x += o.offsetLeft, r.y += o.offsetTop);
		return r;
	};
	p.update = function(){
		var i, x, s, $ = this, d = $.d, o = $.getOffset($.o);
		for(i = d.length; i; x = d[--i], s = x[3].style, s.left = o.x + o.w * x[0] / 2 + "px",
			s.top = o.y + o.h * x[1] / 2 + "px");
	};
	p.showAnchors = function(s){
		var i, x, $ = this, d = $.d, o = $.getOffset($.o), m = ["none", "block"];
		for($.av = !!s, i = d.length; i; x = d[--i], x[3].style.display = m[+$.av]);
		$.update();
	};
	p.setAnchorClass = function(c){
		var i, d = this.d, map = {se: 0, e: 1, ne: 2, n: 3, s: 4, nw: 5, w: 6, sw: 7};
		if(typeof c == "string")
			for(i = d.length; i; d[--i][3].className = c);
		else
			for(i in c) d[map[i.toLowerCase()]][3].className = c[i];
	};
	p.addFilter = function(f){
		this.f[this.f.length] = f;
	},
	p.begin = function(e){
		var $ = this, p = $.getMouse(e);
		$.po = $.getOffset($.o, 1);
		$.pd = {x: $.po.x - p.x, y: $.po.y - p.y};
		addEvent(document, "mousemove", $.drag, $);
		addEvent(document, "mouseup", $.end, $);
		$.callEvent("onstart", e);
	};
	p.end = function(e){
		var $ = this;
		removeEvent(document, "mousemove", $.drag, $);
		removeEvent(document, "mouseup", $.end, $);
		$.callEvent("onend", e);
	};
	p.drag = function(e){
		var f, i, $ = this, p = $.getMouse(e), o = $.getOffset($.o), z = {x: 0, y: 0, w: 0, h: 0}, s = $.o.style;
		$.h != 1 ? (z.x = $.h ? $.po.x : p.x + $.pd.x, z.w = $.po.w + (p.x - $.po.x + $.pd.x) * ($.h - 1)) : (z.x = $.po.x, z.w = $.po.w);
		$.v != 1 ? (z.y = $.v ? $.po.y : p.y + $.pd.y, z.h = $.po.h + (p.y - $.po.y + $.pd.y) * ($.v - 1)) : (z.y = $.po.y, z.h = $.po.h);
		z.h < 0 && (z.y -= z.h = -z.h, $.v ^= 2, $.po.y += $.po.h, $.pd.y -= $.po.h *= -1);
		z.w < 0 && (z.x -= z.w = -z.w, $.h ^= 2, $.po.x += $.po.w, $.pd.x -= $.po.w *= -1);
		for(f = $.f, i = f.length; i; f[--i] && f[i].call(z, e, $));
		s.top = z.y + "px", s.left = z.x + "px", s.height = z.h + "px", s.width = z.w + "px";
		$.update();
		$.callEvent("onresize", e);
	};
	p.callEvent = function(e){
		return this[e] instanceof Function ? this[e].apply(this, [].slice.call(arguments, 1)) : undefined;
	};
}