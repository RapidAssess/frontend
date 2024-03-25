import axios from "axios";
import React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function SignUp(props) {
  const [registerForm, setRegisterForm] = useState({
    name: "",
    username: "",
    password: "",
  });

  function signMeUp(event) {
    axios({
      method: "POST",
      url: "/adduser",
      data: {
        name: registerForm.name,
        username: registerForm.username,
        password: registerForm.password,
      },
    })
      .then((response) => {
        props.setToken(response.data.access_token);
        sessionStorage.setItem("userToken", response.data["user_token"]);
        sessionStorage.setItem("userId", response.data["user_id"]);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });

    setRegisterForm({
      name: "",
      username: "",
      password: "",
    });
    event.preventDefault();
  }

  function handleChange(event) {
    const { value, name } = event.target;
    setRegisterForm((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  }

    function handleChange(event) {
        const {value, name} = event.target
        setRegisterForm(prevNote => ({
            ...prevNote, [name]: value})
    )
    }

    const SignupStyle = {
        transform: "translate(0, -50%)",
        position: "absolute",
        top: '50%',
        height: '55%',
    };


      return (
        <>
            <div className="bg-lightgray h-screen w-screen m-0 p-5 overflow-auto flex justify-center">
                <Box sx={SignupStyle} className="max-w-[512px] m-3 p-3 shadow-md">
                    <Typography variant="h5">
                        Register
                    </Typography>
                    <TextField
                        margin="normal"
                        onChange={handleChange}
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        type="text"
                        text={registerForm.name}
                        name="name"
                        value={registerForm.name}
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        onChange={handleChange}
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        autoComplete="username"
                        type="text"
                        text={registerForm.username}
                        name="username"
                        value={registerForm.username}
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        onChange={handleChange}
                        required
                        fullWidth
                        id="password"
                        label="Password"
                        type="password"
                        text={registerForm.password}
                        name="password"
                        value={registerForm.password}
                        autoFocus
                    />
                    <Button
                        onClick={signMeUp}
                        type="Submit"
                        fullWidth
                        variant="contained"

                        sx={{
                            backgroundColor: "#4E0506!important",
                            color: "white!important",
                            "&:hover": {
                                backgroundColor: "#440000!important",
                            },
                        }}
                    >
                        Register
                    </Button>
                    <Grid container className="justify-center">
                        <Grid item>
                            <Link to="/" className="text-blue-700">
                                {"Already have an account? Login"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </>
    );
}

export default SignUp;
