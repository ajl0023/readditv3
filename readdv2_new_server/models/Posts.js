const { default: knex } = require("knex");
const { Model, snakeCaseMappers, raw } = require("objection");
const { select } = require("../knexInstance");
const Votes = require("./Votes").model;
const Users = require("./Users").model;
const Comments = require("./Comments").model;
const AjvValidator = require("objection").AjvValidator;

class Posts extends Model {
  static async afterInsert(context) {
    const post_context = context.inputItems;
    for (let i = 0; i < post_context.length; i++) {
      const post = post_context[i];
      await Votes.query().insert({
        post_id: post.uid,
        user_id: post.user_id,
        score: 1,
      });
    }
  }
  static get tableName() {
    return "posts";
  }
  static get idColumn() {
    return "uid";
  }
  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        vote_total: {
          default: 0,
        },
      },
    };
  }

  static relationMappings = {
    user: {
      relation: Model.HasOneRelation,
      modelClass: Users,
      join: {
        from: "users.uid",
        to: "posts.user_id",
      },
    },
    comments: {
      relation: Model.HasManyRelation,
      modelClass: Comments,

      modify: function (query) {
        query

          .select(
            "*",
            raw(
              "coalesce((??), 0)",
              Comments.relatedQuery("vote_total").sum("score")
            ).as("vote_total")
          )

          .orderBy("depth");
      },
      join: {
        from: "comments.post_id",
        to: "posts.uid",
      },
    },
    vote_total: {
      relation: Model.HasManyRelation,
      modelClass: Votes,

      join: {
        from: "posts.uid",

        to: "votes.post_id",
      },
    },
    vote_state: {
      relation: Model.HasOneRelation,
      modelClass: Votes,

      join: {
        from: "posts.uid",

        to: "votes.post_id",
      },
      modify: function (query) {
        query.select("score");
      },
    },
  };
  $formatJson(json) {
    json = super.$formatJson(json);

    json.vote_state = json.vote_state ? json.vote_state.score : 0;
    delete json.user_id;
    delete json.rank;
    return json;
  }
}

module.exports = {
  model: Posts,
};
