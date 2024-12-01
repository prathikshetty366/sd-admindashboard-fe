import { combineReducers } from "redux";

import Todo from "./todo/reducer";

const rootReducer = combineReducers({
  Todo,
});

export default rootReducer;
