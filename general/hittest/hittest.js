//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/geral/hittest [rev. #2]

hitTest = function(o, l){
	function getOffset(o){
		for(var r = {l: o.offsetLeft, t: o.offsetTop, r: o.offsetWidth, b: o.offsetHeight};
			o = o.offsetParent; r.l += o.offsetLeft, r.t += o.offsetTop);
		return r.r += r.l, r.b += r.t, r;
	}
	var a = arguments, j = a.length;
	j > 2 && (o = {offsetLeft: o, offsetTop: l, offsetWidth: j == 5 ? a[2] : 0,
	offsetHeight: j == 5 ? a[3] : 0, offsetParent: null}, l = a[j - 1]);
	for(var b, s, r = [], a = getOffset(o), j = isNaN(l.length), i = (j ? l = [l] : l).length; i;
		b = getOffset(l[--i]), (a.l == b.l || (a.l > b.l ? a.l <= b.r : b.l <= a.r))
		&& (a.t == b.t || (a.t > b.t ? a.t <= b.b : b.t <= a.b)) && (r[r.length] = l[i]));
	return j ? !!r.length : r;
};