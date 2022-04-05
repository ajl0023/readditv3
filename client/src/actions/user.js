import axios from "axios";

function handleModal(type) {
  return (dispatch, getState) => {
    dispatch({ type: "AUTH_MODAL", modal_type: type });
  };
}
function handleLogin(form) {
  return async (dispatch, getState) => {
    const req = await axios.post("/api/login", form);
    const user_data = req.data;
    dispatch({ type: "USER_LOGGED_IN", user_data: user_data });
  };
}
function handleLogout(form) {
  return async (dispatch, getState) => {
    await axios.post("/api/logout");

    dispatch({ type: "USER_LOGOUT" });
  };
}
function checkLogin(form) {
  return async (dispatch, getState) => {
    try {
      const req = await axios.get("/api/logged-in");

      dispatch({
        type: "USER_LOGIN_CHECK",
        user_data: req.data,
        logged_in: req.status === 200,
      });
    } catch (error) {
      dispatch({
        type: "USER_LOGIN_CHECK",
        user_data: null,
        logged_in: false,
      });
    }
  };
}
export { handleModal, handleLogin, checkLogin, handleLogout };
