import type { PortableTextBlock } from "sanity";

import { client } from "./client";

export type Review = {
  _id: string;
  author: string;
  rating: number;
  text: string;
};

export async function getReviews(): Promise<Review[]> {
  return client.fetch(
    `*[_type == "review"] | order(order asc, _createdAt asc) { _id, author, rating, text }`,
    {},
    { next: { revalidate: 60 } }
  );
}

export type PostListItem = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  coverImage?: { asset?: { _ref: string }; alt?: string };
};

export type Post = PostListItem & {
  body: PortableTextBlock[];
};

const listFields = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  coverImage
`;

export async function getPosts(): Promise<PostListItem[]> {
  return client.fetch(
    `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) { ${listFields} }`,
    {},
    { next: { revalidate: 60 } }
  );
}

export async function getPost(slug: string): Promise<Post | null> {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] { ${listFields}, body }`,
    { slug },
    { next: { revalidate: 60 } }
  );
}

export async function getPostSlugs(): Promise<string[]> {
  return client.fetch(
    `*[_type == "post" && defined(slug.current)].slug.current`,
    {},
    { next: { revalidate: 60 } }
  );
}
