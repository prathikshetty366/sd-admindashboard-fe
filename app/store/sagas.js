import { all } from "redux-saga/effects";
import todoSaga from "./todo/saga";

export default function* rootSaga() {
  yield all([todoSaga()]);
}
