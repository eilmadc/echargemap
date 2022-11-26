
//Ocultación de los métodos directos de localstorage mediante abstracción de métodos.
const stg = {
    
    //localstorage.getItem
    get(key) {
        const value = localStorage.getItem(key);
        return (!value ? null : JSON.parse(value));
    },

    //localstorage.setItem
    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },

    //localstorage.removeItem
    remove(key) {
        localStorage.removeItem(key);
    },

    //clear local storage
    clear(){
        localStorage.clear();
    },

};

export default stg;