import axios from 'axios';
const base = "http://138.68.74.39/api";

/**
 * Méthode permettant de récupérer les listes de l'utilisateur grâce à un appel API
 * @param {*} context - Contexte actuel de l'utilisateur
 */
export function load(context){
    let token = context.rootGetters["account/getProfile"].token;
    axios.get(base+"/todolists",{
        headers: {'Authorization': 'Bearer '+token}
    }).then(response => {
        if(response.status == 200){
            console.log(response.data);
            //Si les listes sont déjà enregistré dans le cache
            if("lists" in localStorage){
                context.commit("load");
            }else{
                context.commit("setLists", response.data);
            }
            
        }
    })
    .catch(err => {
        console.log(err);
    })
}

/**
 * Méthode permettant de récupérer les tâches associées à une liste grâce à un appel API
 * @param {*} context - Contexte actuel de l'utilisateur
 * @param {*} id - ID de la liste concernée
 */
export async function loadTasksOfList(context, id){

    let token = context.rootGetters["account/getProfile"].token;
    return axios.get(base+"/todos/"+id,{
        headers: {'Authorization': 'Bearer '+token}
    }).then(response => {
        if(response.status === 200){
            return response.data;
        }else{
            return null;
        }
    })
    .catch(err => {
        console.log(err);
    })
}

/**
 * Fonction permettant d'enregister un utilisateur auprès de l'API
 * @param {*} context - Contexte du store existant
 * @param {*} data - Données fournies par l'utilisateur
 */
 export async function newList(context, data) {
    let token = context.rootGetters["account/getProfile"].token;
    let url = base+"/todolist?name=" + data.nameList
    console.log(url);
    return axios.post(url, {name : data.nameList},{
        headers: {
            'Authorization': 'Bearer '+token
        }})
        .then(response => {
            console.log(response.data);
            switch (response.status) {
                case 200: //OK
                    this.commit("todolist/addList", response.data);
                    return true;
                case 422: //UNAUTHORIZED
                    return false;
            }
        })
        .catch(function (error)
        {
            console.log("The error is : " + error.response);
        });
}