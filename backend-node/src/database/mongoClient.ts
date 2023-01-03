import mongoose from "mongoose";

mongoose.connect("mongodb://mongodb_database:27017/share_energy", {}, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected");
  }
});
