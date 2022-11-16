import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});
export const getCurrentUser = () =>
  instance
    .get("/user/currentuser")
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      if (error instanceof axios.AxiosError && error.response?.status === 401) {
        return null;
      } else {
        throw error;
      }
    });

export const login = ({ email, password }) =>
  instance
    .post("/auth/login", {
      username: email,
      password,
    })
    .then((res) => {
      window.localStorage.setItem("token", res.data.token);
      return res.data;
    });

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

export const getMovie = ({
  queryKey: [, { sort, searchText, sortOrder, limit, skip = 0 }],
}) => {
  return instance
    .get("/movies", {
      params: {
        skip,
        limit: limit ?? 10,
        searchText: searchText || null,
        sort: sort || "year",
        sortOrder: sortOrder || "asc",
      },
    })
    .then((res) => res.data);
};

/**
 * @param {string} token
 */
export const storeJwt = (token) => {
  instance.interceptors.request.use((req) => {
    req.headers.Authorization = `Bearer ${token}`;
    return req;
  });
};
