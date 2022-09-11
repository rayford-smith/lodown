'use strict';

// YOU KNOW WHAT TO DO //

/**
 * each: Designed to loop over a collection, Array or Object, and applies the 
 * action Function to each value in the collection.
 * 
 * @param {Array or Object} collection
 * @param {Function} action
 */
function each(collection, action) {
    if(Array.isArray(collection)) {
        for(var i = 0; i < collection.length; i++) {
            action(collection[i], i, collection);
        }
    } else {
        for (var key in collection) {
            action(collection[key], key, collection);
        }
    }
}
module.exports.each = each;


/**
 * identity: Returns the value passed in.
 * @param {*} arg 
 * @return *
 */
_.identity = function(arg) {
    return arg;
}
module.exports.identity = _.identity;


/**
 * typeOf: Returns the type of the value passed in.
 * @param {*} arg
 * @return string
 */
_.typeOf = function(arg) {
    switch (typeof arg) {
        case "number":
            return "number";
            break;
        case "string":
            return "string";
            break;
        case "boolean":
            return "boolean";
            break;
        case "function":
            return "function";
            break;
        case "object":
            if (Array.isArray(arg)) {
                return "array";
            } else if (arg == null) {
                return "null";
            }
            return "object";
            break;
        default:
            return "undefined";
            break;
    }
}
module.exports.typeOf = _.typeOf;


/**
 * first: Returns the first [num] elements in [arr].
 * @param {Array} arr 
 * @param {number} num 
 * @return {Array}
 * 
 */
_.first = function(arr, num) {
    let retArr = [];
    if (!Array.isArray(arr) || num < 1) return [];
    if (typeof num !== "number" || num === 1) return arr[0];
    for (let i = 0; i < Math.min(num, arr.length); i++) {
        retArr.push(arr[i]);
    }
    return retArr;
}
module.exports.first = _.first;


/**
 * last: Returns the last [num] elements in [arr].
 * @param {Array} arr 
 * @param {number} num 
 * @return {Array}
 */
_.last = function(arr, num) {
    let retArr = [];
    if (!Array.isArray(arr)) return [];
    if (typeof num !== "number" || num === 1) return arr[arr.length-1];
    for (let i = Math.max(arr.length-num,0); i < arr.length; i++) {
        retArr.push(arr[i]);
    }
    return retArr;
}
module.exports.last = _.last;


/**
 * indexOf: Returns the index of [val] in [arr]. 
 * @param {Array} arr 
 * @param {*} val 
 */
_.indexOf = function(arr, val) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == val) return i;
    }
    return -1;
}
module.exports.indexOf = _.indexOf;


/**
 * contains: Returns whether or not [arr] contains [val].
 * @param {Array} arr 
 * @param {*} val 
 */
_.contains = function(arr, val) {
    let contains = false;

    for (let i = 0; i < arr.length; i++) {

        contains = (arr[i] === val ? true : contains);

    }
    return contains;
}
module.exports.contains = _.contains;


/**
 * each: Applys [func] to every element in [coll].
 * @param {Array or Object} coll 
 * @param {function} func 
 */
_.each = function(coll, func) {
    if (Array.isArray(coll)) {
        for (let i = 0; i < coll.length; i++) {
            func(coll[i], i, coll);
        }
    } else {
        for (let key in coll) {
            func(coll[key], key, coll);
        }
    }
}
module.exports.each = _.each;


/**
 * unique: Returns an array of all unique elements in [arr].
 * @param {Array} arr 
 * @returns {Array}
 */
_.unique = function(arr) {
    let retArr = [];
    for (let i = 0; i < arr.length; i++) {
        if (_.indexOf(retArr, arr[i]) == -1) retArr.push(arr[i]);
    }
    return retArr;
}
module.exports.unique = _.unique;


/**
 * filter: Returns an array of all elements in [arr] that resolve to True when passed into [func].
 * @param {Array} arr 
 * @param {Function} func 
 * @returns {Array}
 */
_.filter = function(arr, func) {
    let retArr = [];
    function f(v, i, r) {
        if (func(v, i, r) == true) retArr.push(v);
    }
    _.each(arr, f);
    return retArr;
}
module.exports.filter = _.filter;


/**
 * reject: Returns an array of all elements in [arr] that resolve to False when passed into [func].
 * @param {Array} arr 
 * @param {Function} func 
 * @returns {Array}
 */
_.reject = function(arr, func) {
    let retArr = [];
    function f(v, i, r) {
        if (func(v, i, r) == false) retArr.push(v);
    }
    _.each(arr, f);
    return retArr;
}
module.exports.reject = _.reject;


/**
 * partition: Returns an array composed of 2 subarrays based on the results each element in [arr] returns when passed into [func]. [[True], [False]]
 * @param {Array} arr 
 * @param {Function} func 
*/
_.partition = function(arr, func) {
    let bigArr = [];
    function part(arr, func, bool) {
        let retArr = [];
        function f(v, i, r) {
            if (func(v, i, r) == bool) retArr.push(v);
        }
         _.each(arr, f);
        return retArr;
    }
    bigArr.push(part(arr, func, true));
    bigArr.push(part(arr, func, false));
    return bigArr;
}
module.exports.partition = _.partition;


/**
 * map: Returns an array containing the results of each element in [coll] passed into [func].
 * @param {Array or Object} coll 
 * @param {Function} func 
 * @returns {Array or Object}
 */
_.map = function(coll, func) {
    let retArr = [];
    if (Array.isArray(coll)) {
        for (let i = 0; i < coll.length; i++) {
            retArr.push(func(coll[i], i, coll));
        }
    } else {
        for (let key in coll) {
            retArr.push(func(coll[key], key, coll));
        }
    }
    return retArr;
}
module.exports.map = _.map;


/**
 * pluck: Returns an array containing the value of [prop] for each object in [arr].
 * @param {Array} arr 
 * @param {String} prop 
 * @returns {Array}
 */
_.pluck = function(arr, prop) {
    let retArr = [];
    function f(v,i,c) {
        for (let key in v) {
            if (key == prop) retArr.push(v[key]);
        }
    }
    _.map(arr, f);
    return retArr;
}
module.exports.pluck = _.pluck;


/**
 * every: Returns whether or not [func] resolves True for every element in [coll].
 * @param {Array or Object} coll 
 * @param {Function} func 
 * @returns {boolean} 
 */
_.every = function(coll, func) {
    if (Array.isArray(coll)) {
        for (let i = 0; i < coll.length; i++) {
            if (func == undefined) {
                console.log(coll);
                if (!coll[i]) return false;
            } else if (func(coll[i], i, coll) == false) return false;
        }
    } else {
        for (let key in coll) {
            if (func == undefined) {
                if (!coll[i]) return false;
            } else if (func(coll[key], key, coll) == false) return false;
        } 
    }
    return true;
}
module.exports.every = _.every;


/**
 * some: Returns whether or not at least one element in [coll] returns True when passed into [func].
 * @param {Array or Object} coll 
 * @param {Function} func 
 * @returns {boolean}
 */
_.some = function(coll, func) {
    if (Array.isArray(coll)) {
        for (let i = 0; i < coll.length; i++) {
            if (func == undefined) {
                console.log(coll);
                if (coll[i]) return true;
            } else if (func(coll[i], i, coll) == true) return true;
        }
        return false;
    } else {
        for (let key in coll) {
            if (func == undefined) {
                if (coll[i]) return true;
            } else if (func(coll[key], key, coll) == true) return true;
        } 
        return false;
    }
}
module.exports.some = _.some;


/**
 * reduce: Returns an value containing a summation of every value of [func] for each element in [arr], starting with seed.
 * @param {Array} arr 
 * @param {Function} func 
 * @param {*} seed 
 * @returns {*}
 */
_.reduce = function(arr, func, seed) {
    let val = seed;
    let num = 0;
    if (seed == undefined) {
        val = arr[0];
        num = 1;
    }
    for (let i = num; i < arr.length; i++) {
        val = func(val, arr[i], i);
    }
    return val;
}
module.exports.reduce = _.reduce;


/**
 * extend: Returns the first object in [args] modified to contain the key value pairs of every other object in [args].
 * @param  {...any} args 
 * @returns {Object}
 */
_.extend = function(...args) {
    for (let i = 1; i < args.length; i++) {
        for (let key in args[i]) {
            args[0][key] = args[i][key];
        }
    }
    return args[0];
}
module.exports.extend = _.extend;