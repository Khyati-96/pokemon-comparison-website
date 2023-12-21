const apiURL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/yVH3CKFBYRoYTQEBRHMv/likes/';

const retrieveLikes = (pokemon, item) => {
  fetch(apiURL)
    .then((response) => response.json())
    .then((likes) => {
      likes.forEach((pokemonLike) => {
        if (pokemonLike.item_id === pokemon.name) {
          item.textContent = pokemonLike.likes;
        }
      });
    });
};

export default retrieveLikes;
