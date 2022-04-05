const { Model, raw } = require("objection");

const { randomUUID } = require("crypto");
const { ref } = require("objection");

const Votes = require("../../models/Votes").model;

const Posts = require("../../models/Posts").model;

module.exports = (router, upload) => {
  router.get("/posts", async (req, res) => {
    const queryString = req.query.sort;
    const sort = ((type) => {
      if (type === "new") {
        return "created_at";
      } else if (type === "top") {
        return "vote_total";
      } else {
        return "";
      }
    })(queryString);
    const query = Posts.query()
      .withGraphFetched("[user,vote_state]")

      .select(
        "posts.*",
        raw(
          "coalesce((??), 0)",
          Posts.relatedQuery("vote_total").sum("score")
        ).as("vote_total")
      );
    if (queryString) {
      query.orderBy(sort);
    }
    const posts = await query;
    res.json(posts);
  });
  router.get("/posts/:id", async (req, res) => {
    const posts = await Posts.query()
      .findById(req.params.id)
      .withGraphFetched("[user,comments.[user,vote_state],vote_state]")
      .select(
        "posts.*",
        raw(
          "coalesce((??), 0)",
          Posts.relatedQuery("vote_total").sum("score")
        ).as("vote_total")
      );

    res.json(posts);
  });
  router.post("/posts", upload.none(), async (req, res) => {
    const post = await Posts.query().insertAndFetch({
      ...req.body,
      uid: randomUUID(),
      user_id: req.user,
    });
    post.vote_total = 1;
    post.vote_state = 1;

    // const posts = await Posts.query()
    //   .withGraphFetched("[user,comments.[user,vote_state],vote_state]")
    //   .select(
    //     "posts.*",
    //     raw(
    //       "coalesce((??), 0)",
    //       Posts.relatedQuery("vote_total").sum("score")
    //     ).as("vote_total")
    //   );
    res.json(post);
  });
};
