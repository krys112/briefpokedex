import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/GlobalState';

import OutsideAlerter from './utils/OutsideAlerter';

import { PokemonThumb } from './PokemonThumb';
import { Pokemon } from './Pokemon';

export const PokemonList = () => {
  const { getAllPokemon, pokemonList, selectedPoke, deselectPoke } = useContext(GlobalContext);
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
        <div className="custom-container">
          <div className="button-group pull-left">
            <button className={`btn coreBtn ${gen == '1' ? 'selected' : ''}`} value="1" onClick={onClick}>
              <span>Kanto Region</span>
              <span><b>Gen 1</b></span>
            </button>
            <button className={`btn coreBtn ${gen == '2' ? 'selected' : ''}`} value="2" onClick={onClick}>
              <span>Johto Region</span>
              <span><b>Gen 2</b></span>
            </button>
            <button className={`btn coreBtn ${gen == '3' ? 'selected' : ''}`} value="3" onClick={onClick}>
              <span>Hoenn Region</span>
              <span><b>Gen 3</b></span>
            </button>
            <button className={`btn coreBtn ${gen == '4' ? 'selected' : ''}`} value="4" onClick={onClick}>
              <span>Sinnoh Region</span>
              <span><b>Gen 4</b></span>
            </button>
            <button className={`btn coreBtn ${gen == '5' ? 'selected' : ''}`} value="5" onClick={onClick}>
              <span>Unova Region</span>
              <span><b>Gen 5</b></span></button>
            <button className={`btn coreBtn ${gen == '6' ? 'selected' : ''}`} value="6" onClick={onClick}>
              <span>Kalos Region</span>
              <span><b>Gen 6</b></span></button>
            <button className={`btn coreBtn ${gen == '7' ? 'selected' : ''}`} value="7" onClick={onClick}>
              <span>Alola Region</span>
              <span><b>Gen 7</b></span></button>
            <button className={`btn coreBtn ${gen == '8' ? 'selected' : ''}`} value="8" onClick={onClick}>
              <span>Megas</span>
              <span><b>Other</b></span></button>
          </div>
          <div className="card-grid">
            {pokemonList ? pokemonList.map(item => (
              <PokemonThumb key={item.name} poke={item} />
            )) : null}
            {selectedPoke.poke !== undefined ? (
              <OutsideAlerter>
                <div className="popup">
                  <Pokemon poke={selectedPoke} />
                </div>
              </OutsideAlerter>
            ) : null}
          </div>
        </div>
      </>
    )
  }
}
