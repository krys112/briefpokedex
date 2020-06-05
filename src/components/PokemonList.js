import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/GlobalState';

import { PokemonThumb } from './PokemonThumb';

export const PokemonList = () => {
  const { getAllPokemon, pokemonList } = useContext(GlobalContext);
  const [gen, setGen] = useState(1);

  useEffect(() => {
    getAllPokemon(0, 151);
  }, []);

  useEffect(() => {
    let offset = 0;
    let pokeAmount = 151;
    switch (gen) {
      case '1':
        offset = 0;
        pokeAmount = 151;
        break;
      case '2':
        offset = 151;
        pokeAmount = 100;
        break;
      case '3':
        offset = 251;
        pokeAmount = 135;
        break;
      case '4':
        offset = 386;
        pokeAmount = 107;
        break;
      case '5':
        offset = 493;
        pokeAmount = 156;
        break;
      case '6':
        offset = 649;
        pokeAmount = 72;
        break;
      case '7':
        offset = 721;
        pokeAmount = 86;
        break;
      case '8':
        offset = 807;
        pokeAmount = 79;
        break;
    }
    getAllPokemon(offset, pokeAmount);
  }, [gen]);

  const onClick = e => {
    setGen(e.currentTarget.value);
  }

  if (pokemonList[0] === undefined) {
    return <h1>No Pokemon Found</h1>;
  } else {
    return (
      <>
        <div className="button-group pull-left">
          <button className={`btn coreBtn ${gen == '1' ? 'selected' : ''}`} value="1" onClick={onClick}>
            <span>Kanto Region - </span>
            <span>Gen 1</span>
          </button>
          <button className={`btn coreBtn ${gen == '2' ? 'selected' : ''}`} value="2" onClick={onClick}>
            <span>Johto Region - </span>
            <span>Gen 2</span>
          </button>
          <button className={`btn coreBtn ${gen == '3' ? 'selected' : ''}`} value="3" onClick={onClick}>
            <span>Hoenn Region - </span>
            <span>Gen 3</span>
          </button>
          <button className={`btn coreBtn ${gen == '4' ? 'selected' : ''}`} value="4" onClick={onClick}>
            <span>Sinnoh Region - </span>
            <span>Gen 4</span>
          </button>
          <button className={`btn coreBtn ${gen == '5' ? 'selected' : ''}`} value="5" onClick={onClick}>
            <span>Unova Region - </span>
            <span>Gen 5</span></button>
          <button className={`btn coreBtn ${gen == '6' ? 'selected' : ''}`} value="6" onClick={onClick}>
            <span>Kalos Region - </span>
            <span>Gen 6</span></button>
          <button className={`btn coreBtn ${gen == '7' ? 'selected' : ''}`} value="7" onClick={onClick}>
            <span>Alola Region - </span>
            <span>Gen 7</span></button>
          <button className={`btn coreBtn ${gen == '8' ? 'selected' : ''}`} value="8" onClick={onClick}>
            <span>Megas - </span>
            <span>Others</span></button>
        </div>

        <div className="container card-grid">
          {pokemonList ? pokemonList.map(item => (
            <PokemonThumb key={item.name} poke={item} />
          )) : null}
        </div>
      </>
    )
  }

}
