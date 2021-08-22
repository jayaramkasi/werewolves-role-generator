import { ADD_PLAYER, REMOVE_PLAYER, UPDATE_ABILITY } from "../constants";
import {
  CREATE_CULTIST,
  CREATE_MASTER_VAMPIRE,
  REMOVE_CULTIST,
  REMOVE_MASTER_VAMPIRE,
  UPDATE_VILLAGER,
  UPDATE_WEREWOLF,
} from "../constants/identities";

export const updateVillagers = (role, value) => ({
  type: UPDATE_VILLAGER,
  payload: { role, value },
});

export const updateWerewolves = (role, value) => ({
  type: UPDATE_WEREWOLF,
  payload: {
    role,
    value,
  },
});

export const createVampire = () => ({
  type: CREATE_MASTER_VAMPIRE,
});

export const removeVampire = () => ({
  type: REMOVE_MASTER_VAMPIRE,
});

export const createCultist = () => ({
  type: CREATE_CULTIST,
});

export const removeCultist = () => ({
  type: REMOVE_CULTIST,
});

export const updateAbility = (ability, count) => ({
  type: UPDATE_ABILITY,
  payload: {
    ability,
    count,
  },
});
