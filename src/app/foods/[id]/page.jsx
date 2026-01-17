import React from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaShoppingCart, FaTag, FaCheckCircle, FaTimesCircle, FaExclamationTriangle } from 'react-icons/fa';

// Fetch single food from Express server
const getFood = async (id) => {
  try {
    const res = await fetch(`http://localhost:5000/api/foods/${id}`, {
      cache: 'no-store'
    });
    
    if (!res.ok) {
      return null;
    }
    
    const result = await res.json();
    return result.data;
  } catch (error) {
    console.error('Error fetching food:', error);
    return null;
  }
};

const FoodDetailsPage = async ({ params }) => {
  const { id } = await params;
  const food = await getFood(id);

  if (!food) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-20">
          <FaExclamationTriangle className="text-6xl text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Food Not Found</h1>
          <p className="text-gray-600 mb-8">
            Sorry, we couldn't find the food you're looking for.
          </p>
          <Link 
            href="/foods" 
            className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
          >
            <FaArrowLeft />
            Back to Foods
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Link 
          href="/foods" 
          className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 transition-colors"
        >
          <FaArrowLeft />
          Back to Foods
        </Link>
      </div>

      {/* Food Details */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Image Section */}
          <div className="relative">
            <img
              src={food.image}
              alt={food.name}
              className="w-full h-64 sm:h-80 lg:h-full object-cover"
            />
            <div className="absolute top-4 right-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                food.inStock 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {food.inStock ? (
                  <span className="flex items-center gap-1">
                    <FaCheckCircle className="w-3 h-3" />
                    In Stock
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <FaTimesCircle className="w-3 h-3" />
                    Out of Stock
                  </span>
                )}
              </span>
            </div>
          </div>

          {/* Details Section */}
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="space-y-6">
              {/* Category Badge */}
              <div className="flex items-center gap-2">
                <FaTag className="text-orange-500" />
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                  {food.category}
                </span>
              </div>

              {/* Title */}
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
                  {food.name}
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {food.description}
                </p>
              </div>

              {/* Price */}
              <div className="border-t border-b border-gray-200 py-6">
                <div className="flex items-center justify-between">
                  <span className="text-lg text-gray-600">Price:</span>
                  <span className="text-4xl font-bold text-orange-600">
                    ${food.price}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button 
                  className={`w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${
                    food.inStock
                      ? 'bg-orange-500 text-white hover:bg-orange-600 hover:shadow-lg transform hover:-translate-y-1'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={!food.inStock}
                >
                  <FaShoppingCart className="w-5 h-5" />
                  {food.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>

                <button className="w-full py-3 px-6 border-2 border-orange-500 text-orange-500 rounded-xl font-semibold hover:bg-orange-50 transition-colors">
                  Add to Wishlist
                </button>
              </div>

              {/* Additional Info */}
              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Product Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Category:</span>
                    <p className="font-medium text-gray-800">{food.category}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Availability:</span>
                    <p className={`font-medium ${food.inStock ? 'text-green-600' : 'text-red-600'}`}>
                      {food.inStock ? 'In Stock' : 'Out of Stock'}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Product ID:</span>
                    <p className="font-medium text-gray-800">#{food.id}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Price:</span>
                    <p className="font-medium text-gray-800">${food.price}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          You might also like
        </h2>
        <div className="text-center">
          <Link 
            href="/foods" 
            className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
          >
            View All Foods
          </Link>
        </div>
      </div>
    </div>
  );
};

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { id } = await params;
  const food = await getFood(id);
  
  if (!food) {
    return {
      title: 'Food Not Found - Fooddy',
      description: 'The requested food item could not be found.'
    };
  }
  
  return {
    title: `${food.name} - Fooddy`,
    description: food.description,
    openGraph: {
      title: food.name,
      description: food.description,
      images: [food.image],
    },
  };
}

export default FoodDetailsPage;