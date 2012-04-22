//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/geral/cookie [rev. #1]

Cookie = {
	isSupported: function(){
		return !!navigator.cookieEnabled;
	},
	exists: function(name){
		return document.cookie.indexOf(name + "=") + 1;
	},
	write: function(name, value, expires, path, domain, secure) {
		expires instanceof Date ? expires = expires.toGMTString()
		: typeof(expires) == 'number' && (expires = (new Date(+(new Date) + expires * 1e3)).toGMTString());
		var r = [name + "=" + escape(value)], s, i;
		for(i in s = {expires: expires, path: path, domain: domain})
			s[i] && r.push(i + "=" + s[i]);
		return secure && r.push("secure"), document.cookie = r.join(";"), true;
	},
	read: function(name){
		var c = document.cookie, s = this.exists(name), e;
		return s ? unescape(c.substring(s += name.length, (c.indexOf(";", s) + 1 || c.length + 1) - 1)) : "";
	},
	remove: function(name, path, domain){
		return this.exists(name) && this.write(name, "", new Date(0), path, domain);
	}
};