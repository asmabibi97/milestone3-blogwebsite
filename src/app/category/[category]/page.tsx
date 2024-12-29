import { client } from '../../../sanity/lib/client';
import Link from 'next/link';

interface Category {
  _id: string;
  title: string;
}

interface Post {
  title: string;
  slug: {
    current: string;
  };
  description?: string;
  publishedAt?: string;
}

const CategoryPage = async ({ params }: { params: { category: string } }) => {
  const categorySlug = params.category;

  // Query to fetch the category by slug
  const categoryQuery = `*[_type == "category" && slug.current == $categorySlug][0]{
    _id,
    title
  }`;

  const categoryData: Category | null = await client.fetch(categoryQuery, { categorySlug });

  if (!categoryData) {
    return (
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-semibold mb-12">No such category found</h2>
        </div>
      </section>
    );
  }

  const categoryId = categoryData._id;

  // Query to fetch posts belonging to the category
  const postsQuery = `*[_type == "post" && $categoryId in categories[]._ref]{
    title,
    slug,
    description,
    publishedAt
  }`;

  const posts: Post[] = await client.fetch(postsQuery, { categoryId });

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-semibold mb-12">Posts in {categoryData.title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.slug.current} className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">{post.title}</h3>
                <p className="text-gray-600 mb-6">{post.description}</p>
                <Link
                  href={`/post/${post.slug.current}`}
                  className="inline-block bg-teal-500 text-white py-2 px-4 rounded-full text-lg transition duration-300 hover:bg-teal-600"
                >
                  Read More
                </Link>
              </div>
            ))
          ) : (
            <p>No posts found for this category.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default CategoryPage;
