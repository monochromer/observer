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
        events = {},
        splitter =  /\s+/;

    function on(types, fn, context) {
        var type;

        types = types.split(splitter);
        type = types.pop();
        context = context || this;

        while (type) {
            events[type] = events[type] || [];
            events[type].push({
                context: context,
                callback: fn
            });
            type = types.pop();
        }

        return this;
    };

    function off(types, fn) {
        var type,
            index;

        types = types.split(splitter);
        type = types.pop();

        while (type && type in events) {
            index = events[type].indexOf(fn);
            events[type].splice(index, 1);
            if(events[type].length === 0) {
                delete events[type];
            }
            type = types.pop();
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
        var type, args, e,
            subscription,
            len;

        types = types.split(splitter);
        type = types.pop();
        args = Array.prototype.slice.call(arguments, 1);

        while(type && (type in events)) {
            e = events[type];
            for (len = e.length; len > 0; len -= 1) {
                subscription = e[len - 1];
                subscription.callback.apply(subscription.context, args);
            }
            type = types.pop();
        }
    };

    exports.on = on;
    exports.off = off;
    exports.once = once;
    exports.emit = emit;

    return exports;
}));