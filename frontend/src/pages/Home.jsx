import React from 'react'
import Homelayout from '../components/Home/homelayout'
import { useUserAuth } from '../hooks/useUserAuth';


const Home = () => {
  const { isLoading } = useUserAuth();

  return (
    <Homelayout activeMenu="Home" isLoading={isLoading} />
  )
}

export default Home