import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactDOM from "react-dom";
import Form from "react-bootstrap/Form";

import "./NewPostModal.scoped.scss";
import Button from "react-bootstrap/esm/Button";
import { createPost } from "../../actions/post";
import { useNavigate } from "react-router-dom";
import { useCloseModal } from "../../hooks/useCloseModal";
import { ModalWrapper } from "../ModalWrapper/ModalWrapper";
const is_creating_selector = (state) => {
  return state.posts.is_creating;
};

function Component(props) {
  const navigate = useNavigate();
  const { modal, closeModal } = useCloseModal(() => {
    dispatch({
      type: "IS_CREATE_POST",
    });
  });
  const is_creating = useSelector(is_creating_selector);
  const handleChange = (value, cb) => {
    cb(value);
  };
  const form = useRef();

  const dispatch = useDispatch();
  return is_creating ? (
    <ModalWrapper closeModal={closeModal}>
      <div className="modal-wrapper">
        <div ref={modal} className="new-post-container">
          <Form ref={form}>
            <Form.Group className="mb-3" controlId="">
              <Form.Label>Title</Form.Label>
              <Form.Control name="title" type="text" placeholder="Post title" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="">
              <Form.Label>Content</Form.Label>
              <Form.Control
                rows={6}
                name="content"
                as="textarea"
                type="password"
                placeholder="Start typing here..."
              />
            </Form.Group>
            <div className="button-container">
              <Button
                className="form-submit-button"
                variant="primary"
                type="submit"
                onClick={async (e) => {
                  e.preventDefault();
                  const form_data = new FormData(form.current);
                  await dispatch(createPost(form_data));
                  navigate("/");
                }}
              >
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </ModalWrapper>
  ) : null;
}
export const NewPostModal = () => {
  return ReactDOM.createPortal(
    <Component />,
    document.getElementById("modal-container")
  );
};
