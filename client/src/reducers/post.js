import _ from "lodash";

const initialState = {
  selected: null,

  byId: {},
  allIds: [],

  is_fetching: false,
  is_creating: false,
  initial_load: false,
  current_sort: null,
};

function postReducer(state = initialState, action) {
  switch (action.type) {
    case "NEW_COMMENT":
      if (action.comment_type === "comment") {
        const copy = _.cloneDeep(state);

        copy["byId"][action.comment_data.post_id].comments.push(
          action.comment_data.uid
        );

        return copy;
      }

      return state;
    case "POST_SELECTED":
      return Object.assign({}, state, {
        selected: action.uid,
      });
    case "FETCH_SINGLE_POST":
      const copy = _.cloneDeep(state);
      copy.byId = {
        ...copy.byId,
        ...action.post.entities,
      };
      if (!copy.allIds.includes(action.post.result[0])) {
        copy.allIds.push(action.post.result[0]);
      }
      return copy;
    case "IS_CREATE_POST":
      return Object.assign({}, state, {
        is_creating: !state.is_creating,
      });
    case "NEW_POST":
      return Object.assign({}, state, {
        is_creating: false,
      });
    case "POST_DESELECTED":
      return Object.assign({}, state, {
        selected: null,
      });
    case "USER_VOTE": {
      if (action.entity_type !== "post") {
        return state;
      }
      const state_copy = _.cloneDeep(state);
      state_copy.byId[action.entity_id]["vote_state"] = action.vote_state;
      state_copy.byId[action.entity_id]["vote_total"] = action.vote_total;

      return state_copy;
    }
    case "FETCH_POSTS":
      return Object.assign({}, state, {
        is_fetching: true,
      });
    case "SORT_POSTS":
      return Object.assign({}, state, {
        initial_load: false,
        current_sort: action.sort,
      });
    case "POSTS_LOADED":
      return Object.assign({}, state, {
        byId: action.posts.entities.posts,
        allIds: action.posts.result,
        initial_load: true,
        is_fetching: false,
        current_sort: action.current_sort,
      });
    default:
      return state;
  }
}
export default postReducer;
