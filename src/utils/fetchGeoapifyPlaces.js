
import { fetchPixabayImage } from "./fetchPixabayImage";

export const fetchGeoapifyPlaces = async (lat, lon, category = "catering") => {
  const apiKey = import.meta.env.VITE_GEOAPIFY_API_KEY;

  const url = `https://api.geoapify.com/v2/places?categories=${category}&filter=circle:${lon},${lat},5000&limit=10&apiKey=${apiKey}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    const placesWithImages = await Promise.all(
      data.features.map(async (place) => {
        const image = await fetchPixabayImage(place.properties.name || category);

        return {
          id: place.properties.place_id,
          name: place.properties.name || "Unnamed",
          address: place.properties.formatted,
          rating: place.properties.rating || "N/A",
          category: place.properties.categories?.[0] || "general",
          image,
        };
      })
    );

    return placesWithImages;
  } catch (err) {
    console.error("Error fetching Geoapify places:", err);
    return [];
  }
};
