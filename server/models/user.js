const mongoose = require('mongoose');

const user = new mongoose.Schema({
    username: {
        type: String,
        
      },
    
      password: {
        type: String,
       
      },

      followers: {
        type: Object,
        // required: true,
      },

      following: {
        type: Array,
       
      },

      
})

module.exports = mongoose.model("user", user);