//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/math/closest-polyline-point [rev. #1]

closestPolyLinePoint = function(px, py, x0, y0, x1, y1, etc, etc, etc){
	function dotLineLength(x, y, x0, y0, x1, y1, o){
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
	for(var args = [].slice.call(arguments, 0), lines = []; args.length > 4; lines[lines.length] = {y1: args.pop(), x1: args.pop(), y0: args.pop(), x0: args.pop()});
	if(!lines.length)
		return {x: px, y: py};
	for(var l, i = lines.length - 1, o = lines[i],
		lower = {i: i, l: dotLineLength(px,	py, o.x0, o.y0, o.x1, o.y1, 1)};
		i--; lower.l > (l = dotLineLength(px, py,
		(o = lines[i]).x0, o.y0, o.x1, o.y1, 1)) && (lower = {i: i, l: l}));
	py < Math.min((o = lines[lower.i]).y0, o.y1) ? py = Math.min(o.y0, o.y1)
		: py > Math.max(o.y0, o.y1) && (py = Math.max(o.y0, o.y1));
	px < Math.min(o.x0, o.x1) ? px = Math.min(o.x0, o.x1)
		: px > Math.max(o.x0, o.x1) && (px = Math.max(o.x0, o.x1));
	Math.abs(o.x0 - o.x1) < Math.abs(o.y0 - o.y1) ?
		px = (py * (o.x0 - o.x1) - o.x0 * o.y1 + o.y0 * o.x1) / (o.y0 - o.y1)
		: py = (px * (o.y0 - o.y1) - o.y0 * o.x1 + o.x0 * o.y1) / (o.x0 - o.x1);
	return {x: px, y: py};
};