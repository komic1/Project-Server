const mongoose = require("mongoose");

const Category = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  tasks: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Task'
    },
  ],
});

module.exports = mongoose.model("Category", Category);
