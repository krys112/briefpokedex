export default (state, action) => {
  switch (action.type) {
    case 'GET_ALL_POKEMON':
      return {
        ...state,
        loading: false,
        pokemonList: action.payload,
        originalList: action.payload
      }
    case 'GET_POKEMON':
      const findPoke = (element) => element.name == action.payload.name;
      const index = state.pokeData.findIndex(findPoke);
      let newObj = {
        name: action.payload.name,
        data: action.payload
      }
      if (state.pokeData.length === 0 || index === -1) {
        state.pokeData.push(newObj);
      }
      return {
        ...state,
        loading: false,
        pokemon: action.payload
      }
    case 'FILTER_POKEMON':
      return {
        ...state,
        pokemonList: action.payload
      }
    case 'SELECT_POKEMON':
      return {
        ...state,
        selectedPoke: action.payload
      }
    case 'DESELECT_POKEMON':
      return {
        ...state,
        selectedPoke: {}
      }
    default:
      return state;
  }
}