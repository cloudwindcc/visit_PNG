import { useState, useEffect } from 'react';
import { Attraction } from '../types/attraction';

export const useAttractionsData = () => {
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/papua_new_guinea_attractions_final.json');
        if (!response.ok) {
          throw new Error('Failed to fetch attractions data');
        }
        const data = await response.json();
        setAttractions(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { attractions, loading, error };
};
