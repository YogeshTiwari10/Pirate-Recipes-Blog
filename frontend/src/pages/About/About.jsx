import React from 'react'
import './About.scss'

import { about1 } from '../../assets'

const About = () => {
  return (
    <div className="about">
      <div className="about_banner">
        <h1>Cooking with love!</h1>
      </div>
      <div className="about_passion">
        <div className="about_passion_img">
          <img src={about1} alt="About passion" />
        </div>
        <div className="about_passion_content">
          <h1>Passion Turned Into Profession…</h1>
          <p>We share quality recipes for free on our blog. In our spare time, we prepare food throughout the year and distribute it free of charge to community organizations.</p>
        </div>
      </div>
      <div className="about_blog">
        <div className="about_blog_content">
          <h1>We have been cooking and writing blogs for almost 12 years.</h1>
          <p>Our mission is to offer delicious and quality recipes. <br />
          <br />

            West Blue cuisine is sunshine, simplicity, and endless meals. It is composed of a multitude of dishes that are to be shared with pleasure. Middle eastern dishes fill your desire to eat fresh and light. <br />
            <br />

            Proud of our West Blue heritage, you will find in our recipes an abundance of whole grains, fruits, vegetables, fresh fish, seafood, poultry, meat. You will also find seasonings of garlic, olive oil, often and lemon juice. Chickpeas and parsley are also foods that you can enjoy in our kitchen. <br /> </p>
        </div>
      </div>
    </div>
  )
}

export default About