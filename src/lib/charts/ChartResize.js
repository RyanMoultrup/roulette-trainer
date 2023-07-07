import { select } from 'd3-selection';

// for a getter/setter property name and a value,
// return a function that wraps a function so that the property
// is set to the new value, the wrapped function is run on the chart,
// and the property value is then restored

// also applies to arrays of charts, and children of composite charts
const restoreGetSet = (property, value) => f => c => {
    if(Array.isArray(c))
        c.forEach(restoreGetSet(property, value)(f));
    else {
        const cs = c.children ? [c].concat(c.children()) : [c],
            last = cs.map(c => c[property]());
        cs.forEach(ch => ch[property](value));
        f(c);
        cs.forEach(ch => ch[property](last));
    }
    return c;
};

// specifically, turn off transitions for a chart or charts
const no_transitions = restoreGetSet('transitionDuration', 0);
// specifically, turn off transitions for a chart or charts and redraw
const redrawChartNoTransitions = no_transitions(c => c.redraw());

export default redrawChartNoTransitions;

// apply resizing to a chart or charts
// if resizeMode is on, use viewbox resizing, which stretches the SVG instead of redrawing it
// otherwise, add a window.onresize handler to set the chart sizes based on the size of the window
// adjustX and adjustY are either adjustment functions
// or numbers to subtract from window.innerWidth and window.innerHeight
// export default function applyResizing(chart, adjustX, adjustY, onresize) {
//     if (resizeMode === 'viewbox') {
//         if(Array.isArray(chart))
//             chart.forEach(c => applyResizing(c, adjustX, adjustY, onresize));
//         else {
//             chart
//                 .width(600)
//                 .height(400)
//                 .useViewBoxResizing(true);
//             select(chart.anchor()).classed('fullsize', true);
//         }
//     } else {
//         if(!Array.isArray(chart))
//             chart = [chart];
//         if(!isNaN(adjustX))
//             adjustX = (dx => x => x-dx)(adjustX);
//         adjustX = adjustX || (x => x);
//         if(!isNaN(adjustY))
//             adjustY = (dy => y => y-dy)(adjustY);
//         adjustY = adjustY || adjustX || (y => y);
//         chart.forEach(c => c.width(adjustX(window.innerWidth))
//             .height(adjustY(window.innerHeight)));
//         window.onresize = function () {
//             if (onresize) {
//                 chart.forEach(onresize);
//             }
//             chart.forEach(c => {
//                 c.width(adjustX(window.innerWidth))
//                     .height(adjustY(window.innerHeight));
//                 if (c.rescale) {
//                     c.rescale();
//                 }
//             });
//             redrawChartNoTransitions(chart);
//         };
//     }
// }