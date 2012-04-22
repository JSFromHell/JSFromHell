//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/string/wordwrap [rev. #2]

String.prototype.wordWrap = function(m, b, c){
	var i, j, l, s, r;
	if(m < 1)
		return this;
	for(i = -1, l = (r = this.split("\n")).length; ++i < l; r[i] += s)
		for(s = r[i], r[i] = ""; s.length > m; r[i] += s.slice(0, j) + ((s = s.slice(j)).length ? b : ""))
			j = c == 2 || (j = s.slice(0, m + 1).match(/\S*(\s)?$/))[1] ? m : j.input.length - j[0].length
			|| c == 1 && m || j.input.length + (j = s.slice(m).match(/^\S*/)).input.length;
	return r.join("\n");
};