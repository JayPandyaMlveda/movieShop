import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovie } from "../../apiCalls";

function HomePage() {
    //1. use usequery and do getmovies api call using  getMovie
   

  const { data } = useQuery(["movies"], getMovie, {
    suspense: true,
    useErrorBoundary: true,
  });

  const [movie, setMovie] = useState("Search movie");
  const changeMovie = (e) => {
    setMovie(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div
      style={{
        marginInline: "auto",

        border: "1px solid",
        borderRadius: "7px",
        borderColor: "gray",
        padding: "27px",
      }}
      className="mt-4"
    >
      <nav className="navbar navbar-light bg-light">
        <form
          className="form-inline"
          style={{ display: "inline-flex", margin: "0 auto" }}
          onSubmit={onSubmit}
        >
          <input
            className="form-control mr-sm-2"
            type="search"
            value={movie}
            onChange={changeMovie}
            placeholder="Search"
            aria-label="Search"
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Search
          </button>
        </form>
      </nav>
<div className="container">
      <div className="row">
        <div className="col-3">
          <div className="card" style={{ width: "18rem" }}>
            <img className="card-img-top" src="..." alt="Card image cap"></img>
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" className="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
          <div className="card" style={{ width: "18rem" }}>
            <img className="card-img-top" src="..." alt="Card image cap"></img>
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" className="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
        </div>
      </div>
      </div>  
    </div>
  );
}

export default HomePage;
