import strategy from '../../store/modules/stragtegy';

let runningSpinEmitter;

console.log('$store', strategy);
// console.log('store', strategy.getters.getStrategy());

export const spin = function () {
    return Math.floor(Math.random() * (37 - 1 + 1)) + 1;
}

export const start = function (interval) {
    runningSpinEmitter = setInterval(function () {
        return spin();
    }, interval * 1000)
}

export const stop = function () {
    clearInterval(runningSpinEmitter);
}