"use strict";(function(d){function l(a){var e={__KEYS:[]};f(a,function(b){b=b.replace("://","__").split("/");var c=e;f(b,function(b){c[b]||(c[b]={__KEYS:[]},c.__KEYS.push(b));c=c[b]})});var g=[];f(e.__KEYS,function(b){var c=b;b=e[b];for(var a=b.__KEYS;1===a.length;)c+="/"+a[0],b=b[a[0]],a=b.__KEYS;a.length&&g.push([c.replace("__","://"),m(b)])});return g}function m(a){var e=[];f(a.__KEYS,function(g){var b=m(a[g]);b.length?f(b,function(b){e.push(g+"/"+b)}):e.push(g)});return e}function n(a){var e=j.comboSyntax||["??",","];f(a,function(a){var b=a[0]+"/",c=[],h={};f(a[1],function(b){var a;a=b.lastIndexOf(".");(a=0<=a?b.substring(a):"")&&(h[a]||(h[a]=[])).push(b)});for(var d in h)h.hasOwnProperty(d)&&c.push(h[d]);f(c,function(a){var c=b+e[0]+a.join(e[1]);if(2e3<c.length)throw Error("The combo url is too long: "+c);f(a,function(a){k[b+a]=c})})});return k}var k={},p=d.cache,j=d.config.data;d.on("load",function(a){var e=[],g=j.comboExcludes;f(a,function(a){var c=p[a];if(c=c.status<c.constructor.STATUS.FETCHING)if(c=!g||!g.test(a))var d=j.comboSyntax||["??",","],c=d[0],d=d[1],c=!(c&&0<a.indexOf(c)||d&&0<a.indexOf(d));c&&e.push(a)});1<e.length&&n(l(e))});d.on("fetch",function(a){var e=a.uri;a.requestUri=k[e]||e});var f=[].forEach?function(a,e){a.forEach(e)}:function(a,e){for(var d=0;d<a.length;d++)e(a[d],d,a)};j.test&&(d=d.test||(d.test={}),d.uris2paths=l,d.paths2hash=n)})(seajs);