import { STUDENT_LIST_REQUEST, STUDENT_LIST_SUCCESS, STUDENT_LIST_FAIL, STUDENT_LIST_RESET, STUDENT_EXPORT_REQUEST, STUDENT_EXPORT_SUCCESS, STUDENT_EXPORT_FAIL, STUDENT_DELETE_REQUEST, STUDENT_DELETE_SUCCESS, STUDENT_DELETE_FAIL, STUDENT_CREATE_REQUEST, STUDENT_CREATE_SUCCESS, STUDENT_CREATE_FAIL, STUDENT_CREATE_RESET } from "../actions/studentActions";
import { students } from "../initialValues/students";

const initialState = {
    students: students,
}

export function studentListReducer(state = initialState, { type, payload }) {
    switch (type) {
        case STUDENT_LIST_REQUEST:
            return { loading: true };
        case STUDENT_LIST_SUCCESS:
            return { loading: false, students: payload };
        case STUDENT_LIST_FAIL:
            return { loading: false, error: payload };
        case STUDENT_LIST_RESET:
            return { students: [] }
        default:
            return state;
    }
}

export function studentReportReducer(state = {}, { type, payload }) {
    switch (type) {
        case STUDENT_EXPORT_REQUEST:
            return {};
        case STUDENT_EXPORT_SUCCESS:
            return { message: payload };
        case STUDENT_EXPORT_FAIL:
            return { message: payload }
        default:
            return state;
    }
}

export function studentDeleteReducer(state = {}, { type, payload }) {
    switch (type) {
        case STUDENT_DELETE_REQUEST:
            return { loading: true, ...state }
        case STUDENT_DELETE_SUCCESS:
            return { loading: false, success: true }
        case STUDENT_DELETE_FAIL:
            return { loading: false, error: payload }
        default:
            return state;
    }
}