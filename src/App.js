// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage"; // Make sure the path matches where you've saved HomePage
import { ImageUpload } from "./imageupload";
import Menu from "./Menu";

const App = () => {
  return (
    <Router>
      <Menu />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/imageupload" element={<ImageUpload />} />
      </Routes>
    </Router>
  );
};

export default App;
