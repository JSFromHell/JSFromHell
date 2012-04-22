//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/string/capitalize [rev. #2]

String.prototype.capitalize = function(){
	return this.replace(/\S+/g, function(a){
		return a.charAt(0).toUpperCase() + a.slice(1).toLowerCase();
	});
};