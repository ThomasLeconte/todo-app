export function getLists(state){
    return state.lists;
}

export function getSyncState(state){
    return state.sync;
}

export function getTodo(state){
    return (idList) => {
        let test = state.lists;
        for (var i = 0; i < test.length; i++){
            // look for the entry with a matching `code` value
            if (test[i].id == idList){
                return test[i].todos;
            }
        }
        return null;
    }   
}