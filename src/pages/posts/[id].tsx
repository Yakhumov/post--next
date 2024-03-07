// pages/posts/[id].tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}    

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

interface User { 
  id: number;
  username: string; 
}

interface Props {
  post: Post;
  comments: Comment[];
  user: User;
}

const PostDetail: React.FC<Props> = ({ post, comments, user }) => {
  return (
    <div>
      <NextSeo title={post.title} />
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <h2>Комментарии</h2>
      <ul>
        {comments.map((comment) => ( 
          <li key={comment.id}>
            <strong>{comment.name}</strong> - {comment.body}
          </li>
        ))}
      </ul>
      <p>Автор: {user.username}</p> 
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const postId = context.params?.id;
  const [postResponse, commentsResponse, userResponse] = await Promise.all([
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`),
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`), 
    fetch(`https://jsonplaceholder.typicode.com/users/${postId}`),
  ]);

  const post: Post = await postResponse.json(); 
  const comments: Comment[] = await commentsResponse.json();
  const user: User = await userResponse.json();

  return {
    props: { post, comments, user },
  };
};

export default PostDetail;
