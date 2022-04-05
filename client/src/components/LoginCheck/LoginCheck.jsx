import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { checkLogin } from "src/actions/user";

import "./LoginCheck.scoped.scss";
export default function LoginCheck(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkLogin());
    return () => {};
  }, []);
  return <div className="container"></div>;
}
