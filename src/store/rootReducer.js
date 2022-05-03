import { combineReducers } from "redux";
import { studentListReducer, studentReportReducer, studentDeleteReducer, studentUpdateReducer } from "./reducers/studentReducer.js";
import { staffListReducer } from "./reducers/staffReducer.js";
import { genderListReducer } from "./reducers/genderReducer.js";
import { authLoginReducer, registerStudentReducer } from "./reducers/authReducer.js";
import { departmentListReducer } from "./reducers/departmentReducer.js";
import { operationClaimListReducer } from "./reducers/operationClaimReducer.js";
import { individualUserDetailReducer } from "./reducers/individualUserReducer.js";
import { activeDayOffListReducer, dayOffListReducer, userActiveDayOffListReducer, userDayOffListReducer } from "./reducers/dayOffReducer.js";

const rootReducer = combineReducers({
    userLogin: authLoginReducer,
    registerStudent: registerStudentReducer,
    userDetails: individualUserDetailReducer,
    genderList: genderListReducer,
    departmentList: departmentListReducer,
    operationClaimList: operationClaimListReducer,
    studentList: studentListReducer,
    studentReport: studentReportReducer,
    studentDelete: studentDeleteReducer,
    studentUpdate: studentUpdateReducer,
    staffList: staffListReducer,
    dayOffList: dayOffListReducer,
    activeDayOffList: activeDayOffListReducer,
    userDayOffList: userDayOffListReducer,
    userActiveDayOffList: userActiveDayOffListReducer,
});

export default rootReducer;