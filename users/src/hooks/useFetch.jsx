import { useEffect, useState } from "react";

function useFetch(url, method, body) {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const abortCont = new AbortController();

    const myInit = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      signal: abortCont.signal,
    };

    setError("");

    fetch(url, myInit)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setIsPending(false);
        setData(data);
        if (data.length === 0) {
          setError("There are no users currently in the database.");
        }
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("Fetch aborted.");
        } else {
          setIsPending(false);
          setError(err.message);
        }
      });

    return () => abortCont.abort();
  }, [body, method, url]);

  return { data, isPending, error };
}

export default useFetch;
