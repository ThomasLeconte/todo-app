import axios from 'axios';
const base = "http://138.68.74.39/api";

/**
 * Méthode permettant de récupérer les listes de l'utilisateur grâce à un appel API
 * @param {*} context - Contexte actuel de l'utilisateur
 */
export function loadLists(context){
    let token = context.rootGetters["account/getProfile"].token;
    axios.get(base+"/todolists",{
        headers: {'Authorization': 'Bearer '+token}
    }).then(response => {
        console.log(response);
        context.commit("load", response.data);
    })
    .catch(err => {
        console.log(err);
    })
}