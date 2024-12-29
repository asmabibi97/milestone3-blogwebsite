import React from 'react';
import Link from 'next/link';
const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Tech Blog. All rights reserved.</p>
          <div className="mt-4">
            <Link href="/privacy-policy" className="px-4 hover:text-gray-400">Privacy Policy</Link>
            <Link href="/terms" className="px-4 hover:text-gray-400">Terms of Service</Link>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  