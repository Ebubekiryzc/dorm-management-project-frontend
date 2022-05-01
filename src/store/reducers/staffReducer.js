import { STAFF_LIST_REQUEST, STAFF_LIST_SUCCESS, STAFF_LIST_FAIL, STAFF_LIST_RESET } from "../actions/staffActions";
import { staffs } from "../initialValues/staffs";

const initialState = {
    staffs: staffs,
}

export function staffListReducer(state = initialState, { type, payload }) {
    switch (type) {
        case STAFF_LIST_REQUEST:
            return { loading: true };
        case STAFF_LIST_SUCCESS:
            return { loading: false, staffs: payload };
        case STAFF_LIST_FAIL:
            return { loading: false, error: payload };
        case STAFF_LIST_RESET:
            return { staffs: [] }
        default:
            return state;
    }
}