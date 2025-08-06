import API from "@/utils/api/api.utils";

const baseURL = "http://localhost:8081/";
// const baseURL = "https://jsonplaceholder.typicode.com/";

export const api = new API({
  baseURL,
});
