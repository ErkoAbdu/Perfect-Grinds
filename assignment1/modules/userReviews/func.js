const { MongoClient, ObjectId } = require("mongodb");

//DB Values
const dbUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_URL}/`;
const client = new MongoClient(dbUrl);

//MONGODB FUNCTIONS
async function connection() {
  db = client.db("5222db"); //if there is a default db in the connection, this can be left blank
  return db;
}

//Function to select all documents in the userReviews collection
async function getReviews() {
  db = await connection();
  let results = db.collection("userReviews").find({});
  let res = await results.toArray();
  return res;
}
//Function to insert one review
async function addReview(reviewData) {
  db = await connection();
  let status = await db.collection("userReviews").insertOne(reviewData);
  console.log("review added");
}

/* Async function to select one document by _id. */
async function getSingleReview(id) {
  db = await connection();
  const editIdFilter = { _id: new ObjectId(id) };
  const result = db.collection("userReviews").findOne(editIdFilter);
  return result;
}

/* Async function to delete one document by _id. */
async function deleteReview(id) {
  db = await connection();
  const deleteIdFilter = { _id: new ObjectId(id) };
  const result = await db.collection("userReviews").deleteOne(deleteIdFilter);
  if (result.deletedCount === 1) console.log("delete successful");
}

module.exports = {
  getReviews,
  addReview,
  deleteReview,
  getSingleReview,
};
