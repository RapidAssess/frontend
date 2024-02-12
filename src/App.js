import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ImageUpload } from "./imageupload";
import Menu from "./Menu";
import Login from "./Login";
import SignUp from "./SignUp";
import Dashboard from "./Dashboard";

const App = () => {
  return (
    <>
      <Router>
        <Menu />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/imageupload" element={<ImageUpload />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
