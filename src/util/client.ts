import axios from "axios";

const env = process.env;
const client = axios.create({
  baseURL: env.API_URL,
  headers: { "Content-Type": "application/json" },
});

export default client;
