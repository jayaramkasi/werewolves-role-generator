import {
  CREATE_CULTIST,
  CREATE_MASTER_VAMPIRE,
  REMOVE_MASTER_VAMPIRE,
  REMOVE_CULTIST,
  UPDATE_VILLAGER,
  UPDATE_WEREWOLF,
} from "../../constants/identities";

const initialState = {
  werewolves: {
    werewolf: 1,
    loneWerewolf: 0,
    minion: 1,
  },
  villagers: {
    villager: 2,
    seer: 1,
    witch: 1,
    monarch: 0,
    executioner: 0,
    hooker: 0,
    zatch: 0,
  },
  vampires: {
    masterVampire: 0,
  },
  cultists: {
    cultist: 0,
  },
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_VILLAGER:
      return {
        ...state,
        villagers: {
          ...state.villagers,
          [action.payload.role]: action.payload.value,
        },
      };
    case UPDATE_WEREWOLF:
      return {
        ...state,
        werewolves: {
          ...state.werewolves,
          [action.payload.role]: action.payload.value,
        },
      };
    case CREATE_MASTER_VAMPIRE:
      return {
        ...state,
        vampires: {
          masterVampire: 1,
        },
      };
    case REMOVE_MASTER_VAMPIRE:
      return {
        ...state,
        vampires: {
          masterVampire: 0,
        },
      };
    case CREATE_CULTIST:
      return {
        ...state,
        cultists: {
          cultist: 1,
        },
      };
    case REMOVE_CULTIST:
      return {
        ...state,
        cultists: {
          cultist: 0,
        },
      };
    default:
      return state;
  }
};

export default gameReducer;
