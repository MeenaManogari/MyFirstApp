const { configDotenv } = require("dotenv");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config();
const app = express();

//connect to database

connectDB();

app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);
app.listen(port, console.log(`Server running on port ${port}`));
