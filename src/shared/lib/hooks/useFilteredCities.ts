import { useState, useEffect } from 'react';
import type { ICity } from '@/types/types';

export function useFilteredCities(cities: ICity[], searchTerm: string) {
  const [filteredCities, setFilteredCities] = useState<ICity[]>(cities);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredCities(cities);
    } else {
      const filtered = cities.filter((city) =>
        city.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCities(filtered);
    }
  }, [searchTerm, cities]);

  return filteredCities;
}
