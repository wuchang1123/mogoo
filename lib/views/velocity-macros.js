var macros = {};
/*
 var U, F, p, P, Y, G;

    function l($) {
        switch ($) {
        case "yyyy":
            return U;
        case "yy":
            return U.toString()
                .slice(-2);
        case "MM":
            return B(F);
        case "M":
            return F;
        case "dd":
            return B(p);
        case "d":
            return p;
        case "HH":
            return B(P);
        case "H":
            return P;
        case "hh":
            return B(P > 12 ? P - 12 : P);
        case "h":
            return P > 12 ? P - 12 : P;
        case "mm":
            return B(Y);
        case "m":
            return Y;
        case "ss":
            return B(G);
        case "s":
            return G;
        default:
            return $
        }
    }
    Date.now = Date.now || function() {
        return +new Date
    };
    Date.prototype.format = function($) {
        U = this.getFullYear();
        F = this.getMonth() + 1;
        p = this.getDate();
        P = this.getHours();
        Y = this.getMinutes();
        G = this.getSeconds();
        return $.replace(/y+|m+|d+|h+|s+|H+|M+/g, l)
    };
*/
macros.ParseTime = (function() {
	var t, year, mounth, date, hour, minute, second;
	var cb = {
		yyyy: function() {
			return year;
		},
		yy: function() {
			return year.toString().slice(-2);
		},
		MM: function() {
			return time0(mounth);
		},
		M: function() {
			return mounth;
		},
		dd: function() {
			return time0(date);
		},
		d: function() {
			return date;
		},
		HH: function() {
			return time0(hour);
		},
		H: function() {
			return hour;
		},
		hh: function() {
			return time0(hour > 12 ? hour - 12 : hour);
		},
		h: function() {
			return hour > 12 ? hour - 12 : hour;
		},
		mm: function() {
			return time0(minute);
		},
		m: function() {
			return minute;
		},
		ss: function() {
			return time0(second);
		},
		s: function() {
			return second;
		}
	}
	
	function time0($) {
        return $ < 10 ? "0" + $ : $
    }
	
	return function(time, format) {
		t = new Date(time);
		//console.log(t);
		year = t.getFullYear();
        mounth = t.getMonth() + 1;
        date = t.getDate();
        hour = t.getHours();
        minute = t.getMinutes();
        second = t.getSeconds();
        
		return format.replace(/y+|m+|d+|h+|s+|H+|M+/g, function($0) {
			return cb[$0] && cb[$0]();
		});
	}
})();

module.exports = macros;