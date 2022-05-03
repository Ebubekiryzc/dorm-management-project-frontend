import { toast } from "react-toastify";
import StudentService from "../../services/studentService";

export const STUDENT_LIST_REQUEST = "STUDENT_LIST_REQUEST";
export const STUDENT_LIST_SUCCESS = "STUDENT_LIST_SUCCESS";
export const STUDENT_LIST_FAIL = "STUDENT_LIST_FAIL";
export const STUDENT_LIST_RESET = "STUDENT_LIST_RESET";

export const STUDENT_EXPORT_REQUEST = "STUDENT_EXPORT_REQUEST";
export const STUDENT_EXPORT_SUCCESS = "STUDENT_EXPORT_SUCCESS";
export const STUDENT_EXPORT_FAIL = "STUDENT_EXPORT_FAIL";

export const STUDENT_DELETE_REQUEST = "STUDENT_DELETE_REQUEST";
export const STUDENT_DELETE_SUCCESS = "STUDENT_DELETE_SUCCESS";
export const STUDENT_DELETE_FAIL = "STUDENT_DELETE_FAIL";

export const STUDENT_UPDATE_REQUEST = "STUDENT_UPDATE_REQUEST";
export const STUDENT_UPDATE_SUCCESS = "STUDENT_UPDATE_SUCCESS";
export const STUDENT_UPDATE_FAIL = "STUDENT_UPDATE_FAIL";

const studentService = new StudentService();

export const listStudents = () => async (dispatch, getState) => {
    try {
        dispatch({ type: STUDENT_LIST_REQUEST });

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo}`
            }
        }

        const { data } = await studentService.getAllStudentDetails(config);

        dispatch({ type: STUDENT_LIST_SUCCESS, payload: data.entity });
    } catch (error) {
        dispatch({ type: STUDENT_LIST_FAIL, payload: error.response && error.response.data ? error.response.data : error.message });
    }
}

export const filterStudentsByFullName = (firstName, lastName) => async (dispatch, getState) => {
    try {
        dispatch({ type: STUDENT_LIST_RESET });
        dispatch({ type: STUDENT_LIST_REQUEST });

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo}`
            }
        }
        console.log(firstName, "lastname: ", lastName)
        const { data } = await studentService.getAllStudentsByFullName(config, firstName, lastName);

        dispatch({ type: STUDENT_LIST_SUCCESS, payload: data.entity });
    } catch (error) {
        dispatch({ type: STUDENT_LIST_FAIL, payload: error.response && error.response.data ? error.response.data : error.message });
    }
}

export const filterStudentsByFirstName = (firstName) => async (dispatch, getState) => {
    try {
        dispatch({ type: STUDENT_LIST_RESET });
        dispatch({ type: STUDENT_LIST_REQUEST });

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo}`
            }
        }

        const { data } = await studentService.getAllStudentsByFirstName(config, firstName);

        dispatch({ type: STUDENT_LIST_SUCCESS, payload: data.entity });

    } catch (error) {
        dispatch({ type: STUDENT_LIST_FAIL, payload: error.response && error.response.data ? error.response.data : error.message });
    }
}

export const filterStudentsByLastName = (lastName) => async (dispatch, getState) => {
    try {
        dispatch({ type: STUDENT_LIST_RESET });
        dispatch({ type: STUDENT_LIST_REQUEST });

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo}`
            }
        }

        const { data } = await studentService.filterStudentsByLastName(config, lastName);

        dispatch({ type: STUDENT_LIST_SUCCESS, payload: data.entity });

    } catch (error) {
        dispatch({ type: STUDENT_LIST_FAIL, payload: error.response && error.response.data ? error.response.data : error.message });
    }
}

export const exportStudents = () => async (dispatch, getState) => {
    try {
        dispatch({ type: STUDENT_EXPORT_REQUEST });

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo}`
            }
        }

        const { data } = await studentService.exportStudents(config);

        dispatch({ type: STUDENT_EXPORT_SUCCESS, payload: data.message });
        toast.success(data);
    } catch (error) {
        dispatch({ type: STUDENT_EXPORT_FAIL, payload: error.response && error.response.data ? error.response.data : error.message });
    }
}

export const deleteStudent = (student) => async (dispatch, getState) => {
    try {
        dispatch({ type: STUDENT_DELETE_REQUEST })
        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo}`
            }
        };

        const { data } = await studentService.deleteStudent(config, student);
        dispatch({ type: STUDENT_DELETE_SUCCESS });

        toast.success(data.message);

        dispatch({
            type: STUDENT_LIST_RESET
        })

    } catch (error) {
        dispatch({ type: STUDENT_DELETE_FAIL, payload: error.response && error.response.data ? error.response.data : error.message });
    }
}


export const updateStudent = (studentRegisterDto) => async (dispatch, getState) => {
    try {
        dispatch({ type: STUDENT_UPDATE_REQUEST })
        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo}`
            }
        };

        const { data } = await studentService.updateStudent(config, studentRegisterDto);
        dispatch({ type: STUDENT_UPDATE_SUCCESS });

        toast.success(data.message);

        dispatch({
            type: STUDENT_LIST_RESET
        })

    } catch (error) {
        dispatch({ type: STUDENT_UPDATE_FAIL, payload: error.response && error.response.data ? error.response.data : error.message });
    }
}