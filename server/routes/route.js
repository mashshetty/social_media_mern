const router = require("express").Router();
const user = require("../models/user.js");
const post = require("../models/post.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")

router.post("/user", async (req, res) => {
    try {
      const pass = await bcrypt.hash(req.body.user.password,10)
      const data = await new user({
        username : req.body.user.username,
        password: pass,
        followers:req.body.user.followers,
        following:req.body.user.following

      });

      console.log(req.body.user.followers)
      console.log(req.body.user.username)
      
      const saveitem = data.save();
      res.status(200).json(data);
    } catch (err) {
      res.json(err);
    }
  })


  router.get("/user/:username/:password", async (req, res) => {
    try {
      // const passwd = await bcrypt.compare(req.params.password)
      const data = await user.findOne({username : req.params.username});
      let name = req.params.username;
      let pass = req.params.password;

      const passwd = await bcrypt.compare(req.params.password, data.password);

      // console.log(data);

      if(data && passwd){

        console.log(data);
        console.log("mash is",passwd);

        // const token = jwt.sign(
        //   {
        //     name: user.name,
        //     email: user.email,
        //   },
        //   'secret123'
        // )


        const token = jwt.sign({
            username : name,
            password:data.password,

        }, 'secret123')

        // console.log(token);

       return res.status(200).json({data:data, user:token});
      }else{
        return res.status(200).json({});
      }
      





    } catch (err) {
      res.json(err);
    }
  })


  router.get("/username/:username", async (req, res) => {
    try {
      const data = await user.count({username : req.params.username});
      res.status(200).json(data);
    } catch (err) {
      res.json(err);
    }
  })


  router.get("/verify/:token", async (req, res) => {
    try {
      const decoded = jwt.verify(req.params.token, 'secret123')
      const data = await user.count({username : decoded.username, password : decoded.password});
      res.json(data);
      // console.log(data);
    } catch (err) {
      res.json(err);
    }
  })



  router.get("/user", async (req, res) => {
    try {
      const data = await user.find({});
      
      res.json(data);
      
    } catch (err) {
      res.json(err);
    }
  })



  router.put("/follow/:name", async (req, res) => {
    try {
      
      const data = await user.findOneAndUpdate({username: req.params.name},{
        $set : req.body
      });

      res.status(200).json(data);
    } catch (err) {
      res.json(err);
    }
  })






module.exports = router;