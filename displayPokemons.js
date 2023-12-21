import cleanModal from './cleanModal';
import displayModal from './displayModal';
import fetchLikes from './fetchApiLikes';
import postLikes from './postApiLikes';

export default function displayPokemon(pokemonObject) {
  const pokemonContainer = document.querySelector('#pokemon-container');
  const pokemonCard = document.createElement('div');
  const pokemonImage = document.createElement('img');
  const pokemonTitle = document.createElement('h3');
  const pokemonLikesContainer = document.createElement('div');
  const heartIcon = document.createElement('span');
  const likesCounter = document.createElement('p');
  const likesCounterText = document.createElement('p');
  const commentButton = document.createElement('button');

  pokemonContainer.appendChild(pokemonCard);
  pokemonCard.className = 'pokemon';

  pokemonCard.appendChild(pokemonImage);
  pokemonImage.className = 'pokemon-img';
  pokemonImage.src = pokemonObject.sprites.other['official-artwork'].front_default;

  pokemonCard.appendChild(pokemonTitle);
  pokemonTitle.className = 'pokemon-name';
  pokemonTitle.textContent = pokemonObject.forms[0].name;

  pokemonCard.appendChild(pokemonLikesContainer);
  pokemonLikesContainer.className = 'pokemon-likes';

  pokemonLikesContainer.appendChild(heartIcon);
  heartIcon.textContent = '❤️';
  heartIcon.classList = 'heart-likes';
  heartIcon.dataset.pokeId = pokemonObject.forms[0].name;

  pokemonLikesContainer.appendChild(likesCounter);
  likesCounter.className = 'likes-counter';

  pokemonLikesContainer.appendChild(likesCounterText);
  likesCounter.textContent = '0';
  likesCounterText.textContent = 'likes';

  commentButton.textContent = 'comment';
  pokemonCard.appendChild(commentButton);
  commentButton.className = 'comment-button';

  setTimeout(() => fetchLikes(pokemonObject.forms[0], likesCounter), 1000);

  heartIcon.addEventListener('click', () => {
    heartIcon.classList.remove('heart-likes');
    postLikes(heartIcon.dataset.pokeId);
    setTimeout(() => fetchLikes(pokemonObject.forms[0], likesCounter), 700);
  });

  pokemonCard.addEventListener('click', async (e) => {
    if (e.target !== heartIcon) {
      const modalContainer = document.querySelector('.modal-container');
      modalContainer.classList.add('show-modal');
      await cleanModal();
      displayModal(pokemonObject);
    }
  });
}
