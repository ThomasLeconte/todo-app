import axios from 'axios';
const base = "http://138.68.74.39/api";

/**
 * Fonction permettant d'enregister un utilisateur auprès de l'API
 * @param {*} context - Contexte du store existant
 * @param {*} data - Données fournies par l'utilisateur
 */
 export function register(context, data) {
    let url = base+"/register?name=" + data.name + "&email=" + data.email + "&password=" + data.password
    axios.post(url)
        .then(response => {
            if(response.status == 200){
                context.commit('setToken', response.data.token);
            }
        }).catch(err =>{
            if(err.response.data.errors != undefined){
                context.commit('setErrors', err.response.data.errors);
            }else{
                context.commit('setErrors', ['An error has occurred, please try again later.']);
            }
        })
}

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
            if(response.status == 200){
                context.commit('setToken', response.data.token);
                return true;
            }
        }).catch(function (err) {
            if(err.response.data != undefined){
                context.commit("setErrors", ["Wrong credentials, please try again..."]);
            }
            return false;
        })
}

export function getUser(context){
    let token = context.rootGetters["account/getToken"];
    axios.get(base+"/user",{
        headers: {'Authorization': 'Bearer '+token}
    }).then(response => {
        if(response.status == 200){
            context.commit('setProfile', response.data);
        }
    })
    .catch(err => {
        console.log(err);
    })
}
