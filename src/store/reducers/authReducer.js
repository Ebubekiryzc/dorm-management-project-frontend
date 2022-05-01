import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT, REGISTER_STUDENT_REQUEST, REGISTER_STUDENT_SUCCESS, REGISTER_STUDENT_FAIL } from "../actions/authActions";
import { userInfo } from "../initialValues/authLogin";

const initialState = {
    userInfo: userInfo,
}

export const authLoginReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case USER_LOGIN_REQUEST:
            return { loading: true }
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: payload }
        case USER_LOGIN_FAIL:
            return { loading: false, error: payload }
        case USER_LOGOUT:
            return {};
        default:
            return state;
    }
}

export function registerStudentReducer(state = {}, { type, payload }) {
    switch (type) {
        case REGISTER_STUDENT_REQUEST:
            return { loading: true }
        case REGISTER_STUDENT_SUCCESS:
            return { loading: false, success: true, student: payload }
        case REGISTER_STUDENT_FAIL:
            return { loading: false, error: payload }
        default:
            return state;
    }
}
