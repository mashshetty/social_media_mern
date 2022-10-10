import React from "react";
import "./App.css";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useState,useEffect } from "react";
import Home from "./Home";
import axios from "axios";
import {Link} from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { useJwt, isExpired, decodeToken } from "react-jwt";

function Log(props) {


  useEffect(() => {
    const token = localStorage.getItem("inn");
    console.log("inside the home value of localstorage is", token)

    const data = decodeToken(token);
    console.log("decoded code is ",data);


   axios.get(`http://localhost:5001/verify/${token}`).then((res)=>{
    console.log("ver is",res.data)
    if(res.data >= 1){
      navigate("/home");
    }else{
          navigate("/");
          localStorage.removeItem("inn"); 
    }
   })
 
   


    
     
     

  
    
  
  }, [])

  let navigate = useNavigate();

  const [user, setuser] = useState({
    username: "",
    password: "",
  });
// console.log("log d", props)
  // const[inn,setinn] = useState(localStorage.getItem("inn"));

  // console.log(localStorage.getItem("inn"));
  // console.log(inn)

  const sub = () => {
    // localStorage.getItem("Object 1");
    // localStorage.removeItem("Object 1")
  

    const res = axios.get(`http://localhost:5001/user/${user.username}/${user.password}`).then((Response)=>{
      console.log("response data is",Response.data);
      
    if(Response.data.data){

       console.log("in inside if loop is",Response.data.data)
      alert("Login Successfull");

      // setinn(true)
      localStorage.setItem('inn', Response.data.user);
     navigate("/home");
     
    }else{
      console.log("error");
      alert("Please register!!");
      
    setuser({
      username: "",
      password: "",
    });
    }

    })








    console.log(user);
    console.log(user.username);
    console.log(user.password);


    
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


    {/* {inn &&  <Home name = {user.username} in={inn}/>} */}
      
      {/* {!inn && */}
      <Box>
        <h1>Login</h1>
        <hr />
        <TextField
          name="username"
          value={user.username}
          onChange={(e) => {
            sett(e);
          }}
          id="outlined-basic"
          label="username"
          variant="outlined"
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
        />{" "}
        <br />
        <br />
        <Button className="kl" onClick={sub} variant="contained">
            Login
        </Button>
        <Link className="nj" to="/reg">Register</Link>
      </Box>
      </div>
 
    </div>


  );
}

export default Log;
