const express = require("express");
// const cors = require("cors");

const app = express();

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Import the database configuration
const db = require("./app/models");

// Use MONGO_URI from environment variable or fallback to localhost
const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mydb";

db.mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch(err => {
    console.error("Cannot connect to MongoDB!", err);
    process.exit(1); // Exit if DB connection fails
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Test application." });
});

// import routes
require("./app/routes/turorial.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});