const pokedexContainer = document.querySelector('#pokedex-container');
const buttonsContainer = document.querySelector('.buttons');

const clearPokedex = () => {
  while (pokedexContainer.lastChild !== buttonsContainer) {
    pokedexContainer.removeChild(pokedexContainer.lastChild);
  }
};

export default clearPokedex;
