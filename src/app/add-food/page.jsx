"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaUtensils, FaArrowLeft } from 'react-icons/fa';
import FoodCard from '@/components/FoodCard';

const AddFoodPage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [previewData, setPreviewData] = useState({
    name: '',
    description: '',
    price: 0,
    image: '',
    category: '',
    inStock: true,
    id: 'preview'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPreviewData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: '', text: '' });

    const formData = new FormData(e.target);
    const foodData = {
      name: formData.get('name'),
      description: formData.get('description'),
      price: parseFloat(formData.get('price')),
      image: formData.get('image'),
      category: formData.get('category')
    };

    try {
      const response = await fetch('http://localhost:5000/api/foods', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(foodData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setMessage({ type: 'success', text: 'Food added successfully!' });
        e.target.reset();
        setPreviewData({
          name: '',
          description: '',
          price: 0,
          image: '',
          category: '',
          inStock: true,
          id: 'preview'
        });
        // Redirect to foods page after 2 seconds
        setTimeout(() => {
          router.push('/foods');
        }, 2000);
      } else {
        setMessage({ type: 'error', text: result.message || 'Failed to add food' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-8">
        <button 
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 mb-4 transition-colors"
        >
          <FaArrowLeft /> Back
        </button>
        
        <div className="flex items-center justify-center gap-3 mb-4">
          <FaUtensils className="text-3xl text-orange-600" />
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Add New Food
          </h1>
        </div>
        
        <p className="text-lg text-gray-600">
          Add a delicious new item to our menu
        </p>
      </div>

      {/* Message Display */}
      {message.text && (
        <div className={`mb-6 p-4 rounded-lg ${
          message.type === 'success' 
            ? 'bg-green-100 text-green-700 border border-green-300' 
            : 'bg-red-100 text-red-700 border border-red-300'
        }`}>
          {message.text}
        </div>
      )}

      {/* Add Food Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Food Details</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Food Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Food Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                placeholder="Enter food name"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows="4"
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors resize-vertical"
                placeholder="Describe the food item"
              />
            </div>

            {/* Price and Category - Inline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Price */}
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                  Price ($) *
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  required
                  min="0"
                  step="0.01"
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                  placeholder="0.00"
                />
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                >
                  <option value="">Select Category</option>
                  <option value="Pizza">Pizza</option>
                  <option value="Burger">Burger</option>
                  <option value="Salad">Salad</option>
                  <option value="Mexican">Mexican</option>
                  <option value="Dessert">Dessert</option>
                  <option value="Seafood">Seafood</option>
                  <option value="Pasta">Pasta</option>
                  <option value="Sandwich">Sandwich</option>
                  <option value="Soup">Soup</option>
                  <option value="Beverage">Beverage</option>
                  <option value="Appetizer">Appetizer</option>
                  <option value="Main Course">Main Course</option>
                  <option value="Fast Food">Fast Food</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                Image URL
              </label>
              <input
                type="url"
                id="image"
                name="image"
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                placeholder="https://example.com/image.jpg"
              />
              <p className="text-sm text-gray-500 mt-1">
                Leave empty to use default image
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-orange-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-orange-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? 'Adding Food...' : 'Add Food'}
              </button>
              
              <button
                type="button"
                onClick={() => router.push('/foods')}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Preview Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Live Preview</h2>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              See how your food item will appear on the menu:
            </p>
            
            {previewData.name || previewData.description || previewData.price > 0 ? (
              <div className="max-w-sm mx-auto">
                <FoodCard 
                  food={{
                    ...previewData,
                    image: previewData.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
                    name: previewData.name || 'Food Name',
                    description: previewData.description || 'Food description will appear here...',
                    category: previewData.category || 'Category'
                  }} 
                />
              </div>
            ) : (
              <div className="max-w-sm mx-auto p-8 border-2 border-dashed border-gray-300 rounded-xl text-center">
                <FaUtensils className="text-4xl text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  Start filling the form to see preview
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-8 p-6 bg-orange-50 rounded-xl border border-orange-200">
        <h3 className="text-lg font-semibold text-orange-800 mb-2">
          Tips for Adding Food Items
        </h3>
        <ul className="text-sm text-orange-700 space-y-1">
          <li>• Use clear, descriptive names for your food items</li>
          <li>• Write detailed descriptions to help customers understand the dish</li>
          <li>• Use high-quality image URLs for better presentation</li>
          <li>• Set competitive prices based on your market research</li>
          <li>• Choose appropriate categories to help customers find items easily</li>
        </ul>
      </div>
    </div>
  );
};

export default AddFoodPage;