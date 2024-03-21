import React, { useEffect, useState } from "react";
import { Beer } from "../types/beer";
import BeerCard from "../components/BeerCard";
import Loader from "../components/common/Loader";
import useApi from "../hooks/useApi";

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<Beer[]>([]);
  const [updatedBeers, setUpdatedBeers] = useState<{ [key: number]: boolean }>(
    {}
  );
  const { response, isLoading, error, makeRequest } = useApi<Beer[]>();

  useEffect(() => {
    const fetchFavoritesInitially = () => {
      const storedFavorites: Beer[] = JSON.parse(
        localStorage.getItem("punkBeerFavorites") || "[]"
      );
      const beerIds = storedFavorites.map((beer) => beer.id).join("|");

      if (beerIds) {
        makeRequest("GET", `?ids=${beerIds}`);
      }
    };

    fetchFavoritesInitially();
  }, [makeRequest]);

  useEffect(() => {
    const updateFavoritesFromLocalStorage = () => {
      const storedFavorites: Beer[] = JSON.parse(
        localStorage.getItem("punkBeerFavorites") || "[]"
      );
      setFavorites(storedFavorites);
    };

    if (response) {
      setFavorites(response);

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
      setUpdatedBeers(updates);
    }

    window.addEventListener(
      "favoritesUpdated",
      updateFavoritesFromLocalStorage
    );

    return () =>
      window.removeEventListener(
        "favoritesUpdated",
        updateFavoritesFromLocalStorage
      );
  }, [response]);

  return (
    <div className="container mt-4">
      <h2>Favorites</h2>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : favorites.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
          <div className="text-center">
            <p className="fs-4">You have no favorite beers yet.</p>
          </div>
        </div>
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
