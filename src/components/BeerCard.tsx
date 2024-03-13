import React from "react";
import { Beer } from "../types/beer";

interface BeerCardProps {
  beer: Beer;
}

const BeerCard: React.FC<BeerCardProps> = ({ beer }) => {
  return (
    <div className="col-md-4" key={beer.id}>
      <div className="card mb-4 shadow-sm">
        <img
          className="card-img-top mt-2"
          style={{ objectFit: "contain" }}
          width="100%"
          height="225"
          src={beer.image_url}
          alt={beer.name}
          onError={(e) =>
            (e.currentTarget.src = "https://via.placeholder.com/300x225")
          }
        />
        <div className="card-body">
          <h5 className="card-title">{beer.name}</h5>
          <p className="card-text">{beer.tagline}</p>
          <div className="d-flex justify-content-between align-items-center">
            <small className="text-muted">{beer.first_brewed}</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeerCard;
