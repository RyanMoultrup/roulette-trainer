import emitter from "../EventEmitter";

export default function init () {
    const table = document.getElementById('table');

    table.addEventListener('click', (event) => {
        console.log('table click:::');
        if (event.target.id === 'dbl_3_6') {
            emitter.emit('betPlaced', {name: event.target.id, amount: 50});
        }
    })
}