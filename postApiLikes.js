const apiURL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/yVH3CKFBYRoYTQEBRHMv/likes/';

const sendLikes = async (item) => {
  const response = await fetch(apiURL, {
    method: 'POST',
    body: JSON.stringify({
      item_id: item,
    }),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });
  return response.text();
};

export default sendLikes;
