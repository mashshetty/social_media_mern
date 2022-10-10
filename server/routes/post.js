const router = require("express").Router();
const post = require("../models/post.js");



router.post("/post", async (req, res) => {
    try {

        if(req.body.pic!==""){
      
      const data = await new post(req.body);
      const saveitem = data.save();
      res.status(200).json(data);
        }
    } catch (err) {
      res.json(err);
    }
  })


  router.get("/post", async (req, res) => {
    try {
      
      const data = await post.find({});

      res.status(200).json(data);
    } catch (err) {
      res.json(err);
    }
  })

  router.put("/post/:id", async (req, res) => {
    try {
      
      const data = await post.findByIdAndUpdate(req.params.id,{
        $set : req.body
      });

      res.status(200).json(data);
    } catch (err) {
      res.json(err);
    }
  })


  router.delete("/post/:id", async (req, res) => {
    try {
      
      const data = await post.findByIdAndDelete(req.params.id);

      res.status(200).json(data);
    } catch (err) {
      res.json(err);
    }
  })


  router.put("/postup/:id", async (req, res) => {
    try {
      
      const data = await post.findByIdAndUpdate(req.params.id,{
        $set : req.body
      });

      res.status(200).json(data);
    } catch (err) {
      res.json(err);
    }
  })

  router.put("/postlike/:id", async (req, res) => {
    try {
      
      const data = await post.findByIdAndUpdate(req.params.id,{
        $set : req.body
      });

      res.status(200).json(data);
    } catch (err) {
      res.json(err);
    }
  })

  module.exports = router;