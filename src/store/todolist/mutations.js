export function load(state) {
    if("lists" in localStorage){
        state.lists = JSON.parse(localStorage.getItem("lists"));
    }
}

export function setLists(state, data) {
    state.lists = data;
    localStorage.setItem("lists", JSON.stringify(state.lists));
}

export function setSyncState(state) {
    state.sync = true;
}

export function addList(state, data) {
    state.lists.push(data);
    localStorage.setItem("lists", JSON.stringify(state.lists));
}

export function logout(state){
    state.sync = false;
    state.lists = [];
    localStorage.removeItem("lists");
}

export function delList(state, data) {
    state.lists.delete(data);
    localStorage.removeItem("lists", JSON.stringify(state.lists));
}