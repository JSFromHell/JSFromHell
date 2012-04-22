//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/math/bezier [rev. #1]

function Bezier(p0, p1, c0, c1){
	var o = this;
	o.x0 = p0.x, o.y0 = p0.y, o.x1 = p1.x, o.y1 = p1.y, o.cx0 = c0.x, o.cy0 = c0.y, o.cx1 = c1.x, o.cy1 = c1.y;
};
with({$: Bezier, o: Bezier.prototype}){
	$.point = function(x, y){
		return {x: x, y: y};
	};
	o.getCoordinates = function(t){
		var i = 1 - t, x = t * t, y = i * i, a = x * t, b = 3 * x * i, c = 3 * t * y, d = y * i, o = this;
		return Bezier.point(a * o.x0 + b * o.cx0 + c * o.cx1 + d * o.x1, a * o.y0 + b * o.cy0 + c * o.cy1 + d * o.y1);
	};
	o.plot = function(c){
		var r, x = (x = this.x0 - this.x1) * x, y = (y = this.y0 - this.y1) * y, l = l = Math.ceil(Math.sqrt(x + y)), i = l + 1;
		while(c(this.getCoordinates(r = --i / l), r), i);
	};
}