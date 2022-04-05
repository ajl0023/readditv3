import _ from "lodash";

const init = {
  modal: {
    type: null,
    visible: false,
  },
  logged_in: false,
  user: null,
  status_checked: false,
};
function userReducer(state = init, action) {
  switch (action.type) {
    case "USER_LOGGED_IN": {
      const copy = _.cloneDeep(state);
      copy.logged_in = true;
      copy.user = action.user_data;
      return copy;
    }
    case "USER_LOGOUT": {
      const copy = _.cloneDeep(state);
      copy.logged_in = false;
      copy.user = null;
      return copy;
    }
    case "USER_LOGIN_CHECK": {
      const copy = _.cloneDeep(state);

      copy.user = action.user_data;
      copy.status_checked = true;
      copy.logged_in = action.logged_in;
      return copy;
    }
    // return Object.assign({}, state, {
    //   user: Object.assign({}, state, {}),
    // });
    case "AUTH_MODAL":
      const copy = _.cloneDeep(state);
      copy["modal"].visible = !state.modal.visible;
      copy["modal"].type = action.modal_type;
      return copy;
    default:
      return state;
  }
}

export default userReducer;
