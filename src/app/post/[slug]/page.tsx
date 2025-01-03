import { PortableText } from '@portabletext/react';
import { client } from '../../../sanity/lib/client';
import Image from 'next/image';
import Sidebar from '../../Component/Sidebar';
import CommentSection from '../../Component/CommentSection';

interface Category {
  title: string;
}

interface Post {
  title: string;
  body: any; // You can change this type based on the actual structure of the post content
  publishedAt: string;
  author: {
    name: string;
    image: string;
  };
  categories: Category[];
}

export interface PageProps {
  params: {
    slug: string;
  };
}

const BlogPage = async ({ params }: PageProps) => {
  const { slug } = params;

  // Fetch the blog post data
  const postQuery = `*[_type == "post" && slug.current == $slug][0]{
    title,
    body,
    publishedAt,
    author->{
      name,
      image
    },
    categories[]->{
      title
    }
  }`;

  const post: Post | null = await client.fetch(postQuery, { slug });

  if (!post) {
    return (
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-semibold">Post Not Found</h2>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto flex flex-col lg:flex-row gap-12">
        {/* Blog Content */}
        <article className="w-full lg:w-3/4 bg-white p-8 rounded-lg shadow-md">
          <header className="mb-8">
            <h1 className="text-5xl font-bold text-teal-700 mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 text-gray-600">
              <p>Published on {new Date(post.publishedAt).toLocaleDateString()}</p>
              {post.author && (
                <div className="flex items-center gap-2">
                  {post.author.image && (
                    <Image
                      src={post.author.image}
                      width={300}
                      height={300}
                      alt={post.author.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  )}
                  <p>{post.author.name}</p>
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {/* Type the 'category' parameter */}
              {post.categories.map((category: Category) => (
                <span
                  key={category.title}
                  className="bg-teal-100 text-teal-700 text-sm py-1 px-3 rounded-full"
                >
                  {category.title}
                </span>
              ))}
            </div>
          </header>
          <div className="prose lg:prose-xl max-w-none">
            <PortableText value={post.body} />
          </div>
        </article>

        {/* Sidebar */}
        <Sidebar />
      </div>

      {/* Comment Section */}
      <div className="mt-12">
        <CommentSection />
      </div>
    </section>
  );
};

export default BlogPage;
