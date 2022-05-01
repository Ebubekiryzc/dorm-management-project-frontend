import { combineReducers } from "redux";
import { studentListReducer, studentReportReducer, studentDeleteReducer } from "./reducers/studentReducer.js";
import { staffListReducer } from "./reducers/staffReducer.js";
import { genderListReducer } from "./reducers/genderReducer.js";
import { authLoginReducer, registerStudentReducer } from "./reducers/authReducer.js";
import { departmentListReducer } from "./reducers/departmentReducer.js";
import { operationClaimListReducer } from "./reducers/operationClaimReducer.js";

const rootReducer = combineReducers({
    userLogin: authLoginReducer,
    registerStudent: registerStudentReducer,
    genderList: genderListReducer,
    departmentList: departmentListReducer,
    operationClaimList: operationClaimListReducer,
    studentList: studentListReducer,
    studentReport: studentReportReducer,
    studentDelete: studentDeleteReducer,
    staffList: staffListReducer,
});

export default rootReducer;