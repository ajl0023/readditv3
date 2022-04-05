const knex = require("../knexInstance");
require("dotenv").config();
async function main() {
  // await knex.schema.renameTable("vote_entities", "votes");
  await knex.schema.alterTable("votes", (table) => {
    table.integer("score");
    // table
    //   .foreign("entity_id")
    //   .references("vote_entities.uid")
    //   .onDelete("CASCADE");
  });
  process.exit(0);
}
main();
async function dropForeignKey() {
  await knex.schema.alterTable("votes", (table) => {
    table.dropForeign("entity_id");
    // table
    //   .foreign("entity_id")
    //   .references("vote_entities.uid")
    //   .onDelete("CASCADE");
  });
  process.exit(0);
}
async function dropPrimaryKey() {
  await knex.schema.alterTable("vote_entities", (table) => {
    table.primary(["user_id", "post_id", "comment_id"]);
  });
  process.exit(0);
}
// dropPrimaryKey();
