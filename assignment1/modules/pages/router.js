const express = require("express");
const pageRouter = express.Router();
const userReviews = require("../userReviews/func");

//SET UP SOME PAGE ROUTES
//test message
pageRouter.get("/", async (request, response) => {
  //test getReviews()
  let reviews = await userReviews.getReviews();
  console.log(reviews);
  response.render("index", { title: "Home", menu: reviews });
});
pageRouter.get("/about", async (request, response) => {
  let reviews = await userReviews.getReviews();
  response.render("about", { title: "About Us", menu: reviews });
});
pageRouter.get("/testimonials", async (request, response) => {
  let reviews = await userReviews.getReviews();
  response.render("testimonials", { title: "Testimonials", menu: reviews });
});

module.exports = pageRouter;
