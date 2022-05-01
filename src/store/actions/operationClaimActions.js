import OperationClaimService from "../../services/operationClaimService";

export const OPERATION_CLAIM_LIST_REQUEST = "OPERATION_CLAIM_LIST_REQUEST";
export const OPERATION_CLAIM_LIST_SUCCESS = "OPERATION_CLAIM_LIST_SUCCESS";
export const OPERATION_CLAIM_LIST_FAIL = "OPERATION_CLAIM_LIST_FAIL";

const operationClaimService = new OperationClaimService();

export const listOperationClaims = () => async (dispatch, getState) => {
    try {
        dispatch({ type: OPERATION_CLAIM_LIST_REQUEST });

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo}`
            }
        }

        const { data } = await operationClaimService.getAll(config);

        dispatch({ type: OPERATION_CLAIM_LIST_SUCCESS, payload: data.entity });

    } catch (error) {
        dispatch({ type: OPERATION_CLAIM_LIST_FAIL, payload: error.response && error.response.data ? error.response.data : error.message });
    }
}


export const getClaimByName = (claimName) => async (dispatch, getState) => {
    try {
        dispatch({ type: OPERATION_CLAIM_LIST_REQUEST });

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo}`
            }
        }

        const { data } = await operationClaimService.getByName(config, claimName);

        dispatch({ type: OPERATION_CLAIM_LIST_SUCCESS, payload: data.entity });

    } catch (error) {
        dispatch({ type: OPERATION_CLAIM_LIST_FAIL, payload: error.response && error.response.data ? error.response.data : error.message });
    }
}
