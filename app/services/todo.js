//API call using axios - Make HTTP Requests to the backend API
//we need to connect the API services to Redux
import axios from "axios";

export function fetchTodoList() {
  //encapsulate the API calls needed for frontend
  return (
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      //promise
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error("Failed to fetch todo list");
      })
  );
}
