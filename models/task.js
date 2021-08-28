const mongoose = require("mongoose");

const Task = mongoose.Schema({
  title: {
    type: String,
    required: true
    },

  description: { 
      type: String, 
      required: true
    },
  categoryId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Category'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
}
);

module.exports = mongoose.model("Task", Task);
