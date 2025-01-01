import { fetchPosts } from '../sanity/lib/fetchposts';
import Link from 'next/link';
import Image from 'next/image';

import Herosection from './Component/Herosection';


interface Post {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  mainImage: {
    asset: {
      url: string;
    };
  };
  body: Array<{
    children: Array<{
      text: string;
    }>;
  }>;
}

export default async function Home() {
  const posts: Post[] = await fetchPosts();  // Ensure fetchPosts returns the correct type
  console.log(posts);

  return (
    <div>
      <Herosection />
      {/* Main Content Section */}
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-4xl font-semibold text-center mb-10">Latest Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out flex flex-col"
            >
              {/* Post Image */}
              {post.mainImage && (
                <div className="overflow-hidden rounded-lg mb-6">
                  <Image
                    src={post.mainImage.asset.url}
                    width={200}
                    height={200}
                    alt={post.title}
                    className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}

              {/* Post Title */}
              <h3 className="text-2xl font-semibold text-gray-800 mb-4 hover:text-blue-600 transition-colors duration-200">
                {post.title}
              </h3>

              {/* Post Excerpt */}
              <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
                {post.body[0]?.children[0]?.text.substring(0, 150)}...
              </p>

              {/* Read More Link */}
              <div className="mt-auto">
                <Link
                  href={`/post/${post.slug.current}`}
                  className="inline-block px-6 py-2 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors duration-300"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
      
    </div>
  );
}
