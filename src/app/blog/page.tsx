import Image from 'next/image';
import { client } from '../../sanity/lib/client';
import Link from 'next/link';

interface Post {
  title: string;
  slug: {
    current: string;
  };
  publishedAt: string;
  body: {
    children: {
      text: string;
    }[];
  }[];
  mainImage?: {
    asset?: {
      url?: string;
    };
  };
}

const BlogPage = async () => {
  const query = `*[_type == "post"]{
    title,
    slug,
    publishedAt,
    body,
    mainImage{
      asset->{
        url
      }
    }
  }`;

  const posts: Post[] = await client.fetch(query);

  return (
    <section className="py-16 bg-gradient-to-b from-gray-100 to-gray-200">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-bold text-teal-700 mb-12">All Blog Posts</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {posts.length === 0 ? (
            <p>No blog posts found.</p>
          ) : (
            posts.map((post) => (
              <div
                key={post.slug.current}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="mb-6">
                  {post.mainImage?.asset?.url && (
                    <Image
                      src={post.mainImage.asset.url}
                      width={200}
                      height={200}
                      alt={post.title}
                      className="w-full h-64 object-cover rounded-lg mb-4 hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  <h2 className="text-2xl font-semibold text-teal-700 mb-4">
                    <Link href={`/blog/${post.slug.current}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Published on {new Date(post.publishedAt).toLocaleDateString()}
                  </p>
                  <div className="text-gray-700 mb-4 text-justify">
                    {post.body[0]?.children[0]?.text?.slice(0, 100)}...
                  </div>
                  <Link
                    href={`/post/${post.slug.current}`}
                    className="inline-block px-6 py-2 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors duration-300"
                  >
                    Read more...
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
