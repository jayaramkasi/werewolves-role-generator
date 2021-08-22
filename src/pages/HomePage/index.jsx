import React from "react";
import { useHistory } from "react-router-dom";
// redux
import { useSelector, useDispatch } from "react-redux";
import {
  updatePlayerName,
  updateVillagers,
  updateWerewolves,
  createCultist,
  removeVampire,
  createVampire,
  removeCultist,
  updateAbility,
  updatePlayer,
  addPlayer,
  removePlayer,
} from "../../redux/actions";

// import { Button } from "beatle-ui";

import Button from "../../components/Button";
import Input from "../../components/Input";
import Counter from "../../components/Counter";

import identities from "../../identities.json";
import masterAbilities from "../../abilities.json";

export default function HomePage(props) {
  const history = useHistory();
  function shuffle(a) {
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = ~~(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  }

  const dispatch = useDispatch();
  const players = useSelector((state) => state.players);
  const { werewolves, villagers, vampires, cultists } = useSelector(
    (state) => state.identities
  );

  const abilities = useSelector((state) => state.abilities);

  const handleNameChange = (event, index) => {
    dispatch(updatePlayerName(index, event.target.value));
  };

  const clearGame = () => {
    dispatch(clearGame());
  };

  const objectToArray = (typeObject) =>
    Object.entries(typeObject)
      .filter(([, count]) => count > 0)
      .reduce((roleArray, [role, count]) => {
        for (let i = 0; i < count; i++) roleArray.push(role);
        return roleArray;
      }, []);

  const getIdentitiesArray = () => {
    const allIdentities = {
      ...villagers,
      ...werewolves,
      ...vampires,
      ...cultists,
    };
    const identitiesArray = objectToArray(allIdentities);
    return identitiesArray;
  };
  const getAbilitiesArray = () => objectToArray(abilities);

  const handleCreateNewGame = () => {
    const identitiesArray = getIdentitiesArray();
    const abilitiesArray = getAbilitiesArray();

    // First shuffle
    const shuffledIdentities = shuffle(identitiesArray),
      shuffledAbilities = shuffle(abilitiesArray);
    console.log(shuffledAbilities, shuffledIdentities);

    players.map((player, i) => {
      // console.log(player, i, shuffledAbilities[i], shuffledIdentities[i]);
      dispatch(
        updatePlayer(i, {
          ability: shuffledAbilities[i],
          identity: shuffledIdentities[i],
          isVampire: shuffledIdentities[i] === "masterVampire",
          isCult: shuffledIdentities[i] === "cultist",
          alive: true,
        })
      );
    });
    history.push("/game");
  };

  const townFaction = identities.filter((identity) => identity.faction === "T");
  const werewolfFaction = identities.filter(
    (identity) => identity.faction === "W"
  );

  const townTotal = townFaction.reduce(
      (acc, identity) => acc + villagers[identity.role],
      0
    ),
    werewolfTotal = werewolfFaction.reduce(
      (acc, identity) => acc + werewolves[identity.role],
      0
    );

  const totalIdentities =
    townTotal + werewolfTotal + vampires.masterVampire + cultists.cultist;

  const totalAbilities = Object.values(abilities).reduce(
    (sum, count) => sum + count,
    0
  );

  const isGameReady =
    players.length !== totalIdentities ||
    players.length !== totalAbilities ||
    players.some((player) => player.name === "");

  console.log(players);

  return (
    <div className="container grid grid-cols-4 gap-2 ">
      <div className="flex flex-col items-center m-4 p-2">
        <h1
          className={`text-xl font-extrabold mb-2 ${
            players.length === totalIdentities ||
            players.length === totalAbilities
              ? `text-green-500`
              : ``
          }`}
        >
          Players ({players.length})
        </h1>
        <div>
          {players.map((player, i) => (
            <div
              key={`player-${i}`}
              className="flex flex-row pb-1 items-center justify-center"
            >
              <Input
                containerClass="p-2 ring-1 w-full"
                placeholder={`Player: ${i}`}
                key={i}
                value={player.name}
                onChange={(e) => handleNameChange(e, i)}
              />
              <Button
                variant="secondary"
                className="px-2"
                onClick={() => {
                  dispatch(removePlayer(i));
                }}
              >
                -
              </Button>
            </div>
          ))}
        </div>

        <Button
          variant="secondary"
          className="my-4 px-2"
          onClick={() => {
            dispatch(addPlayer());
          }}
        >
          + player
        </Button>
        <Button
          variant="primary"
          className="w-full p-2 m-2"
          disabled={isGameReady}
          onClick={handleCreateNewGame}
        >
          NEW GAME
        </Button>
        <Button variant="outlined-primary" className="w-full p-2 m-2">
          CURRENT GAME
        </Button>
      </div>
      <div className="flex flex-col m-4 items-start p-2">
        <h1
          className={`text-xl font-extrabold mb-2 ${
            players.length === totalIdentities ||
            totalIdentities === totalAbilities
              ? `text-green-500`
              : ``
          }`}
        >
          Identities ({totalIdentities})
        </h1>
        <h3 className="text-lg font-extrabold my-2 text-gray-400">
          Town faction
        </h3>
        {townFaction.map((identity) => (
          <div key={identity.role} className="p-1 flex w-60 justify-end">
            <div className="flex items-center">{identity.role}</div>
            <Counter
              minValue={0}
              defaultValue={villagers[identity.role]}
              className="flex justify-end align-bottom"
              buttonClassNames="px-2 py-0"
              buttonContainerClassNames="justify-end"
              onChange={(e) => {
                dispatch(updateVillagers(identity.role, e));
              }}
            />
          </div>
        ))}
        <h3 className="text-lg my-2 font-extrabold text-gray-400">
          Werewolves faction
        </h3>
        {werewolfFaction.map((identity) => (
          <div key={identity.role} className="p-1 flex w-60 justify-end">
            <div className="flex items-center">{identity.role}</div>
            <Counter
              minValue={0}
              maxValue={identity.role === "werewolf" ? 10000000 : 1}
              defaultValue={werewolves[identity.role]}
              className="flex justify-end align-bottom"
              buttonClassNames="px-2 py-0"
              buttonContainerClassNames="justify-end"
              onChange={(e) => {
                dispatch(updateWerewolves(identity.role, e));
              }}
            />
          </div>
        ))}
        <h3 className="text-lg my-2 font-extrabold text-gray-400">Vampire</h3>

        <div className="p-0 flex w-60 justify-end">
          <div className="flex items-center">MasterVampire</div>
          <Counter
            minValue={0}
            maxValue={1}
            value={vampires.masterVampire}
            className="flex justify-end align-bottom"
            buttonClassNames="px-2 py-0"
            buttonContainerClassNames="justify-end"
            onChange={(e) => {
              dispatch(e === 1 ? createVampire() : removeVampire());
            }}
          />
        </div>
        <h3 className="text-lg my-2 font-extrabold text-gray-400">Cultist</h3>
        <div className="p-0 flex w-60 justify-end">
          <div className="flex items-center">Cultist</div>
          <Counter
            minValue={0}
            maxValue={1}
            value={cultists.cultist}
            className="flex justify-end align-bottom"
            buttonClassNames="px-2 py-0"
            buttonContainerClassNames="justify-end"
            onChange={(e) => {
              dispatch(e === 1 ? createCultist() : removeCultist());
            }}
          />
        </div>
      </div>
      <div className="col-span-2 flex flex-col m-4 items-start p-2">
        <h1
          className={`text-xl font-extrabold mb-2 ${
            players.length === totalAbilities ||
            totalIdentities === totalAbilities
              ? `text-green-500`
              : ``
          }`}
        >
          Abilities ({totalAbilities})
        </h1>
        <div className="flex flex-wrap">
          {masterAbilities.map((ability) => (
            <div
              key={ability.name}
              className="flex flex-row w-1/2 py-1 px-1 items-center justify-between"
            >
              <div className="pl-1 w-2/3 text-left">{ability.name}</div>
              <Counter
                minValue={0}
                value={abilities[ability.name]}
                variant="secondary"
                className="flex justify-end align-bottom"
                buttonClassNames="px-2 py-0"
                buttonContainerClassNames="justify-end"
                inputClassNames="py-0"
                onChange={(e) => {
                  dispatch(updateAbility(ability.name, e));
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
