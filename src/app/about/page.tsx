// File: app/about/page.tsx

import React from 'react';
import Image from 'next/image';


const AboutPage = () => {
  return (
    
    <section className="py-16 bg-gray-50">
      
    
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold text-teal-700 mb-6">About Us</h1>
        <p className="text-gray-700 text-lg mb-12">
          Welcome to our blog! We're dedicated to sharing insightful content, ideas, and inspiration. 
          Our mission is to connect with our readers and provide valuable information that enriches lives.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className=''>
            <Image
              src="/images/team-1-user-1 (2).jpg"
              width={200}
              height={200}
              alt="Our Team"
              className="w-full h-auto rounded-lg shadow-lg mb-6"
            />
            <h2 className="text-3xl font-semibold text-teal-600 mb-4">Our Team</h2>
            <p className="text-gray-600">
              We are a team of passionate writers, thinkers, and creators. With diverse backgrounds
              and expertise, we bring fresh perspectives to every topic we cover.
            </p>
          </div>
          <div>
            <Image
              src="/images/images.jpg"
              width={200}
              height={200}
              alt="Our Mission"
              className="w-full h-auto rounded-lg shadow-lg mb-6"
            />
            <h2 className="text-3xl font-semibold text-teal-600 mb-4">Our Mission</h2>
            <p className="text-gray-600">
              Our mission is to create content that informs, inspires, and empowers. We strive to make
              a positive impact on our readers by addressing meaningful topics and fostering community.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
