export function load(state, data) {
    console.log(data);
    //properties = data
}

export function loadProfile(state, data){
    state.profile = {token: data.token};
    console.log(state);
}