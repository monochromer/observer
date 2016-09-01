export default {
    on(type, fn) {
        this._events = this._events || {};
        this._events[type] = this._events[type] || [];
        this._events[type].push(fn);
        return this;
    },
  
    off(type, fn) {
        let index, events = this._events[type];
        if (events && (index = events.indexOf(fn)) > -1) events.splice(index, 1);
        if (this._events[type].length <= 0) delete this._events[type];
        return this;
    },
  
    once(type, fn) {
        let handler = (...args) => { this.off(type, handler); fn(...args); };
        this.on(type, handler);
        return this;
    },
  
    emit(type, ...args) {
        if (this._events[type]) this._events[type].forEach(fn => fn(...args));
        return this;
    }
};