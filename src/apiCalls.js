import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

export const login = ({ email, password }) =>
    instance
    .post("/auth/login", {
        username: email,
        password,
    })
    .then((res) => res.data);