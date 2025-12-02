import Banner from '@/components/home/Banner'
import Faq from '@/components/home/Faq'
import Features from '@/components/home/Features'
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
    </div>
  )
}

export default Home
