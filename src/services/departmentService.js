import axios from "axios";

const url = "http://localhost:8080/webapi/departments";


export default class DepartmentService{
    async getAll(config){
        return axios.get(`${url}`,config);
    }

    async getAllByRole(config){
        return axios.get(`${url}`,config);
    }

    async getByName(config,name, facultyId){
        return axios.get(`${url}/filter?name=${name}&facultyId=${facultyId}`,config);
    }
}