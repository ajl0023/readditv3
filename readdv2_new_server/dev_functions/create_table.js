const knex = require("../knexInstance");
require("dotenv").config();
async function main() {
  await knex.schema.createTable("votes7", (table) => {
    table.uuid("uid").defaultTo(knex.raw("(UUID())")).primary();
    table.timestamps();

    // table.string("user").references("users.uid");

    table.string("comment_id").references("comments.uid");
    table.string("post_id").references("posts.uid");
    table.integer("score");
    table.string("user_id").references("users.uid");

    table.unique(["user_id", "comment_id"]);
    table.unique(["user_id", "post_id"]);
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
