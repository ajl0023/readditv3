import { useState } from "react";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import "./ModalWrapper.scoped.scss";
const visibleSelector = (state) => {
  return state.modal.visible;
};
function Component(props) {
  const visible = useSelector(visibleSelector);
  const handleChange = (value, cb) => {
    cb(value);
  };
  const handleClose = (cb) => {
    cb();
  };
  const handleEnter = () => {};

  return (
    <div onClick={props.closeModal} className="wrapper">
      {props.children}
    </div>
  );
}
export const ModalWrapper = (props) => {
  return ReactDOM.createPortal(
    <Component {...props} />,
    document.getElementById("modal-container")
  );
};
