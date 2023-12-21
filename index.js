import './style.css';
import displayPokemons from './modules/displayPokemons';
import fetchApi from './modules/fetchApiPokemon';
import spa from './modules/singlePageApp';
import displayPokedex from './modules/displayPokedex';
import cleanPokedex from './modules/cleanPokedex';

spa();

document.addEventListener('DOMContentLoaded', async () => {
  const res = await fetchApi();
  const pokemonsArray = res.results;
  const pokemonsCounter = document.querySelector('#pokemons-counter');
  pokemonsCounter.textContent = pokemonsArray.length;

  pokemonsArray.forEach(async (pokemon) => {
    const url = await fetch(pokemon.url);
    const pokemonUrl = await url.json();
    displayPokemons(pokemonUrl);
  });
  displayPokedex(pokemonsArray, 0)
});

document.addEventListener('click', (event) => {
  const modalContainer = document.querySelector('.modal-container');
  const modalClose = document.querySelector('.modal-close');
  if (event.target === modalContainer || event.target === modalClose) {
    modalContainer.classList.remove('show-modal');
  }
});

// pokemon number
let pokemonNumber = 0
// BACK and NEXT buttons
const backBtn = document.querySelector('.btn1')
const nextBtn = document.querySelector('.btn2')
backBtn.addEventListener('click', async () => {
  const res = await fetchApi();
  const pokemonsArray = res.results;
  if(pokemonNumber !== 0) {
      pokemonNumber -= 1
      await cleanPokedex();
      displayPokedex(pokemonsArray, pokemonNumber)
      console.log(pokemonNumber)
  }
})

nextBtn.addEventListener('click', async () => {
  const res = await fetchApi();
  const pokemonsArray = res.results;
  if(pokemonNumber < 150) {
      pokemonNumber += 1
      await cleanPokedex();
      displayPokedex(pokemonsArray, pokemonNumber)
      console.log(pokemonNumber)
  }
})

// Array to store selected Pokémon for comparison
const selectedPokemonList = [];

// Function to fetch Pokémon details for comparison
const fetchComparisonPokemon = async (pokemonName) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Pokémon details:', error);
  }
};

// Function to update the selected Pokémon list for comparison
const updateComparisonList = () => {
  const comparisonContainer = document.getElementById('comparison-container');
  const selectedPokemonListContainer = document.getElementById('selected-pokemon-list');

  // Clear the existing list
  selectedPokemonListContainer.innerHTML = '';

  // Display each selected Pokémon
  selectedPokemonList.forEach(async (pokemonName) => {
    const pokemonData = await fetchComparisonPokemon(pokemonName);
    const pokemonElement = document.createElement('div');
    pokemonElement.textContent = `${pokemonData.name} - Height: ${pokemonData.height}, Weight: ${pokemonData.weight}`;
    selectedPokemonListContainer.appendChild(pokemonElement);
  });

  // Show/hide the comparison container based on the number of selected Pokémon
  if (selectedPokemonList.length > 0) {
    comparisonContainer.style.display = 'block';
  } else {
    comparisonContainer.style.display = 'none';
  }
};

// Function to handle the comparison button click
const handleComparisonButtonClick = async () => {
  const pokemonName1 = document.getElementById('pokemon1').value.trim().toLowerCase();
  const pokemonName2 = document.getElementById('pokemon2').value.trim().toLowerCase();

  if (pokemonName1 && pokemonName2) {
    const [pokemon1, pokemon2] = await Promise.all([
      fetchComparisonPokemon(pokemonName1),
      fetchComparisonPokemon(pokemonName2)
    ]);

    // Update the result and display details
    const resultContainer = document.getElementById('result');
    resultContainer.innerHTML = `
      <p>Comparison Result: ${pokemon1.name} vs ${pokemon2.name}</p>
      <p>Better Pokémon: ${pokemon1.stats[0].base_stat > pokemon2.stats[0].base_stat ? pokemon1.name : pokemon2.name}</p>
      <p>Type: ${pokemon1.types.map(type => type.type.name).join(', ')} vs ${pokemon2.types.map(type => type.type.name).join(', ')}</p>
    `;

    // Display details for each Pokémon
    displayPokemonDetails(pokemon1, 'pokemonDetails1');
    displayPokemonImage(pokemon1, 'pokemonImage1');
    displayPokemonDetails(pokemon2, 'pokemonDetails2');
    displayPokemonImage(pokemon2, 'pokemonImage2');
  } else {
    alert('Please enter names or IDs for both Pokémon before comparing.');
  }
};

// Add click event listener to the comparison button
const comparisonButton = document.getElementById('comparison-button');
if (comparisonButton) {
  comparisonButton.addEventListener('click', handleComparisonButtonClick);
}

// Function to display Pokémon details
const displayPokemonDetails = (pokemon, containerId) => {
  const detailsContainer = document.getElementById(containerId);
  detailsContainer.innerHTML = `
    <h2>${pokemon.name}</h2>
    <p>Height: ${pokemon.height} decimetres</p>
    <p>Weight: ${pokemon.weight} hectograms</p>
    <p>Abilities: ${pokemon.abilities.map(ability => ability.ability.name).join(", ")}</p>
    <p>Type: ${pokemon.types.map(type => type.type.name).join(", ")}</p>
  `;
};

// Function to display Pokémon image
const displayPokemonImage = (pokemon, containerId) => {
  const imageContainer = document.getElementById(containerId);
  imageContainer.innerHTML = `<img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">`;
};
