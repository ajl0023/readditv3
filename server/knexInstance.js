require("dotenv").config();

const knex = require("knex").knex({
  client: "mysql",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: "3306",
    charset: "utf8",
    typeCast: function (field, next) {
      if (field.type == "TINY" && field.length == 1) {
        let value = field.string();
        return value ? value == "1" : null;
      }
      return next();
    },
  },
  pool: { min: 0, max: 5 },
});

module.exports = knex;
