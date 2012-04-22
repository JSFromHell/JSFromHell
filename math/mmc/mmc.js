//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/math/mmc [rev. #1]

mmc = function(o){
	for(var i, j, n, d, r = 1; (n = o.pop()) != undefined;)
		while(n > 1){
			if(n % 2){
				for (i = 3, j = Math.floor(Math.sqrt(n)); i <= j && n % i; i += 2);
				d = i <= j ? i : n;
			}
			else
				d = 2;
			for(n /= d, r *= d, i = o.length; i; !(o[--i] % d) && (o[i] /= d) == 1 && o.splice(i, 1));
		}
	return r;
};