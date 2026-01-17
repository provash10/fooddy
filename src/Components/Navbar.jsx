import Link from 'next/link';
import React from 'react';

const Navbar = () => {
    return (
        <header className="px-3 sm:px-5 py-2 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-5 bg-stone-600">
            <Link href="/" className="text-white font-bold text-xl lg:text-2xl">
                FOODDY
            </Link>

            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:gap-5">
                <Link className="btn text-white text-sm sm:text-base px-3 sm:px-4" href="/">Home</Link>
                <Link prefetch={false} className="btn text-white text-sm sm:text-base px-3 sm:px-4" href="/foods">Foods</Link>
                <Link className="btn text-white text-sm sm:text-base px-3 sm:px-4" href="/feedback">Login</Link>
            </div>
        </header>
    );
};

export default Navbar;