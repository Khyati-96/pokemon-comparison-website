const apiEndpoint = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/yVH3CKFBYRoYTQEBRHMv/comments';

const submitComment = (name, comment, pokemon) => fetch(apiEndpoint, {
  method: 'POST',
  body: JSON.stringify({
    item_id: pokemon,
    username: name,
    comment: comment,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
});

export default submitComment;
