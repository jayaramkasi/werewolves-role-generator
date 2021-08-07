import { UPDATE_VILLAGER } from "../constants/identities";

export const updateVillagers = (role, value) => ({
  type: UPDATE_VILLAGER,
  payload: { role, value }
});
