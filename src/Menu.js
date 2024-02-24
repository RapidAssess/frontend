// Menu.js
import React from "react";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import RouteIcon from "@mui/icons-material/Route";
import Button from "@mui/material/Button";

const Menu = () => {
    function logMeOut() {
        sessionStorage.setItem("userToken", null);
        sessionStorage.clear();
        console.log(sessionStorage.getItem("userToken"));
        window.location.href="/";
    }

    return (
        <nav className="bg-maroonbg p-2 flex">
            <IconButton color="inherit">
                <RouteIcon style={{ color: "white", fontSize: "2rem" }} />
            </IconButton>
            <h1 className="font-anta text-white text-xl m-3">RAPIDASSESS</h1>
            <ul className="md:flex md:flex-grow flex-row justify-start space-x-1 m-3 list-none flex m-3">
                <li className="mr-4">
                    <Link
                        to="/home"
                        className="text-white px-4 py-2 rounded transition duration-300 ease-in-out hover:bg-white hover:text-black"
                    >
                        Home
                    </Link>
                </li>
            </ul>
            <ul className="md:flex md:flex-grow flex-row justify-end space-x-1 m-3 list-none flex m-3">
                <li className="mr-4">
                    <button
                        margin="normal"
                        onClick={logMeOut}
                        type="Submit"
                        fullWidth
                        variant="contained"
                        className="text-white px-4 py-2 rounded transition duration-300 ease-in-out hover:bg-white hover:text-black"
                    >
                        Log out
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Menu;
