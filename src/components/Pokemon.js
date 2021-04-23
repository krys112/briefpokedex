import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import { StatProgress } from "./StatProgress";

export const Pokemon = (props) => {
  const { pokemon, getPokemon, deselectPoke } = useContext(GlobalContext);
  const [currPokemon, setPokemon] = useState({});

  useEffect(() => {
    getPokemon(props.poke.poke);
  }, []);

  useEffect(() => {
    setPokemon(pokemon);
  }, [pokemon]);

  const onClick = (e) => {
    // Will lead to syntax error if classList does not exist
    let target = e.target;
    if (target.classList[0].includes("toggleBtn")) {
      target = target.firstElementChild;
      e.target.nextElementSibling.nextElementSibling.classList.toggle("hidden");
    } else {
      target.parentNode.nextElementSibling.nextElementSibling.classList.toggle(
        "hidden"
      );
    }
    if (target.classList[1].includes("up")) {
      target.classList = "fa fa-chevron-down";
    } else {
      target.classList = "fa fa-chevron-up";
    }
  };

  const toFeet = (height) => {
    let cm = height * 10;
    let feet = cm / 30.48;
    if (feet % 1 > 0.96) {
      feet = Math.round(feet);
    }
    let inches = Math.round((feet % 1) * 12);
    return `${Math.floor(feet)}'${inches}"`;
  };

  const toPounds = (weight) => {
    return Math.round(weight * 2.205 * 10) / 10;
  };

  const close = (e) => {
    deselectPoke();
  };

  if (currPokemon.abilities === undefined) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="container pokeContainer">
        <div className="pokeHeader">
          {console.log("stats are ", currPokemon)}
          <div>
            <img
              src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${props.poke.s}.png`}
              alt=""
            />
          </div>
          <div>
            <h3>
              #{props.poke.s} - {props.poke.poke.toUpperCase()}
              <span className="close-btn" onClick={close}>
                X
              </span>
            </h3>

            <div className="moreInfo">
              <div>
                <h4>Abilities</h4>
                {Object.values(currPokemon.abilities).map((item, index) => (
                  <div
                    className={`type ${
                      item.is_hidden ? "is-hidden" : "normal"
                    }`}
                    key={index}
                  >
                    {item.ability.name.toUpperCase()}{" "}
                  </div>
                ))}
                <h4>Types</h4>
                {Object.values(currPokemon.types).map((item, index) => (
                  <div className={`type ${item.type.name}`} key={index}>
                    <span className="type-text">
                      {item.type.name.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
              <div>
                <h4>Height</h4>
                <p>
                  {parseFloat(currPokemon.height / 10)}m /{" "}
                  {toFeet(currPokemon.height)}
                </p>
                <h4>Weight</h4>
                <p>
                  {parseFloat(currPokemon.weight / 10)}kg /{" "}
                  {toPounds(currPokemon.weight / 10)}lbs
                </p>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <button className="toggleBtn" onClick={onClick}>
          <i className="fa fa-chevron-up" aria-hidden="true"></i> Sprites
        </button>{" "}
        <br />
        <div className="sprites">
          {Object.values(currPokemon.sprites).map((item) =>
            item ? <img src={item} key={item} alt="" /> : null
          )}
        </div>
        <button className="toggleBtn" onClick={onClick}>
          <i className="fa fa-chevron-up" aria-hidden="true"></i> Stats
        </button>{" "}
        <br />
        <div className="stats">
          {Object.values(currPokemon.stats).map((item, index) => (
            <div className="stat-data" key={index}>
              <p>
                <strong>{item.stat.name.toUpperCase()}</strong>
              </p>
              <p>{item.base_stat}</p>
              <StatProgress name={item.stat.name} stat={item.base_stat} />
            </div>
          ))}
          <br />
        </div>
        <button className="toggleBtn" onClick={onClick}>
          <i className="fa fa-chevron-up" aria-hidden="true"></i> Evolutions
        </button>{" "}
        <br />
        <div className="evolution">Evolution chain goes here</div>
      </div>
    );
  }
};
