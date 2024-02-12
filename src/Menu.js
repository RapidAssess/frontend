// Menu.js
import React from "react";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import RouteIcon from "@mui/icons-material/Route";

const Menu = () => {
  return (
    <nav className="bg-black p-4 flex sticky top-0">
      <IconButton color="inherit">
        <RouteIcon style={{ color: "white", fontSize: "2rem" }} />
      </IconButton>
      <ul className="list-none flex md:flex md:flex-grow flex-row justify-start space-x-1 m-3">
        <li className="mr-4">
          <Link
            to="/"
            className="text-white px-4 py-2 border border-white rounded transition duration-300 ease-in-out hover:bg-white hover:text-black"
          >
            Home
          </Link>
        </li>
        <li className="mr-4">
          <Link
            to="/imageupload"
            className="text-white px-4 py-2 border border-white rounded transition duration-300 ease-in-out hover:bg-white hover:text-black"
          >
            Image Upload
          </Link>
        </li>
      </ul>
      <ul className="list-none flex md:flex md:flex-grow flex-row justify-end space-x-1 m-3">
        <li className="mr-4">
          <Link
            to="/login"
            className="text-white px-4 py-2 transition duration-300 ease-in-out"
          >
            {"Sign in"}
          </Link>
        </li>
        <li className="mr-4">
          <Link
            to="/signup"
            className="text-white px-4 py-2 border border-white rounded transition duration-300 ease-in-out hover:bg-white hover:text-black"
          >
            {"Sign up"}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
