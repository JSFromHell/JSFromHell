//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/geral/is-date [rev. #1]

isDate = function(y, m, d){
		if(typeof y == "string" && m instanceof RegExp && d){
			if(!m.test(y)) return 1;
			y = RegExp["$" + d.y], m = RegExp["$" + d.m], d = RegExp["$" + d.d];
		}
		d = Math.abs(d) || 0, m = Math.abs(m) || 0, y = Math.abs(y) || 0;
		return arguments.length != 3 ? 1 : d < 1 || d > 31 ? 2 : m < 1 || m > 12 ? 3 : /4|6|9|11/.test(m) && d == 31 ? 4
		: m == 2 && (d > ((y = !(y % 4) && (y % 1e2) || !(y % 4e2)) ? 29 : 28)) ? 5 + !!y : 0;
};

/*
Simple way, but without warnings
isDate = function(y, m, d){
	var o = new Date(y, --m, d);
	return o.getFullYear() == y && o.getMonth() == m && o.getDate() == d;
}
*/