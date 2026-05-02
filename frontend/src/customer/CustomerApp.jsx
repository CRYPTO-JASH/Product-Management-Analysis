import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Shades from "./pages/Shades.jsx";
import Trending from "./pages/Trending.jsx";

export default function CustomerApp() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/customer/shades" element={<Shades />} />
      <Route path="/customer/trending" element={<Trending />} />
    </Routes>
  );
}