import { INDIVIDUAL_USER_DETAIL_FAIL, INDIVIDUAL_USER_DETAIL_REQUEST, INDIVIDUAL_USER_DETAIL_SUCCESS, INDIVIDUAL_USER_DETAIL_RESET } from "../actions/individualUserActions";
import { individualUserDetails } from "../initialValues/individualUsers";

const initialState = {
    userDetail: individualUserDetails,
}

export const individualUserDetailReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case INDIVIDUAL_USER_DETAIL_REQUEST:
            return { loading: true }
        case INDIVIDUAL_USER_DETAIL_SUCCESS:
            return { loading: false, userDetail: payload }
        case INDIVIDUAL_USER_DETAIL_FAIL:
            return { loading: false, error: payload }
        case INDIVIDUAL_USER_DETAIL_RESET:
            return { userDetail: {}};
        default:
            return state;
    }
}