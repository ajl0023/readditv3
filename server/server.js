require("dotenv").config();

const express = require("express");
const app = express();
const multer = require("multer");
const cookieParser = require("cookie-parser");

const router = express.Router();

const knex = require("./knexInstance");

const cors = require("cors");

const { Model } = require("objection");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

Model.knex(knex);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  const access_token = req.cookies.access_token;
  // const access_token = req.headers.cookie.;
  req.user = access_token;
  next();
});
require("./routes/posts/routes")(router, upload);
require("./routes/users/routes")(router, upload);
require("./routes/votes/routes")(router, null);
require("./routes/comments/routes")(router, null);
app.use("/api", router);

const server = app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
