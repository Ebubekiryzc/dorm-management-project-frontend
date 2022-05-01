import axios from "axios";

const url = "http://localhost:8080/webapi/genders";


export default class GenderService{
    async getAll(config){
        return axios.get(`${url}`,config);
    }
}