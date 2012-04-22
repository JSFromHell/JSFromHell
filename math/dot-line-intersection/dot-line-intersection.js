//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/math/dot-line-intersection [rev. #1]

dotLineIntersection = function(x, y, x0, y0, x1, y1){
	if(!(x1 - x0))
		return {x: x0, y: y};
	else if(!(y1 - y0))
		return {x: x, y: y0};
	var left, tg = -1 / ((y1 - y0) / (x1 - x0));
	return {x: left = (x1 * (x * tg - y + y0) + x0 * (x * - tg + y - y1)) / (tg * (x1 - x0) + y0 - y1), y: tg * left - tg * x + y};
};