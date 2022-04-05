import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, Outlet, useLocation } from "react-router-dom";
import io from "socket.io-client";
import { useFetchPosts } from "../../hooks/useFetchPosts";
import { fetchPosts, sortPosts } from "../../actions/post";
import Post from "../Post/Post";
import { ReactComponent as UserImage } from "../../svgs/reddit-default.svg";

import "./Home.scoped.scss";
const posts_selector = (state) => state.posts;

export default function Home(props) {
  const dispatch = useDispatch();
  const posts = useSelector(posts_selector);
  const location = useLocation();
  const navigate = useNavigate();
  console.log(posts.initial_load);
  useEffect(() => {
    console.log(234234);
    if (location.pathname === "/" && !posts.initial_load) {
      const params = new URLSearchParams(location.search);
      const sort = params.get("sort");

      dispatch(fetchPosts(sort));
    }
  }, [location.pathname, posts.initial_load]);
  const handleSort = async (sort) => {
    // await dispatch(fetchPosts(sort));
    // navigate(`/?=${sort}`);
    dispatch(sortPosts(sort));
    navigate(`?sort=${sort}`);
  };
  return (
    <div className="wrapper">
      <Outlet />
      <div className="container">
        <div className="home-wrapper">
          <div className="new-post-container">
            <Link to="">
              <UserImage className="new-post-profile-image" alt="" />
            </Link>

            <div
              onClick={() => {
                dispatch({
                  type: "IS_CREATE_POST",
                });
              }}
              className="new-post-button"
            >
              Create Post
            </div>
          </div>
          <div className="categories-container">
            <div
              className="category-link"
              onClick={async () => {
                await handleSort("new");
              }}
            >
              New
            </div>
            <div
              className="category-link"
              onClick={async () => {
                await handleSort("top");
              }}
            >
              Top
            </div>
          </div>
          <div className="posts-container">
            {!posts.is_fetching &&
              posts.allIds.map((id) => {
                return (
                  <Post key={id} post={posts.byId[id]}>
                    test
                  </Post>
                );
              })}
          </div>
        </div>
        <div className="loading-container">
          <div></div>
        </div>
      </div>
    </div>
  );
}
