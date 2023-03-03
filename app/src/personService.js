export const viewAllPersons = async () => {
  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  const response = await fetch("http://localhost:3001/devices/persons", options);
  const results = await response.json();

  return results;
};

export const deletePerson = async (id) => {
  const body = { id: id };

  const options = {
    method: "DELETE",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch("http://localhost:3001/devices/persons", options);

  return response;
};

export const addPerson = async (firstName, lastName) => {
  const body = {
    firstName: firstName,
    lastName: lastName,
  };

  const options = {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch("http://localhost:3001/devices/person", options);

  return response;
};
