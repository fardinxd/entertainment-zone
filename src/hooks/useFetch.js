import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [content, setContent] = useState(null);
  const [numOfPagesAvailable, setNumOfPagesAvailable] = useState();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchContent = async () => {
      setIsPending(true);

      try {
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error(res.statusText);
        const data = await res.json();
        setContent(data.results);
        setNumOfPagesAvailable(data.total_pages);
        setIsPending(false);
        setError(null);
      } catch (err) {
        if (err.name === "AbortError") setError("The fetch was aborted");
        else {
          setIsPending(false);
          setError("Could not fetch the data");
        }
      }
    };

    fetchContent();

    return () => controller.abort();
  }, [url]);

  return { content, numOfPagesAvailable, isPending, error };
};
