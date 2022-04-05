const init = {
  visible: false,
};
function modalReducer(state = init, action) {
  switch (action.type) {
    case "TOGGLE_VISIBLE":
      return Object.assign({}, state, {
        visible: !state.visible,
      });
    default:
      return state;
  }
}

export default modalReducer;
