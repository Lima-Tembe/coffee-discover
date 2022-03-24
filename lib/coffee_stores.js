//initialize unsplash
import { createApi } from "unsplash-js";

// on your node server
const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
  //...other fetch options
});

export const getCoffeeStoresUrl = (ll, query, limit) => {
  return `https://api.foursquare.com/v3/places/nearby?ll=${ll}&query=${query}&limit=${limit}&v=20210525`;
};

const getCoffeeStoresPhotos = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: "coffee shop",
    perPage: 30,
  });

  const unsplashResults = photos.response.results;
  return unsplashResults.map((result) => result.urls["small"]);
};

export const fetchCoffeeStores = async (ll = "-25.96%2C32.58", limit = 6) => {
  const photos = await getCoffeeStoresPhotos();
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `${process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY}`,
    },
  };

  const response = await fetch(
    getCoffeeStoresUrl(ll, "coffee%20store", limit),
    options
  );

  const data = await response.json();
  return data.results.map((result, index) => {
    return {
      ...result,
      imgUrl: photos[index],
    };
  });
};
