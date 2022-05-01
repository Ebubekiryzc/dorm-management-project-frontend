import axios from "axios";

const url = "http://localhost:8080/webapi/operation_claims";


export default class OperationClaimService {
    async getAll(config) {
        return axios.get(`${url}`, config);
    }

    async getByName(config, name) {
        return axios.get(`${url}/by_name/${name}`, config);
    }
}