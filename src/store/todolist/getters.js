export function getLists(state){
    return state.lists;
}

export function getSyncState(state){
    return state.sync;
}

export function getTodosByListId(state){
    return (idList) => {
        let lists = state.lists;
        for (var i = 0; i < lists.length; i++){
            // look for the entry with a matching `code` value
            if (lists[i].id == idList){
                return lists[i].todos;
            }
        }
        return null;
    }   
}