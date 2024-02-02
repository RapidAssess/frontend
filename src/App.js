import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ImageUpload } from "./imageupload";
import Menu from "./Menu";

const App = () => {
  return (
    <Router>
      <Menu />
      <Routes>
        <Route path="/" />
        <Route path="/imageupload" element={<ImageUpload />} />
      </Routes>
    </Router>
  );
};

export default App;
