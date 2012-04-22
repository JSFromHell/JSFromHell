//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/classes/randomizer [rev. #1]

Randomizer = function(type){
	var o = this;
	(o.d = [], o.t = type || Randomizer.RANDOMIZED, o.x = -1, o.u = 0);
};
with({o: Randomizer, p: Randomizer.prototype}){
	o.SEQUENCED = (o.PROBABILITY = (o.RANDOMIZED = 0) + 1) + 1;
	p.add = function(object, probability){
		this.u += (this.d[ this.d.length ] = {o: object, p: Math.abs(probability || 1)}).p;
	};
	p.remove = function(index){
		index > -1 && index < this.d.length && (this.u -= this.d.splice(index, 1).p);
	};
	p.next = function(){
		if(!this.u)
			return null;
		var i = 0, m = 0, x = this.t == Randomizer.SEQUENCED ?
			(this.x = (this.x + 1) % this.d.length)
			: Math.round(Math.random() * (this.t == Randomizer.PROBABILITY ? this.u
			: this.d.length - 1));
		if(this.t == Randomizer.PROBABILITY)
			do m += this.d[ i++ ].p;
			while(x > m || !((x = --i) + 1));
		return this.d[ x ].o;
	};
}