import { all, call, fork, put, take, takeEvery } from "redux-saga/effects";
import {
    getCountriesFailed,
    getCountriesSuccess,
    setCustomerLoading,
} from "./actions";
import { GET_COUNTRIES } from "./actionTypes";
import { fetchCountries } from "@/app/services/countries";

function* getCountries( action) {
    try {
        const response = yield call(fetchCountries, action.payload);
        if (response != undefined) {
            yield put(
                getCountriesSuccess(response.data)
            );
        }
    } catch (error) {
        yield put(getCountriesFailed(error));
    } 
}

export function* watchFetchCountries() {
    yield takeEvery(GET_COUNTRIES, getCountries);
  }

function* countrySaga() {
    yield all([
        fork(watchFetchCountries),

    ]);
}

export default countrySaga;
