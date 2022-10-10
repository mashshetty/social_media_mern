import React from "react";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "./App.css";

function Reg() {
  let navigate = useNavigate();
  const [user, setuser] = useState({
    username: "",
    password: "",
    followers: [],
    following: [],
  });

  const sub = () => {
    if (
      user.username.length <= 4 ||
      user.password.length <= 4 ||
      user.username == "" ||
      user.password == ""
    ) {
      alert("username and password is too short!!");
    } else {
      const usr = axios
        .get(`http://localhost:5001/username/${user.username}`)
        .then((res) => {
          console.log("username is", res.data);
          if (res.data >= 1) {
            alert("this username is already taken...");
          } else {
            console.log("user is here", user);
            const res = axios.post("http://localhost:5001/user", {
              user: user,
            });

            console.log("reg time", res);
            alert("registerd successfully!!")
              navigate("/");

            // alert("registerd successfully!!")
            // navigate("/");
          }
        });
    }

    setuser({
      username: "",
      password: "",
    });
    console.log(user);
    console.log(user.username);
    console.log(user.password);
    console.log(user.followers);
  };

  const sett = (e) => {
    setuser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="outer">
      <div className="inner">
        <h1>Register</h1>
        <hr />
        <Box>
          <TextField
            name="username"
            value={user.username}
            onChange={(e) => {
              sett(e);
            }}
            id="outlined-basic"
            label="username"
            variant="outlined"
            required
          />{" "}
          <br />
          <br />
          <TextField
            name="password"
            value={user.password}
            onChange={(e) => {
              sett(e);
            }}
            type="password"
            id="outlined-basic"
            label="password"
            variant="outlined"
            required
          />{" "}
          <br />
          <br />
          <Button className="kl" onClick={sub} variant="contained">
            register
          </Button>
          <Link className="nj" to="/">
            Login
          </Link>
        </Box>
      </div>
    </div>
  );
}

export default Reg;
