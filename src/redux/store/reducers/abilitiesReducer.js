import { UPDATE_ABILITY } from "../../constants";

const initialState = {
  Ancient: 0,
  "Bench Press": 0,
  Cockblock: 0,
  "Dark Pact": 0,
  Diseased: 0,
  Echolocation: 0,
  "Flower Power": 0,
  "Goblin Contract": 0,
  Haunt: 0,
  Hindsight: 0,
  "Holy Water": 0,
  Idol: 0,
  Inquisitor: 0,
  Jailor: 0,
  Martyr: 0,
  Mask: 0,
  Mortician: 0,
  "Old Age": 0,
  Omen: 0,
  Ordinary: 0,
  Parity: 0,
  Pickpocket: 0,
  Pokerface: 0,
  Possesion: 0,
  Reaper: 0,
  Resonate: 0,
  Revealer: 0,
  "Sleeping Potion": 0,
  Stronghold: 0,
  "Stupid Pills": 0,
  "Tentacle Alien": 0,
  Undead: 0,
  Vagabond: 0,
  Weaponsmith: 0,
};

const abilitiesReducer = (state = initialState, action) => {
  return {
    ...state,
    ...(action.type === UPDATE_ABILITY
      ? { [action.payload.ability]: action.payload.count }
      : {}),
  };
};

export default abilitiesReducer;
