import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../../apiCalls";

function SignUpPage() {
  const [emailError, setEmailError] = useState();
  const navigate = useNavigate();

  const { isLoading, mutate } = useMutation(signup, {
    onError: (error) => {
      if (error instanceof AxiosError && error.response?.status === 401) {
        setEmailError("Invalid email or Password");
      } else {
        setEmailError("Something went wrong");
      }
    },
    onSuccess:() => {
        navigate("/login");
    }
  });

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");

  const [ageError, setageError] = useState();
  const [nameError, setNameError] = useState();
  const [passwordError, setPasswordError] = useState();

  const onSubmit = (e) => {
    e.preventDefault();
    if (emailError || passwordError || nameError || ageError) {
      alert("Please complete form");
      return;
    }
    mutate({ email, password,name,age:parseInt(age,10) });
  };

  return (
    <div
      style={{ marginInline: "auto", maxWidth: "500px", width: "100%" ,border:"1px solid", borderRadius:"7px",borderColor:"gray",padding:"27px" }}
      className="mt-4"
    >
      <form noValidate onSubmit={onSubmit}>
        <div className="form-outline mb-4">
          <label className="form-label" for="exampleInputName">
            Name
          </label>
          <input
            type="text"
            id="exampleInputName"
            placeholder="Enter Name"
            className={`form-control ${nameError ? "is-invalid" : ""}`}
            onChange={(e) => {
              setName(e.target.value);

              if (!e.target.value) {
                setNameError("Name is mandatory");
                
              }
              else{
                setNameError(null);
              }
            }}
          />
          {nameError && <div className="invalid-feedback">{nameError}</div>}
        </div>
        <div className="form-outline mb-4">
          <label className="form-label" for="exampleInputAge">
            Age
          </label>
          <input
            type="number"
            id="exampleInputAge"
            placeholder="Enter Age"
            className={`form-control ${ageError ? "is-invalid" : ""}`}
            onChange={(e) => {
              setAge(e.target.value);
              if (e.target.value < 18) {
                setageError("You must be 18 years old or above");
                
              }
              else{
                setageError(null);
               
              }
            }}
          />
            {ageError && <div className="invalid-feedback">{ageError}</div>}
        </div>
        <div className="form-outline mb-4">
          <label className="form-label" for="exampleInputEmail1">
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
          <label className="form-label" for="exampleInputPassword1">
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
          className={`${isLoading? "disabled": "" } btn btn-primary btn-block mb-4`}
        >
          Sign Up
        </button>

        <div className="text-center">
          <p>
            Already member ? <Link to="/login">Log In</Link>
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

export default SignUpPage;
