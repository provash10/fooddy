import Link from 'next/link';
import React from 'react';

const Banner = () => {
    return (
        <section className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              Delicious Food <span className="text-yellow-300">Delivered</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
              Experience the finest cuisines from the comfort of your home. Fresh ingredients, expert chefs, fast delivery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 sm:space-x-4 justify-center items-center">
              <Link href="/foods" className="bg-white text-orange-600 px-6 sm:px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors inline-block w-full sm:w-auto text-center">
                Order Now
              </Link>
              <Link href="#about" className="border-2 border-white text-white px-6 sm:px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-orange-600 transition-colors inline-block w-full sm:w-auto text-center">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
};

export default Banner;