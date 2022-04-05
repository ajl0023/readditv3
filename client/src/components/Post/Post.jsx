import React from "react";
import { Link } from "react-router-dom";
import "./Post.scoped.scss";
import { ReactComponent as UpArrow } from "../../svgs/up-arrow.svg";
import { ReactComponent as DownArrow } from "../../svgs/down-arrow.svg";
import VoteContainer from "../VoteContainer/VoteContainer";
import { useDispatch } from "react-redux";
const Post = ({ post, history, children }) => {
  const dispatch = useDispatch();
  return (
    <div className={`card-container`}>
      <div className={`card-content-container`}>
        <span className={"card-author"}>{post.user.username}</span>
        <h4 className="card-title">
          <Link to={`/post/${post.uid}`}>{post.title}</Link>
        </h4>
        <div className="vote-container">
          <VoteContainer
            vote_total={post.vote_total}
            vote_state={post.vote_state}
            interact={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Post;
