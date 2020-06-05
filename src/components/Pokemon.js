import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const Pokemon = props => {
  const { pokemon, getPokemon } = useContext(GlobalContext);
  const [currPokemon, setPokemon] = useState({});

  useEffect(() => {
    getPokemon(props.match.params.id);
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
      <div class="pokeContainer">
        TO DO - Pokemon stats go here <br />
        {props.match.params.id}
        {currPokemon.abilities[0].ability.name}
        <img src={`https://img.pokemondb.net/artwork/${props.match.params.id}.jpg`} alt="" />
        <div className="sprites">
          Sprites:
          {Object.values(currPokemon.sprites).map(item => item ? (
            <img src={item} key={item} alt="" />
          ) : null)}
        </div>
      </div>
    )
  }
}
