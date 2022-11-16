import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovie } from "../../apiCalls";

function HomePage({ onChange, fetching }) {
  const [movie, setMovie] = useState("");
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("year");
  const [sortOrder, setSortOrder] = useState("desc");
  const [limit, setLimit] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);

  const {
    data: movies,
    refetch,
    isFetching,
  } = useQuery(["movies", filters], getMovie, {
    staleTime: Infinity,
    keepPreviousData: true,
    suspense: true,
    useErrorBoundary: true,
  });

  // const changeMovie = (e) => {
  //   setMovie(e.target.value);
  // };
  const onSubmit = (e) => {
    e.preventDefault();
    setFilters({
      searchText: movie,
      sortOrder,
      sort,
      limit,
      skip: (pageNumber - 1) * limit,
    });
    //refetch();
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
          <div className="row">
            <div className="col col-4">
              <input
                className="form-control mr-sm-2"
                type="search"
                value={movie}
                onChange={(e) => setMovie(e.target.value)}
                placeholder="Search"
                aria-label="Search"
              />
            </div>
            <div className="col col-2">
              <select
                name="sort"
                id="sort"
                className="form-control"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="year">Year</option>
                <option value="genres">Genre</option>
                <option value="cast">Cast</option>
                <option value="title">Title</option>
                <option value="imdb.rating">Imdb.rating</option>
              </select>
            </div>
            <div className="col col-2">
              <select
                name="sortOrder"
                id="sortOrder"
                className="form-control"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
            <div className="col col-1">
              <input
                type="number"
                value={limit}
                onChange={(e) => setLimit(Number.parseInt(e.target.value))}
                className="form-control"
              />
            </div>
            <div className="col col-1">
              <input
                type="number"
                value={pageNumber}
                onChange={(e) => setPageNumber(Number.parseInt(e.target.value))}
                className="form-control"
                min={1}
              />
            </div>
            <div className="col col-2">
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                style={{ width: "100%" }}
                type="submit"
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </nav>
      <div className="container">
        {movies.map((movie) => (
          <div
            className="card"
            style={{
              width: "18rem",
              height: 300,
              overflow: "hidden",
              display: "inline-block",
              margin: "14px",
              padding: "18px",
            }}
          >
            <img
              className="card-img-top"
              src={movie.poster}
              style={{ height: 150 }}
              alt="Card image cap"
            ></img>
            <div className="card-body">
              <h5 className="card-title">{movie.title}</h5>
              <p
                className="card-text"
                style={{
                  height: 27,
                  display: "inline-block",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  marginBottom: 0,
                  overflowX: "clip",
                }}
              >
                {movie.plot}
              </p>
              <a href="#" className="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
