import React, { useState, useEffect } from "react";
import { Beer } from "../types/beer";
import { FaStar as StarFilled, FaRegStar as StarEmpty } from "react-icons/fa";

interface BeerCardProps {
  beer: Beer;
  isUpdated?: boolean;
}

const BeerCard: React.FC<BeerCardProps> = ({ beer, isUpdated }) => {
  const [isFavorited, setIsFavorited] = useState<boolean>(false);

  useEffect(() => {
    const favorites: Beer[] = JSON.parse(
      localStorage.getItem("punkBeerFavorites") || "[]"
    );
    const isFav = favorites.some((favBeer: Beer) => favBeer.id === beer.id);
    setIsFavorited(isFav);
  }, [beer.id]);

  const toggleFavorite = () => {
    let favorites: Beer[] = JSON.parse(
      localStorage.getItem("punkBeerFavorites") || "[]"
    );
    if (isFavorited) {
      favorites = favorites.filter((favBeer: Beer) => favBeer.id !== beer.id);
    } else {
      favorites.push(beer);
    }
    localStorage.setItem("punkBeerFavorites", JSON.stringify(favorites));
    setIsFavorited(!isFavorited);
  };

  return (
    <div className="col-md-4">
      <div className="card mb-4 shadow-sm">
        <div style={{ position: "relative" }}>
          <img
            className="card-img-top mt-2"
            style={{ objectFit: "contain" }}
            width="100%"
            height="225"
            src={
              beer.image_url ||
              "https://upload.wikimedia.org/wikipedia/commons/c/cc/Do_not_drink_alcohol.svg"
            }
            alt={beer.name}
          />
          <button
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "none",
              border: "none",
              color: isFavorited ? "#ffc107" : "rgba(0, 0, 0, 0.3)",
            }}
            onClick={toggleFavorite}
            aria-label="Toggle favorite"
          >
            {isFavorited ? <StarFilled /> : <StarEmpty />}
          </button>
        </div>
        <div className="card-body">
          <h5 className="card-title">{beer.name}</h5>
          <p className="card-text">{beer.tagline}</p>
          <div className="d-flex justify-content-between align-items-center">
            <small className="text-muted">{beer.first_brewed}</small>
            {isUpdated && <small className="text-warning">Updated!</small>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeerCard;
