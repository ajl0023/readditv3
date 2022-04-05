const { Model, snakeCaseMappers } = require("objection");
const AjvValidator = require("objection").AjvValidator;

class Users extends Model {
  static get tableName() {
    return "users";
  }
  $formatJson(json) {
    json = super.$formatJson(json);
    delete json.password;

    return json;
  }
}

module.exports = {
  model: Users,
};
