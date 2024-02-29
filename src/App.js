import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Menu from "./Menu";
import Login from "./Login";
import SignUp from "./SignUp";
import Dashboard from "./Dashboard";
import HomePage from "./HomePage"; // Make sure to import the HomePage component

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
                    {/* Redirect to HomePage if token exists, otherwise go to Login */}
                    <Route path="/" element={token ? <HomePage /> : <Navigate replace to="/login" />} />
                    <Route path="/login" element={!token ? <Login /> : <Navigate replace to="/" />} />
                    <Route path="/signup" element={!token ? <SignUp /> : <Navigate replace to="/" />} />
                    <Route path="/home" element={<HomePage />} />
                    {/* Other routes can go here */}
                </Routes>
            </Router>
        </>
    );
};

export default App;
