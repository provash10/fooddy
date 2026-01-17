import FoodCardSkeleton from '@/Components/skeletons/FoodCardSkeleton';
import React from 'react';

const loading = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Skeleton */}
      <div className="text-center mb-8">
        <div className="h-10 bg-gray-300 rounded w-80 mx-auto mb-4 animate-pulse"></div>
        <div className="h-6 bg-gray-200 rounded w-96 mx-auto mb-6 animate-pulse"></div>
        <div className="h-8 bg-gray-300 rounded w-48 mx-auto animate-pulse"></div>
      </div>

      {/* Skeleton Grid */}
      <div className='grid my-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {[...Array(12)].map((_, index) => (
          <FoodCardSkeleton key={index}></FoodCardSkeleton>
        ))}
      </div>
    </div>
  );
};

export default loading;