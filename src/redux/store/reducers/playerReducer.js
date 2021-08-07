import { UPDATE_PLAYER_NAME, UPDATE_PLAYER_HOOK } from "../../constants";

const initialState = [
  {
    name: "",
    hook: "",
    role: "",
    ability: "",
    alive: true,
    isVampire: false,
    isCult: false
  },
  {
    name: "",
    hook: "",
    role: "",
    ability: "",
    alive: true,
    isVampire: false,
    isCult: false
  },
  {
    name: "",
    hook: "",
    role: "",
    ability: "",
    alive: true,
    isVampire: false,
    isCult: false
  },
  {
    name: "",
    hook: "",
    role: "",
    ability: "",
    alive: true,
    isVampire: false,
    isCult: false
  },
  {
    name: "",
    hook: "",
    role: "",
    ability: "",
    alive: true,
    isVampire: false,
    isCult: false
  },
  {
    name: "",
    hook: "",
    role: "",
    ability: "",
    alive: true,
    isVampire: false,
    isCult: false
  }
];

const playerReducer = (state = initialState, action) => {
  return state.map((player, pIndex) => ({
    ...(action && action.payload && pIndex === action.payload.index
      ? {
          ...player,
          ...(action.type === UPDATE_PLAYER_NAME
            ? { name: action.payload.name }
            : action.type === UPDATE_PLAYER_HOOK
            ? { hook: action.payload.hook }
            : player)
        }
      : player)
  }));
};

export default playerReducer;
