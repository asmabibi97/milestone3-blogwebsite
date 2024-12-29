import { client } from '../../sanity/lib/client';
import Link from 'next/link';

interface Post {
  title: string;
  slug: {
    current: string;
  };
}

const Sidebar = async () => {
  const postsQuery = `*[_type == "post"]{
    title,
    slug
  }`;

  const posts: Post[] = await client.fetch(postsQuery);

  return (
    <aside className="w-full lg:w-1/4 bg-gray-100 p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold mb-4">All Blogs</h3>
      <ul className="space-y-3">
        {posts.map((post) => (
          <li key={post.slug.current}>
            <Link
              href={`/post/${post.slug.current}`}
              className="text-teal-600 hover:text-teal-800 font-medium"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
