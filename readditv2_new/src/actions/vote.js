import axios from "axios";

function handleVote(score, type, entity_id, vote_state, vote_total) {
  let new_vote_state;

  if (vote_state === 1) {
    if (score === 1) {
      new_vote_state = 0;
      vote_total--;
    } else if (score === -1) {
      new_vote_state = -1;
      vote_total -= 2;
    }
  } else if (vote_state === -1) {
    if (score === 1) {
      new_vote_state = 1;
      vote_total += 2;
    } else if (score === -1) {
      new_vote_state = 0;
      vote_total++;
    }
  } else if (vote_state === 0) {
    if (score === 1) {
      new_vote_state = 1;
      vote_total++;
    } else if (score === -1) {
      new_vote_state = -1;
      vote_total--;
    }
  }
  return async (dispatch, getState) => {
    const current_user = getState().user.user;

    let entity_type = `${type}_id`;

    await axios.put("/api/votes", {
      id: entity_id,
      score: new_vote_state,
      user_id: current_user.uid,
      type,
    });
    dispatch({
      type: "USER_VOTE",
      vote_total,
      vote_state: new_vote_state,
      entity_type: type,
      entity_id,
    });
  };
}
export { handleVote };
