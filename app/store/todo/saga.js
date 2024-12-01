import {
  takeEvery,
  fork,
  put,
  all,
  call,
  takeLatest,
  take,
} from "redux-saga/effects";
import { GET_TODO_LIST } from "./actionTypes";
import { getTodoListFailure, getTodoListSuccess } from "./actions";
import { fetchTodoList } from "../../services/todo";

function* getTodoList(action) {
  try {
    const todoList = yield call(fetchTodoList); // Make API request
    if (todoList != undefined) {
      yield put(getTodoListSuccess(todoList));
    }
  } catch (err) {
    yield put(getTodoListFailure(err));
  }
}

export function* watchGetToDoList() {
  yield takeEvery(GET_TODO_LIST, getTodoList);
}

function* todoSaga() {
  yield all([fork(watchGetToDoList)]);
}

export default todoSaga;
