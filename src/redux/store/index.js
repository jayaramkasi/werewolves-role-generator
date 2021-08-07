import { createStore, combineReducers } from "redux";

import playerReducer from "./reducers/playerReducer";
import identitiesReducer from "./reducers/identitiesReducer";

const rootReducer = combineReducers({
  players: playerReducer,
  identities: identitiesReducer
});

const store = createStore(rootReducer);

export default store;
