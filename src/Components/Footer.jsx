import Link from 'next/link';
import { FaTwitter, FaFacebook, FaInstagram, FaEnvelope, FaMapMarkerAlt, FaPhone, FaUtensils, FaHeart } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-stone-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <FaUtensils className="text-orange-500 text-2xl mr-2" />
              <h3 className="text-2xl font-bold text-orange-500">FOODDY</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Taste that makes you smile. Fresh, delicious meals delivered right to your doorstep with love and care.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-orange-500 transition-colors duration-300">
                <FaTwitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-orange-500 transition-colors duration-300">
                <FaFacebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-orange-500 transition-colors duration-300">
                <FaInstagram className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-300 hover:text-orange-500 transition-colors duration-300">Home</Link></li>
              <li><Link href="/foods" className="text-gray-300 hover:text-orange-500 transition-colors duration-300">Foods</Link></li>
              <li><Link href="/reviews" className="text-gray-300 hover:text-orange-500 transition-colors duration-300">Reviews</Link></li>
              <li><Link href="/feedback" className="text-gray-300 hover:text-orange-500 transition-colors duration-300">Feedback</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center hover:text-orange-500 transition-colors duration-300">
                <FaEnvelope className="w-5 h-5 mr-2" />
                info@fooddy.com
              </li>
              <li className="flex items-center hover:text-orange-500 transition-colors duration-300">
                <FaMapMarkerAlt className="w-5 h-5 mr-2" />
                123 Food Street, Dhaka
              </li>
              <li className="flex items-center hover:text-orange-500 transition-colors duration-300">
                <FaPhone className="w-5 h-5 mr-2" />
                +880 1234-567890
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300 flex items-center justify-center">
            © 2026 FOODDY. All rights reserved. Made with <FaHeart className="text-red-500 mx-1" /> for food lovers.
          </p>
        </div>
      </div>
    </footer>
  );
}