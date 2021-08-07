import {} from "../../constants";
import { UPDATE_VILLAGER } from "../../constants/identities";

const initialState = {
  werewolves: {
    werewolf: 1,
    loneWerewolf: 0,
    minions: 1,
  },
  villagers: {
    villager: 2,
    seer: 1,
    witch: 1,
    monarch: 0,
    executioner: 0,
    hooker: 0,
  },
  vampires: {
    masterVampire: 0,
  },
  cultists: {
    cultist: 0,
  },
  troll: {
    zatch: 0,
  },
};

const gameReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case UPDATE_VILLAGER:
      console.log({
        [action.payload.role]: action.payload.value,
        ...state.villagers,
      });
      return {
        ...state,
        villagers: {
          [action.payload.role]: action.payload.value,
          ...state.villagers,
        },
      };
    default:
      return state;
  }
};

export default gameReducer;
