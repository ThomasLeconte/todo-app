import axios from 'axios';

export function login(context, data){
    console.log(context);
    axios.post("http://138.68.74.39/api/login?email="+data.email+"&password="+data.password)
    .then( response => {
        console.log(response);
        switch(response.status){
            case 200: //OK
            context.commit('loadProfile', response.data);
            break;
            case 401: //UNAUTHORIZED
            context.commit('ERROR_AUTHENTICATED', response.data);
            break;
        }
    })

}