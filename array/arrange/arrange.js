//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/array/arrange [rev. #1]

arrange = function(v, n, m){
	for(var j, k, i = -1, l = v.length, q = Math.pow(l, n), r = new Array(q), c = (new Array(n + 1)).join(0).split(""); ++i < q;)
		for(r[i] = new Array(j = n), k = 1; j--; r[i][j] = m ? c[j] : v[c[j]], k && (++c[j] != l && --k, c[j] %= l));
	return r;
};