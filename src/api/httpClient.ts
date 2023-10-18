import axios from "axios";

const httpClient = axios.create({
  // baseURL: "http://localhost:8081",
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 1000, // 1 second
  headers: {
    "Content-Type": "application/json",
    // anything you want to add to the headers
  },
});

export default httpClient;
