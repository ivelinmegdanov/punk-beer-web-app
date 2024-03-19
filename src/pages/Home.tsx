import React, { useEffect, useState } from "react";
import axios from "axios";
import { Beer } from "../types/beer";
import BeerCard from "../components/BeerCard";

const Home: React.FC = () => {
  const [beers, setBeers] = useState<Beer[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBeers = async (search: string) => {
    setIsLoading(true);
    setError(null);

    const searchQueryParam = search
      ? `?beer_name=${search.replace(/\s/g, "_")}`
      : "";

    try {
      const response = await axios.get<Beer[]>(
        `https://punkapi.devlabs-projects.com/v2/beers${searchQueryParam}`
      );
      setBeers(response.data);
    } catch (error) {
      setError("Failed to fetch beers. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRandomBeer = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get<Beer[]>(
        "https://punkapi.devlabs-projects.com/v2/beers/random"
      );
      setBeers(response.data);
    } catch (error) {
      console.error("Error fetching random beer:", error);
      setError("Failed to fetch a random beer. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBeers("");
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        fetchBeers(searchTerm);
      } else {
        fetchBeers("");
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <div className="container mt-4">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search for beers..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-info" onClick={fetchRandomBeer}>
          Get Random Beer
        </button>
      </div>
      {isLoading ? (
        <div>Loading beers...</div>
      ) : error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : beers.length === 0 ? (
        <div>No matching beers found.</div>
      ) : (
        <div className="row">
          {beers.map((beer) => (
            <BeerCard key={beer.id} beer={beer} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
