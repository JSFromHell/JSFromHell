//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/math/line-length [rev. #1]

lineLength = function(x, y, x0, y0){
	return Math.sqrt((x -= x0) * x + (y -= y0) * y);
};