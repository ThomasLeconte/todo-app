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
    data.completed = parseInt(data.completed);
    for(var i = 0; i<state.lists.length; i++){
        if(state.lists[i].id === data.todolist_id){
            state.lists[i].todos.push(data);
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
            localStorage.setItem("lists", JSON.stringify(state.lists));
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

export function delTask(state, data){
    //on parcours la liste de listes
    for(let i = 0; i< state.lists.length; i++){
        //si l'id de la liste correspond à celui passé dans data
        if(state.lists[i].id == data.todolist_id){
            //on parcours toutes les tâches de la liste correspondante
            for(let j = 0; j < state.lists[i].todos.length; j++){
                //si l'id de la tâche correspond à celle passée en paramètre
                if(state.lists[i].todos[j].id == data.id){
                    console.log("task found");
                    //on enlève la tâche de la liste
                    state.lists[i].todos.splice(j, 1);
                    break;
                }
            }
            break;
        }
    }
    localStorage.setItem("lists", JSON.stringify(state.lists));
}

export function updateTaskComplete(state, data){
    //on parcours la liste de listes
    for(let i = 0; i< state.lists.length; i++){
        //si l'id de la liste correspond à celui passé dans data
        if(state.lists[i].id == data.todolist_id){
            //on parcours toutes les tâches de la liste correspondante
            for(let j = 0; j < state.lists[i].todos.length; j++){
                //si l'id de la tâche correspond à celle passée en paramètre
                if(state.lists[i].todos[j].id == data.id){
                    console.log("task found");
                    //on modifie le completed de la tâche
                    state.lists[i].todos[j].completed == 0
                    ? state.lists[i].todos[j].completed = 1
                    : state.lists[i].todos[j].completed = 0;
                    break;
                }
            }
            break;
        }
    }
    localStorage.setItem("lists", JSON.stringify(state.lists));
}