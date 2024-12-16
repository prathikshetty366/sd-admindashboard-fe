import {
  GET_TODO_LIST,
  GET_TODO_LIST_FAILURE,
  GET_TODO_LIST_SUCCESS,
} from "./actionTypes";
//return corr actions-actiontype and payload+

export const getTodoList = (data) => {
  return {
    type: GET_TODO_LIST,
    payload: data,
  };
};

export const getTodoListSuccess = (data) => {
  return {
    type: GET_TODO_LIST_SUCCESS,
    payload: data,
  };
};

export const getTodoListFailure = (data) => {
  return {
    type: GET_TODO_LIST_FAILURE,
    payload: data,
  };
};
