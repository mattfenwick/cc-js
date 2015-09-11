'use strict';

module.exports = {};

// sum some numbers and print to console
function summer(list) {
    var runningTotal = 0;
    for (var i = 0; i < list.length; i++) {
        runningTotal += list[i];
    }
    return runningTotal;
}

function makeList(low, high, step) {
    var list = [],
        step = step || 1;
    for (var x = low; x <= high; x += step) {
        list.push(x);
    }
    return list;
}

var nums = makeList(4, 8, 0.3);
//console.log(nums);
//console.log(summer(nums));

function summer2(list, ret) {
    var runningTotal = 0;
    for (var i = 0; i < list.length; i++) {
        runningTotal += list[i];
    }
    ret(runningTotal);
}

function makeList2(low, high, step, ret) {
    var list = [],
        step = step || 1;
    for (var x = low; x <= high; x += step) {
        list.push(x);
    }
    ret(list);
}

/*
makeList2(4, 8, 0.3, function(list) {
    summer2(list, function(sum) {
        console.log('cc: ' + list);
        console.log('cc: ' + sum);
    });
});
*/

function factorial(n) {
    var product = 1;
    for (var i = n; i > 1; i--) {
        product *= i;
    }
    return product;
}

function factorial2(n, ret) {
    var product = 1;
    for (var i = n; i > 1; i--) {
        product *= i;
    }
    ret(product);
}

function map(f, list) {
    var xs = [];
    for (var i = 0; i < list.length; i++) {
        xs.push(f(list[i]));
    }
    return xs;
}

function fact(total, n) {
    if (n < 2) {
        return total;
    }
    return fact(total * n, n - 1);
}

function fact2(total, n, ret) {
    if (n < 2) {
        ret(total);
    } else {
        fact2(total * n, n - 1, ret);
    }
}

function fact2Start(n, ret) {
    fact2(1, n, ret);
}

fact2Start(4, console.log);
fact2Start(5, console.log);
fact2Start(6, console.log);
fact2Start(7, console.log);

function comp(f, g) {
    return function(x) {
        return f(g(x));
    }
}

function both(f, g) {
    return function(x) {
        return [f(x), g(x)];
    }
}

function inc(x) {
    return x + 10;
}

function double(x) {
    return x * 2;
}

var f = comp(inc, double),
    g = comp(double, inc);
console.log([1,2,3,4,5].map(both(f, g)));

function map3(f, xs, ret) {
    ret(xs.map(f));
}

function cons(x, xs) {
    var ys = xs.slice();
    ys.unshift(x);
    return ys;
}

function map(f, xs) {
    if (xs.length === 0) {
        return [];
    }
    var first = xs[0],
        rest = xs.slice(1);
    return cons(f(first), map(f, rest));
}

module.exports.map = map;

function cons2(x, xs, ret) {
    var ys = xs.slice();
    ys.unshift(x);
    ret(ys);
}

function map2(f, xs, ret) {
    if (xs.length === 0) {
        ret([]);
    } else {
		var first = xs[0],
			rest = xs.slice(1);
		f(first, function(y) {
			map2(f, rest, function(ys) {
				cons2(y, ys, ret);
			});
		});
	}
}

map2(function(x, ret) {ret(x * 4);}, [1,2,3,4], function(x) {
    console.log("here's: " + x);
});

function length(xs) {
    if (xs.length === 0) {
        return 0;
    } else {
        return 1 + length(xs.slice(1));
    }
}

function length2(xs, ret) {
    if (xs.length === 0) {
        ret(0);
    } else {
        length2(xs.slice(1), function(ln) {
            ret(ln + 1);
        });
    }
}

length2("asdfasdfasdfasdf", function(l) {
    console.log("length is: " + l);
});

function filter(pred, xs) {
    if (xs.length === 0) {
        return [];
    } else {
        var first = xs[0],
            rest = xs.slice(1);
        if (pred(first)) {
            return cons(first, filter(pred, rest));
        } else {
            return filter(pred, rest);
        }
    }
}

console.log(filter(function (x) {return x < 2;}, [0, 1, 2, 3, 4, 5]));

function filter2(pred, xs, ret) {
    if (xs.length === 0) {
        ret([]);
    } else {
        var first = xs[0],
            rest = xs.slice(1);
        pred(first, function(ok) {
            filter2(pred, rest, function(ys) {
                if (ok) {
                    cons2(first, ys, ret);
                } else {
                    ret(ys);
                }
            });
        });
    }
}

function predicate(x, ret) {
    ret(x < 2);
}

filter2(function(x, ret) {ret(x >= 2);}, [0, 1, 2, 3, 4, 5], function(xs) {
    console.log("filtered: " + JSON.stringify(xs));
});

// how about cons, append, flatten?

function append(xs, ys) {
    if (xs.length === 0) {
        return ys;
    } else {
        var first = xs[0],
            rest = xs.slice(1);
        return cons(first, append(rest, ys));
    }
}

function append2(xs, ys, ret) {
    if (xs.length === 0) {
        ret(ys);
    } else {
        var first = xs[0],
            rest = xs.slice(1);
        append2(rest, ys, function(zs) {
            cons2(first, zs, ret);
        });
    }
}

append2(['a', 'b', 'c'], [1, 2, 3], function(zs) {
    console.log('appended: ' + JSON.stringify(zs));
});

function flatten(xss) {
    if (xss.length === 0) {
        return [];
    } else {
        var first = xss[0],
            rest = xss.slice(1);
        return append(first, flatten(rest));
    }
}

var flattenArg = [[[1,2], [3,4]], ['a', 'b', 'c'], [], [1,2,3]];
console.log('before: ' + JSON.stringify(flattenArg));
console.log('after: ' + JSON.stringify(flatten(flattenArg)));

function flatten2(xss, ret) {
    if (xss.length === 0) {
        ret([]);
    } else {
        var first = xss[0],
            rest = xss.slice(1);
		flatten2(rest, function(yss) {
			append2(first, yss, ret);
		});
    }
}

flatten2(flattenArg, function(yss) {
    console.log('CPS after: ' + JSON.stringify(yss));
});

function comp2(f, g, ret) {
    ret(function(x, ret2) {
        g(x, function(x1) {
            f(x1, function(x2) {
                ret2(x2);
            });
        });
    });
}

console.log('regular comp: ' + comp(function(x) {return x + 10;}, function(y) {return y * 2;})(3));

function both2(f, g, ret) {
    ret(function(x, ret2) {
        f(x, function(x1) {
            g(x, function(x2) {
                ret2([x1, x2]);
            });
        });
    });
}

function inc2(x, ret) {
    ret(x + 10);
}

function double2(x, ret) {
    ret(x * 2);
}

comp2(inc2, double2, function(f) {
    comp2(double2, inc2, function(g) {
        both2(f, g, function(h) {
            h(3, function(xs) {
                console.log('both2: ' + xs);
            });
        });
    });
});

// MaybeError

var STATUSES = {
    'success': 1,
    'failure': 1,
    'error'  : 1
};

/*

function ME(status, value) {
    if ( !(status in STATUSES) ) {
        throw new Error('invalid MaybeError constructor name: ' + status);
    }
    this.status = status;
    this.value = value;
}

function MaybeError(status, value, ret) {
    ret(new ME(status, value));
}

ME.pure = function(x, ret) {
    MaybeError('success', x, ret);
}

ME.error = function(e, ret) {
    MaybeError('error', e, ret);
}

ME.prototype.fmap = function(f, ret) {
    if (this.status === 'success') {
        ME.pure(f(this.value)));

/*
MaybeError.prototype.fmap = function(f) {
    if ( this.status === 'success' ) {
        return MaybeError.pure(f(this.value));
    }
    return this;
};

MaybeError.app = function(f) {
    var vals = Array.prototype.slice.call(arguments, 1),
        args = [];
    for(var i = 0; i < vals.length; i++) {
        if ( vals[i].status === 'success' ) {
            args.push(vals[i].value);
        } else {
            return vals[i];
        }
    }
    return MaybeError.pure(f.apply(undefined, args));
};
        
MaybeError.prototype.bind = function(f) {
    if ( this.status === 'success' ) {
        return f(this.value);
    }
    return this;
};

MaybeError.prototype.mapError = function(f) {
    if ( this.status === 'error' ) {
        return MaybeError.error(f(this.value));
    }
    return this;
};

MaybeError.prototype.plus = function(that) {
    if ( this.status === 'failure' ) {
        return that;
    }
    return this;
};

MaybeError.zero = new MaybeError('failure', undefined);



function item(xs, cc) {
    if (xs.length === 0) {
        cc(MaybeError.zero);
    }
    var first = xs[0],
        rest = xs.slice(1);
    cc(MaybeError.pure({'result': first, 'rest': rest}));
}

function seq2(p1, p2, cc) {
    var parse1 = p1*/