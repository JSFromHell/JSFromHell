//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/dhtml/tooltip [rev. #2]

ToolTip = function(o, t, c, f){
	var i, $ = this;
	$.s = ($.o = document.createElement("div")).style;
	$.s.display = "none", $.s.position = "absolute", $.o.className = c, $.t = t, $.f = f;
	for(i in {mouseout: 0, mouseover: 0, mousemove: 0})
		addEvent(o, i, function(e){$[e.type](e);});
};
with({p: ToolTip.prototype}){
	p.update = function(e){
		var w = window, b = document.body;
		this.s.top = e.clientY + (w.scrollY || b.scrollTop || b.parentNode.scrollTop || 0) + "px",
		this.s.left = e.clientX + (w.scrollX || b.scrollLeft || b.parentNode.scrollLeft || 0) + "px";
	}
	p.mouseout = function(){
		this.s.display = "none";
	};
	p.mouseover = function(e){
		document.body.appendChild(this.o).innerHTML = this.t,
		e.stopPropagation(), this.update(e), this.s.display = "block";
	};
	p.mousemove = function(e){
		this.f && this.update(e);
	};
	p.setContent = function(s){
		this.o.innerHTML = this.t = s;
	};
}