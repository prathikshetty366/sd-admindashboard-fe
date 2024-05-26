import { all } from "redux-saga/effects";
import countrySaga from "./countries/saga";

export default function* rootSaga() {
yield all([countrySaga()]);
}