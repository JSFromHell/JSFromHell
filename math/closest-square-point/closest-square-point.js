//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/math/closest-square-point [rev. #1]

closestSquarePoint = function(px, py, x, y, w, h){
	return {x: px < x ? x : px > x + w ? x + w : px, y: py < y ? y : py > y + h ? y + h : py};
};