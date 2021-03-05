export function load(state) {
    if("lists" in localStorage){
        state.lists = JSON.parse(localStorage.getItem("lists"));
    }
}

export function setLists(state, data) {
    state.lists = data;
    localStorage.setItem("lists", JSON.stringify(state.lists));
}