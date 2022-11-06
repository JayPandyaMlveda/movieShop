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

export const signup = ({ email, password, age, name }) => {
    return instance
        .post("/auth/signup", {
            email,
            password,
            age,
            name,
        })
        .then((res) => res.data);
};

export const getMovie = () => {
    return instance
        .get("/movies", {
            params: {
                sort: "year",
                sortOrder: "desc",
            },
        })
        .then((res) => res.data);
};

export const storeJwt = (token) => {
    instance.interceptors.request.use((req) => {
        req.headers.Authorization = `Bearer ${token}`;
        return req;
    });
};