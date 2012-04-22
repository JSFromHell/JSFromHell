//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/math/closest-line-point [rev. #1]

closestLinePoint = function(px, py, x, y, angle){
	var tg = ((angle %= 360) < 0 && (angle += 180), Math.tan(-angle * Math.PI / 180));
	return angle < 45 || angle > 135 ? {x: px, y: (px - x) * tg + y} : {x: (py - y) / tg + x, y: py};
};