export function load(state) {
    if("token" in localStorage) {
        state.profile = {token: localStorage.getItem("token")};
    }
}

export function setProfile(state, data){
    state.profile = {token: data.token};
    localStorage.setItem("token", data.token);
}