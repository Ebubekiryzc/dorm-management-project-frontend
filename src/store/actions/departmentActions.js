import DepartmentService from "../../services/departmentService";

export const DEPARTMENT_LIST_REQUEST = "DEPARTMENT_LIST_REQUEST";
export const DEPARTMENT_LIST_SUCCESS = "DEPARTMENT_LIST_SUCCESS";
export const DEPARTMENT_LIST_FAIL = "DEPARTMENT_LIST_FAIL";

const departmentService = new DepartmentService();

export const listDepartments = () => async (dispatch, getState) => {
    try {
        dispatch({ type: DEPARTMENT_LIST_REQUEST });

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo}`
            }
        }

        const { data } = await departmentService.getAll(config);

        dispatch({ type: DEPARTMENT_LIST_SUCCESS, payload: data.entity });
    } catch (error) {
        dispatch({ type: DEPARTMENT_LIST_FAIL, payload: error.response && error.response.data ? error.response.data : error.message });
    }
}