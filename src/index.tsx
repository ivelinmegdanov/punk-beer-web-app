import React from "react";
import ReactDOM from "react-dom/client";
import ProtectedApp from "./ProtectedApp";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { config } from "./config/chainConfig";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <ProtectedApp />
    </QueryClientProvider>
  </WagmiProvider>
);
