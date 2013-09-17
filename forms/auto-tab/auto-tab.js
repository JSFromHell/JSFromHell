//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/forms/auto-tab [rev. #4]

autoTab = function(f){
	var c = 0;
	addEvent(f, "keyup", function(e){
		var i, j, f = (e = e.target).form.elements, l = e.value.length, m = e.maxLength;
		if(c && m > -1 && l >= m){
			for(i = l = f.length; f[--i] != e;);
			for(j = i; (j = (j + 1) % l) != i && (!f[j].type || f[j].disabled || f[j].readOnly || f[j].type.toLowerCase() == "hidden"););
			j != i && f[j].focus();
		}
	});
	addEvent(f, "keypress", function(e){c = e.keyValue;});
};