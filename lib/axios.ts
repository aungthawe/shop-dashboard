import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/mini", // your OData API base
   headers: {
    Accept: "*/*",
  },
});
