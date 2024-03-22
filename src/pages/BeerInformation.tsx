import React, { useState } from "react";
import { useReadContract, useWriteContract } from "wagmi";
import { useParams, useNavigate } from "react-router-dom";
import { wagmiContractConfig } from "../config/wagmiConfig";
import { isValidImageUrl } from "../utils/validateImageUrl";
import Loader from "../components/common/Loader";

const BeerInformation: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [rating, setRating] = useState("");
  const navigate = useNavigate();

  const { data, error, isLoading } = useReadContract({
    ...wagmiContractConfig,
    functionName: "getBeer",
    args: [id],
  });

  const {
    data: hash,
    writeContract,
    isPending,
    error: writeError,
  } = useWriteContract();

  const handleBack = () => {
    navigate(-1);
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRating(e.target.value);
  };

  const handleRatingSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (rating) {
      writeContract({
        ...wagmiContractConfig,
        functionName: "rateBeer",
        args: [id, Number(rating)],
      });
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        Error fetching beer information: {error.message}
      </div>
    );
  }

  const beer = data
    ? {
        name: data[0 as keyof typeof data],
        image_url: data[1 as keyof typeof data],
        brewery: data[2 as keyof typeof data],
        alcoholPercentage: Number(data[3 as keyof typeof data]),
        beerType: data[4 as keyof typeof data],
        price: Number(data[5 as keyof typeof data]),
        averageRating: Number(data[6 as keyof typeof data]),
      }
    : null;

  if (!beer) {
    return (
      <div className="alert alert-danger" role="alert">
        Unable to load beer information.
      </div>
    );
  }

  const placeholderImageUrl =
    "https://upload.wikimedia.org/wikipedia/commons/c/cc/Do_not_drink_alcohol.svg";
  const imageUrl = isValidImageUrl(beer.image_url)
    ? beer.image_url
    : placeholderImageUrl;

  return (
    <>
      <div className="d-flex justify-content-center">
        <button className="btn btn-secondary mt-3" onClick={handleBack}>
          Go back
        </button>
      </div>
      <div className="card mx-auto my-5" style={{ maxWidth: "18rem" }}>
        <img
          src={imageUrl}
          className="card-img-top mt-2"
          alt={beer.name}
          style={{ objectFit: "contain", height: "200px" }}
        />
        <div className="card-body">
          <h5 className="card-title">{beer.name}</h5>
          <p className="card-text">Brewery: {beer.brewery}</p>
          <p className="card-text">Type: {beer.beerType}</p>
          <p className="card-text">
            Alcohol Percentage: {beer.alcoholPercentage}%
          </p>
          <p className="card-text">Price: ${beer.price}</p>
          {beer.averageRating && (
            <p className="card-text">Average Rating: {beer.averageRating}</p>
          )}
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <form
          className="d-flex flex-column justify-content-center"
          onSubmit={handleRatingSubmit}
        >
          <div className="mb-3">
            <label htmlFor="rating" className="form-label">
              Rate this beer (1-5)
            </label>
            <input
              type="number"
              className="form-control"
              id="rating"
              value={rating}
              onChange={handleRatingChange}
              min="1"
              max="5"
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isPending}
          >
            Submit Rating
          </button>
        </form>
      </div>
      {writeError && (
        <div className="alert mt-3 alert-danger overflow-hidden" role="alert">
          {writeError.message}
        </div>
      )}
      {hash && (
        <div className="alert mt-3 alert-success overflow-hidden" role="alert">
          Success! Transaction hash: {hash}
        </div>
      )}
    </>
  );
};

export default BeerInformation;
