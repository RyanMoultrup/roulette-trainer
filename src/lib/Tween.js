import { interpolate } from 'd3-interpolate';
export const tween = (originalValue, fn) => (newValue) => {
    return () => {
        const i = interpolate(originalValue, newValue);
        return (t) => {
            console.log('in the tween', originalValue);
            fn(Math.round(i(t)));
        };
    };
}

export default tween;