import axios from "axios";

const url = "http://localhost:8080/webapi/authenticate";


export default class AuthService {
    async login(username, password){
        return axios.post(`${url}/login`, {username: username, password: password});
    }

    async registerStudent(config, studentRegisterDto){
        return axios.post(`${url}/register_student`, studentRegisterDto, config);
    }
}