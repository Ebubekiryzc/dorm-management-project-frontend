import axios from "axios";

const url = "http://localhost:8080/webapi/day_offs";


export default class DayOffService {
    async getAllWithRole(config, role) {
        return axios.get(`${url}/with_access_level/${role}`, config);
    }

    async getAllByUserId(config, userId) {
        return axios.get(`${url}/get_by_user_id/${userId}`, config);
    }

    async createDayOff(config, dayOff) {
        return axios.post(`${url}`, dayOff, config);
    }

    async deleteDayOff(config, dayOff) {
        return axios.post(`${url}/delete`, dayOff, config);
    }

    // TODO: Burası değişebilir.
    async createDayOffForUser(config, userId, dayOff) {
        return axios.post(`${url}/add_to_user/${userId}`, dayOff, config);
    }

    async deleteDayOffForUser(config, userId, dayOff) {
        return axios.post(`${url}/delete_from_user/${userId}`, dayOff, config);
    }
}