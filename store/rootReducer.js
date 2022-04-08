import { combineReducers } from "redux";
import todoReducer from "../components/store/reducer";
const rootReducer = combineReducers({
  todoReducer: todoReducer,
});

export default rootReducer;
