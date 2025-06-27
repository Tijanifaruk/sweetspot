import React from "react";
import { FaHeart } from "react-icons/fa";

const PlaceCard = ({ name, image, rating, details }) => {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <img
        src={image}
        alt={name}
        className="rounded-lg h-40 w-full object-cover mb-3"
      />
      <h3 className="font-bold text-lg">{name}</h3>
      <p className="text-sm text-gray-700 mt-1">
        ⭐ {rating} &nbsp;•&nbsp; {details}
      </p>
      <div className="flex gap-2 mt-3 flex-wrap">
        <button className="border px-3 py-1 rounded text-sm hover:bg-gray-100">
          View
        </button>
        <button className="border px-3 py-1 rounded text-sm hover:bg-gray-100">
          <FaHeart className="inline mr-1 text-red-500" />
          Like
        </button>
        <button className="border px-3 py-1 rounded text-sm hover:bg-gray-100">
          Reviews
        </button>
      </div>
    </div>
  );
};

export default PlaceCard;
