import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const isNew = localStorage.getItem("persist:root");
const USER = isNew ? JSON.parse(localStorage.getItem("persist:root")).user : "";
const CURRENT_USER = USER && JSON.parse(USER).currentUser;
const TOKEN = CURRENT_USER ? CURRENT_USER.accessToken : "";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
