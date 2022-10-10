import React from 'react';
import  { useEffect, useState } from "react";
import FileBase64 from "react-file-base64";
import axios from "axios";
import moment from "moment"
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import './form.css'


function Form(props) {

  console.log(moment())
    
    const [image, setimage] = useState("");
    const [caption, setcaption] = useState("");
    const [location, setlocation] = useState("");
    // console.log(location)
    // const date = new Date();
    // let m = date.getMonth()+1;
    // let d =date.getDate();
    // let y=date.getFullYear();
    // let h = date.getHours();
    // let mm = date.getMinutes();

//     m= m.toString();
//  d=d.toString();
//  y=y.toString();
//  h=h.toString();
//  mm=mm.toString();


//  if(m.length <2){
//   m= 0+m;
//   console.log("m is ",m)
//  }

//  let dt = y+m+d+h+mm;

let dt = moment();
    

    const sub =(e)=>{
     
        e.preventDefault()

        if(image == ""){
          alert('image field cannot be null!!');
          alert("post uploaded!!");
        }
        


       
        const res = axios.post("http://localhost:5001/post/post", {
            pic: image,
            caption: caption,
            location: location,
            comments: [],
            likes:0,
            user:props.user,
            date:dt,
            
          

          
          });

          setimage("")
          setcaption("")
          setlocation("")
          props.ff();

    
 window.location.reload()
  
        
    }
    
  return (
    <div>












     
        <form className='form' action="" onSubmit={(e)=>sub(e)}>
            <p className='up'>Upload post</p>
        {/* <label className="lbxx" htmlFor="location">
          location
        </label> <br /> */}

          
<br /><TextField
          name="location"
          value={location}
          onChange={(e)=>setlocation(e.target.value)}
          type="text"
          id="outlined-basic"
          label="location"
          variant="outlined"
        /> <br /><br />


<TextField
          name="caption"
          value={caption}
          onChange={(e)=>setcaption(e.target.value)}
          type="text"
          id="outlined-basic"
          label="caption"
          variant="outlined"
        />
<br />



            {/* <input type="text" value={location} onChange={(e)=>setlocation(e.target.value)} placeholder='enter location' /> <br /> */}

        {/* <label className="lbxx" htmlFor="caption">
          caption
        </label> <br /> */}
            {/* <input type="text" value={caption} onChange={(e)=>setcaption(e.target.value)} placeholder='enter caption' /> <br /> */}
        <label className="lbxx" htmlFor="image">
        
        </label> <br />
        <FileBase64
          multiple={false}
          onDone={({ base64 }) => setimage(base64)}
        /> <br />
        <input className='btnn' type="submit" />
        </form>
    </div>
  )
}

export default Form