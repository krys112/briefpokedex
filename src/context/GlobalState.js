import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

// Initial state
const initialState = {
  pokemonList: [],
  originalList: [],
  pokeData: [],
  pokemon: {},
  error: null,
  loading: true
}

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  async function getAllPokemon(offset, limit) {
    try {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);

      console.log('all pokemans', res.data.results);
      dispatch({
        type: 'GET_ALL_POKEMON',
        payload: res.data.results
      });
    } catch (err) {
      dispatch({
        type: 'SERVER_ERROR',
        payload: err.response.data.error
      });
    }
  }

  async function getPokemon(id) {
    try {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

      dispatch({
        type: 'GET_POKEMON',
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: 'SERVER_ERROR',
        payload: err.response.data.error
      });
    }
  }

  async function filterPokemon(newList) {
    try {
      dispatch({
        type: 'FILTER_POKEMON',
        payload: newList
      });
    } catch (err) {
      dispatch({
        type: 'SERVER_ERROR',
        payload: err.response.data.error
      });
    }
  }

  return (<GlobalContext.Provider value={{
    pokemonList: state.pokemonList,
    originalList: state.originalList,
    pokemon: state.pokemon,
    pokeData: state.pokeData,
    error: state.error,
    loading: state.loading,
    getAllPokemon,
    getPokemon,
    filterPokemon
  }}>
    {children}
  </GlobalContext.Provider>);
}