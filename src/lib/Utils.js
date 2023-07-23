export const debounce = (fn, wait) => {
    let timer;
    return function (...args){
        if (timer) {
            clearTimeout(timer);
        }
        const context = this; // get the current context
        timer = setTimeout(()=> {
            fn.apply(context, args);
        }, wait);
    }
}

export default { debounce }