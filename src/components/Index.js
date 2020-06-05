import React from 'react';
import { Search } from './Search';
import { PokemonList } from './PokemonList';

export const Index = () => {
  return (
    <>
      <Search />
      <PokemonList />
    </>
  );
};