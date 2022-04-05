const { Model, snakeCaseMappers } = require("objection");
const AjvValidator = require("objection").AjvValidator;

class Vote_Entities extends Model {
  static get tableName() {
    return "vote_entities";
  }
  static get jsonSchema() {
    return {
      type: "object",

      properties: {
        type: { type: "string", minLength: 1, maxLength: 255 },
        post_id: { type: "string", minLength: 1, maxLength: 255 },

        comment_id: { type: "string", minLength: 1, maxLength: 255 },
      },
    };
  }
}

module.exports = {
  model: Vote_Entities,
};
