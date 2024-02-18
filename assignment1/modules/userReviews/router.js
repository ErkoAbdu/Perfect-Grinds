const express = require("express");
const router = express.Router();

const model = require("./func");

//SETUP FOR EASIER FORM DATA PARSING
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

//ADMIN PAGES
router.get("/", async (request, response) => {
  let reviews = await model.getReviews();
  response.render("review-admin", {
    title: "Administer Review",
    menu: reviews,
  });
});
router.get("/add", async (request, response) => {
  let reviews = await model.getReviews();
  response.render("review-add", { title: "Add Review", menu: reviews });
});

//ADMIN FORM PROCESSING PATHS
router.post("/add/submit", async (request, response) => {
  //for POST data, retrieve field data using request.body.<field-name>
  //retrieve values from submitted POST form
  let flName = request.body.Full_Name;
  //console.log(flName);
  let rate10 = request.body.Rating_of_10;
  let reviewText = request.body.Review;
  let newReview = {
    Full_Name: flName,
    Rating_of_10: rate10,
    Review: reviewText,
  };
  await model.addReview(newReview);
  response.redirect("/admin/review"); //redirects back to Administer review page
});

router.get("/delete", async (request, response) => {
  //for a GET form, field values are passed in request.query.<field_name> because we're retrieving from a query string
  let id = request.query.reviewId;
  await model.deleteReview(id);
  response.redirect("/admin/review");
});

module.exports = router;
