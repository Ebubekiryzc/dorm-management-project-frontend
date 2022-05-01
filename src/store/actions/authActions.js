import { toast } from "react-toastify";
import AuthService from "../../services/authService";

import { STUDENT_LIST_RESET } from "./studentActions";

export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAIL = "USER_LOGIN_FAIL";

export const USER_LOGOUT = "USER_LOGOUT";

export const REGISTER_STUDENT_REQUEST = "REGISTER_STUDENT_REQUEST";
export const REGISTER_STUDENT_SUCCESS = "REGISTER_STUDENT_SUCCESS";
export const REGISTER_STUDENT_FAIL = "REGISTER_STUDENT_FAIL";

const userService = new AuthService();

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

        localStorage.setItem('userInfo', JSON.stringify(data.entity))
        let jwtData = data.entity.split('.')[1];
        let decodedJwtJsonData = window.atob(jwtData);
        let decodedJwtData = JSON.parse(decodedJwtJsonData);

        localStorage.setItem('roles', decodedJwtData.roles)
        toast.success(data.message);
    } catch (error) {
        console.log(error);
        toast.error("Giriş yapılamadı.");
        dispatch({ type: USER_LOGIN_FAIL, payload: error.response.data !== undefined && error.response.data.message ? error.response.data.message : error.message });
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem("userInfo")
    localStorage.removeItem("roles")
    dispatch({ type: USER_LOGOUT })
    dispatch({ type: STUDENT_LIST_RESET })
}


export const registerStudent = (studentRegisterDto) => async (dispatch, getState) => {
    try {
        dispatch({
            type: REGISTER_STUDENT_REQUEST,
        });

        const {
            userLogin: { userInfo }
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo}`
            }
        };

        const { data } = await userService.registerStudent(config, studentRegisterDto);


        dispatch({
            type: REGISTER_STUDENT_SUCCESS,
            payload: data.entity
        })

        dispatch({
            type: STUDENT_LIST_RESET
        })

        toast.success(data.message);
    } catch (error) {
        console.log(error);
        toast.error("Giriş yapılamadı.");
        dispatch({ type: REGISTER_STUDENT_FAIL, payload: error.response.data !== undefined && error.response.data.message ? error.response.data.message : error.message });
    }
}