// 防抖函数
export function _debounce(func, delay) {
    let timer = null;
    return function(...args) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
}



// 节流函数
export function _throttle(fn, interval) {
    // 未完
    return function() {

        setTimeout(() => {
            fn.apply(this, )

        }, interval);



    }


}