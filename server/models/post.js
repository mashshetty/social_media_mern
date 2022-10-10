const mongoose = require('mongoose');

const post = new mongoose.Schema({
    pic: {
        type: String,
         required: true,
      },
    
      caption: {
        type: String,
       
      },
      location: {
        type: String,
       
      },
      time: {
        type: String,
       
      },
      likes: {
        type: Array,
        // required: true,
       
      },
      comments: {
        type: Array,
        // required: true,
       
      },
      user: {
        type: String,
        // required: true,
       
      },
      date: {
        type: String,
        // required: true,
       
      },
      

})

module.exports = mongoose.model("post", post);