(function (root, factory) {

    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else if (typeof exports === "object") {
        module.exports = factory();
    } else {
        root.Observer = factory();
    }

}(this, function () {

    'use strict';

    var exports = {},
        splitter =  /\s+/;

    function on(types, fn, context) {
        var type;
        var types = types.split(splitter);
        var context = context || this;
        this._events = this._events || {};

        while (type = types.pop()) {
            this._events[type] = this._events[type] || [];
            this._events[type].push({
                context: context,
                callback: fn
            });
        }

        return this;
    };

    function off(types, fn) {
        if (!this._events) return;

        var type, index;
        var types = types.split(splitter);

        while ((type = types.pop()) && (type in this._events)) {
            index = this._events[type].indexOf(fn);
            this._events[type].splice(index, 1);
            if(this._events[type].length === 0) {
                delete this._events[type];
            }
        }

        return this;
    };

    function once(types, fn, context) {
        var self = this;

        function handler() {
            self.off(types, handler);
            fn.apply(context, arguments);
        }

        this.on(types, handler, context);

        return this;
    };

    function emit(types) {
        if (!this._events) return;

        var types, type, args, e,
            subscription, len;

        types = types.split(splitter);
        args = Array.prototype.slice.call(arguments, 1);

        while((type = types.pop()) && (type in this._events)) {
            e = this._events[type];
            for (len = e.length; len > 0; len -= 1) {
                subscription = e[len - 1];
                subscription.callback.apply(subscription.context, args);
            }
        }

        return this;
    };

    exports.on = on;
    exports.off = off;
    exports.once = once;
    exports.emit = emit;

    return exports;
}));