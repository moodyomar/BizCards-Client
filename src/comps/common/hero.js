import React from 'react';
import "../../css/header_nav.css"

const Hero = ({ imgPath, heroTitle }) => {

  return (

    <div className="hero" style={{ backgroundImage: `url(${imgPath})` }}>
      <h1 className="display-2 heroTitle">{heroTitle}</h1>
    </div>


  )
}

export const heroImg = '/images/hero.jpeg'
export default Hero