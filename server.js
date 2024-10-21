const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config({ path: "config.env" });
const { dbConnection } = require("./config/database");
const categoryRoute = require("./routes/categoryRoute");

//DB Connection
dbConnection();

//express app
const app = express();

//Middlewares
app.use(express.json()); //To convert req body from encoded string to json
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(process.env.NODE_ENV);
}

//Mount Routes
app.use("/api/v1/categories", categoryRoute);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
