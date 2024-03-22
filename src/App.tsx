import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import NavBar from "./components/NavBar";
import AddBeer from "./pages/AddBeer";
import BeerInformation from "./pages/BeerInformation";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/add-beer" element={<AddBeer />} />
        <Route path="/beer/:id" element={<BeerInformation />} />
      </Routes>
    </Router>
  );
}

export default App;
