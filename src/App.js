import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { ImageUpload } from "./imageupload";
import Menu from "./Menu";
import Login from "./Login";
import SignUp from "./SignUp";
import Dashboard from "./Dashboard";

function setToken(userToken) {
  sessionStorage.setItem('userToken', JSON.stringify(userToken));
}

function getToken() {
  return sessionStorage.getItem('userToken');
}

function App() {
  const token = getToken();

  return (
    <>
      <Router>
      {token && <Menu />}
        <Routes>
          <Route path="/" element={!token ? <Login /> : <Dashboard />} />
          <Route path="/signup" element={!token ? <SignUp /> : <Dashboard />} />
          <Route path="/home" element={token ?  <Dashboard /> : <Login />} />
          <Route path="/imageupload" element={token ? <ImageUpload /> : <Login />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
