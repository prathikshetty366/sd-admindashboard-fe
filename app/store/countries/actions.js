import {
    GET_COUNTRIES,
    GET_COUNTRIES_FAILED,
    GET_COUNTRIES_INIT,
    GET_COUNTRIES_SUCCESS,
} from "./actionTypes";


export const getCountries = (data) => {
    return {
        type: GET_COUNTRIES,
        payload: data,
    };
};

export const getCountriesSuccess = (data) => {
    return {
        type: GET_COUNTRIES_SUCCESS,
        payload: data,
    };
};

export const getCountriesFailed = (data) => {
    return {
        type: GET_COUNTRIES_FAILED,
        payload: data,
    };
};
export const getCountriesInit = (data) => {
    return {
        type: GET_COUNTRIES_INIT,
        payload: data,
    };
};