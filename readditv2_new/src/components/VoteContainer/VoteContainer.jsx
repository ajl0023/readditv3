import { useState } from "react";

import { ReactComponent as UpArrow } from "../../svgs/up-arrow.svg";
import { ReactComponent as DownArrow } from "../../svgs/down-arrow.svg";
import "./VoteContainer.scoped.scss";
import { handleVote } from "src/actions/vote";
import { useDispatch } from "react-redux";

export default function VoteContainer(props) {
  const dispatch = useDispatch();
  const handleChange = (value, cb) => {
    cb(value);
  };

  const handleEnter = () => {};
  const type = props.type;
  const entity_id = props.entity_id;
  const vote_state = props.vote_state;
  const vote_total = props.vote_total;

  return (
    <div
      style={{
        pointerEvents: props.interact ? "all" : "none",
      }}
      className="vote-container"
    >
      <div
        onClick={() =>
          dispatch(handleVote(1, type, entity_id, vote_state, vote_total))
        }
        className="icon-container vote-item"
      >
        <UpArrow fill={vote_state === 1 ? "orange" : ""} />
      </div>

      <span className="vote-item">{props.vote_total}</span>
      <div
        onClick={() =>
          dispatch(handleVote(-1, type, entity_id, vote_state, vote_total))
        }
        className="icon-container vote-item"
      >
        <DownArrow fill={vote_state === -1 ? "orange" : ""} />
      </div>
    </div>
  );
}
