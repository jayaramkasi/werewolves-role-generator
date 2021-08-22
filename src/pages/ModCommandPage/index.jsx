import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { updatePlayer } from "../../redux/actions";

import Button from "../../components/Button";
import Checkbox from "../../components/Checkbox";
import Input from "../../components/Input";

import play from "../../assets/play.svg";

import abilities from "../../abilities.json";
import identities from "../../identities.json";

export default function ModCommand(props) {
  const players = useSelector((state) => state.players);
  const dispatch = useDispatch();

  const alivePlayers = players
    .filter((player) => player.alive)
    .map((player) => ({
      ...player,
      faction: identities.find((identity) => identity.role === player.identity)
        .faction,
    }));
  const villageWin = alivePlayers.every((player) => player.faction === "T");

  const werewolfWin = alivePlayers.every(
    (player) => player.faction === "W" && player.identity !== "loneWerewolf"
  );
  const loneWolfWin =
    alivePlayers.length === 1 && alivePlayers[0].identity === "loneWerewolf";

  const cultistWin = alivePlayers.every((player) => player.isCult);

  const vampireWin = alivePlayers.every((player) => player.isVampire);
  console.log(vampireWin);

  const handleHookChange = (e, i) => {
    dispatch(updatePlayer(i, { hook: e.target.value }));
  };

  const alertPlayer = async (player) => {
    console.log(player);
    const identity = identities.find(
      (identity) => identity.role === player.identity
    );
    const ability = abilities.find(
      (ability) => ability.name === player.ability
    );

    if (identity.faction !== "W") {
      const res =
        player.hook &&
        (await fetch(player.hook, {
          method: "POST",
          body: JSON.stringify({
            text: `Hi ${player.name}, \n\n 
Your identity: *${identity.role}* \n${identity.description}\n\n
Your ability: *${ability.name}*\n\n${ability.player}`,
          }),
        }).then((response) => {
          console.log(response.ok);
        }));
    } else {
      const werewolves = players.filter(
        (player) =>
          identities.find((i) => i.role === player.identity).faction === "W"
      );
      console.log(werewolves);

      const knownTeammates =
        player.identity === "minion"
          ? werewolves
          : werewolves.filter(
              (wolf) => wolf.identity !== "minion" && wolf.name !== player.name
            );

      const res =
        player.hook &&
        (await fetch(player.hook, {
          method: "POST",
          body: JSON.stringify({
            text: `Hi ${player.name}, \n\n 
Your identity: *${identity.role}* \n${identity.description}\n\n
Your ability: *${ability.name}*\n\n${ability.player}\n\n
Your known teammates: *${knownTeammates.map((wolf) => wolf.name).join(", ")}* ${
              knownTeammates.length === 0 ? "nobody" : ""
            }`,
          }),
        }));
    }
  };

  const alertVampires = async (player) => {
    const otherVampires = players.filter(
      (player) =>
        player.alive && player.isVampire && player.identity !== "masterVampire"
    );

    const res =
      player.hook &&
      (await fetch(player.hook, {
        method: "POST",
        body: JSON.stringify({
          text: `${
            player.name
          }, you've been turned by the master vampire! You are now allied to the vampires team! \n\n
          ${
            otherVampires.length === 0
              ? `You are the first person turned`
              : `These people are also vampires -  ${otherVampires
                  .map((vampire) => vampire.name)
                  .join(",")}`
          }. \n\n`,
        }),
      }));

    otherVampires.map(async (vampire) => {
      const newRes =
        vampire.hook &&
        (await fetch(vampire.hook, {
          method: "POST",
          body: JSON.stringify(
            `${player.name} is also turned by the master vampire! \n\n `
          ),
        }));
    });
  };

  const alertCultTurn = async (player) => {
    if (player.identity !== "cultist") {
      const res = await fetch(player.hook, {
        method: "POST",
        body: JSON.stringify({
          text: `*${player.name}:* You've been turned to the cult by the master cultist! \n\n *Find and lynch/kill them *`,
        }),
      });
    }
  };

  return (
    <div className="grid grid-flow-row grid-cols-12 p-12">
      <div className="col-span-2 flex justify-between text-xl font-extrabold mb-2 pr-4">
        <div>Players</div>
        <div>Alive?</div>
      </div>
      <div className="col-span-4 flex justify-start text-xl font-extrabold mb-2">
        Hooks
      </div>
      <div className="col-span-2 flex justify-start text-xl font-extrabold mb-2">
        Identities
      </div>
      <div className="col-span-2 flex justify-start text-xl font-extrabold mb-2">
        Abilities (Used?)
      </div>
      <div className="col-span-1 flex justify-start text-xl font-extrabold mb-2">
        Vampire
      </div>
      <div className="col-span-1 flex justify-start text-xl font-extrabold mb-2">
        Cult
      </div>
      {players.map((player, i) => (
        <React.Fragment key={`player-${i}`}>
          <div
            className={`col-span-2 flex flex-row justify-between p-2 items-center ${
              player.alive ? "text-gray-900" : "text-gray-200"
            }`}
          >
            <p>{player.name}</p>
            <Checkbox
              variant="primary"
              value={player.alive}
              onChange={(e) => {
                dispatch(updatePlayer(i, { alive: !player.alive }));
              }}
            />
          </div>
          <div
            className={`col-span-4 flex flex-row justify-between px-4 items-center  ${
              player.alive ? "text-gray-900" : "text-gray-200"
            }`}
          >
            <Input
              containerClass="px-2 focus:ring-0 w-full"
              classNameInput="w-full border-2 border-black"
              className="w-full"
              placeholder={`${player.name}'s webhook`}
              key={i}
              value={player.hook}
              onChange={(e) => handleHookChange(e, i)}
            />
            <Button
              variant="primary"
              onClick={() => {
                alertPlayer(player);
              }}
            >
              <img src={play} />
            </Button>
          </div>
          <div
            className={`col-span-1 flex flex-row justify-between p-2 items-center ${
              player.alive ? "text-gray-900" : "text-gray-200"
            }`}
          >
            {player.identity}
          </div>
          <div
            className={`col-span-3 flex flex-row justify-between px-6 items-center ${
              player.used ? `line-through` : ``
            } ${player.alive ? "text-gray-900" : "text-gray-200"}`}
          >
            {player.ability}
            {player.used}
            <Checkbox
              variant="primary"
              value={player.used}
              onChange={() => {
                dispatch(updatePlayer(i, { used: !player.used }));
              }}
            />
          </div>
          <div
            className={`col-span-1 flex flex-row justify-between p-2 items-center `}
          >
            <Checkbox
              variant={player.alive ? "primary" : "secondary"}
              value={player.isVampire}
              onChange={(e) => {
                e && player.role !== "masterVampire" && alertVampires(player);
                dispatch(updatePlayer(i, { isVampire: !player.isVampire }));
              }}
            />
          </div>
          <div
            className={`col-span-1 flex flex-row justify-between p-2 items-center`}
          >
            <Checkbox
              variant="primary"
              value={player.isCult}
              onChange={(e) => {
                e && alertCultTurn(player);
                dispatch(updatePlayer(i, { isCult: !player.isCult }));
              }}
            />
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}
