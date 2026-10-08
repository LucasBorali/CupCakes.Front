import axios from "axios";

export const api = axios.create({
    // baseURL: "http://localhost:5068/api"
    baseURL: "https://cupcakes-5j0g.onrender.com/api"
});

api.interceptors.request.use(config => {

    const token = localStorage.getItem("token");

    if (token) {

        config.headers.Authorization =
            `Bearer ${token}`;
    }

    return config;
});