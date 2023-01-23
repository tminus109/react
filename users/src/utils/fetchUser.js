async function fetchUser(url, method, body) {
  const myInit = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  return await fetch(url, myInit).catch((err) => console.error(err.message));
}

export default fetchUser;
