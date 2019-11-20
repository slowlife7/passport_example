const app = require("../app");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://rasgo.iptime.org:27017/authentication", {
    useNewUrlParser: true
  })
  .then(() => {
    app.listen(3000, function() {
      console.log("connected on port 3000.");
    });
  })
  .catch(err => {
    console.log(err);
  });
