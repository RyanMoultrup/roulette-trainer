import { BaseMixin, registerChart } from 'dc';

export class SpinHistoryTable extends BaseMixin {
    constructor () {
        super();
        this.redrawCallback = () => {};
        this.register();
    }

    render () {
        // do nothing on render
    }

    register () {
        registerChart(this);
    }

    _doRedraw () {
        this.redrawCallback();
    }

    onRedraw (callback) {
        this.redrawCallback = callback;
    }
}

export const spinHistoryTable = (parent, chartGroup) => new SpinHistoryTable(parent, chartGroup)