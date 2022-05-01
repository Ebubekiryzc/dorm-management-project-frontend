import { GENDER_LIST_REQUEST, GENDER_LIST_SUCCESS, GENDER_LIST_FAIL } from "../actions/genderActions";
import { genders } from "../initialValues/genders";

const initialState = {
    genders: genders,
}

export function genderListReducer(state = initialState, { type, payload }) {
    switch (type) {
        case GENDER_LIST_REQUEST:
            return { loading: true };
        case GENDER_LIST_SUCCESS:
            return { loading: false, genders: payload };
        case GENDER_LIST_FAIL:
            return { loading: false, error: payload };
        default:
            return state;
    }
}