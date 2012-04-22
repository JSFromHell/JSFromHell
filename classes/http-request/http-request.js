//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/classes/http-request [rev. #1]

HTTPRequest = function(){};
with({$: HTTPRequest.prototype}){
	$.isSupported = function(){
		return !!this.getConnection();
	};
	$.events = ["start", "open", "send", "load", "end"];
	$.filter = encodeURIComponent;
	$.getConnection = function(){
		var i, o = [function(){return new ActiveXObject("Msxml2.XMLHTTP");},
		function(){return new ActiveXObject("Microsoft.XMLHTTP");},
		function(){return new XMLHttpRequest;}];
		for(i = o.length; i--;) try{return o[i]();} catch(e){}
		return null;
	};
	$.formatParams = function(params){
		var i, r = [];
		for(i in params) r[r.length] = i + "=" + (this.filter ? this.filter(params[i]) : params[i]);
		return r.join("&");
	};
	$.get = function(url, params, handler, waitResponse){
		return this.request("GET", url + (url.indexOf("?") + 1 ? "&" : "?") + this.formatParams(params), null, handler, null, waitResponse);
	};
	$.post = function(url, params, handler, waitResponse){
		return this.request("POST", url, params = this.formatParams(params), handler, {
			"Connection": "close",
			"Content-Length": params.length,
			"Method": "POST " + url + " HTTP/1.1",
			"Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
		}, waitResponse);
	};
	$.request = function(method, url, params, handler, headers, waitResponse){
		var i, self = this, o = self.getConnection(), f = handler instanceof Function;
		try{
			o.open(method, url, !waitResponse);
			waitResponse || (o.onreadystatechange = function(){
				var s = $.events[o.readyState];
				handler && (f ? handler(o) : s in handler && handler[s].call(self, o));
			});
			if(headers){
				for(i in {USER_AGENT: 0, XUSER_AGENT: 0})
					i in headers || (headers[i] = "XMLHttpRequest");
				for(i in headers)
					o.setRequestHeader(i, headers[i]);
			}
			o.send(params);
			waitResponse && handler && (f ? handler(o) : handler["end"] && handler["end"].call(self, o));
			return true;
		}
		catch(e){
			return false;
		}
	};
}