import GenderService from "../../services/genderService";

export const GENDER_LIST_REQUEST = "GENDER_LIST_REQUEST";
export const GENDER_LIST_SUCCESS = "GENDER_LIST_SUCCESS";
export const GENDER_LIST_FAIL = "GENDER_LIST_FAIL";

const genderService = new GenderService();

export const listGenders = () => async (dispatch, getState) => {
    try {
        dispatch({ type: GENDER_LIST_REQUEST });

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo}`
            }
        }

        const { data } = await genderService.getAll(config);

        dispatch({ type: GENDER_LIST_SUCCESS, payload: data.entity });
    } catch (error) {
        dispatch({ type: GENDER_LIST_FAIL, payload: error.response && error.response.data ? error.response.data : error.message });
    }
}