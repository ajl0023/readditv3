import _ from "lodash";
const initialState = {
  byId: {},
  allIds: [],

  loaded: false,
};

function commentReducer(state = initialState, action) {
  switch (action.type) {
    case "COMMENTS_LOADED":
      return Object.assign({}, state, {
        byId: action.comments.entities,
        allIds: action.comments.result,
      });
    case "NEW_COMMENT":
      const copy = _.cloneDeep(state);

      copy["byId"][action.comment_data.uid] = action.comment_data;
      if (action.comment_type === "reply") {
        copy["byId"][action.comment_data.parent_comment_id].comments.push(
          action.comment_data.uid
        );
      }
      copy["allIds"].push(action.comment_data.uid);

      return copy;
    case "USER_VOTE":
      if (action.entity_type !== "comment") {
        return state;
      }
      const state_copy = _.cloneDeep(state);
      state_copy.byId[action.entity_id]["vote_state"] = action.vote_state;
      state_copy.byId[action.entity_id]["vote_total"] = action.vote_total;
      return state_copy;
    default:
      return state;
  }
}
export default commentReducer;
