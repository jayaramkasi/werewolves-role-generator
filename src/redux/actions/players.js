import {
  UPDATE_PLAYER_NAME,
  UPDATE_PLAYER,
  UPDATE_PLAYER_HOOK,
  UPDATE_PLAYER_ABILITY,
  UPDATE_PLAYER_CULT,
  UPDATE_PLAYER_VAMPIRE,
  ADD_PLAYER,
  REMOVE_PLAYER,
  CLEAR_GAME,
} from "../constants";

/**
 * Update a player's name
 *
 * @param {number} index
 * @param {string} name
 * @returns object
 */
export const updatePlayerName = (index, name) => ({
  type: UPDATE_PLAYER_NAME,
  payload: {
    index,
    name,
  },
});

/**
 * Updates a player's webhook to call (slack/Google chat)
 *
 * @param {number} index
 * @param {string} hook
 * @returns object
 */
export const changePlayerHook = (index, hook) => ({
  type: UPDATE_PLAYER_HOOK,
  payload: {
    index,
    hook,
  },
});

/**
 * Updates a player
 *
 * @param {number} index
 * @param {string}
 * @returns object
 */
export const updatePlayer = (
  index,
  { identity, ability, isVampire, isCult, alive, hook, used }
) => ({
  type: UPDATE_PLAYER,
  payload: {
    index,
    ...(hook ? { hook } : {}),
    ...(identity ? { identity } : {}),
    ...(ability ? { ability } : {}),
    isVampire: Boolean(isVampire),
    isCult: Boolean(isCult),
    ...(alive !== undefined ? { alive } : {}),
    ...(used !== undefined ? { used } : {}),
  },
});

/**
 * Updates a player's ability
 *
 * @param {number} index
 * @param {string} ability
 * @returns
 */
export const updatePlayerAbility = (index, ability) => ({
  type: UPDATE_PLAYER_ABILITY,
  payload: {
    index,
    ability,
  },
});

/**
 * Updates whether a player is a vampire
 *
 * @param {number} index Position of player on the grid
 * @param {boolean} isVampire Toggle vampire status
 * @returns
 */
export const updatePlayerVampire = (index, isVampire) => ({
  type: UPDATE_PLAYER_VAMPIRE,
  payload: {
    index,
    isVampire,
  },
});

/**
 * Updates player's cult status
 *
 * @param {number} index Position of player on the grid
 * @param {boolean} isCult Toggle cult membership status
 * @returns
 */

export const updatePlayerCult = (index, isCult) => ({
  type: UPDATE_PLAYER_CULT,
  payload: {
    index,
    isCult,
  },
});

export const addPlayer = () => ({
  type: ADD_PLAYER,
});

export const removePlayer = (playerIndex) => ({
  type: REMOVE_PLAYER,
  payload: {
    playerIndex,
  },
});

export const clearGame = () => ({
  type: CLEAR_GAME,
});
