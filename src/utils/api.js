const baseUrl = "http://localhost:3001";
const headers = { "Content-Type": "application/json" };

const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export const getItems = () =>
  fetch(`${baseUrl}/items`, { headers }).then(handleServerResponse);

export const addItems = ({ name, imageUrl, weather }) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers,
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(handleServerResponse);
};

export const deleteItem = (itemID) => {
  console.log("deleteItem function called with ID:", itemID);
  return fetch(`${baseUrl}/items/${itemID}`, {
    headers,
    method: "DELETE",
  }).then(handleServerResponse);
};
