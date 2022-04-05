import axios from "axios";
import { normalizeData } from "../utils";
function nestComments(comments, cache = {}, final = []) {
  for (let i = 0; i < comments.length; i++) {
    let comment = comments[i];
    comment.comments = [];
    cache[comment.uid] = comment;

    if (!comment.parent_comment_id) {
      final.push(comment);
    } else if (cache[comment.parent_comment_id]) {
      cache[comment.parent_comment_id].comments.push(comment);
    }
  }

  return final;
}
export function fetchPosts(sort) {
  return async (dispatch, getState) => {
    dispatch({
      type: "FETCH_POSTS",
    });
    let fetch_url = sort
      ? axios.get(`/api/posts?sort=${sort}`)
      : axios.get("/api/posts");

    const data = await fetch_url;

    const normalized = normalizeData(data.data);

    dispatch({
      type: "POSTS_LOADED",
      posts: normalized,
      current_sort: sort,
    });
  };
}
export function createPost(data) {
  return async (dispatch, getState) => {
    await axios.post("/api/posts", data);
    dispatch({
      type: "NEW_POST",
    });
  };
}
export function sortPosts(sort) {
  return async (dispatch, getState) => {
    dispatch({
      type: "SORT_POSTS",
      sort: sort,
    });
  };
}
export function fetchSinglePost(id) {
  return async (dispatch, getState) => {
    const post = await axios.get(`/api/posts/${id}`);
    const comments = nestComments(post.data.comments);
    post.data.comments = comments;
    const normalized = normalizeData([post.data]);

    dispatch({
      type: "FETCH_SINGLE_POST",
      post: {
        entities: normalized.entities.posts,
        result: normalized.result,
      },
    });

    dispatch({
      type: "COMMENTS_LOADED",
      comments: {
        entities: normalized.entities.comments
          ? normalized.entities.comments
          : {},
        result: normalized.entities.comments
          ? Object.keys(normalized.entities.comments)
          : [],
      },
    });
  };
}
