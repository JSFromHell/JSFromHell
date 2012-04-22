//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/string/rot13 [rev. #1]

String.prototype.rot13 = function(){
	return this.replace(/[a-zA-Z]/g, function(c){
		return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
	});
};