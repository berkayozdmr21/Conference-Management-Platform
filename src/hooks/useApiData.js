import { useEffect, useState } from "react";

/**
 * fetchFn: () => Promise<AxiosResponse>
 * fallback: backend henüz bağlı değilken gösterilecek geçici veri
 *
 * Backend (Nilay) hazır olduğunda bu hook değişmeden çalışmaya devam eder;
 * sadece fallback'e düşme durumu ortadan kalkar.
 */
export default function useApiData(fetchFn, fallback) {
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetchFn();
        if (!cancelled) {
          setData(res.data);
          setUsingFallback(false);
        }
      } catch (err) {
        if (!cancelled) {
          setData(fallback);
          setUsingFallback(true);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
    
  }, []);

  return { data, loading, usingFallback };
}
