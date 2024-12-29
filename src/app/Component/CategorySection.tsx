import { client } from '../../sanity/lib/client';
import Link from 'next/link';

interface Category {
  title: string;
  description: string;
}

const CategorySection = async () => {
  // Query to fetch categories from Sanity
  const query = `*[_type == "category"]{
    title,
    description
  }`;

  const categories: Category[] = await client.fetch(query);

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-semibold mb-12">Explore Our Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
          {categories.map((category) => (
            <div
              key={category.title}
              className="bg-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl"
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">{category.title}</h3>
              <p className="text-gray-600 mb-6">{category.description}</p>
              <Link
                href={`/category/${category.title.toLowerCase().replace(/\s+/g, '-')}`}
                className="inline-block bg-teal-500 text-white py-2 px-4 rounded-full text-lg transition duration-300 hover:bg-teal-600"
              >
                View Posts
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
