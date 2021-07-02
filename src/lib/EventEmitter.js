class EventEmitter {
    constructor() {
        this.events = {};
    }
    on(event, listener) {
        console.log('on():::');
        console.log('on() listener:::', listener);
        if (typeof this.events[event] !== 'object') {
            this.events[event] = [];
        }
        this.events[event].push(listener);
        console.log('this.events', this.events);
        return () => this.removeListener(event, listener);
    }
    removeListener(event, listener) {
        if (typeof this.events[event] === 'object') {
            const idx = this.events[event].indexOf(listener);
            if (idx > -1) {
                this.events[event].splice(idx, 1);
            }
        }
    }
    emit(event, ...args) {
        console.log('emit():::');
        console.log('emit this.events', this.events);
        if (typeof this.events[event] === 'object') {
            this.events[event].forEach(listener => listener.apply(this, args));
        }
    }
    once(event, listener) {
        const remove = this.on(event, (...args) => {
            remove();
            listener.apply(this, args);
        });
    }
}

const emitter = new EventEmitter();

export default emitter;
