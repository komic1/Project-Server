const mongoose = require("mongoose");

const User = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  categories: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Category'
    },
  ],
});

module.exports = mongoose.model("User", User);
