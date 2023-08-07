import React from 'react'
import { useState, useEffect } from 'react'
import { client } from '../../client'
import './Home.scss'
import { banner } from '../../assets'
import { Link } from 'react-router-dom'


const Home = () => {

  const [values, setValues] = useState([]);

  useEffect(() => {
    client.fetch(
      `*[_type == "post"] | order(_createdAt desc)
      {
        title,
        slug,
        body,
        metadesc,
        publishedAt,
        mainImage{
          asset -> {
            _id,
            url
          },
          alt
        },
        "author": author -> name
      } [0...12]`
    ).then((data) => setValues(data)).catch(console.error)
  }, [])


  return (
    <div className="home">
      <div className="home_banner">
        <div className="home_banner_logo">
          <img src={banner} alt="Logo" />
        </div>
        <div className="home_banner_heading">
          <h1>Live A Healthy Lifestyle!</h1>
        </div>
        <div className="home_banner_text">
          <p>Pirate Cafe is a blog that offers free recipes for food from all around the world .
            Cook from the comfort of your home with our delicious recipes.
            We pride ourselves with authentic Pirate recipes.</p>
        </div>
      </div>
      <div className="recent_recipes">
        <div className="recent_recipes_heading">
          <h1>Recent Recipes!</h1>
        </div>
        <div className="recent_recipes_posts">
        
          <div className="products-container">
            {values.map((post) => (
              <article className="product-card"> 
              <Link to={`/Recipes/${post.slug.current}`} className='blog_button'>
                <img src={post.mainImage.asset.url} alt={post.title} width={300} height={300} className='product-image'/>
                <p className="product-name">{post.title}</p>
                </Link>
              </article>
            ))}
          </div>
        </div>
      <div className="yellow_border"></div>
      </div>

    </div>
  )
}

export default Home