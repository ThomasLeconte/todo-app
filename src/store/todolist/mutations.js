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

export function addTodo(state, data) {
    for(var i = 0; i<state.lists.length; i++){
        if(state.lists[i].id === data.todolist_id){
            localStorage.setItem("lists", JSON.stringify(state.lists));
        }
    }
}

export function logout(state){
    state.sync = false;
    state.lists = [];
    localStorage.removeItem("lists");
}

export function delList(state, data) {
    for(var i = 0; i<state.lists.length; i++){
        if(state.lists[i].id === data.id){
            console.log(state.lists);
            state.lists.splice(i, 1);
            localStorage.removeItem("lists", JSON.stringify(state.lists));
            console.log(state.lists);
        }
    }
}

export function setErrors(state, data){
    if(data.unknown != undefined){
        state.errors.push(data.unknown);
    }
}

export function resetErrors(state){
    state.errors = [];
}