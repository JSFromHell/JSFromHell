//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/string/trim [rev. #1]

String.prototype.trim = function(c, t){
	return c = "[" + (c == undefined ? " " : c.replace(/([\^\]\\-])/g, "\\\$1")) + "]+",
	this.replace(new RegExp((t != 2 ? "^" : "") + c + (t != 1 ? "|" + c + "$" : ""), "g"), "");
};