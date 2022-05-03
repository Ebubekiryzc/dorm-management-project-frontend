import axios from "axios";
const url = "http://localhost:8080/webapi/students";

export default class StudentService {
    async getAllStudentDetails(config) {
        return axios.get(`${url}/`, config);
    }

    async getAllStudentsByFullName(config, firstName, lastName) {
        return axios.get(`${url}/filter?first_name=${firstName}&last_name=${lastName}`, config);
    }

    async getAllStudentsByFirstName(config, firstName) {
        return axios.get(`${url}/filter?first_name=${firstName}`, config);
    }

    async filterStudentsByLastName(config, lastName) {
        return axios.get(`${url}/filter?last_name=${lastName}`, config);
    }

    async exportStudents(config) {
        return axios.get(`${url}/export_report`, config);
    }

    async deleteStudent(config, student) {
        return axios.post(`${url}/delete`, student, config);
    }

    async updateStudent(config, studentRegisterDto) {
        return axios.post(`${url}/update`, studentRegisterDto, config);
    }
}