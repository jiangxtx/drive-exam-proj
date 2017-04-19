/**
 * 常用 JavaScript 方法的浏览器兼容性适配 JS file.
 * Note that this JS file should be quoted beyond of other JSs in your index.html etc.
 */

if (!Array.prototype.find) {
    Object.defineProperty(Array.prototype, 'find', {
        value: function(predicate) {
            'use strict';
            if (this == null) {
                throw new TypeError('Array.prototype.find called on null or undefined');
            }
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }
            var list = Object(this);
            var length = list.length >>> 0;
            var thisArg = arguments[1];
            var value;

            for (var i = 0; i < length; i++) {
                value = list[i];
                if (predicate.call(thisArg, value, i, list)) {
                    return value;
                }
            }
            return undefined;
        }
    });
}

/**
 * well-watched Function: startsWith.
 */
if ( !String.prototype.startsWith ||
    (typeof String.prototype.startsWith != 'function') ) {
    String.prototype.startsWith = function(searchString, position) {
        position = position || 0;
        return this.substr(position, searchString.length) === searchString;
    };
}

if (!String.prototype.endsWith ||
    (typeof String.prototype.endsWith === 'function') ) {
    String.prototype.endsWith = function (suffix) {
        return this.indexOf(suffix, this.length = suffix.length) !== -1;
    }
}


console.info('>>>Polyfill.js has been run successfully');