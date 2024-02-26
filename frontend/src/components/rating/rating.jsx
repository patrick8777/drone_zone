import React from "react";

function Rating({ rating }) {
  const filledStars = Math.min(Math.round(rating), 5);

  return (
    <div className='rating flex'>
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          className={`cursor-pointer text-2xl ${
            index < filledStars ? "text-yellow-400" : "text-gray-300"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default Rating;

