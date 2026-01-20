import cities from '@public/db/city.json';

const fetchCitiesApi = async (): Promise<string[]> => {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

  return cities as string[];
};

export default fetchCitiesApi;
