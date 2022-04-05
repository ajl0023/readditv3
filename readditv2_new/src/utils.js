import { normalize, schema } from "normalizr";

export function normalizeData(data) {
  // Define your article

  const comment = new schema.Entity(
    "comments",
    {},
    {
      idAttribute: "uid",
      processStrategy: (value, parent, key) => {
        return { ...value, post: parent.id };
      },
    }
  );
  comment.define({
    comments: [comment],
  });

  const post = new schema.Entity(
    "posts",
    { comments: [comment] },

    {
      idAttribute: "uid",
    }
  );

  const normalizedData = normalize(data, [post]);

  return normalizedData;
}
