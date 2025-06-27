

// 👉 i need to Uncomment below if i'm importing from assets
// import placeholderImage from "../assets/placeholder.jpg";

export const fetchPixabayImage = async (query) => {
  const apiKey = import.meta.env.VITE_PIXABAY_API_KEY;

  // ✅ Make the query more specific to avoid random results
  const refinedQuery = `${query} restaurant`; // e.g., "Chicken Republic restaurant"

  const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(
    refinedQuery
  )}&image_type=photo&per_page=3&safesearch=true`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.hits && data.hits.length > 0) {
      return data.hits[0].webformatURL; // ✅ Best size for cards
    } else {
      // 🔁 Replace with your own placeholder
      return "/default-image.jpg"; // ⬅️ Replace this if you're importing
      // return placeholderImage;
    }
  } catch (error) {
    console.error("Error fetching Pixabay image:", error);
    return "/default-image.jpg"; // ⬅️ Or placeholderImage
  }
};
