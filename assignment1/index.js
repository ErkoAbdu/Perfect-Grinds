const express = require("express"); //includes express in this app
const path = require("path"); //module to help with file paths
const dotenv = require("dotenv"); //to connect .env file

dotenv.config(); //load local environment variables from .env files

//import page routes
const pageRouter = require("./modules/pages/router");
const adminReviewRouter = require("./modules/userReviews/router");

const app = express();
const port = process.env.PORT || "7777";

//SETUP TEMPLATE ENGINE (PUG)
app.set("views", path.join(__dirname, "views")); //set up "views" setting to look in the <__dirname>/views folder
app.set("view engine", "pug");

//SETUP PATH FOR STATIC FILES
app.use(express.static(path.join(__dirname, "public")));
//USE PAGE ROUTES FROM MODULE
app.use("/", pageRouter);
app.use("/admin/review", adminReviewRouter);

//server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
