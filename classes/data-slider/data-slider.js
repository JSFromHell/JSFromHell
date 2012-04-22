//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/classes/data-slider [rev. #1]

(DataSlider = function(onchange, interval, args){
	var i = DataSlider.instances = DataSlider.instances || [], o = this;
	(o.c = 0, o.timer = null, o.interval = (o.onchange = (o.data = [].slice.call(
		arguments, 0)).shift(), o.data.shift()), i[o.index = i.length] = o);
}).prototype = {
	stop: function(){
		clearTimeout(this.timer);
	},
	play: function(){
		this.timer = setInterval("DataSlider.instances[" + this.index + "].next()", this.interval);
	},
	show: function(x){
		this.c = x; this.onchange(this.data[ x ]);
	},
	previous: function(){
		this.show(this.c > 0 ? --this.c : this.data.length-1);
	},
	next: function(){
		this.show((this.c + 1) % this.data.length);
	}
};