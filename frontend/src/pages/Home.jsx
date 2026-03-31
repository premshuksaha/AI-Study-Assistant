import React, { useState } from 'react'
import Homelayout from '../components/Home/homelayout'
import { useUserAuth } from '../hooks/useUserAuth';
import TopicForm from '../components/Notes/TopicForm';
import Result from '../components/Notes/Result';


const Home = () => {
  const { isLoading } = useUserAuth();
  const [result, setResult] = useState(null);

  return (
    <Homelayout activeMenu="Home" isLoading={isLoading}>
      <TopicForm onResult={setResult} />
      <Result result={result} />
    </Homelayout>
  );
}

export default Home