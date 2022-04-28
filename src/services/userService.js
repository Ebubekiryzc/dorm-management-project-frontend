import axios from "axios";

const url = "http://localhost:8080/webapi/authenticate";

const config = {
    headers: {
        'Content-type': 'application/json'
    }
}

export default class UserService {
    async login(username, password){
        return axios.post(`${url}/login/`, {username: username, password: password}, config);
    }
}