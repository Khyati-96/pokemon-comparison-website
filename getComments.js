const apiURL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/yVH3CKFBYRoYTQEBRHMv/comments';

const fetchComments = (itemID) => {
  const commentsURL = `${apiURL}?item_id=${itemID}`;
  return fetch(commentsURL)
    .then((response) => response.json());
};

export default fetchComments;
