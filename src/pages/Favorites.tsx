import React, { useEffect, useState } from "react";
import { Beer } from "../types/beer";
import BeerCard from "../components/BeerCard";
import useApi from "../hooks/useApi";

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<Beer[]>([]);
  const [updatedBeers, setUpdatedBeers] = useState<{ [key: number]: boolean }>(
    {}
  );
  const { response, isLoading, error, makeRequest } = useApi<Beer[]>();

  useEffect(() => {
    const storedFavorites: Beer[] = JSON.parse(
      localStorage.getItem("punkBeerFavorites") || "[]"
    );
    const beerIds = storedFavorites.map((beer) => beer.id).join("|");

    if (beerIds) {
      makeRequest("GET", `?ids=${beerIds}`);
    }
  }, []);

  useEffect(() => {
    if (response) {
      const storedFavorites: Beer[] = JSON.parse(
        localStorage.getItem("punkBeerFavorites") || "[]"
      );
      const updates = response.reduce<{ [key: number]: boolean }>(
        (acc, currentBeer) => {
          const storedBeer = storedFavorites.find(
            (b) => b.id === currentBeer.id
          );
          const isUpdated =
            storedBeer &&
            JSON.stringify(storedBeer) !== JSON.stringify(currentBeer);
          acc[currentBeer.id] = !!isUpdated;
          return acc;
        },
        {}
      );

      setFavorites(response);
      setUpdatedBeers(updates);
    }
  }, [response]);

  return (
    <div className="container mt-4">
      <h2>Favorites</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : favorites.length === 0 ? (
        <p>You have no favorite beers yet.</p>
      ) : (
        <div className="row">
          {favorites.map((beer) => (
            <BeerCard
              key={beer.id}
              beer={beer}
              isUpdated={updatedBeers[beer.id]}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
