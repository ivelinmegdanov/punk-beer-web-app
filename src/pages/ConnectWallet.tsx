import React from "react";
import { useConnect } from "wagmi";

const ConnectWallet: React.FC = () => {
  const { connect, connectors, error } = useConnect();

  return (
    <div className="container mt-5 text-center d-flex flex-column align-items-center">
      <h2 className="mb-4">Connect Your Wallet</h2>
      <div className="d-grid gap-2 w-100" style={{ maxWidth: "300px" }}>
        {connectors.map((connector) => (
          <button
            key={connector.id}
            className="btn btn-primary btn-lg"
            onClick={() => connect({ connector })}
          >
            Connect with {connector.name}
          </button>
        ))}
      </div>
      {error && (
        <div className="mt-3 text-danger w-100" style={{ maxWidth: "300px" }}>
          {error.message}
        </div>
      )}
    </div>
  );
};

export default ConnectWallet;
