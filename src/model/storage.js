// 封装localstorage本地存储方法

var storage = {
    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    get(value) {
        return JSON.parse(localStorage.getItem(value));
    },
    remove(key){
        localStorage.removeItem(key);   
    }
}

export default storage;