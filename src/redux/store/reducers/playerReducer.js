import {
  UPDATE_PLAYER_NAME,
  UPDATE_PLAYER,
  ADD_PLAYER,
  REMOVE_PLAYER,
  CLEAR_GAME,
  UPDATE_PLAYER_ABILITY,
  UPDATE_PLAYER_IDENTITY,
} from "../../constants";

const initialState = [
  {
    name: "",
    hook: "",
    identity: "",
    ability: "",
    used: false,
    alive: true,
    isVampire: false,
    isCult: false,
  },
  {
    name: "",
    hook: "",
    identity: "",
    ability: "",
    used: false,
    alive: true,
    isVampire: false,
    isCult: false,
  },
  {
    name: "",
    hook: "",
    identity: "",
    ability: "",
    used: false,
    alive: true,
    isVampire: false,
    isCult: false,
  },
  {
    name: "",
    hook: "",
    identity: "",
    ability: "",
    used: false,
    alive: true,
    isVampire: false,
    isCult: false,
  },
  {
    name: "",
    hook: "",
    identity: "",
    ability: "",
    used: false,
    alive: true,
    isVampire: false,
    isCult: false,
  },
  {
    name: "",
    hook: "",
    identity: "",
    ability: "",
    used: false,
    alive: true,
    isVampire: false,
    isCult: false,
  },
];

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLAYER:
      return [
        ...state,
        {
          name: "",
          hook: "",
          identity: "",
          ability: "",
          used: false,
          alive: true,
          isVampire: false,
          isCult: false,
        },
      ];
    case REMOVE_PLAYER:
      return state.filter((_, index) => index !== action.payload.playerIndex);
    case UPDATE_PLAYER_NAME:
      return state.map((player, pIndex) => ({
        ...(pIndex === action.payload.index
          ? {
              ...player,
              name: action.payload.name,
            }
          : player),
      }));
    case UPDATE_PLAYER:
      const { index, ...data } = action.payload;
      return state.map((player, pIndex) => ({
        ...(index === pIndex
          ? {
              ...player,
              ...data,
            }
          : player),
      }));

    case CLEAR_GAME:
      return state.map((player) => ({
        ...player,
        identity: "",
        ability: "",
        alive: true,
        isVampire: false,
        isCult: false,
      }));
    default:
      return state;
  }
};

export default playerReducer;
