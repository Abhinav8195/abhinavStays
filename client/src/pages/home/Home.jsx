import React from 'react'
import './home.css'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import Featured from '../../components/featured/Featured'
import PropertyList from '../../components/propertylist/PropertyList'
import FeaturedProperties from '../../components/featuredProperties/FeaturedProperties'
import MailList from '../../components/maillist/MailList'
import Footer from '../../components/footer/Footer'
import useFetch from '../../hooks/useFetch'
import { useLocation } from 'react-router-dom'
const Home = () => {
  


  return (
    <div>
        <Navbar/>
        <Header/>
        <div className="homeContainer">
          <Featured/>
         <h1 className="homeTitle">Browse by property type</h1>
         <PropertyList/>
         <h1 className="homeTitle">Home guests love</h1>
         <FeaturedProperties/>
         <MailList/>
         <Footer/>
        </div>
    </div>
  )
}

export default Home