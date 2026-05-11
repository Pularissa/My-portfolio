import React from 'react'
import Navbar from '../components/Navbar'

const Home = () => {
  return (
    <section>
      <h1 className='text-center'>Portfolio</h1>
     <main>
      <Navbar />

      <section id="about">
        <h1>About</h1>
      </section>

      <section id="projects">
        <h1>Projects</h1>
      </section>

      <section id="skills">
        <h1>Skills</h1>
      </section>

      <section id="experience">
        <h1>Experience</h1>
      </section>

      <section id="contact">
        <h1>Contact</h1>
      </section>
    </main>
    </section>
  )
}

export default Home
