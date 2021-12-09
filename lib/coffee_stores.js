//initialize unsplash
import { createApi } from "unsplash-js";

// on your node server
const unsplashApi = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
  //...other fetch options
});

export const getCoffeeStoresUrl = (ll, query, limit) => {
  return `https://api.foursquare.com/v3/places/nearby?ll=${ll}&query=${query}&limit=${limit}&v=20210525`;
};

export const fetchCoffeeStores = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: "cat",
    page: 1,
    perPage: 10,
    color: "green",
    orientation: "portrait",
  });

  console.log("photos", photos);

  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `${process.env.FOURSQUARE_API_KEY}`,
    },
  };

  const response = await fetch(
    getCoffeeStoresUrl("-25.96%2C32.58", "coffee%20store", 6),
    options
  );

  const data = await response.json();
  console.log("data :" + data);
  return data.results;
};
