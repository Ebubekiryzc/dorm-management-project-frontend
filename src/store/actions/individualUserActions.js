import { toast } from "react-toastify";
import IndividualUserService from "../../services/individualUserService";

export const INDIVIDUAL_USER_DETAIL_REQUEST = "INDIVIDUAL_USER_DETAIL_REQUEST";
export const INDIVIDUAL_USER_DETAIL_SUCCESS = "INDIVIDUAL_USER_DETAIL_SUCCESS";
export const INDIVIDUAL_USER_DETAIL_FAIL = "INDIVIDUAL_USER_DETAIL_FAIL";
export const INDIVIDUAL_USER_DETAIL_RESET = "INDIVIDUAL_USER_DETAIL_RESET";

const individualUserService = new IndividualUserService();

export const getIndividualUserDetail = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: INDIVIDUAL_USER_DETAIL_REQUEST,
        });

        const {
            userLogin: { userInfo }
        } = getState();


        let jwtData = userInfo.split('.')[1];
        let decodedJwtJsonData = window.atob(jwtData);
        let decodedJwtData = JSON.parse(decodedJwtJsonData);

        await individualUserService.getDetailsById(decodedJwtData.userId).then((data)=>{
            dispatch({
                type: INDIVIDUAL_USER_DETAIL_SUCCESS,
                payload: data.data.entity
            });
        });


    } catch (error) {
        dispatch({ type: INDIVIDUAL_USER_DETAIL_FAIL, payload: error.response.data !== undefined && error.response.data.message ? error.response.data.message : error.message });
        toast.error("Kişi bilgileri alınamadı.");
    }
}