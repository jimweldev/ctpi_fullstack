require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// require routes
const authRoute = require("./app/routes/authRoute.js");
const userRoute = require("./app/routes/userRoute.js");
const seriesRoute = require("./app/routes/seriesRoute.js");
const sermonRoute = require("./app/routes/sermonRoute.js");
const openingRoute = require("./app/routes/openingRoute.js");
const closingRoute = require("./app/routes/closingRoute.js");
const pointRoute = require("./app/routes/pointRoute.js");
const verseRoute = require("./app/routes/verseRoute.js");

// express app
const app = express();

// middlewares
app.use(
  cors({
    credentials: true,
    origin: "*",
    // origin: process.env.CORS_ORIGIN,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/auth/", authRoute);
app.use("/api/users/", userRoute);
app.use("/api/series/", seriesRoute);
app.use("/api/sermons/", sermonRoute);
app.use("/api/openings/", openingRoute);
app.use("/api/closings/", closingRoute);
app.use("/api/points/", pointRoute);
app.use("/api/verses/", verseRoute);

// connect to db
const PORT = process.env.PORT || 4000;

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`connecting to db & listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error: " + error);
  });
