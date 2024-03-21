import React from "react";
import { useAccount } from "wagmi";
import ConnectWallet from "./pages/ConnectWallet";
import MainAppContent from "./App";

const ProtectedApp: React.FC = () => {
  const { isConnected } = useAccount();

  if (!isConnected) {
    return <ConnectWallet />;
  }

  return <MainAppContent />;
};

export default ProtectedApp;
