const apiURL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/';

const generateUniqueId = async () => {
  const newId = await fetch(apiURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.text());
  return newId;
};

export default generateUniqueId;
