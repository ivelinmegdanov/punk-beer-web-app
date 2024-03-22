import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Web3 from "./pages/Web3";
import NavBar from "./components/NavBar";
import AddBeer from "./pages/AddBeer";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/web3" element={<Web3 />} />
        <Route path="/add-beer" element={<AddBeer />} />
        {/* Additional routes if needed */}
      </Routes>
    </Router>
  );
}

export default App;
