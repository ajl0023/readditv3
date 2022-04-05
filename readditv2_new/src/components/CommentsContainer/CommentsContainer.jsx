import _, { uniqueId } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Comment from "../Comment/Comment";

import "./CommentsContainer.scoped.scss";
const commentsSelector = (comments, ids, final = []) => {
  if (ids.length === 0) {
    return final;
  }
  if (!_.isEmpty(comments)) {
    for (let i = 0; i < ids.length; i++) {
      const id = ids[i];
      const comment = comments[id];
      final.push(comment);

      if (comment.comments && comment.comments.length > 0) {
        commentsSelector(comments, comment.comments, final);
      }
    }

    return final;
  }
};

export default function CommentsContainer(props) {
  const comments = useSelector((state) => {
    return commentsSelector(state.comments.byId, props.comments);
  });

  useEffect(() => {
    const arr_comments = [];
    //find root then find parent for each comment
  }, [comments]);

  return comments ? (
    <div className="wrapper">
      <div className="comments-container">
        {comments.map((comment) => {
          return <Comment key={comment.uid} comment={comment} />;
        })}
      </div>
    </div>
  ) : null;
}
