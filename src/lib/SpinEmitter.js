import { spin } from '@/lib/table/wheel';
import store from "@/store/index";

let runningSpinEmitter;

const spinEmitter = {
    start (interval) {
        runningSpinEmitter = setInterval(() => {
            store.dispatch('simulation/play', spin());
        }, interval * 1000)
    },
    stop () {
        clearInterval(runningSpinEmitter);
    }
}

export default spinEmitter;
