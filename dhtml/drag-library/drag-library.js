//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/dhtml/drag-library [rev. #2]

Dragger = function(o, a){
	var $ = this;
	o.style.position = "absolute", $.object = o, $.d = {x: 0, y: 0}, $.f = [];
	a && (addEvent(o, "mousedown", function(){return this.start(), false;}, $),
		addEvent(document, "mouseup", function(){this.dragging && this.stop();}, $));
}
with({p: Dragger.prototype, c: Dragger}){
	p._updateMouse = function(e){
		var w = window, b = document.body;
		p.mouse = {x: e.clientX + (w.scrollX || b.scrollLeft || b.parentNode.scrollLeft || 0),
			y: e.clientY + (w.scrollY || b.scrollTop || b.parentNode.scrollTop || 0)};
	};
	addEvent(document, "mousemove", p._updateMouse);
	p.mouse = {x: 0, y: 0};
	p.dragging = false;
	p.start = function(center){
		var r, $ = this, m = $.mouse, o = $.object;
		for(var r = {l: o.offsetLeft, t: o.offsetTop, w: o.offsetWidth, h: o.offsetHeight};
			o = o.offsetParent; r.l += o.offsetLeft, r.t += o.offsetTop);
		!$.dragging && ($.dragging = true, o = $.object, $.d = center &&
			(m.x < r.l || m.x > r.l + r.w || m.y < r.t || m.y > r.t + r.h) ?
			{x: r.w / 2, y: r.h / 2} : {x: m.x - o.offsetLeft, y: m.y - o.offsetTop},
			addEvent(document, "mousemove", $.drag, $),
			this.callEvent("onstart"));
	};
	p.drag = function(e){
		var i, p, $ = this, o = $.object, m = ($._updateMouse(e), (m = $.mouse).x -= $.d.x, m.y -= $.d.y, m);
		for(i = $.f.length; i; $.f[--i] && $.f[i][0].apply(m, $.f[i][1]));
		o.style.left = m.x + "px", o.style.top = m.y + "px";
		return !!this.callEvent("ondrag", e);
	};
	p.stop = function(){
		this.dragging = false;
		removeEvent(document, "mousemove", this.drag, this);
		this.callEvent("onstop");
	};
	p.addFilter = function(f, arg0, arg1, arg2, argN){
		this.f[this.f.length] = [f, [].slice.call(arguments, 1)];
	};
	p.callEvent = function(e){
		return this[e] instanceof Function ? this[e].apply(this, [].slice.call(arguments, 1)) : undefined;
	};
}