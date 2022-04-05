const { Model, snakeCaseMappers } = require("objection");
const Users = require("./Users").model;
const Votes = require("./Votes").model;
const AjvValidator = require("objection").AjvValidator;

class Comments extends Model {
  static async afterInsert(context) {
    const comment_context = context.inputItems;
    for (let i = 0; i < comment_context.length; i++) {
      const comment = comment_context[i];
      await Votes.query().insert({
        comment_id: comment.uid,
        user_id: comment.user_id,
        score: 1,
      });
    }
  }

  static get tableName() {
    return "comments";
  }
  static get idColumn() {
    return "uid";
  }
  static relationMappings = {
    user: {
      relation: Model.HasOneRelation,
      modelClass: Users,
      join: {
        from: "users.uid",
        to: "comments.user_id",
      },
    },
    vote_state: {
      relation: Model.HasOneRelation,
      modelClass: Votes,

      join: {
        from: "comments.uid",

        to: "votes.comment_id",
      },
      modify: function (query) {
        query.select("score");
      },
    },
    vote_total: {
      relation: Model.HasManyRelation,
      modelClass: Votes,

      join: {
        from: "comments.uid",

        to: "votes.comment_id",
      },
    },
    join: {
      from: "comments.uid",

      to: "votes.comment_id",
    },
  };
  $formatJson(json) {
    json = super.$formatJson(json);
    json.vote_state = json.vote_state ? json.vote_state.score : 0;

    delete json.rank;
    return json;
  }
}

module.exports = {
  model: Comments,
};
