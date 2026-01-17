import Link from 'next/link';
import React from 'react';

const Navbar = () => {
    return (
        <header className="px-5 py-2 flex justify-between items-center gap-5 bg-stone-600">
            <Link href="/" className="text-white font-bold text-xl btn">
                FOODDY
            </Link>

            <div className="space-x-5">
                <Link  className="btn text-white" href="/">Home</Link>
                <Link prefetch={false} className="btn text-white" href="/foods">Foods</Link>
                <Link className="btn text-white" href="/feedback">Login</Link>
            </div>
        </header>
    );
};

export default Navbar;