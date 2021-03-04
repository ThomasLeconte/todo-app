export function load(state) {
    if("token" in localStorage) {
        state.profile = {token: localStorage.getItem("token")};
    }
}

export function loadProfile(state, data){
    state.profile = {token: data.token};
    localStorage.setItem("token", data.token);
    console.log(state);
}