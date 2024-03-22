import React, { useState } from "react";
import { useWriteContract } from "wagmi";
import { wagmiContractConfig } from "../config/wagmiConfig";

const AddBeer = () => {
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    brewery: "",
    alcoholPercentage: "",
    beerType: "",
    price: "",
  });

  const {
    data: hash,
    writeContract,
    isPending,
    error,
    status,
  } = useWriteContract();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    writeContract({
      ...wagmiContractConfig,
      functionName: "addBeer",
      args: [
        formData.name,
        formData.imageUrl,
        formData.brewery,
        Number(formData.alcoholPercentage),
        formData.beerType,
        Number(formData.price),
      ],
    });
  };

  return (
    <div className="container mt-5">
      <h2>Add a New Beer</h2>
      <p className="text-muted">Status: {status}</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="imageUrl" className="form-label">
            Image URL
          </label>
          <input
            type="text"
            className="form-control"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="brewery" className="form-label">
            Brewery
          </label>
          <input
            type="text"
            className="form-control"
            id="brewery"
            name="brewery"
            value={formData.brewery}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="alcoholPercentage" className="form-label">
            Alcohol Percentage
          </label>
          <input
            type="number"
            className="form-control"
            id="alcoholPercentage"
            name="alcoholPercentage"
            value={formData.alcoholPercentage}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="beerType" className="form-label">
            Beer Type
          </label>
          <input
            type="text"
            className="form-control"
            id="beerType"
            name="beerType"
            value={formData.beerType}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={isPending}>
          Add Beer
        </button>

        {error && (
          <div className="alert mt-3 alert-danger overflow-hidden" role="alert">
            {error.message}
          </div>
        )}
        {hash && (
          <div
            className="alert mt-3 alert-success overflow-hidden"
            role="alert"
          >
            Success! Transaction hash: {hash}
          </div>
        )}
      </form>
    </div>
  );
};

export default AddBeer;
