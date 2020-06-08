import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const Pokemon = props => {
  const { pokemon, getPokemon } = useContext(GlobalContext);
  const [currPokemon, setPokemon] = useState({});

  useEffect(() => {
    getPokemon(props.match.params.name);
  }, []);

  useEffect(() => {
    setPokemon(pokemon);
  }, [pokemon]);

  if (currPokemon.abilities === undefined) {
    return (
      <div>
        Loading...
      </div>
    )
  } else {
    return (
      <div className="container pokeContainer">
        <div className="pokeHeader">
          <div>
            <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${props.match.params.id}.png`} alt="" />
          </div>
          <div>
            TO DO - Pokemon stats go here <br />
            #{props.match.params.id} - {props.match.params.name}
            <br />
            Abilities - {currPokemon.abilities[0].ability.name}
            <br />
            Types -
          </div>
        </div>

        <hr />

        <div className="sprites">
          V Sprites <br />
          {Object.values(currPokemon.sprites).map(item => item ? (
            <img src={item} key={item} alt="" />
          ) : null)}
        </div>
        <div className="stats">
          V Stats <br />
        </div>
        <div className="evolution">
          V Evolutions <br />
        </div>
      </div>
    )
  }
}
