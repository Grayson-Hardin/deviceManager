export const deleteEntry = async (id) => {
  const body = {
    id: id,
  };

  const options = {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  };

  const response = await fetch("http://localhost:3001/deleteEntry", options);
  const message = await response.json();

  return message;
};
