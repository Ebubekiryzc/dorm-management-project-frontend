import { combineReducers } from "redux";
import { userLoginReducer } from "./reducers/userReducer.js";

const rootReducer = combineReducers({
    userLogin: userLoginReducer
});

export default rootReducer;