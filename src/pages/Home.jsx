import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import PlaceCard from "../components/PlaceCard";
import { fetchGeoapifyPlaces } from "../utils/fetchGeoapifyPlaces";
import useGeolocation from "../hooks/useGeolocation";

const Home = () => {
  const { location, getLocation, loading: locating, error } = useGeolocation();
  const [places, setPlaces] = useState([]);
  const [loadingPlaces, setLoadingPlaces] = useState(false);

  useEffect(() => {
    const fetchPlaces = async () => {
      if (!location) return;
      try {
        setLoadingPlaces(true);
        const result = await fetchGeoapifyPlaces(location.lat, location.lng);
        setPlaces(result);
      } catch (err) {
        console.error("Failed to fetch places:", err);
      } finally {
        setLoadingPlaces(false);
      }
    };

    fetchPlaces();
  }, [location]);

  return (
    <div className="bg-cream min-h-screen px-4 py-6 text-gray-900">
      {/* HERO SECTION */}
      <section className="text-center mb-6 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900">Find Your Spot</h1>
        <p className="text-lg text-gray-700 mt-2">
          Looking for a sweet date spot nearby?
        </p>
      </section>

      {/* SEARCH + LOCATION BUTTON (inline, responsive) */}
      <div className="flex items-center justify-center max-w-3xl mx-auto mb-6">
        <div className="flex items-center w-full max-w-3xl border rounded-full px-2 py-2 shadow-sm bg-white">
          <span className="text-gray-500 px-2">🔍</span>
          <input
            type="text"
            placeholder="Search"
            className="w-full focus:outline-none px-2 text-sm"
          />
          <button
            onClick={getLocation}
            className="bg-orange-500 text-white px-4 py-1.5 text-sm rounded-full whitespace-nowrap hover:bg-orange-600 transition shadow ml-2"
          >
            {locating ? "Locating..." : "Use my location"}
          </button>
        </div>
      </div>

      {/* CATEGORY FILTER BUTTONS */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        <button className="border rounded-full px-4 py-1 text-sm">🍽 Restaurants</button>
        <button className="border rounded-full px-4 py-1 text-sm">🌳 Parks</button>
        <button className="border rounded-full px-4 py-1 text-sm">🍕 Pizza</button>
        <button className="border rounded-full px-4 py-1 text-sm">❤️ Ice Cream</button>
      </div>

      {/* TOGGLE AND MAP VIEW */}
      <div className="flex justify-between items-center text-sm mb-6 md:px-10">
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="form-checkbox" /> Nearby
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="form-checkbox" /> Farther
          </label>
        </div>
        <span className="flex items-center gap-1 cursor-pointer">
          <FaMapMarkerAlt className="text-orange-600" /> Map
        </span>
      </div>

      {/* Location Feedback */}
      <div className="text-center text-sm mb-4">
        {location && (
          <p className="text-green-600">
            📍 Found: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
          </p>
        )}
        {error && <p className="text-red-500">{error}</p>}
      </div>

      {/* PLACES SECTION */}
      <section className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">
          Popular Nearby Picks
        </h2>

        {loadingPlaces ? (
          <p className="text-center text-gray-500">Loading nearby places...</p>
        ) : places.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {places.map((place) => (
              <PlaceCard
                key={place.id}
                name={place.name}
                image={place.image}
                rating={place.rating}
                details={place.address}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-sm text-gray-500">
            No places found. Click "Use my location" to start.
          </p>
        )}
      </section>

      {/* WHY CHOOSE SWEETSPOTS SECTION */}
      <section className="bg-white py-12 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Why Choose SweetSpots?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4">
              <div className="text-4xl mb-2">📍</div>
              <h3 className="text-lg font-semibold mb-1">Discover Nearby</h3>
              <p className="text-sm text-gray-600">Quickly find places near your location in seconds.</p>
            </div>
            <div className="p-4">
              <div className="text-4xl mb-2">💡</div>
              <h3 className="text-lg font-semibold mb-1">Smart Filters</h3>
              <p className="text-sm text-gray-600">Filter by type, distance, or vibe — the choice is yours.</p>
            </div>
            <div className="p-4">
              <div className="text-4xl mb-2">💖</div>
              <h3 className="text-lg font-semibold mb-1">Date-Worthy Spots</h3>
              <p className="text-sm text-gray-600">Curated for foodies, lovers, and explorers alike.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-100 text-center py-6 mt-12">
        <p className="text-sm text-gray-600">
          &copy; {new Date().getFullYear()} SweetSpots. Built with ❤️ by Faruk.
        </p>
      </footer>
    </div>
  );
};

export default Home;
