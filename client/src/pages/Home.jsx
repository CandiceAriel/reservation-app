import React from 'react'
import HeroSection from '../sections/Hero'
import Navbar from '../components/Navbar'
import AboutSection from '../sections/About'

function Home() {
  return (
     <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
    </div>
  )
}

export default Home