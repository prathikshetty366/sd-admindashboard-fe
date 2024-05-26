import {

  GET_COUNTRIES_SUCCESS,
  GET_COUNTRIES_FAILED,
  GET_COUNTRIES,
  GET_COUNTRIES_INIT
} from "./actionTypes";

const initialState = {
  status: null,
  data: [],
  allCountries: null,
  fetchCountriesSuccess: false,
  fetchCountriesFailure: false,
  loading: false,
};

const countryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        loading: true
      }
    case GET_COUNTRIES_SUCCESS: {
      return {
        ...state,
        allCountries: action.payload,
        fetchCountriesSuccess: true,
        fetchCountriesFailure: false,
        loading:false
      };
    }

    case GET_COUNTRIES_FAILED: {
      return {
        ...state,
        allCountries: null,
        fetchCountriesSuccess: false,
        fetchCountriesFailure: true,
        loading:FontFaceSetLoadEvent
      };
    }
    case GET_COUNTRIES_INIT:{
      return{
        ...state,
        fetchCountriesSuccess: false,
        fetchCountriesFailure: false,
      }
    }

    default:
      return state;
  }
};

export default countryReducer;