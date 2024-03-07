import React from "react";
import { NextSeo } from "next-seo";
import Link from "next/link";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface postProps {
  posts: Post[];
  totalPages: number;
}

export const Posts: React.FC<postProps> = ({ posts, totalPages }) => {
  return (
    <div className="container">
      <NextSeo title="Home" />
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>
              <div>{post.title}</div>
            </Link>
          </li>
        ))}
      </ul>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <Link href={`/?page=${index + 1}`} key={index + 1}>
            <div>{index + 1}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};
