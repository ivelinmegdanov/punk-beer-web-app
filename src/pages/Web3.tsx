import React from "react";
import { useReadContract } from "wagmi";
import { ContractInterface } from "ethers";
import { wagmiContractConfig } from "../config/wagmiConfig";

function Home() {
  const {
    data: beerCount,
    error,
    isPending,
  } = useReadContract({
    ...wagmiContractConfig,
    functionName: "getBeerCount",
  });

  if (isPending) return <div>Loading beer count...</div>;
  if (error)
    return (
      <div>
        Error:{" "}
        {error instanceof Error ? error.message : "An unknown error occurred"}
      </div>
    );

  return <div>Total Beers: {beerCount?.toString() ?? "Loading..."}</div>;
}

export default Home;
