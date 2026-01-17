import Link from 'next/link';
import React from 'react';

const FoodCard = ({ food }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 group">
      {/* Image */}
      <div className="overflow-hidden">
        <img
          src={food.image}
          alt={food.name}
          className="w-full h-40 sm:h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 space-y-2">
        <div className="flex justify-between items-start">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 transition-colors duration-300 group-hover:text-orange-600 line-clamp-2">
            {food.name}
          </h3>
          <span className={`px-2 py-1 text-xs rounded-full ${food.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {food.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
          {food.description}
        </p>

        <div className="flex justify-between items-center">
          <span className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {food.category}
          </span>
          <p className="text-lg sm:text-xl font-bold text-orange-600 transition-all duration-300 group-hover:text-orange-700 group-hover:scale-105">
            ${food.price}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2 opacity-90 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            className="flex-1 bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition-all duration-300 text-sm sm:text-base disabled:bg-gray-400"
            disabled={!food.inStock}
          >
            {food.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>

          <Link 
            href={`/foods/${food.id}`} 
            className="flex-1 border border-orange-500 text-orange-500 py-2 rounded-md hover:bg-orange-50 transition-all duration-300 text-center hover:border-orange-600 hover:text-orange-600 hover:shadow-md text-sm sm:text-base"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;