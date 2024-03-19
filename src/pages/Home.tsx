import React, { useEffect, useState } from "react";
import { Beer } from "../types/beer";
import BeerCard from "../components/BeerCard";
import useApi from "../hooks/useApi";
import Loader from "../components/common/Loader";

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { response: beers, error, isLoading, makeRequest } = useApi<Beer[]>();

  useEffect(() => {
    const timerId = setTimeout(() => {
      const endpoint = searchTerm
        ? `?beer_name=${searchTerm.replace(/\s/g, "_")}`
        : "";
      makeRequest("GET", endpoint);
    }, 500);

    return () => clearTimeout(timerId);
  }, [searchTerm, makeRequest]);

  const fetchRandomBeer = () => {
    makeRequest("GET", "/random");
  };

  return (
    <div className="container mt-4">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search for beers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-info" onClick={fetchRandomBeer}>
          Get Random Beer
        </button>
      </div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : beers && beers.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
          <div className="text-center">
            <p className="fs-4">No matching beers found.</p>
          </div>
        </div>
      ) : (
        <div className="row">
          {beers?.map((beer: Beer) => (
            <BeerCard key={beer.id} beer={beer} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
