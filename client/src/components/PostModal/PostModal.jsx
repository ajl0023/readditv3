import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import "./PostModal.scoped.scss";
import _ from "lodash";
import { ReactComponent as CloseIcon } from "../../svgs/closeIcon.svg";
import CommentsContainer from "../CommentsContainer/CommentsContainer";
import VoteContainer from "../VoteContainer/VoteContainer";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/esm/Button";
import { handleSubmit } from "../../actions/comment";
import { useSetInput } from "../../hooks/useSetInput";
import { fetchSinglePost } from "../../actions/post";
import { useCloseModal } from "../../hooks/useCloseModal";
import { ModalWrapper } from "../ModalWrapper/ModalWrapper";

const PostModal = (props) => {
  const params = useParams();
  const dispatch = useDispatch();
  const card_container = useRef();
  const comment_input = useSetInput();
  const navigate = useNavigate();

  const post_data = useSelector((state) => {
    const posts = state.posts;

    if (!_.isEmpty(posts.byId)) {
      return posts.byId[params.id];
    }
  });
  const current_sort = useSelector((state) => {
    const posts = state.posts;
    return posts.current_sort;
  });
  const { modal, closeModal } = useCloseModal(() => {
    dispatch({
      type: "POST_DESELECTED",
    });

    navigate(current_sort ? `/?sort=${current_sort}` : "/");
  });
  useEffect(() => {
    dispatch({
      type: "POST_SELECTED",
      uid: params.id,
    });
    dispatch(fetchSinglePost(params.id));
  }, []);

  return (
    // <div
    //   onClick={closeModal}
    //   className="modal-wrapper
    // "
    // >

    <ModalWrapper closeModal={closeModal}>
      <div className="wrapper">
        <CloseIcon className="close-icon" onClick={closeModal} />

        {post_data && (
          <div ref={modal} className="card-modal">
            <div className="vote-content-container">
              <div className="vote-container">
                <VoteContainer
                  type="post"
                  interact={true}
                  entity_id={post_data.uid}
                  vote_state={post_data.vote_state}
                  vote_total={post_data.vote_total}
                />
              </div>
              <div className="content-container">
                <div className="header-content">
                  <p className="card-author"> </p>
                  <p className="modal-date"></p>
                  <h4 className="card-title">{post_data.title}</h4>
                </div>
                <div className="card-content">{post_data.content}</div>
              </div>
            </div>

            <>
              <div className="post-image-container">
                <img className="post-image" alt="" />
              </div>

              <div className="card-modal-vote-container">
                <li></li>
                {/* <li>{props.voteTotal}</li> */}
                <li></li>
              </div>
              <h4 className="comment-section-header">Comments</h4>
              <div className="new-comment-container">
                <FormControl
                  onChange={comment_input.handleChange}
                  rows={6}
                  as="textarea"
                />
              </div>
              <div className="comment-submit-container">
                <Button
                  onClick={() => {
                    dispatch(
                      handleSubmit(
                        "comment",
                        post_data.uid,
                        null,
                        comment_input.input
                      )
                    );
                  }}
                >
                  Submit
                </Button>
              </div>
              <div className="main-comment-container">
                <CommentsContainer
                  comments={post_data.comments ? post_data.comments : []}
                />
              </div>
            </>
          </div>
        )}
      </div>
    </ModalWrapper>

    // </div>
  );
};

export default PostModal;
