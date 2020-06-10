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

  const onClick = e => {
    if (e.target.innerHTML[0] == 'V') {
      e.target.innerHTML = e.target.innerHTML.replace('V', '^');
    } else {
      e.target.innerHTML = e.target.innerHTML.replace('^', 'V');
    }
    e.target.nextElementSibling.nextElementSibling.classList.toggle('hidden');
  }

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
          {console.log('stats are ', currPokemon)}
          <div>
            <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${props.match.params.id}.png`} alt="" />
          </div>
          <div>
            TO DO - Pokemon stats go here <br />
            <h3>#{props.match.params.id} - {props.match.params.name}</h3>
            <div className="moreInfo">
              <div>
                <p>Abilities</p>
                {Object.values(currPokemon.abilities).map((item, index) => (
                  <span key={index}>{item.ability.name} </span>
                ))}
                <p>Types</p>
                {Object.values(currPokemon.types).map((item, index) => (
                  <span className={item.type.name} key={index}>{item.type.name.toUpperCase()} </span>
                ))}
              </div>
              <div>
                <p>Height: {parseFloat(currPokemon.height / 10)}m</p>
                <p>Weight: {parseFloat(currPokemon.weight / 10)}kg</p>
              </div>
            </div>
          </div>



        </div>

        <hr />

        <button onClick={onClick}>
          V Sprites
        </button> <br />
        <div className="sprites">
          {Object.values(currPokemon.sprites).map(item => item ? (
            <img src={item} key={item} alt="" />
          ) : null)}
        </div>
        <button onClick={onClick}>
          V Stats
        </button> <br />
        <div className="stats">
          {Object.values(currPokemon.stats).map((item, index) => (
            <div key={index}>{item.stat.name}: {item.base_stat}</div>
          ))}
          <br />
        </div>
        <button onClick={onClick}>
          V Evolutions
        </button> <br />
        <div className="evolution">
          Evolution chain goes here
        </div>
      </div>
    )
  }
}
