//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/geral/equals [rev. #1]

equals = function(a, b){
	for(var j, o = arguments, i = o.length, c = a instanceof Object; --i;)
		if(a === (b = o[i]))
			continue;
		else if(!c || !(b instanceof Object))
			return false;
		else for(j in b)
			if(!equals(a[j], b[j]))
				return false;
	return true;
};