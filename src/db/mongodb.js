var dotenv = require("dotenv").config();
var mongoose = require("mongoose");

const env = process.env.ENV;

let mongodbUri;
switch (env) {
  case "dev":
    mongodbUri = process.env.MONGODB_URI;
    break;
  case "qc":
    mongodbUri = process.env.MONGODB_URI_QC;
    break;
  case "prod":
    mongodbUri = process.env.MONGODB_URI_PROD;
    break;
  default:
    mongodbUri = process.env.MONGODB_URI;
}

mongoose
  .connect(mongodbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongo DB Connected " + env);
  })
  .catch((error) => {
    console.log(error);
  });
