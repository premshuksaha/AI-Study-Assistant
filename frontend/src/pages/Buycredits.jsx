import React from 'react'
import Homelayout from '../components/Home/homelayout'
import { useUserAuth } from '../hooks/useUserAuth';


const Buycredits = () => {
  const { isLoading } = useUserAuth();

  return (
    <Homelayout activeMenu="Buy Credits" isLoading={isLoading} />
  )
}

export default Buycredits