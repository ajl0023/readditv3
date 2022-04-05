const { Model, snakeCaseMappers } = require("objection");
const Vote_Entities = require("./Vote_Entities").model;
const AjvValidator = require("objection").AjvValidator;

class Votes extends Model {
  static get tableName() {
    return "votes";
  }
  static get jsonSchema() {
    return {
      type: "object",

      properties: {
        post_id: { type: "string", minLength: 1, maxLength: 255 },
        score: { type: "integer", minimum: -1, maximum: 1 },
        comment_id: { type: "string", minLength: 1, maxLength: 255 },
      },
    };
  }
}

module.exports = {
  model: Votes,
};
