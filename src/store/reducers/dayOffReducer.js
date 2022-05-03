import { DAYOFF_CREATE_FAIL, DAYOFF_LIST_REQUEST, DAYOFF_LIST_SUCCESS, USER_DAYOFF_LIST_FAIL, USER_DAYOFF_LIST_REQUEST, USER_DAYOFF_LIST_SUCCESS } from "../actions/dayOffActions";
import { dayOffs } from "../initialValues/dayOffs";

const initialState = {
    dayOffs: dayOffs
}

export function dayOffListReducer(state = initialState, { type, payload }) {
    switch (type) {
        case DAYOFF_LIST_REQUEST:
            return { loading: true };
        case DAYOFF_LIST_SUCCESS:
            return { loading: false, dayOffs: payload };
        case DAYOFF_CREATE_FAIL:
            return { loading: false, error: payload };
        default:
            return state;
    }
}

export function activeDayOffListReducer(state = initialState, { type, payload }) {
    switch (type) {
        case DAYOFF_LIST_REQUEST:
            return { loading: true };
        case DAYOFF_LIST_SUCCESS:
            return { loading: false, dayOffs: payload };
        case DAYOFF_CREATE_FAIL:
            return { loading: false, error: payload };
        default:
            return state;
    }
}

export function userDayOffListReducer(state = initialState, { type, payload }) {
    switch (type) {
        case USER_DAYOFF_LIST_REQUEST:
            return { loading: true };
        case USER_DAYOFF_LIST_SUCCESS:
            return { loading: false, dayOffs: payload };
        case USER_DAYOFF_LIST_FAIL:
            return { loading: false, error: payload };
        default:
            return state;
    }
}

export function userActiveDayOffListReducer(state = initialState, { type, payload }) {
    switch (type) {
        case USER_DAYOFF_LIST_REQUEST:
            return { loading: true };
        case USER_DAYOFF_LIST_SUCCESS:
            return { loading: false, dayOffs: payload };
        case USER_DAYOFF_LIST_FAIL:
            return { loading: false, error: payload };
        default:
            return state;
    }
}