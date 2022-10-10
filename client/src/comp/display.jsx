import { Input } from "@mui/material";
import { AiOutlineHeart } from "react-icons/ai";
import { AiOutlineComment } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { AiOutlineUserAdd } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";

import axios from "axios";
import React from "react";
import Mod from "./Mod";
import moment from "moment";
import { useEffect, useState } from "react";
// import { set } from 'mongoose';

function Display(props) {
  const [post, setpost] = useState([]);
  const [comment, setcomment] = useState([]);
  const [commentt, setcommentt] = useState([]);
  const [upid, setupid] = useState([]);
  const [show, setshow] = useState(false);
  const [u, setu] = useState(false);
  const [cap, setcap] = useState("");
  const [loc, setloc] = useState("");
  const [img, setimg] = useState("");
  const [id, setid] = useState("");
  const [ld, setld] = useState(true);
  const [cls, setcls] = useState("norm");
  const [like, setlike] = useState(true);
  const [ldd, setldd] = useState("mash");
  const [user, setuser] = useState([]);
  const [scomment, sscomment] = useState("");

  console.log("props is ss", props);

  const date = new Date();
  let m = date.getMonth() + 1;
  let d = date.getDate();
  let y = date.getFullYear();
  let h = date.getHours();

  console.log("h is", h);

  m = m.toString();
  d = d.toString();
  y = y.toString();

  if (m.length < 2) {
    m = 0 + m;
    console.log("m is ", m);
  }

  let dt = y + m + d;

  console.log("user val iz", props.user);
  console.log(moment);

  useEffect(() => {
    axios.get("http://localhost:5001/post/post").then((res) => {
      console.log(res.data);
      setpost(res.data);
    });

    axios.get("http://localhost:5001/user").then((res) => {
      console.log("users is", res.data);
      setuser(res.data);
    });
  }, [ld, ldd, post]);

  let f;

  const up = (e) => {
    window.scrollTo(0, 0);
    f = post.filter((item) => {
      if (item._id === e.target.id) {
        return item;
      }
    });

    console.log("f is", f[0]);

    setcap(f[0].caption);
    setloc(f[0].location);
    setimg(f[0].pic);
    setid(f[0]._id);

    console.log("dddddd", cap);

    setu(true);

    <Mod />;
  };

  const s = () => {
    setld(!ld);
  };

  const com = async (e) => {
    e.preventDefault();
    //  document.getElementById("hj").style.display = "block"
    let g = await post.filter(async (item) => {
      if (item._id === e.target.id) {
        //  setcommentt([comment,...item.comments])

        if (comment != "") {
          const upp = await axios.put(
            `http://localhost:5001/post/post/${e.target.id}`,
            {
              comments: [...item.comments, comment],
            }
          );
        }
        // setld(!ld)
        console.log("within limits", item.comments);
        console.log("comentt", commentt);
        console.log("coment", [comment, ...item.comments]);
      }
      // else{
      //   const upp = axios.put(`http://localhost:5001/post/post/${e.target.id}`,{
      //     comments: [comment]
      //   })
      //   // setld(!ld)
      // }
    });
    //  await setcommentt((prev)=>[...prev,comment])
    console.log("comentsss", comment);
    // const upp = await axios.put(`http://localhost:5001/post/post/${e.target.id}`,{
    //   comments:commentt
    // })
    await setcomment(" ");

    setshow(false);

    // window.location.reload();

    setld(!ld);
    setldd("shetty");
  };

  let jl = "jl";

  const sh = (e) => {
    //  alert(e)
    //  document.getElementById(e).style.display = "block";
    //  document.getElementById(e).style.background = "red";

    sscomment(e);

    console.log("sscomentsssssssssssssssssssssss", typeof scomment);
    console.log("e", typeof e);
    console.log(e === scomment);

    setshow(!show);

    // alert(e)
    // alert(scomment)
  };

  let c = (e) => {
    setcomment(e.target.value);
  };

  const del = (e) => {
    axios
      .delete(`http://localhost:5001/post/post/${e.target.id}`)
      .then((res) => {
        post.filter((item) => {
          if (item._id !== e.target.id) {
            return item;
          }
        });
      });

    let gg = post.filter((item) => {
      if (item._id !== e.target.id) {
        return item;
      }
    });

    setpost(gg);
  };

  let clss;

  const lk = (e) => {
    // console.log("hiiii");

    // setlike(!like);

    // console.log(like);

    // if (like) {
    //   setcls("like");
    // } else {
    //   setcls("norm");
    // }
    let flg = true;
    console.log("id is", e);
    let ll = post.filter((item) => {
      if (item._id === e) {
        console.log(item.likes);
        console.log("entered in", props.user);
        item.likes.map((it) => {
          if (it === props.user) {
            flg = false;
            console.log("entered if");
          }
        });

        if (flg) {
          axios.put(`http://localhost:5001/post/postlike/${e}`, {
            likes: [...item.likes, props.user],
          });

          item.likes = [...item.likes, props.user];

          setpost(post);
        }

        // item.likes = item.likes + 1;

        // document.getElementById(e).style.color = "black";

        document.getElementById(e).style.color = "red";
      }
    });

    //   clss = "red"

    //  alert(clss)
  };
  let df;

  const fl = (e) => {
    let ff;

    user.filter((item) => {
      let p = true;
      item.following.map((item) => {
        if (item === e) {
          p = false;
        }
      });

      if (p) {
        if (item.username === props.user) {
          axios.put(`http://localhost:5001/follow/${props.user}`, {
            following: [...item.following, e],
          });

          item.following = [...item.following, e];
        }
      }

      user.filter((item) => {
        if (item.username === e) {
          let q = true;

          item.followers.map((item) => {
            if (item === props.user) {
              q = false;
            }
          });

          if (q) {
            axios.put(`http://localhost:5001/follow/${e}`, {
              followers: [...item.followers, props.user],
            });

            item.following = [...item.following, e];
          }
        }
      });
    });

    // console.log("entered")
    //   axios.put(`http://localhost:5001/follow/${props.user}`,{
    //     followers : [e]
    //   })
  };
  let idx;
  let gg;
  let t = false;
  clss = "yellow";
  return (
    <div className="tr">
      {u && <Mod id={id} cap={cap} loc={loc} img={img} />}
      <div className="br">
        {post.map((item) => {
          return (
            <div className="trr">
              <div className="er" key={item.key}>
                <p className="user">
                  {item.user}{" "}
                  <span className="oo">
                    <AiOutlineUserAdd />
                  </span>{" "}
                  <span onClick={(e) => fl(item.user)} className="follow">
                    follow{" "}
                    <span className="oo">
                      <AiOutlineUserAdd />{" "}
                    </span>{" "}
                  </span>
                </p>

                <p className="loc">{item.location}</p>
                <img src={item.pic} alt="" />
                <p className="cap">{item.caption}</p>
                <p className="pp">
                  {(t = false)}
                  {item.likes.map((it) => {
                    // console.log("likees era",it)
                    if (it === props.user) {
                      t = true;
                    }
                    if (t) {
                      clss = "like";
                    } else {
                      clss = "kj";
                    }
                  })}
                  <span>
                    likes {item.likes.length}{" "}
                    <span
                      id={item._id}
                      onClick={(e) => lk(item._id)}
                      className={clss}
                    >
                      <AiFillHeart />
                    </span>
                  </span>{" "}
                  <span
                    id={item._id}
                    onClick={(e) => {
                      sh(item._id);
                    }}
                  >
                    comment{" "}
                    <span id="com" className="oo">
                      <AiOutlineComment />
                    </span>
                  </span>
                </p>
                {item.user === props.user && (
                  <p className="pp">
                    <span id={item._id} onClick={(e) => up(e)}>
                      edit
                      <AiFillEdit />{" "}
                    </span>
                    <span
                      id={item._id}
                      onClick={(e) => {
                        del(e);
                      }}
                    >
                      delete{" "}
                      <span className="del">
                        <AiFillDelete />
                      </span>{" "}
                    </span>
                  </p>
                )}
                <p className="tm">
                  {item.date &&
                    moment(moment(item.date), "YYYYMDDHH").fromNow()}
                </p>
                {show && (
                  <div style={{
                    display:
                       show && scomment == item._id ? "block" : "none",
                  }}>
                   
                    {" "}
                    <p>
                      {item.comments.map((it) => {
                        return (
                          <>
                            <p className="kll">{it}</p>
                          </>
                        );
                      })}
                    </p>{" "}
                    <form
                      
                      className="mcx"
                      id={item._id}
                      onSubmit={(e) => {
                        com(e);
                      }}
                    >
                     
                      <input
                      
                        className="in"
                        id={item._id}
                        type="text"
                        placeholder="comment here..."
                        onChange={(e) => {
                          setcomment(e.target.value);
                        }}
                      />
                      <input
                        id={item.id}
                        className="btnnn"
                        type="submit"
                        value="comment"
                      />
                   
                    </form>
                    
                  </div>
                )}
              </div>
            </div>
          );
        })}{" "}
      </div>
    </div>
  );
}

export default Display;
