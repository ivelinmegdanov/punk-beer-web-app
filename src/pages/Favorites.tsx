import React, { useEffect, useState } from "react";
import { useReadContract } from "wagmi";
import { wagmiContractConfig } from "../config/wagmiConfig";
import BeerCard from "../components/BeerCard";
import Loader from "../components/common/Loader";
import { Beer } from "../types/beer";

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<Beer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIds, setCurrentIds] = useState<number[]>([]);
  const [updatedBeers, setUpdatedBeers] = useState<{ [key: number]: boolean }>(
    {}
  );

  const currentId = currentIds[0];
  const {
    data,
    error,
    isLoading: isContractLoading,
  } = useReadContract({
    ...wagmiContractConfig,
    functionName: "getBeer",
    args: [currentId],
  });

  useEffect(() => {
    const storedFavorites: number[] = JSON.parse(
      localStorage.getItem("punkBeerFavorites") || "[]"
    ).map((fav: Beer) => fav.id);
    setCurrentIds(storedFavorites);
  }, []);

  useEffect(() => {
    if (!isContractLoading && currentId !== undefined) {
      if (data) {
        const beerData: Beer = {
          id: currentId,
          name: data[0 as keyof typeof data],
          image_url: data[1 as keyof typeof data],
          brewery: data[2 as keyof typeof data],
          alcoholPercentage: Number(data[3 as keyof typeof data]),
          beerType: data[4 as keyof typeof data],
          price: Number(data[5 as keyof typeof data]),
        };
        setFavorites((prev) => [...prev, beerData]);
        checkForUpdates(favorites);
        setIsLoading(false);
      }
      if (error) {
        console.error(
          `Failed to fetch beer with ID ${currentId}: ${error.message}`
        );
      }
      setCurrentIds((ids) => ids.slice(1));
      setIsLoading(false);
    }
    setIsLoading(currentIds.length > 1);
  }, [data, error, isContractLoading, currentId, currentIds.length, favorites]);

  const checkForUpdates = (updatedFavorites: Beer[]) => {
    const storedFavorites: Beer[] = JSON.parse(
      localStorage.getItem("punkBeerFavorites") || "[]"
    );
    const updates = updatedFavorites.reduce<{ [key: number]: boolean }>(
      (acc, updatedBeer) => {
        const foundBeer = storedFavorites.find(
          (beer) => beer.id === updatedBeer.id
        );
        if (
          foundBeer &&
          JSON.stringify(foundBeer) !== JSON.stringify(updatedBeer)
        ) {
          acc[updatedBeer.id] = true;
        }
        return acc;
      },
      {}
    );

    setUpdatedBeers(updates);
  };

  if (isLoading) return <Loader />;

  return (
    <div className="container mt-4">
      <h2>Favorites</h2>
      {!isLoading && favorites.length === 0 && (
        <div>No favorite beers found.</div>
      )}
      <div className="row">
        {favorites.map((beer, index) => (
          <BeerCard
            key={index}
            beer={beer}
            isUpdated={!!updatedBeers[beer.id]}
          />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
