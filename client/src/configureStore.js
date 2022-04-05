import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";

import { rootReducer } from "./reducers/root";
import { composeWithDevTools } from "redux-devtools-extension";

export default function configureStore(preloadedState) {
  const middlewares = [thunk];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);
  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  return store;
}
