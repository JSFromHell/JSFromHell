//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/array/permute [rev. #1]

permute = function(v, m){
	for(var p = -1, j, k, f, r, l = v.length, q = 1, i = l + 1; --i; q *= i);
	for(x = [new Array(l), new Array(l), new Array(l), new Array(l)], j = q, k = l + 1, i = -1;
		++i < l; x[2][i] = i, x[1][i] = x[0][i] = j /= --k);
	for(r = new Array(q); ++p < q;)
		for(r[p] = new Array(l), i = -1; ++i < l; !--x[1][i] && (x[1][i] = x[0][i],
			x[2][i] = (x[2][i] + 1) % l), r[p][i] = m ? x[3][i] : v[x[3][i]])
			for(x[3][i] = x[2][i], f = 0; !f; f = !f)
				for(j = i; j; x[3][--j] == x[2][i] && (x[3][i] = x[2][i] = (x[2][i] + 1) % l, f = 1));
	return r;
};