//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/classes/overloader [rev. #2]

Overloader = function(){
	var f = function(args){
		var i, l, h = "", empty = {};
		for(i = -1, l = (args = [].slice.call(arguments)).length; ++i < l;)
			args[i] !== undefined && args[i] !== null ? h += args[i].constructor : empty[i] = 1;
		if(!(h = f._methods[h])){
			var x, j, k, m = -1;
			for(i in f._methods){
				for(k = 0, j = -1, l = Math.max(args.length, x = f._methods[i][1]); ++j < l;
					!empty[j] && (args[j] instanceof x[j] || args[j].constructor == x[j]) && ++k);
				k > m && (h = f._methods[i], m = k);
			}
		}
		return h ? h[0].apply(f, args) : undefined;
	};
	f._methods = {};
	f.overload = function(f, args){
		this._methods[(args = [].slice.call(arguments, 1)).join("")] = [f, args];
	};
	f.unoverload = function(args){
		return delete this._methods[[].slice.call(arguments).join("")];
	};
	return f;
};