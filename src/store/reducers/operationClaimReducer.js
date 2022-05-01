import { OPERATION_CLAIM_LIST_REQUEST, OPERATION_CLAIM_LIST_SUCCESS, OPERATION_CLAIM_LIST_FAIL } from "../actions/operationClaimActions";
import { operationClaims } from "../initialValues/operationClaims";

const initialState = {
    operationClaims: operationClaims,
}

export function operationClaimListReducer(state = initialState, { type, payload }) {
    switch (type) {
        case OPERATION_CLAIM_LIST_REQUEST:
            return { loading: true };
        case OPERATION_CLAIM_LIST_SUCCESS:
            return { loading: false, operationClaims: payload };
        case OPERATION_CLAIM_LIST_FAIL:
            return { loading: false, error: payload };
        default:
            return state;
    }
}