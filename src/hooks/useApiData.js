import { useEffect, useState } from "react";

/**
 * API'den veri çeken ortak hook.
 *
 * fetchFn  : API isteğini yapan fonksiyon
 * fallback : API kullanılamadığında gösterilecek örnek veri
 *
 * Dönen değerler:
 * data          -> ekranda kullanılacak veri
 * loading       -> API isteği devam ediyor mu?
 * error         -> API isteğinde hata oldu mu?
 * usingFallback -> fallback veri kullanılıyor mu?
 */
export default function useApiData(fetchFn, fallback) {
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetchFn();

        if (!cancelled) {
          // API'den beklenen veri bir dizi ise API verisini kullan.
          if (Array.isArray(res.data)) {
            setData(res.data);
            setUsingFallback(false);
          } else {
            // API beklenmeyen bir veri döndürürse sayfanın çökmesini engelle.
            setData(fallback);
            setUsingFallback(true);
          }
        }
      } catch (err) {
        if (!cancelled) {
          // API ulaşılamıyorsa örnek verilerle devam et.
          setData(fallback);
          setUsingFallback(true);
          setError(err);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    data,
    loading,
    error,
    usingFallback,
  };
}