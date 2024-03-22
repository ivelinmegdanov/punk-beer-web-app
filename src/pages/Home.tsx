import React, { useEffect, useState } from "react";
import { useReadContract } from "wagmi";
import { useNavigate } from "react-router-dom";
import BeerCard from "../components/BeerCard";
import Loader from "../components/common/Loader";
import { wagmiContractConfig } from "../config/wagmiConfig";
import { Beer } from "../types/beer";

const Home: React.FC = () => {
  const [beerDetails, setBeerDetails] = useState<Beer[]>([]);
  const [currentId, setCurrentId] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const beersPerPage = 15;
  const [totalPages, setTotalPages] = useState(0);

  const navigate = useNavigate();

  const {
    data,
    error,
    isLoading: isContractLoading,
  } = useReadContract({
    ...wagmiContractConfig,
    functionName: "getBeer",
    args: [currentId],
  });

  const {
    data: beerCount,
    error: countError,
    isLoading: isCountLoading,
  } = useReadContract({
    ...wagmiContractConfig,
    functionName: "getBeerCount",
  });

  useEffect(() => {
    if (beerCount) {
      setTotalPages(Math.ceil(Number(beerCount.toString()) / beersPerPage));
    }
  }, [beerCount]);

  useEffect(() => {
    if (!isContractLoading && !isCountLoading && data) {
      const beerData: Beer = {
        id: currentId,
        name: data[0 as keyof typeof data],
        image_url: data[1 as keyof typeof data],
        brewery: data[2 as keyof typeof data],
        alcoholPercentage: Number(data[3 as keyof typeof data]),
        beerType: data[4 as keyof typeof data],
        price: Number(data[5 as keyof typeof data]),
      };
      setBeerDetails((prevDetails) => [...prevDetails, beerData]);
      const totalBeers = Number(beerCount?.toString());

      setCurrentId((prevId) => {
        const nextId = prevId + 1;
        if (nextId >= currentPage * beersPerPage || nextId >= totalBeers) {
          setIsLoading(false);
          return prevId;
        }
        return nextId;
      });
    }
    if (error) {
      console.error(error);
      setIsLoading(false);
    }
  }, [
    data,
    error,
    isContractLoading,
    currentPage,
    beerCount,
    isCountLoading,
    currentId,
  ]);

  const fetchRandomBeer = () => {
    if (beerCount) {
      const totalBeers = Number(beerCount.toString());
      const randomId = Math.floor(Math.random() * totalBeers);
      navigate(`/beer/${randomId}`);
    }
  };

  const loadMore = () => {
    setCurrentId((prevId) => prevId + 1);
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  if (isLoading) return <Loader />;
  if (error || countError)
    return (
      <div className="alert alert-danger" role="alert">
        Error: {error ? error.message : countError?.message}
      </div>
    );
  if (!beerDetails.length) return <div>No beers found.</div>;

  return (
    <div className="container mt-4">
      <div className="input-group mb-3">
        <button className="btn btn-info" onClick={fetchRandomBeer}>
          Get Random Beer
        </button>
      </div>
      <div className="row">
        {beerDetails.map((beer, index) => (
          <BeerCard key={index} beer={beer} />
        ))}
      </div>
      <div className="d-flex justify-content-center mb-3">
        <button
          onClick={loadMore}
          className="btn btn-secondary"
          disabled={currentPage === totalPages}
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default Home;
