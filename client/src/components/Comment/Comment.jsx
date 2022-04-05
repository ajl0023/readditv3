import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import VoteContainer from "../VoteContainer/VoteContainer";
import "./Comment.scoped.scss";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { handleSubmit } from "../../actions/comment";
import { useSetInput } from "../../hooks/useSetInput";
import { useDispatch } from "react-redux";
export default function Comment(props) {
  const [depths, setDepths] = useState([]);

  const [replyToggle, setReplyToggle] = useState(false);
  const textInput = useSetInput();
  const dispatch = useDispatch();
  useEffect(() => {
    if (props.comment) {
      const depths = new Array(props.comment.depth + 1).fill("").map(() => {
        return uuidv4();
      });
      setDepths(depths);
    }

    return () => {};
  }, [props.comment]);

  return (
    <div className="comment-container">
      {depths.map((key, i) => {
        return (
          <div
            style={{
              marginLeft: `${i * 10}px`,
            }}
            key={key}
            className="depth-bar"
          ></div>
        );
      })}
      <div
        style={{
          marginLeft: `${props.comment.depth * 10}px`,
        }}
        className="vote-content-container"
      >
        <VoteContainer
          type="comment"
          entity_id={props.comment.uid}
          vote_state={props.comment.vote_state}
          vote_total={props.comment.vote_total}
          interact={true}
        />
        <div className="main-content">
          <div className="content-container">
            <div className="user-container">
              <span>{props.comment.user.username}</span>
            </div>
            <div className="text-content-container">
              <div className="text-content">{props.comment.content}</div>
              parent:{props.comment.parent_comment_id}{" "}
              <div>uid :{props.comment.uid}</div>
            </div>
          </div>

          {replyToggle && (
            <div className="new-comment-container">
              <FormControl
                onChange={textInput.handleChange}
                rows={6}
                as="textarea"
              />
            </div>
          )}

          <div className="reply-container">
            <div className="button-container d-flex">
              <Button
                onClick={() => {
                  setReplyToggle(!replyToggle);
                }}
              >
                Reply
              </Button>
              {replyToggle && (
                <Button
                  variant="outline-primary"
                  onClick={async () => {
                    // dispatch(

                    await dispatch(
                      handleSubmit(
                        "reply",
                        props.comment.post_id,
                        props.comment.uid,

                        textInput.input
                      )
                    );
                    setReplyToggle(false);
                    // );
                  }}
                >
                  Submit
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
