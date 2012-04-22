//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/forms/selection [rev. #1]

Selection = function(input){
	this.isTA = (this.input = input).nodeName.toLowerCase() == "textarea";
};
with({o: Selection.prototype}){
	o.setCaret = function(start, end){
		var o = this.input;
		if(Selection.isStandard)
			o.setSelectionRange(start, end);
		else if(Selection.isSupported){
			var t = this.input.createTextRange();
			end -= start + o.value.slice(start + 1, end).split("\n").length - 1;
			start -= o.value.slice(0, start).split("\n").length - 1;
			t.move("character", start), t.moveEnd("character", end), t.select();
		}
	};
	o.getCaret = function(){
		var o = this.input, d = document;
		if(Selection.isStandard)
			return {start: o.selectionStart, end: o.selectionEnd};
		else if(Selection.isSupported){
			var s = (this.input.focus(), d.selection.createRange()), r, start, end, value;
			if(s.parentElement() != o)
				return {start: 0, end: 0};
			if(this.isTA ? (r = s.duplicate()).moveToElementText(o) : r = o.createTextRange(), !this.isTA)
				return r.setEndPoint("EndToStart", s), {start: r.text.length, end: r.text.length + s.text.length};
			for(var $ = "[###]"; (value = o.value).indexOf($) + 1; $ += $);
			r.setEndPoint("StartToEnd", s), r.text = $ + r.text, end = o.value.indexOf($);
			s.text = $, start = o.value.indexOf($);
			if(d.execCommand && d.queryCommandSupported("Undo"))
				for(r = 3; --r; d.execCommand("Undo"));
			return o.value = value, this.setCaret(start, end), {start: start, end: end};
		}
		return {start: 0, end: 0};
	};
	o.getText = function(){
		var o = this.getCaret();
		return this.input.value.slice(o.start, o.end);
	};
	o.setText = function(text){
		var o = this.getCaret(), i = this.input, s = i.value;
		i.value = s.slice(0, o.start) + text + s.slice(o.end);
		this.setCaret(o.start += text.length, o.start);
	};
	new function(){
		var d = document, o = d.createElement("input"), s = Selection;
		s.isStandard = "selectionStart" in o;
		s.isSupported = s.isStandard || (o = d.selection) && !!o.createRange;
	};
}