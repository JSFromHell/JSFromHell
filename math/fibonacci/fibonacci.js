//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/math/fibonacci [rev. #1]

fibonacci = function(n){ //v1.0
	return Math.round(Math.pow((Math.sqrt(5) + 1) / 2, Math.abs(n)) / Math.sqrt(5)) * (n < 0 && n % 2 ? -1 : 1);
};

/*
Version with fewer recursions
fibonacci = function(n){
	var o;
	return n < 2 ? n : n % 2 ? (o = fibonacci(n = -(-n >> 1))) * o + (o = fibonacci(n - 1)) * o : (fibonacci(n >>= 1) + 2 * fibonacci(n - 1)) * fibonacci(n);
};
*/