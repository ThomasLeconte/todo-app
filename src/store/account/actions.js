import axios from 'axios';
const base = "http://138.68.74.39/api";

/**
 * Fonction retournant une promesse booléenne permettant de dire si les identifiants
 * sont corrects ou pas
 * @param {*} context - Contexte du store existant
 * @param {*} data - Données fournies par l'utilisateur
 * @returns Promise<boolean>
 */
export async function login(context, data) {
    let url = base+"/login?email=" + data.email + "&password=" + data.password
    return axios.post(url)
        .then(response => {
            switch (response.status) {
                case 200: //OK
                    context.commit('setProfile', response.data);
                    return true;
                case 401: //UNAUTHORIZED
                    context.commit('ERROR_AUTHENTICATED', response.data);
                    return false;
            }
        }).catch(function (err) {
            console.log(err);
            return false;
        })
}

/**
 * Fonction permettant d'enregister un utilisateur auprès de l'API
 * @param {*} context - Contexte du store existant
 * @param {*} data - Données fournies par l'utilisateur
 */
export function register(context, data) {
    let url = base+"/register?name=" + data.name + "&email=" + data.email + "&password=" + data.password
    axios.post(url)
        .then(response => {
            switch (response.status) {
                case 200: //OK
                    context.commit('setProfile', response.data);
                    break;
                case 422: //UNAUTHORIZED
                    context.commit('ERROR_REGISTER', response.data);
                    break;
            }
        })
}


/**
 * Fonction permettant d'enregister un utilisateur auprès de l'API
 * @param {*} context - Contexte du store existant
 * @param {*} data - Données fournies par l'utilisateur
 */
 export function newList(context, data) {
    let token = context.rootGetters["account/getProfile"].token;
    let url = base+"/todolist?name=" + data.nameList
    axios.post(url,{headers: {'Authorization': 'Bearer '+token}})
        .then(response => {
            console.log("REPONSE DATA :" + response.data);
            switch (response.status) {
                case 200: //OK
                    //context.commit('loadProfile', response.data);
                    console.log("c'est bon !");
                    break;
                case 422: //UNAUTHORIZED
                    console.log("c'est pas bon !");
                    context.commit('ERROR_REGISTER', response.data);
                    break;
            }
        })
}