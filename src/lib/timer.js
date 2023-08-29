let runningSpinEmitter;

const timer = {
    start (interval, fn) {
        console.log('timer start called')
        runningSpinEmitter = setInterval(() => {
            console.log('before fn() call in timer')
            fn()
        }, interval * 1000)
    },
    stop () {
        clearInterval(runningSpinEmitter);
    }
}

export default timer;
