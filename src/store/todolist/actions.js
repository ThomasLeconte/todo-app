import axios from 'axios';
const base = "http://138.68.74.39/api";

/**
 * Méthode permettant de récupérer les listes de l'utilisateur grâce à un appel API
 * @param {*} context - Contexte actuel de l'utilisateur
 */
export async function load(context) {
    let token = context.rootGetters["account/getToken"];
    axios.get(base + "/todolists", {
        headers: { 'Authorization': 'Bearer ' + token }
    }).then(response => {
        if (response.status == 200) {
            console.log(response.data);
            context.commit("setLists", response.data);
            context.commit("setSyncState");
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
export async function loadTasksOfList(context, id) {

    let token = context.rootGetters["account/getToken"];
    return axios.get(base + "/todos/" + id, {
        headers: { 'Authorization': 'Bearer ' + token }
    }).then(response => {
        if (response.status === 200) {
            return response.data;
        } else {
            return null;
        }
    })
        .catch(err => {
            console.log(err);
        })
}

/**
 * Fonction permettant d'enregister une nouvelle liste auprès de l'API
 * @param {*} context - Contexte du store existant
 * @param {*} data - Données fournies par l'utilisateur
 */
export async function newList(context, data) {
    let token = context.rootGetters["account/getToken"];
    let url = base + "/todolist?name=" + data.nameList
    return axios.post(url, { name: data.nameList }, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }).then(response => {
        if (response.status == 200) {
            this.commit("todolist/addList", response.data);
            return true;
        }
    }).catch(function (error) {
        console.log(error);
        context.commit("setErrors", { unknown: "An error has been encountered, please try again later." })
        return false;
    });
}

/**
 * Fonction permettant d'enregister une nouvelle tâche auprès de l'API
 * @param {*} context - Contexte du store existant
 * @param {*} data - Données fournies par l'utilisateur
 */
export async function newTodoTask(context, data) {
    let token = context.rootGetters["account/getToken"];
    let test = 1;
    if (data.completed) {
        test = 0;
    }
    let url = base + "/todo?name=" + data.name + "&completed=" + test + "&todolist_id=" + data.todolist_id;
    return axios.post(url, { name: data.nameList }, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }).then(response => {
        if (response.status == 200) {
            this.commit("todolist/addTodo", response.data);
            return true;
        }
    }).catch(function (error) {
        console.log(error);
        context.commit("setErrors", { unknown: "An error has been encountered, please try again later." })
        return false;
    });
}


/**
 * Fonction permettant de supprimer une liste auprès de l'API
 * @param {*} context - Contexte du store existant
 * @param {*} data - Données fournies par l'utilisateur
 */
 export async function delTodoList(context, data) {
    let token = context.rootGetters["account/getToken"];
    let url = base + "/todolist/" + data.id;
    return axios.delete(url, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }).then(response => {
        if (response.status == 200) {
            this.commit("todolist/delList", data);
            return true;
        }
    }).catch(function (error) {
        console.log(error);
        context.commit("setErrors", { unknown: "An error has been encountered, please try again later." })
        return false;
    });
}

