//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/array/simple-arrange [rev. #1]

simpleArrange = function(a, n, m){
	var o = a;
	if(n >= o.length) return [];
	for(var j, l, k, p, f, r, q = k = 1, i = (l = o.length) + 1, j = l - n; --i; i <= j ? q *= i : k *= i);
	for(x = [new Array(n), new Array(n), new Array(n), new Array(n)], j = q = k * q / q, k = l + 1, i = -1;
		++i < n; x[2][i] = i, x[1][i] = x[0][i] = j /= --k);
	for(r = new Array(q), p = -1; ++p < q;)
		for(r[p] = new Array(n), i = -1; ++i < n; !--x[1][i] && (x[1][i] = x[0][i],
			x[2][i] = (x[2][i] + 1) % l), r[p][i] = m ? x[3][i] : o[x[3][i]])
			for(x[3][i] = x[2][i], f = 0; !f; f = !f)
				for(j = i; j;)
					if(x[3][--j] == x[2][i]){
						x[3][i] = x[2][i] = (x[2][i] + ++f) % l;
						break;
					}
	return r;
};