import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { sortPosts } from "src/actions/post";
import { handleLogout, handleModal } from "src/actions/user";
import { ReactComponent as Triangle } from "../../svgs/drop-down-triangle.svg";
import { ReactComponent as UserImage } from "../../svgs/reddit-default.svg";

import "./Navbar.scoped.scss";
const userSelector = (state) => {
  return state.user;
};
const UserInfo = ({ user_data }) => {
  const [dropdown, setDropDown] = useState(false);
  const dispatch = useDispatch();
  return (
    <div
      className="user-wrapper"
      onClick={() => {
        setDropDown(!dropdown);
      }}
    >
      <div className="user-container border">
        <div className="username">{user_data.user.username}</div>
        <div className="user-profile-image-container">
          <UserImage />
        </div>
        <div className="drop-down-triangle">
          <Triangle />
        </div>
      </div>
      {dropdown && (
        <div className="drop-down-container">
          <div
            onClick={async () => {
              await dispatch(handleLogout());
              setDropDown(false);
            }}
            className="drop-down-item border"
          >
            Logout
          </div>
        </div>
      )}
    </div>
  );
};
function Navbar(props) {
  const dispatch = useDispatch();

  const user_data = useSelector(userSelector);

  return (
    <>
      <div className={`navbar-wrapper `}>
        <div className="navbar-content">
          <li>
            <Link
              onClick={() => {
                dispatch(sortPosts(null));
              }}
              to={{ pathname: "/" }}
              className="logo"
            >
              readit
            </Link>
          </li>
          {user_data.status_checked ? (
            !user_data.user ? (
              <div className="auth-button-container-navbar">
                <button
                  onClick={() => {
                    dispatch(handleModal("login"));
                  }}
                >
                  log in
                </button>
                <button
                  onClick={() => {
                    dispatch(handleModal("sign up"));
                  }}
                >
                  sign up
                </button>
              </div>
            ) : (
              <UserInfo user_data={user_data} />
            )
          ) : null}
        </div>
      </div>
    </>
  );
}
export default Navbar;
