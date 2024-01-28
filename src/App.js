import React from "react";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Play from "./pages/Play";
import Wordbank from "./pages/Wordbank";
import Rules from "./pages/Rules";

import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/play" element={<Play />} />
        <Route path="/wordbank" element={<Wordbank />} />
        <Route path="/rules" element={<Rules />} />
      </Routes>
    </Router>
  );
};

export default App;
