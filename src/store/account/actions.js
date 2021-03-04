import axios from 'axios';

export function login(context, data) {
    let url = "http://138.68.74.39/api/login?email=" + data.email + "&password=" + data.password
    axios.post(url)
        .then(response => {
            console.log(response);
            switch (response.status) {
                case 200: //OK
                    context.commit('loadProfile', response.data);
                    break;
                case 401: //UNAUTHORIZED
                    context.commit('ERROR_AUTHENTICATED', response.data);
                    break;
            }
        })
}

export function register(context, data) {
    let url = "http://138.68.74.39/api/register?name=" + data.name + "&email=" + data.email + "&password=" + data.password
    axios.post(url)
        .then(response => {
            switch (response.status) {
                case 200: //OK
                    context.commit('loadProfile', response.data);
                    break;
                case 422: //UNAUTHORIZED
                    context.commit('ERROR_REGISTER', response.data);
                    break;
            }
        })
}