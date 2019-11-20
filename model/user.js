const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String },
  password: { type: String }
});

userSchema.methods.verifyPassword = function(password, cb) {
  if (password === this.password) {
    cb(null, true);
  } else {
    cb("error");
  }
};

module.exports = mongoose.model("user", userSchema);
