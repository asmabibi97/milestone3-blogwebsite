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
  description?: string | null;
  publishedAt?: string | null;
}

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

const fetchCategoryData = async (categorySlug: string) => {
  const categoryQuery = `*[_type == "category" && slug.current == $categorySlug][0]{
    _id,
    title
  }`;

  const categoryData: Category | null = await client.fetch(categoryQuery, { categorySlug });

  if (!categoryData) {
    return { categoryData: null, posts: [] };
  }

  const categoryId = categoryData._id;

  const postsQuery = `*[_type == "post" && $categoryId in categories[]._ref]{
    title,
    slug,
    description,
    publishedAt
  }`;

  const posts: Post[] = await client.fetch(postsQuery, { categoryId });

  return { categoryData, posts };
};

export async function generateStaticParams() {
  const categories = await client.fetch(`*[_type == "category"]{slug}`);
  return categories.map((category: { slug: { current: string } }) => ({
    category: category.slug.current,
  }));
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const resolvedParams = await params; // Resolve the promise
  const { category: categorySlug } = resolvedParams;

  const { categoryData, posts } = await fetchCategoryData(categorySlug);

  if (!categoryData) {
    return (
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-semibold mb-12">No such category found</h2>
        </div>
      </section>
    );
  }

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
