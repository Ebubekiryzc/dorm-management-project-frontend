import axios from "axios";

const url = "http://localhost:8080/webapi/individual_users";


export default class IndividualUserService {
    async getDetailsById(id) {
        return axios.get(`${url}/${id}`);
    }
}