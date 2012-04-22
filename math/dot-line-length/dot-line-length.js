//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/math/dot-line-length [rev. #1]

dotLineLength = function(x, y, x0, y0, x1, y1, o){
	function lineLength(x, y, x0, y0){
		return Math.sqrt((x -= x0) * x + (y -= y0) * y);
	}
	if(o && !(o = function(x, y, x0, y0, x1, y1){
		if(!(x1 - x0)) return {x: x0, y: y};
		else if(!(y1 - y0)) return {x: x, y: y0};
		var left, tg = -1 / ((y1 - y0) / (x1 - x0));
		return {x: left = (x1 * (x * tg - y + y0) + x0 * (x * - tg + y - y1)) / (tg * (x1 - x0) + y0 - y1), y: tg * left - tg * x + y};
	}(x, y, x0, y0, x1, y1), o.x >= Math.min(x0, x1) && o.x <= Math.max(x0, x1) && o.y >= Math.min(y0, y1) && o.y <= Math.max(y0, y1))){
		var l1 = lineLength(x, y, x0, y0), l2 = lineLength(x, y, x1, y1);
		return l1 > l2 ? l2 : l1;
	}
	else {
		var a = y0 - y1, b = x1 - x0, c = x0 * y1 - y0 * x1;
		return Math.abs(a * x + b * y + c) / Math.sqrt(a * a + b * b);
	}
};