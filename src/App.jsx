import { useEffect, useState } from 'react'
import './App.css'
import Loader from './assets/pages/Loader'
import About from './components/About/About'
import Advantages from './components/Advantages/Advantages'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'

function App() {

  const banner = {
    title: <>Feel your home with <br /> a modern design <br /> space</>,
    subtitle: 'decorate home',
    link: '/about',
    linkText: 'Discover',
  }

  const [loading, setLoading] = useState(false)


  document.addEventListener('DOMContentLoaded', () => {
    setLoading(false)
  })

  return (
    <>
      {
        loading
          ?
          <Loader />
          :
          <>
            <Header />
            <Hero title={banner.title} subtitle={banner.subtitle} link={banner.link} linkText={banner.linkText} image={banner.image} />
            <About />
            <Advantages />
          </>

      }


    </>
  )
}

export default App
