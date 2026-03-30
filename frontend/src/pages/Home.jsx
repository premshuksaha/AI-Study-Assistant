import React from 'react'
import Homelayout from '../components/Home/homelayout'
import { useUserAuth } from '../hooks/useUserAuth';
import TopicForm from '../components/Notes/TopicForm';


const Home = () => {
  const { isLoading } = useUserAuth();

  return (
    <Homelayout activeMenu="Home" isLoading={isLoading}>
      <TopicForm />
    </Homelayout>
  );
}

export default Home