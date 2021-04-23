import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export const Search = () => {
  const [name, setName] = useState("");

  const { filterPokemon, originalList } = useContext(GlobalContext);

  const onChange = (e) => {
    let value = e.target.value;
    setName(value);
    let newList = originalList.filter((item) =>
      item.url.match(/(\d*)\/$/)[1].startsWith(value)
    );
    if (newList.length === 0) {
      newList = originalList.filter((item) => item.name.includes(value));
    }
    filterPokemon(newList);
  };

  return (
    <div className="container">
      <form>
        <input
          className="search-box no-border"
          type="text"
          value={name}
          onChange={onChange}
          placeholder="Filter by name"
        />
      </form>
    </div>
  );
};
