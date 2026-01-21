import { useState, useEffect } from 'react';
import type { ICity } from '@/types/types';

export function useCities() {
  const [cities, setCities] = useState<ICity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setLoading(true);
        const response = await fetch('/db/city.json');

        if (!response.ok) {
          throw new Error(`Failed to load cities`);
        }

        const cityNames = await response.json();
        const citiesWithId: ICity[] = cityNames.map((name: string, index: number) => ({
          id: index + 1,
          name,
        }));

        setCities(citiesWithId);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setCities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  return { cities, loading, error };
}
