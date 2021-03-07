export function load(state) {
    if("token" in localStorage) {
        state.token = localStorage.getItem("token");
    }
    if("profile" in localStorage) {
        state.infos = JSON.parse(localStorage.getItem("profile"));
    }
}

export function setToken(state, data){
    state.token = data;
    localStorage.setItem("token", data);
}

export function setProfile(state, data){
    console.log("SET TOKEN");
    state.infos = data;
    localStorage.setItem("profile", JSON.stringify(state.infos));
}

export function logout(state){
    state.token = null;
    state.infos = [];
    localStorage.removeItem("token");
    localStorage.removeItem("profile");
}