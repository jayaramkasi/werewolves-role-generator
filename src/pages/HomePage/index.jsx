import React from "react";
// redux
import { useSelector, useDispatch } from "react-redux";
import { updatePlayerName, updateVillagers } from "../../redux/actions";
import { Input, Counter, Button } from "beatle-ui";

import identities from "../../identities.json";

export default function HomePage(props) {
  const dispatch = useDispatch();
  const players = useSelector((state) => state.players);
  const { werewolves, villagers, vampires, cultists, trolls } = useSelector(
    (state) => state.identities
  );

  const handleNameChange = (event, index) => {
    dispatch(updatePlayerName(index, event.target.value));
  };

  const townFaction = identities.filter((identity) => identity.faction === "T");
  const werewolfFaction = identities.filter(
    (identity) => identity.faction === "W"
  );

  return (
    <div className="container grid grid-cols-4 gap-2 ">
      <div className="flex flex-col items-center m-4 p-2">
        <h1 className="text-xl font-extrabold mb-2">
          Players ({players.length})
        </h1>
        {players.map((player, i) => (
          <Input
            containerClass="p-2 m-2 ring-1 w-full"
            placeholder={`Player: ${i}`}
            key={i}
            value={player.name}
            onChange={(e) => handleNameChange(e, i)}
          />
        ))}
        <Button variant="primary" className="w-full p-2 m-2">
          NEW GAME
        </Button>
        <Button variant="outlined-primary" className="w-full p-2 m-2">
          CURRENT GAME
        </Button>
      </div>
      <div className="flex flex-col m-4 items-start p-2">
        <h1 className="text-xl font-extrabold mb-2">Identities</h1>
        <h3 className="text-lg font-extrabold my-2 text-gray-400">
          Town faction
        </h3>
        {townFaction.map((identity) => (
          <div key={identity.role} className="p-0 flex w-60 justify-end">
            <div className="flex items-center">{identity.role}</div>
            <Counter
              minValue={0}
              defaultValue={villagers[identity.role]}
              className="flex justify-end align-bottom"
              buttonClassNames="px-2 py-0"
              buttonContainerClassNames="justify-end"
              onChange={(e) => {
                console.log(villagers[identity.role]);
                // dispatch(updateVillagers(identity.role,e))
              }}
            />
          </div>
        ))}
        <h3 className="text-lg my-2 font-extrabold text-gray-400">
          Werewolves faction
        </h3>
        {werewolfFaction.map((identity) => (
          <div key={identity.role} className="p-0 flex w-60 justify-end">
            <div className="flex items-center">{identity.role}</div>
            <Counter
              minValue={0}
              defaultValue={werewolves[identity.role]}
              className="flex justify-end align-bottom"
              buttonClassNames="px-2 py-0"
              buttonContainerClassNames="justify-end"
              onChange={(e) => {
                // dispatch(updateVillagers(identity.role,e))
              }}
            />
          </div>
        ))}
        <h3 className="text-lg my-2 font-extrabold text-gray-400">Vampire</h3>

        <div className="p-0 flex w-60 justify-end">
          <div className="flex items-center">MasterVampire</div>
          <Counter
            minValue={0}
            value={vampires.masterVampire}
            className="flex justify-end align-bottom"
            buttonClassNames="px-2 py-0"
            buttonContainerClassNames="justify-end"
            onChange={(e) => {
              // dispatch(updateVillagers(identity.role,e))
            }}
          />
        </div>
        <h3 className="text-lg my-2 font-extrabold text-gray-400">Cultist</h3>
        <div className="p-0 flex w-60 justify-end">
          <div className="flex items-center">Cultist</div>
          <Counter
            minValue={0}
            value={cultists.cultist}
            className="flex justify-end align-bottom"
            buttonClassNames="px-2 py-0"
            buttonContainerClassNames="justify-end"
            onChange={(e) => {
              // dispatch(updateVillagers(identity.role,e))
            }}
          />
        </div>
      </div>
      <div className="col-span-2 flex flex-col m-4 items-start p-2">
        <h1 className="text-xl font-extrabold mb-2">Abilities</h1>
      </div>
    </div>
  );
}
