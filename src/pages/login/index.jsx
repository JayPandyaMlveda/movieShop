import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, storeJwt } from "../../apiCalls";
import { UserContext } from "../../contexts/user.context";

function LoginPage() {
  const [emailError, setEmailError] = useState();
  const [, setUser] = useContext(UserContext);
  const navigate = useNavigate();

  const { isLoading, mutate } = useMutation(login, {
    onError: (error) => {
      if (error instanceof AxiosError && error.response?.status === 401) {
        setEmailError("Invalid email or Password");
      } else {
        setEmailError("Something went wrong");
      }
    },
    onSuccess: (data) => {
      setUser(data);
      storeJwt(data.token);
      navigate("/");

    },
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [passwordError, setPasswordError] = useState();

  const onSubmit = (e) => {
    e.preventDefault();
    if (emailError || passwordError) {
      alert("Please complete form");
      return;
    }
    mutate({ email, password });
  };

  return (
    <div
      style={{
        marginInline: "auto",
        maxWidth: "500px",
        width: "100%",
        border: "1px solid",
        borderRadius: "7px",
        borderColor: "gray",
        padding: "27px",
      }}
      className="mt-4"
    >
      <form noValidate onSubmit={onSubmit}>
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="exampleInputEmail1">
            Email address
          </label>

          <input
            type="email"
            //className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={email}
            className={`form-control ${emailError ? "is-invalid" : ""}`}
            onChange={(e) => {
              setEmail(e.target.value);
              if (!e.target.value) {
                setEmailError("Please Enter Email");
                return;
              }
              const emailRg =
                /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
              if (emailRg.test(e.target.value)) {
                setEmailError(null);
                //console.log(e.target.value);
              } else {
                setEmailError("Enter valid email");
                //console.log(e.target.value);
              }
            }}
          />
          {emailError && <div className="invalid-feedback">{emailError}</div>}
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="exampleInputPassword1">
            Password
          </label>
          <input
            type="password"
            //className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            value={password}
            className={`form-control ${passwordError ? "is-invalid" : ""}`}
            onChange={(e) => {
              setPassword(e.target.value);
              if (!e.target.value) {
                setPasswordError("Please Enter Password");
                return;
              }
              const passwordCheck = e.target.value;
              if (passwordCheck.length < 7) {
                setPasswordError("Minimum length of password is 8 letter");
              } else {
                setPasswordError(null);
              }
            }}
          />
          {passwordError && (
            <div className="invalid-feedback">{passwordError}</div>
          )}
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className="btn btn-primary btn-block mb-4"
        >
          Sign in
        </button>

        <div className="text-center">
          <p>
            Not a member? <Link to="/signup">Register</Link>
          </p>

          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-facebook-f"></i>
          </button>

          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-google"></i>
          </button>

          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-twitter"></i>
          </button>

          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-github"></i>
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
