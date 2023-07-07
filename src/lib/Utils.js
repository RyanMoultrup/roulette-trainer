export function debounce (fn, wait) {
    console.log('in debounce::::');
    let timer;
    return function (...args){
        if (timer) {
            console.log('restting timeer::::');
            clearTimeout(timer); // clear any pre-existing timer
        }
        const context = this; // get the current context
        timer = setTimeout(()=>{
            console.log('should be calling callback:::');
            fn.apply(context, args); // call the function if time expires
        }, wait);
    }
}

export default { debounce }