const baseUrl = "http://localhost:3001";
const headers = { "Content-Type": "application/json" };

export const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

function request(url, options) {
  return fetch(url, options).then(handleServerResponse);
}

const getAuthHeaders = (token) => {
  if (!token) {
    return headers;
  }

  return {
    ...headers,
    authorization: `Bearer ${token}`,
  };
};

export const getItems = () => request(`${baseUrl}/items`, { headers });

export const addItems = ({ name, imageUrl, weather }, token) => {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: getAuthHeaders(token),
    body: JSON.stringify({ name, imageUrl, weather }),
  });
};

export const deleteItem = (item_id, token) => {
  return request(`${baseUrl}/items/${item_id}`, {
    headers: getAuthHeaders(token),
    method: "DELETE",
  });
};
