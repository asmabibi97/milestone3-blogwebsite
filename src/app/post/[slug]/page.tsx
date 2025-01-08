// src/app/post/[slug]/page.tsx
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import { Metadata } from 'next';
import { client } from '../../../sanity/lib/client';
import Sidebar from '@/app/Component/Sidebar';
import CommentSection from '@/app/Component/CommentSection';

async function getBlogPost(slug: string) {
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

  const post = await client.fetch(postQuery, { slug });

  if (!post) {
    throw new Error("Post not found");
  }

  return {
    title: post.title,
    content: post.body,
    publishedAt: post.publishedAt,
    author: {
      name: post.author.name,
      avatar: post.author.image || '/default-avatar.png',
    },
    categories: post.categories,
  };
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getBlogPost(params.slug);
  return {
    title: post.title,
  };
}

export default async function BlogPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);

  return (
    <div>
      <main className="min-h-screen bg-gray-50 py-12 flex flex-col lg:flex-row gap-12">
        <article className="mx-auto max-w-2xl bg-white rounded-xl shadow p-6">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
            <div className="flex items-center gap-3">
              <Image
                src={post.author.avatar}
                width={32}
                height={32}
                alt={post.author.name}
                className="rounded-full"
              />
              <div className="text-sm text-gray-600">
                <p>{post.author.name}</p>
                <time>
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {post.categories.map((category: { title: string }) => (
                <span
                  key={category.title}
                  className="bg-teal-100 text-teal-700 text-sm py-1 px-3 rounded-full"
                >
                  {category.title}
                </span>
              ))}
            </div>
          </header>
          <div className="prose max-w-none">
            <PortableText value={post.content} />
          </div>
        </article>
        <Sidebar />
      </main>
      <CommentSection />
    </div>
  );
}
