const { Model, raw } = require("objection");

const { randomUUID } = require("crypto");
const Comments = require("../../models/Comments").model;

module.exports = (router) => {
  router.post("/comments", async (req, res) => {
    const req_body = req.body;
    const user = req.user;
    const uid = randomUUID();
    await Comments.query().insertAndFetch({
      content: req_body.content,

      user_id: user,
      uid: uid,
      post_id: req_body.post_id,
      is_root: req_body.type === "reply" ? false : true,
      root_comment:
        req_body.type === "comment"
          ? true
          : Comments.query()
              .select("root_comment")
              .from(
                Comments.query().findById(req_body.parent_comment).as("c1")
              ),
      parent_comment_id:
        req_body.type === "comment" ? null : req_body.parent_comment,
      depth:
        req_body.type === "comment"
          ? 0
          : raw(
              "(??) + 1",
              Comments.query()
                .select("depth")
                .from(
                  Comments.query().findById(req_body.parent_comment).as("c2")
                )
            ),
    });
    const new_comment = await Comments.query()
      .findById(uid)
      .withGraphFetched("[user,vote_state]")
      .select(
        "comments.*",
        raw(
          "coalesce((??), 0)",
          Comments.relatedQuery("vote_total").sum("score")
        ).as("vote_total")
      );
    res.json(new_comment);
  });
};
