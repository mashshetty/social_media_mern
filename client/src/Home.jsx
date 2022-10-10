import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import axios from "axios";
import Form from "./comp/Form";
import { AiOutlineUserAdd } from "react-icons/ai";
import "./App.css";
import Display from "./comp/display";
// import jwt from 'jsonwebtoken'
import { useJwt, isExpired, decodeToken } from "react-jwt";
import { AiOutlineLogout } from "react-icons/ai";


import "./App.css";

function Home(props) {
  const token = localStorage.getItem("inn");

  const [name, setname] = useState("");
  const [user, setuser] = useState("");
  const [frm, setfrm] = useState(false);
  const [users, setusers] = useState([]);
  const [flen, setflen] = useState("");
  const [flenn, setflenn] = useState("");

  let navigate = useNavigate();

  let following;
  let fl;
  let followers;

  useEffect(() => {
    const token = localStorage.getItem("inn");
    console.log("inside the home value of localstorage is", token);

    const data = decodeToken(token);
    console.log("decoded code is ", data);
    setuser(data.username);

    axios.get("http://localhost:5001/user").then((res) => {
      console.log("users is", res.data);
      setusers(res.data);
      res.data.filter((item) => {
        if (item.username === data.username) {
          followers = item.followers;
          following = item.following;

          console.log("flllll", followers);
          console.log("fffff", following);
          console.log("fffff length", fl);
          fl = followers.length;
          setflen(followers.length);
          setflenn(following.length);
        }
      });
    });

    axios.get(`http://localhost:5001/verify/${token}`).then((res) => {
      console.log("ver is", res.data);
      if (res.data >= 1) {
        setname(data.username);
      } else {
        navigate("/");
        localStorage.removeItem("inn");
      }
    });
  }, []);

  const log = () => {
    localStorage.removeItem("inn");
    navigate("/");
    // window.location.reload(true)
  };

  const st = () => {
    navigate("/adds");
  };
  const tt = () => {
    navigate("/addt");
  };
  const mm = () => {
    navigate("/addm");
  };
  const ff = () => {
    setfrm(!frm);
  };

  return (
  
  <>
  <h1 className="klll">Blogchat</h1>
    <div className="ot">
      
      <div className="po">
        <div className="uu">
          <span className="uk">
            {" "}
            <span className="ul">
              <AiOutlineUserAdd />
            </span>
          </span>
          <span className="name">{user}</span>
          <div className="fg">
            <span className="ff">
              <AiOutlineUserAdd /> Followers <span className="cl">{flen}</span>
            </span>
            <span className="ff">
              <AiOutlineUserAdd /> Following <span className="cl">{flenn}</span>
            </span>
          </div>
        </div>
        {!frm && (
          <p className="ap" onClick={ff}>
            add post
          </p>
        )}
        {frm && <Form ff={ff} user={user} />}
      </div>
      <div className="sec">
        <button id="io" className="btnn" onClick={log}>
          logout <span className="oo"><AiOutlineLogout/></span> 
        </button>
        {/* <h1>welcome {name} {props.name}!!</h1> */}
       
        <Display user={user} />
  
        {/* <h1>{props.in}</h1> */}
      </div>
    </div>
    <p className="cd">copy right @ 2022</p>
    </>
  );
}

export default Home;
