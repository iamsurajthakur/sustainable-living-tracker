import Banner from '@/components/home/Banner'
import Faq from '@/components/home/Faq'
import Features from '@/components/home/Features'
import Footer from '@/components/home/Footer'
import Hero from '@/components/home/Hero'
import Testimonials from '@/components/home/Testimonials'

import React from 'react'

const Home = () => {
  return (
    <div>
      <Banner />
      <Hero />
      <Features />
      <Testimonials />
      <Faq />
      <Footer />
    </div>
  )
}

export default Home
