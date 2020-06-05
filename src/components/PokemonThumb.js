import React from 'react';
import { Link } from 'react-router-dom';

export const PokemonThumb = (poke) => {
  let id = 0;

  id = poke.poke.url.match(/\d*\/$/);
  id = id[0].substring(0, id[0].length - 1)

  let s = "00" + id;
  s = s.substr(s.length - 3);

  const imageLink = (e) => {
    let temp = poke.poke.name;
    if (temp.includes('mimikyu')) {
      temp = 'mimikyu';
    } else if (temp.includes('minior')) {
      temp = 'minior';
    }
    e.target.src = `https://img.pokemondb.net/sprites/ultra-sun-ultra-moon/small/${temp}.jpg`
    return true;
  }

  return (
    <div className="card text-center">
      <Link to={`pokemon/${poke.poke.name}`}>
        <img
          className="card-img-top mx-auto circle-icon"
          src={`https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${poke.poke.name}.png`}
          alt=""
          onError={imageLink}
        />
      </Link>
      <div className="card-body">
        <h5 className="card-title">
          #{s}
        </h5>
        <p className="card-text">
          {poke.poke.name.toUpperCase()}
        </p>
      </div>
    </div>
  )
}
