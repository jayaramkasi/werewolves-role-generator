import { createStore, combineReducers } from "redux";

import playerReducer from "./reducers/playerReducer";
import identitiesReducer from "./reducers/identitiesReducer";
import abilitiesReducer from "./reducers/abilitiesReducer";

const rootReducer = combineReducers({
  players: playerReducer,
  identities: identitiesReducer,
  abilities: abilitiesReducer,
});

const store = createStore(rootReducer);

export default store;
