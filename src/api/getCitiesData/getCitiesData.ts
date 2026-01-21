const response = await fetch('/db/city.json');
const cities = await response.json();

const fetchCitiesApi = async (): Promise<string[]> => {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

  return cities as string[];
};

export default fetchCitiesApi;
