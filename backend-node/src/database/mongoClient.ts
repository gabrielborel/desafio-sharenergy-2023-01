import mongoose from "mongoose";

const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS } = process.env;

console.log(process.env);

mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, {}, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected");
  }
});
