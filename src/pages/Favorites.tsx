import React, { useEffect, useState } from "react";
import axios from "axios";
import { Beer } from "../types/beer";
import BeerCard from "../components/BeerCard";

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<Beer[]>([]);
  const [updatedBeers, setUpdatedBeers] = useState<{ [key: number]: boolean }>(
    {}
  );

  useEffect(() => {
    const fetchFavorites = async () => {
      const storedFavorites: Beer[] = JSON.parse(
        localStorage.getItem("punkBeerFavorites") || "[]"
      );
      const beerIds = storedFavorites.map((beer) => beer.id).join("|");

      console.log(beerIds);

      try {
        const response = await axios.get<Beer[]>(
          `https://punkapi.devlabs-projects.com/v2/beers?ids=${beerIds}`
        );
        const latestBeers = response.data;

        const updates = latestBeers.reduce((acc, currentBeer) => {
          const storedBeer = storedFavorites.find(
            (b) => b.id === currentBeer.id
          );
          const isUpdated =
            storedBeer &&
            JSON.stringify(storedBeer) !== JSON.stringify(currentBeer);
          acc[currentBeer.id] = !!isUpdated;
          return acc;
        }, {} as { [key: number]: boolean });

        setFavorites(latestBeers);
        setUpdatedBeers(updates);
      } catch (error) {
        console.error("Failed to fetch favorite beers:", error);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Favorites</h2>
      {favorites.length > 0 ? (
        <div className="row">
          {favorites.map((beer) => (
            <React.Fragment key={beer.id}>
              <BeerCard
                key={beer.id}
                beer={beer}
                isUpdated={updatedBeers[beer.id]}
              />
            </React.Fragment>
          ))}
        </div>
      ) : (
        <p>You have no favorite beers yet.</p>
      )}
    </div>
  );
};

export default Favorites;
