//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/math/closest-circle-point [rev. #1]

closestCirclePoint = function(px, py, x, y, ray){
	var tg = (x += ray, y += ray, 0);
	return function(x, y, x0, y0){return Math.sqrt((x -= x0) * x + (y -= y0) * y);}(px, py, x, y) > ray ?
		{x: Math.cos(tg = Math.atan2(py - y, px - x)) * ray + x, y: Math.sin(tg) * ray + y}
		//{x: (px - x) / (length / ray) + x, y: (py - y) / (length / ray) + y}
		: {x: px, y: py};
};