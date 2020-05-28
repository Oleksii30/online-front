import { useState, useCallback } from 'react';
import cookie from 'isomorphic-cookie';

const useFetch = url => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookie.load('token')}`,
      };

      let response = await fetch(url, { headers });
      response = await response.json();
      setResult(response.data);
      setLoading(false);
    } catch (error_) {
      setError(error_);
      setLoading(false);
    }
  }, [url]);

  const doFetch = useCallback(() => {
    setLoading(true);
    fetchData();
  }, [fetchData]);

  return [{ result, loading, error }, doFetch];
};

export default useFetch;
