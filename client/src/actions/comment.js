import axios from "axios";

function handleSubmit(type, post_id, parent_comment, content) {
  const req_body = {
    content: content,
    type,
    post_id,
    parent_comment: parent_comment,
  };

  return async (dispatch, getState) => {
    try {
      const req = await axios.post("/api/comments", req_body);
      const new_comment = req.data;
      new_comment.comments = [];
      dispatch({
        type: "NEW_COMMENT",
        comment_data: new_comment,
        comment_type: type,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export { handleSubmit };
