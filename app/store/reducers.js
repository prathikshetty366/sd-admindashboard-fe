// rootReducer.js
import { combineReducers } from "redux";
import countryReducer from "./countries/reducers"; // Import your country reducer here

const rootReducer = combineReducers({
  country: countryReducer,
});

export default rootReducer;
