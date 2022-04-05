const { Model, raw } = require("objection");

const { randomUUID } = require("crypto");
const { ref } = require("objection");

const Votes = require("../../models/Votes").model;

const Posts = require("../../models/Posts").model;

module.exports = (router) => {
  router.put("/votes", async (req, res) => {
    const entity_id = req.body.id;
    const req_body = req.body;
    const entity_type = req.body.type;
    const entity_column = req.body.type + "_id";
    console.log({
      score: req.body.score,
      [entity_column]: entity_id,

      user_id: "b6366322-abbc-11ec-9422-7085c27ba6fd",
    });
    const inserted = await Votes.query()

      .insert({
        score: req.body.score,
        [entity_column]: entity_id,

        user_id: "b6366322-abbc-11ec-9422-7085c27ba6fd",
      })
      .onConflict(["comment_id", "post_id", "user_id"])
      .merge();
    res.json({});
  });
};
