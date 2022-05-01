import StaffService from "../../services/staffService";

export const STAFF_LIST_REQUEST = "STAFF_LIST_REQUEST";
export const STAFF_LIST_SUCCESS = "STAFF_LIST_SUCCESS";
export const STAFF_LIST_FAIL = "STAFF_LIST_FAIL";
export const STAFF_LIST_RESET = "STAFF_LIST_RESET";

const staffService = new StaffService();

export const listStaffs = () => async (dispatch, getState) => {
    try {
        dispatch({ type: STAFF_LIST_REQUEST });

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo}`
            }
        }

        const { data } = await staffService.getAllStaffDetails(config);

        dispatch({ type: STAFF_LIST_SUCCESS, payload: data.entity });
    } catch (error) {
        dispatch({ type: STAFF_LIST_FAIL, payload: error.response && error.response.data ? error.response.data : error.message });
    }
}

export const filterStaffsByFullName = (firstName, lastName) => async (dispatch, getState) => {
    try {
        dispatch({ type: STAFF_LIST_RESET });
        dispatch({ type: STAFF_LIST_REQUEST });

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo}`
            }
        }

        const { data } = await staffService.getAllStaffsByFullName(config, firstName, lastName);

        dispatch({ type: STAFF_LIST_SUCCESS, payload: data.entity });

    } catch (error) {
        dispatch({ type: STAFF_LIST_FAIL, payload: error.response && error.response.data ? error.response.data : error.message });
    }
}

export const filterStaffsByFirstName = (firstName) => async (dispatch, getState) => {
    try {
        dispatch({ type: STAFF_LIST_RESET });
        dispatch({ type: STAFF_LIST_REQUEST });

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo}`
            }
        }

        const { data } = await staffService.getAllStaffsByFirstName(config, firstName);

        dispatch({ type: STAFF_LIST_SUCCESS, payload: data.entity });

    } catch (error) {
        dispatch({ type: STAFF_LIST_FAIL, payload: error.response && error.response.data ? error.response.data : error.message });
    }
}

export const filterStaffsByLastName = (lastName) => async (dispatch, getState) => {
    try {
        dispatch({ type: STAFF_LIST_RESET });
        dispatch({ type: STAFF_LIST_REQUEST });

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo}`
            }
        }

        const { data } = await staffService.filterStaffsByLastName(config, lastName);

        dispatch({ type: STAFF_LIST_SUCCESS, payload: data.entity });

    } catch (error) {
        dispatch({ type: STAFF_LIST_FAIL, payload: error.response && error.response.data ? error.response.data : error.message });
    }
}