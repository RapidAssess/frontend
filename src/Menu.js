import React from "react";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import RouteIcon from "@mui/icons-material/Route";
import User from "./User";

const NavBar = () => {
    return (
        <nav className="bg-maroonbg flex w-screen">
            <IconButton color="inherit">
                <RouteIcon style={{ color: "white", fontSize: "2rem" }} />
            </IconButton>
            <h1 className="py-2 font-anta text-white text-xl mt-2.5">RAPIDASSESS</h1>
            <ul className="py-2 list-none flex justify-start m-3">
                <li className="mr-4">
                    <Link
                        to="/"
                        className="text-white px-4 py-2 rounded transition duration-300 ease-in-out hover:bg-white hover:text-black"
                    >
                        Home
                    </Link>
                </li>
            </ul>
            <ul className="md:flex md:flex-grow flex-row justify-end space-x-1 m-3 list-none flex m-3">

                <li>
                    <User />
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;