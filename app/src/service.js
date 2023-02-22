export const deviceManager = async () => {
  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  const response = await fetch("http://localhost:3001/devices", options);
  const results = await response.json();

  return results;
};

export const deleteEntry = async (id) => {
  const body = { id: id };

  const options = {
    method: "DELETE",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch("http://localhost:3001/devices", options);

  return response;
};

export const addEntry = async (firstName, lastName, id, comments) => {
  const body = {
    firstName: firstName,
    lastName: lastName,
    id: id,
    comments: comments,
  };

  const options = {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch("http://localhost:3001/devices", options);

  return response;
};

export const updateEntry = async (firstName, lastName, id, comments) => {
  const body = {
    firstName: firstName,
    lastName: lastName,
    id: id,
    comments: comments,
  };

  const options = {
    method: "PUT",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch("http://localhost:3001/devices", options);

  return response;
};


export const retrieveID = async (id) => {

  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch(`http://localhost:3001/devices/${id}`, options);

  const results = await response.json();

  return results;
};
