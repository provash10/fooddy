import React from 'react';
import FoodCard from '@/components/FoodCard';
import { FaUtensils, FaExclamationTriangle } from 'react-icons/fa';

// Fetch foods from Express server
const getFoods = async () => {
  try {
    const res = await fetch('http://localhost:5000/api/foods', {
      cache: 'no-store' // Always fetch fresh data
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch foods');
    }
    
    const result = await res.json();
    return result.data || [];
  } catch (error) {
    console.error('Error fetching foods:', error);
    return [];
  }
};

const FoodsPage = async () => {
  const foods = await getFoods();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          Our Delicious Foods
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover our amazing collection of fresh and tasty foods, prepared with love and the finest ingredients.
        </p>
        <div className="mt-4">
          <span className="text-2xl font-semibold text-orange-600">
            {foods.length} Items Available
          </span>
        </div>
      </div>

      {/* Foods Grid */}
      {foods.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {foods.map((food, index) => (
            <div 
              key={food.id} 
              className="animate-fade-in-up"
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: 'both'
              }}
            >
              <FoodCard food={food} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <FaUtensils className="text-6xl text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No Foods Available</h3>
          <p className="text-gray-500">
            We're working on adding delicious foods to our menu. Please check back later!
          </p>
        </div>
      )}

      {/* Call to Action */}
      <div className="text-center mt-12 p-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl text-white">
        <h2 className="text-2xl font-bold mb-4">Can't find what you're looking for?</h2>
        <p className="mb-6">Contact us and we'll help you find the perfect meal!</p>
        <button className="bg-white text-orange-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
          Contact Us
        </button>
      </div>
    </div>
  );
};

export default FoodsPage;