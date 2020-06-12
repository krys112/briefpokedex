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
    // Will lead to syntax error if classList does not exist
    let target = e.target;
    if (target.classList[0].includes('toggleBtn')) {
      target = target.firstElementChild;
      e.target.nextElementSibling.nextElementSibling.classList.toggle('hidden');
    } else {
      target.parentNode.nextElementSibling.nextElementSibling.classList.toggle('hidden');
    }
    if (target.classList[1].includes('up')) {
      target.classList = 'fa fa-chevron-down';
    } else {
      target.classList = 'fa fa-chevron-up';
    }
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
            <h3>#{props.match.params.id} - {props.match.params.name.toUpperCase()}</h3>
            <div className="moreInfo">
              <div>
                <p>Abilities</p>
                {Object.values(currPokemon.abilities).map((item, index) => (
                  <div className={`type ${item.is_hidden ? "is-hidden" : "normal"}`} key={index}>{item.ability.name.toUpperCase()} </div>
                ))}
                <p>Types</p>
                {Object.values(currPokemon.types).map((item, index) => (
                  <div className={`type ${item.type.name}`} key={index}><span className="type-text">{item.type.name.toUpperCase()}</span></div>
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

        <button className='toggleBtn' onClick={onClick}>
          <i className="fa fa-chevron-up" aria-hidden="true"></i> Sprites
        </button> <br />
        <div className="sprites">
          {Object.values(currPokemon.sprites).map(item => item ? (
            <img src={item} key={item} alt="" />
          ) : null)}
        </div>
        <button className='toggleBtn' onClick={onClick}>
          <i className="fa fa-chevron-up" aria-hidden="true"></i> Stats
        </button> <br />
        <div className="stats">
          {Object.values(currPokemon.stats).map((item, index) => (
            <div key={index}><p>{item.stat.name.toUpperCase()}</p><p>{item.base_stat}</p></div>
          ))}
          <br />
        </div>
        <button className='toggleBtn' onClick={onClick}>
          <i className="fa fa-chevron-up" aria-hidden="true"></i> Evolutions
        </button> <br />
        <div className="evolution">
          Evolution chain goes here
        </div>
      </div>
    )
  }
}
