import React from "react";
import { Link } from "react-router-dom";
import { useAccount, useDisconnect } from "wagmi";

const Navbar = () => {
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Punk Beer App
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/favorites">
                Favorites
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add-beer">
                Add Beer
              </Link>
            </li>
            {isConnected && (
              <li className="nav-item d-flex align-items-center ms-4">
                <span className="navbar-text text-success me-2">
                  Wallet Connected!
                </span>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => disconnect()}
                >
                  Disconnect
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
