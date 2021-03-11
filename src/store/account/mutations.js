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

export function setErrors(state, data){
    console.log(data);
    if(data.email != undefined){
        state.errors.push(data.email[0]);
    }
    if(data.password != undefined){
        state.errors.push(data.password[0]);
    }
    if(data.name != undefined){
        state.errors.push(data.name[0]);
    }
    if(data.login != undefined){
        state.errors.push(data.login);
    }
    console.log(state.errors);
}

export function resetErrors(state){
    state.errors = [];
}

export function logout(state){
    state.token = null;
    state.infos = [];
    localStorage.removeItem("token");
    localStorage.removeItem("profile");
}