import { GET_TODO_LIST_FAILURE, GET_TODO_LIST_SUCCESS } from "./actionTypes";

const INITIAL_STATE = {
  todoListSuccess: false,
  todoListData: null,
  todoListFailure: false,
  errorCode: null,
};

const Todo = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TODO_LIST_SUCCESS:
      return {
        ...state,
        todoListData: action.payload,
        todoListSuccess: true,
        todoListFailure: false,
        errorCode: null,
      };
    case GET_TODO_LIST_FAILURE:
      return {
        ...state,
        todoListSuccess: false,
        todoListFailure: true,
        todoListData: null,
        errorCode: action.payload,
      };
    default:
      return state;
  }
};

export default Todo;
