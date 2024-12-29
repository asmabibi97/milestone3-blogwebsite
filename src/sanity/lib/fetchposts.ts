import { client } from '../lib/client';

export async function fetchPosts() {
  const query = `*[_type == "post"]{
    _id,
    title,
    slug,
    mainImage{
      asset->{url}
    },
    body
  }`;

  return await client.fetch(query);
}
