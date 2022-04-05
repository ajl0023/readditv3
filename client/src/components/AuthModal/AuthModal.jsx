import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCloseModal } from "src/hooks/useCloseModal";
import { ModalWrapper } from "../ModalWrapper/ModalWrapper";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";

import "./AuthModal.scoped.scss";
import _ from "lodash";
import axios from "axios";
import { handleLogin } from "src/actions/user";
const modalSelector = (state) => {
  return state.user.modal;
};
export default function AuthModal(props) {
  const dispatch = useDispatch();
  const { modal, closeModal } = useCloseModal(() => {
    dispatch({
      type: "AUTH_MODAL",
    });
  });
  const modal_data = useSelector(modalSelector);
  const handleChange = (value, cb) => {
    cb(value);
  };
  const form = useRef();
  return modal_data.visible ? (
    <ModalWrapper closeModal={closeModal}>
      <div className="wrapper">
        <div ref={modal} className="main-container">
          <div className="modal-type-header mb-2">
            <span>{_.startCase(modal_data.type)}</span>
          </div>
          <Form ref={form}>
            <Form.Group className="mb-3" controlId="">
              <Form.Control
                name="username"
                type="text"
                placeholder="Username"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="">
              <Form.Control
                rows={6}
                name="password"
                type="password"
                placeholder="Password"
              />
            </Form.Group>{" "}
            {modal_data.type === "sign up" && (
              <Form.Group className="mb-3" controlId="">
                <Form.Control
                  rows={6}
                  name="pw-confirm"
                  type="password"
                  placeholder="Confirm password"
                />
              </Form.Group>
            )}
            <div className="button-container">
              <Button
                className="form-submit-button"
                variant="primary"
                type="submit"
                onClick={async (e) => {
                  e.preventDefault();
                  const form_data = new FormData(form.current);
                  dispatch(handleLogin(form_data));
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
