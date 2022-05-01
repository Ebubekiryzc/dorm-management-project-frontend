import axios from "axios";

const url = "http://localhost:8080/webapi/staffs";

export default class StaffService {
    async getAllStaffDetails(config) {
        return axios.get(`${url}/`, config);
    }

    async getAllStaffsByFullName(config, firstName, lastName) {
        return axios.get(`${url}/filter?first_name=${firstName}&last_name=${lastName}`, config);
    }

    async getAllStaffsByFirstName(config, firstName) {
        return axios.get(`${url}/filter?first_name=${firstName}`, config);
    }

    async filterStaffsByLastName(config, lastName) {
        return axios.get(`${url}/filter?last_name=${lastName}`, config);
    }
}