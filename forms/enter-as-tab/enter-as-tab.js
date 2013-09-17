//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/forms/enter-as-tab [rev. #3]

enterAsTab = function(f, a){
	addEvent(f, "keypress", function(e){
		var l, i, f, j, o = e.target;
		if(e.keyValue == 13 && (a || !/textarea|select/i.test(o.type))){
			for(i = l = (f = o.form.elements).length; f[--i] != o;);
			for(j = i; (j = (j + 1) % l) != i && (!f[j].type || f[j].disabled || f[j].readOnly || f[j].type.toLowerCase() == "hidden"););
			e.preventDefault(), j != i && f[j].focus();
		}
	});
};