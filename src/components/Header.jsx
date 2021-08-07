import React from "react";

import { Link } from "react-router-dom";

export default function Header(props) {
  return (
    <nav className="bg-black text-white space-between flex flex-wrap items-center justify-between px-2 py-3">
      <div className="mx-4 px-4 space-x-4 flex">
        <p>Werewolves of westminster</p>
        <Link to="/">Mod </Link>
        <Link to="/game">Game</Link>
      </div>
      <div>
        <Link to="/roles">Roles</Link>
        <Link to="/abilities">Abilities</Link>
      </div>
    </nav>
  );
}
