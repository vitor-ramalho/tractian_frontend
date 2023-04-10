import axios, { AxiosInstance } from "axios";

const baseURL = "https://my-json-server.typicode.com/tractian/fake-api/";

const api: AxiosInstance = axios.create({
	baseURL,
});

export default api;