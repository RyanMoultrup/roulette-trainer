import { interpolate } from 'd3-interpolate';
import { select } from 'd3-selection';

export class Tween {
    constructor(anchor) {
        this._anchor = anchor;
        this._value = 0;
        this._transitionSpeed = 1000;
    }

    #tween (newValue) {
        return () => {
            const i = interpolate(this._value, newValue);
            return (t) => {
                this._callback(Math.round(i(t)));
            };
        };
    }

    render(newValue) {
        select(this._anchor)
            .transition()
            .duration(this._transitionSpeed)
            .tween('text', this.#tween(newValue));
    }

    onRender (fn) {
        this._callback = fn;
        return this;
    }

    initValue(value) {
        this._value = value;
        return this;
    }
}

export const tween = anchor => new Tween(anchor);