const knex = require("../knexInstance");
require("dotenv").config();
async function main() {
  await knex.schema.dropTable("vote_entities", (table) => {
    // table.uuid("uid").primary().defaultTo(knex.raw("(UUID())"));
    // table.timestamps();
    // table.string("type");
    // table.string("post_id").references("posts.uid");
    // table.string("comment_id").references("comments.uid");
    table.dropForeign("votes_entity_id_foreign");

    // table.foreign("votes_entity_id_foreign").references("votes.uid").onDelete("CASCADE");
  });
  process.exit(0);
}
main();
// table.string("content");
//     table.uuid("uid").primary().defaultTo(knex.raw("(UUID())"));
//     table.timestamps();
//     table.string("user");
//     table.string("title");
//     table.string("parent_id").references("posts.uid");
