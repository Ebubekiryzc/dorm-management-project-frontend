import axios from "axios";

const url = "http://localhost:8080/webapi/departments";


export default class DepartmentService{
    async getAll(config){
        return axios.get(`${url}`,config);
    }
}