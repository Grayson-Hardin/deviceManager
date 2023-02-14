export const deviceManager = async (id, firstName, lastName, comments) => {
  const body = {
    id: id,
    firstName: firstName,
    lastName: lastName,
    comments: comments,
  };

  const options = {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  };

  const response = await fetch("http://localhost:3001/deviceManager", options);
  const message = await response.json();

  return message;
};

export const deleteEntry = async (id) => {
  const body = { id: id };

  const options = {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  };

  const response = await fetch("http://localhost:3001/deleteEntry", options);

  return response;
};
