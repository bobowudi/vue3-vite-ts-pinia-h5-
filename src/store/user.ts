let names = "SE_USER"

let _state:Store.User = {
    userId: "",
    userName: "",
    phone: ""
}

try {
    let _name = names.toUpperCase().replace('SE_', '');
    if (sessionStorage.getItem(_name)) {
        _state = Object.assign(_state, JSON.parse(sessionStorage.getItem(_name) as string));
    }
} catch (e) {
    console.log('数据已损坏');
}
export const state = _state;

export const useStore = defineStore(names, {
    state: () => {
        return _state;
    },
    actions: {
        setUser(payload:Store.User){
            this.$patch(payload);
        }

    },
})