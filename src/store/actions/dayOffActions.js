import { toast } from "react-toastify";
import DayOffService from "../../services/dayOffService";

export const USER_DAYOFF_LIST_REQUEST = "USER_DAYOFF_LIST_REQUEST";
export const USER_DAYOFF_LIST_SUCCESS = "USER_DAYOFF_LIST_SUCCESS";
export const USER_DAYOFF_LIST_FAIL = "USER_DAYOFF_LIST_FAIL";

export const DAYOFF_LIST_REQUEST = "DAYOFF_LIST_REQUEST"
export const DAYOFF_LIST_SUCCESS = "DAYOFF_LIST_SUCCESS"
export const DAYOFF_LIST_FAIL = "DAYOFF_LIST_FAIL"

export const DAYOFF_CREATE_REQUEST = "DAYOFF_CREATE_REQUEST"
export const DAYOFF_CREATE_SUCCESS = "DAYOFF_CREATE_SUCCESS"
export const DAYOFF_CREATE_FAIL = "DAYOFF_CREATE_FAIL"

const dayOffService = new DayOffService();

export const listDayOffsWithRole = (role) => async (dispatch, getState) => {
    try {
        dispatch({ type: DAYOFF_LIST_REQUEST });

        const {
            userLogin: { userInfo }
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo}`
            }
        };

        const { data } = await dayOffService.getAllWithRole(config, role);

        dispatch({ type: DAYOFF_LIST_SUCCESS, payload: data.entity });
    } catch (error) {
        dispatch({ type: DAYOFF_LIST_FAIL, payload: error.response && error.response.data ? error.response.data : error.message });
    }
}

//TODO: Normalde yukarıdaki fonskiyon öğrenciler için sadece kendi izinlerini getirecek şekilde ayarlanabilir. Ancak stafflar için bu şekilde ayarlanamıyor.
// Yukarıdaki fonksiyon ile sadece kendi izinlerini alırken sıkıntı yaşarlar.
export const listUserDayOffs = () => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_DAYOFF_LIST_REQUEST });

        const {
            userDetails: { userDetail }
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const { data } = await dayOffService.getAllByUserId(config, userDetail.userId);

        dispatch({ type: USER_DAYOFF_LIST_SUCCESS, payload: data.entity });
    } catch (error) {
        dispatch({ type: USER_DAYOFF_LIST_FAIL, payload: error.response && error.response.data ? error.response.data : error.message });
    }
}

export const listUserActiveDayOffs = () => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_DAYOFF_LIST_REQUEST });

        const {
            userDetails: { userDetail }
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const { data } = await dayOffService.getAllByUserId(config, userDetail.userId);

        dispatch({ type: USER_DAYOFF_LIST_SUCCESS, payload: data.entity });
    } catch (error) {
        dispatch({ type: USER_DAYOFF_LIST_FAIL, payload: error.response && error.response.data ? error.response.data : error.message });
    }
}

export const createDayOff = (dayOff) => async (dispatch, getState) => {
    try {
        dispatch({ type: DAYOFF_CREATE_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const { data } = await dayOffService.createDayOff(config, dayOff);

        dispatch({ type: DAYOFF_CREATE_SUCCESS, payload: data.message });
        if (data.success)
            toast.success(data.message);
        else
            toast.error(data.message);
    } catch (error) {
        dispatch({ type: DAYOFF_CREATE_FAIL, payload: error.response && error.response.data ? error.response.data : error.message });
        toast.error(error.response.data);
    }
}
