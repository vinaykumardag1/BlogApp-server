const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
 
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match:[/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: true,
  },
  
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
