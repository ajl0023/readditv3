const { Model } = require("objection");

const { randomUUID } = require("crypto");
const bcrypt = require("bcrypt");
const Users = require("../../models/Users").model;
const jwt = require("jsonwebtoken");

module.exports = (router, upload) => {
  router.post("/login", upload.none(), async (req, res) => {
    const user_pwd = req.body.password;

    const user_username = req.body.username;
    const user = await Users.query().findOne({
      username: user_username,
    });

    if (!user) {
      res.status(403).json({});
      return;
    }
    const user_obj = {
      username: user.username,
      uid: user.uid,
    };
    const token = jwt.sign(
      {
        user: user_obj,
      },
      process.env.JWT_SECRET
    );

    bcrypt.compare(user_pwd, user.password, async function (err, valid) {
      if (valid) {
        res.cookie("access_token", token);
        res.json(user_obj);
      }
    });
  });
  router.post("/logout", async (req, res) => {
    res.clearCookie("access_token");
    res.end();
  });
  router.get("/logged-in", upload.none(), async (req, res) => {
    if (!req.user) {
      res.status(403).json({});
      return;
    }
    const verify = jwt.verify(req.user, process.env.JWT_SECRET);
    if (verify) {
      res.json(verify.user);
    } else {
      res.status(403).json({});
    }
  });
  router.post("/sign-up", upload.none(), async (req, res) => {
    const saltRounds = 10;
    const user_pwd = req.body.password;
    const user_username = req.body.username;
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(user_pwd, salt, async function (err, hash) {
        await Users.query().insert({
          username: user_username,
          password: hash,
        });
      });
    });
    res.json({});
  });
};
