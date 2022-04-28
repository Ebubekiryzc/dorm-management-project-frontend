import { toast } from "react-toastify";
import UserService from "../../services/userService";

export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAIL = "USER_LOGIN_FAIL";

export const USER_LOGOUT = "USER_LOGOUT";

const userService = new UserService();

export const login = (username, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST,
        })
        const { data } = await userService.login(username, password);
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data.entity
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
        toast.success(data.message);
    } catch (error) {
        console.log(error);
        toast.error("Giriş yapılamadı.");
        dispatch({ type: USER_LOGIN_FAIL, payload: error.response & error.response.data.message ? error.response.data.message : error.message });
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT })
}
