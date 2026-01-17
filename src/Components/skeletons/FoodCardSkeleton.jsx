import React from "react";

const FoodCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="w-full h-48 bg-gray-300"></div>
      
      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        <div className="flex gap-3 pt-2">
          <div className="h-10 bg-gray-300 rounded-md flex-1"></div>
          <div className="h-10 bg-gray-200 rounded-md flex-1"></div>
        </div>
      </div>
    </div>
  );
};

export default FoodCardSkeleton;