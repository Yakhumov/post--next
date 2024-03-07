import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { Posts } from '../../components/posts';  
import HomePage from '../../components/home';


const Home: React.FC<{ posts: any; totalPages: any }> = ({ posts, totalPages }) => {
    return (
        <>
        <HomePage/>
        <Posts posts={posts} totalPages={totalPages} />;
        </>
    )

  };
  

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = context.query.page || 1; // Получаем номер страницы из параметра запроса 

  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}`);
  const posts  = await response.json();

  // Определение общего количества страниц для фейковой пагинации
  const totalCountResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
  const totalCount = Math.ceil((await totalCountResponse.json()).length / 10); // Предположим, что на странице 10 постов

  return {
    props: { posts, totalPages: totalCount }, 
  };
};

export default Home;
