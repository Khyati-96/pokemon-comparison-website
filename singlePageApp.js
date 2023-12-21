function manageNavigation() {
  const navigationLinks = document.querySelectorAll('.nav-link');
  const linkList = Array.from(navigationLinks);
  const pokemonContainer = document.querySelector('#pokemon-container');
  const pokedexContainer = document.querySelector('#pokedex-container');
  const pokeballContainer = document.querySelector('#pokeball-container');

  linkList.forEach((link) => {
    if (link.classList.contains('first-a')) {
      link.addEventListener('click', () => {
        pokemonContainer.classList.remove('hide');
        pokedexContainer.classList.add('hide');
        pokeballContainer.classList.add('hide');
        pokemonContainer.classList.remove('reduce-grid');
      });
    } else if (link.classList.contains('second-a')) {
      link.addEventListener('click', () => {
        pokedexContainer.classList.remove('hide');
        pokemonContainer.classList.remove('hide');
        pokeballContainer.classList.add('hide');
        pokemonContainer.style.flex = '1';
        pokedexContainer.style.flex = '4';
        pokemonContainer.classList.add('reduce-grid');
      });
    } else {
      link.addEventListener('click', () => {
        pokeballContainer.classList.remove('hide');
        pokedexContainer.classList.add('hide');
        pokemonContainer.classList.add('hide');
      });
    }
  });
}

export default manageNavigation;
