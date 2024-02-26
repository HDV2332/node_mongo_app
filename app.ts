// import dependencies
import express from "express";
import bodyParser from "body-parser";
import mongoose, { ConnectOptions } from "mongoose";
import logger from "morgan";
import cors from "cors";

require("dotenv").config();

const app = express();
const routes = require("./server/routes/index.routes");

// Allow CORS
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(
    "mongodb://" + process.env.DB_URL + "/admin" || "",
    {} as ConnectOptions
  )
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log("Error connecting to database");
  });

app.get("/", (request: any, response: any) => {
  response.json({ message: "NodeJs CRUD Application" });
});

app.use("/api", cors(), routes);

const server: any = app.listen(process.env.PORT || 8080, () =>
  console.log("Express server listening on port " + server.address().port)
);
