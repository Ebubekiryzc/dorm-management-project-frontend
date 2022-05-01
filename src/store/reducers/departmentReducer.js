import { DEPARTMENT_LIST_REQUEST, DEPARTMENT_LIST_SUCCESS, DEPARTMENT_LIST_FAIL } from "../actions/departmentActions";
import { departments } from "../initialValues/departments";

const initialState = {
    departments: departments,
}

export function departmentListReducer(state = initialState, { type, payload }) {
    switch (type) {
        case DEPARTMENT_LIST_REQUEST:
            return { loading: true };
        case DEPARTMENT_LIST_SUCCESS:
            return { loading: false, departments: payload };
        case DEPARTMENT_LIST_FAIL:
            return { loading: false, error: payload };
        default:
            return state;
    }
}